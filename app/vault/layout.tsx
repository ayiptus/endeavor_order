import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Order Vault | Modulex",
  description: "Admin dashboard for viewing and exporting order data",
}

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
