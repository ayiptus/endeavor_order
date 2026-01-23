import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Endeavor Health - Order Site",
  description: "Request quotes for Endeavor Health signage projects",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/eh/favicon.ico", sizes: "any" },
      { url: "/eh/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/eh/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/eh/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div data-brand="eh">
      <div className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </div>
    </div>
  )
}
