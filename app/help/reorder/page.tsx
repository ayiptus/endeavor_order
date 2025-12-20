import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowUp } from "lucide-react"

export default function ReorderHelpPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How to Place a Reorder</h1>
          <p className="text-slate-600">Guide to reviewing and reordering interior signage assets</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The following guide provides an overview of essential steps for reviewing your interior signage assets.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The guide provides a step-by-step process on how to access images, filter data, reject or approve a sign,
              and add comments.
            </p>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Click on Login to Access the Projects</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Navigate to the Emodulex system and click the Login button to begin.
            </p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Image
                src="/images/02-eh-20helpasset-2013.png"
                alt="Emodulex login screen"
                width={800}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Enter Your Email Address</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Under Email Address, enter the email you previously shared with Modulex.
            </p>
            <p className="text-slate-700 leading-relaxed mb-6">
              After clicking Continue, you'll receive an access code to your email. Enter the code to gain access and
              click on Continue again.
            </p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Image
                src="/images/03-eh-20helpasset-2012.png"
                alt="Email entry and verification code screens"
                width={1400}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Use the Search Bar</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              In the Search bar, you can filter the project by code or name.
            </p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Image
                src="/images/04-eh-20helpasset-2011.png"
                alt="Project dashboard with search functionality"
                width={1200}
                height={550}
                className="w-full h-auto"
              />
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Visualize Your Projects</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              This is how you will visualize your projects. Review the list of available tasks and select the one you
              need to work on.
            </p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Image
                src="/images/05-eh-20helpasset-2010.png"
                alt="Project visualization with floor and pending items"
                width={1200}
                height={550}
                className="w-full h-auto"
              />
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Use Filters to Simplify Your Search</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              To simplify your search, use Filters to isolate signs by Action, Status, Type, or Plan.
            </p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Image
                src="/images/06-eh-20helpasset-209.png"
                alt="Filters dropdown menu"
                width={1200}
                height={550}
                className="w-full h-auto"
              />
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Review In-Scope Signs by Action</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              To review all "in scope" signs marked for reorder, select By Action from the filters menu.
            </p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Image
                src="/images/07-eh-20helpasset-208.png"
                alt="Filter by action menu options"
                width={1200}
                height={550}
                className="w-full h-auto"
              />
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Select New, Replace, and To Install</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Please select "New", "Replace" and "To install" for review. Upon selection, only the specified in scope
              signs will be displayed. Click on the desired floor to access the map.
            </p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Image
                src="/images/08-eh-20helpasset-207.png"
                alt="Filter with New, Replace, and To Install selected"
                width={1200}
                height={550}
                className="w-full h-auto"
              />
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. View Exact Sign Location</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              You can view the exact location of the sign by clicking on the binocular icon on the floor plan.
            </p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Image
                src="/images/09-eh-20helpasset-206.png"
                alt="Floor plan view showing sign locations"
                width={1600}
                height={450}
                className="w-full h-auto"
              />
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. View Sign Details</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Click on the eye icon to view the sign details. This will open a detailed view showing all information
              captured about the sign.
            </p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Image
                src="/images/10-eh-20helpasset-2016.png"
                alt="Click eye icon to view sign details"
                width={1200}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Approve or Reject Signs and Add Comments</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Using the details window, you can approve or reject a sign, leave us a comment on how you want the new
              sign and view all the information captured about it. Review the sign type, quantity, branding, attachment
              method, and finish specifications.
            </p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Image
                src="/images/11-eh-20helpasset-2015.png"
                alt="Sign details window with approve/reject options"
                width={1200}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Zoom Feature for Images</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              In the photos tab, you will find a zoom-in feature for the images. This allows you to closely inspect
              existing signage conditions and details.
            </p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Image
                src="/images/12-eh-20helpasset-203.png"
                alt="Photo zoom feature showing sign image"
                width={1200}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Engage in Discussion</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Here, you may engage in a chat with your colleagues to share various opinions regarding the sign. Use the
              discussion tab to collaborate and make informed decisions.
            </p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Image
                src="/images/13-eh-20helpasset-202.png"
                alt="Discussion tab for team collaboration"
                width={1200}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Review Specifications and Survey Images</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Click on any sign to review specifications and survey images of existing conditions. In this section, you
              can also approve or reject the sign, leave a comment, and view all the information captured about it.
            </p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Image
                src="/images/14-eh-20helpasset-2014.png"
                alt="Full view with sign specifications and survey images"
                width={1600}
                height={450}
                className="w-full h-auto"
              />
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">15. Submit for Review</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Once you have completed your review and made all necessary approvals or rejections, you're ready to submit
              for order confirmation.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Please send an email to{" "}
              <a href="mailto:gaa.orders@modulex.com" className="text-[#235FF8] hover:text-blue-800 font-semibold">
                gaa.orders@modulex.com
              </a>{" "}
              stating the site name and code, and that it is ready for our review and order confirmation.
            </p>
          </Card>

          <div className="flex justify-center pt-8">
            <a href="https://emxreview.wayfindit.com/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#0B1B42] hover:bg-[#0d2557] text-white px-8 py-6 text-lg">
                Go to Reorder System
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
