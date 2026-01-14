import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

export default function DRHomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Logo Header */}
      <header className="border-b py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <img
              src="/images/logo-20dr-20masset-201.png"
              alt="Digital Realty and Modulex"
              className="h-auto"
              style={{ width: "423px", height: "301px" }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Request for Quote</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Select your signage category to begin configuring your request
          </p>
          <Link
            href="/help"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-lg"
          >
            <BookOpen className="w-5 h-5" />
            How to Place an Order
          </Link>
        </div>

        {/* Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Exterior Signs Card */}
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Circular Image */}
              <div className="w-56 h-56 rounded-full overflow-hidden bg-muted flex items-center justify-center border-4 border-background shadow-xl">
                <img src="/images/exterior-20icon.png" alt="Exterior Signs" className="w-full h-full object-cover" />
              </div>

              <h2 className="text-3xl font-bold">Exterior Signs</h2>

              <p className="text-muted-foreground text-lg">Building facades, campus IDs, vehicular directional signs</p>

              <ul className="space-y-2 text-muted-foreground">
                <li>• Building Facade ID</li>
                <li>• Campus ID (Large & Landscape)</li>
                <li>• Secondary Campus ID</li>
                <li>• Building Pylon ID</li>
                <li>• Vehicular Directional Signs</li>
              </ul>

              <Link href="/order?type=exterior" className="w-full">
                <Button size="lg" className="w-full h-12 text-lg">
                  Configure Exterior Signs
                </Button>
              </Link>
            </div>
          </Card>

          {/* Interior Signs Card */}
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Circular Image */}
              <div className="w-56 h-56 rounded-full overflow-hidden bg-muted flex items-center justify-center border-4 border-background shadow-xl">
                <img src="/images/interior-20icon.png" alt="Interior Signs" className="w-full h-full object-cover" />
              </div>

              <h2 className="text-3xl font-bold">Interior Signs</h2>

              <p className="text-muted-foreground text-lg">Office signs, room numbers, wall graphics, branding</p>

              <ul className="space-y-2 text-muted-foreground">
                <li>• Digital Realty Logo</li>
                <li>• Office Identification Signs</li>
                <li>• Room Number Signs</li>
                <li>• Data Center/Hall Signs</li>
                <li>• Wall Graphics & Patterns</li>
              </ul>

              <Link href="/order?type=interior" className="w-full">
                <Button size="lg" className="w-full h-12 text-lg">
                  Configure Interior Signs
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Disclaimer and Important Notice sections below the sign selection cards */}
        <div className="max-w-6xl mx-auto mt-12 space-y-6">
          {/* Important Notice */}
          <div className="bg-muted rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Important Notice</h3>
            <div className="space-y-2 text-muted-foreground italic">
              <p>This estimate is provided as a preliminary budget based on the products requested.</p>
              <p>Prices do not include installation or logistics.</p>
              <p>A site survey is required to confirm the scope and generate an official quotation.</p>
              <p>Custom products require additional review and pricing before inclusion in the budget.</p>
              <p>
                The amounts shown should be considered a wish list or estimate only. A formal quote will be issued once
                the survey project is completed.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
