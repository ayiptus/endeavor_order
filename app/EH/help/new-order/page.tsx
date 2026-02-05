import { Suspense } from "react"
import NewOrderHelpClient from "./NewOrderHelpClient"

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-slate-600">Loading...</div>
    </div>
  )
}

export default function NewOrderHelpPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <NewOrderHelpClient />
    </Suspense>
  )
}
