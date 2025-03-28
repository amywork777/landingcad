import type { Metadata } from 'next'
import './globals.css'

export const metadata = {
  title: 'AI CAD',
  description: 'AI-Powered CAD with fully editable parametric STEP files',
  icons: {
    icon: '/fishlogo.svg',
    shortcut: '/fishlogo.svg',
    apple: '/fishlogo.svg',
  }
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
