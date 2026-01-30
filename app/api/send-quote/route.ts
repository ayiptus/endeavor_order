import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error("RESEND_API_KEY is missing")
  return new Resend(key)
}

const FROM_EMAIL = process.env.FROM_EMAIL ?? "drorders@order.emodulex.com"
const TO_EMAIL = process.env.TO_EMAIL ?? "drorders@order.emodulex.com"
const REPLY_TO_EMAIL = process.env.REPLY_TO_EMAIL ?? "drorders@order.emodulex.com"

interface CartItem {
  id: string
  name: string
  image: string
  dimensions: string
  sqft: number
  price: number
  quantity: number
  backerPanel: boolean
  illuminated: boolean
  customSize: boolean
}

interface ClientInfo {
  fullName: string
  email: string
  company: string
  propertyAddress: string
}

interface QuoteRequest {
  clientInfo: ClientInfo
  cartItems: CartItem[]
  requestNumber: string
  total: number
}

export async function POST(request: NextRequest) {
  try {
    const body: QuoteRequest = await request.json()
    const { clientInfo, cartItems, requestNumber, total } = body

    console.log("[v0] Sending quote email with Resend", { requestNumber, email: clientInfo.email })

    // Generate HTML email content
    const itemsHtml = cartItems
      .map(
        (item) => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px; font-weight: 500;">${item.name}</td>
        <td style="padding: 12px;">${item.dimensions}</td>
        <td style="padding: 12px; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px;">${item.backerPanel ? "YES" : "NO"}</td>
        <td style="padding: 12px;">${item.illuminated ? "YES" : "NO"}</td>
        <td style="padding: 12px; text-align: right;">$${item.price.toFixed(2)}</td>
        <td style="padding: 12px; text-align: right; font-weight: 600;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `,
      )
      .join("")

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Quote Request - ${requestNumber}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #f9fafb; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
    <h1 style="color: #111827; margin: 0 0 10px 0;">Quote Request Received</h1>
    <p style="color: #6b7280; margin: 0; font-size: 16px;">Request Number: <strong>${requestNumber}</strong></p>
    <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
  </div>

  <div style="margin-bottom: 30px;">
    <h2 style="color: #111827; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Client Information</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; font-weight: 600; width: 200px;">Name:</td>
        <td style="padding: 8px 0;">${clientInfo.fullName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: 600;">Email:</td>
        <td style="padding: 8px 0;">${clientInfo.email}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: 600;">Company:</td>
        <td style="padding: 8px 0;">${clientInfo.company}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: 600;">Property Address:</td>
        <td style="padding: 8px 0;">${clientInfo.propertyAddress}</td>
      </tr>
    </table>
  </div>

  <div style="margin-bottom: 30px;">
    <h2 style="color: #111827; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Requested Items</h2>
    <table style="width: 100%; border-collapse: collapse; background-color: #fff; border: 1px solid #e5e7eb;">
      <thead>
        <tr style="background-color: #f9fafb;">
          <th style="padding: 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Product</th>
          <th style="padding: 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Dimensions</th>
          <th style="padding: 12px; text-align: center; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Qty</th>
          <th style="padding: 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Backer</th>
          <th style="padding: 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Illuminated</th>
          <th style="padding: 12px; text-align: right; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Unit Price</th>
          <th style="padding: 12px; text-align: right; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>
  </div>

  <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h3 style="margin: 0; color: #111827; font-size: 20px;">Estimated Total:</h3>
      <p style="margin: 0; color: #111827; font-size: 24px; font-weight: 700;">$${total.toLocaleString()}</p>
    </div>
  </div>

  <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 30px;">
    <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">⚠ Important Notice</h3>
    <ul style="margin: 0; padding-left: 20px; color: #78350f; font-size: 14px;">
      <li>This estimate is provided as a preliminary budget based on the products requested.</li>
      <li>Prices do not include installation or logistics.</li>
      <li>A site survey is required to confirm scope and generate an official quotation.</li>
      <li>Custom products require additional review and pricing before inclusion in the budget.</li>
      <li>The amounts shown should be considered a wish list or estimate only.</li>
    </ul>
  </div>

  <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
    <p>This is an automated message from the Digital Realty Signage Quote System.</p>
    <p style="margin: 5px 0 0 0;">For questions, please reply to this email or contact your project manager.</p>
  </div>
</body>
</html>
    `

    const resend = getResend()
    const data = await resend.emails.send({
      from: `Digital Realty Orders <${FROM_EMAIL}>`,
      to: [TO_EMAIL, clientInfo.email, "drorders@modulex.com", "mjg@modulex.com", "jimmie.castillo@modulex.com"],
      replyTo: REPLY_TO_EMAIL,
      subject: `Quote Request ${requestNumber} - Digital Realty Signage`,
      html: emailHtml,
    })

    console.log("[v0] Email sent successfully", data)

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}
