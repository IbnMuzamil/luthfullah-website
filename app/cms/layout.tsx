import type React from "react"
import "../globals.css"

export const metadata = {
  title: 'CMS | Luthfullah',
  description: 'Content management system',
}

export default function CMSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
