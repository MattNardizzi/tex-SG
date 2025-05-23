'use client'

import SpineCanvas from '@/components/Spine/SpineCanvas'
import SovereignTextbox from '@/components/SovereignTextbox'
import MutationLogPanel from '@/components/panels/MutationLogPanel'
import SovereignStatusPanel from '@/components/panels/SovereignStatusPanel'
// ❌ Remove this line:
// import MarketTicker from '@/components/ui/MarketTicker'

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black font-grotesk">
      {/* ✅ Removed duplicate Ticker */}
      
      {/* Left Cognitive Feed */}
      <MutationLogPanel />

      {/* Right Forkstream HUD */}
      <SovereignStatusPanel />

      {/* Central 3D Sovereign Spine */}
      <SpineCanvas />

      {/* User Interaction Textbox */}
      <SovereignTextbox />
    </main>
  )
}