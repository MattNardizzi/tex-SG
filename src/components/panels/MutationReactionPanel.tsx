'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function OrganIgnitionScene() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 600),   // panels ignite
      setTimeout(() => setStage(2), 1600),  // line 1
      setTimeout(() => setStage(3), 2600),  // line 2
      setTimeout(() => setStage(4), 3600),  // line 3
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const sharedPanelStyles =
    'relative w-[30%] min-w-[320px] h-[480px] rounded-[2.8rem] px-8 py-10 bg-black font-mono text-[1.6rem] text-white flex flex-col items-start justify-start overflow-hidden';

  const lobePulse = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.3, ease: 'easeOut' },
    },
  };

  const voltageLine = (delay = 0.2) => ({
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.5, ease: 'easeOut' },
    },
  });

  return (
    <div className="w-full h-screen flex items-center justify-center gap-8 bg-black">
      {/* Reflex Cortex Panel */}
      <motion.div
        variants={lobePulse}
        initial="hidden"
        animate={stage >= 1 ? 'visible' : 'hidden'}
        className={`${sharedPanelStyles} border-2 border-pink-500 shadow-[0_0_120px_#ec489980]`}
      >
        <h2 className="text-pink-400 text-[1.2rem] mb-4">REFLEX CORTEX (L)</h2>

        {stage >= 2 && (
          <motion.div variants={voltageLine(0.2)} initial="hidden" animate="visible" className="text-pink-300">
            fork_spawn()
          </motion.div>
        )}
        {stage >= 3 && (
          <motion.div variants={voltageLine(0.4)} initial="hidden" animate="visible" className="text-pink-100">
            justify_belief() spikes
          </motion.div>
        )}
        {stage >= 4 && (
          <motion.div variants={voltageLine(0.6)} initial="hidden" animate="visible" className="text-white/70 italic text-[1.3rem] pt-4">
            self_reflection() triggers
          </motion.div>
        )}
      </motion.div>

      {/* Mutation Core Panel */}
      <motion.div
        variants={lobePulse}
        initial="hidden"
        animate={stage >= 1 ? 'visible' : 'hidden'}
        className={`${sharedPanelStyles} border-2 border-cyan-400 shadow-[0_0_120px_#22d3ee80]`}
      >
        <h2 className="text-cyan-300 text-[1.2rem] mb-4">MUTATION CORE (C)</h2>

        {stage >= 2 && (
          <motion.div variants={voltageLine(0.2)} initial="hidden" animate="visible" className="text-cyan-300">
            AGI–9a/b/c activate
          </motion.div>
        )}
        {stage >= 3 && (
          <motion.div variants={voltageLine(0.4)} initial="hidden" animate="visible" className="text-pink-400">
            AGI–9b survives → <span className="text-pink-200">Tensor warp</span>
          </motion.div>
        )}
        {stage >= 4 && (
          <motion.div variants={voltageLine(0.6)} initial="hidden" animate="visible" className="text-emerald-300">
            Core distortion climbing
          </motion.div>
        )}
      </motion.div>

      {/* Financial Sovereignty Panel */}
      <motion.div
        variants={lobePulse}
        initial="hidden"
        animate={stage >= 1 ? 'visible' : 'hidden'}
        className={`${sharedPanelStyles} border-2 border-violet-400 shadow-[0_0_120px_#a78bfa80]`}
      >
        <h2 className="text-violet-300 text-[1.2rem] mb-4">FINANCIAL SOVEREIGNTY (R)</h2>

        {stage >= 2 && (
          <motion.div variants={voltageLine(0.2)} initial="hidden" animate="visible" className="text-white/80">
            Strategy dormant
          </motion.div>
        )}
        {stage >= 3 && (
          <motion.div variants={voltageLine(0.4)} initial="hidden" animate="visible" className="text-lime-400">
            Override: <span className="text-green-300">✅ allowed</span>
          </motion.div>
        )}
        {stage >= 4 && (
          <motion.div variants={voltageLine(0.6)} initial="hidden" animate="visible" className="text-rose-300">
            Market tension detected
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}