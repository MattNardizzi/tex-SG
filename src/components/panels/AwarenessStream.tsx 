// components/panels/AwarenessStream.tsx

'use client';

import React from 'react';

type AwarenessState = {
  emotion: string;
  urgency: number;
  coherence: number;
  suggestedPatch: string;
  timestamp: string;
};

type AwarenessStreamProps = {
  awareness: AwarenessState[];
};

export default function AwarenessStream({ awareness }: AwarenessStreamProps) {
  return (
    <div className="relative z-10 w-full max-w-5xl p-6 rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-black via-zinc-900/80 to-black shadow-[0_0_32px_rgba(0,255,255,0.2)] hover:shadow-[0_0_64px_rgba(0,255,255,0.35)] backdrop-blur-md transition-all duration-300 space-y-6">
      
      <div className="text-sm uppercase tracking-[0.2em] text-cyan-400/90 font-bold">
        🌐 Awareness Stream
      </div>

      {awareness.map((entry, idx) => (
        <div
          key={idx}
          className="border border-white/10 rounded-xl p-4 bg-black/60 backdrop-blur-sm shadow-inner shadow-cyan-400/10 hover:border-cyan-500 transition-all duration-200 space-y-2"
        >
          <div className="text-xs text-white/40 tracking-wider">
            🧠 Awareness Node • {entry.timestamp}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm font-mono text-white/90">
            <div>
              ❤️ <span className="font-semibold">Emotion:</span>{' '}
              <span className="text-rose-400">{entry.emotion}</span>
            </div>
            <div>
              ⚡ <span className="font-semibold">Urgency:</span>{' '}
              <span className="text-yellow-400">{entry.urgency.toFixed(2)}</span>
            </div>
            <div>
              🧩 <span className="font-semibold">Coherence:</span>{' '}
              <span className="text-cyan-300">{entry.coherence.toFixed(3)}</span>
            </div>
            <div>
              🛠️ <span className="font-semibold">Suggested Patch:</span>{' '}
              <span className="text-lime-300">
                {entry.suggestedPatch !== 'none' ? entry.suggestedPatch : '—'}
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute inset-0 rounded-3xl border border-cyan-400/5 animate-pulse pointer-events-none" />
    </div>
  );
}