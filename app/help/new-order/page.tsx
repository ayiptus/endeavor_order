import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function NewOrderHelpPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="py-8 px-4 md:px-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
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
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How to Place a New Order</h1>
          <p className="text-slate-600">Step-by-step guide to ordering interior signage</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <div className="prose max-w-none">
              <p className="text-slate-600 mb-6">
                This help section will provide detailed instructions on how to place a new order for interior signage.
                Content and images will be added here.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
                <p className="text-slate-500 italic">Help content coming soon...</p>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/products">
                <Button className="bg-[#235FF8] hover:bg-[#1d4fc7] text-white">Start New Order</Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}
