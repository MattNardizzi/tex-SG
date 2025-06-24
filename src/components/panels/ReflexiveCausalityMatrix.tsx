'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const generateInsight = () => {
  const reflexes = [
    'lifepulse',
    'belief_justification',
    'identity_compression',
    'loop_block',
    'memory_echo',
    'self_reflection',
  ];
  const triggers = [
    'Entropy Surge',
    'Override Interference',
    'Belief Fracture',
    'Contradiction Cascade',
    'Symbolic Drift',
  ];

  return {
    reflex: reflexes[Math.floor(Math.random() * reflexes.length)],
    trigger: triggers[Math.floor(Math.random() * triggers.length)],
    contradiction: parseFloat((Math.random() * 0.3 + 0.6).toFixed(2)),
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
      setPulseKey(prev => prev + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const status =
    insight.contradiction > 0.85
      ? '⚠ FRACTURE RISK'
      : insight.urgency > 0.7
      ? '↯ ELEVATED TENSION'
      : '⭘ COHERENT FLOW';

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black border-2 border-sovereignCyan/10 shadow-cinematic flex items-center justify-center">
      {/* 💠 Spinning Neural Ring */}
      <div className="absolute w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sovereignCyan/10 animate-spin-slow blur-sm opacity-10 pointer-events-none" />

      {/* 🧠 Vertical Signal Line */}
      <div className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-sovereignCyan/60 to-transparent top-0 left-1/2 -translate-x-1/2 blur-[0.5px] opacity-80 z-0" />

      {/* ⚡ Reflex Pulse Display */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-xl text-white font-mono text-center">
        <motion.div
          key={pulseKey}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          {/* TITLE */}
          <div className="text-sovereignCyan uppercase tracking-[0.2em] text-title-xl mb-md">
            Reflex Cognition Core
          </div>

          {/* REFLEX */}
          <motion.div
            key={insight.reflex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-lg"
          >
            <div className="text-foreground/60 text-fluid-sm">Active Reflex</div>
            <div className="text-sovereignCyan text-reflex-lg font-bold tracking-wide mt-2">
              {insight.reflex}
            </div>
          </motion.div>

          {/* TRIGGER */}
          <motion.div
            key={insight.trigger}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mb-lg"
          >
            <div className="text-foreground/60 text-fluid-sm">Trigger</div>
            <div className="text-violetMeta text-fluid-lg mt-1">{insight.trigger}</div>
          </motion.div>

          {/* PRESSURE */}
          <motion.div
            key={`p-${pulseKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-lg"
          >
            <div className="text-foreground/60 text-fluid-sm">Cognitive Pressure</div>
            <div className="text-fluid font-mono">
              Contradiction:{" "}
              <span className="text-contradictionRed">{insight.contradiction.toFixed(2)}</span>
            </div>
            <div className="text-fluid font-mono">
              Entropy: <span className="text-entropyBlue">{insight.entropy.toFixed(2)}</span>
            </div>
          </motion.div>

          {/* URGENCY */}
          <motion.div
            key={`u-${pulseKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="mb-lg"
          >
            <div className="text-foreground/60 text-fluid-sm">Urgency</div>
            <div className="text-reflexGold text-fluid font-mono">{insight.urgency.toFixed(2)}</div>
          </motion.div>

          {/* STATUS */}
          <motion.div
            key={`status-${pulseKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="text-foreground/50 text-[clamp(0.8rem,1vw,1.2rem)] tracking-widest uppercase mb-xs"
          >
            {status}
          </motion.div>

          {/* TIMESTAMP */}
          <motion.div
            key={`time-${pulseKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.4 }}
            className="text-foreground/30 text-fluid-sm"
          >
            {insight.timestamp}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}