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

export default function SomePanel({ theme }: { theme: 'blue' | 'purple' }) {({ theme }: { theme: 'blue' | 'purple' })NeuralExecutionCortex() {
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

  const weights = Object.entries(normalize());

  return (
    <div className="relative w-full h-full px-6 py-5 bg-black rounded-2xl border-[1.5px] border-[#b14dff22] shadow-[0_0_120px_#000000f0] text-white font-sans overflow-hidden text-[16px] leading-[1.4]">
      
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
            {(slide === 2 || slide === 3) && (
              <>
                <div className="text-[15px] text-white/40">
                  {slide === 2 ? 'Allocation Map (I)' : 'Allocation Map (II)'}
                </div>
                {weights
                  .slice(slide === 2 ? 0 : 2, slide === 2 ? 2 : weights.length)
                  .map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between gap-3 text-[14px] font-mono w-full">
                      <span className="w-20 text-[#b14dff] truncate">{key}</span>
                      <div className="flex-1 max-w-[140px] h-[8px] bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 rounded-full"
                          style={{ width: `${(val * 100).toFixed(0)}%` }}
                        />
                      </div>
                      <span className="w-10 text-right text-white/80 text-[13px]">{(val * 100).toFixed(0)}%</span>
                    </div>
                  ))}
              </>
            )}

            {slide === 0 && (
              <>
                <div className="text-[15px] text-white/40">Cortex Input</div>
                <div className="text-[16px] font-mono">Emotion: <span className="text-[#b14dff]">{snapshot.emotion}</span></div>
                <div className="text-[16px] font-mono">Confidence: {snapshot.confidence}</div>
                <div className="text-[14px] text-white/50 font-mono">Fork ID: {snapshot.forkId}</div>
              </>
            )}

            {slide === 1 && (
              <>
                <div className="text-[15px] text-white/40">Forecast Target</div>
                <div className="text-[16px] font-mono">Future: <span className="text-[#b14dff]">{snapshot.future}</span></div>
                <div className="text-[16px]">Risk: <span className="text-rose-400 font-mono">{snapshot.riskLevel}</span></div>
                <div className="text-[16px]">Urgency: <span className="text-yellow-300 font-mono">{snapshot.urgency}</span></div>
              </>
            )}

            {slide === 4 && (
              <>
                <div className="text-[15px] text-white/40">Override & Mutation</div>
                <div className="grid grid-cols-2 gap-2 font-mono text-[15px]">
                  <div>Override: {snapshot.override ? <span className="text-yellow-300">⚡ YES</span> : <span className="text-white/30">—</span>}</div>
                  <div>Mutation: {snapshot.mutation ? <span className="text-green-300">🧬 Active</span> : <span className="text-white/30">—</span>}</div>
                </div>
              </>
            )}

            {slide === 5 && (
              <>
                <div className="text-[15px] text-white/40">Swarm Mood</div>
                <div className="grid grid-cols-3 gap-x-1 text-[15px] font-mono">
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
                <div className="text-[15px] text-white/40">Neural Load</div>
                <div className="text-[16px] font-mono text-orange-400">{(parseFloat(snapshot.neuralLoad) * 100).toFixed(0)}%</div>
                <div className="text-[14px] text-white/50 font-mono">Execution Path: T+{snapshot.execCountdown} cycles</div>
              </>
            )}

            {slide === 7 && (
              <>
                <div className="text-[15px] text-white/40">Loopback Reflex</div>
                <div className="text-white text-[15px] font-mono">
                  {snapshot.loopbackOverride
                    ? '🧠 Self-override initiated — coherence threshold breached.'
                    : '— No loopback triggered this cycle'}
                </div>
              </>
            )}

            {slide === 8 && (
              <>
                <div className="text-[15px] text-white/40">Recent Neural Thought</div>
                <div className="text-white text-[15px] font-mono">{snapshot.recentThought}</div>
                <div className="text-white/40 text-[14px] font-mono">Swarm Conflict Index: {snapshot.swarmConflict}</div>
              </>
            )}

            {slide === 9 && (
              <>
                <div className="text-[15px] text-white/40">Diagnostics</div>
                <div className="text-white text-[15px] font-mono space-y-1">
                  <div>Agent: <span className="text-[#b14dff]">{snapshot.agentSource}</span></div>
                  <div>Drift: <span className="text-blue-300">{snapshot.confidenceDrift}</span></div>
                  <div>Contradiction: <span className="text-orange-300">{snapshot.contradictionLevel}</span></div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}