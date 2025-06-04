'use client';

import React, { useEffect, useState } from 'react';

type Signal = {
  label: string;
  value: number; // -1 to 1
};

const generateSignals = (): Signal[] => {
  const labels = [
    'Momentum',
    'Volatility',
    'Macro Stress',
    'Liquidity Pulse',
    'Sentiment Divergence',
    'Correlation Drift',
    'Yield Spread',
    'Inflation Arc',
  ];
  return labels.map(label => ({
    label,
    value: parseFloat((Math.random() * 2 - 1).toFixed(2)),
  }));
};

export default function ForecastRiskGrid() {
  const [signals, setSignals] = useState<Signal[]>([]);

  useEffect(() => {
    setSignals(generateSignals());
    const interval = setInterval(() => {
      setSignals(generateSignals());
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-b from-black via-zinc-900/10 to-black border border-purple-400/20 font-mono text-white px-3 py-4">

      {/* 🧠 Title */}
      <div className="text-center text-purple-300 text-[10px] uppercase font-bold tracking-[0.25em] pb-1">
        Forecast Risk Grid
      </div>
      <div className="text-center text-zinc-400 text-[7.25px] uppercase tracking-widest pb-4">
        Cognitive Volatility Ribbon · AGI Signal Drift
      </div>

      {/* 🌌 Ribbon */}
      <div className="relative z-10 flex justify-center items-center h-[calc(100%-60px)]">
        <div className="relative w-full h-[70px] flex items-center justify-around">

          {signals.map((s) => {
            const polarity = s.value > 0 ? 'emerald' : 'rose';
            const intensity = Math.min(Math.abs(s.value), 1);
            const size = 14 + intensity * 18; // 🔧 Final size curve: max 32px

            return (
              <div key={s.label} className="flex flex-col items-center gap-[2px] text-center">
                <div
                  className="rounded-full shadow-inner blur-[0.5px] animate-pulse transition-all duration-500"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: `rgba(${s.value > 0 ? '52,211,153' : '248,113,113'}, ${0.25 + intensity * 0.4})`,
                    border: `1px solid rgba(${s.value > 0 ? '110,231,183' : '252,165,165'}, 0.3)`,
                  }}
                />
                <div className="text-[6.5px] uppercase text-zinc-400 tracking-widest leading-tight">
                  {s.label}
                </div>
                <div
                  className={`text-[6.25px] ${
                    s.value > 0 ? 'text-emerald-300' : 'text-rose-300'
                  }`}
                >
                  {s.value > 0 ? '+' : ''}
                  {s.value.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔮 Central Pulse */}
      <div className="absolute top-1/2 left-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px] bg-purple-400/10 z-0 animate-glowPulse" />
    </div>
  );
}