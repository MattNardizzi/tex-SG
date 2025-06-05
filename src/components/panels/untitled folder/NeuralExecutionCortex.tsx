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
    agentSource: pick([
      'tex_core',
      'goal_engine',
      'memory_mutator',
      'emotion_heuristics',
    ]),
    swarm: {
      hope: Math.floor(Math.random() * 10),
      fear: Math.floor(Math.random() * 10),
      resolve: Math.floor(Math.random() * 10),
      curiosity: Math.floor(Math.random() * 10),
      anger: Math.floor(Math.random() * 10),
    },
  };
};

export default function $1({ theme }: { theme: 'blue' | 'purple' })NeuralExecutionCortex() {
  const [snapshot, setSnapshot] = useState<ReturnType<typeof generateNeuralSnapshot> | null>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    setSnapshot(generateNeuralSnapshot());

    const durations = Array(10).fill(6000);
    let current = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const advanceSlide = () => {
      current = (current + 1) % 10;
      setSlide(current);
      timeout = setTimeout(advanceSlide, durations[current]);
    };

    const interval = setInterval(() => setSnapshot(generateNeuralSnapshot()), 10000);
    timeout = setTimeout(advanceSlide, durations[0]);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  if (!snapshot) return null;

  const normalize = () => {
    const total = Object.values(snapshot.weights).reduce((a, b) => a + b, 0);
    const out: Record<string, number> = {};
    for (const key in snapshot.weights) {
      const typedKey = key as keyof typeof snapshot.weights;
      out[typedKey] = snapshot.weights[typedKey] / total;
    }
    return out;
  };

  const asciiBar = (value: number) => '▉'.repeat(Math.round(value * 20)).padEnd(20, '░');
  const weights = Object.entries(normalize());

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-[#230014] via-black to-[#370024] rounded-2xl border border-pink-400/40 shadow-[0_0_60px_#ff66cc33] text-white font-body text-[10px] overflow-hidden">
      {/* FX Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/2 left-1/2 w-[280px] h-[280px] -translate-x-1/2 -translate-y-1/2 bg-pink-300/15 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-display text-[11px] tracking-[0.3em] uppercase text-pink-300 pb-1">
          🧠 Neural Execution Cortex
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5 }}
            className="text-white px-1 space-y-1"
          >
            {slide === 0 && (
              <>
                <div>Emotion: <span className="text-pink-300 font-mono">{snapshot.emotion}</span></div>
                <div className="font-mono">Confidence: {snapshot.confidence}</div>
                <div className="font-mono">Coherence: {snapshot.coherence}</div>
                <div className="text-white/40 text-[9px] font-mono">Fork ID: {snapshot.forkId}</div>
              </>
            )}
            {slide === 1 && (
              <>
                <div className="text-purple-300">EXECUTE: <span className="text-pink-300 font-mono">{snapshot.future}</span></div>
                <div>Risk: <span className="text-rose-400 font-mono">{snapshot.riskLevel}</span></div>
                <div>Urgency: <span className="text-yellow-300 font-mono">{snapshot.urgency}</span></div>
              </>
            )}
            {slide === 2 && (
              <>
                <div className="uppercase text-[9px] text-white/40">Allocation</div>
                {weights.slice(0, 2).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center gap-2">
                    <span className="w-20 truncate">{key}:</span>
                    <span className="text-pink-300 font-mono">{asciiBar(val)}</span>
                    <span>{(val * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </>
            )}
            {slide === 3 && (
              <>
                <div className="uppercase text-[9px] text-white/40">Allocation</div>
                {weights.slice(2).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center gap-2">
                    <span className="w-20 truncate">{key}:</span>
                    <span className="text-pink-300 font-mono">{asciiBar(val)}</span>
                    <span>{(val * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </>
            )}
            {slide === 4 && (
              <>
                <div className="text-[9px] text-white/40">Override & Mutation</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>Override Reflex: {snapshot.override ? <span className="text-yellow-300">⚡ YES</span> : <span className="text-white/30">—</span>}</div>
                  <div>Quantum Mutation: {snapshot.mutation ? <span className="text-green-300">🧬 Active</span> : <span className="text-white/30">—</span>}</div>
                </div>
              </>
            )}
            {slide === 5 && snapshot?.swarm && (
              <>
                <div className="text-[9px] text-white/40">Swarm Mood</div>
                <div className="grid grid-cols-3 gap-x-1 text-[9px] font-body">
                  <div>Hope: {snapshot.swarm.hope}</div>
                  <div>Fear: {snapshot.swarm.fear}</div>
                  <div>Resolve: {snapshot.swarm.resolve}</div>
                  <div>Curiosity: {snapshot.swarm.curiosity}</div>
                  <div>Anger: {snapshot.swarm.anger}</div>
                </div>
              </>
            )}
            {slide === 6 && (
              <>
                <div>Neural Load: <span className="text-orange-400 font-mono">{(parseFloat(snapshot.neuralLoad) * 100).toFixed(0)}%</span></div>
                <div className="text-[9px] text-white/50">Execution Pathway: T+{snapshot.execCountdown} cycles</div>
              </>
            )}
            {slide === 7 && (
              <>
                <div className="text-[9px] text-white/40">Loopback Reflex</div>
                <div className="text-white text-[10px] font-mono">
                  {snapshot.loopbackOverride
                    ? '🧠 Self-override initiated — coherence threshold breached.'
                    : '— No loopback triggered this cycle'}
                </div>
              </>
            )}
            {slide === 8 && (
              <>
                <div className="text-[9px] text-white/40">Recent Neural Thought</div>
                <div className="text-white text-[10px] font-mono">{snapshot.recentThought}</div>
                <div className="text-white/40 text-[9px] font-mono">Swarm Conflict Index: {snapshot.swarmConflict}</div>
              </>
            )}
            {slide === 9 && (
              <>
                <div className="text-[9px] text-white/40">Cognitive Diagnostics</div>
                <div className="text-white text-[10px] font-mono space-y-1">
                  <div>Agent Source: <span className="text-fuchsia-400">{snapshot.agentSource}</span></div>
                  <div>Confidence Drift: <span className="text-blue-300">{snapshot.confidenceDrift}</span></div>
                  <div>Contradiction Level: <span className="text-orange-300">{snapshot.contradictionLevel}</span></div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}