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

export default function TacticalContradictionMatrix() {
  const [insight, setInsight] = useState(generateContradictionInsight());
  const [step, setStep] = useState(0);
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const triggerFlicker = (data: ReturnType<typeof generateContradictionInsight>) => {
      if (data.entropyScore > 0.6 || parseFloat(data.contradictionRisk) > 0.8) {
        setFlicker(true);
        setTimeout(() => setFlicker(false), 3000);
      }
    };

    const totalSteps = 6;
    const duration = 5000;

    const loop = () => {
      setStep((prev) => {
        const next = (prev + 1) % totalSteps;
        if (next === 0) {
          const newData = generateContradictionInsight();
          setInsight(newData);
          triggerFlicker(newData);
        }
        return next;
      });
    };

    triggerFlicker(insight);
    const intervalId = setInterval(loop, duration);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`relative w-full h-full px-6 py-5 bg-black rounded-2xl text-white font-sans overflow-hidden text-[16px] leading-[1.4] border-[1.5px]
      ${flicker ? 'border-orange-400 shadow-[0_0_40px_rgba(255,140,0,0.5)] animate-pulse' : 'border-[#b14dff22] shadow-[0_0_120px_#000000f0]'} transition-all duration-300`}>

      {/* 🟠 Orange Flicker Flash */}
      {flicker && (
        <div className="absolute inset-0 bg-orange-300 opacity-[0.05] pointer-events-none animate-pulse blur-[2px] z-0" />
      )}

      {/* 🔸 Core Line */}
      <div className="absolute top-0 left-1/2 w-[2px] h-full -translate-x-1/2 bg-gradient-to-b from-black via-[#ff660066] to-black blur-[1px] opacity-90 pointer-events-none" />

      {/* 💠 Panel Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-mono text-[18px] tracking-[0.25em] uppercase text-[#b14dff] mb-1">
          Tactical Contradiction Matrix
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="text-white px-1 space-y-1.5"
          >
            {step === 0 && (
              <>
                <div className="text-[15px] text-white/40">Active Contradiction Cause</div>
                <div className="text-[16px] text-[#b14dff] font-mono">{insight.cause}</div>
              </>
            )}
            {step === 1 && (
              <>
                <div className="text-[15px] text-white/40">Resolution Path</div>
                <div className="text-[16px] text-white font-body">{insight.resolution}</div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="text-[15px] text-white/40">Shadow Fork Diagnostics</div>
                {insight.forks.map((f) => (
                  <div key={f.id} className="flex justify-between text-[15px] font-mono">
                    <span className="text-[#b14dff]">#{f.id}</span>
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
                <div className="text-[15px] text-white/40">Reflex Engagement</div>
                {insight.forks.map((f) => (
                  <div key={f.id} className="text-[15px] font-mono">
                    {f.emotionalState} → <span className="text-yellow-300">{f.reflex}</span>
                  </div>
                ))}
              </>
            )}
            {step === 4 && (
              <>
                <div className="text-[15px] text-white/40">Entropy Load / Memory Rewrite</div>
                <div className="text-[16px] text-orange-400 font-mono">
                  Entropy Score: {insight.entropyScore}
                </div>
                <div className="text-[15px] text-white/50 font-mono">
                  Contradiction Risk: {insight.contradictionRisk}
                </div>
                <div className="text-[14px] text-white/60 italic">
                  {insight.entropyScore > 0.6
                    ? '⚠ Dissonance levels breaching threshold.'
                    : '↳ Entropy remains within operating margin.'}
                </div>
              </>
            )}
            {step === 5 && (
              <>
                <div className="text-[15px] text-white/40">Last Update</div>
                <div className="text-right text-[16px] text-white/50 font-mono">{insight.timestamp}</div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}