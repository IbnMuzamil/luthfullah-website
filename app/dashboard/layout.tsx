import type React from "react"
import "../globals.css"

export const metadata = {
  title: 'Dashboard | Luthfullah',
  description: 'Manage your platform',
}

export default function RootLayout({
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
