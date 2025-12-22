import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowUp } from "lucide-react"

export default function NewOrderHelpPage() {
  return (
    <main className="min-h-screen bg-white">
      <a
        href="#top"
        className="fixed bottom-8 right-8 bg-[#0B1B42] hover:bg-[#0d2557] text-white p-3 rounded-full shadow-lg transition-colors z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </a>

      {/* Header Section */}
      <section id="top" className="py-8 px-4 md:px-8 border-b border-slate-200">
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
          <p className="text-slate-600">
            This guide will walk you through how to navigate the application, select products, customize your order, and
            submit your quotation request step-by-step.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
            <p className="text-slate-700 leading-relaxed">
              This guide will walk you through how to navigate the application, select products, customize your order,
              and submit your quotation request step-by-step.
            </p>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. First Steps: Main Navigation</h2>

            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Select Sign Type</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              On the main menu, choose between <strong>New Order</strong> or <strong>Reorder</strong>.
            </p>
            <div className="mb-8">
              <Image
                src="/images/02-20select-20new-20order.png"
                alt="New Order selection with Endeavor Health logo and sign types"
                width={700}
                height={800}
                className="w-full h-auto rounded-lg border border-slate-200"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-slate-700 font-semibold">Quick Access:</p>
              <p className="text-slate-700">
                To return to the top of the page, click the arrow that appears on the right side.
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Product Selection</h2>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Visual Catalog</h3>
            <p className="text-slate-700 leading-relaxed mb-6">Every item shows the sign layout.</p>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Standard Dimensions</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Select the desired size from the <strong>Dimensions</strong> dropdown. Enter the quantity in{" "}
              <strong>Quantity</strong>. The <strong>Add to Cart</strong> button activates automatically.
            </p>
            <div className="mb-8">
              <Image
                src="/images/04-20select-20options.png"
                alt="Product card with dimensions dropdown showing multiple size options"
                width={950}
                height={250}
                className="w-full h-auto rounded-lg border border-slate-200"
              />
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">New Sign Details & Specifications</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Add any special instructions or comments for your new sign order.
            </p>
            <div className="mb-8">
              <Image
                src="/images/04-20new-20sign-20details.png"
                alt="New sign details text area for special instructions"
                width={950}
                height={150}
                className="w-full h-auto rounded-lg border border-slate-200"
              />
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Shopping Cart</h2>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Shopping Cart (Item Summary)</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Appears on the right and updates in real-time. Displays: quantity per product, subtotal, and grand total.
            </p>
            <div className="mb-6">
              <Image
                src="/images/5-20shopping-20cart.png"
                alt="Shopping cart sidebar showing item summary with quantities, prices, and Preview Request button"
                width={462}
                height={617}
                className="w-full h-auto rounded-lg border border-slate-200"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <p className="text-slate-700 font-semibold">Remove Items:</p>
              <p className="text-slate-700">Use the trash can icon next to each product to remove it from your cart.</p>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Final Review and Submission</h2>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Preview Request</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Click <strong>Preview Request</strong> when your cart is complete.
            </p>
            <div className="mb-8">
              <Image
                src="/images/6-20final-20review.png"
                alt="Preview Request button showing subtotal and total"
                width={450}
                height={200}
                className="w-full h-auto rounded-lg border border-slate-200"
              />
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Mandatory Client Information</h3>
            <p className="text-slate-700 leading-relaxed mb-3">
              Before previewing your request, ensure all fields in Client and Project Information are completed:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Company Name</li>
              <li>Property Address</li>
            </ul>
            <div className="mb-8">
              <Image
                src="/images/6-20clien-20-26-20project.png"
                alt="Client & Project Information form with all required fields"
                width={1000}
                height={300}
                className="w-full h-auto rounded-lg border border-slate-200"
              />
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Terms and Conditions</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Read the <strong>Disclaimer</strong> and <strong>Important Notice</strong> carefully.
            </p>
            <div className="mb-6">
              <Image
                src="/images/6-20terms-20and-20conditions.png"
                alt="Terms and conditions section with disclaimer and important notice"
                width={1050}
                height={550}
                className="w-full h-auto rounded-lg border border-slate-200"
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
              <p className="text-slate-700 font-semibold mb-2">Important Notice:</p>
              <ul className="list-disc list-inside text-slate-700 space-y-1">
                <li>Quote requests are reviewed within 24-48 business hours.</li>
                <li>Final pricing subject to site survey and installation requirements.</li>
                <li>ADA compliance verification included with all applicable signs.</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Final Submission</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Check the disclaimer acceptance checkbox. The blue <strong>Submit Quote Request</strong> button will
              activate. If you need to make adjustments, use <strong>Add More Items</strong> to return.
            </p>
            <div className="mb-8">
              <Image
                src="/images/6-20final-20submission.png"
                alt="Add More Items and Submit Quote Request buttons"
                width={1050}
                height={80}
                className="w-full h-auto rounded-lg border border-slate-200"
              />
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Confirmation and Downloads</h2>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Submission Confirmation</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              A confirmation page with quotation details will appear.
            </p>
            <div className="mb-8">
              <Image
                src="/images/7-20confirmation.png"
                alt="Confirmation page with success message, request number, and order details"
                width={700}
                height={500}
                className="w-full h-auto rounded-lg border border-slate-200"
              />
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Downloadable Reports</h3>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>PDF Report:</strong> Download a summary in PDF format.
            </p>
            <p className="text-slate-700 leading-relaxed mb-6">
              <strong>Excel Report:</strong> Download all data in Excel format.
            </p>
            <div className="mb-6">
              <Image
                src="/images/7-20report.png"
                alt="Download PDF Report and Download Excel Report buttons"
                width={800}
                height={180}
                className="w-full h-auto rounded-lg border border-slate-200"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-slate-700 font-semibold">Continue Shopping:</p>
              <p className="text-slate-700">Use the Home button to start a new order.</p>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Frequently Asked Questions (FAQ)</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Q1: Why can't I proceed to Preview Request?
                </h3>
                <p className="text-slate-700">
                  Ensure all mandatory fields in the Client Information section are completed.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Q2: Does the total include installation and shipping?
                </h3>
                <p className="text-slate-700">
                  No. Shipping and installation costs will be determined after a site survey.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Q3: Can I modify or delete items after adding them?
                </h3>
                <p className="text-slate-700">
                  Yes. Use the trash can icon in the Item Summary to remove products from your cart.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Q4: How do I get a copy of my quotation?</h3>
                <p className="text-slate-700">
                  After submission, you can download PDF and Excel reports from the confirmation page.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Quick Tips</h2>

            <ul className="space-y-3 text-slate-700">
              <li>
                <strong>Plan Ahead:</strong> Review all products before adding to the cart.
              </li>
              <li>
                <strong>Complete Information:</strong> Fill in ALL client data at the beginning to avoid interruptions.
              </li>
              <li>
                <strong>Review Terms:</strong> Always read the disclaimer and Important Notice before submitting.
              </li>
            </ul>
          </Card>

          <div className="flex justify-center pt-8">
            <Link href="/products">
              <Button className="bg-[#235FF8] hover:bg-[#1d4fc7] text-white px-8 py-6 text-lg">Start New Order</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
