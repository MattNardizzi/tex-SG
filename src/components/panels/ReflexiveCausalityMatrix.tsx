'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const generateInsight = () => {
  const reflexes = [
    'belief_justification',
    'loop_block',
    'identity_compression',
    'memory_echo',
    'lifepulse',
    'self_reflection',
  ];
  const causes = [
    'Override Interference',
    'Contradiction Surge',
    'Symbolic Dissonance Drift',
    'Entropy Thread Breach',
    'Goal Fork Misalignment',
  ];
  return {
    reflex: reflexes[Math.floor(Math.random() * reflexes.length)],
    cause: causes[Math.floor(Math.random() * causes.length)],
    contradiction: parseFloat((Math.random() * 0.4 + 0.6).toFixed(2)),
    entropy: parseFloat((Math.random() * 0.3 + 0.3).toFixed(2)),
    urgency: parseFloat((Math.random() * 0.3 + 0.5).toFixed(2)),
    timestamp: new Date().toLocaleTimeString(),
  };
};

export default function ReflexiveCausalityMatrix() {
  const [insight, setInsight] = useState(generateInsight());
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setInsight(generateInsight());
      setCycleKey(prev => prev + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const tension =
    insight.contradiction > 0.85
      ? 'FRACTURE RISK'
      : insight.urgency > 0.75
      ? 'ELEVATED PRESSURE'
      : 'COHERENT FLOW';

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center rounded-2xl overflow-hidden bg-black border-[2px] transition-all duration-300
        shadow-[0_0_160px_#000000f0] border-[#00f0ff22]`}
    >
      {/* 🌪️ Rotating Neural Ring */}
      <div className="absolute w-[500px] h-[500px] border border-[#00f0ff22] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[1px] opacity-10 animate-spin-slow" />

      {/* 🌀 Vertical Signal Beam */}
      <div className="absolute top-0 left-1/2 w-[2px] h-full -translate-x-1/2 bg-gradient-to-b from-black via-[#00f0ff88] to-black opacity-90 pointer-events-none" />

      {/* 💡 Data Pulse Layer */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center text-white font-mono px-6 w-full">
        <motion.div
          key={cycleKey}
          initial={{ opacity: 0.2, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          {/* 🧠 Title */}
          <div className="uppercase tracking-[0.2em] text-[#00f0ff] text-[clamp(1.2rem,2.2vw,2.4rem)] mb-6">
            Reflex Cognition Core
          </div>

          {/* Reflex */}
          <motion.div
            key={insight.reflex}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-white/60 text-[clamp(0.9rem,1vw,1.1rem)]"
          >
            Active Reflex
            <div className="text-[#00f0ff] font-bold text-[clamp(1rem,1.6vw,2rem)] mt-1">
              {insight.reflex}
            </div>
          </motion.div>

          {/* Trigger */}
          <motion.div
            key={insight.cause}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6 text-white/60 text-[clamp(0.9rem,1vw,1.1rem)]"
          >
            Trigger
            <div className="text-[#b14dff] text-[clamp(1rem,1.4vw,1.6rem)] mt-1">{insight.cause}</div>
          </motion.div>

          {/* Pressure */}
          <motion.div
            key={`p-${cycleKey}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6"
          >
            <div className="text-white/60 text-[clamp(0.9rem,1vw,1.1rem)]">Cognitive Pressure</div>
            <div className="font-mono text-[clamp(1rem,1.3vw,1.4rem)]">
              Contradiction: <span className="text-[#ff5c5c]">{insight.contradiction.toFixed(2)}</span>
            </div>
            <div className="font-mono text-[clamp(1rem,1.3vw,1.4rem)]">
              Entropy: <span className="text-[#00f0ff]">{insight.entropy.toFixed(2)}</span>
            </div>
          </motion.div>

          {/* Urgency */}
          <motion.div
            key={`u-${cycleKey}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6"
          >
            <div className="text-white/60 text-[clamp(0.9rem,1vw,1.1rem)]">Urgency</div>
            <div className="text-[#ffaa00] font-mono text-[clamp(1rem,1.3vw,1.4rem)]">
              {insight.urgency.toFixed(2)}
            </div>
          </motion.div>

          {/* Reflex State */}
          <motion.div
            key={`t-${cycleKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="mt-6 uppercase tracking-widest text-[clamp(0.8rem,1vw,1.2rem)] text-white/50"
          >
            {tension}
          </motion.div>

          {/* Timestamp */}
          <motion.div
            key={`ts-${cycleKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-white/30 text-[clamp(0.7rem,0.9vw,1rem)] mt-2"
          >
            {insight.timestamp}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}