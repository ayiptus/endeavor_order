import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /vault and /api/vault routes
  if (!pathname.startsWith("/vault") && !pathname.startsWith("/api/vault")) {
    return NextResponse.next()
  }

  const authHeader = request.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Order Vault"',
      },
    })
  }

  try {
    const base64Credentials = authHeader.split(" ")[1]
    const credentials = atob(base64Credentials)
    const [username, password] = credentials.split(":")

    const validUser = process.env.VAULT_USER || "eModulex"
    const validPass = process.env.VAULT_PASS

    if (!validPass) {
      console.error("[v0] VAULT_PASS environment variable is not set")
      return new NextResponse("Server configuration error", { status: 500 })
    }

    if (username === validUser && password === validPass) {
      return NextResponse.next()
    }

    return new NextResponse("Invalid credentials", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Order Vault"',
      },
    })
  } catch {
    return new NextResponse("Invalid authorization header", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Order Vault"',
      },
    })
  }
}

export const config = {
  matcher: ["/vault/:path*", "/api/vault/:path*"],
}
