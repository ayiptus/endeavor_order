import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"

const sql = neon(process.env.DATABASE_URL!)

// This endpoint creates the initial admin user
// It should only be called once during setup
// In production, you may want to disable this after initial setup

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, setupKey } = await request.json()

    // Simple setup key protection - change this in production
    if (setupKey !== "modulex-vault-setup-2026") {
      return NextResponse.json({ error: "Invalid setup key" }, { status: 403 })
    }

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
    }

    // Check if user already exists
    const existing = await sql`SELECT id FROM vault_users WHERE email = ${email}`
    if (existing.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Hash password and create user
    const passwordHash = await bcrypt.hash(password, 10)
    
    const result = await sql`
      INSERT INTO vault_users (email, password_hash, name)
      VALUES (${email}, ${passwordHash}, ${name})
      RETURNING id, email, name, created_at
    `

    return NextResponse.json({
      success: true,
      user: result[0],
      message: "Admin user created successfully",
    })
  } catch (error) {
    console.error("[v0] Vault setup error:", error)
    return NextResponse.json({ error: "Setup failed" }, { status: 500 })
  }
}
