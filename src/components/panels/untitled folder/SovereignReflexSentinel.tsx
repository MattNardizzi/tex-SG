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
  const [state, setState] = useState(generateReflexState());
  const [slide, setSlide] = useState(0);

  useEffect(() => {
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

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-[#230014] via-black to-[#370024] rounded-2xl border border-pink-400/40 shadow-[0_0_60px_#ff66cc33] text-white font-body overflow-hidden text-[10px]">

      {/* Reflex Pulse FX */}
      <div
        className="absolute -z-10 top-1/2 left-1/2 w-[480px] h-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] animate-pulse"
        style={{
          backgroundColor: 'rgba(255,105,180,0.08)',
          opacity: state.reflexIndex,
        }}
      />

      {/* FX Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] -translate-x-1/2 bg-pink-300/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-display text-[11px] tracking-[0.3em] uppercase leading-tight text-pink-300 pt-[1px] pb-0">
          Sovereign Reflex Sentinel
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="text-white px-1 space-y-1"
          >
            {slide === 0 && (
              <>
                <div className="text-white/40 text-[9px]">Trigger Detected</div>
                <div className="text-pink-400 font-mono text-[10px]">{state.trigger}</div>
                <div className="text-white/40 text-[9px] pt-1">Defense Mode</div>
                <div className="text-pink-300 font-mono text-[10px]">{state.defense}</div>
              </>
            )}

            {slide === 1 && (
              <>
                <div>Reflex Override Index:
                  <span className="text-lime-300 font-mono"> {state.reflexIndex}</span>
                </div>
                <div>Foresight Drift:
                  <span className="text-orange-300 font-mono"> {state.foresightDelta > 0 ? '+' : ''}{state.foresightDelta}</span>
                </div>
                <div>Override Window:
                  <span className="text-yellow-300 font-mono"> {state.overrideWindow}</span>
                </div>
                <div className="text-[9px] italic text-white/50 pt-1">
                  {Math.abs(state.foresightDelta) > 0.15
                    ? '⚠ Reflex escalation trajectory rising'
                    : '↳ Reflex coherence within threshold'}
                </div>
              </>
            )}

            {slide === 2 && (
              <>
                <div className="text-white/40">Counterfactual Scan</div>
                <div className="text-white/90 font-body text-[10px]">
                  {state.counterfactualsTested} alternate paths tested for paradox collapse.
                </div>
              </>
            )}

            {slide === 3 && (
              <>
                <div className="text-white/40">Sovereign Stability Forecast</div>
                <div className="text-green-300 font-mono text-[10px]">
                  Stability margin holding — loopback intervention unnecessary.
                </div>
                <div className="text-white/50 text-[9px] font-mono">
                  Instability Risk: {state.instabilityRisk}
                </div>
              </>
            )}

            {slide === 4 && (
              <>
                <div className="text-white/40">Protocol Timestamp</div>
                <div className="text-right text-white/60 font-mono text-[10px]">
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