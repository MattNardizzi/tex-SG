// components/panels/AlphaExplanationPanel.tsx

'use client';

import React from 'react';

type AlphaExplanationProps = {
  explanation: string;
  timestamp: string;
  confidence: number;
  coherence: number;
  urgency: number;
};

export default function AlphaExplanationPanel({
  explanation,
  timestamp,
  confidence,
  coherence,
  urgency,
}: AlphaExplanationProps) {
  return (
    <div className="bg-black/80 border border-white/10 rounded-2xl p-6 shadow-xl w-full max-w-3xl text-white space-y-4 backdrop-blur-sm">
      <div className="text-xs uppercase tracking-widest text-cyan-400/80">
        🧠 Alpha Explanation Feed
      </div>

      <blockquote className="text-sm italic text-white/80 border-l-4 border-cyan-500 pl-4">
        {explanation}
      </blockquote>

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

      <div className="text-xs text-white/40 mt-4">Explanation generated: {timestamp}</div>
    </div>
  );
}