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
      className="w-[300px] px-5 py-4 backdrop-blur-md bg-white/5 rounded-xl shadow-[0_0_20px_#00ffff11] space-y-4 text-white"
      style={{
        fontFamily: `'Inter', system-ui, sans-serif`,
        fontSize: '16px',
        lineHeight: '1.6',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      }}
    >
      {/* Header with pulse */}
      <motion.div
        key={pulseKey}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="text-[18px] font-semibold uppercase tracking-wide text-cyan-300"
        style={{ textShadow: '0 0 6px rgba(0,255,255,0.4)' }}
      >
        TEX: MUTATION LOG
      </motion.div>

      {/* Animated Logs */}
      <div className="h-[105px] overflow-hidden space-y-1.5">
        <AnimatePresence initial={false}>
          {logs.map((log, idx) => (
            <motion.div
              key={log + idx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className={`text-white ${getEmotionClass(log)}`}
              style={{
                fontWeight: 300,
                letterSpacing: '0.01em',
              }}
            >
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="pt-1 text-[13px] text-right text-white/40 italic tracking-wide">
        Cognitive Mutation Log
      </div>
    </div>
  );
}

// Emotion highlighting
function getEmotionClass(log: string): string {
  if (log.includes('anger') || log.includes('aggression')) return 'text-red-400';
  if (log.includes('hope') || log.includes('resolve')) return 'text-cyan-400';
  if (log.includes('fear') || log.includes('threat')) return 'text-yellow-300';
  if (log.includes('curiosity') || log.includes('divergence')) return 'text-purple-300';
  return '';
}

// Log generator
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