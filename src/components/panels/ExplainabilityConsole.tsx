// components/panels/ExplainabilityConsole.tsx

'use client';

import React from 'react';

type AlphaExplanation = {
  cycleId: string;
  timestamp: string;
  emotion: string;
  regret: number;
  coherence: number;
  confidence: number;
  urgency: number;
  reasoning: string;
};

type ExplainabilityConsoleProps = {
  reports: AlphaExplanation[];
};

export default function ExplainabilityConsole({ reports }: ExplainabilityConsoleProps) {
  return (
    <div className="relative z-10 w-full max-w-5xl p-6 rounded-3xl border border-amber-500/10 bg-gradient-to-br from-black via-zinc-900/80 to-black shadow-[0_0_36px_rgba(255,215,90,0.15)] hover:shadow-[0_0_64px_rgba(255,215,90,0.3)] backdrop-blur-md transition-all duration-300 space-y-6">
      
      <div className="text-sm uppercase tracking-[0.2em] text-amber-300/90 font-bold">
        🧾 Explainability Console
      </div>

      <div className="space-y-4">
        {reports.map((report, idx) => (
          <div
            key={idx}
            className="border border-white/10 rounded-xl p-4 bg-black/60 backdrop-blur-sm shadow-inner shadow-yellow-500/10 hover:border-amber-400 transition-all duration-200 space-y-2"
          >
            <div className="text-xs text-white/40 tracking-wider">
              🌀 Cycle {report.cycleId} • Logged at {report.timestamp}
            </div>

            <div className="text-sm font-mono text-white/90 space-y-1">
              <div>
                ❤️ <span className="font-semibold">Dominant Emotion:</span>{' '}
                <span className="text-rose-400">{report.emotion}</span>
              </div>
              <div>
                ⚡ <span className="font-semibold">Urgency:</span>{' '}
                <span className="text-yellow-400">{report.urgency.toFixed(2)}</span>
              </div>
              <div>
                🧩 <span className="font-semibold">Coherence:</span>{' '}
                <span className="text-cyan-300">{report.coherence.toFixed(3)}</span>
              </div>
              <div>
                🧮 <span className="font-semibold">Confidence:</span>{' '}
                <span className="text-lime-400">{report.confidence.toFixed(3)}</span>
              </div>
              <div>
                😔 <span className="font-semibold">Regret:</span>{' '}
                <span className="text-white/70">{report.regret.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-sm font-mono text-white/80">
              📖 <span className="font-semibold text-amber-300">Reasoning:</span>{' '}
              <span className="italic text-white/70">{report.reasoning}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 rounded-3xl border border-amber-400/5 animate-pulse pointer-events-none" />
    </div>
  );
}