import type React from "react"
export default function DRLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div data-brand="dr">{children}</div>
}
