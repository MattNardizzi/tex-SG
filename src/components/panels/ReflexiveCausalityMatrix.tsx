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
    'Symbolic Drift Detected',
    'Entropy Spike',
    'Belief Fracture Initiated',
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
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setInsight(generateInsight());
      setPulseKey(p => p + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const status =
    insight.contradiction > 0.85
      ? 'FRACTURE RISK'
      : insight.urgency > 0.7
      ? 'ELEVATED TENSION'
      : 'COHERENT FLOW';

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center rounded-2xl overflow-hidden bg-black border-2 transition-all duration-300 border-[#00f0ff22]`}
    >
      {/* 🌪️ Rotating Neural Loop */}
      <div className="absolute w-[500px] h-[500px] top-1/2 left-1/2 border border-[#00f0ff22] rounded-full -translate-x-1/2 -translate-y-1/2 blur-[1px] opacity-10 animate-spin-slow" />

      {/* 🧠 Vertical Signal Beam */}
      <div className="absolute top-0 left-1/2 w-[2px] h-full -translate-x-1/2 bg-gradient-to-b from-black via-[#00f0ff66] to-black blur-[1px] opacity-80 pointer-events-none" />

      {/* 🔁 Live Reflex Display */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-white font-mono text-center w-full">
        <motion.div
          key={pulseKey}
          initial={{ opacity: 0.3, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          {/* 🧠 Title */}
          <div className="uppercase tracking-[0.2em] text-[#00f0ff] text-[clamp(1.4rem,2vw,2.1rem)] mb-6">
            Reflex Cognition Core
          </div>

          {/* ⚡ Active Reflex */}
          <motion.div
            key={insight.reflex}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 120 }}
            className="mb-6"
          >
            <div className="text-white/60 text-[clamp(0.85rem,1vw,1.1rem)]">Active Reflex</div>
            <div className="text-[#00f0ff] text-[clamp(1.1rem,1.6vw,1.9rem)] font-bold tracking-wider mt-1">
              {insight.reflex}
            </div>
          </motion.div>

          {/* 🎯 Trigger */}
          <motion.div
            key={insight.cause}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-6"
          >
            <div className="text-white/60 text-[clamp(0.85rem,1vw,1rem)]">Trigger</div>
            <div className="text-[#b14dff] text-[clamp(1rem,1.4vw,1.5rem)] mt-1">
              {insight.cause}
            </div>
          </motion.div>

          {/* 🧪 Cognitive Pressure */}
          <motion.div
            key={`cp-${pulseKey}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            className="mb-6"
          >
            <div className="text-white/60 text-[clamp(0.85rem,1vw,1rem)]">Cognitive Pressure</div>
            <div className="text-[clamp(1rem,1.3vw,1.4rem)] font-mono">
              Contradiction: <span className="text-[#ff5c5c]">{insight.contradiction.toFixed(2)}</span>
            </div>
            <div className="text-[clamp(1rem,1.3vw,1.4rem)] font-mono">
              Entropy: <span className="text-[#00f0ff]">{insight.entropy.toFixed(2)}</span>
            </div>
          </motion.div>

          {/* ⚠ Urgency */}
          <motion.div
            key={`u-${pulseKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="mb-6"
          >
            <div className="text-white/60 text-[clamp(0.85rem,1vw,1rem)]">Urgency</div>
            <div className="text-[#ffaa00] text-[clamp(1rem,1.3vw,1.4rem)] font-mono">
              {insight.urgency.toFixed(2)}
            </div>
          </motion.div>

          {/* 🔒 Reflex State */}
          <motion.div
            key={`t-${pulseKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.4 }}
            className="uppercase text-white/50 tracking-widest text-[clamp(0.75rem,1vw,1rem)] mb-2"
          >
            {status}
          </motion.div>

          {/* ⏱️ Timestamp */}
          <motion.div
            key={`ts-${pulseKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.4 }}
            className="text-white/30 text-[clamp(0.7rem,0.9vw,1rem)]"
          >
            {insight.timestamp}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}