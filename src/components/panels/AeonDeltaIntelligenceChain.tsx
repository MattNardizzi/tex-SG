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
  const [insight, setInsight] = useState(generateAeonInsight());
  const [step, setStep] = useState(0);
  const [lastTrace, setLastTrace] = useState(insight.alignmentTrace);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const triggerPulse = (current: number, previous: number) => {
      if (Math.abs(current - previous) > 0.08) {
        setPulse(true);
        setTimeout(() => setPulse(false), 3000);
      }
    };

    const insightTimer = setInterval(() => {
      const newInsight = generateAeonInsight();
      triggerPulse(newInsight.alignmentTrace, lastTrace);
      setLastTrace(newInsight.alignmentTrace);
      setInsight(newInsight);
    }, 12000);

    const stepTimer = setInterval(() => {
      setStep((s) => (s + 1) % 5);
    }, 6000);

    return () => {
      clearInterval(insightTimer);
      clearInterval(stepTimer);
    };
  }, [lastTrace]);

  return (
    <div
      className={`relative w-full h-full px-6 py-5 rounded-2xl bg-black font-sans overflow-hidden text-[16px] leading-[1.4] border-[1.5px]
        ${pulse ? 'border-[#b14dff] shadow-[0_0_50px_rgba(177,77,255,0.5)] animate-pulse' : 'border-[#00f0ff22] shadow-[0_0_120px_#000000f0]'}
        transition-all duration-300`}
    >
      {/* 🧬 Neon Pulse Ring */}
      {pulse && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b14dff22] blur-[80px] animate-ping opacity-40" />
        </div>
      )}

      {/* 🧬 Core Line */}
      <div className="absolute top-0 left-1/2 w-[2px] h-full -translate-x-1/2 bg-gradient-to-b from-black via-[#00f0ff88] to-black blur-[1px] opacity-90 pointer-events-none" />

      {/* Panel Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-mono text-[18px] tracking-[0.25em] uppercase text-[#00f0ff] mb-1">
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
                <div className="text-[#00f0ff] font-mono text-[16px]">{insight.parentCoherence}</div>
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
                    <span className="text-[#00f0ff]">#{child.id}</span>
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
                <div className="text-[16px] text-[#00f0ff] font-mono">{insight.alignmentTrace}</div>
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