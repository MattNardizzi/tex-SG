'use client';

import { useState } from 'react';
import MutationLogPanel from '@/components/panels/MutationLogPanel';
import SovereignStatusPanel from '@/components/panels/SovereignStatusPanel';
import SpineCanvas from '@/components/Spine/SpineCanvas';
import MarketTicker from '@/components/ui/MarketTicker';
import SovereignTextbox from '@/components/ui/SovereignTextbox';

export default function Page() {
  return (
    <div className="relative w-screen h-screen bg-black text-white overflow-hidden font-sans">
      {/* Global Market Ticker */}
      <MarketTicker />

      {/* Left Panel */}
      <div className="absolute top-20 left-8 z-20">
        <MutationLogPanel />
      </div>

      {/* Right Panel */}
      <div className="absolute top-20 right-8 z-20 text-right">
        <SovereignStatusPanel />
      </div>

      {/* Center Beam */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <SpineCanvas />
      </div>

      {/* Bottom Textbox */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
        <SovereignTextbox />
      </div>
    </div>
  );
}