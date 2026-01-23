import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.EH_FROM_EMAIL ?? "ehorders@order.emodulex.com"
const TO_EMAIL = process.env.EH_TO_EMAIL ?? "gaa.orders@modulex.com"
const REPLY_TO_EMAIL = process.env.EH_REPLY_TO_EMAIL ?? "ehorders@order.emodulex.com"

interface CartItem {
  id: string
  quantity: number
  customSize?: string
  backerPanel?: boolean
}

interface ClientInfo {
  fullName: string
  email: string
  companyName: string
  propertyAddress: string
}

interface QuoteRequest {
  clientInfo: ClientInfo
  cartItems: CartItem[]
  requestNumber: string
  requestDate: string
  total: number
}

export async function POST(request: NextRequest) {
  try {
    const body: QuoteRequest = await request.json()
    const { clientInfo, cartItems, requestNumber, requestDate, total } = body

    console.log("[v0] Sending EH quote email with Resend", { requestNumber, email: clientInfo.email })

    const itemsHtml = cartItems
      .map(
        (item) => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px; font-weight: 500;">${item.id}</td>
        <td style="padding: 12px; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px;">${item.customSize || "Standard"}</td>
        <td style="padding: 12px;">${item.backerPanel ? "YES" : "NO"}</td>
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
  <div style="background-color: #10b981; padding: 30px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
    <h1 style="color: #ffffff; margin: 0 0 10px 0; font-size: 28px;">Request for Quote Successfully Submitted.</h1>
    <p style="color: #ffffff; margin: 0; font-size: 16px;">Thank you for your signage budget request</p>
  </div>

  <div style="background-color: #f9fafb; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
    <h2 style="color: #111827; margin: 0 0 20px 0; text-align: center; font-size: 20px;">Request Details</h2>
    
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr>
        <td style="padding: 8px; width: 50%;">
          <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 14px;">Request Number:</p>
          <p style="color: #f97316; margin: 0; font-weight: 700; font-size: 16px;">${requestNumber}</p>
        </td>
        <td style="padding: 8px; width: 50%;">
          <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 14px;">Total Amount:</p>
          <p style="color: #111827; margin: 0; font-weight: 700; font-size: 16px;">$${total.toFixed(2)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px;">
          <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 14px;">Items Selected:</p>
          <p style="color: #111827; margin: 0; font-weight: 700; font-size: 16px;">${cartItems.length} ${cartItems.length === 1 ? "product" : "products"}</p>
        </td>
        <td style="padding: 8px;">
          <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 14px;">Request Date:</p>
          <p style="color: #111827; margin: 0; font-weight: 700; font-size: 16px;">${requestDate}</p>
        </td>
      </tr>
    </table>
  </div>

  <div style="background-color: #f9fafb; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
    <h2 style="color: #111827; margin: 0 0 20px 0; text-align: center; font-size: 20px;">Client Information</h2>
    
    <div style="text-align: center;">
      <div style="margin-bottom: 12px;">
        <span style="font-weight: 600; color: #111827;">Name:</span>
        <span style="color: #4b5563;"> ${clientInfo.fullName}</span>
      </div>
      <div style="margin-bottom: 12px;">
        <span style="font-weight: 600; color: #111827;">Email:</span>
        <span style="color: #4b5563;"> ${clientInfo.email}</span>
      </div>
      <div style="margin-bottom: 12px;">
        <span style="font-weight: 600; color: #111827;">Company:</span>
        <span style="color: #4b5563;"> ${clientInfo.companyName}</span>
      </div>
      <div>
        <span style="font-weight: 600; color: #111827;">Property Address:</span>
        <span style="color: #4b5563;"> ${clientInfo.propertyAddress}</span>
      </div>
    </div>
  </div>

  <div style="margin-bottom: 30px;">
    <h2 style="color: #111827; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Selected Items</h2>
    <table style="width: 100%; border-collapse: collapse; background-color: #fff; border: 1px solid #e5e7eb;">
      <thead>
        <tr style="background-color: #f9fafb;">
          <th style="padding: 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Product ID</th>
          <th style="padding: 12px; text-align: center; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Quantity</th>
          <th style="padding: 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Size</th>
          <th style="padding: 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Backer Panel</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>
  </div>

  <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; margin-bottom: 30px;">
    <h3 style="color: #1e3a8a; margin: 0 0 10px 0; font-size: 16px;">Important Notice</h3>
    <ul style="margin: 0; padding-left: 20px; color: #1e40af; font-size: 14px; font-style: italic;">
      <li>This estimate is provided as a preliminary budget based on the products requested.</li>
      <li>Prices do not include installation or logistics.</li>
      <li>A site survey may be necessary to confirm scope and generate an official quotation.</li>
      <li>Custom products require additional review and pricing before inclusion in the budget.</li>
      <li>The amounts shown should be considered a wish list or estimate only. A formal quote will be issued once the survey project is completed.</li>
    </ul>
  </div>

  <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
    <p>This is an automated message from the Endeavor Health Signage Quote System.</p>
    <p style="margin: 5px 0 0 0;">For questions, please reply to this email or contact your project manager.</p>
  </div>
</body>
</html>
    `

    const data = await resend.emails.send({
      from: `Endeavor Health Orders <${FROM_EMAIL}>`,
      to: [clientInfo.email, "gaa.orders@modulex.com"],
      replyTo: REPLY_TO_EMAIL,
      subject: `Quote Request ${requestNumber} - Endeavor Health Signage`,
      html: emailHtml,
    })

    console.log("[v0] EH quote email sent successfully", data)

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error sending EH quote email:", error)
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}
