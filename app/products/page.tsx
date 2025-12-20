"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trash2, ArrowUp } from "lucide-react"
import { products } from "@/data/products"

export default function ProductsPage() {
  const router = useRouter()
  const [cart, setCart] = useState<
    Array<{ id: string; quantity: number; backerPanel?: boolean; selectedVariant?: string; notes?: string }>
  >([])
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleAddToCart = (
    productId: string,
    quantity: number,
    backerPanel?: boolean,
    selectedVariant?: string,
    notes?: string,
  ) => {
    if (quantity <= 0) return

    const existingItem = cart.find((item) => item.id === productId)
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + quantity, selectedVariant, notes } : item,
        ),
      )
    } else {
      setCart([...cart, { id: productId, quantity, backerPanel, selectedVariant, notes }])
    }
  }

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId)
      return
    }
    setCart(cart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  const handleRemoveItem = (productId: string) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  const handleClearAll = () => {
    setCart([])
  }

  const handlePreviewRequest = () => {
    sessionStorage.setItem("cart", JSON.stringify(cart))
    router.push("/quote")
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="py-8 px-4 md:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex gap-4 items-center">
            <Image
              src="/images/endeavor-health-logo-main.png"
              alt="Endeavor Health Logo"
              width={360}
              height={67.7}
              priority
            />
          </div>
          <Link href="/" className="text-[#235FF8] hover:text-blue-800 text-sm font-semibold mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">New Orders</h1>
          <p className="text-slate-600 mt-2">Select products and configure options to add to your quote</p>
        </div>
      </section>

      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8 relative">
            {/* Products Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </div>

            <aside className="hidden lg:block w-96 shrink-0">
              <div className="sticky top-8">
                <Card className="p-6 border-2 border-slate-200 bg-white">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Item Summary</h2>
                    <Badge variant="default" className="bg-slate-200 text-slate-900 px-3 py-1 rounded-full">
                      {cart.length} {cart.length === 1 ? "item" : "items"}
                    </Badge>
                  </div>

                  {/* Clear All Button */}
                  {cart.length > 0 && (
                    <Button
                      onClick={handleClearAll}
                      variant="outline"
                      className="w-full mb-4 border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                    >
                      Clear All
                    </Button>
                  )}

                  {/* Cart Items */}
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {cart.length === 0 ? (
                      <p className="text-slate-500 text-sm text-center py-8">No items added yet</p>
                    ) : (
                      cart.map((item) => {
                        const product = products.find((p) => p.id === item.id)
                        if (!product) return null
                        const variant = product.variants?.find((v: any) => v.code === item.selectedVariant)
                        const price = variant?.price || product.price
                        return (
                          <div key={item.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                            <div className="flex gap-3">
                              {/* Product Image */}
                              <div className="w-16 h-16 bg-slate-100 rounded flex items-center justify-center shrink-0">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  width={50}
                                  height={50}
                                  className="object-contain"
                                />
                              </div>

                              {/* Product Details */}
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm text-slate-900 truncate">{product.name}</h3>
                                <p className="text-xs text-slate-500 uppercase">{product.id}</p>
                                <p className="text-sm text-slate-700 mt-1">${price} each</p>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-3 mt-2">
                                  <Input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleUpdateQuantity(item.id, Number.parseInt(e.target.value) || 1)
                                    }
                                    className="w-20 h-8 text-center"
                                  />
                                  <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="text-slate-500 hover:text-red-500 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {/* Item Total */}
                              <div className="text-right shrink-0">
                                <p className="font-semibold text-slate-900">${(price * item.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>

                  {/* Summary Totals */}
                  <div className="border-t border-slate-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Subtotal:</span>
                      <span className="font-semibold text-slate-900">
                        $
                        {cart
                          .reduce((sum, item) => {
                            const product = products.find((p) => p.id === item.id)
                            const variant = product?.variants?.find((v: any) => v.code === item.selectedVariant)
                            const price = variant?.price || product?.price || 0
                            return sum + price * item.quantity
                          }, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-slate-900">Total:</span>
                      <span className="text-slate-900">
                        $
                        {cart
                          .reduce((sum, item) => {
                            const product = products.find((p) => p.id === item.id)
                            const variant = product?.variants?.find((v: any) => v.code === item.selectedVariant)
                            const price = variant?.price || product?.price || 0
                            return sum + price * item.quantity
                          }, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Preview Request Button */}
                  <Button
                    onClick={handlePreviewRequest}
                    disabled={cart.length === 0}
                    className="w-full mt-4 bg-[#0B1B42] hover:bg-[#0B1B42]/90 text-white font-semibold"
                  >
                    Preview Request
                  </Button>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#0B1B42] text-white p-3 rounded-full shadow-lg hover:bg-[#0B1B42]/90 transition-all z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </main>
  )
}

function ProductCard({ product, onAddToCart }: { product: any; onAddToCart: any }) {
  const [quantity, setQuantity] = useState(1)
  const [backerPanel, setBackerPanel] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [notes, setNotes] = useState("")

  const currentPrice = selectedVariant
    ? product.variants?.find((v: any) => v.code === selectedVariant)?.price || product.price
    : product.price

  const currentDimensions = selectedVariant
    ? product.variants?.find((v: any) => v.code === selectedVariant)?.dimensions || product.dimensions
    : product.dimensions

  const currentSqft = selectedVariant
    ? product.variants?.find((v: any) => v.code === selectedVariant)?.sqft || product.sqft
    : product.sqft

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        {/* Product Image */}
        <div className="relative w-full h-48 mb-6 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={200}
            height={200}
            className="object-contain"
          />
        </div>

        {/* Product Info */}
        <h3 className="text-lg font-bold text-slate-900 mb-1">{product.name}</h3>
        <p className="text-sm text-slate-600 mb-4">{product.description}</p>

        {product.variants && product.variants.length > 0 && (
          <div className="mb-4">
            <label className="text-sm font-semibold text-slate-700 block mb-2">
              Select Option: <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedVariant || ""}
              onChange={(e) => setSelectedVariant(e.target.value || null)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#235FF8]"
            >
              <option value="">Select a variant...</option>
              {product.variants.map((variant: any) => (
                <option key={variant.code} value={variant.code}>
                  {variant.name} - ${variant.price}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Specifications */}
        <div className="bg-slate-50 rounded p-3 mb-4 text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-600">Dimensions:</span>
            <span className="font-semibold">{currentDimensions}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">SQ FT:</span>
            <span className="font-semibold">{currentSqft}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Backer Needed:</span>
            <span className="font-semibold">{product.backerNeeded}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Illuminated:</span>
            <span className="font-semibold">{product.illuminated}</span>
          </div>
        </div>

        {/* Price */}
        <div className="text-2xl font-bold text-slate-900 mb-4">${currentPrice}</div>

        {/* Note */}
        <p className="text-xs text-slate-600 mb-4 italic">
          Custom products require review before a price can be provided.
        </p>

        {/* Backer Panel Checkbox */}
        {product.backerPanel && (
          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              id={`backer-${product.id}`}
              checked={backerPanel}
              onChange={(e) => setBackerPanel(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor={`backer-${product.id}`} className="text-sm text-slate-700">
              Backer Panel
            </label>
          </div>
        )}

        {/* Notes textarea */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-slate-700 block mb-2">New Sign Details & Specifications:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any special instructions or comments..."
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#235FF8] min-h-[80px] resize-y"
            rows={3}
          />
        </div>

        {/* Quantity Input */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-slate-700">
            Quantity: <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
            className="mt-2"
          />
        </div>

        {/* Total */}
        <div className="text-lg font-semibold text-slate-900 mb-4">Total: ${(currentPrice * quantity).toFixed(2)}</div>

        {/* Add to Cart Button */}
        <Button
          onClick={() => onAddToCart(product.id, quantity, backerPanel, selectedVariant, notes)}
          className="w-full bg-[#235FF8] hover:bg-[#1d4fc7] text-white font-semibold"
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  )
}
