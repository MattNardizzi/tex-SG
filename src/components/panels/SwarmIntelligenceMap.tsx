// components/panels/SwarmIntelligenceMap.tsx

'use client';

import React from 'react';

type SwarmAgent = {
  id: string;
  emotion: string;
  cognition: number;
  survival: number;
  bias: string;
};

type SwarmIntelligenceProps = {
  agents: SwarmAgent[];
  averageSurvival: number;
  cycle: number;
  timestamp: string;
};

export default function SwarmIntelligenceMap({
  agents,
  averageSurvival,
  cycle,
  timestamp,
}: SwarmIntelligenceProps) {
  return (
    <div className="relative z-10 w-full max-w-5xl p-6 rounded-3xl border border-purple-500/10 bg-gradient-to-br from-black via-zinc-900/80 to-black shadow-[0_0_36px_rgba(190,90,255,0.2)] hover:shadow-[0_0_64px_rgba(190,90,255,0.35)] backdrop-blur-md transition-all duration-300 space-y-6">

      <div className="text-sm uppercase tracking-[0.2em] text-purple-400/90 font-bold">
        👶 Swarm Intelligence Map
      </div>

      <div className="text-xs text-white/40 tracking-wider mb-2">
        🌀 Cycle {cycle} • Synced at {timestamp}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {agents.map((agent, idx) => (
          <div
            key={idx}
            className="border border-white/10 rounded-xl p-3 bg-black/50 backdrop-blur-sm shadow-inner shadow-purple-500/5 hover:border-purple-500 transition-all duration-200 space-y-1"
          >
            <div className="text-xs text-white/60 font-mono">
              🧬 <span className="font-bold text-purple-300">{agent.id}</span>
            </div>

            <div className="text-sm font-mono text-white/90">
              ❤️ <span className="font-semibold">Emotion:</span>{' '}
              <span className="text-rose-400">{agent.emotion}</span>
            </div>

            <div className="text-sm font-mono text-white/80">
              🧠 <span className="font-semibold">Cognition:</span>{' '}
              <span className="text-cyan-400">{agent.cognition.toFixed(2)}</span>
            </div>

            <div className="text-sm font-mono text-white/80">
              💾 <span className="font-semibold">Survival:</span>{' '}
              <span className="text-lime-400">{agent.survival.toFixed(2)}</span>
            </div>

            <div className="text-sm font-mono text-white/80">
              🎭 <span className="font-semibold">Bias:</span>{' '}
              <span className="text-yellow-300 italic">{agent.bias}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm font-mono text-white/80 text-right">
        📊 <span className="font-semibold">Avg Survival:</span>{' '}
        <span className="text-emerald-400">{averageSurvival.toFixed(3)}</span>
      </div>

      <div className="absolute inset-0 rounded-3xl border border-purple-400/5 animate-pulse pointer-events-none" />
    </div>
  );
}