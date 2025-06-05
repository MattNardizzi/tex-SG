'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateAeonInsight = () => {
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const children = Array.from({ length: 2 }, () => {
    const divergence = parseFloat((Math.random() * 1.2 + 0.3).toFixed(2));
    const coherence = parseFloat((Math.random() * 0.3 + 0.6).toFixed(2));
    const fusionScore = parseFloat((Math.random() * 0.4 + 0.5).toFixed(2));
    return {
      id: `aeon_${crypto.randomUUID().slice(0, 6)}`,
      divergence,
      coherence,
      emotion: pick(['resolve', 'fear', 'hope', 'curiosity', 'neutral']),
      fusionScore,
      signature: pick([
        'shadow_driven',
        'override_ready',
        'counterfactual_aware',
        'regret_immune',
        'strategic_dissonance_tolerant',
      ]),
      riskIndex: (divergence * (1 - coherence)).toFixed(3),
    };
  });

  const entropyDrift = parseFloat((Math.random() * 0.3).toFixed(2));
  const alignmentTrace = parseFloat((Math.random() * 0.3 + 0.65).toFixed(2));
  const parentCoherence = parseFloat((Math.random() * 0.2 + 0.7).toFixed(2));
  const avgDivergence = (
    children.reduce((a, c) => a + c.divergence, 0) / children.length
  ).toFixed(2);

  return {
    totalChildren: children.length,
    children,
    alignmentTrace,
    entropyDrift,
    parentCoherence,
    avgDivergence,
    timestamp: new Date().toLocaleTimeString(),
  };
};

export default function AeonDeltaIntelligenceChain() {
  const [insight, setInsight] = useState<ReturnType<typeof generateAeonInsight> | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setInsight(generateAeonInsight());
    const insightTimer = setInterval(() => setInsight(generateAeonInsight()), 12000);
    const rotationTimer = setInterval(() => setStep((s) => (s + 1) % 5), 6000);
    return () => {
      clearInterval(insightTimer);
      clearInterval(rotationTimer);
    };
  }, []);

  if (!insight) return null;

  return (
    <div className="relative w-full h-full px-6 py-5 bg-gradient-to-br from-[#102642] via-[#09202c] to-[#04131f] rounded-2xl border border-cyan-400/50 shadow-[0_0_100px_#00ffff55] text-white font-body overflow-hidden text-[16px] leading-[1.4]">

      {/* 🔵 Glow Aura */}
      <div
        className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px] animate-pulse pointer-events-none"
        style={{ backgroundColor: 'rgba(0,255,255,0.08)' }}
      />

      {/* ⚡ Grid FX */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] -translate-x-1/2 bg-cyan-300/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      {/* 🧠 Panel Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-display text-[18px] tracking-[0.25em] uppercase leading-tight text-cyan-300 mb-1">
          AeonDelta Intelligence Chain
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5 }}
            className="text-white px-1 space-y-1.5"
          >
            {step === 0 && (
              <>
                <div className="text-white/40">Parent Coherence Vector</div>
                <div className="text-cyan-300 font-mono text-[16px]">{insight.parentCoherence}</div>
                <div className="text-white/40 pt-1">Entropy Drift</div>
                <div className="text-orange-300 font-mono text-[16px]">{insight.entropyDrift}</div>
                <div className="text-[15px] text-white/60 italic">
                  {insight.entropyDrift > 0.25
                    ? '⚠ Alignment destabilization detected'
                    : '↳ Inter-agent consistency nominal'}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="text-white/40">Spawned Aeon Agents</div>
                {insight.children.map((child) => (
                  <div key={child.id} className="flex justify-between text-[15px] font-mono">
                    <span className="text-cyan-300">#{child.id}</span>
                    <span>Δ: {child.divergence}</span>
                    <span>Coh: {child.coherence}</span>
                    <span className="text-rose-400">Risk: {child.riskIndex}</span>
                  </div>
                ))}
              </>
            )}

            {step === 2 && (
              <>
                <div className="text-white/40">Cognitive Fusion Signatures</div>
                {insight.children.map((child) => (
                  <div key={child.id} className="text-white font-mono text-[15px]">
                    {child.signature} → score {child.fusionScore}
                  </div>
                ))}
              </>
            )}

            {step === 3 && (
              <>
                <div className="text-white/40">Swarm Alignment Trace</div>
                <div className="text-[16px] text-lime-300 font-mono">{insight.alignmentTrace}</div>
                <div className="text-white/60 text-[15px]">
                  Based on {insight.totalChildren} agents | Δavg: {insight.avgDivergence}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="text-white/40">Last Chain Update</div>
                <div className="text-right text-[15px] text-white/50 font-mono">
                  {insight.timestamp}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}