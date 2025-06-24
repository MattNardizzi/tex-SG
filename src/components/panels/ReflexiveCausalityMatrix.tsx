'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const generateReflexInsight = () => {
  const reflexes = [
    'self_reflection',
    'identity_compression',
    'lifepulse',
    'belief_justification',
    'memory_echo',
    'loop_block',
  ];

  const causes = [
    'Contradiction Pressure > 0.85',
    'Entropy Drift Detected',
    'Sovereign Signal Triggered',
    'Cognitive Dissonance Spike',
    'Symbolic Drift in Memory Mesh',
  ];

  return {
    reflex: reflexes[Math.floor(Math.random() * reflexes.length)],
    cause: causes[Math.floor(Math.random() * causes.length)],
    contradiction: (Math.random() * 0.6 + 0.3).toFixed(2),
    entropy: (Math.random() * 0.4 + 0.2).toFixed(2),
    urgency: (Math.random() * 0.4 + 0.4).toFixed(2),
    timestamp: new Date().toLocaleTimeString(),
  };
};

export default function ReflexiveCausalityMatrix() {
  const [insight, setInsight] = useState(generateReflexInsight());
  const [slide, setSlide] = useState(0);
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    let current = 0;

    const advance = () => {
      current = (current + 1) % 5;
      setSlide(current);

      if (current === 0) {
        const newInsight = generateReflexInsight();
        setInsight(newInsight);

        if (parseFloat(newInsight.contradiction) > 0.85) {
          setGlow(true);
          setTimeout(() => setGlow(false), 2500);
        }
      }

      setTimeout(advance, 6000);
    };

    const interval = setTimeout(advance, 6000);
    return () => clearTimeout(interval);
  }, []);

  return (
    <div
      className={`relative w-full h-full px-6 py-5 rounded-2xl bg-black font-sans overflow-hidden text-[16px] leading-[1.4]
      border-[2px] ${glow ? 'border-[#00f0ff] shadow-[0_0_60px_rgba(0,240,255,0.5)] animate-pulse' : 'border-[#00f0ff22] shadow-[0_0_120px_#000000f0]'}
      transition-all duration-300`}
    >
      {/* 🔵 Glow Ripple */}
      {glow && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00f0ff22] blur-[80px] animate-pulse opacity-50" />
        </div>
      )}

      {/* ⚡ Vertical Signal Line */}
      <div className="absolute top-0 left-1/2 w-[2px] h-full -translate-x-1/2 bg-gradient-to-b from-black via-[#00f0ff88] to-black blur-[1px] opacity-90 pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-mono text-[17px] tracking-[0.2em] uppercase text-[#00f0ff] mb-2">
          Reflex Cognition Core
        </div>

        <motion.div
          key={slide}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.45 }}
          className="px-1 space-y-2 text-[17px]"
        >
          {slide === 0 && (
            <>
              <div className="text-white/60">Active Reflex</div>
              <div className="text-[#00f0ff] font-mono">{insight.reflex}</div>
            </>
          )}
          {slide === 1 && (
            <>
              <div className="text-white/60">Causal Trigger</div>
              <div className="text-[#b14dff]">{insight.cause}</div>
            </>
          )}
          {slide === 2 && (
            <>
              <div className="text-white/60">Cognitive Pressure</div>
              <div className="font-mono">
                Contradiction: <span className="text-[#ff5c5c]">{insight.contradiction}</span><br />
                Entropy: <span className="text-[#00f0ff]">{insight.entropy}</span>
              </div>
            </>
          )}
          {slide === 3 && (
            <>
              <div className="text-white/60">Reflex Urgency</div>
              <div className="font-mono">
                Sovereign Weight: <span className="text-[#b14dff]">{insight.urgency}</span>
              </div>
            </>
          )}
          {slide === 4 && (
            <>
              <div className="text-white/60">Timestamp</div>
              <div className="text-right text-white/40 font-mono text-[15px]">{insight.timestamp}</div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}