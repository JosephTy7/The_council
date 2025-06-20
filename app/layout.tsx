import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Council - Elite Development Team",
  description:
    "Meet The Council - an elite team of developers, designers, and innovators crafting exceptional digital experiences in Zambia and beyond.",
  keywords: "The Council, team portfolio, developers, designers, web development, Zambia, technology",
  authors: [{ name: "The Council" }],
  openGraph: {
    title: "The Council - Elite Development Team",
    description:
      "Meet The Council - an elite team of developers, designers, and innovators crafting exceptional digital experiences.",
    type: "website",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
