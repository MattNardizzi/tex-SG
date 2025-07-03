'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AEILineagePanel() {
  const [stage, setStage] = useState(0);
  const [orchestratorPulse, setOrchestratorPulse] = useState(false);
  const [confidence, setConfidence] = useState(null);
  const [coherenceScore, setCoherenceScore] = useState(null);
  const [quantumId, setQuantumId] = useState(null);
  const [survived, setSurvived] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://20.97.193.176:8765');

    ws.onmessage = (event) => {
      const msg = event.data;

      if (msg === 'orchestrator:reflex_triggered:run_aei_lineage_with_financial_evolution') {
        setOrchestratorPulse(true);
        setTimeout(() => setOrchestratorPulse(false), 3000);
      }

      if (msg === 'aei:start') setStage(1);
      if (msg === 'aei:fork_test_done') setStage(2);
      if (msg === 'aei:market_test_done') setStage(3);
      if (msg.includes('aei:fork_survived') || msg.includes('aei:fork_rejected') || msg.includes('aei:complete')) setStage(4);

      if (msg.startsWith('aei:confidence:')) {
        const value = parseFloat(msg.split(':')[2]);
        setConfidence(value.toFixed(2));
      }

      if (msg.startsWith('aei:fork_score:')) {
        const value = parseFloat(msg.split(':')[2]);
        setCoherenceScore(value.toFixed(2));
      }

      if (msg.startsWith('aei:quantum_id:')) {
        setQuantumId(msg.split(':')[2]);
      }

      if (msg.startsWith('aei:survived:')) {
        setSurvived(msg.split(':')[2] === 'true');
      }
    };

    return () => ws.close();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className={`relative w-full h-full px-6 py-8 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 ${
        orchestratorPulse
          ? 'border-yellow-300 shadow-[0_0_80px_rgba(255,255,100,0.4)]'
          : survived === true
          ? 'border-green-400 shadow-[0_0_90px_rgba(0,255,100,0.4)]'
          : survived === false
          ? 'border-red-400 shadow-[0_0_90px_rgba(255,50,50,0.4)]'
          : 'border-lime-400 shadow-[0_0_90px_rgba(0,255,100,0.4)]'
      } flex flex-col items-center justify-center overflow-hidden`}
    >
      {/* 🧬 AEI Glow Core */}
      <motion.div
        className="z-10 mb-8 w-[180px] h-[180px] bg-black rounded-full border-[3px] border-lime-400 shadow-[0_0_60px_20px_rgba(0,255,100,0.4)]"
        animate={{
          rotate: [0, 8, -6, 4, 0],
          scale: [1, 1.1, 0.97, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="absolute inset-6 rounded-full border-[2px] border-white/10"
          animate={{ opacity: [1, 0.6, 1], scale: [1, 1.2, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="flex items-center justify-center h-full px-4 text-center">
          <div className="text-lime-300 tracking-widest text-[1.6rem] font-bold leading-none text-center">
            AEI<br />LINEAGE
          </div>
        </div>
      </motion.div>

      {/* ⚙️ Reflex Stage Timeline */}
      <div className="z-10 flex flex-col items-center space-y-3 text-[1.4rem]">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-lime-300"
            >
              generate_mutated_fork()
            </motion.div>
          )}
          {stage >= 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white/90"
            >
              test_reflex_under_stress()
            </motion.div>
          )}
          {stage >= 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-emerald-300"
            >
              simulate_market_reflex()
            </motion.div>
          )}
          {stage >= 4 && (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="text-white/70 italic text-center pt-4 text-[1.2rem] leading-snug"
            >
              <span className="animate-pulse">
                {survived === true
                  ? '✅ Fork survived and was absorbed into AGI lineage.'
                  : survived === false
                  ? '❌ Fork failed coherence or market reflex. Rejected.'
                  : '⏳ Reflex lineage evolution in progress...'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 📊 Reflex Metrics */}
        <div className="pt-6 text-[1.2rem] text-white/80 text-center">
          {confidence && (
            <div>📈 Market Confidence: <span className="text-cyan-300">{confidence}</span></div>
          )}
          {coherenceScore && (
            <div>🧠 Coherence Score: <span className="text-yellow-300">{coherenceScore}</span></div>
          )}
          {quantumId && (
            <div>🧬 Quantum Tag: <span className="text-white/70">{quantumId}</span></div>
          )}
        </div>
      </div>
    </motion.div>
  );
}