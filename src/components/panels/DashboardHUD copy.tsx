'use client'

import React from 'react'
import SovereignCognitionPanel from './SovereignCognitionPanel'
import InternalDebateViewer from './InternalDebateViewer'
import EvolutionaryIntelligencePanel from './EvolutionaryIntelligencePanel'
import CognitiveInterventionPanel from './CognitiveInterventionPanel'
import MetaSelfCheckPanel from './MetaSelfCheckPanel'
import IntentionLoop from './IntentionLoop'
import CognitionCorePanel from '../ui/CognitionCorePanel'
import MarketTicker from '@/components/ui/MarketTicker'

// 🧠 SHOCK PANELS
import StrategyExecution from './StrategyExecution'
import AlphaIntelligence from './AlphaIntelligence'
import ForecastRisk from './ForecastRisk'
import MemoryCausality from './MemoryCausality'
import VariantParadox from './VariantParadox'

export default function DashboardHUD() {
  return (
    <div className="w-screen h-screen bg-black text-white font-mono overflow-hidden">
      
      {/* 🔝 Market Ticker HUD Band */}
      <div className="h-6 w-full bg-gradient-to-r from-[#030c0f] via-[#041216]/90 to-[#030c0f] border-b border-cyan-400/10 backdrop-blur-sm shadow-[inset_0_-1px_0_rgba(0,255,255,0.05)] z-50">
        <MarketTicker />
      </div>

      {/* ⚙️ Main Grid */}
      <div className="w-full h-[calc(100vh-1.5rem)] grid grid-cols-3 grid-rows-4 gap-4 px-6 py-6">
        
        {/* 🔹 Row 1 */}
        <div className="w-full h-full">
          <SovereignCognitionPanel />
        </div>
        <div className="w-full h-full">
          <CognitiveInterventionPanel />
        </div>
        <div className="w-full h-full">
          <EvolutionaryIntelligencePanel />
        </div>

        {/* 🔹 Row 2 */}
        <div className="w-full h-full">
          <InternalDebateViewer />
        </div>
        <div className="w-full h-full">
          <CognitionCorePanel />
        </div>
        <div className="w-full h-full">
          <MetaSelfCheckPanel />
        </div>

        {/* 🔹 Row 3 */}
        <div className="w-full h-full">
          <StrategyExecution /> {/* 🔁 3A replaced */}
        </div>
        <div className="w-full h-full">
          <IntentionLoop />     {/* ✅ 3B already replaced */}
        </div>
        <div className="w-full h-full">
          <VariantParadox />    {/* 🔁 3C replaced */}
        </div>

        {/* 🔹 Row 4: AGI-level panels */}
        <div className="w-full h-full">
          <AlphaIntelligence /> {/* 4A */}
        </div>
        <div className="w-full h-full">
          <ForecastRisk />      {/* 4B */}
        </div>
        <div className="w-full h-full">
          <MemoryCausality />   {/* 4C */}
        </div>
      </div>
    </div>
  )
}