// components/panels/InternalDebateViewer.tsx

'use client';

import React from 'react';

type DebateTrace = {
  cycle: number;
  logic: string;
  logicVerdict: string;
  emotion: string;
  emotionTriggeredBy: string;
  skeptic: string;
  skepticNote: string;
  impactScore: number;
  foresight: number;
  timestamp: string;
};

type InternalDebateViewerProps = {
  traces: DebateTrace[];
};

export default function InternalDebateViewer({ traces }: InternalDebateViewerProps) {
  return (
    <div className="relative z-10 w-full max-w-5xl p-6 rounded-3xl border border-blue-400/10 bg-gradient-to-br from-black via-zinc-900/80 to-black shadow-[0_0_32px_rgba(0,180,255,0.2)] hover:shadow-[0_0_48px_rgba(0,180,255,0.35)] backdrop-blur-md transition-all duration-300 space-y-6">

      <div className="text-sm uppercase tracking-[0.2em] text-cyan-400/90 font-bold">
        🧠 Internal Debate Viewer
      </div>

      {traces.map((trace, idx) => (
        <div
          key={idx}
          className="border border-white/10 rounded-xl p-4 bg-black/60 backdrop-blur-sm shadow-inner shadow-blue-500/10 hover:border-blue-400 transition-all duration-200"
        >
          <div className="text-xs text-white/40 tracking-wider mb-2">
            🌀 CYCLE {trace.cycle} • {trace.timestamp}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-mono text-white/90">
            <div>
              ✅ <span className="font-semibold">Logic:</span><br />
              <span className="text-green-400">{trace.logicVerdict}</span> → {trace.logic}
            </div>

            <div>
              ❤️ <span className="font-semibold">Emotion:</span><br />
              {trace.emotion} <span className="text-white/60">←</span> {trace.emotionTriggeredBy}
            </div>

            <div>
              ❓ <span className="font-semibold">Skeptic:</span><br />
              {trace.skeptic} <span className="text-white/60">→</span> {trace.skepticNote}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-white/70">
            <div>
              🧭 Foresight: <span className="text-lime-400">{trace.foresight.toFixed(2)}</span>
            </div>
            <div>
              🏆 Impact Score: <span className="text-amber-300 font-bold">{trace.impactScore.toFixed(4)}</span>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute inset-0 rounded-3xl border border-cyan-400/5 animate-pulse pointer-events-none" />
    </div>
  );
}