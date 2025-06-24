'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateNeuralSnapshot = () => {
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const weights = {
    equities: Math.random(),
    bonds: Math.random(),
    alternatives: Math.random(),
    cash: Math.random(),
  };

  return {
    emotion: pick(['resolve', 'fear', 'curious', 'alert', 'focus']),
    future: pick([
      'Oil flash crash',
      'CBDC breakout war',
      'Synthetic liquidity spiral',
      'Decentralized yield inversion',
    ]),
    confidence: (Math.random() * 0.15 + 0.82).toFixed(3),
    confidenceDrift: (Math.random() * 0.2 - 0.1).toFixed(3),
    contradictionLevel: (Math.random() * 0.4 + 0.1).toFixed(2),
    urgency: (Math.random() * 0.2 + 0.7).toFixed(2),
    coherence: (Math.random() * 0.2 + 0.7).toFixed(2),
    regret: (Math.random() * 0.9).toFixed(2),
    riskLevel: pick(['LOW', 'MEDIUM', 'HIGH']),
    strategyId: crypto.randomUUID().slice(0, 8),
    override: Math.random() > 0.6,
    mutation: Math.random() > 0.5,
    forkId: `QF-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    weights,
    neuralLoad: (Math.random() * 0.9 + 0.1).toFixed(2),
    execCountdown: (Math.random() * 3 + 0.5).toFixed(1),
    swarmConflict: (Math.random() * 0.6).toFixed(2),
    recentThought: pick([
      'Rebalanced due to volatility signal',
      'Detected anomalous liquidity pattern',
      'Strategic override triggered by foresight drop',
      'Quantum mutation injected into portfolio loop',
    ]),
    loopbackOverride: Math.random() > 0.5,
    agentSource: pick(['tex_core', 'goal_engine', 'memory_mutator', 'emotion_heuristics']),
    swarm: {
      hope: Math.floor(Math.random() * 10),
      fear: Math.floor(Math.random() * 10),
      resolve: Math.floor(Math.random() * 10),
      curiosity: Math.floor(Math.random() * 10),
      anger: Math.floor(Math.random() * 10),
    },
  };
};

export default function NeuralExecutionCortex() {
  const [snapshot, setSnapshot] = useState(generateNeuralSnapshot());
  const [slide, setSlide] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const durations = Array(10).fill(6000);
    let current = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const advanceSlide = () => {
      current = (current + 1) % 10;
      setSlide(current);
      if (current === 0) {
        const newSnap = generateNeuralSnapshot();
        setSnapshot(newSnap);
        setPulse(true);
        setTimeout(() => setPulse(false), 3000);
      }
      timeout = setTimeout(advanceSlide, durations[current]);
    };

    timeout = setTimeout(advanceSlide, durations[0]);
    return () => clearTimeout(timeout);
  }, []);

  const normalize = () => {
    const total = Object.values(snapshot.weights).reduce((a, b) => a + b, 0);
    const out: Record<string, number> = {};
    for (const key in snapshot.weights) {
      const typedKey = key as keyof typeof snapshot.weights;
      out[typedKey] = snapshot.weights[typedKey] / total;
    }
    return out;
  };

  const weights = Object.entries(normalize());

  return (
    <div
      className={`relative w-full h-full px-6 py-5 bg-black rounded-2xl text-white font-sans overflow-hidden text-[16px] leading-[1.4] border-[1.5px]
      ${pulse ? 'border-[#b14dff] shadow-[0_0_60px_rgba(177,77,255,0.6)] animate-pulse' : 'border-[#b14dff22] shadow-[0_0_120px_#000000f0]'}
      transition-all duration-300`}
    >
      {/* ⚡ Execution Flash Layer */}
      {pulse && (
        <div className="absolute inset-0 z-0 bg-purple-300 opacity-[0.06] pointer-events-none animate-pulse blur-[3px]" />
      )}

      {/* 🟣 Center Pulse Line */}
      <div className="absolute top-0 left-1/2 w-[2px] h-full -translate-x-1/2 bg-gradient-to-b from-black via-[#b14dff88] to-black blur-[1px] opacity-90 pointer-events-none" />

      {/* 💠 Panel Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-mono text-[18px] tracking-[0.25em] uppercase text-[#b14dff] mb-1">
          Neural Execution Cortex
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="text-white px-1 space-y-1.5"
          >
            {/* Keep your existing content structure here — no changes needed */}

            {/* Keep all existing slides as-is */}
            {/* Just reuse what you already had for slides 0–9 */}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}