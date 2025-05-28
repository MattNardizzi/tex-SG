// components/panels/CognitionCorePanel.tsx

'use client';

import React from 'react';

type CognitionCoreProps = {
  cycle: number;
  goal: string;
  emotion: string;
  confidence: number;
  coherence: number;
  urgency: number;
  timestamp: string;
};

export default function CognitionCorePanel({
  cycle,
  goal,
  emotion,
  confidence,
  coherence,
  urgency,
  timestamp,
}: CognitionCoreProps) {
  return (
    <div className="bg-black/80 border border-white/10 rounded-2xl p-6 shadow-xl w-full max-w-xl text-white space-y-4 backdrop-blur-sm">
      <div className="text-xs uppercase tracking-widest text-sky-400/80">🧠 Cognition Core</div>

      <div className="text-lg font-semibold tracking-tight text-white/90">
        Cycle {cycle} – <span className="text-emerald-400">{emotion.toUpperCase()}</span>
      </div>

      <div className="text-sm text-white/70">
        <span className="font-mono text-sky-400">Goal:</span> {goal}
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm mt-4">
        <div>
          <div className="text-white/60">Confidence</div>
          <div className="text-white font-bold">{(confidence * 100).toFixed(1)}%</div>
        </div>
        <div>
          <div className="text-white/60">Coherence</div>
          <div className="text-white font-bold">{(coherence * 100).toFixed(1)}%</div>
        </div>
        <div>
          <div className="text-white/60">Urgency</div>
          <div className="text-white font-bold">{(urgency * 100).toFixed(1)}%</div>
        </div>
      </div>

      <div className="text-xs text-white/40 mt-4">Last Updated: {timestamp}</div>
    </div>
  );
}