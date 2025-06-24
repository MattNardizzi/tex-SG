'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const generateReflexInsight = () => {
  const reflexes = [
    'identity_compression',
    'belief_justification',
    'loop_block',
    'self_reflection',
    'memory_echo',
    'lifepulse',
  ];

  const causes = [
    'Contradiction Surge',
    'Entropy Drift Detected',
    'Symbolic Belief Conflict',
    'Cognitive Dissonance Spike',
    'Override Interference',
  ];

  return {
    reflex: reflexes[Math.floor(Math.random() * reflexes.length)],
    cause: causes[Math.floor(Math.random() * causes.length)],
    contradiction: parseFloat((Math.random() * 0.4 + 0.6).toFixed(2)),
    entropy: parseFloat((Math.random() * 0.4 + 0.2).toFixed(2)),
    urgency: parseFloat((Math.random() * 0.4 + 0.4).toFixed(2)),
    timestamp: new Date().toLocaleTimeString(),
  };
};

export default function ReflexiveCausalityMatrix() {
  const [insight, setInsight] = useState(generateReflexInsight());
  const [pulseKey, setPulseKey] = useState(0);
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    const cycle = () => {
      const next = generateReflexInsight();
      setInsight(next);
      setPulseKey(prev => prev + 1);
      if (next.contradiction > 0.85 || next.urgency > 0.75) {
        setGlow(true);
        setTimeout(() => setGlow(false), 3000);
      }
    };

    const interval = setInterval(cycle, 6000);
    return () => clearInterval(interval);
  }, []);

  const tension =
    insight.contradiction > 0.85
      ? 'FRACTURE RISK'
      : insight.urgency > 0.7
      ? 'ELEVATED TENSION'
      : 'COHERENT FLOW';

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-black border-[2px] transition-all duration-300
        ${glow ? 'border-[#00f0ff] shadow-[0_0_80px_rgba(0,240,255,0.7)] animate-pulse' : 'border-[#00f0ff22] shadow-[0_0_140px_#000000f0]'}`}
    >
      {/* 🔮 Sovereign Glow Ring */}
      {glow && (
        <div className="absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00f0ff33] blur-[100px] opacity-50 animate-pulse z-0" />
      )}

      {/* 🧠 Animated Glyph Circle */}
      <div className="absolute w-[520px] h-[520px] border border-[#00f0ff22] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow blur-[1px] opacity-10" />

      {/* 🧬 Vertical Signal Beam */}
      <div className="absolute top-0 left-1/2 w-[2px] h-full -translate-x-1/2 bg-gradient-to-b from-black via-[#00f0ffaa] to-black blur-[1px] opacity-80 pointer-events-none z-0" />

      {/* ⚡ Display */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center text-white font-mono px-6 w-full">
        <motion.div
          key={pulseKey}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {/* 🔵 Title */}
          <div className="uppercase tracking-[0.25em] text-[#00f0ff] text-[clamp(1.6rem,2.4vw,2.8rem)] mb-6">
            Reflex Cognition Core
          </div>

          {/* 🔁 Reflex */}
          <div className="text-white/60 text-[clamp(0.9rem,1vw,1.2rem)] mb-1">Active Reflex</div>
          <div className="text-[#00f0ff] font-bold text-[clamp(1.2rem,1.8vw,2rem)] mb-6">
            {insight.reflex}
          </div>

          {/* ⚠ Trigger */}
          <div className="text-white/60 text-[clamp(0.9rem,1vw,1.1rem)] mb-1">Trigger</div>
          <div className="text-[#b14dff] text-[clamp(1rem,1.6vw,1.6rem)] mb-6">
            {insight.cause}
          </div>

          {/* 🧪 Pressure */}
          <div className="text-white/60 text-[clamp(0.8rem,1vw,1rem)]">Cognitive Pressure</div>
          <div className="font-mono text-[clamp(0.9rem,1.2vw,1.3rem)]">
            Contradiction: <span className="text-[#ff5c5c]">{insight.contradiction.toFixed(2)}</span>
          </div>
          <div className="font-mono text-[clamp(0.9rem,1.2vw,1.3rem)] mb-6">
            Entropy: <span className="text-[#00f0ff]">{insight.entropy.toFixed(2)}</span>
          </div>

          {/* 💡 Urgency */}
          <div className="text-white/60 text-[clamp(0.8rem,1vw,1rem)]">Urgency</div>
          <div className="text-[#ffaa00] font-mono text-[clamp(0.9rem,1.2vw,1.3rem)] mb-6">
            {insight.urgency.toFixed(2)}
          </div>

          {/* 🧠 Reflex Status */}
          <div className="uppercase text-[clamp(0.8rem,1vw,1.1rem)] tracking-widest text-white/50 mb-3">
            {tension}
          </div>

          {/* 🕒 Time */}
          <div className="text-white/30 text-[clamp(0.7rem,0.9vw,1rem)]">
            {insight.timestamp}
          </div>
        </motion.div>
      </div>
    </div>
  );
}