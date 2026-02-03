import { type NextRequest, NextResponse } from "next/server"
import { getSessionFromCookies, deleteSession, clearSessionCookie } from "@/lib/vault-auth"

export async function POST(request: NextRequest) {
  try {
    const token = await getSessionFromCookies()

    if (token) {
      await deleteSession(token)
      await clearSessionCookie()
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Vault logout error:", error)
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}
