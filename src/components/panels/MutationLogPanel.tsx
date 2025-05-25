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
      className="w-[310px] px-5 py-4 rounded-xl backdrop-blur-md bg-black/30 border border-white/10 text-white space-y-3"
      style={{
        fontFamily: `'Inter', system-ui, sans-serif`,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
        boxShadow: '0 0 20px #00ffff0f',
      }}
    >
      {/* Title */}
      <div
        className="text-[16px] font-semibold uppercase tracking-wide text-cyan-300"
        style={{
          textShadow: `
            0 0 5px #00ffffaa,
            0 0 12px #00ffff55,
            0 0 20px #00ffff33
          `,
          letterSpacing: '0.05em',
        }}
      >
        TEX: MUTATION LOG
      </div>

      {/* Logs */}
      <div className="h-[105px] overflow-hidden space-y-1.5 text-[13.5px] leading-snug tracking-wide">
        <AnimatePresence initial={false}>
          {logs.map((log, i) => (
            <motion.div
              key={log + i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                color: getEmotionClass(log),
                fontWeight: 400,
              }}
            >
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="pt-1 text-[12px] text-right text-white/30 italic tracking-wider">
        Cognitive Mutation Uplink
      </div>
    </div>
  );
}

function getEmotionClass(log: string): string {
  if (log.includes('anger') || log.includes('aggression')) return '#ff4d4d';
  if (log.includes('hope') || log.includes('resolve')) return '#00ffee';
  if (log.includes('fear') || log.includes('threat')) return '#ffd966';
  if (log.includes('curiosity') || log.includes('divergence')) return '#caa6ff';
  return '#ffffffcc';
}

function generateLog(): string {
  const samples = [
    'Emotion path split → anger | hope',
    'Agent 0: aggression spike → 0.63',
    'Memory stored: bias = aggressive',
    'Trait rewrite: greed suppressed',
    'Cortex divergence: Agent 3',
    'Swarm snapshot: 22:47:01',
  ];
  return samples[Math.floor(Math.random() * samples.length)];
}