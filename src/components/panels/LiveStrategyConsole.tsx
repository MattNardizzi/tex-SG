// components/panels/LiveStrategyConsole.tsx

'use client';

import React from 'react';

type Strategy = {
  strategyId: string;
  action: string; // e.g., "REBALANCE"
  futureTitle: string; // e.g., "Tech Bull Climax"
  bias: string; // e.g., "Strategic"
  emotion: string;
  confidence: number;
  coherence: number;
  urgency: number;
  regret: number;
  portfolio: {
    equities: number;
    bonds: number;
    alternatives: number;
    cash: number;
  };
  timestamp: string;
};

type LiveStrategyConsoleProps = {
  strategy: Strategy;
};

export default function LiveStrategyConsole({ strategy }: LiveStrategyConsoleProps) {
  return (
    <div className="relative z-10 w-full max-w-5xl p-6 rounded-3xl border border-indigo-500/10 bg-gradient-to-br from-black via-zinc-900/80 to-black shadow-[0_0_36px_rgba(90,80,255,0.2)] hover:shadow-[0_0_64px_rgba(90,80,255,0.35)] backdrop-blur-md transition-all duration-300 space-y-6">
      
      <div className="text-sm uppercase tracking-[0.2em] text-indigo-400/90 font-bold">
        📈 Live Strategy Console
      </div>

      <div className="text-sm font-mono text-white/90 grid gap-2">
        <div>
          🚨 <span className="font-semibold">Action:</span> {strategy.action} on{' '}
          <span className="italic text-indigo-300">{strategy.futureTitle}</span>
        </div>
        <div>
          🎯 <span className="font-semibold">Bias:</span> {strategy.bias}
        </div>
        <div>
          ❤️ <span className="font-semibold">Emotion:</span>{' '}
          <span className="text-rose-400">{strategy.emotion}</span>
        </div>
        <div>
          🧮 <span className="font-semibold">Confidence:</span>{' '}
          <span className="text-lime-400">{strategy.confidence.toFixed(3)}</span>
        </div>
        <div>
          🔍 <span className="font-semibold">Coherence:</span>{' '}
          <span className="text-cyan-300">{strategy.coherence.toFixed(3)}</span>
        </div>
        <div>
          ⚡ <span className="font-semibold">Urgency:</span>{' '}
          <span className="text-yellow-400">{strategy.urgency.toFixed(2)}</span>
        </div>
        <div>
          🧾 <span className="font-semibold">Regret:</span>{' '}
          <span className="text-white/70">{strategy.regret.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 text-sm font-mono text-white/90">
        📊 <span className="font-semibold">Portfolio Allocation</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 text-white/80">
          <div>
            🏦 Equities: <span className="text-sky-400">{(strategy.portfolio.equities * 100).toFixed(1)}%</span>
          </div>
          <div>
            💳 Bonds: <span className="text-pink-400">{(strategy.portfolio.bonds * 100).toFixed(1)}%</span>
          </div>
          <div>
            🧪 Alternatives: <span className="text-fuchsia-400">{(strategy.portfolio.alternatives * 100).toFixed(1)}%</span>
          </div>
          <div>
            💰 Cash: <span className="text-emerald-400">{(strategy.portfolio.cash * 100).toFixed(1)}%</span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs text-indigo-300/40 text-right tracking-widest">
        ⏱ Strategy Logged: {strategy.timestamp}
      </div>

      <div className="absolute inset-0 rounded-3xl border border-indigo-500/5 animate-pulse pointer-events-none" />
    </div>
  );
}