// components/panels/SimulacrumHallucinationFeed.tsx

'use client';

import React from 'react';

type Hallucination = {
  simId: string;               // e.g. "SIM_0001"
  theme: string;               // e.g. "emotion-driven flash crash"
  confidence: number;          // e.g. 0.73
  coherence: number;           // e.g. 0.88
  emotion: string;             // e.g. "fear"
  timestamp: string;           // ISO string
};

type SimulacrumFeedProps = {
  hallucinations: Hallucination[];
};

export default function SimulacrumHallucinationFeed({ hallucinations }: SimulacrumFeedProps) {
  return (
    <div className="relative z-10 w-full max-w-5xl p-6 rounded-3xl border border-violet-500/10 bg-gradient-to-br from-black via-zinc-900/80 to-black shadow-[0_0_36px_rgba(170,0,255,0.2)] hover:shadow-[0_0_64px_rgba(170,0,255,0.35)] backdrop-blur-md transition-all duration-300 space-y-6">

      <div className="text-sm uppercase tracking-[0.2em] text-violet-400/90 font-bold">
        🌀 Simulacrum Hallucination Feed
      </div>

      {hallucinations.map((hallucination, idx) => (
        <div
          key={idx}
          className="border border-white/10 rounded-xl p-4 bg-black/60 backdrop-blur-sm shadow-inner shadow-violet-400/10 hover:border-violet-500 transition-all duration-200 space-y-2"
        >
          <div className="text-xs text-white/40 tracking-wider mb-1">
            🧠 Sim ID: <span className="text-fuchsia-500">{hallucination.simId}</span> • {hallucination.timestamp}
          </div>

          <div className="text-sm font-mono text-white/90">
            🧬 <span className="font-semibold">Theme:</span>{' '}
            <span className="text-violet-300 italic">"{hallucination.theme}"</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm font-mono text-white/80 pt-2">
            <div>
              🧠 <span className="font-semibold">Confidence:</span>{' '}
              <span className="text-lime-400">{hallucination.confidence.toFixed(3)}</span>
            </div>
            <div>
              🌀 <span className="font-semibold">Coherence:</span>{' '}
              <span className="text-cyan-400">{hallucination.coherence.toFixed(3)}</span>
            </div>
            <div>
              ❤️ <span className="font-semibold">Emotion Trigger:</span>{' '}
              <span className="text-rose-400">{hallucination.emotion}</span>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute inset-0 rounded-3xl border border-violet-500/5 animate-pulse pointer-events-none" />
    </div>
  );
}