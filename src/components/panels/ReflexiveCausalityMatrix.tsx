'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FinancialTimewarpPanel() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 8000); // Delayed entrance
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="absolute right-0 top-0 w-[47%] h-full px-10 py-12 bg-gradient-to-l from-black via-black/90 to-transparent text-white font-mono border-l-[3px] border-pink-500/60 shadow-[-20px_0_90px_rgba(255,0,122,0.35)] flex flex-col justify-center space-y-7 z-40"
        >
          {/* News Flash Headline */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-pink-400 text-[1.15rem] italic relative"
          >
            <span className="block">“BREAKING: Treasury Shock — Markets Collapse on Fed Rate Cut”</span>
            <motion.div
              className="absolute left-0 bottom-0 w-full h-[2px] bg-pink-500/40 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
            />
          </motion.div>

          {/* Tex Reflex Response */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-[1.25rem] text-white/90"
          >
            But <span className="text-cyan-300 font-semibold">Tex already acted</span>.
          </motion.div>

          {/* Strategy Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-sm text-white/70 space-y-1.5"
          >
            <div>
              Strategy: <span className="text-lime-300 tracking-tight">RP-Hybrid-σ</span>
            </div>
            <div>
              Executed: <span className="text-purple-300">T - 3.2s</span>
            </div>
            <div>
              ROI: <span className="text-emerald-300">+6.1%</span>
            </div>
            <div>
              Override: <span className="bg-rose-500/20 border border-rose-300/50 text-rose-300 px-2 py-[1px] rounded-md text-xs">❌ BLOCKED</span>
            </div>
          </motion.div>

          {/* Reflex Quote */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.1 }}
            className="pt-6 text-white/85 italic text-[1.15rem] leading-snug max-w-md"
          >
            <div>
              “Tex didn’t react.<br />
              He <span className="text-cyan-300 font-bold">reflexed</span>
            </div>

            <motion.div
              className="text-center pt-4 text-white text-[1.45rem] tracking-widest uppercase font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 2.0,
                duration: 1.6,
                ease: 'easeOut',
              }}
              style={{
                animation: 'pulse-glitch 2.5s ease-in-out infinite alternate',
              }}
            >
              before
            </motion.div>

            <div className="pt-1">”
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}