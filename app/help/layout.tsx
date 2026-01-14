import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Help Center - Ordering Guide | order.emodulex.com",
  description:
    "Comprehensive ordering guide with step-by-step instructions for placing orders, managing your account, tracking shipments, and more.",
  keywords: ["ordering guide", "help center", "customer support", "how to order", "FAQ"],
}

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
