import type React from "react"
import "../globals.css"

export const metadata = {
  title: 'Admin | Luthfullah',
  description: 'Admin dashboard',
}

export default function AdminLayout({
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
