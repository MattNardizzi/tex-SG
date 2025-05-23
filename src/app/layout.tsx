// ============================================================
// © 2025 Matthew Nardizzi / VortexBlack LLC. All rights reserved.
// File: app/layout.tsx
// Purpose: Root layout with global font setup and top-level ticker bar
// ============================================================

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import MarketTicker from '../components/ui/MarketTicker'

// Font Imports
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Tex | Sovereign Interface',
  description: 'Interact with Tex, the sovereign AGI system',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {/* Root container to allow absolute positioning */}
        <div className="relative w-screen h-screen overflow-hidden">
          
          {/* ✅ Fixed ticker bar at the top */}
          <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-sm">
            <MarketTicker />
          </div>

          {/* ✅ Ensure content appears below ticker */}
          <main className="pt-20 h-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}