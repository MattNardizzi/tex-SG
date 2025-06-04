'use client'

import React from 'react'
import InternalDebateViewer from './InternalDebateViewer'
import CognitionCorePanel from '../ui/CognitionCorePanel'
import MarketTicker from '@/components/ui/MarketTicker'

// 🧠 Custom Panels
import ReflexiveCausalityMatrix from './untitled folder/ReflexiveCausalityMatrix'
import NeuralExecutionCortex from './untitled folder/NeuralExecutionCortex'
import MutationReactionPanel from './untitled folder/MutationReactionPanel'
import MultiworldDivergenceMatrix from './untitled folder/MultiworldDivergenceMatrix'
import TacticalRegretReactor from './untitled folder/TacticalContradictionMatrix' // ✅ Now in 3A
import AeonDeltaIntelligenceChain from '../panels/AeonDeltaIntelligenceChain'
import SovereignReflexSentinel from './untitled folder/SovereignReflexSentinel'
import AutonomousCodexRegulator from './untitled folder/ AutonomousCodexRegulator'
import GhostAlphaConsole from './untitled folder/GhostAlphaConsole' // ✅ Now in 3C

export default function DashboardHUD() {
  return (
    <div className="w-screen h-screen bg-black text-white font-mono overflow-hidden">

      {/* 🔝 Market Ticker HUD Band */}
      <div className="h-6 w-full bg-gradient-to-r from-[#030c0f] via-[#041216]/90 to-[#030c0f] border-b border-cyan-400/10 backdrop-blur-sm shadow-[inset_0_-1px_0_rgba(0,255,255,0.05)] z-50">
        <MarketTicker />
      </div>

      {/* ⚙️ 3x3 Main Grid */}
      <div className="w-full h-[calc(100vh-1.5rem)] grid grid-cols-3 grid-rows-3 gap-4 px-6 py-6">
        
        {/* 🔹 Row 1 */}
        <div className="w-full h-full">
          <ReflexiveCausalityMatrix />
        </div>
        <div className="w-full h-full">
          <NeuralExecutionCortex />
        </div>
        <div className="w-full h-full">
          <AutonomousCodexRegulator />
        </div>

        {/* 🔹 Row 2 */}
        <div className="w-full h-full">
          <MutationReactionPanel />
        </div>
        <div className="w-full h-full">
          <MultiworldDivergenceMatrix />
        </div>
        <div className="w-full h-full">
          <SovereignReflexSentinel />
        </div>

        {/* 🔹 Row 3 */}
        <div className="w-full h-full">
          <TacticalRegretReactor /> {/* 🔁 Now in 3A */}
        </div>
        <div className="w-full h-full">
          <AeonDeltaIntelligenceChain />
        </div>
        <div className="w-full h-full">
          <GhostAlphaConsole /> {/* 🔁 Moved to 3C */}
        </div>
      </div>
    </div>
  )
}