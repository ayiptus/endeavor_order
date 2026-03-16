import { type NextRequest, NextResponse } from "next/server"
import { getOrders } from "@/lib/orders-db"

export async function GET(request: NextRequest) {
  try {
    // Auth is handled by proxy.ts Basic Auth - no session check needed

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams
    const app = searchParams.get("app") as "DR" | "EH" | null
    const isTest = searchParams.get("is_test")
    const startDate = searchParams.get("start_date")
    const endDate = searchParams.get("end_date")

    const filters = {
      app: app || undefined,
      is_test: isTest ? isTest === "true" : undefined,
      start_date: startDate || undefined,
      end_date: endDate || undefined,
    }

    const orders = await getOrders(filters)

    // Generate CSV
    const headers = [
      "Order ID",
      "App",
      "Test Order",
      "Client Name",
      "Client Email",
      "Company",
      "Property Address",
      "Total Amount",
      "Items Count",
      "Created At",
    ]

    const rows = orders.map((order: any) => [
      order.order_id,
      order.app,
      order.is_test ? "Yes" : "No",
      order.client_name,
      order.client_email,
      order.client_company,
      order.property_address,
      order.total_amount,
      Array.isArray(order.items) ? order.items.length : 0,
      new Date(order.created_at).toLocaleString(),
    ])

    const csvContent = [headers.join(","), ...rows.map((row: any[]) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))].join(
      "\n",
    )

    const filename = `orders-export-${new Date().toISOString().split("T")[0]}.csv`

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("[v0] Vault export error:", error)
    return NextResponse.json({ error: "Failed to export orders" }, { status: 500 })
  }
}
