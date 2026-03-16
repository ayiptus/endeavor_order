"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useTestMode, buildHrefWithMode, getModeQueryString } from "@/lib/test-mode"

interface CartItem {
  id: string
  productCode: string
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

export default function PreviewClient() {
  const router = useRouter()
  const isTestMode = useTestMode()
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [requestNumber, setRequestNumber] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderIdError, setOrderIdError] = useState(false)

  useEffect(() => {
    // Load data from localStorage
    const savedClientInfo = localStorage.getItem("clientInfo")
    const savedCart = localStorage.getItem("cartItems")

    if (savedClientInfo) setClientInfo(JSON.parse(savedClientInfo))
    if (savedCart) setCartItems(JSON.parse(savedCart))

    // Fetch request number from server
    const fetchOrderId = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const mode = urlParams.get("mode")
        const queryStr = mode === "test" ? "?mode=test" : ""
        
        const response = await fetch(`/api/generate-order-id${queryStr}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ app: "DR" }),
        })
        const data = await response.json()
        if (data.success && data.orderId) {
          setRequestNumber(data.orderId)
          setOrderIdError(false)
        } else {
          console.error("[v0] Failed to generate order ID: API returned failure")
          setOrderIdError(true)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch order ID:", error)
        setOrderIdError(true)
      }
    }
    fetchOrderId()
  }, [])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal

  const handleSubmit = async () => {
    if (!acceptTerms) {
      alert("Please accept the terms and conditions to proceed.")
      return
    }

    setIsSubmitting(true)

    try {
      console.log("[v0] Submitting quote request", { requestNumber, clientInfo, cartItems })

      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientInfo,
          cartItems,
          requestNumber,
          total,
          isTest: isTestMode,
        }),
      })

      const result = await response.json()
      console.log("[v0] Quote submission response", result)

      if (!response.ok) {
        throw new Error(result.error || "Failed to send quote")
      }

      // Save request data for confirmation page
      localStorage.setItem("lastRequestNumber", requestNumber)
      localStorage.setItem("lastRequestDate", new Date().toLocaleDateString("en-US"))
      localStorage.setItem("lastRequestTotal", total.toFixed(2))
      localStorage.setItem("lastRequestItems", cartItems.length.toString())

      router.push(buildHrefWithMode("/confirmation", isTestMode))
    } catch (error) {
      console.error("[v0] Error submitting quote:", error)
      alert("There was an error sending your quote request. Please try again.")
      setIsSubmitting(false)
    }
  }

  if (!clientInfo || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <p className="text-muted-foreground mb-4">No preview data available</p>
          <Link href={buildHrefWithMode("/", isTestMode)}>
            <Button>Return to Order Form</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href={buildHrefWithMode("/", isTestMode)}>
            <Button variant="outline" className="mb-4 bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-center mb-2">Request Preview</h1>
          <p className="text-center text-muted-foreground">Review your request details before confirming</p>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Request Number: <span className="font-mono font-semibold">{requestNumber || "Loading..."}</span>
          </p>
          {orderIdError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-center">
              <p className="text-red-700 font-semibold">Failed to generate order ID</p>
              <p className="text-red-600 text-sm mt-1">Please refresh the page or contact support.</p>
            </div>
          )}
        </div>

        {/* Client Information */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Client Information</h2>
          <div className="space-y-2">
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

        {/* Request Details */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Request Details</h2>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 pb-6 border-b last:border-b-0">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm mb-2">
                    <div>
                      <span className="font-semibold">Code:</span> {item.productCode}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
                    <div>
                      <span className="font-semibold">Dimensions:</span> {item.dimensions}
                    </div>
                    <div>
                      <span className="font-semibold">Backer Needed:</span> {item.backerPanel ? "YES" : "NO"}
                    </div>
                    <div>
                      <span className="font-semibold">SQ FT:</span> {item.sqft.toFixed(2)}
                    </div>
                    <div>
                      <span className="font-semibold">Illuminated:</span> {item.illuminated ? "YES" : "NO"}
                    </div>
                    <div className="col-span-2">
                      <span className="font-semibold">Custom Size Used:</span> {item.customSize ? "YES" : "NO"}
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <div>
                      <span className="font-semibold">Unit Price:</span> ${item.price.toFixed(2)}
                    </div>
                    <div>
                      <span className="font-semibold">Quantity:</span> {item.quantity}
                    </div>
                    <div className="text-lg font-bold">Total Price: ${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                  {item.customSize && (
                    <p className="text-sm text-orange-600 mt-2">
                      Custom products require review before a price can be provided.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Disclaimer */}
        <Card className="p-6 mb-6 border-orange-500">
          <div className="flex items-start gap-3">
            <div className="text-orange-600 mt-1">⚠</div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-orange-600">Disclaimer</h3>
              <p className="text-sm text-muted-foreground mb-3">
                ⚠ This report serves as an estimate and does not include shipping or installation costs. A site survey
                is necessary to confirm the scope and generate an official quotation.
              </p>
              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <label htmlFor="terms" className="text-sm cursor-pointer">
                  I understand that this report is an estimate only and subject to change.
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* Important Notice */}
        <Card className="p-6 mb-6 bg-muted">
          <h3 className="font-semibold mb-3">Important Notice</h3>
          <div className="text-sm text-muted-foreground space-y-2 italic">
            <p>This estimate is provided as a preliminary budget based on the products requested.</p>
            <p>Prices do not include installation or logistics.</p>
            <p>A site survey is required to confirm scope and generate an official quotation.</p>
            <p>Custom products require additional review and pricing before inclusion in the budget.</p>
            <p>
              The amounts shown should be considered a wish list or estimate only. A formal quote will be issued once
              the survey project is completed.
            </p>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Link href={buildHrefWithMode("/", isTestMode)} className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <Button
            onClick={handleSubmit}
            disabled={!acceptTerms || isSubmitting || orderIdError || !requestNumber}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <Check className="mr-2 h-4 w-4" />
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
      </div>
    </div>
  )
}
