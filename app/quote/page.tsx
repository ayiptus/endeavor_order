"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle } from "lucide-react"
import { products } from "@/data/products"

export default function QuotePage() {
  const [cart, setCart] = useState<Array<{ id: string; quantity: number; customSize?: string; backerPanel?: boolean }>>(
    [],
  )
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [propertyAddress, setPropertyAddress] = useState("")
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)

  useEffect(() => {
    // Load cart from sessionStorage
    const savedCart = sessionStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!disclaimerAccepted) {
      alert("Please accept the disclaimer before submitting")
      return
    }
    // Handle form submission
    console.log("Form submitted", { fullName, email, companyName, propertyAddress, cart })
    alert("Quote request submitted successfully! We'll review it within 24-48 business hours.")
  }

  const subtotal = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id)
    return sum + (product?.price || 0) * item.quantity
  }, 0)

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
          <Link href="/products" className="text-blue-600 hover:text-blue-800 text-sm font-semibold mb-4 inline-block">
            ← Back to Products
          </Link>
        </div>
      </section>

      <section className="py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Request Preview</h1>
            <p className="text-slate-600">Review your selections and provide your contact information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Client & Project Information */}
            <Card className="p-6 bg-white">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Client & Project Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1 block">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="border-slate-300"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1 block">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-slate-300"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1 block">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="border-slate-300"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1 block">
                    Property Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter the property address"
                    value={propertyAddress}
                    onChange={(e) => setPropertyAddress(e.target.value)}
                    required
                    className="border-slate-300"
                  />
                </div>
              </div>
            </Card>

            {/* Selected Items */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">Selected Items</h2>
                <Badge variant="default" className="bg-slate-900 text-white px-3 py-1 rounded-full">
                  {cart.length} {cart.length === 1 ? "Item" : "Items"}
                </Badge>
              </div>

              <div className="space-y-4">
                {cart.map((item) => {
                  const product = products.find((p) => p.id === item.id)
                  if (!product) return null

                  return (
                    <Card key={item.id} className="p-4 bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-slate-900">{product.name}</h3>
                          <p className="text-sm text-slate-500 uppercase mt-1">{product.id}</p>
                          <p className="text-sm text-slate-600 mt-2">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-900">
                            ${product.price === 0 ? "0" : (product.price * item.quantity).toFixed(2)}
                          </p>
                          {product.price === 0 && <p className="text-xs text-slate-500 mt-1">Price TBD</p>}
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Disclaimer */}
            <Card className="p-6 bg-amber-50 border-amber-200">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Disclaimer</h3>
                  <p className="text-sm text-slate-700 mb-3">
                    This report serves as an estimate and does not include shipping or installation costs. A site survey
                    is necessary to confirm the scope and generate an official quotation.
                  </p>
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="disclaimer"
                      checked={disclaimerAccepted}
                      onCheckedChange={(checked) => setDisclaimerAccepted(checked as boolean)}
                      className="mt-1"
                    />
                    <label htmlFor="disclaimer" className="text-sm text-slate-700 cursor-pointer">
                      I understand that this report is an estimate only and subject to change.
                    </label>
                  </div>
                </div>
              </div>
            </Card>

            {/* Important Notice */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="font-bold text-slate-900 mb-3">Important Notice</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="italic">
                  This estimate is provided as a preliminary budget based on the products requested.
                </li>
                <li className="italic">Prices do not include installation or logistics.</li>
                <li className="italic">
                  A site survey is required to confirm scope and generate an official quotation.
                </li>
                <li className="italic">
                  Custom products require additional review and pricing before inclusion in the budget.
                </li>
                <li className="italic">
                  The amounts shown should be considered a wish list or estimate only. A formal quote will be issued
                  once the survey project is completed.
                </li>
              </ul>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link href="/products" className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-slate-300 hover:bg-slate-50 bg-transparent"
                >
                  Add More Items
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={!disclaimerAccepted || cart.length === 0}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Submit Quote Request
              </Button>
            </div>

            {/* Footer Note */}
            <p className="text-xs text-slate-500 text-center">
              * Required fields. Your quote request will be reviewed within 24-48 business hours.
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}
