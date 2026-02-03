import { type NextRequest, NextResponse } from "next/server"
import { getOrders, getOrdersCount } from "@/lib/orders-db"

export async function GET(request: NextRequest) {
  try {
    // Auth is handled by proxy.ts Basic Auth - no session check needed

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams
    const app = searchParams.get("app") as "DR" | "EH" | null
    const isTest = searchParams.get("is_test")
    const startDate = searchParams.get("start_date")
    const endDate = searchParams.get("end_date")
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const limit = Number.parseInt(searchParams.get("limit") || "50", 10)

    const filters = {
      app: app || undefined,
      is_test: isTest ? isTest === "true" : undefined,
      start_date: startDate || undefined,
      end_date: endDate || undefined,
      limit,
      offset: (page - 1) * limit,
    }

    const [orders, total] = await Promise.all([getOrders(filters), getOrdersCount(filters)])

    return NextResponse.json({
      orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("[v0] Vault orders error:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
