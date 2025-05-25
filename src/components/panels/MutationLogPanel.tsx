'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SovereignSwarmPanel() {
  const [logs, setLogs] = useState<string[]>([]);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    const pushLog = () => {
      const newLog = generateLog();
      setLogs((prev) => [newLog, ...prev.slice(0, 3)]);
      setPulseKey((prev) => prev + 1);
    };

    pushLog(); pushLog(); pushLog();
    const interval = setInterval(pushLog, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-[340px] px-5 py-5 rounded-2xl backdrop-blur-md bg-black/30 border border-white/10 shadow-[inset_0_0_2px_#ffffff10,_0_0_14px_#00ffff10] text-white space-y-5"
      style={{ fontFamily: `'Inter', system-ui, sans-serif` }}
    >
      {/* Title */}
      <div className="text-[16px] font-semibold uppercase tracking-wide text-cyan-300"
        style={{ textShadow: `0 0 5px #00ffffaa, 0 0 12px #00ffff55, 0 0 20px #00ffff33` }}>
        Sovereign Swarm Panel
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <Stat label="Swarm Size" value="27" />
        <Stat label="Dominant Emotion" value="Resolve" glow="#00ffee" />
        <Stat label="Risk Bias" value="Aggressive" glow="#ff4d4d" />
        <Stat label="Drift Score" value="0.48" glow="#ffd966" />
      </div>

      {/* Logs */}
      <div className="h-[120px] overflow-hidden space-y-1.5 text-[13.5px] leading-snug tracking-wide">
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
        Swarm Cognitive Feed
      </div>
    </div>
  );
}

function Stat({ label, value, glow }: { label: string, value: string, glow?: string }) {
  return (
    <div className="flex flex-col">
      <div className="text-white/50 text-[12px] uppercase tracking-wide">{label}</div>
      <div
        className="text-[14.5px] font-medium"
        style={{
          color: glow || '#ffffff',
          textShadow: glow
            ? `0 0 4px ${glow}55, 0 0 8px ${glow}44`
            : 'none',
        }}
      >
        {value}
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
    'Drift signal: resolve ↑ +0.25',
  ];
  return samples[Math.floor(Math.random() * samples.length)];
}