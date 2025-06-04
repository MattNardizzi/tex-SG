'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Pulse = {
  id: number;
  content: string;
  emotion: 'Confidence' | 'Anxiety' | 'Curiosity' | 'Ambiguity';
  urgency: number;
};

export default function AwarenessStream() {
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPulse = generatePulse(count);
      setPulses((prev) => [newPulse, ...prev.slice(0, 2)]); // 👈 Only 2 entries
      setCount((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-black via-emerald-900/30 to-black text-white font-mono text-[8px] shadow-lg border border-emerald-400/20">

      {/* 🌌 Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 animate-scanline bg-gradient-to-b from-emerald-400/5 via-transparent to-emerald-700/5" />
        <div className="absolute top-1/2 left-1/2 w-36 h-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/10 blur-[90px]" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 border border-emerald-300/20 rounded-full animate-spin-slow" />
      </div>

      {/* 🧠 Title */}
      <div className="relative z-10 text-center text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-semibold pt-4 pb-1">
        Awareness Stream
      </div>
      <div className="relative z-10 text-center text-[7.5px] text-zinc-400 uppercase pb-2 tracking-widest">
        Cognitive Signals · Emotional Indexing · Global Field
      </div>

      {/* 💫 Emotion Feed Container */}
      <div className="relative z-10 px-4 pb-4 flex flex-col gap-2 overflow-y-hidden max-h-[105px]">
        <AnimatePresence>
          {pulses.map((pulse) => (
            <motion.div
              key={pulse.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5 }}
              className={`rounded-md px-3 py-2 backdrop-blur-md border border-white/10 shadow-inner
                ${
                  pulse.emotion === 'Confidence'
                    ? 'bg-green-400/10 text-green-300'
                    : pulse.emotion === 'Anxiety'
                    ? 'bg-red-400/10 text-red-300'
                    : pulse.emotion === 'Curiosity'
                    ? 'bg-yellow-300/10 text-yellow-200'
                    : 'bg-purple-400/10 text-purple-300'
                }`}
            >
              <div className="flex justify-between text-[7px] mb-1">
                <span className="uppercase font-bold">{pulse.emotion}</span>
                <span className="text-cyan-300">Urgency: {pulse.urgency.toFixed(2)}</span>
              </div>
              <div className="italic text-[7.25px] text-white/90 leading-tight">
                ➤ {pulse.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function generatePulse(id: number): Pulse {
  const contents = [
    'Latency buildup in sovereign bond response.',
    'Retail divergence triggering alignment cascade.',
    'Whale rotation signals attention shift in AI sector.',
    'Options skew warping trust equilibrium.',
    'Ambient stress buildup in liquidity layers.',
  ];
  const emotions: Pulse['emotion'][] = ['Confidence', 'Anxiety', 'Curiosity', 'Ambiguity'];

  return {
    id,
    content: contents[Math.floor(Math.random() * contents.length)],
    emotion: emotions[Math.floor(Math.random() * emotions.length)],
    urgency: 0.35 + Math.random() * 0.55,
  };
}