import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import FlameCursor from '../components/FlameCursor'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Meka Sriram — AI & Full-Stack Engineer',
  description: 'Meka Sriram | CSE (AI & ML) | Full-Stack & AI Engineer | Building real-time, intelligent systems',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className} cursor-none`}>
        <FlameCursor />
        {children}
      </body>
    </html>
  )
}
