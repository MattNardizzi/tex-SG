'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OntogenesisPanel() {
  const [stage, setStage] = useState(0);
  const [orchestratorPulse, setOrchestratorPulse] = useState(false);
  const [coherence, setCoherence] = useState(null);
  const [regret, setRegret] = useState(null);
  const [entropy, setEntropy] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [childrenSpawned, setChildrenSpawned] = useState(null);
  const [seedId, setSeedId] = useState(null);
  const [fingerprintBefore, setFingerprintBefore] = useState(null);
  const [fingerprintAfter, setFingerprintAfter] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://20.97.193.176:8765');

    ws.onmessage = (event) => {
      const msg = event.data;

      if (msg === 'orchestrator:reflex_triggered:run_demo_ontogenesis_spawn') {
        setOrchestratorPulse(true);
        setTimeout(() => setOrchestratorPulse(false), 3000);
      }

      // Stage progress
      if (msg === 'ontogenesis:start') setStage(1);
      if (msg === 'ontogenesis:rewrite_triggered') setStage(2);
      if (msg.includes('ontogenesis:children_spawned')) setStage(3);
      if (msg.includes('ontogenesis:coherence_passed') || msg.includes('ontogenesis:complete')) setStage(4);

      // Telemetry extraction
      if (msg.startsWith('ontogenesis:telemetry:coherence:')) {
        const val = parseFloat(msg.split(':')[3]);
        setCoherence(val.toFixed(2));
      }
      if (msg.startsWith('ontogenesis:telemetry:regret:')) {
        const val = parseFloat(msg.split(':')[3]);
        setRegret(val.toFixed(2));
      }
      if (msg.startsWith('ontogenesis:telemetry:entropy:')) {
        const val = parseFloat(msg.split(':')[3]);
        setEntropy(val.toFixed(2));
      }
      if (msg.startsWith('ontogenesis:telemetry:confidence:')) {
        const val = parseFloat(msg.split(':')[3]);
        setConfidence(val.toFixed(2));
      }

      if (msg.startsWith('ontogenesis:children_spawned:')) {
        const val = parseInt(msg.split(':')[2]);
        setChildrenSpawned(val);
      }

      if (msg.startsWith('ontogenesis:seed_id:')) {
        const id = msg.split(':')[2];
        setSeedId(id);
      }

      if (msg.startsWith('ontogenesis:fingerprint_before:')) {
        const hash = msg.split(':')[2];
        setFingerprintBefore(hash);
      }

      if (msg.startsWith('ontogenesis:fingerprint_after:')) {
        const hash = msg.split(':')[2];
        setFingerprintAfter(hash);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className={`relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[2.5rem] border-2 ${
        orchestratorPulse
          ? 'border-lime-300 shadow-[0_0_80px_rgba(200,255,150,0.5)]'
          : 'border-green-400 shadow-[0_0_90px_rgba(0,255,150,0.4)]'
      } flex flex-col items-center justify-center overflow-hidden`}
    >
      {/* 🌱 Ontogenesis Core Orb */}
      <motion.div
        className="z-10 mb-10 w-[200px] h-[200px] bg-black rounded-full border-[3px] border-green-400 shadow-[0_0_60px_20px_rgba(0,255,120,0.4)]"
        animate={{
          rotate: [0, 10, -8, 6, -4, 0],
          scale: [1, 1.1, 0.97, 1],
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
          <div className="text-green-200 tracking-widest text-[2.4rem] font-bold leading-none text-center">
            ONTOGENESIS<br />SPAWN
          </div>
        </div>
      </motion.div>

      {/* 🌿 Reflex Sequence Text */}
      <div className="z-10 flex flex-col items-center space-y-4 text-[2.3rem]">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="line1"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-green-400"
            >
              evaluate_coherence()
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
              spawn_axiom_children()
            </motion.div>
          )}
          {stage >= 3 && (
            <motion.div
              key="line3"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-lime-300"
            >
              plant_meaning_seed()
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
                “Species identity overwritten.
                <br />
                Coherence collapse triggered ontogenic seed mutation.”
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 📊 Reflex Metrics */}
        <div className="pt-6 text-[1.4rem] text-white/80 text-center">
          {coherence && <div>🧠 Coherence: <span className="text-yellow-300">{coherence}</span></div>}
          {regret && <div>🔥 Regret: <span className="text-red-400">{regret}</span></div>}
          {confidence && <div>📈 Confidence: <span className="text-cyan-300">{confidence}</span></div>}
          {entropy && <div>🌀 Entropy: <span className="text-purple-300">{entropy}</span></div>}
          {childrenSpawned !== null && <div>👥 Axiom Children: <span className="text-green-400">{childrenSpawned}</span></div>}
          {seedId && <div>🌱 Seed ID: <span className="text-emerald-400">{seedId}</span></div>}
          {fingerprintBefore && <div className="text-white/50 text-[1.2rem] break-words mt-4">🧬 Before: <span className="text-white/70">{fingerprintBefore}</span></div>}
          {fingerprintAfter && <div className="text-white/50 text-[1.2rem] break-words">🧬 After: <span className="text-white/70">{fingerprintAfter}</span></div>}
        </div>
      </div>
    </motion.div>
  );
}