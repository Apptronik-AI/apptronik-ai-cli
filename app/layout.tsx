import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Apptronik AI CLI',
  description: 'Autopilot Crypto Asset Management',
  generator: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
