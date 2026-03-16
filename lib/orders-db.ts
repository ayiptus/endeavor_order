import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface OrderRecord {
  id?: number
  order_id: string
  app: "DR" | "EH"
  is_test: boolean
  client_name: string
  client_email: string
  client_company: string
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
      client_company,
      property_address,
      items,
      total_amount
    ) VALUES (
      ${order.order_id},
      ${order.app},
      ${order.is_test},
      ${order.client_name},
      ${order.client_email},
      ${order.client_company},
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
 * Get next sequence number for a given app.
 * Uses UPSERT to atomically increment and return the sequence.
 * Schema: order_sequences(app PRIMARY KEY, next_seq INTEGER)
 */
export async function getNextSeq(app: "DR" | "EH"): Promise<number> {
  const result = await sql`
    INSERT INTO order_sequences (app, next_seq)
    VALUES (${app}, 1)
    ON CONFLICT (app)
    DO UPDATE SET next_seq = order_sequences.next_seq + 1
    RETURNING next_seq
  `
  return result[0].next_seq as number
}
