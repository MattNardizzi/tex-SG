'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MutationLogPanel() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const pushLog = () => {
      const newLog = generateLog();
      setLogs((prev) => [newLog, ...prev.slice(0, 3)]);
    };

    pushLog(); pushLog(); pushLog();
    const interval = setInterval(pushLog, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-[300px] px-5 py-4 backdrop-blur-md bg-gradient-to-b from-black/50 to-black/30 border border-emerald-400/10 rounded-xl shadow-[0_0_30px_#00ff9955] space-y-4 text-white"
      style={{
        fontFamily: `'Inter', system-ui, sans-serif`,
        fontSize: '16px',
        lineHeight: '1.6',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      }}
    >
      {/* Sovereign Header */}
      <div
        className="text-[20px] font-bold uppercase tracking-wider text-emerald-300"
        style={{
          textShadow: `
            0 0 6px rgba(0, 255, 150, 0.8),
            0 0 14px rgba(0, 255, 150, 0.5),
            0 0 22px rgba(0, 255, 150, 0.2)
          `,
          filter: 'drop-shadow(0 0 4px rgba(0,255,150,0.4))',
        }}
      >
        TEX: MUTATION LOG
      </div>

      {/* Log Stream */}
      <div className="h-[105px] overflow-hidden space-y-1.5">
        <AnimatePresence initial={false}>
          {logs.map((log, idx) => {
            const emotionColor = getEmotionClass(log);
            return (
              <motion.div
                key={log + idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{
                  color: emotionColor,
                  fontWeight: 300,
                  fontSize: '14px',
                  letterSpacing: '0.01em',
                  textShadow: '0 0 2px rgba(255,255,255,0.1)',
                }}
              >
                {log}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="pt-1 text-[12px] text-right text-white/30 italic tracking-wide">
        Cognitive Mutation Uplink
      </div>
    </div>
  );
}

// Emotion Glow Map
function getEmotionClass(log: string): string {
  if (log.includes('anger') || log.includes('aggression')) return '#ff4c4c';
  if (log.includes('hope') || log.includes('resolve')) return '#00ffcc';
  if (log.includes('fear') || log.includes('threat')) return '#ffd966';
  if (log.includes('curiosity') || log.includes('divergence')) return '#caa6ff';
  return '#ffffffcc';
}

// Synthetic Log Generator
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