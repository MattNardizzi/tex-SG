'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const generateThoughts = () => [
  "Tex: Rebalancing portfolio — cash bias reinforced.",
  "Entropy spike detected. Mutation risk: elevated.",
  "Override dormant. Confidence vector stable.",
  "Emotion drift: resolve → resolve. No change.",
  "Codex audit flagged contradiction.",
  "Ghost Alpha scan completed — instability 0.28.",
  "Fork lineage updated: v3.2.1 → v3.3.0",
  "Spawning AEI child — bias: contrarian.",
  "Regret forecast drift = 0.47. No rollback.",
  "Sovereign signal: Cycle 4 stabilized.",
  "Internal debate resolved: logic thread won.",
];

export default function TickerBar() {
  const [messages, setMessages] = useState<string[] | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      const thoughts = generateThoughts();
      const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
      const newMessage = `[${now}] ${thought}`;

      setMessages(prev =>
        prev ? [...prev.slice(-20), newMessage] : [newMessage]
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!messages) return null;

  const textColor = '#a3e635'; // Lime-like green
  const bgColor = 'rgba(0,255,0,0.03)'; // Light green glow

  return (
    <div className="relative h-10 w-full overflow-hidden flex items-center text-xs font-mono tracking-tight whitespace-nowrap px-4 bg-black border-t border-lime-500/20 backdrop-blur-md z-50">

      {/* 🌌 Glow Effect */}
      <div
        className="absolute inset-0 blur-[30px] pointer-events-none animate-pulse"
        style={{ backgroundColor: bgColor }}
      />

      {/* 🧠 Cognition Message Feed */}
      <motion.div
        className="flex gap-10 relative z-10 animate-scrollTicker"
        initial={{ x: 0 }}
        animate={{ x: '-50%' }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
      >
        {[...messages, ...messages].map((msg, index) => (
          <span
            key={index}
            className="opacity-90 hover:opacity-100 transition duration-200"
            style={{ color: textColor }}
          >
            {msg}
          </span>
        ))}
      </motion.div>
    </div>
  );
}