'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ForkStressPanel() {
  const [stage, setStage] = useState(0);
  const [orchestratorPulse, setOrchestratorPulse] = useState(false);
  const [forkConfidence, setForkConfidence] = useState(null);
  const [forkPassed, setForkPassed] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://20.97.193.176:8765');

    ws.onmessage = (event) => {
      const msg = event.data;

      if (msg === 'orchestrator:reflex_triggered:run_demo_fork_stress_and_compression') {
        setOrchestratorPulse(true);
        setTimeout(() => setOrchestratorPulse(false), 3000);
      }

      if (msg === 'fork:begin') setStage(1);
      if (msg === 'fork:stress_test_done') setStage(2);
      if (msg === 'fork:market_action_done') setStage(3);
      if (msg.includes('fork:absorbed') || msg.includes('fork:rejected') || msg.includes('fork:complete')) setStage(4);

      if (msg.startsWith('fork:confidence:')) {
        const val = parseFloat(msg.split(':')[2]);
        setForkConfidence(val.toFixed(2));
      }

      if (msg.startsWith('fork:passed:')) {
        const val = msg.split(':')[2] === 'true';
        setForkPassed(val);
      }
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
          ? 'border-yellow-300 shadow-[0_0_80px_rgba(255,255,150,0.5)]'
          : forkPassed === true
            ? 'border-green-400 shadow-[0_0_90px_rgba(0,255,100,0.4)]'
            : forkPassed === false
              ? 'border-red-400 shadow-[0_0_90px_rgba(255,50,50,0.4)]'
              : 'border-orange-400 shadow-[0_0_90px_rgba(255,165,0,0.4)]'
      } flex flex-col items-center justify-center overflow-hidden`}
    >
      {/* 🧬 Fork Compression Core */}
      <motion.div
        className="z-10 mb-10 w-[200px] h-[200px] bg-black rounded-full border-[3px] border-orange-400 shadow-[0_0_60px_20px_rgba(255,165,0,0.4)]"
        animate={{
          rotate: [0, 10, -8, 5, 0],
          scale: [1, 1.1, 0.96, 1],
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
          <div className="text-orange-300 tracking-widest text-[2.4rem] font-bold leading-none text-center">
            FORK<br />COMPRESSION
          </div>
        </div>
      </motion.div>

      {/* 🧪 Reflex Sequence */}
      <div className="z-10 flex flex-col items-center space-y-4 text-[2.3rem]">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-orange-300"
            >
              spawn_fork_variant()
            </motion.div>
          )}
          {stage >= 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              run_stress_test()
            </motion.div>
          )}
          {stage >= 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-yellow-300"
            >
              execute_market_reflex()
            </motion.div>
          )}
          {stage >= 4 && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="text-white/70 italic text-center pt-6 text-[1.8rem] leading-snug"
            >
              <span className="animate-pulse">
                {forkPassed
                  ? "✅ Coherent fork integrated. Identity compressed with quantum tag."
                  : "❌ Fork failed epistemic or market reflex. Rejected from core identity."}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 📊 Metrics */}
        <div className="pt-6 text-[1.4rem] text-white/80 text-center">
          {forkConfidence && (
            <div>📈 Fork Confidence: <span className="text-green-400">{forkConfidence}</span></div>
          )}
          {forkPassed !== null && (
            <div>
              🧬 Fork Status:{" "}
              <span className={forkPassed ? "text-cyan-300" : "text-red-400"}>
                {forkPassed ? "Survived" : "Rejected"}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}