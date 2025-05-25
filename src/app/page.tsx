'use client';

import dynamic from 'next/dynamic';
import { MutationLogPanelR3F as MutationLogPanel } from '@/components/panels/FiberPanels';
import SovereignStatusPanel from '@/components/panels/SovereignStatusPanel';
import MarketTicker from '@/components/ui/MarketTicker';
import SovereignTextbox from '@/components/ui/SovereignTextbox';

// ⛑️ Fix: Load R3F Canvas dynamically to avoid build errors in Next.js (Vercel-safe)
const SpineCanvas = dynamic(() => import('@/components/Spine/SpineCanvas'), {
  ssr: false,
  loading: () => null,
});

export default function Page() {
  return (
    <div className="relative w-screen h-screen bg-black text-white overflow-hidden font-sans antialiased">
      {/* ✅ Live Market Feed */}
      <MarketTicker />

      {/* ✅ Left Panel */}
      <div className="absolute top-20 left-8 z-20">
        <MutationLogPanel />
      </div>

      {/* ✅ Right Panel */}
      <div className="absolute top-20 right-8 z-20 text-right">
        <SovereignStatusPanel />
      </div>

      {/* ✅ Center Beam with Godmind Spine */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <SpineCanvas />
      </div>

      {/* ✅ Input Console */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30">
        <SovereignTextbox />
      </div>
    </div>
  );
}