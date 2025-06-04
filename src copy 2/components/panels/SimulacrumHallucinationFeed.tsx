'use client';

import React, { useEffect, useState } from 'react';

type Hallucination = {
  id: string;
  summary: string;
  probability: number;
  regret: number;
};

const generateHallucination = (): Hallucination => {
  const hallucinations = [
    '⇌X Hyperdeflation Chain',
    'Ξ208 Policy Cascade Divergence',
    '§91 Liquidity Inversion',
    'Ω7 Quantum Risk Flip',
    'λ47 Sentiment Collapse Scenario',
    '∆314 Market Dislocation'
  ];

  return {
    id: `H-${Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase()}`,
    summary: hallucinations[Math.floor(Math.random() * hallucinations.length)],
    probability: +(Math.random() * 0.9 + 0.05).toFixed(3),
    regret: +(Math.random() * 0.1).toFixed(3)
  };
};

export default function SimulacrumHallucinationFeed() {
  const [hallucinations, setHallucinations] = useState<Hallucination[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHallucinations(prev => {
        const updated = [generateHallucination(), ...prev];
        return updated.slice(0, 6);
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-b from-black via-indigo-900/10 to-black text-white font-mono">

      {/* Header */}
      <div className="text-center text-indigo-300 text-[10px] font-bold uppercase tracking-[0.3em] pt-3 pb-1">
        Simulacrum Feed
      </div>
      <div className="text-center text-zinc-400 text-[7.25px] uppercase tracking-widest pb-2">
        AGI Dreamfall · Timeline Drift · Variant Forks
      </div>

      {/* Central Pulse */}
      <div className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 bg-indigo-400/10 rounded-full blur-[90px] z-0 animate-pulse" />
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-indigo-500/10 blur-[1px] -translate-x-1/2 z-0 animate-glowPulse" />

      {/* Hallucination Stream */}
      <div className="relative z-10 flex flex-col items-center gap-3 px-4 pt-2 overflow-hidden h-[calc(100%-60px)]">
        {hallucinations.map((h) => (
          <div key={h.id} className="w-full text-center opacity-90 hover:opacity-100 transition-opacity duration-300">

            {/* ID + Regret */}
            <div className="text-[7.25px] font-bold uppercase text-indigo-300 flex justify-between px-4">
              <span>{h.id}</span>
              <span className="italic text-zinc-400">Regret: {h.regret}</span>
            </div>

            {/* Summary */}
            <div className="text-[6.5px] italic text-white/90 mt-[1px] tracking-tight">
              ⟶ {h.summary}
            </div>

            {/* Timeline Probability Pulse Bar */}
            <div className="w-full h-[3px] mt-1 bg-indigo-500/10 rounded-full mx-auto overflow-hidden">
              <div
                className="h-full bg-indigo-300 animate-pulse"
                style={{ width: `${(h.probability * 100).toFixed(0)}%` }}
              />
            </div>

            {/* Probability Readout */}
            <div className="text-[6.25px] text-right pr-4 text-indigo-200/80">
              P(Timeline): {h.probability}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}