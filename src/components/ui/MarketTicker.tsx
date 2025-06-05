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

export default function MarketTicker() {
  const [quotes, setQuotes] = useState<string[] | null>(null);

  useEffect(() => {
    setQuotes(generateQuotes());
  }, []);

  if (!quotes) return null;

  const glowColor = 'rgba(0,240,255,0.05)'; // cyan background glow
  const primaryColor = '#b14dff';           // purple
  const secondaryColor = '#00f0ff';         // blue-green (panel title color)

  return (
    <div className="relative h-16 w-full overflow-hidden flex items-center text-[20px] font-normal tracking-wide leading-none whitespace-nowrap px-6 bg-black border-b border-white/10 backdrop-blur-md !rounded-none">
      
      {/* 🌌 Cyan Glow Background */}
      <div
        className="absolute inset-0 blur-[40px] pointer-events-none animate-pulse"
        style={{ backgroundColor: glowColor }}
      />

      {/* 🔁 Scrolling Ticker Text */}
      <motion.div
        className="flex gap-10 relative z-10 animate-scrollTicker"
        initial={{ x: 0 }}
        animate={{ x: '-50%' }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 28 }}
      >
        {[...quotes, ...quotes].map((quote, index) => (
          <span
            key={index}
            className="opacity-90 hover:opacity-100 transition duration-200"
            style={{ color: index % 2 === 0 ? primaryColor : secondaryColor }}
          >
            {quote}
          </span>
        ))}
      </motion.div>
    </div>
  );
}