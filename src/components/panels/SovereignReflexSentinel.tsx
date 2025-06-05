'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateReflexState = () => {
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const reflexIndex = parseFloat((Math.random() * 0.4 + 0.5).toFixed(2));
  const foresightDelta = parseFloat((Math.random() * 0.3 - 0.1).toFixed(3));

  return {
    trigger: pick([
      'coherence collapse',
      'high-regret chain',
      'low foresight breach',
      'sovereign contradiction',
      'recursion trap',
    ]),
    defense: pick([
      'Temporal Fork Reinforcement',
      'Codex Reinjection',
      'Emotion Lock Override',
      'Shadow Fork Detonation',
      'Fusion Coherence Sync',
    ]),
    reflexIndex,
    foresightDelta,
    overrideWindow: `${Math.floor(Math.random() * 6 + 3)}s`,
    counterfactualsTested: Math.floor(Math.random() * 20 + 15),
    timestamp: new Date().toLocaleTimeString(),
    instabilityRisk: (reflexIndex * Math.abs(foresightDelta)).toFixed(3),
  };
};

export default function SovereignReflexSentinel() {
  const [state, setState] = useState<ReturnType<typeof generateReflexState> | null>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    setState(generateReflexState());

    const totalSlides = 5;
    const duration = 5000;

    const rotate = () => {
      setSlide((prev) => {
        const next = (prev + 1) % totalSlides;
        if (next === 0) setState(generateReflexState());
        return next;
      });
    };

    const intervalId = setInterval(rotate, duration);
    return () => clearInterval(intervalId);
  }, []);

  if (!state) return null;

  return (
    <div className="relative w-full h-full px-6 py-5 bg-gradient-to-br from-[#32052d] via-[#15001a] to-[#220018] rounded-2xl border border-pink-400/40 shadow-[0_0_100px_#ff66cc55] text-white font-body overflow-hidden text-[16px] leading-[1.4]">

      {/* 🌌 Glow Aura */}
      <div
        className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px] animate-pulse pointer-events-none"
        style={{
          backgroundColor: 'rgba(255,105,180,0.12)',
          opacity: state.reflexIndex,
        }}
      />

      {/* ⚡ Grid FX */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] -translate-x-1/2 bg-pink-300/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      {/* 💠 Panel Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-display text-[18px] tracking-[0.25em] uppercase leading-tight text-pink-300 mb-1">
          Sovereign Reflex Sentinel
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
            {slide === 0 && (
              <>
                <div className="text-[15px] text-white/40">Trigger Detected</div>
                <div className="text-[16px] font-mono text-pink-300">{state.trigger}</div>
                <div className="text-[15px] text-white/40 pt-1">Defense Mode</div>
                <div className="text-[16px] font-mono text-pink-200">{state.defense}</div>
              </>
            )}
            {slide === 1 && (
              <>
                <div className="text-[15px] text-white/40">Override Diagnostics</div>
                <div className="text-[16px] font-mono">Reflex Index: <span className="text-lime-300">{state.reflexIndex}</span></div>
                <div className="text-[16px] font-mono">Foresight Drift: <span className="text-orange-300">{state.foresightDelta > 0 ? '+' : ''}{state.foresightDelta}</span></div>
                <div className="text-[16px] font-mono">Override Window: <span className="text-yellow-300">{state.overrideWindow}</span></div>
                <div className="text-[14px] italic text-white/50 pt-1">
                  {Math.abs(state.foresightDelta) > 0.15
                    ? '⚠ Reflex escalation trajectory rising'
                    : '↳ Reflex coherence within threshold'}
                </div>
              </>
            )}
            {slide === 2 && (
              <>
                <div className="text-[15px] text-white/40">Counterfactual Scan</div>
                <div className="text-[16px] text-white/90 font-body">
                  {state.counterfactualsTested} alternate paths tested for paradox collapse.
                </div>
              </>
            )}
            {slide === 3 && (
              <>
                <div className="text-[15px] text-white/40">Stability Forecast</div>
                <div className="text-[16px] font-mono text-green-300">
                  Stability margin holding — loopback intervention unnecessary.
                </div>
                <div className="text-[14px] font-mono text-white/50">
                  Instability Risk: {state.instabilityRisk}
                </div>
              </>
            )}
            {slide === 4 && (
              <>
                <div className="text-[15px] text-white/40">Protocol Timestamp</div>
                <div className="text-[16px] font-mono text-white/60 text-right">
                  {state.timestamp}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}