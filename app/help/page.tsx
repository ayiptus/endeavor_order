import { Suspense } from "react"
import HelpClient from "./HelpClient"

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground">Loading...</div>
    </div>
  )
}

export default function HelpPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HelpClient />
    </Suspense>
  )
}
