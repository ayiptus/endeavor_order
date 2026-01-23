import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/dr/favicon.ico", sizes: "any" },
      { url: "/dr/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/dr/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/dr/apple-touch-icon.png",
  },
}

export default function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
