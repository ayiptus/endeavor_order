"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, FileDown, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import jsPDF from "jspdf"
import "jspdf-autotable"
import * as XLSX from "xlsx"

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

export default function ConfirmationPage() {
  const router = useRouter()
  const [requestNumber, setRequestNumber] = useState("")
  const [requestDate, setRequestDate] = useState("")
  const [totalAmount, setTotalAmount] = useState("")
  const [itemsCount, setItemsCount] = useState("")
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const reqNum = localStorage.getItem("lastRequestNumber")
    const reqDate = localStorage.getItem("lastRequestDate")
    const total = localStorage.getItem("lastRequestTotal")
    const items = localStorage.getItem("lastRequestItems")
    const client = localStorage.getItem("clientInfo")
    const savedCart = localStorage.getItem("cartItems")

    if (!reqNum) {
      router.push("/")
      return
    }

    setRequestNumber(reqNum || "")
    setRequestDate(reqDate || "")
    setTotalAmount(total || "0.00")
    setItemsCount(items || "0")
    if (client) setClientInfo(JSON.parse(client))
    if (savedCart) setCartItems(JSON.parse(savedCart))
  }, [router])

  const handleDownloadPDF = () => {
    if (!clientInfo || cartItems.length === 0) {
      alert("No data available to generate PDF")
      return
    }

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()

    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text("Signage Budget Estimate", pageWidth / 2, 20, { align: "center" })

    doc.setFontSize(14)
    doc.setFont("helvetica", "normal")
    doc.text("Digital Realty & Modulex", pageWidth / 2, 28, { align: "center" })

    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("Client Information", 14, 42)

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`Full Name: ${clientInfo.fullName}`, 14, 50)
    doc.text(`Email: ${clientInfo.email}`, 14, 56)
    doc.text(`Company: ${clientInfo.company}`, 14, 62)
    doc.text(`Property Address: ${clientInfo.propertyAddress}`, 14, 68)
    doc.text(`Request Number: ${requestNumber}`, 14, 74)
    doc.text(`Request Date: ${requestDate}`, 14, 80)

    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("Budget Estimate Details", 14, 92)

    const tableData = cartItems.map((item) => [
      item.name,
      item.id,
      item.dimensions,
      item.sqft.toFixed(2),
      item.backerPanel ? "YES" : "NO",
      item.illuminated ? "YES" : "NO",
      item.customSize ? "YES" : "NO",
      item.customSize ? "$0" : `$${item.price.toFixed(2)}`,
      item.quantity.toString(),
      item.customSize ? "$0" : `$${(item.price * item.quantity).toFixed(2)}`,
    ])
    ;(doc as any).autoTable({
      startY: 98,
      head: [
        [
          "Sign Name",
          "Code",
          "Dimensions",
          "SQ FT",
          "Backer",
          "Illuminated",
          "Custom Size",
          "Unit Price",
          "Qty",
          "Total",
        ],
      ],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [66, 66, 66], fontSize: 8 },
      bodyStyles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 15 },
        2: { cellWidth: 20 },
        3: { cellWidth: 12 },
        4: { cellWidth: 12 },
        5: { cellWidth: 15 },
        6: { cellWidth: 15 },
        7: { cellWidth: 18 },
        8: { cellWidth: 10 },
        9: { cellWidth: 18 },
      },
    })

    let finalY = (doc as any).lastAutoTable.finalY + 10

    const hasCustom = cartItems.some((item) => item.customSize)
    if (hasCustom) {
      doc.setFontSize(9)
      doc.setFont("helvetica", "italic")
      doc.text("* Custom products require review before a price can be provided.", 14, finalY)
      finalY += 8
    }

    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text(`TOTAL AMOUNT: $${totalAmount}`, 14, finalY)
    finalY += 12

    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("Important Notice", 14, finalY)
    finalY += 8

    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    const noticeLines = [
      "This report serves as an estimate and does not include shipping or installation costs.",
      "A site survey is necessary to confirm the scope and generate an official quotation.",
      "Custom products require additional review and pricing before inclusion in the budget.",
      "The amounts shown should be considered a wish list or estimate only. A formal quote",
      "will be issued once the survey project is completed.",
    ]

    noticeLines.forEach((line, index) => {
      doc.text(line, 14, finalY + index * 5)
    })
    finalY += noticeLines.length * 5 + 8

    doc.setFontSize(8)
    doc.setFont("helvetica", "italic")
    doc.text(`Generated on: ${new Date().toLocaleString("en-US")}`, 14, finalY)
    doc.text("For questions about this estimate, please contact: drorders@modulex.com", 14, finalY + 5)

    doc.save(`Quote-${requestNumber}.pdf`)
  }

  const handleDownloadExcel = () => {
    if (!clientInfo || cartItems.length === 0) {
      alert("No data available to generate Excel")
      return
    }

    const wb = XLSX.utils.book_new()

    const wsData: any[][] = [
      ["Signage Budget Estimate"],
      ["Digital Realty & Modulex"],
      [],
      ["Client Information"],
      ["Full Name:", clientInfo.fullName],
      ["Email:", clientInfo.email],
      ["Company:", clientInfo.company],
      ["Property Address:", clientInfo.propertyAddress],
      ["Request Number:", requestNumber],
      ["Request Date:", requestDate],
      [],
      ["Budget Estimate Details"],
      [
        "Sign Name",
        "Code",
        "Dimensions",
        "SQ FT",
        "Backer",
        "Illuminated",
        "Custom Size",
        "Unit Price",
        "Qty",
        "Total",
      ],
    ]

    cartItems.forEach((item) => {
      wsData.push([
        item.name,
        item.id,
        item.dimensions,
        item.sqft.toFixed(2),
        item.backerPanel ? "YES" : "NO",
        item.illuminated ? "YES" : "NO",
        item.customSize ? "YES" : "NO",
        item.customSize ? "$0" : `$${item.price.toFixed(2)}`,
        item.quantity,
        item.customSize ? "$0" : `$${(item.price * item.quantity).toFixed(2)}`,
      ])
    })

    const hasCustom = cartItems.some((item) => item.customSize)
    if (hasCustom) {
      wsData.push([])
      wsData.push(["* Custom products require review before a price can be provided."])
    }

    wsData.push([])
    wsData.push([`TOTAL AMOUNT: $${totalAmount}`])
    wsData.push([])

    wsData.push(["Important Notice"])
    wsData.push(["This report serves as an estimate and does not include shipping or installation costs."])
    wsData.push(["A site survey is necessary to confirm the scope and generate an official quotation."])
    wsData.push(["Custom products require additional review and pricing before inclusion in the budget."])
    wsData.push([
      "The amounts shown should be considered a wish list or estimate only. A formal quote will be issued once the survey project is completed.",
    ])
    wsData.push([])
    wsData.push([`Generated on: ${new Date().toLocaleString("en-US")}`])
    wsData.push(["For questions about this estimate, please contact: drorders@modulex.com"])

    const ws = XLSX.utils.aoa_to_sheet(wsData)

    ws["!cols"] = [
      { wch: 30 },
      { wch: 12 },
      { wch: 20 },
      { wch: 10 },
      { wch: 10 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 8 },
      { wch: 12 },
    ]

    XLSX.utils.book_append_sheet(wb, ws, "Quote")

    XLSX.writeFile(wb, `Quote-${requestNumber}.xlsx`)
  }

  const handleNewRequest = () => {
    localStorage.removeItem("cartItems")
    localStorage.removeItem("clientInfo")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Request for Quote Successfully Submitted.</h1>
          <p className="text-muted-foreground">Thank you for your signage budget request</p>
        </div>

        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Request Details</h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Request Number:</p>
              <p className="font-mono font-semibold text-orange-600">{requestNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Amount:</p>
              <p className="font-semibold">${totalAmount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Items Selected:</p>
              <p className="font-semibold">{itemsCount} products</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Request Date:</p>
              <p className="font-semibold">{requestDate}</p>
            </div>
          </div>
        </Card>

        {clientInfo && (
          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">Client Information</h2>
            <div className="space-y-2 text-center">
              <div>
                <span className="font-semibold">Name:</span> {clientInfo.fullName}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {clientInfo.email}
              </div>
              <div>
                <span className="font-semibold">Company:</span> {clientInfo.company}
              </div>
              <div>
                <span className="font-semibold">Property Address:</span> {clientInfo.propertyAddress}
              </div>
            </div>
          </Card>
        )}

        <Card className="p-4 mb-6 bg-muted">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileDown className="h-4 w-4" />
            <p>Your budget estimate has been saved and can be exported as CSV or PDF</p>
          </div>
        </Card>

        <div className="space-y-3 mb-6">
          <Button onClick={handleDownloadPDF} className="w-full bg-red-600 hover:bg-red-700">
            <FileDown className="mr-2 h-5 w-5" />
            Download PDF Report
          </Button>
          <Button onClick={handleDownloadExcel} className="w-full bg-green-600 hover:bg-green-700">
            <FileDown className="mr-2 h-5 w-5" />
            Download Excel Report
          </Button>
        </div>

        <Button onClick={handleNewRequest} variant="outline" className="w-full bg-transparent">
          <Home className="mr-2 h-4 w-4" />
          Start New Request
        </Button>
      </div>
    </div>
  )
}
