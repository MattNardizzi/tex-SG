'use client'

import React from 'react'
import MarketTicker from '@/components/ui/MarketTicker'

// 🧠 Core Panels (updated paths)
import ReflexiveCausalityMatrix from './ReflexiveCausalityMatrix'
import TacticalContradictionMatrix from './TacticalContradictionMatrix'
import MutationReactionPanel from './MutationReactionPanel'

import NeuralExecutionCortex from './NeuralExecutionCortex'
import MultiworldDivergenceMatrix from './MultiworldDivergenceMatrix'
import SovereignReflexSentinel from './SovereignReflexSentinel'

import AeonDeltaIntelligenceChain from './AeonDeltaIntelligenceChain'
import GhostAlphaConsole from './GhostAlphaConsole'
import AutonomousCodexRegulator from './AutonomousCodexRegulator'

export default function DashboardHUD() {
  return (
    <div className="w-screen h-screen bg-black text-white font-mono overflow-hidden">

      {/* 🔝 Market Ticker HUD Band */}
      <div className="h-6 w-full bg-gradient-to-r from-[#030c0f] via-[#041216]/90 to-[#030c0f] border-b border-cyan-400/10 backdrop-blur-sm shadow-[inset_0_-1px_0_rgba(0,255,255,0.05)] z-50">
        <MarketTicker />
      </div>

      {/* 🧠 3x3 Cognitive Grid */}
      <div className="w-full h-[calc(100vh-1.5rem)] grid grid-cols-3 grid-rows-3 gap-4 px-6 py-6">

        {/* 🔹 Row 1 */}
        <div className="w-full h-full"><ReflexiveCausalityMatrix /></div>       {/* 1a */}
        <div className="w-full h-full"><TacticalContradictionMatrix /></div>     {/* 1b */}
        <div className="w-full h-full"><MutationReactionPanel /></div>           {/* 1c */}

        {/* 🔹 Row 2 */}
        <div className="w-full h-full"><NeuralExecutionCortex /></div>           {/* 2a */}
        <div className="w-full h-full"><MultiworldDivergenceMatrix /></div>      {/* 2b */}
        <div className="w-full h-full"><SovereignReflexSentinel /></div>         {/* 2c */}

        {/* 🔹 Row 3 */}
        <div className="w-full h-full"><AeonDeltaIntelligenceChain /></div>      {/* 3a */}
        <div className="w-full h-full"><GhostAlphaConsole /></div>               {/* 3b */}
        <div className="w-full h-full"><AutonomousCodexRegulator /></div>        {/* 3c */}
      </div>
    </div>
  )
}