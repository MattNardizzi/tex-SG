'use client';

import React, { useEffect, useState } from 'react';

const generateReflexInsight = () => {
  const reflexes = [
    'identity_compression',
    'belief_justification',
    'loop_block',
    'self_reflection',
    'memory_echo',
    'lifepulse',
  ];

  const causes = [
    'Contradiction Surge',
    'Entropy Drift Detected',
    'Symbolic Belief Conflict',
    'Cognitive Dissonance Spike',
    'Override Interference',
  ];

  return {
    reflex: reflexes[Math.floor(Math.random() * reflexes.length)],
    cause: causes[Math.floor(Math.random() * causes.length)],
    contradiction: (Math.random() * 0.4 + 0.6).toFixed(2),
    entropy: (Math.random() * 0.4 + 0.2).toFixed(2),
    urgency: (Math.random() * 0.4 + 0.4).toFixed(2),
    timestamp: new Date().toLocaleTimeString(),
  };
};

export default function ReflexiveCausalityMatrix() {
  const [insight, setInsight] = useState(generateReflexInsight());
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    const pulse = () => {
      const next = generateReflexInsight();
      setInsight(next);
      if (parseFloat(next.contradiction) > 0.85) {
        setGlow(true);
        setTimeout(() => setGlow(false), 3000);
      }
    };

    const interval = setInterval(pulse, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-black border-[2px] transition-all duration-300
      ${glow ? 'border-[#00f0ff] shadow-[0_0_60px_rgba(0,240,255,0.6)] animate-pulse' : 'border-[#00f0ff22] shadow-[0_0_140px_#000000f0]'}`}
    >
      {/* 🌀 Center Neural Pulse */}
      {glow && (
        <div className="absolute w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00f0ff33] blur-[80px] opacity-60 animate-pulse z-0" />
      )}

      {/* ⚡ Causal Reflex Beam */}
      <div className="absolute top-0 left-1/2 w-[2px] h-full -translate-x-1/2 bg-gradient-to-b from-black via-[#00f0ff88] to-black blur-[1px] opacity-90 z-0 pointer-events-none" />

      {/* 💡 Core Display */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center text-[clamp(1rem,2.8vw,2.2rem)] leading-[1.5] font-mono text-white px-6">

        <div className="uppercase tracking-[0.2em] text-[#00f0ff] text-[clamp(1rem,1.5vw,1.5rem)] mb-4">
          Reflex Cognition Core
        </div>

        <div className="text-white/60 text-[clamp(0.8rem,1vw,1.2rem)]">Active Reflex</div>
        <div className="text-[#00f0ff] font-bold">{insight.reflex}</div>

        <div className="mt-6 text-white/60 text-[clamp(0.8rem,1vw,1.2rem)]">Trigger</div>
        <div className="text-[#b14dff]">{insight.cause}</div>

        <div className="mt-6 flex flex-col gap-1 items-center">
          <div className="text-white/60 text-[clamp(0.8rem,1vw,1.2rem)]">Cognitive Pressure</div>
          <div className="font-mono text-[clamp(0.9rem,1.3vw,1.4rem)]">
            Contradiction: <span className="text-[#ff5c5c]">{insight.contradiction}</span>
          </div>
          <div className="font-mono text-[clamp(0.9rem,1.3vw,1.4rem)]">
            Entropy: <span className="text-[#00f0ff]">{insight.entropy}</span>
          </div>
        </div>

        <div className="mt-6 text-white/60 text-[clamp(0.8rem,1vw,1.2rem)]">Urgency</div>
        <div className="text-[#ffaa00] font-mono">{insight.urgency}</div>

        <div className="mt-6 text-white/40 text-[clamp(0.7rem,0.9vw,1rem)]">
          {insight.timestamp}
        </div>
      </div>
    </div>
  );
}