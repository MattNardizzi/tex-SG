'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateCausalInsight = () => {
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const causes = [
    'Unexpected yield inversion signal',
    'Temporal alignment drift detected',
    'Recursive contradiction from override patch',
    'Agent feedback desync on global fork',
  ];

  const outcomes = [
    'Portfolio realignment induced fork ripple',
    'Strategy gain collapsed under sovereign tension',
    'Forked memory recompiled with altered coherence vector',
    'Simulated future overwritten by counterfactual override',
  ];

  const agentSources = [
    'tex_core',
    'goal_engine',
    'memory_mutator',
    'swarm_coordinator',
    'emotion_heuristics',
    'meta_learning',
  ];

  const path = {
    confidence: (Math.random() * 0.5 + 0.5).toFixed(2),
    contradiction: (Math.random() * 0.6 + 0.2).toFixed(2),
    coherenceDelta: (Math.random() * 0.3 - 0.15).toFixed(3),
    bifurcationScore: (Math.random() * 0.7 + 0.2).toFixed(2),
    entropyPressure: (Math.random() * 0.4 + 0.2).toFixed(2),
    displacement: (Math.random() * 1.2 + 0.3).toFixed(2),
    loopDetected: Math.random() > 0.7,
    overrideChance: (Math.random() * 0.6 + 0.3).toFixed(2),
  };

  const urgencyScore = (
    parseFloat(path.bifurcationScore) + parseFloat(path.entropyPressure)
  ).toFixed(2);

  return {
    cause: pick(causes),
    effect: pick(outcomes),
    path,
    agentSource: pick(agentSources),
    urgencyScore,
    override: Math.random() > 0.6,
    timestamp: new Date().toLocaleTimeString(),
  };
};

export default function ReflexiveCausalityMatrix() {
  const [insight, setInsight] = useState<ReturnType<typeof generateCausalInsight> | null>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    setInsight(generateCausalInsight());

    const durations = Array(7).fill(6000);
    let current = 0;
    let timeout: NodeJS.Timeout;

    const advanceSlide = () => {
      current = (current + 1) % durations.length;
      setSlide(current);
      timeout = setTimeout(advanceSlide, durations[current]);
    };

    const interval = setInterval(() => setInsight(generateCausalInsight()), 10000);
    timeout = setTimeout(advanceSlide, durations[0]);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  if (!insight) return null;

  return (
    <div className="relative w-full h-full px-6 py-5 bg-gradient-to-br from-[#102642] via-[#09202c] to-[#04131f] rounded-2xl border border-cyan-400/50 shadow-[0_0_100px_#00ffff55] text-white font-body overflow-hidden text-[16px] leading-[1.4]">

      {/* 🔵 Glow Aura */}
      <div
        className="absolute -z-10 top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/30 blur-[180px] animate-pulse"
        style={{ opacity: 0.2 }}
      />

      {/* ⚡ Grid FX */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] -translate-x-1/2 bg-cyan-300/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      {/* 🧠 Panel Header */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-display text-[18px] tracking-[0.25em] uppercase leading-tight text-cyan-300 mb-1">
          Reflexive Causality Matrix
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45 }}
            className="text-white px-1 space-y-1.5"
          >
            {slide === 0 && (
              <>
                <div className="text-white/40">Causal Trigger</div>
                <div className="text-cyan-300 font-mono text-[16px]">{insight.cause}</div>
              </>
            )}
            {slide === 1 && (
              <>
                <div className="text-white/40">Projected Effect</div>
                <div className="text-[16px] font-body text-white/90">{insight.effect}</div>
              </>
            )}
            {slide === 2 && (
              <>
                <div className="text-white/40">Causal Drift Analysis</div>
                <div className="font-mono text-[16px]">
                  Displacement: <span className="text-yellow-300">{insight.path.displacement}</span>
                </div>
                <div className="text-[15px] font-mono text-white/60">
                  Loop Detected: {insight.path.loopDetected ? '⚠ Recursive Entanglement' : '— Stable path'}
                </div>
              </>
            )}
            {slide === 3 && (
              <>
                <div className="text-white/40">Override Signal Forecast</div>
                <div className="text-[16px] font-mono">
                  Entropy Pressure: <span className="text-orange-300">{insight.path.entropyPressure}</span>
                </div>
                <div className="text-white/60 text-[15px]">
                  Reflex Probability: <span className="text-red-400">{insight.path.overrideChance}</span>
                </div>
              </>
            )}
            {slide === 4 && (
              <>
                <div className="text-white/40">Codex Impact + Drift</div>
                <div className="text-[16px] font-mono">
                  Coherence Δ: {insight.path.coherenceDelta} / Bifurcation: {insight.path.bifurcationScore}
                </div>
                <div className="text-[15px] text-white/60">
                  Sovereign Override: {insight.override ? <span className="text-cyan-300">Activated</span> : <span className="text-white/30">— Dormant</span>}
                </div>
              </>
            )}
            {slide === 5 && (
              <>
                <div className="text-white/40">Timestamp</div>
                <div className="text-right text-white/50 text-[15px] font-mono">{insight.timestamp}</div>
              </>
            )}
            {slide === 6 && (
              <>
                <div className="text-white/40">Agent & Urgency</div>
                <div className="text-[16px] font-mono">
                  Source: <span className="text-fuchsia-400">{insight.agentSource}</span><br />
                  Urgency: <span className="text-lime-300">{insight.urgencyScore}</span>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}