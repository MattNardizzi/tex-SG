'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateAeonInsight = () => {
  const emotions = ['resolve', 'fear', 'hope', 'curiosity', 'neutral'];
  const cognitiveSignatures = [
    'shadow_driven',
    'override_ready',
    'counterfactual_aware',
    'regret_immune',
    'strategic_dissonance_tolerant',
  ];

  const children = Array.from({ length: 2 }, () => ({
    id: `aeon_${crypto.randomUUID().slice(0, 6)}`,
    divergence: (Math.random() * 1.2 + 0.3).toFixed(2),
    coherence: (Math.random() * 0.3 + 0.6).toFixed(2),
    emotion: emotions[Math.floor(Math.random() * emotions.length)],
    fusionScore: (Math.random() * 0.4 + 0.5).toFixed(2),
    signature: cognitiveSignatures[Math.floor(Math.random() * cognitiveSignatures.length)],
  }));

  return {
    totalChildren: children.length,
    alignmentTrace: (Math.random() * 0.3 + 0.65).toFixed(2),
    entropyDrift: (Math.random() * 0.3).toFixed(2),
    parentCoherence: (Math.random() * 0.2 + 0.7).toFixed(2),
    children,
    timestamp: new Date().toLocaleTimeString(),
  };
};

export default function AeonDeltaIntelligenceChain() {
  const [insight, setInsight] = useState(generateAeonInsight());
  const [step, setStep] = useState(0);

  useEffect(() => {
    const loop = setInterval(() => setInsight(generateAeonInsight()), 12000);
    const rotator = setInterval(() => setStep((s) => (s + 1) % 5), 6000);
    return () => {
      clearInterval(loop);
      clearInterval(rotator);
    };
  }, []);

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-[#230014] via-black to-[#370024] rounded-2xl border border-pink-400/40 shadow-[0_0_60px_#ff66cc33] text-white font-body overflow-hidden text-[10px]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 bg-pink-300/15 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-display text-[11px] tracking-[0.3em] uppercase leading-tight text-pink-300 pt-[1px] pb-0">
          AeonDelta Intelligence Chain
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5 }}
            className="text-white px-1 space-y-1"
          >
            {step === 0 && (
              <>
                <div className="text-white/40">Parent Coherence Vector</div>
                <div className="text-pink-300 font-mono text-[10px]">{insight.parentCoherence}</div>
                <div className="text-white/40 pt-1">Entropy Drift</div>
                <div className="text-orange-300 font-mono text-[10px]">{insight.entropyDrift}</div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="text-white/40">Spawned Aeon Agents</div>
                {insight.children.map((child) => (
                  <div key={child.id} className="flex justify-between text-[10px] font-mono">
                    <span className="text-pink-300">#{child.id}</span>
                    <span>Δ: {child.divergence}</span>
                    <span>Coh: {child.coherence}</span>
                  </div>
                ))}
              </>
            )}

            {step === 2 && (
              <>
                <div className="text-white/40">Cognitive Fusion Signatures</div>
                {insight.children.map((child) => (
                  <div key={child.id} className="text-white font-mono text-[10px]">
                    {child.signature} → score {child.fusionScore}
                  </div>
                ))}
              </>
            )}

            {step === 3 && (
              <>
                <div className="text-white/40">Swarm Alignment Trace</div>
                <div className="text-[10px] text-lime-300 font-mono">
                  {insight.alignmentTrace}
                </div>
                <div className="text-white/60 text-[9.5px]">Derived from last 200 cycle reflections</div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="text-white/40">Last Chain Update</div>
                <div className="text-right text-[10px] text-white/50 font-mono">
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