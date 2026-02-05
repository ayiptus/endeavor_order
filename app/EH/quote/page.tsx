import { Suspense } from "react"
import QuoteClient from "./QuoteClient"

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-slate-600">Loading...</div>
    </div>
  )
}

export default function QuotePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <QuoteClient />
    </Suspense>
  )
}
