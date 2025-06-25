'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const generateNeuralSnapshot = () => {
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

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

    const advanceSlide = () => {
      current = (current + 1) % 10;
      setSlide(current);
      if (current === 0) {
        const newSnap = generateNeuralSnapshot();
        setSnapshot(newSnap);
        setPulse(true);
        setTimeout(() => setPulse(false), 3000);
      }
      setTimeout(advanceSlide, durations[current]);
    };

    const interval = setTimeout(advanceSlide, durations[0]);
    return () => clearTimeout(interval);
  }, []);

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

        <motion.div
          key={slide}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
          className="text-white px-1 space-y-1.5"
        >
          <div className="text-sm text-white/70">Latest Insight</div>
          <div className="text-[#b14dff] font-mono text-sm">{snapshot.recentThought}</div>
          <div className="text-sm text-white/60 mt-3">
            Emotion: <span className="text-white">{snapshot.emotion}</span> | Confidence: <span className="text-[#00f0ff]">{snapshot.confidence}</span>
          </div>
          <div className="text-sm text-white/60">
            Contradiction: <span className="text-[#ff5c5c]">{snapshot.contradictionLevel}</span> | Urgency: <span className="text-[#ffaa00]">{snapshot.urgency}</span>
          </div>
          <div className="text-sm text-white/60">
            Fork ID: <span className="text-white">{snapshot.forkId}</span> | Strategy: <span className="text-white">{snapshot.strategyId}</span>
          </div>
          <div className="text-sm text-white/60">
            Neural Load: <span className="text-white">{snapshot.neuralLoad}</span> | Execution ETA: <span className="text-white">{snapshot.execCountdown}s</span>
          </div>
          <div className="text-sm text-white/60">
            Risk Level: <span className="text-white">{snapshot.riskLevel}</span> | Swarm Conflict: <span className="text-white">{snapshot.swarmConflict}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}