import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section with Logo */}
      <section className="py-12 px-4 md:px-8 text-center border-b border-slate-200">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="mb-8 flex justify-center">
            <Image
              src="/images/endeavor-health-logo-main.png"
              alt="Endeavor Health Logo"
              width={360}
              height={67.7}
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Signage Quotation Request</h1>
          <p className="text-lg text-slate-600">Select a category to begin your quote request</p>
        </div>
      </section>

      {/* Menu Cards Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* New Orders Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex flex-col h-full">
                {/* Image Container */}
                <div className="relative w-full h-64 bg-white flex items-center justify-center">
                  <Image
                    src="/images/new-orders-menu-image.png"
                    alt="New Orders"
                    width={800}
                    height={800}
                    className="object-contain"
                    style={{ width: "100%", height: "auto", maxHeight: "400px" }}
                    priority
                  />
                </div>

                {/* Content Container */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">New Order</h2>
                    <ul className="space-y-2 text-sm text-slate-700 mb-6">
                      <li className="flex gap-3">
                        <span className="text-slate-400">-</span>
                        <span>Room ID</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-slate-400">-</span>
                        <span>Ancillary ID</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-slate-400">-</span>
                        <span>Site ID</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-slate-400">-</span>
                        <span>Wall Directories and Maps</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-slate-400">-</span>
                        <span>Flag Signs</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-slate-400">-</span>
                        <span>Overhead Signs</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/EH/help/new-order"
                      className="flex items-center justify-center gap-2 text-sm text-slate-600 hover:text-[#235FF8] transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>How to Place a New Order</span>
                    </Link>
                    <Link href="/EH/products">
                      <Button className="w-full bg-slate-300 hover:bg-[#235FF8] text-slate-900 hover:text-white font-semibold py-2 transition-colors">
                        Start New Order
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
            {/* Reorder Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex flex-col h-full">
                <div className="relative w-full h-64 bg-white flex items-center justify-center">
                  <Image
                    src="/images/reorder-menu.png"
                    alt="Reorder"
                    width={800}
                    height={800}
                    className="object-contain"
                    style={{ width: "100%", height: "auto", maxHeight: "400px" }}
                    priority
                  />
                </div>

                {/* Content Container */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Reorder</h2>
                    <ul className="space-y-2 text-sm text-slate-700 mb-6">
                      <li className="flex gap-3">
                        <span className="text-slate-400">•</span>
                        <span>Identify the signs needed for your project.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-slate-400">•</span>
                        <span>Review each sign's location and details.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-slate-400">•</span>
                        <span>Submit completed review to Modulex.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/EH/help/reorder"
                      className="flex items-center justify-center gap-2 text-sm text-slate-600 hover:text-[#235FF8] transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>How to Place a Reorder</span>
                    </Link>
                    <a href="https://emxreview.wayfindit.com/" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-slate-300 hover:bg-[#235FF8] text-slate-900 hover:text-white font-semibold py-2 transition-colors">
                        Reorder Past Project
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Important Notice Section */}
      <section className="py-12 px-4 md:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 md:p-8 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Important Notice</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex gap-3">
                <span className="font-semibold text-slate-900 min-w-fit">•</span>
                <span>All signage is manufactured to Endeavor Health specifications</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-slate-900 min-w-fit">•</span>
                <span>Quote requests are reviewed within 24-48 business hours</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-slate-900 min-w-fit">•</span>
                <span>Final pricing subject to site survey and installation requirements</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-slate-900 min-w-fit">•</span>
                <span>ADA compliance verification included with all applicable signs</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
