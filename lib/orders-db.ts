import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface OrderRecord {
  id?: number
  order_id: string
  app: "DR" | "EH"
  is_test: boolean
  client_name: string
  client_email: string
  company_name: string
  property_address: string
  items: object[]
  total_amount: number
  created_at?: string
}

export async function insertOrder(order: Omit<OrderRecord, "id" | "created_at">) {
  const result = await sql`
    INSERT INTO orders (
      order_id,
      app,
      is_test,
      client_name,
      client_email,
      company_name,
      property_address,
      items,
      total_amount
    ) VALUES (
      ${order.order_id},
      ${order.app},
      ${order.is_test},
      ${order.client_name},
      ${order.client_email},
      ${order.company_name},
      ${order.property_address},
      ${JSON.stringify(order.items)},
      ${order.total_amount}
    )
    RETURNING *
  `
  return result[0]
}

export async function getOrders(filters?: {
  app?: "DR" | "EH"
  is_test?: boolean
  start_date?: string
  end_date?: string
  limit?: number
  offset?: number
}) {
  const conditions: string[] = []
  const params: Record<string, unknown> = {}

  // Build dynamic query based on filters
  let query = `SELECT * FROM orders WHERE 1=1`

  if (filters?.app) {
    query += ` AND app = '${filters.app}'`
  }

  if (filters?.is_test !== undefined) {
    query += ` AND is_test = ${filters.is_test}`
  }

  if (filters?.start_date) {
    query += ` AND created_at >= '${filters.start_date}'`
  }

  if (filters?.end_date) {
    query += ` AND created_at <= '${filters.end_date}'`
  }

  query += ` ORDER BY created_at DESC`

  if (filters?.limit) {
    query += ` LIMIT ${filters.limit}`
  }

  if (filters?.offset) {
    query += ` OFFSET ${filters.offset}`
  }

  const result = await sql(query)
  return result
}

export async function getOrdersCount(filters?: {
  app?: "DR" | "EH"
  is_test?: boolean
  start_date?: string
  end_date?: string
}) {
  let query = `SELECT COUNT(*) as count FROM orders WHERE 1=1`

  if (filters?.app) {
    query += ` AND app = '${filters.app}'`
  }

  if (filters?.is_test !== undefined) {
    query += ` AND is_test = ${filters.is_test}`
  }

  if (filters?.start_date) {
    query += ` AND created_at >= '${filters.start_date}'`
  }

  if (filters?.end_date) {
    query += ` AND created_at <= '${filters.end_date}'`
  }

  const result = await sql(query)
  return Number(result[0].count)
}

export async function getOrderById(orderId: string) {
  const result = await sql`
    SELECT * FROM orders WHERE order_id = ${orderId}
  `
  return result[0] || null
}

/**
 * Get next sequence number for a given app and date.
 * Uses UPSERT to atomically increment and return the sequence.
 */
export async function getNextSeq(app: "DR" | "EH", date: string): Promise<number> {
  const result = await sql`
    INSERT INTO order_sequences (app, date, seq)
    VALUES (${app}, ${date}, 1)
    ON CONFLICT (app, date)
    DO UPDATE SET seq = order_sequences.seq + 1
    RETURNING seq
  `
  return result[0].seq as number
}
