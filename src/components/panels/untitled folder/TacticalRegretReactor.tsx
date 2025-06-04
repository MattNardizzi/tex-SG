'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateContradictionInsight = () => {
  const causes = [
    'Volatility spike contradiction',
    'Alpha expectation mismatch',
    'Temporal drift violation',
    'Memory-coherence inconsistency',
    'Swarm bias fragmentation',
  ];
  const resolutions = [
    'Counterfactual override activated',
    'Shadow fork elected by swarm consensus',
    'Real-time patch deployed to core strategy',
    'Memory rewrite initiated to preserve alignment',
    'Autonomous disobedience triggered',
  ];
  const forks = Array.from({ length: 2 }, () => ({
    id: `${Math.floor(Math.random() * 9000 + 1000)}-fx`,
    contradiction: (Math.random() * 0.7 + 0.3).toFixed(2),
    regret: (Math.random() * 0.7 + 0.2).toFixed(2),
    coherence: (Math.random() * 0.5 + 0.5).toFixed(2),
    emotionalState: ['resolve', 'curious', 'fear', 'doubt'][Math.floor(Math.random() * 4)],
    reflex: ['auto_patch', 'disobedience', 'override'][Math.floor(Math.random() * 3)],
  }));

  return {
    cause: causes[Math.floor(Math.random() * causes.length)],
    entropyScore: (Math.random() * 0.7 + 0.2).toFixed(3),
    resolution: resolutions[Math.floor(Math.random() * resolutions.length)],
    forks,
    timestamp: new Date().toLocaleTimeString(),
  };
};

export default function TacticalContradictionMatrix() {
  const [insight, setInsight] = useState(generateContradictionInsight());
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setInsight(generateContradictionInsight());
    }, 11000);

    const durations = Array(6).fill(5000);
    let current = 0;
    let timer: NodeJS.Timeout;

    const rotate = () => {
      current = (current + 1) % 6;
      setStep(current);
      timer = setTimeout(rotate, durations[current]);
    };

    timer = setTimeout(rotate, durations[0]);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-[#0a0018] via-black to-[#1b0032] rounded-2xl border border-purple-400/40 shadow-[0_0_60px_#a066ff33] text-white font-body overflow-hidden text-[10px]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] -translate-x-1/2 bg-purple-300/15 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-display text-[11px] tracking-[0.3em] uppercase leading-tight text-purple-300 pt-[1px] pb-0">
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
                <div className="text-purple-300 font-mono">{insight.cause}</div>
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
                    <span className="text-purple-300">#{f.id}</span>
                    <span>Δ: {f.contradiction}</span>
                    <span>R: {f.regret}</span>
                    <span>Coh: {f.coherence}</span>
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
                <div className="text-white/70 text-[9.5px]">
                  Triggered counterfactual loop with dissonance flag.
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