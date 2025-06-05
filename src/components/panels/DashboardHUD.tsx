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

      {/* 🔵 Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 w-[1600px] h-[1600px] -translate-x-1/2 -translate-y-1/2 bg-cyan-400/15 blur-[140px] z-0 pointer-events-none animate-pulse" />

      {/* 📡 Grid Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 mix-blend-screen bg-[radial-gradient(circle,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* 🔝 Market Ticker (Fixed Color) */}
      <div
        className="relative z-50 w-full h-16 border-b border-white/10 backdrop-blur-md flex items-center px-6 text-[20px] font-semibold tracking-widest uppercase"
        style={{
          backgroundColor: 'black',
          color: '#00f0ff',
        }}
      >
        <div
          className="absolute inset-0 blur-[40px] pointer-events-none animate-pulse"
          style={{ backgroundColor: 'rgba(0,240,255,0.05)' }}
        />
        <MarketTicker />
      </div>

      {/* 🧠 Panel Grid */}
      <div className="relative z-10 w-full h-[calc(100vh-4rem)] grid grid-cols-3 grid-rows-3 gap-7 px-10 pt-10 pb-6">

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