'use client'

import React from 'react'
import MarketTicker from '@/components/ui/MarketTicker'

// 🧠 Core Panels
import ReflexiveCausalityMatrix from './ReflexiveCausalityMatrix'
import TacticalContradictionMatrix from './TacticalContradictionMatrix'
import MutationReactionPanel from './MutationReactionPanel'

import NeuralExecutionCortex from './NeuralExecutionCortex'
import MultiworldDivergenceMatrix from './MultiworldDivergenceMatrix'
import SovereignReflexSentinel from './SovereignReflexSentinel'

import AeonDeltaIntelligenceChain from './AeonDeltaIntelligenceChain'
import GhostAlphaConsole from './GhostAlphaConsole'
import AutonomousCodexRegulator from './AutonomousCodexRegulator'

import RenderProbe from './RenderProbe' // 🧪 Add this line

export default function DashboardHUD() {
  return (
    <div className="w-screen h-screen bg-black text-white font-mono overflow-hidden">

      {/* ✅ RenderProbe test */}
      <RenderProbe />

      {/* 🔝 Market Ticker HUD Band */}
      <div className="h-6 w-full bg-gradient-to-r from-[#030c0f] via-[#041216]/90 to-[#030c0f] border-b border-cyan-400/10 backdrop-blur-sm shadow-[inset_0_-1px_0_rgba(0,255,255,0.05)] z-50">
        <MarketTicker />
      </div>

      {/* 🧠 3x3 Cognitive Grid */}
      <div className="w-full h-[calc(100vh-1.5rem)] grid grid-cols-3 grid-rows-3 gap-4 px-6 py-6">

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
  )
}