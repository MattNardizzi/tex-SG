// components/panels/AlphaStrategyPanel.tsx

'use client';

import React from 'react';

type AlphaStrategyProps = {
  action: string;
  bias: string;
  future: string;
  confidence: number;
  coherence: number;
  riskScore: number;
  volatility: number;
  portfolio: {
    equities: number;
    bonds: number;
    alternatives: number;
    cash: number;
  };
  swarmEmotion: Record<string, number>;
  timestamp: string;
};

export default function AlphaStrategyPanel({
  action,
  bias,
  future,
  confidence,
  coherence,
  riskScore,
  volatility,
  portfolio,
  swarmEmotion,
  timestamp,
}: AlphaStrategyProps) {
  return (
    <div className="bg-black/80 border border-white/10 rounded-2xl p-6 shadow-xl w-full max-w-xl text-white space-y-4 backdrop-blur-sm">
      <div className="text-xs uppercase tracking-widest text-pink-400/80">📈 Alpha Strategy</div>

      <div className="text-lg font-semibold tracking-tight text-white/90">
        {action} <span className="text-pink-400">on</span> <span className="italic">{future}</span>
      </div>

      <div className="text-sm text-white/70">
        Reasoning Bias: <span className="font-mono text-pink-400">{bias}</span>
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
          <div className="text-white/60">Volatility</div>
          <div className="text-white font-bold">{volatility}</div>
        </div>
      </div>

      <div className="mt-4 space-y-1 text-sm">
        <div className="text-white/60">Portfolio Weights</div>
        <ul className="list-disc list-inside text-white/80">
          <li>Equities: {portfolio.equities * 100}%</li>
          <li>Bonds: {portfolio.bonds * 100}%</li>
          <li>Alternatives: {portfolio.alternatives * 100}%</li>
          <li>Cash: {portfolio.cash * 100}%</li>
        </ul>
      </div>

      <div className="mt-4">
        <div className="text-xs text-white/60 mb-1">Swarm Emotion</div>
        <div className="flex gap-2 text-xs font-mono text-white/70">
          {Object.entries(swarmEmotion).map(([emotion, count]) => (
            <div key={emotion} className="px-2 py-1 bg-white/5 rounded">
              {emotion}: {count}
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-white/40 mt-4">Generated: {timestamp}</div>
    </div>
  );
}