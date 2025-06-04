'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const mockData = [
  'NASDAQ: 13,417.25 ▲ +1.14%',
  'SP500: 4,309.51 ▲ +0.72%',
  'BTC: $69,120.14 ▲ +2.91%',
  'ETH: $3,214.88 ▲ +3.02%',
  'VIX: 14.32 ▼ -1.12%',
  'TSLA: 227.85 ▲ +4.51%',
  'AAPL: 189.44 ▲ +0.63%',
  'NVDA: 961.31 ▲ +5.03%',
  'META: 312.51 ▲ +1.12%',
  'AMD: 152.33 ▲ +0.88%',
  'GOOG: 141.97 ▲ +0.47%',
];

export default function MarketTicker() {
  const [quotes, setQuotes] = useState<string[]>([]);

  useEffect(() => {
    const getShuffledQuotes = () => {
      const shuffled = [...mockData].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 6);
    };

    setQuotes(getShuffledQuotes());

    const interval = setInterval(() => {
      setQuotes(getShuffledQuotes());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden flex items-center text-[11px] text-cyan-300 font-mono tracking-tight leading-none whitespace-nowrap px-4 rounded-2xl bg-gradient-to-br from-[#041826] via-black to-[#0c1b32] border border-cyan-400/40 shadow-[0_0_60px_#00ffff66]">
      {/* Glowing Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute left-1/2 top-1/2 w-[280px] h-[280px] -translate-x-1/2 -translate-y-1/2 bg-cyan-300/15 blur-[100px] rounded-full animate-pulse" />
      </div>

      {/* Ticker Content */}
      <motion.div
        className="flex gap-8 animate-scrollTicker relative z-10"
        initial={{ x: 0 }}
        animate={{ x: '-50%' }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
      >
        {[...quotes, ...quotes].map((quote, i) => (
          <div key={i} className="opacity-90 hover:opacity-100 transition-opacity duration-200">
            <span className="text-cyan-300">{quote}</span>
          </div>
        ))}
      </motion.div>

      {/* Glitch Accent Bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-cyan-400/30 animate-glitch pointer-events-none z-10" />
    </div>
  );
}