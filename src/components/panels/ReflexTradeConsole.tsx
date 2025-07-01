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
};

export default function ReflexTradeConsole() {
  const [trade, setTrade] = useState<Trade | null>(null);
  const [stage, setStage] = useState(0);
  const [orchestratorPulse, setOrchestratorPulse] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/aei');

    ws.onmessage = (event) => {
      const msg = event.data;

      // Orchestrator reflex cycle trigger
      if (msg.startsWith('orchestrator:reflex_triggered:')) {
        setOrchestratorPulse(true);
        setTimeout(() => setOrchestratorPulse(false), 3000);
      }

      // Live reflex-triggered trade broadcast
      if (msg.startsWith('trade:')) {
        const parts = msg.split(':');
        const symbol = parts[1];
        const action = parts[2];
        const confidence = parseFloat(parts[3]) || 0;

        setTrade({
          reflex_source: "orchestrator",
          action,
          symbol,
          confidence,
          urgency: Math.random() * 0.5 + 0.5,
          entropy: Math.random() * 0.5 + 0.3,
          summary: `${action.toUpperCase()} signal on ${symbol} triggered via orchestrator.`,
        });

        setStage(1);
        setTimeout(() => setStage(2), 1000);
        setTimeout(() => setStage(3), 2000);
        setTimeout(() => setStage(4), 3100);
      }
    };

    return () => ws.close();
  }, []);

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
      {/* 💠 Trade Console Orb */}
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

      {/* 💬 Trade Status Animation */}
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
              {trade ? `trade_reflex(${trade.reflex_source})` : 'trade_reflex(undefined)'}
            </motion.div>
          )}
          {stage >= 2 && trade && (
            <motion.div
              key="line2"
              initial={{ opacity: 0, scale: 1.4 }}
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
              urgency={trade.urgency?.toFixed(2)} entropy={trade.entropy?.toFixed(2)}
            </motion.div>
          )}
          {stage >= 4 && trade && (
            <motion.div
              key="quote"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="text-white/70 italic text-center pt-6 text-[1.6rem] leading-snug"
            >
              <span className="animate-pulse">
                {`“${trade.summary || 'Trade rationale not available.'}”`}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}