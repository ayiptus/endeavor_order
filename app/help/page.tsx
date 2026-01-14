"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Info, AlertCircle, ArrowUp, ArrowLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "Q1: Why can't I proceed to Preview Request?",
    answer:
      "Make sure you have completed ALL fields in Client and Project Information. They are mandatory and the system will not allow you to proceed without them.",
  },
  {
    question: "Q2: Why do some products show a price of $0?",
    answer:
      "Custom Size products require manual review. You will receive a specific quotation afterwards. This is normal for custom dimensions.",
  },
  {
    question: "Q3: Can I mix exterior and interior signs in the same order?",
    answer:
      "Yes. Add products of one type, switch to the other using the top-right submenu, and continue adding. Everything will be consolidated into the same Item Summary.",
  },
  {
    question: "Q4: Does the total include installation and shipping?",
    answer:
      "No. The total shown is for the products only. Shipping and installation require a separate survey and are quoted separately.",
  },
  {
    question: "Q5: Can I modify or delete items after adding them?",
    answer:
      "Yes. Use the trash can icon in the Item Summary. You can also adjust quantities before clicking Preview Request.",
  },
  {
    question: "Q6: What should I do if I need a size that is not listed?",
    answer:
      "Select Custom Size, enter the dimensions manually, and add to the cart. It will be processed as a special request.",
  },
  {
    question: "Q7: How do I get a copy of my quotation?",
    answer: "After Submit Request, download the PDF or Excel Report from the confirmation page.",
  },
]

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "first-steps", title: "First Steps: Main Navigation" },
  { id: "quotation-request", title: "Quotation Request" },
  { id: "product-selection", title: "Product Selection" },
  { id: "customization", title: "Customization and Shopping Cart" },
  { id: "final-review", title: "Final Review and Submission" },
  { id: "confirmation", title: "Confirmation and Downloads" },
  { id: "faq", title: "FAQ" },
  { id: "quick-tips", title: "Quick Tips" },
]

export default function HelpPage() {
  const [activeSection, setActiveSection] = useState<string>("")
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      setShowScrollTop(window.scrollY > 400)

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">User Guide: Digital Realty Quote Tool</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Welcome to the Digital Realty Quote Tool. This guide will walk you through how to navigate the
              application, select products, customize your order, and submit your quotation request step-by-step.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sticky Table of Contents */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-20">
              <Card className="p-4">
                <h2 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
                  Table of Contents
                </h2>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground font-medium"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 shrink-0" />
                      {section.title}
                    </button>
                  ))}
                </nav>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            {/* Introduction */}
            <section id="introduction" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">1. Introduction</h2>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                Welcome to the Digital Realty Quote Tool. This guide will walk you through how to navigate the
                application, select products, customize your order, and submit your quotation request step-by-step.
              </p>
            </section>

            {/* First Steps: Main Navigation */}
            <section id="first-steps" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">2. First Steps: Main Navigation</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Select Sign Type</h3>
                  <p className="text-muted-foreground mb-4">
                    On the main menu, choose between <strong>Exterior Sign</strong> or <strong>Interior Sign</strong>.
                  </p>

                  <div className="relative w-full rounded-lg border overflow-hidden mb-4">
                    <img
                      src="/images/01-20main-20menu-20with-20exterior-20interior-20sign-20selection.png"
                      alt="Main menu with Exterior and Interior sign selection cards"
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Switching Between Types</h3>
                  <p className="text-muted-foreground mb-4">
                    Use the submenu in the top right corner to switch between Exterior/Interior at any time.
                  </p>

                  <div className="relative w-full rounded-lg border overflow-hidden mb-4">
                    <img
                      src="/images/02-20top-right-20submenu-20showing-20type-20switcher.png"
                      alt="Top-right submenu showing Interior Signs and Exterior Signs toggle"
                      className="w-full h-auto"
                    />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4 rounded">
                    <div className="flex gap-2">
                      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-blue-900 dark:text-blue-100">Quick Access:</strong>
                        <p className="text-blue-800 dark:text-blue-200 text-sm mt-1">
                          To return to the top of the page, click the arrow that appears on the right side.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quotation Request */}
            <section id="quotation-request" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">3. Quotation Request (Request for Quote)</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Mandatory Client Information</h3>
                  <p className="text-muted-foreground mb-4">Complete all fields in Client and Project Information:</p>

                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4 ml-4">
                    <li>Name</li>
                    <li>Email</li>
                    <li>Company Name</li>
                    <li>Address</li>
                  </ul>

                  <div className="relative w-full rounded-lg border overflow-hidden mb-4">
                    <img
                      src="/images/03-20client-20information-20form-20with-20all-20required-20fields.png"
                      alt="Client information form with Full Name, Email Address, Company Name, and Property Address fields"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Product Selection */}
            <section id="product-selection" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">4. Product Selection</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Visual Catalog</h3>
                  <p className="text-muted-foreground mb-4">Each product displays:</p>

                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4 ml-4">
                    <li>Sign diagram</li>
                    <li>Implementation photo</li>
                    <li>Technical descriptions</li>
                  </ul>

                  <div className="relative w-full rounded-lg border overflow-hidden mb-4">
                    <img
                      src="/images/04-20product-20catalog-20with-20visual-20cards.png"
                      alt="Product catalog showing Digital Realty logo with technical drawing and implementation photos"
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Filters</h3>
                  <p className="text-muted-foreground mb-4">Use the top filters to search by category.</p>

                  <div className="relative w-full rounded-lg border overflow-hidden mb-4">
                    <img
                      src="/images/05-20filter-20bar-20with-20category-20options.png"
                      alt="Filter bar with categories: All, Branding, Wall Graphics, Office Signs, Restroom Signs, Wayfinding, Safety Signs, Directory, Decorative, Regulatory Signs"
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Standard Dimensions</h3>
                  <p className="text-muted-foreground mb-4">
                    Select the desired size from the <strong>Dimensions</strong> dropdown. Enter the quantity in{" "}
                    <strong>Quantity</strong>. The <strong>Add to Cart</strong> button activates automatically.
                  </p>

                  <div className="relative w-full rounded-lg border overflow-hidden mb-4">
                    <img
                      src="/images/06-20product-20card-20with-20dimension-20dropdown.png"
                      alt="Product card with dimensions dropdown showing multiple size options and Add to Cart button"
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Custom Sizes</h3>
                  <p className="text-muted-foreground mb-4">
                    Select <strong>Custom Size</strong> from the dropdown. Manually enter the required dimensions.
                  </p>

                  <div className="relative w-full rounded-lg border overflow-hidden mb-4">
                    <img
                      src="/images/07-20custom-20size-20input-20fields-20for-20dimensions.png"
                      alt="Custom size input field showing dimension input with example format and backer panel checkbox"
                      className="w-full h-auto"
                    />
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4 rounded">
                    <div className="flex gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-900 dark:text-amber-100">Note:</strong>
                        <p className="text-amber-800 dark:text-amber-200 text-sm mt-1">
                          Custom products will not show an initial price (will appear as $0). They require review for
                          final pricing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Customization and Shopping Cart */}
            <section id="customization" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">5. Customization and Shopping Cart</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Shopping Cart (Item Summary)</h3>
                  <p className="text-muted-foreground mb-4">
                    Appears on the right and updates in real-time. Displays: quantity per product, subtotal, and grand
                    total.
                  </p>

                  <div className="relative w-full rounded-lg border overflow-hidden mb-4">
                    <img
                      src="/images/08-20shopping-20cart-20sidebar.png"
                      alt="Shopping cart sidebar showing item summary with 3 items, quantities, prices, and Preview Request button"
                      className="w-full h-auto"
                    />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4 rounded">
                    <div className="flex gap-2">
                      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-blue-900 dark:text-blue-100">Remove Items:</strong>
                        <p className="text-blue-800 dark:text-blue-200 text-sm mt-1">
                          Use the trash can icon next to each product to remove it from your cart.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Special Options (Interior Signs)</h3>
                  <p className="text-muted-foreground mb-4">
                    <strong>Backer Panel:</strong> Activate/deactivate the checkbox as needed.
                  </p>

                  <div className="relative w-full rounded-lg border overflow-hidden mb-4">
                    <img
                      src="/images/09-20backer-20panel-20checkbox-20option.png"
                      alt="Backer panel checkbox option with dimensions dropdown and quantity field"
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Switching Between Types</h3>
                  <p className="text-muted-foreground mb-4">
                    You can toggle between Exterior/Interior without losing items already added. The Item Summary and
                    client information are retained.
                  </p>
                </div>
              </div>
            </section>

            {/* Final Review and Submission */}
            <section id="final-review" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">6. Final Review and Submission</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Preview Request</h3>
                  <p className="text-muted-foreground mb-4">
                    Click <strong>Preview Request</strong> when your cart is complete.
                  </p>

                  <div className="relative w-full rounded-lg border overflow-hidden mb-4">
                    <img
                      src="/images/10-20preview-20request-20button.png"
                      alt="Preview Request button showing subtotal and total"
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Information Review</h3>
                  <p className="text-muted-foreground mb-4">
                    Confirm: Client information + Order details. Custom products will appear with a price of $0 (pending
                    review).
                  </p>

                  <div className="relative w-full rounded-lg border overflow-hidden mb-4">
                    <img
                      src="/images/11-20order-20review-20page.png"
                      alt="Order review page showing client information and request details"
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Terms and Conditions</h3>
                  <p className="text-muted-foreground mb-4">
                    Read the <strong>Disclaimer</strong> and <strong>Import & Notice</strong> carefully.
                  </p>

                  <div className="relative w-full rounded-lg border overflow-hidden mb-4">
                    <img
                      src="/images/12-20terms-20and-20conditions-20section.png"
                      alt="Terms and conditions section with disclaimer and important notice"
                      className="w-full h-auto"
                    />
                  </div>

                  <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 rounded">
                    <div className="flex gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-red-900 dark:text-red-100">Important:</strong>
                        <p className="text-red-800 dark:text-red-200 text-sm mt-1">
                          The total does not include shipping or installation costs. A survey is required to confirm the
                          scope.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Final Submission</h3>
                  <p className="text-muted-foreground mb-4">
                    Check the disclaimer acceptance checkbox. The green <strong>Submit Request</strong> button will
                    activate. If you need to make adjustments, use <strong>Back</strong> to return.
                  </p>

                  <div className="relative w-full rounded-lg border overflow-hidden mb-4">
                    <img
                      src="/images/13-20submit-20request-20button.png"
                      alt="Submit Request button and Back button"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Confirmation and Downloads */}
            <section id="confirmation" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">7. Confirmation and Downloads</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Submission Confirmation</h3>
                  <p className="text-muted-foreground mb-4">A confirmation page with quotation details will appear.</p>

                  <div className="relative w-full rounded-lg border overflow-hidden mb-4">
                    <img
                      src="/images/14-20confirmation-20page-20with-20order-20summary.png"
                      alt="Confirmation page with success message, request number, and order details"
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Downloadable Reports</h3>
                  <p className="text-muted-foreground mb-4">
                    <strong>PDF Report:</strong> Download a summary in PDF format.
                    <br />
                    <strong>Excel Report:</strong> Download all data in Excel format.
                  </p>

                  <div className="relative w-full rounded-lg border overflow-hidden mb-4">
                    <img
                      src="/images/15-20download-20buttons-20for-20pdf-20and-20excel-20.png"
                      alt="Download PDF Report and Download Excel Report buttons"
                      className="w-full h-auto"
                    />
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500 p-4 rounded">
                    <div className="flex gap-2">
                      <Info className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-green-900 dark:text-green-100">Continue Shopping:</strong>
                        <p className="text-green-800 dark:text-green-200 text-sm mt-1">
                          Use the Home button to start a new order.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">8. Frequently Asked Questions (FAQ)</h2>

              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Quick Tips */}
            <section id="quick-tips" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">9. Quick Tips</h2>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <p className="text-muted-foreground">
                    <strong>Plan Ahead:</strong> Review all products before adding to the cart.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <p className="text-muted-foreground">
                    <strong>Custom Orders:</strong> Keep in mind that custom orders will have additional processing
                    times.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <p className="text-muted-foreground">
                    <strong>Complete Information:</strong> Fill in ALL client data at the beginning to avoid
                    interruptions.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <p className="text-muted-foreground">
                    <strong>Review Terms:</strong> Always read the disclaimer and Import & Notice before submitting.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-muted rounded-lg border">
                <h3 className="font-semibold text-lg mb-2">Need Additional Help?</h3>
                <p className="text-muted-foreground">
                  Contact our support team if you encounter technical difficulties or have specific questions about
                  products.
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
