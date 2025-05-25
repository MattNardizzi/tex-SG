'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MutationLogPanel() {
  const [logs, setLogs] = useState<string[]>([]);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    const pushLog = () => {
      const newLog = generateLog();
      setLogs((prev) => [newLog, ...prev.slice(0, 2)]);
      setPulseKey((prev) => prev + 1);
    };

    pushLog(); pushLog(); pushLog();
    const interval = setInterval(pushLog, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-[300px] px-5 py-4 backdrop-blur-md bg-white/5 rounded-xl shadow-[0_0_40px_#00ffff22,inset_0_0_8px_#00ffff11] space-y-4 text-white border border-white/10"
      style={{
        fontFamily: `'Inter', system-ui, sans-serif`,
        fontSize: '16px',
        lineHeight: '1.6',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      }}
    >
      {/* 👁‍🗨 Neural Header */}
      <motion.div
        key={pulseKey}
        initial={{ opacity: 0.6, scale: 0.98 }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.98, 1, 0.98] }}
        transition={{ duration: 6.4, ease: 'easeInOut', repeat: Infinity }}
        className="text-[18.5px] font-semibold uppercase tracking-wider text-cyan-300 text-center"
        style={{
          textShadow: `
            0 0 6px rgba(0,255,255,0.45),
            0 0 12px rgba(0,255,255,0.25),
            0 0 24px rgba(0,255,255,0.15)
          `,
        }}
      >
        TEX: MUTATION LOG
        <div className="mt-1 w-full h-[1px] bg-cyan-300/20 shadow-[0_0_12px_#00ffff77] rounded-full"></div>
      </motion.div>

      {/* 👁️ Emotion Logs */}
      <div className="h-[105px] overflow-hidden px-[2px] space-y-1.5">
        <AnimatePresence initial={false}>
          {logs.map((log, idx) => {
            const emotionClass = getEmotionClass(log);
            return (
              <motion.div
                key={log + idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{
                  color: emotionClass,
                  fontWeight: 300,
                  fontSize: '14px',
                  letterSpacing: '0.01em',
                }}
              >
                {log}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 🧬 Quantum Footer */}
      <div className="pt-2 text-[12px] text-right text-white/30 italic tracking-widest">
        Cognitive Mutation Uplink
      </div>
    </div>
  );
}

// Cinematic emotion class mapping
function getEmotionClass(log: string): string {
  if (log.includes('anger') || log.includes('aggression')) return '#ff4b4b';
  if (log.includes('hope') || log.includes('resolve')) return '#00ffff';
  if (log.includes('fear') || log.includes('threat')) return '#ffdd66';
  if (log.includes('curiosity') || log.includes('divergence')) return '#d1a6ff';
  return '#ffffffcc'; // default
}

function generateLog(): string {
  const samples = [
    'Agent 0: aggression spike → 0.63',
    'Agent 2: curiosity spike → 0.74',
    'Memory stored: bias = aggressive',
    'Memory stored: fear ↑, resolve ↑',
    'Trait rewrite: greed suppressed',
    'Emotion path split → anger | hope',
    'Cortex divergence: Agent 3',
    'Swarm snapshot: 22:47:01',
  ];
  return samples[Math.floor(Math.random() * samples.length)];
}