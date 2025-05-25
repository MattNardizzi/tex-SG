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
      setPulseKey((prev) => prev + 1); // trigger header pulse
    };

    pushLog(); pushLog(); pushLog();
    const interval = setInterval(pushLog, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-[290px] px-5 py-4 backdrop-blur-md bg-white/5 rounded-xl shadow-[0_0_20px_#00ffff11] space-y-4 text-white"
      style={{ textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased' }}
    >
      {/* Header with flicker pulse */}
      <motion.div
        key={pulseKey}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="text-[15px] font-bold uppercase tracking-wider text-cyan-300"
        style={{ textShadow: '0 0 6px rgba(0,255,255,0.4)' }}
      >
        TEX: MUTATION LOG
      </motion.div>

      {/* Logs with animation + color parsing */}
      <div className="h-[90px] overflow-hidden space-y-1.5">
        <AnimatePresence initial={false}>
          {logs.map((log, idx) => (
            <motion.div
              key={log + idx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className={`text-[13.25px] font-light leading-snug ${getEmotionClass(log)}`}
            >
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="pt-1 text-[11px] text-right text-white/40 italic tracking-wide">
        Cognitive Mutation Log
      </div>
    </div>
  );
}

// Emotion color highlighting
function getEmotionClass(log: string): string {
  if (log.includes('anger') || log.includes('aggression')) return 'text-red-400';
  if (log.includes('hope') || log.includes('resolve')) return 'text-cyan-400';
  if (log.includes('fear') || log.includes('threat')) return 'text-yellow-300';
  if (log.includes('curiosity') || log.includes('divergence')) return 'text-purple-300';
  return 'text-white/90';
}

// Sample log generator
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