'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MAX_LINES = 6;
const REFRESH_INTERVAL = 5000;

function generateFloat(min: number, max: number, precision = 3): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(precision));
}

function probabilityCheck(prob = 0.3): boolean {
  return Math.random() < prob;
}

function createSnapshot() {
  const foresight = generateFloat(0.79, 0.91);
  const trust = foresight;
  const override = probabilityCheck(0.35);
  const suppress = probabilityCheck(0.3);
  const forks = ['variant_x1', 'variant_2', 'variant_3', 'variant_alpha', 'variant_zeta'];
  const ghost = forks[Math.floor(Math.random() * forks.length)];

  return {
    foresight,
    trust,
    override,
    suppress,
    godmind: true,
    tether: 'AeonDelta',
    persona: 'AeonDelta',
    ghost,
  };
}

export default function SovereignCognitionPanel() {
  const [logs, setLogs] = useState<string[]>([]);
  const [cycleKey, setCycleKey] = useState<number>(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const snapshot = createSnapshot();
      setCycleKey(Date.now());

      const logBatch = [
        `SOVEREIGN SIGNAL: Foresight confidence: ${snapshot.foresight}`,
        `TRUST SCORE: ${snapshot.trust.toFixed(4)}    ` +
          `OVERRIDE: ${snapshot.override ? 'TRIGGERED' : 'REJECTED'}`,
        `GODMIND PULSE: ${snapshot.godmind ? 'ACKNOWLEDGED' : 'INACTIVE'}`,
        `FORK SUPPRESSED: ${snapshot.suppress ? 'YES' : 'NO'}`,
        `ANCHOR TETHER: ${snapshot.tether}`,
        `LAST PERSONA: ${snapshot.persona}`,
        `GHOST FORKS: ${snapshot.ghost}`,
      ];

      setLogs(logBatch.slice(0, MAX_LINES));
    }, REFRESH_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-emerald-900 via-black to-green-950 rounded-2xl border border-green-400/30 shadow-[0_0_40px_#00ff8844] font-body overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-72 h-72 -translate-x-1/2 bg-green-300/10 rounded-full blur-[90px] animate-pulse" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col gap-1 mb-2">
        <div className="flex items-start justify-between">
          <div className="text-fluid-lg font-display uppercase tracking-widest text-sovereignCyan leading-tight whitespace-nowrap">
            SOVEREIGN COGNITION
          </div>
          <div className="relative w-5 h-5">
            <div className="absolute inset-0 rounded-full border border-green-300/20 animate-spin-slow" />
            <div className="absolute inset-[5px] rounded-full bg-green-300 shadow-[0_0_12px_3px_rgba(34,255,150,0.3)]" />
            <div className="absolute inset-0 rounded-full blur-[4px] bg-green-300 opacity-30 animate-pulse" />
          </div>
        </div>

        <div className="flex flex-row gap-x-6 justify-start text-[8.3px] tracking-[0.18em] font-semibold w-full font-body">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.5, 0.2, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/80 whitespace-nowrap"
          >
            STATUS: ONLINE
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.7, 0.5, 1, 0.4] }}
            transition={{ duration: 2.3, repeat: Infinity }}
            className="text-cyan-100 whitespace-nowrap"
          >
            GODMIND: ACTIVE
          </motion.div>
        </div>
      </div>

      {/* Logs */}
      <div className="relative z-10 flex flex-col justify-end gap-[1.2px] text-[7.5px] leading-[1.15rem] tracking-tight font-mono">
        {logs.length === 0 ? (
          <div className="text-white/60 italic font-body">Awaiting sovereign signal...</div>
        ) : (
          logs.map((line, i) => {
            const critical = /TRIGGERED|REJECTED/.test(line);
            const metric = /SCORE|FORK|TETHER/.test(line);
            const pulse = /PULSE|GODMIND/.test(line);
            const isSignal = /SOVEREIGN SIGNAL/.test(line);

            const style = isSignal
              ? 'text-cyan-200'
              : critical
              ? 'font-bold text-crimson'
              : metric
              ? 'text-cyan-300'
              : pulse
              ? 'text-white/80'
              : 'text-white/60';

            return (
              <motion.div
                key={`log-${i}-${cycleKey}`}
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className={`transition-all duration-300 ${style}`}
              >
                {line}
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}