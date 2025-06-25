'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FinancialTimewarpPanel() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 8600); // sync delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 120 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 120 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="w-[46%] h-full px-10 py-12 bg-gradient-to-l from-black via-black/90 to-transparent text-white font-mono border-l-[3px] border-pink-500/50 shadow-[-20px_0_80px_rgba(255,0,122,0.35)] flex flex-col justify-center space-y-8 z-30 relative overflow-hidden"
        >
          {/* Breaking News Headline */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-pink-400 text-[1.1rem] italic relative"
          >
            “BREAKING: Treasury Shock — Markets Collapse on Fed Rate Cut”
            <motion.div
              className="absolute left-0 bottom-0 h-[2px] bg-pink-500/40 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
            />
          </motion.div>

          {/* Reflex Statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-white/90 text-[1.2rem]"
          >
            But <span className="text-cyan-300 font-semibold">Tex already acted</span>.
          </motion.div>

          {/* Strategy Snapshot */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-sm text-white/70 space-y-1.5"
          >
            <div>
              Strategy: <span className="text-lime-300">RP-Hybrid-σ</span>
            </div>
            <div>
              Executed: <span className="text-purple-300">T - 3.2s</span>
            </div>
            <div>
              ROI: <span className="text-emerald-300">+6.1%</span>
            </div>
            <div>
              Override: <span className="text-rose-300 bg-rose-500/20 px-2 py-[1px] rounded-md border border-rose-300/40 text-xs">❌ BLOCKED</span>
            </div>
          </motion.div>

          {/* Reflex Quote */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="pt-6 text-white/85 italic text-[1.1rem] leading-snug max-w-md"
          >
            <div>
              “Tex didn’t react.<br />
              He <span className="text-cyan-300 font-bold">reflexed</span>
            </div>

            <motion.div
              className="text-center pt-5 text-white font-bold tracking-widest text-[1.45rem] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1.2, ease: 'easeOut' }}
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