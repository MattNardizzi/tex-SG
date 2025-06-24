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
  const [glow, setGlow] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    const pulse = () => {
      const next = generateReflexInsight();
      setInsight(next);
      setPulseKey(p => p + 1);

      if (next.contradiction > 0.85 || next.urgency > 0.8) {
        setGlow(true);
        setTimeout(() => setGlow(false), 2500);
      }
    };

    const interval = setInterval(pulse, 6000);
    return () => clearInterval(interval);
  }, []);

  const tensionLevel =
    insight.contradiction > 0.85
      ? 'Fracture Risk'
      : insight.urgency > 0.7
      ? 'Elevated Tension'
      : 'Stable Flow';

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-black border-[2px] transition-all duration-300
      ${glow ? 'border-[#00f0ff] shadow-[0_0_60px_rgba(0,240,255,0.6)] animate-pulse' : 'border-[#00f0ff22] shadow-[0_0_140px_#000000f0]'}`}
    >
      {/* 💠 Center Pulse Ring */}
      {glow && (
        <div className="absolute w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00f0ff33] blur-[90px] opacity-60 animate-pulse z-0" />
      )}

      {/* 🧠 Reflex Beam */}
      <div className="absolute top-0 left-1/2 w-[2px] h-full -translate-x-1/2 bg-gradient-to-b from-black via-[#00f0ff99] to-black blur-[1px] opacity-90 z-0 pointer-events-none" />

      {/* ⚡️ Core Reflex Display */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center text-[clamp(1rem,2.4vw,2rem)] font-mono text-white px-6">
        <motion.div
          key={pulseKey}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          {/* 🧠 Title */}
          <div className="uppercase tracking-[0.2em] text-[#00f0ff] text-[clamp(1.2rem,1.8vw,1.6rem)] mb-4">
            Reflex Cognition Core
          </div>

          {/* Reflex */}
          <div className="text-white/60 text-[clamp(0.8rem,1vw,1.2rem)]">Active Reflex</div>
          <div className="text-[#00f0ff] font-bold text-[clamp(1rem,2vw,2.3rem)] mb-4">
            {insight.reflex}
          </div>

          {/* Cause */}
          <div className="text-white/60 text-[clamp(0.8rem,1vw,1.2rem)]">Trigger</div>
          <div className="text-[#b14dff] text-[clamp(0.9rem,1.6vw,1.6rem)] mb-6">
            {insight.cause}
          </div>

          {/* Pressure */}
          <div className="text-white/60 text-[clamp(0.8rem,1vw,1.2rem)]">Cognitive Pressure</div>
          <div className="font-mono text-[clamp(0.9rem,1.2vw,1.4rem)]">
            Contradiction: <span className="text-[#ff5c5c]">{insight.contradiction.toFixed(2)}</span>
          </div>
          <div className="font-mono text-[clamp(0.9rem,1.2vw,1.4rem)] mb-6">
            Entropy: <span className="text-[#00f0ff]">{insight.entropy.toFixed(2)}</span>
          </div>

          {/* Urgency */}
          <div className="text-white/60 text-[clamp(0.8rem,1vw,1.2rem)]">Urgency</div>
          <div className="text-[#ffaa00] font-mono text-[clamp(0.9rem,1.3vw,1.4rem)] mb-6">
            {insight.urgency.toFixed(2)}
          </div>

          {/* Status */}
          <div className="uppercase text-[clamp(0.8rem,1vw,1.2rem)] tracking-widest text-white/50 mb-2">
            {tensionLevel}
          </div>

          {/* Timestamp */}
          <div className="text-white/30 text-[clamp(0.7rem,0.8vw,0.9rem)]">
            {insight.timestamp}
          </div>
        </motion.div>
      </div>
    </div>
  );
}