"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { BookOpen, Trash2, Home } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"

type SignType = "exterior" | "interior"

interface Product {
  id: string
  name: string
  code: string
  category: string
  image: string
  dimensions: { label: string; width: number; height: number; price: number; sqft: number; illuminated: boolean }[]
  description?: string
}

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

const exteriorProducts: Product[] = [
  {
    id: "building-facade-id",
    name: "Building Facade ID",
    code: "A4.1",
    category: "Branding",
    image: "/images/a4.1.png",
    description: "Building-mounted identification signage",
    dimensions: [
      { label: "2' 5.75\" x 7' 9.75\"", width: 93.75, height: 29.75, price: 9272.87, sqft: 18.8, illuminated: false },
      { label: "2' 4\" x 9' 9\"", width: 117, height: 28, price: 9618.14, sqft: 19.5, illuminated: false },
      { label: '36" x 101.8"', width: 101.8, height: 36, price: 12552.9, sqft: 25.45, illuminated: false },
      { label: "2' 3.5\" x 15' 1\"", width: 181, height: 27.5, price: 17602.53, sqft: 34.16, illuminated: true },
      { label: "4' 0.6\" x 8' 8\"", width: 104, height: 48.6, price: 19201.74, sqft: 38.93, illuminated: false },
      {
        label: "4' 1.53\" x 11' 8.15\"",
        width: 140.15,
        height: 49.53,
        price: 24842.45,
        sqft: 48.21,
        illuminated: true,
      },
      { label: '60" x 169.76"', width: 169.76, height: 60, price: 34035.98, sqft: 70.73, illuminated: false },
      { label: '60" x 169.96"', width: 169.96, height: 60, price: 34016.73, sqft: 70.69, illuminated: false },
      { label: "6' 7.4\" x 14' 2\"", width: 170, height: 79.4, price: 52877.5, sqft: 93.67, illuminated: false },
      { label: "6' 8\" x 18' 10.35\"", width: 226.35, height: 80, price: 70988.62, sqft: 125.753, illuminated: true },
    ],
  },
  {
    id: "campus-id-large",
    name: "Campus ID (Large)",
    code: "A1.2",
    category: "Branding",
    image: "/images/a1.2.png",
    description: "Large campus identification monument sign",
    dimensions: [{ label: '138" x 124"', width: 124, height: 138, price: 17545.0, sqft: 118.8, illuminated: true }],
  },
  {
    id: "campus-id-landscape",
    name: "Campus ID Landscape",
    code: "A1.3",
    category: "Branding",
    image: "/images/a1.3.png",
    description: "Landscape-oriented campus identification sign",
    dimensions: [
      { label: '39.96" x 84"', width: 84, height: 39.96, price: 20387.5, sqft: 23.31, illuminated: true },
      { label: '48" x 144" x 10"', width: 144, height: 48, price: 35264.86, sqft: 48, illuminated: true },
      { label: '44" x 240" x 12"', width: 240, height: 44, price: 76125.0, sqft: 73.33, illuminated: true },
    ],
  },
  {
    id: "secondary-campus-id",
    name: "Secondary Campus ID",
    code: "A2",
    category: "Wayfinding",
    image: "/images/a2.png",
    description: "Secondary campus directional and identification signage",
    dimensions: [
      { label: "4' 8\" x 2' 6\"", width: 30, height: 56, price: 5293.75, sqft: 11.68, illuminated: false },
      { label: '60" x 30"', width: 30, height: 60, price: 6655.0, sqft: 12.5, illuminated: false },
      { label: '84" x 30"', width: 30, height: 84, price: 8470.0, sqft: 17.5, illuminated: false },
    ],
  },
  {
    id: "building-pylon-id",
    name: "Building Pylon ID",
    code: "A3",
    category: "Directory",
    image: "/images/a3.png",
    description: "Vertical building identification pylon signage",
    dimensions: [
      { label: "7' x 1'3\" x 4.5\"", width: 15, height: 84, price: 8434.0, sqft: 8.75, illuminated: false },
      { label: '84" x 15"', width: 15, height: 84, price: 13028.48, sqft: 10.5, illuminated: false },
    ],
  },
  {
    id: "primary-vehicular-directional",
    name: "Primary Vehicular Directional",
    code: "B1",
    category: "Wayfinding",
    image: "/images/b1.png",
    description: "Primary vehicular directional signage",
    dimensions: [
      { label: "7' x 2' 6\" x 4.5\"", width: 30, height: 84, price: 16328.25, sqft: 17.5, illuminated: false },
      { label: "7' x 2' 6\"", width: 30, height: 84, price: 16803.25, sqft: 21, illuminated: false },
    ],
  },
  {
    id: "secondary-vehicular-directional",
    name: "Secondary Vehicular Directional",
    code: "B2",
    category: "Wayfinding",
    image: "/images/b2.png",
    description: "Secondary vehicular directional signage",
    dimensions: [{ label: "5' x 2' 6\"", width: 30, height: 60, price: 14430.4, sqft: 12.5, illuminated: false }],
  },
]

const interiorProducts: Product[] = [
  {
    id: "lobby-logo-wall",
    name: "Lobby Logo Wall (Dimensions vary)",
    code: "L1.24",
    category: "Branding",
    image: "/images/l1-20interiorasset-202.png",
    description: "Large lobby logo installation with Digital Realty branding",
    dimensions: [
      { label: "H: 2' x W: 5' 7.9\"", width: 67.9, height: 24, price: 11390.68, sqft: 11.62, illuminated: false },
    ],
  },
  {
    id: "security-room-graphics",
    name: "Security Room Graphics - Logo 'D'",
    code: "L2.1",
    category: "Wall Graphics",
    image: "/images/l2.1-interiorasset-4.png",
    description: "Security room graphics with Digital Realty logo bracket pattern",
    dimensions: [{ label: 'H: 47" x W: 47"', width: 47, height: 47, price: 1055, sqft: 15.33, illuminated: false }],
  },
  {
    id: "wall-pattern-graphics",
    name: 'Security Room Graphics (Frame "D")',
    code: "L2.2",
    category: "Wall Graphics",
    image: "/images/l2.png",
    description: 'Dimensions: H: 118" x W: 155"\nSQ FT: 127.01\nIlluminated: No\nSale Price: $1,512.50',
    dimensions: [
      { label: 'H: 118" x W: 155"', width: 155, height: 118, price: 1512.5, sqft: 127.01, illuminated: false },
    ],
  },
  {
    id: "specialty-room-id",
    name: "Specialty Room ID",
    code: "L3.1",
    category: "Office Signs",
    image: "/images/l3.png",
    description: "Specialty office room identification with braille",
    dimensions: [
      { label: 'H: 8.75" x W: 11"', width: 11, height: 8.75, price: 314.24, sqft: 0.67, illuminated: false },
    ],
  },
  {
    id: "specialty-data-hall-id",
    name: "Specialty Data Hall ID",
    code: "L3.2",
    category: "Office Signs",
    image: "/images/l3.2-interiorasset-28.png",
    description: "Data center room identification with contact information",
    dimensions: [
      { label: 'H: 8.75" x W: 11"', width: 11, height: 8.75, price: 314.24, sqft: 0.65, illuminated: false },
    ],
  },
  {
    id: "room-id-long-l4",
    name: "Room ID (Long)",
    code: "L4",
    category: "Office Signs",
    image: "/images/l6.2-interiorasset-17.png",
    description: "Long format room identification sign",
    dimensions: [{ label: 'H: 6" x W: 10"', width: 10, height: 6, price: 195.89, sqft: 0.42, illuminated: false }],
  },
  {
    id: "office-id",
    name: "Office ID",
    code: "L5",
    category: "Office Signs",
    image: "/images/l5-interiorasset-31.png",
    description: "Standard office identification sign",
    dimensions: [{ label: 'H: 6" x W: 10"', width: 10, height: 6, price: 337.5, sqft: 0.42, illuminated: false }],
  },
  {
    id: "room-id-short",
    name: "Room ID (Short)",
    code: "L6.1",
    category: "Office Signs",
    image: "/images/l6.1-interiorasset-25.png",
    description: "Short format data hall room identification",
    dimensions: [{ label: 'H: 6" x W: 8"', width: 8, height: 6, price: 147.42, sqft: 0.33, illuminated: false }],
  },
  {
    id: "room-id-long-l6",
    name: "Room ID (Long)",
    code: "L6.2",
    category: "Office Signs",
    image: "/images/l6.2-interiorasset-17.png",
    description: "Long format room identification sign",
    dimensions: [{ label: 'H: 6" x W: 10"', width: 10, height: 6, price: 195.89, sqft: 0.42, illuminated: false }],
  },
  {
    id: "wc-id-short",
    name: "WC ID (Short)",
    code: "L7.1",
    category: "Restroom Signs",
    image: "/images/l7.1-interiorasset-13.png",
    description: "Restroom identification with accessibility symbols",
    dimensions: [{ label: 'H: 8.25" x W: 6"', width: 6, height: 8.25, price: 149.54, sqft: 0.34, illuminated: false }],
  },
  {
    id: "wc-id-long",
    name: "WC ID (Long)",
    code: "L7.2",
    category: "Restroom Signs",
    image: "/images/l7.2-interiorasset-15.png",
    description: "Long format restroom identification with shower",
    dimensions: [
      { label: 'H: 8.25" x W: 10"', width: 10, height: 8.25, price: 174.78, sqft: 0.57, illuminated: false },
    ],
  },
  {
    id: "primary-wall-directional",
    name: "Primary Wall Directional",
    code: "M1",
    category: "Wayfinding",
    image: "/images/m1-interiorasset-16.png",
    description: "Primary wall-mounted directional signage",
    dimensions: [{ label: 'H: 36" x W: 12"', width: 12, height: 36, price: 521.51, sqft: 3, illuminated: false }],
  },
  {
    id: "secondary-wall-directional",
    name: "Secondary Wall Directional",
    code: "M2",
    category: "Wayfinding",
    image: "/images/m2-interiorasset-27.png",
    description: "Secondary wall-mounted directional signage",
    dimensions: [
      { label: "H: 1' 7.50\" x W: 1' 0.00\"", width: 12, height: 19.5, price: 310.05, sqft: 1.31, illuminated: false },
    ],
  },
  {
    id: "loading-bay-directional",
    name: "Loading Bay Directional",
    code: "M3.1",
    category: "Wayfinding",
    image: "/images/m3.1-interiorasset-29.png",
    description: "Loading bay directional signage",
    dimensions: [
      { label: 'H: 15" x W: 9.75"', width: 9.75, height: 15, price: 318.87, sqft: 1.02, illuminated: false },
    ],
  },
  {
    id: "building-directory",
    name: "Building Directory",
    code: "N1",
    category: "Directory",
    image: "/images/n1-interiorasset-21.png",
    description: "Building tenant directory signage",
    dimensions: [{ label: "H: 3' x W: 1' 8\"", width: 20, height: 36, price: 822.6, sqft: 5, illuminated: false }],
  },
  {
    id: "glass-privacy-black",
    name: "Glass Privacy Graphics in Black",
    code: "P1",
    category: "Decorative",
    image: "/images/p1-20-20interiorasset-201.png",
    description: "Black privacy graphics for glass surfaces",
    dimensions: [{ label: 'H: 27" x W: 242"', width: 242, height: 27, price: 2247.5, sqft: 45.45, illuminated: false }],
  },
  {
    id: "glass-privacy-dusted",
    name: "Glass Privacy Graphics - Dusted Vinyl and White Pattern",
    code: "P1",
    category: "Decorative",
    image: "/images/p1-20whte-20interiorasset-205.png",
    description: "Dusted vinyl privacy graphics with white pattern",
    dimensions: [{ label: "H: 2.25' x 8.75'", width: 105, height: 27, price: 590, sqft: 19.69, illuminated: false }],
  },
  {
    id: "maximum-occupancy",
    name: "Maximum Occupancy",
    code: "R7",
    category: "Regulatory Signs",
    image: "/images/r07-20maximum-20occupancyasset-205.png",
    description: "Maximum occupancy notice",
    dimensions: [{ label: 'H: 4" x W: 8"', width: 8, height: 4, price: 74.97, sqft: 0.22, illuminated: false }],
  },
  {
    id: "room-id-braille",
    name: "Code Room ID",
    code: "R1",
    category: "Office Signs",
    image: "/images/r1-20interiorasset-2030.png",
    description: "Room identification with braille - Generator Room, Telephone Room, etc.",
    dimensions: [{ label: 'H: 6" x W: 10"', width: 10, height: 6, price: 164.21, sqft: 0.42, illuminated: false }],
  },
  {
    id: "restroom-symbols",
    name: "Title 24 Restroom ID (California Only)",
    code: "R2",
    category: "Restroom Signs",
    image: "/images/r2-20interiorasset-2014.png",
    description:
      "Accessible restroom identification symbols in circular or triangular format with 3 options A, B, and C.",
    dimensions: [
      {
        label: 'Option A: H: 12" x W: 12" - 0.08 sq ft - $1000.00',
        width: 12,
        height: 12,
        price: 1000.0,
        sqft: 0.08,
        illuminated: false,
      },
      {
        label: 'Option B: H: 12" x W: 12" - 0.08 sq ft - $1000.00',
        width: 12,
        height: 12,
        price: 1000.0,
        sqft: 0.08,
        illuminated: false,
      },
      {
        label: 'Option C: H: 12" x W: 12" - 0.08 sq ft - $1185.00',
        width: 12,
        height: 12,
        price: 1185.0,
        sqft: 0.08,
        illuminated: false,
      },
    ],
  },
  {
    id: "stair-id",
    name: "Stair ID",
    code: "R3.1",
    category: "Safety Signs",
    image: "/images/r3.1-interiorasset-22.png",
    description: "Stairwell identification signage",
    dimensions: [{ label: 'H: 6" x W: 8"', width: 8, height: 6, price: 147.42, sqft: 0.33, illuminated: false }],
  },
  {
    id: "exit-id",
    name: "Exit ID",
    code: "R3.2",
    category: "Safety Signs",
    image: "/images/r3.png",
    description: "Exit identification signage",
    dimensions: [{ label: 'H: 6" x W: 8"', width: 8, height: 6, price: 147.42, sqft: 0.33, illuminated: false }],
  },
  {
    id: "stairwell-level-id",
    name: "Stairwell Level ID",
    code: "R4",
    category: "Safety Signs",
    image: "/images/r4-20interiorasset-2024.png",
    description: "Stairwell level identification",
    dimensions: [{ label: 'H: 18" x W: 16"', width: 16, height: 18, price: 476.64, sqft: 2, illuminated: false }],
  },
  {
    id: "evacuation-plan-portrait",
    name: "Evacuation Map (Portrait)",
    code: "R6.1",
    category: "Safety Signs",
    image: "/images/r6.1-interiorasset-32.png",
    description: 'Dimensions: H: 15" x W: 9.75"\nSQ FT: 1.02\nIlluminated: No\nSale Price: $318.87',
    dimensions: [
      { label: 'H: 15" x W: 9.75"', width: 9.75, height: 15, price: 318.87, sqft: 1.02, illuminated: false },
    ],
  },
  {
    id: "evacuation-plan-landscape",
    name: "Evacuation Map (Landscape)",
    code: "R6.2",
    category: "Safety Signs",
    image: "/images/r6.png",
    description: 'Dimensions: H: 12" x W: 13.5"\nSQ FT: 1.12\nIlluminated: No\nSale Price: $326.43',
    dimensions: [
      { label: 'H: 12" x W: 13.5"', width: 13.5, height: 12, price: 326.43, sqft: 1.12, illuminated: false },
    ],
  },
]

export default function OrderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [signType, setSignType] = useState<SignType>("exterior")
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [clientInfo, setClientInfo] = useState({
    fullName: "",
    email: "",
    company: "",
    propertyAddress: "",
  })

  useEffect(() => {
    const type = searchParams.get("type")
    if (type === "exterior" || type === "interior") {
      setSignType(type)
    }
  }, [searchParams])

  const currentProducts = signType === "exterior" ? exteriorProducts : interiorProducts

  const categories = ["All", ...new Set(currentProducts.map((p) => p.category))]
  const filteredProducts =
    selectedCategory === "All" ? currentProducts : currentProducts.filter((p) => p.category === selectedCategory)

  const addToCart = (
    product: Product,
    dimension: string,
    quantity: number,
    backerPanel: boolean,
    customSize?: { height: number; width: number },
  ) => {
    const dim = product.dimensions.find((d) => d.label === dimension)
    if (!dim && dimension !== "custom") return

    const isCustom = dimension === "custom"
    const sqft = isCustom && customSize ? (customSize.height * customSize.width) / 144 : dim?.sqft || 0
    const dimensionLabel = isCustom && customSize ? `${customSize.height} x ${customSize.width}` : dimension

    setCart([
      ...cart,
      {
        id: `${product.id}-${Date.now()}`,
        name: product.name,
        image: product.image,
        dimensions: dimensionLabel,
        sqft,
        price: dim?.price || 0,
        quantity,
        backerPanel,
        illuminated: dim?.illuminated || false,
        customSize: isCustom,
      },
    ])
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handlePreviewRequest = () => {
    if (!clientInfo.fullName || !clientInfo.email || !clientInfo.company || !clientInfo.propertyAddress) {
      alert("Please fill in all client information fields before proceeding.")
      return
    }

    if (cart.length === 0) {
      alert("Please add at least one item to your cart before proceeding.")
      return
    }

    localStorage.setItem("clientInfo", JSON.stringify(clientInfo))
    localStorage.setItem("cartItems", JSON.stringify(cart))

    router.push("/preview")
  }

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />

      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Switch type:</span>
              <Button
                variant={signType === "interior" ? "default" : "ghost"}
                onClick={() => {
                  console.log("[v0] Switching to interior signs")
                  setSignType("interior")
                }}
                size="sm"
              >
                Interior Signs
              </Button>
              <span className="text-sm text-muted-foreground">|</span>
              <Button
                variant={signType === "exterior" ? "default" : "ghost"}
                onClick={() => {
                  console.log("[v0] Switching to exterior signs")
                  setSignType("exterior")
                }}
                size="sm"
              >
                Exterior Signs
              </Button>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Request for Quote</h1>
            <p className="text-muted-foreground">Select your signage products and quantities</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <Link
            href="/help"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-base"
          >
            <BookOpen className="w-5 h-5" />
            How to Place an Order
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Client Information */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Client & Project Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={clientInfo.fullName}
                    onChange={(e) => setClientInfo({ ...clientInfo, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    placeholder="Enter your company name"
                    value={clientInfo.company}
                    onChange={(e) => setClientInfo({ ...clientInfo, company: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="propertyAddress">Property Address *</Label>
                  <Input
                    id="propertyAddress"
                    placeholder="Enter the property address"
                    value={clientInfo.propertyAddress}
                    onChange={(e) => setClientInfo({ ...clientInfo, propertyAddress: e.target.value })}
                  />
                </div>
              </div>
            </Card>

            {/* Product Catalog */}
            <div>
              <h2 className="text-xl font-bold mb-4">Product Catalog</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-full"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="grid gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </div>
          </div>

          {/* Shopping Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Item Summary</h3>
                <Badge variant="secondary">{cart.length} items</Badge>
              </div>

              {cart.length > 0 && (
                <Button variant="outline" className="w-full mb-4 bg-transparent" onClick={() => setCart([])}>
                  Clear All
                </Button>
              )}

              <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-8">Your cart is empty</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.dimensions}</p>
                        {item.customSize && (
                          <p className="text-xs text-orange-600 mt-1">
                            * Custom products require review before a price can be provided.
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm">Qty: {item.quantity}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                            className="h-6 w-6 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${item.price.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">${item.price.toLocaleString()} each</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <Button className="w-full mt-4" size="lg" disabled={cart.length === 0} onClick={handlePreviewRequest}>
                Preview Request
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product
  onAddToCart: (
    product: Product,
    dimension: string,
    quantity: number,
    backerPanel: boolean,
    customSize?: { height: number; width: number },
  ) => void
}) {
  const [selectedDimension, setSelectedDimension] = useState(product.dimensions[0]?.label || "")
  const [quantity, setQuantity] = useState(0)
  const [backerPanel, setBackerPanel] = useState(false)
  const [customSize, setCustomSize] = useState({ height: "", width: "" })

  const selectedDim = product.dimensions.find((d) => d.label === selectedDimension)
  const isCustom = selectedDimension === "custom"

  const handleAdd = () => {
    if (quantity > 0 && selectedDimension) {
      onAddToCart(
        product,
        selectedDimension,
        quantity,
        backerPanel,
        isCustom
          ? { height: Number.parseFloat(customSize.height), width: Number.parseFloat(customSize.width) }
          : undefined,
      )
      setQuantity(0)
      setBackerPanel(false)
      setCustomSize({ height: "", width: "" })
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="relative">
          <div className="w-full rounded-lg overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "988/475" }}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl font-bold">{product.name}</h3>
              <Badge variant="secondary" className="shrink-0">
                {product.category}
              </Badge>
            </div>
            {product.description && <p className="text-sm text-muted-foreground">{product.description}</p>}
            <p className="text-sm text-muted-foreground mt-1">Code: {product.code}</p>
          </div>

          <div>
            <Label>Dimensions</Label>
            <Select value={selectedDimension} onValueChange={setSelectedDimension}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {product.dimensions.map((dim) => (
                  <SelectItem key={dim.label} value={dim.label}>
                    {dim.label}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Custom Size</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedDim && !isCustom && (
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Dimensions:</span>
                <p className="font-medium">
                  H: {selectedDim.height}" x W: {selectedDim.width}"
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Square Feet:</span>
                <p className="font-medium">{selectedDim.sqft.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Illuminated:</span>
                <p className="font-medium">{selectedDim.illuminated ? "YES" : "NO"}</p>
              </div>
            </div>
          )}

          {isCustom && (
            <div className="p-4 bg-muted/50 rounded-lg space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`custom-height-${product.id}`}>Height (inches):</Label>
                  <Input
                    id={`custom-height-${product.id}`}
                    placeholder="e.g., 40"
                    value={customSize.height}
                    onChange={(e) => setCustomSize({ ...customSize, height: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor={`custom-width-${product.id}`}>Width (inches):</Label>
                  <Input
                    id={`custom-width-${product.id}`}
                    placeholder="e.g., 100"
                    value={customSize.width}
                    onChange={(e) => setCustomSize({ ...customSize, width: e.target.value })}
                  />
                </div>
              </div>
              <p className="text-sm text-orange-600 italic">
                * Custom products require review before a price can be provided.
              </p>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Checkbox
              id={`backer-${product.id}`}
              checked={backerPanel}
              onCheckedChange={(checked) => setBackerPanel(checked === true)}
            />
            <Label htmlFor={`backer-${product.id}`} className="cursor-pointer font-normal">
              Backer Needed: {backerPanel ? "YES" : "NO"}
            </Label>
          </div>

          {selectedDim && !isCustom && (
            <div className="text-3xl font-bold">
              ${selectedDim.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          )}

          <div className="flex items-end gap-4">
            <div className="flex-1">
              <Label>Quantity</Label>
              <Input
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 0)}
                placeholder="0"
                disabled={isCustom && (!customSize.height || !customSize.width)}
              />
            </div>
            <Button
              onClick={handleAdd}
              disabled={quantity === 0 || !selectedDimension || (isCustom && (!customSize.height || !customSize.width))}
              className="flex-1"
              size="lg"
            >
              + Add to Order
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
