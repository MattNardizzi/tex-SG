'use client';

import React from 'react';
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
  return (
    <div className="w-screen h-screen relative bg-black text-white font-mono overflow-hidden">

      {/* 🔵 Ambient Glow Behind Grid */}
      <div className="absolute top-1/2 left-1/2 w-[1600px] h-[1600px] -translate-x-1/2 -translate-y-1/2 bg-cyan-400/15 blur-[140px] rounded-full z-0 pointer-events-none animate-pulse" />

      {/* 📡 Neural Grid FX */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 mix-blend-screen bg-[radial-gradient(circle,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* 🔝 Market Ticker (Taller + More Prominent) */}
      <div className="h-10 w-full bg-gradient-to-r from-[#030c0f] via-[#041216]/90 to-[#030c0f] border-b border-cyan-400/10 backdrop-blur-md shadow-[inset_0_-1px_0_rgba(0,255,255,0.08)] z-50 relative flex items-center px-4 text-sm text-cyan-300 font-medium tracking-wide uppercase">
        <MarketTicker />
      </div>

      {/* 🧠 3x3 AGI Panel Grid (More Spacing) */}
      <div className="relative z-10 w-full h-[calc(100vh-2.5rem)] grid grid-cols-3 grid-rows-3 gap-6 px-8 py-6">

        {/* 🔹 Row 1 */}
        <div className="w-full h-full"><ReflexiveCausalityMatrix /></div>
        <div className="w-full h-full"><TacticalContradictionMatrix /></div>
        <div className="w-full h-full"><MutationReactionPanel /></div>

        {/* 🔹 Row 2 */}
        <div className="w-full h-full"><NeuralExecutionCortex /></div>
        <div className="w-full h-full"><MultiworldDivergenceMatrix /></div>
        <div className="w-full h-full"><SovereignReflexSentinel /></div>

        {/* 🔹 Row 3 */}
        <div className="w-full h-full"><AeonDeltaIntelligenceChain /></div>
        <div className="w-full h-full"><GhostAlphaConsole /></div>
        <div className="w-full h-full"><AutonomousCodexRegulator /></div>
      </div>
    </div>
  );
}