import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function MainMenuPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Signage Request Portal</h1>
          <p className="text-xl text-muted-foreground">Select your brand to begin your signage request</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-full flex items-center justify-center">
                <img
                  src="/images/logo-20dr-20masset-201.png"
                  alt="Digital Realty"
                  className="h-auto max-w-full"
                  style={{ maxHeight: "200px" }}
                />
              </div>

              <h2 className="text-2xl font-bold">Digital Realty</h2>

              <p className="text-muted-foreground">
                Request exterior and interior signage for Digital Realty facilities
              </p>

              <Link href="/DR" className="w-full">
                <Button size="lg" className="w-full h-12 text-lg">
                  Enter Digital Realty Portal
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-full flex items-center justify-center">
                <img
                  src="/images/eh-menu-logo.png"
                  alt="Endeavor Health"
                  className="h-auto max-w-full"
                  style={{ maxHeight: "80px" }}
                />
              </div>

              <h2 className="text-2xl font-bold">Endeavor Health</h2>

              <p className="text-muted-foreground">Request interior signage for Endeavor Health facilities</p>

              <Link href="/EH" className="w-full">
                <Button size="lg" className="w-full h-12 text-lg">
                  Enter Endeavor Health Portal
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
