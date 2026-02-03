import { type NextRequest, NextResponse } from "next/server"
import { getSessionFromCookies, getSessionUser } from "@/lib/vault-auth"

export async function GET(request: NextRequest) {
  try {
    const token = await getSessionFromCookies()

    if (!token) {
      return NextResponse.json({ user: null })
    }

    const user = await getSessionUser(token)

    return NextResponse.json({ user })
  } catch (error) {
    console.error("[v0] Vault session error:", error)
    return NextResponse.json({ user: null })
  }
}
