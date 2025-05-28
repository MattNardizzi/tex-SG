// components/panels/OverrideReflexPanel.tsx

'use client';

import React from 'react';

type OverrideReflexProps = {
  triggered: boolean;
  context: string;
  foresight: string;
  confidence: number;
  score: number;
  timestamp: string;
};

export default function OverrideReflexPanel({
  triggered,
  context,
  foresight,
  confidence,
  score,
  timestamp,
}: OverrideReflexProps) {
  return (
    <div className="bg-black/80 border border-white/10 rounded-2xl p-6 shadow-xl w-full max-w-xl text-white space-y-4 backdrop-blur-sm">
      <div className="text-xs uppercase tracking-widest text-yellow-400/80">
        🛡️ Override Reflex
      </div>

      <div className="text-sm text-white/70">
        Context: <span className="font-mono text-yellow-400">{context}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mt-4">
        <div>
          <div className="text-white/60">Override Triggered</div>
          <div className={`font-bold ${triggered ? 'text-red-400' : 'text-green-400'}`}>
            {triggered ? 'YES' : 'NO'}
          </div>
        </div>
        <div>
          <div className="text-white/60">Predicted Path</div>
          <div className="font-bold text-white">{foresight}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mt-2">
        <div>
          <div className="text-white/60">Override Score</div>
          <div className="font-bold text-white">{score.toFixed(3)}</div>
        </div>
        <div>
          <div className="text-white/60">Foresight Confidence</div>
          <div className="font-bold text-white">{(confidence * 100).toFixed(1)}%</div>
        </div>
      </div>

      <div className="text-xs text-white/40 mt-4">Logged: {timestamp}</div>
    </div>
  );
}