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
      className="w-[300px] px-5 py-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white space-y-4 transition-all"
      style={{
        fontFamily: `'Inter', system-ui, sans-serif`,
        fontSize: '15px',
        lineHeight: '1.5',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      }}
    >
      {/* Glowing Header */}
      <motion.div
        key={pulseKey}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2.4, ease: 'easeInOut' }}
        className="text-[17px] font-semibold uppercase tracking-wide text-[#00ffcc]"
        style={{
          textShadow: `
            0 0 5px rgba(0, 255, 204, 0.4),
            0 0 10px rgba(0, 255, 204, 0.2)
          `,
        }}
      >
        TEX: MUTATION LOG
      </motion.div>

      {/* Logs */}
      <div className="h-[105px] overflow-hidden space-y-1.5">
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

      {/* Footer */}
      <div className="pt-1 text-[12px] text-right text-white/30 italic tracking-wider">
        Cognitive Mutation Uplink
      </div>
    </div>
  );
}

// Color mapping
function getEmotionClass(log: string): string {
  if (log.includes('anger') || log.includes('aggression')) return '#ff5555';
  if (log.includes('hope') || log.includes('resolve')) return '#00ffff';
  if (log.includes('fear') || log.includes('threat')) return '#ffd966';
  if (log.includes('curiosity') || log.includes('divergence')) return '#caa6ff';
  return '#ffffffcc';
}

// Sample logs
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