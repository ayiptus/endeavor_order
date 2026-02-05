import { Suspense } from "react"
import PreviewClient from "./PreviewClient"

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground">Loading...</div>
    </div>
  )
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PreviewClient />
    </Suspense>
  )
}
