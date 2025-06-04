'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateReflexState = () => {
  const triggers = [
    'coherence collapse',
    'high-regret chain',
    'low foresight breach',
    'sovereign contradiction',
    'recursion trap',
  ];

  const defenses = [
    'Temporal Fork Reinforcement',
    'Codex Reinjection',
    'Emotion Lock Override',
    'Shadow Fork Detonation',
    'Fusion Coherence Sync',
  ];

  const stats = {
    reflexIndex: (Math.random() * 0.4 + 0.5).toFixed(2),
    foresightDelta: (Math.random() * 0.3 - 0.1).toFixed(3),
    overrideWindow: `${Math.floor(Math.random() * 6 + 3)}s`,
    counterfactualsTested: Math.floor(Math.random() * 20 + 15),
  };

  const protocol = {
    trigger: triggers[Math.floor(Math.random() * triggers.length)],
    defense: defenses[Math.floor(Math.random() * defenses.length)],
    timestamp: new Date().toLocaleTimeString(),
  };

  return { ...stats, ...protocol };
};

export default function SovereignReflexSentinel() {
  const [state, setState] = useState(generateReflexState());
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const durations = Array(5).fill(6000);
    let current = 0;
    let timeout: NodeJS.Timeout;

    const rotate = () => {
      current = (current + 1) % 5;
      setSlide(current);
      if (current === 0) setState(generateReflexState());
      timeout = setTimeout(rotate, durations[current]);
    };

    timeout = setTimeout(rotate, durations[0]);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-[#031519] via-black to-[#06262a] rounded-2xl border border-cyan-500/30 shadow-[0_0_60px_#00ffff33] text-white font-body overflow-hidden text-[10px]">
      {/* Background FX Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] -translate-x-1/2 bg-cyan-300/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-display text-[11px] tracking-[0.3em] uppercase leading-tight text-cyan-300 pt-[1px] pb-0">
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
                <div className="text-cyan-300 font-mono text-[10px]">{state.defense}</div>
              </>
            )}

            {slide === 1 && (
              <>
                <div>
                  Reflex Override Index:
                  <span className="text-lime-300 font-mono"> {state.reflexIndex}</span>
                </div>
                <div>
                  Foresight Drift:
                  <span className="text-orange-300 font-mono"> {state.foresightDelta}</span>
                </div>
                <div>
                  Override Window:
                  <span className="text-yellow-300 font-mono"> {state.overrideWindow}</span>
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
              </>
            )}

            {slide === 4 && (
              <>
                <div className="text-white/40">Protocol Timestamp</div>
                <div className="text-white/60 font-mono text-[10px] text-right">
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