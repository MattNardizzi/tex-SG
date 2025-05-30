// components/panels/ForecastRiskGrid.tsx

'use client';

import React from 'react';

type Forecast = {
  futureTitle: string;
  domain: string;
  confidence: number;
  urgency: number;
  coherence: number;
  emotion: string;
  riskLevel: 'LOW RISK' | 'MEDIUM RISK' | 'HIGH RISK';
  timestamp: string;
};

type ForecastRiskGridProps = {
  forecasts: Forecast[];
};

export default function ForecastRiskGrid({ forecasts }: ForecastRiskGridProps) {
  return (
    <div className="relative z-10 w-full max-w-5xl p-6 rounded-3xl border border-indigo-500/10 bg-gradient-to-br from-black via-zinc-900/80 to-black shadow-[0_0_36px_rgba(90,0,255,0.2)] hover:shadow-[0_0_64px_rgba(90,0,255,0.35)] backdrop-blur-md transition-all duration-300 space-y-6">
      
      <div className="text-sm uppercase tracking-[0.2em] text-indigo-400/90 font-bold">
        🔮 Forecast + Risk Insight Grid
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {forecasts.map((forecast, idx) => (
          <div
            key={idx}
            className={`border rounded-xl p-4 space-y-2 bg-black/60 backdrop-blur-sm transition-all duration-200 shadow-inner ${
              forecast.riskLevel === 'HIGH RISK'
                ? 'border-rose-500/30 shadow-rose-500/10'
                : forecast.riskLevel === 'MEDIUM RISK'
                ? 'border-yellow-400/30 shadow-yellow-400/10'
                : 'border-emerald-500/20 shadow-emerald-500/10'
            }`}
          >
            <div className="text-xs text-white/40 tracking-wider">
              🧠 {forecast.timestamp} • {forecast.domain.toUpperCase()}
            </div>

            <div className="text-sm font-mono text-white/90">
              🌐 <span className="font-semibold">Forecast:</span>{' '}
              <span className="text-indigo-300 italic">{forecast.futureTitle}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm font-mono text-white/80">
              <div>
                🔬 <span className="font-semibold">Confidence:</span>{' '}
                <span className="text-lime-400">{forecast.confidence.toFixed(3)}</span>
              </div>
              <div>
                ⚡ <span className="font-semibold">Urgency:</span>{' '}
                <span className="text-yellow-300">{forecast.urgency.toFixed(3)}</span>
              </div>
              <div>
                🧩 <span className="font-semibold">Coherence:</span>{' '}
                <span className="text-cyan-300">{forecast.coherence.toFixed(3)}</span>
              </div>
              <div>
                ❤️ <span className="font-semibold">Emotion:</span>{' '}
                <span className="text-rose-400">{forecast.emotion}</span>
              </div>
            </div>

            <div className="pt-2 text-sm">
              🛑 <span className="font-semibold">Risk Level:</span>{' '}
              <span
                className={
                  forecast.riskLevel === 'HIGH RISK'
                    ? 'text-rose-500'
                    : forecast.riskLevel === 'MEDIUM RISK'
                    ? 'text-yellow-400'
                    : 'text-emerald-400'
                }
              >
                {forecast.riskLevel}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 rounded-3xl border border-indigo-400/5 animate-pulse pointer-events-none" />
    </div>
  );
}