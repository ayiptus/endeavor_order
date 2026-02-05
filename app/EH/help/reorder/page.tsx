import { Suspense } from "react"
import ReorderHelpClient from "./ReorderHelpClient"

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-slate-600">Loading...</div>
    </div>
  )
}

export default function ReorderHelpPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ReorderHelpClient />
    </Suspense>
  )
}
