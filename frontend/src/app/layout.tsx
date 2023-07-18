// "use client"

import { Providers } from '../redux/provider'
import './globals.css'

export const metadata = {
  title: 'my chat',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <Providers >
      <html lang="en">
        <body>{children}</body>
      </html>
    </Providers>
  )
}
