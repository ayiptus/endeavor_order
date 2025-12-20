"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, FileText, FileSpreadsheet, Home } from "lucide-react"
import { products } from "@/data/products"

interface SubmissionData {
  requestNumber: string
  fullName: string
  email: string
  companyName: string
  propertyAddress: string
  cart: Array<{
    id: string
    quantity: number
    selectedVariant?: string
    notes?: string
    backerPanel?: boolean
  }>
  totalAmount: number
  requestDate: string
}

export default function ConfirmationPage() {
  const router = useRouter()
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(null)

  useEffect(() => {
    // Load submission data from sessionStorage
    const savedSubmission = sessionStorage.getItem("submissionData")
    if (!savedSubmission) {
      // If no submission data, redirect to products page
      router.push("/products")
      return
    }

    const data = JSON.parse(savedSubmission)
    setSubmissionData(data)
  }, [router])

  const handleDownloadPDF = () => {
    if (!submissionData) return

    // Create PDF content
    const pdfContent = generatePDFContent(submissionData)

    // For now, just log - in production, use a library like jsPDF or send to backend
    console.log("[v0] PDF Download requested:", pdfContent)
    alert("PDF download functionality will be implemented. Request data has been logged to console.")
  }

  const handleDownloadExcel = () => {
    if (!submissionData) return

    // Create Excel content
    const excelContent = generateExcelContent(submissionData)

    // For now, just log - in production, use a library like xlsx or send to backend
    console.log("[v0] Excel Download requested:", excelContent)
    alert("Excel download functionality will be implemented. Request data has been logged to console.")
  }

  const handleStartNewRequest = () => {
    // Clear cart and submission data
    sessionStorage.removeItem("cart")
    sessionStorage.removeItem("submissionData")
    router.push("/")
  }

  if (!submissionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="py-8 px-4 md:px-8 border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex gap-4 items-center">
            <Image
              src="/images/endeavor-health-logo-main.png"
              alt="Endeavor Health Logo"
              width={120}
              height={40}
              priority
            />
          </div>
        </div>
      </section>

      {/* Confirmation Content */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-600 mb-3">Request for Quote Successfully Submitted.</h1>
            <p className="text-slate-600">Thank you for your signage budget request</p>
          </div>

          {/* Request Details Card */}
          <Card className="p-8 mb-6 bg-white">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Request Details</h2>

            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <p className="text-sm text-slate-600 mb-1">Request Number:</p>
                <p className="font-bold text-orange-500">{submissionData.requestNumber}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Amount:</p>
                <p className="font-bold text-slate-900">${submissionData.totalAmount.toFixed(2)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-slate-600 mb-1">Items Selected:</p>
                <p className="font-bold text-slate-900">
                  {submissionData.cart.length} {submissionData.cart.length === 1 ? "product" : "products"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Request Date:</p>
                <p className="font-bold text-slate-900">{submissionData.requestDate}</p>
              </div>
            </div>
          </Card>

          {/* Client Information Card */}
          <Card className="p-8 mb-6 bg-white">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Client Information</h2>

            <div className="space-y-3 text-center">
              <div>
                <span className="font-semibold text-slate-900">Name:</span>{" "}
                <span className="text-slate-700">{submissionData.fullName}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-900">Email:</span>{" "}
                <span className="text-slate-700">{submissionData.email}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-900">Company:</span>{" "}
                <span className="text-slate-700">{submissionData.companyName}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-900">Property Address:</span>{" "}
                <span className="text-slate-700">{submissionData.propertyAddress}</span>
              </div>
            </div>
          </Card>

          {/* Notice */}
          <div className="bg-slate-100 border border-slate-300 rounded-lg p-4 mb-6 flex items-start gap-3">
            <FileText className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700">
              Your budget estimate has been saved and can be exported as CSV or PDF
            </p>
          </div>

          {/* Download Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              onClick={handleDownloadPDF}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold h-12 text-base"
            >
              <FileText className="w-5 h-5 mr-2" />
              Download PDF Report
            </Button>

            <Button
              onClick={handleDownloadExcel}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-12 text-base"
            >
              <FileSpreadsheet className="w-5 h-5 mr-2" />
              Download Excel Report
            </Button>
          </div>

          {/* Start New Request Button */}
          <Button
            onClick={handleStartNewRequest}
            variant="outline"
            className="w-full border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold h-12 text-base bg-transparent"
          >
            <Home className="w-5 h-5 mr-2" />
            Start New Request
          </Button>
        </div>
      </section>
    </main>
  )
}

// Helper function to generate PDF content structure
function generatePDFContent(data: SubmissionData) {
  const items = data.cart.map((item) => {
    const product = products.find((p) => p.id === item.id)
    const variant = product?.variants?.find((v) => v.code === item.selectedVariant)
    const price = variant?.price || product?.price || 0

    return {
      productId: item.id,
      productName: product?.name || "Unknown Product",
      variant: variant?.name || "Standard",
      quantity: item.quantity,
      unitPrice: price,
      totalPrice: price * item.quantity,
      notes: item.notes || "",
      backerPanel: item.backerPanel || false,
    }
  })

  return {
    requestNumber: data.requestNumber,
    requestDate: data.requestDate,
    clientInfo: {
      name: data.fullName,
      email: data.email,
      company: data.companyName,
      address: data.propertyAddress,
    },
    items,
    totalAmount: data.totalAmount,
  }
}

// Helper function to generate Excel content structure
function generateExcelContent(data: SubmissionData) {
  const rows = data.cart.map((item) => {
    const product = products.find((p) => p.id === item.id)
    const variant = product?.variants?.find((v) => v.code === item.selectedVariant)
    const price = variant?.price || product?.price || 0

    return {
      "Product ID": item.id,
      "Product Name": product?.name || "Unknown Product",
      Variant: variant?.name || "Standard",
      Quantity: item.quantity,
      "Unit Price": `$${price.toFixed(2)}`,
      "Total Price": `$${(price * item.quantity).toFixed(2)}`,
      Notes: item.notes || "",
      "Backer Panel": item.backerPanel ? "Yes" : "No",
    }
  })

  return {
    metadata: {
      requestNumber: data.requestNumber,
      requestDate: data.requestDate,
      clientName: data.fullName,
      clientEmail: data.email,
      company: data.companyName,
      address: data.propertyAddress,
    },
    items: rows,
    total: `$${data.totalAmount.toFixed(2)}`,
  }
}
