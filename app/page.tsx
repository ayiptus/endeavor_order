import { Suspense } from "react"
import MainMenuClient from "./MainMenuClient"

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground">Loading...</div>
    </div>
  )
}

export default function MainMenuPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <MainMenuClient />
    </Suspense>
  )
}
