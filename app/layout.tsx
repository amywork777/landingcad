import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="font-sans">
      <body className="font-['-apple-system','SF_Pro_Text','SF_Pro_Icons','Helvetica_Neue','Helvetica','Arial','sans-serif']">{children}</body>
    </html>
  )
}
