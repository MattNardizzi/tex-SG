'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Trade = {
  reflex_source?: string;
  action?: string;
  symbol?: string;
  confidence?: number;
  urgency?: number;
  entropy?: number;
  summary?: string;
  timestamp?: string;
  vector?: number[];
};

export default function ReflexTradeConsole() {
  const [trade, setTrade] = useState<Trade | null>(null);
  const [stage, setStage] = useState(0);
  const [orchestratorPulse, setOrchestratorPulse] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://20.97.193.176:8765');

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);

        if (parsed?.type === 'orchestrator_reflex') {
          setOrchestratorPulse(true);
          setTimeout(() => setOrchestratorPulse(false), 3000);
        }

        if (parsed?.type === 'reflex_trade' && parsed?.payload) {
          const payload = parsed.payload;
          setTrade(payload);
          setStage(1);
          setTimeout(() => setStage(2), 800);
          setTimeout(() => setStage(3), 1600);
          setTimeout(() => setStage(4), 2600);
        }
      } catch {
        console.warn('⚠️ Non-JSON WebSocket message received:', event.data);
      }
    };

    return () => ws.close();
  }, []);

  const graphBar = (label: string, value: number, color: string) => (
    <div className="flex flex-col items-center space-y-1">
      <div className="text-sm text-white/60">{label}</div>
      <motion.div
        className="w-6 rounded bg-opacity-70"
        style={{ backgroundColor: color }}
        initial={{ height: 0 }}
        animate={{ height: `${Math.min(value * 100, 100)}px` }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      />
      <div className="text-xs text-white/40 mt-1">{value.toFixed(2)}</div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className={`relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[2.4rem] border-2 ${
        orchestratorPulse
          ? 'border-yellow-300 shadow-[0_0_80px_rgba(255,255,150,0.5)]'
          : 'border-cyan-300 shadow-[0_0_90px_rgba(0,255,255,0.4)]'
      } flex flex-col items-center justify-center overflow-hidden`}
    >
      {/* 💠 Reflex Orb */}
      <motion.div
        className="z-10 mb-10 w-[200px] h-[200px] bg-black rounded-full border-[3px] border-cyan-300 shadow-[0_0_60px_20px_rgba(0,255,255,0.4)]"
        animate={{
          rotate: [0, 6, -5, 3, 0],
          scale: [1, 1.1, 0.96, 1],
          boxShadow: [
            '0 0 60px 20px rgba(0,255,255,0.3)',
            '0 0 90px 30px rgba(0,255,255,0.6)',
            '0 0 30px 10px rgba(0,255,255,0.2)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute inset-8 rounded-full border-[2px] border-white/10"
          animate={{ opacity: [1, 0.6, 1], scale: [1, 1.2, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="flex items-center justify-center h-full px-4 text-center">
          <div className="text-cyan-200 tracking-widest text-[2.2rem] font-bold leading-none text-center">
            TRADE<br />CONSOLE
          </div>
        </div>
      </motion.div>

      {/* 🧬 Reflex Animation */}
      <div className="z-10 flex flex-col items-center space-y-4 text-[2.2rem]">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="line1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-cyan-400"
            >
              reflex_triggered({trade?.reflex_source || 'undefined'})
            </motion.div>
          )}
          {stage >= 2 && trade && (
            <motion.div
              key="line2"
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white/90"
            >
              {trade.action?.toUpperCase()} {trade.symbol} @ conf {trade.confidence?.toFixed(2)}
            </motion.div>
          )}
          {stage >= 3 && trade && (
            <motion.div
              key="line3"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-cyan-200"
            >
              urgency={trade.urgency?.toFixed(2)} | entropy={trade.entropy?.toFixed(2)}
            </motion.div>
          )}
          {stage >= 4 && trade && (
            <>
              <motion.div
                key="quote"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                className="text-white/70 italic text-center pt-6 text-[1.6rem] leading-snug"
              >
                <span className="animate-pulse">
                  “{trade.summary || 'Trade rationale unavailable.'}”
                </span>
              </motion.div>

              {/* 💹 Graph Pulse for Confidence + Entropy */}
              <motion.div
                key="bars"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-6 pt-6"
              >
                {graphBar('Confidence', trade.confidence ?? 0, '#22d3ee')}
                {graphBar('Entropy', trade.entropy ?? 0, '#fbbf24')}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}