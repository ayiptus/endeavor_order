import { neon } from "@neondatabase/serverless"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"

const sql = neon(process.env.DATABASE_URL!)

export interface VaultUser {
  id: number
  email: string
  name: string
  created_at: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createSession(userId: number): Promise<string> {
  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  await sql`
    INSERT INTO vault_sessions (user_id, token, expires_at)
    VALUES (${userId}, ${token}, ${expiresAt.toISOString()})
  `

  return token
}

export async function getSessionUser(token: string): Promise<VaultUser | null> {
  const result = await sql`
    SELECT u.id, u.email, u.name, u.created_at
    FROM vault_users u
    JOIN vault_sessions s ON s.user_id = u.id
    WHERE s.token = ${token} AND s.expires_at > NOW()
  `

  return result[0] as VaultUser | null
}

export async function deleteSession(token: string): Promise<void> {
  await sql`DELETE FROM vault_sessions WHERE token = ${token}`
}

export async function getUserByEmail(email: string): Promise<(VaultUser & { password_hash: string }) | null> {
  const result = await sql`
    SELECT id, email, name, password_hash, created_at
    FROM vault_users
    WHERE email = ${email}
  `

  return result[0] as (VaultUser & { password_hash: string }) | null
}

export async function createUser(email: string, password: string, name: string): Promise<VaultUser> {
  const passwordHash = await hashPassword(password)

  const result = await sql`
    INSERT INTO vault_users (email, password_hash, name)
    VALUES (${email}, ${passwordHash}, ${name})
    RETURNING id, email, name, created_at
  `

  return result[0] as VaultUser
}

export async function getSessionFromCookies(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get("vault_session")?.value || null
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set("vault_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  })
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("vault_session")
}
