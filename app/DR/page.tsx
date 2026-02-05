import { Suspense } from "react"
import DRClient from "./DRClient"

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground">Loading...</div>
    </div>
  )
}

export default function DRHomePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DRClient />
    </Suspense>
  )
}
