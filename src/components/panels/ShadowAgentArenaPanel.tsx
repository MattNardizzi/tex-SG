// components/panels/ShadowAgentArenaPanel.tsx

'use client';

import React from 'react';

type ShadowAgent = {
  id: string;
  bias: string;
  score: number;
  delta: number;
};

type ShadowAgentArenaProps = {
  topAgents: ShadowAgent[];
  selectedId: string;
  impactScore: number;
  cycle: number;
};

export default function ShadowAgentArenaPanel({
  topAgents,
  selectedId,
  impactScore,
  cycle,
}: ShadowAgentArenaProps) {
  return (
    <div className="bg-black/80 border border-white/10 rounded-2xl p-6 shadow-xl w-full max-w-xl text-white space-y-4 backdrop-blur-sm">
      <div className="text-xs uppercase tracking-widest text-purple-400/80">
        🌀 Shadow Agent Arena
      </div>

      <div className="text-sm text-white/70">
        Cycle {cycle} – <span className="font-mono text-purple-400">debate_0</span> selected
      </div>

      <div className="text-sm text-white/60 mt-2">
        Impact Score: <span className="text-white font-bold">{impactScore.toFixed(4)}</span>
      </div>

      <div className="mt-4">
        <div className="text-xs text-white/50 mb-2">Top Agents</div>
        <ul className="space-y-2 text-sm font-mono">
          {topAgents.map((agent) => (
            <li
              key={agent.id}
              className={`flex justify-between px-3 py-2 rounded border ${
                agent.id === selectedId
                  ? 'border-purple-500 bg-purple-800/30'
                  : 'border-white/10'
              }`}
            >
              <span>
                {agent.id.slice(0, 8)} ({agent.bias})
              </span>
              <span>
                Score: {agent.score.toFixed(3)} | Δ: {agent.delta.toFixed(3)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}