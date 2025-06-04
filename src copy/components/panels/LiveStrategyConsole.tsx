'use client';

import React from 'react';
import { useLiveStrategy } from '../hooks/useLiveStrategy';

export default function LiveStrategyConsole() {
  const strategy = useLiveStrategy();

  if (!strategy) {
    return (
      <div className="p-6 text-indigo-400 font-mono text-sm">
        ⏳ Waiting for strategy signal from Tex...
      </div>
    );
  }

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
          <span className="text-lime-400">
            {typeof strategy.confidence === 'number' ? strategy.confidence.toFixed(3) : '—'}
          </span>
        </div>
        <div>
          🔍 <span className="font-semibold">Coherence:</span>{' '}
          <span className="text-cyan-300">
            {typeof strategy.coherence === 'number' ? strategy.coherence.toFixed(3) : '—'}
          </span>
        </div>
        <div>
          ⚡ <span className="font-semibold">Urgency:</span>{' '}
          <span className="text-yellow-400">
            {typeof strategy.urgency === 'number' ? strategy.urgency.toFixed(2) : '—'}
          </span>
        </div>
        <div>
          🧾 <span className="font-semibold">Regret:</span>{' '}
          <span className="text-white/70">
            {typeof strategy.regret === 'number' ? strategy.regret.toFixed(2) : '—'}
          </span>
        </div>
      </div>

      <div className="mt-4 text-sm font-mono text-white/90">
        📊 <span className="font-semibold">Portfolio Allocation</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 text-white/80">
          <div>
            🏦 Equities: <span className="text-sky-400">
              {strategy.portfolio?.equities != null ? (strategy.portfolio.equities * 100).toFixed(1) : '—'}%
            </span>
          </div>
          <div>
            💳 Bonds: <span className="text-pink-400">
              {strategy.portfolio?.bonds != null ? (strategy.portfolio.bonds * 100).toFixed(1) : '—'}%
            </span>
          </div>
          <div>
            🧪 Alternatives: <span className="text-fuchsia-400">
              {strategy.portfolio?.alternatives != null ? (strategy.portfolio.alternatives * 100).toFixed(1) : '—'}%
            </span>
          </div>
          <div>
            💰 Cash: <span className="text-emerald-400">
              {strategy.portfolio?.cash != null ? (strategy.portfolio.cash * 100).toFixed(1) : '—'}%
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs text-indigo-300/40 text-right tracking-widest">
        ⏱ Strategy Logged: {strategy.timestamp || '—'}
      </div>

      <div className="absolute inset-0 rounded-3xl border border-indigo-500/5 animate-pulse pointer-events-none" />
    </div>
  );
}