'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const generateQuotes = () => [
  'AAPL: $203.10 ▼ -0.08%',
  'TSLA: $334.49 ▼ -2.84%',
  'GOOG: $169.19 ▲ +0.89%',
  'META: $685.80 ▲ +2.84%',
  'AMD: $118.67 ▲ +1.16%',
  'BTC: $69,120.14 ▲ +3.14%',
  'ETH: $3,214.88 ▲ +3.02%',
  'VIX: 14.32 ▼ -1.12%',
  'NVDA: $961.31 ▲ +5.03%',
  'NFLX: $548.02 ▲ +1.77%',
];

export default function $1({ theme }: { theme: 'blue' | 'purple' })MarketTicker({ theme }: { theme: 'blue' | 'purple' }) {
  const [quotes, setQuotes] = useState<string[] | null>(null);

  useEffect(() => {
    setQuotes(generateQuotes());
  }, []);

  if (!quotes) return null;

  const glowColor = theme === 'blue' ? 'rgba(0,240,255,0.05)' : 'rgba(177,77,255,0.05)';

  return (
    <div
      className="relative h-16 w-full overflow-hidden flex items-center text-[20px] font-mono tracking-wide leading-none whitespace-nowrap px-6 bg-black border-b border-white/10 backdrop-blur-md rounded-none"
    >
      {/* 🌌 Theme-Responsive Glow */}
      <div
        className="absolute inset-0 blur-[40px] pointer-events-none animate-pulse"
        style={{ backgroundColor: glowColor }}
      />

      {/* 🔁 Scrolling Ticker Content */}
      <motion.div
        className="flex gap-10 relative z-10 animate-scrollTicker"
        initial={{ x: 0 }}
        animate={{ x: '-50%' }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 28 }}
      >
        {[...quotes, ...quotes].map((quote, i) => (
          <span
            key={i}
            style={{
              color: i % 2 === 0 ? '#b14dff' : '#00ff99'
            }}
            className="opacity-90 hover:opacity-100 transition duration-200"
          >
            {quote}
          </span>
        ))}
      </motion.div>
    </div>
  );
}