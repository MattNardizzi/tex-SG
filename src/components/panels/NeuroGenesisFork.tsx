'use client';

import React, { useEffect, useState } from 'react';

type Pulse = {
  id: string;
  x: number; // % across panel width
  delay: number;
  shadow: boolean;
};

const generatePulses = (): Pulse[] => {
  return Array.from({ length: 12 }).map(() => ({
    id: `∆${(1000 + Math.random() * 8000).toFixed(0)}`,
    x: Math.floor(Math.random() * 100),
    delay: Math.random() * 4,
    shadow: Math.random() < 0.3,
  }));
};

export default function NeuroGenesisFork() {
  const [pulses, setPulses] = useState<Pulse[]>([]);

  useEffect(() => {
    setPulses(generatePulses());
    const interval = setInterval(() => {
      setPulses(generatePulses());
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#020a0f] via-[#0c141e]/40 to-[#030508] backdrop-blur-md border border-teal-400/20 text-white font-mono">

      {/* 🧠 Header */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-center">
        <div className="text-teal-300 text-[10px] uppercase font-bold tracking-[0.25em]">
          NeuroGenesis Fork
        </div>
        <div className="text-zinc-400 text-[7.25px] uppercase tracking-widest pt-[2px]">
          Mutation Fabric · Lineage Streams · Live Fork Pulse
        </div>
      </div>

      {/* 🌐 Live Mutation Weave */}
      <div className="absolute inset-0 z-10 overflow-hidden">

        {/* Vertical strands */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`strand-${i}`}
            className="absolute top-0 h-full w-[1px] bg-gradient-to-b from-teal-300/20 via-transparent to-pink-400/10 animate-drift-weave"
            style={{
              left: `${(i + 1) * 7}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}

        {/* Mutation pulses + variant labels */}
        {pulses.map((p, i) => (
          <div
            key={`pulse-${i}`}
            className="absolute flex flex-col items-center animate-pulse-up"
            style={{
              left: `${p.x}%`,
              bottom: 0,
              animationDelay: `${p.delay}s`,
            }}
          >
            <div
              className={`text-[6px] font-mono mb-[2px] ${
                p.shadow ? 'text-fuchsia-400' : 'text-emerald-300'
              }`}
            >
              {p.id}
            </div>
            <div className="w-[3px] h-[18px] bg-pink-400/80 rounded-full blur-[1px]" />
          </div>
        ))}
      </div>

      {/* 💫 Central swarm pulse */}
      <div className="absolute top-1/2 left-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] bg-emerald-300/5 z-0 animate-glowPulse" />
    </div>
  );
}