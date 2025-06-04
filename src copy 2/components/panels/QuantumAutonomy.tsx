'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const UPDATE_INTERVAL = 2500;
const MAX_LOGS = 5;

export default function QuantumAutonomy() {
  const [decisions, setDecisions] = useState<Decision[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDecisions((prev) => [generateDecision(), ...prev.slice(0, MAX_LOGS - 1)]);
    }, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-black via-[#14010b] to-black text-white font-mono text-[8px] shadow-lg border border-rose-500/20">

      {/* Glowing Core */}
      <div className="absolute inset-0 animate-scanline pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-fuchsia-500/15 blur-[90px] z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-rose-400/25 w-24 h-24 rounded-full animate-spin-slow" />

      {/* Header */}
      <div className="relative z-10 text-center text-[10px] uppercase tracking-[0.25em] text-rose-400 font-semibold pt-4 pb-2">
        Quantum Autonomy
      </div>

      {/* Log Stream */}
      <div className="relative z-10 flex flex-col gap-2 px-3 pb-4 overflow-hidden">
        {decisions.map((entry, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="border border-white/10 rounded-lg p-2 bg-zinc-950/60 backdrop-blur-md shadow-md"
          >
            <div className="text-rose-300 uppercase font-semibold tracking-wide mb-1">
              Fusion Mode: {entry.strategy}
            </div>
            <div className="text-zinc-400 text-[7.5px] leading-snug">
              Signal: <span className="text-zinc-100">{entry.signal}</span><br />
              Action: <span className="text-amber-400">{entry.action}</span>
            </div>
            <div className="flex justify-between mt-1 text-[6.5px] text-zinc-500">
              <span>Urgency: <span className="text-yellow-300">{entry.urgency.toFixed(2)}</span></span>
              <span>Confidence: <span className="text-green-300">{entry.confidence.toFixed(2)}</span></span>
              <span>Regret: <span className="text-red-400">{entry.regret.toFixed(2)}</span></span>
            </div>
            <div className="mt-1 text-[6px] text-fuchsia-300 italic">
              ➤ {entry.reasoning}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

type Decision = {
  strategy: 'QAOA' | 'PPO' | 'FUSED';
  signal: string;
  action: string;
  urgency: number;
  confidence: number;
  regret: number;
  reasoning: string;
};

function generateDecision(): Decision {
  const strategies = ['QAOA', 'PPO', 'FUSED'] as const;
  const signals = [
    'ETH-BTC divergence ↑',
    'Sentiment crossover: bearish',
    'VIX spike > 3σ',
    'Quantum convergence: ✓',
    'Reward model saturation',
  ];
  const actions = [
    'Execute hedge rotation',
    'Increase cash buffer',
    'Trigger fallback model',
    'Reinforce RL trajectory',
    'Override baseline weights',
  ];
  const reasons = [
    'Quantum optimizer and RL both confirm deviation.',
    'Urgency threshold exceeded; PPO reinforced fallback.',
    'Signal blend exceeds coherence margin.',
    'Risk delta collapsed below variance line.',
    'Strategic override executed at node vector.',
  ];

  return {
    strategy: strategies[Math.floor(Math.random() * strategies.length)],
    signal: signals[Math.floor(Math.random() * signals.length)],
    action: actions[Math.floor(Math.random() * actions.length)],
    urgency: Math.random(),
    confidence: 0.82 + Math.random() * 0.15,
    regret: Math.random() * 0.12,
    reasoning: reasons[Math.floor(Math.random() * reasons.length)],
  };
}