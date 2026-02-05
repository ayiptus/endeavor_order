import { type NextRequest, NextResponse } from "next/server"
import { getNextSeq } from "@/lib/orders-db"

function getDateString(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}${month}${day}`
}

function getTimeString(): string {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  const seconds = String(now.getSeconds()).padStart(2, "0")
  return `${hours}${minutes}${seconds}`
}

function generateTestOrderId(app: "DR" | "EH"): string {
  const dateStr = getDateString()
  const timeStr = getTimeString()
  return `TEST-${app}-${dateStr}-${timeStr}`
}

async function generateRealOrderId(app: "DR" | "EH"): Promise<string> {
  const dateStr = getDateString()
  
  // Get next sequence from database (atomic, persistent across restarts)
  const seq = await getNextSeq(app)
  const sequence = String(seq).padStart(4, "0")
  
  return `ORD-${app}-${dateStr}-${sequence}`
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get("mode")
    const body = await request.json()
    const { app } = body as { app: "DR" | "EH" }

    if (!app || (app !== "DR" && app !== "EH")) {
      return NextResponse.json(
        { success: false, error: "Invalid or missing 'app' parameter. Must be 'DR' or 'EH'." },
        { status: 400 }
      )
    }

    const isTestMode = mode === "test"
    const orderId = isTestMode ? generateTestOrderId(app) : await generateRealOrderId(app)

    console.log(`[v0] Generated order ID: ${orderId} (test=${isTestMode})`)

    return NextResponse.json({ success: true, orderId, isTest: isTestMode }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error generating order ID:", error)
    return NextResponse.json({ success: false, error: "Failed to generate order ID" }, { status: 500 })
  }
}
