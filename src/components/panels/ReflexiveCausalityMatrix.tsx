'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ReflexCognitionPanel() {
  const [trigger, setTrigger] = useState('');
  const [contradiction, setContradiction] = useState(0.0);
  const [entropy, setEntropy] = useState(0.0);
  const [urgency, setUrgency] = useState(0.0);
  const [loopBlocked, setLoopBlocked] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const sequence = [
      () => {},
      () => setTrigger('Symbolic Belief Conflict'),
      () => {
        setContradiction(0.64);
        setEntropy(0.54);
        setUrgency(0.69);
      },
      () => {},
      () => {},
      () => {},
      () => {},
      () => {},
      () => {},
      () => {},
      () => setLoopBlocked(true),
      () => {},
    ];

    const interval = setInterval(() => {
      if (frame < sequence.length) {
        sequence[frame]();
        setFrame(prev => prev + 1);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [frame]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, filter: 'blur(20px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{
        duration: 1.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`relative w-full h-full px-6 py-6 rounded-panel bg-black text-white font-mono overflow-hidden
      border-2 transition-all duration-500
      ${loopBlocked ? 'border-entropyBlue shadow-cognitive animate-pulse' : 'border-white/10 shadow-panel'}`}
    >

      {/* 🌌 Reflex Cortex Ignition Blast */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0, scale: 1.8 }}
        animate={{ opacity: [1, 0.6, 0.3], scale: [1.8, 1.2, 1] }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sovereignCyan/30 blur-[140px]" />
      </motion.div>

      {/* 🔄 Continuous Breathing Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sovereignCyan/10 blur-[120px]" />
      </motion.div>

      {/* ⚠️ Loop Block Warning — Immediate snap-in */}
      {loopBlocked && (
        <motion.div
          className="absolute top-5 right-6 bg-entropyBlue/10 text-entropyBlue px-4 py-1 text-xs rounded-full border border-entropyBlue/40 backdrop-blur-sm z-20"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          Reflex Loop Blocked ⚠️
        </motion.div>
      )}

      {/* 🧠 Reflex Cognition Core Content */}
      <div className="h-full flex flex-col items-center justify-center space-y-8 relative z-10 w-full max-w-[640px] mx-auto">
        <div className="text-center tracking-[0.18em] text-reflex-lg uppercase text-sovereignCyan mb-2">
          Reflex Cognition Core
        </div>

        <div className="space-y-6 text-[1.1rem] text-white/80 w-full">
          <div className="flex justify-between w-full border border-white/10 rounded-xl px-6 py-4 bg-white/5 text-sovereignCyan">
            <span>Active Reflex</span>
            <span>lifepulse()</span>
          </div>

          {trigger && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between w-full border border-white/10 rounded-xl px-6 py-4 bg-white/5 text-violetMeta"
            >
              <span>Trigger</span>
              <span>{trigger}</span>
            </motion.div>
          )}

          {(contradiction > 0 || entropy > 0) && (
            <div className="flex flex-col w-full space-y-4">
              <div className="flex justify-between px-6 py-4 border border-white/10 rounded-xl bg-white/5 text-contradictionRed/90">
                <span>Contradiction</span>
                <span>{contradiction.toFixed(2)}</span>
              </div>
              <div className="flex justify-between px-6 py-4 border border-white/10 rounded-xl bg-white/5 text-entropyBlue">
                <span>Entropy</span>
                <span>{entropy.toFixed(2)}</span>
              </div>
              <div className="flex justify-between px-6 py-4 border border-white/10 rounded-xl bg-white/5 text-reflexGold">
                <span>Urgency</span>
                <span>{urgency.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 🧬 Vertical Sovereign Signal Spine */}
      <div className="absolute top-0 left-1/2 w-[2px] h-full bg-sovereignCyan blur-sm animate-pulse z-0" />
    </motion.div>
  );
}