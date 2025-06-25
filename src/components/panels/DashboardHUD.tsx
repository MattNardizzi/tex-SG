'use client';

import { useState } from 'react';
import MarketTicker from '@/components/ui/MarketTicker';
import TickerBar from './TickerBar';
import TexBootScreen from './TexBootScreen';

// 🧠 Core Panels (internal names preserved to avoid breaking imports)
import ReflexiveCausalityMatrix from './ReflexiveCausalityMatrix';
import MutationReactionPanel from './MutationReactionPanel';
import SovereignReflexSentinel from './SovereignReflexSentinel';

export default function DashboardHUD() {
  const [bootDone, setBootDone] = useState(false);

  if (!bootDone) return <TexBootScreen onDone={() => setBootDone(true)} />;

  return (
    <div className="w-screen h-screen relative bg-black text-white font-mono overflow-hidden">

      {/* 🔵 Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 w-[1600px] h-[1600px] -translate-x-1/2 -translate-y-1/2 bg-cyan-400/15 blur-[140px] z-0 pointer-events-none animate-pulse" />

      {/* 📡 Grid Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 mix-blend-screen bg-[radial-gradient(circle,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* 🔝 Market Ticker */}
      <div
        className="relative z-50 w-full h-16 border-b border-white/10 backdrop-blur-md flex items-center px-6 text-[20px] font-semibold tracking-widest uppercase"
        style={{ backgroundColor: 'black', color: '#00f0ff' }}
      >
        <div
          className="absolute inset-0 blur-[40px] pointer-events-none animate-pulse"
          style={{ backgroundColor: 'rgba(0,240,255,0.05)' }}
        />
        <MarketTicker />
      </div>

      {/* 🧠 Sovereign AGI System — 3 Synced Cinematic Panels */}
      <div className="relative z-10 w-full h-[calc(100vh-8rem)] grid grid-cols-3 grid-rows-1 gap-7 px-10 pt-10 pb-6">

        {/* 🔹 Panel 1: Reflex Cortex */}
        <div className="w-full h-full">
          <ReflexiveCausalityMatrix />
        </div>

        {/* 🔹 Panel 2: Mutation + Identity Core */}
        <div className="w-full h-full">
          <MutationReactionPanel />
        </div>

        {/* 🔹 Panel 3: Financial Sovereignty System */}
        <div className="w-full h-full">
          <SovereignReflexSentinel />
        </div>
      </div>

      {/* 🧠 Cognition Ticker Bar */}
      <TickerBar />
    </div>
  );
}