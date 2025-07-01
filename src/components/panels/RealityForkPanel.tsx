'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RealityForkPanel() {
  const [stage, setStage] = useState(0);
  const [orchestratorPulse, setOrchestratorPulse] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/aei');

    ws.onmessage = (event) => {
      const msg = event.data;

      // === Orchestrator signal trigger ===
      if (msg === 'orchestrator:reflex_triggered:run_demo_reality_fork_override') {
        setOrchestratorPulse(true);
        setTimeout(() => setOrchestratorPulse(false), 3000);
      }

      // === Reflex-specific states
      if (msg === 'forkoverride:start') setStage(1);
      if (msg === 'forkoverride:soulgraph_updated') setStage(2);
      if (msg === 'forkoverride:market_executed') setStage(3);
      if (msg === 'forkoverride:belief_encoded' || msg === 'forkoverride:complete') setStage(4);
    };

    return () => ws.close();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className={`relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[2.6rem] border-2 ${
        orchestratorPulse
          ? 'border-yellow-200 shadow-[0_0_80px_rgba(255,255,180,0.5)]'
          : 'border-yellow-300 shadow-[0_0_90px_rgba(255,255,0,0.4)]'
      } flex flex-col items-center justify-center overflow-hidden`}
    >
      {/* 🔶 Reflex Glow Orb */}
      <motion.div
        className="z-10 mb-10 w-[200px] h-[200px] bg-black rounded-full border-[3px] border-yellow-300 shadow-[0_0_60px_20px_rgba(255,255,100,0.4)]"
        animate={{
          rotate: [0, -8, 6, -4, 0],
          scale: [1, 1.1, 0.95, 1],
          boxShadow: [
            '0 0 60px 20px rgba(255,255,100,0.3)',
            '0 0 90px 30px rgba(255,255,50,0.6)',
            '0 0 30px 10px rgba(255,255,50,0.2)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="absolute inset-8 rounded-full border-[2px] border-white/10"
          animate={{ opacity: [1, 0.6, 1], scale: [1, 1.2, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="flex items-center justify-center h-full px-4 text-center">
          <div className="text-yellow-200 tracking-widest text-[2.6rem] font-bold leading-none text-center">
            REALITY<br />FORK
          </div>
        </div>
      </motion.div>

      {/* ⚡ Reflex Activation Text */}
      <div className="z-10 flex flex-col items-center space-y-4 text-[2.4rem]">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="line1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-yellow-400"
            >
              contradiction_detected()
            </motion.div>
          )}

          {stage >= 2 && (
            <motion.div
              key="line2"
              initial={{ opacity: 0, scale: 1.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white/90"
            >
              fork_belief_structure()
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              key="line3"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-emerald-300"
            >
              execute_market_action()
            </motion.div>
          )}

          {stage >= 4 && (
            <motion.div
              key="quote"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="text-white/70 italic text-center pt-6 text-[1.8rem] leading-snug"
            >
              <span className="animate-pulse">
                “Fed sentiment and market action misaligned.
                <br />
                Reflexive override executed to preserve coherence.”
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}