'use client';

import { useState } from 'react';
import TexBootScreen from './TexBootScreen';
import ReflexTradeConsole from './ReflexTradeConsole';
import MarketTicker from '@/components/ui/MarketTicker';

// 🔹 Reflex Panel Imports
import RealityForkPanel from './reflex_panels/RealityForkPanel';
import WorldModelPanel from './reflex_panels/WorldModelPanel';
import RealityRewritePanel from './reflex_panels/RealityRewritePanel';
import OntogenesisPanel from './reflex_panels/OntogenesisPanel';
import ForkStressPanel from './reflex_panels/ForkStressPanel';
import AEILineagePanel from './reflex_panels/AEILineagePanel';

export default function DashboardHUD() {
  const [bootDone, setBootDone] = useState(false);

  if (!bootDone) return <TexBootScreen onDone={() => setBootDone(true)} />;

  return (
    <div className="w-screen h-screen relative bg-black text-white font-mono overflow-hidden">

      {/* 🔵 Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 w-[1600px] h-[1600px] -translate-x-1/2 -translate-y-1/2 bg-cyan-400/15 blur-[140px] z-0 pointer-events-none animate-pulse" />

      {/* 📡 Grid Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 mix-blend-screen bg-[radial-gradient(circle,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* 🔝 Reflex Trade Console (top bar) */}
      <div
        className="relative z-50 w-full h-32 border-b border-white/10 backdrop-blur-md flex items-center justify-center px-8 text-[20px] tracking-widest"
        style={{ backgroundColor: 'black' }}
      >
        <div
          className="absolute inset-0 blur-[40px] pointer-events-none animate-pulse"
          style={{ backgroundColor: 'rgba(0,240,255,0.05)' }}
        />
        <ReflexTradeConsole />
      </div>

      {/* 🔹 Reflex Grid — 6 Panels, 2x3 Layout */}
      <div className="relative z-10 w-full h-[calc(100vh-16rem)] grid grid-cols-3 grid-rows-2 gap-7 px-10 pt-10 pb-6">
        {/* Top Row */}
        <div className="w-full h-full">
          <RealityForkPanel />
        </div>
        <div className="w-full h-full">
          <WorldModelPanel />
        </div>
        <div className="w-full h-full">
          <RealityRewritePanel />
        </div>

        {/* Bottom Row */}
        <div className="w-full h-full">
          <OntogenesisPanel />
        </div>
        <div className="w-full h-full">
          <ForkStressPanel />
        </div>
        <div className="w-full h-full">
          <AEILineagePanel />
        </div>
      </div>

      {/* 🔚 Market Ticker moved to bottom */}
      <div
        className="relative z-50 w-full h-14 border-t border-white/10 backdrop-blur-md flex items-center px-6 text-[18px] font-semibold tracking-widest uppercase"
        style={{ backgroundColor: 'black', color: '#00f0ff' }}
      >
        <div
          className="absolute inset-0 blur-[40px] pointer-events-none animate-pulse"
          style={{ backgroundColor: 'rgba(0,240,255,0.05)' }}
        />
        <MarketTicker />
      </div>
    </div>
  );
}