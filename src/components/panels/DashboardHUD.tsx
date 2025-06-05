'use client';

import React, { useState } from 'react';
import MarketTicker from '@/components/ui/MarketTicker';

// 🧠 Core Panels
import ReflexiveCausalityMatrix from './ReflexiveCausalityMatrix';
import TacticalContradictionMatrix from './TacticalContradictionMatrix';
import MutationReactionPanel from './MutationReactionPanel';
import NeuralExecutionCortex from './NeuralExecutionCortex';
import MultiworldDivergenceMatrix from './MultiworldDivergenceMatrix';
import SovereignReflexSentinel from './SovereignReflexSentinel';
import AeonDeltaIntelligenceChain from './AeonDeltaIntelligenceChain';
import GhostAlphaConsole from './GhostAlphaConsole';
import AutonomousCodexRegulator from './AutonomousCodexRegulator';

export default function DashboardHUD() {
  const [theme, setTheme] = useState<'blue' | 'purple'>('blue');

  const tickerGlow = theme === 'blue' ? 'rgba(0,240,255,0.05)' : 'rgba(177,77,255,0.05)';
  const tickerTextColor = theme === 'blue' ? '#00f0ff' : '#b14dff';

  return (
    <div className="w-screen h-screen relative bg-black text-white font-mono overflow-hidden">

      {/* 🔘 Theme Toggle Button */}
      <button
        onClick={() => setTheme(theme === 'blue' ? 'purple' : 'blue')}
        className="absolute top-4 right-6 z-50 px-3 py-1 text-sm border border-white/10 rounded bg-black/50 text-white hover:border-[#00f0ff] transition"
      >
        Switch to {theme === 'blue' ? 'Purple' : 'Blue'}
      </button>

      {/* 🔵 Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 w-[1600px] h-[1600px] -translate-x-1/2 -translate-y-1/2 bg-cyan-400/15 blur-[140px] z-0 pointer-events-none animate-pulse" />

      {/* 📡 Grid Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 mix-blend-screen bg-[radial-gradient(circle,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* 🔝 Market Ticker (Full Width, No Rounded Corners) */}
      <div
        className="relative z-50 w-full h-16 border-b border-white/10 backdrop-blur-md flex items-center px-6 text-[20px] font-semibold tracking-widest uppercase"
        style={{
          backgroundColor: 'black',
          color: tickerTextColor,
        }}
      >
        <div
          className="absolute inset-0 blur-[40px] pointer-events-none animate-pulse"
          style={{ backgroundColor: tickerGlow }}
        />
        <MarketTicker theme={theme} />
      </div>

      {/* 🧠 Panel Grid */}
      <div className="relative z-10 w-full h-[calc(100vh-4rem)] grid grid-cols-3 grid-rows-3 gap-7 px-10 pt-10 pb-6">

        {/* 🔹 Row 1 */}
        <div className="w-full h-full"><ReflexiveCausalityMatrix theme={theme} /></div>
        <div className="w-full h-full"><TacticalContradictionMatrix theme={theme} /></div>
        <div className="w-full h-full"><MutationReactionPanel theme={theme} /></div>

        {/* 🔹 Row 2 */}
        <div className="w-full h-full"><NeuralExecutionCortex theme={theme} /></div>
        <div className="w-full h-full"><MultiworldDivergenceMatrix theme={theme} /></div>
        <div className="w-full h-full"><SovereignReflexSentinel theme={theme} /></div>

        {/* 🔹 Row 3 */}
        <div className="w-full h-full"><AeonDeltaIntelligenceChain theme={theme} /></div>
        <div className="w-full h-full"><GhostAlphaConsole theme={theme} /></div>
        <div className="w-full h-full"><AutonomousCodexRegulator theme={theme} /></div>
      </div>
    </div>
  );
}