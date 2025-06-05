'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateContradictionInsight = () => {
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const forks = Array.from({ length: 2 }, () => {
    const contradiction = parseFloat((Math.random() * 0.7 + 0.3).toFixed(2));
    const regret = parseFloat((Math.random() * 0.7 + 0.2).toFixed(2));
    const coherence = parseFloat((Math.random() * 0.5 + 0.5).toFixed(2));
    const entropy = parseFloat((Math.random() * 0.7 + 0.2).toFixed(3));
    return {
      id: `${Math.floor(Math.random() * 9000 + 1000)}-fx`,
      contradiction,
      regret,
      coherence,
      entropy,
      emotionalState: pick(['resolve', 'curious', 'fear', 'doubt']),
      reflex: pick(['auto_patch', 'disobedience', 'override']),
      riskIndex: (contradiction * regret * (1 - coherence)).toFixed(3),
    };
  });

  const entropyScore = parseFloat((Math.random() * 0.7 + 0.2).toFixed(3));
  const totalRisk = forks.reduce((acc, f) => acc + parseFloat(f.riskIndex), 0).toFixed(3);

  return {
    cause: pick([
      'Volatility spike contradiction',
      'Alpha expectation mismatch',
      'Temporal drift violation',
      'Memory-coherence inconsistency',
      'Swarm bias fragmentation',
    ]),
    resolution: pick([
      'Counterfactual override activated',
      'Shadow fork elected by swarm consensus',
      'Real-time patch deployed to core strategy',
      'Memory rewrite initiated to preserve alignment',
      'Autonomous disobedience triggered',
    ]),
    forks,
    entropyScore,
    contradictionRisk: totalRisk,
    timestamp: new Date().toLocaleTimeString(),
  };
};

export default function $1({ theme }: { theme: 'blue' | 'purple' })TacticalContradictionMatrix() {
  const [insight, setInsight] = useState<ReturnType<typeof generateContradictionInsight> | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setInsight(generateContradictionInsight());

    const totalSteps = 6;
    const duration = 5000;

    const loop = () => {
      setStep((prev) => {
        const next = (prev + 1) % totalSteps;
        if (next === 0) setInsight(generateContradictionInsight());
        return next;
      });
    };

    const intervalId = setInterval(loop, duration);
    return () => clearInterval(intervalId);
  }, []);

  if (!insight) return null;

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-[#230014] via-black to-[#370024] rounded-2xl border border-pink-400/40 shadow-[0_0_60px_#ff66cc33] text-white font-body overflow-hidden text-[10px]">

      {/* Reflex Pulse FX */}
      <div
        className="absolute -z-10 top-1/2 left-1/2 w-[480px] h-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] animate-pulse pointer-events-none"
        style={{ backgroundColor: 'rgba(255,105,180,0.08)', opacity: insight.entropyScore }}
      />

      {/* FX Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] -translate-x-1/2 bg-pink-300/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-display text-[11px] tracking-[0.3em] uppercase leading-tight text-pink-300 pt-[1px] pb-0">
          Tactical Contradiction Matrix
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="text-white px-1 space-y-1"
          >
            {step === 0 && (
              <>
                <div className="text-white/40">Active Contradiction Cause</div>
                <div className="text-pink-300 font-mono">{insight.cause}</div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="text-white/40">Resolution Path</div>
                <div className="text-white font-body text-[10.2px]">
                  {insight.resolution}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="text-white/40">Shadow Fork Diagnostics</div>
                {insight.forks.map((f) => (
                  <div key={f.id} className="flex justify-between text-[10px] font-mono">
                    <span className="text-pink-300">#{f.id}</span>
                    <span>Δ: {f.contradiction}</span>
                    <span>R: {f.regret}</span>
                    <span>Coh: {f.coherence}</span>
                    <span className="text-orange-300">S: {f.entropy}</span>
                  </div>
                ))}
              </>
            )}

            {step === 3 && (
              <>
                <div className="text-white/40">Reflex Engagement</div>
                {insight.forks.map((f) => (
                  <div key={f.id} className="text-[10px] font-mono">
                    {f.emotionalState} → <span className="text-yellow-300">{f.reflex}</span>
                  </div>
                ))}
              </>
            )}

            {step === 4 && (
              <>
                <div className="text-white/40">Entropy Load / Memory Rewrite</div>
                <div className="text-orange-400 font-mono text-[10px]">
                  Entropy Score: {insight.entropyScore}
                </div>
                <div className="text-white/50 font-mono text-[10px]">Contradiction Risk: {insight.contradictionRisk}</div>
                <div className="text-white/60 text-[9px] italic">
                  {insight.entropyScore > 0.6
                    ? '⚠ Dissonance levels breaching threshold.'
                    : '↳ Entropy remains within operating margin.'}
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <div className="text-white/40">Last Update</div>
                <div className="text-right text-white/50 text-[10px] font-mono">
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