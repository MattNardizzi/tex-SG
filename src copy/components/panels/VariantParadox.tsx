'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateForecast = () => {
  const futures = [
    'Tech sector rally',
    'Debt ceiling breach',
    'Oil flash crash',
    'CBDC rollout war',
    'Systemic arbitrage event',
  ];
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  return {
    timestamp: new Date().toISOString(),
    forecast: pick(futures),
    confidence: (Math.random() * 0.15 + 0.82).toFixed(3),
    volatility: (Math.random() * 0.2 + 0.1).toFixed(3),
    driftScore: (Math.random() * 0.3).toFixed(3),
    foresight: (Math.random() * 0.2 + 0.75).toFixed(3),
    emotion: 'resolve',
    regret: 0.5,
    modelScores: {
      gradientBoosting: (Math.random() * 0.3 + 0.7).toFixed(3),
      ridgeRegression: (Math.random() * 0.3 + 0.6).toFixed(3),
    },
  };
};

export default function ForecastRiskGrid() {
  const [data, setData] = useState(generateForecast());
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateForecast());
      setIndex((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-[#041826] via-black to-[#0c1b32] rounded-2xl border border-cyan-400/40 shadow-[0_0_60px_#00ffff66] text-white font-mono overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dot matrix */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:22px_22px]" />
        {/* Glow pulse */}
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] -translate-x-1/2 bg-cyan-300/15 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Header */}
        <div className="text-center text-[10px] uppercase tracking-[0.3em] text-cyan-300 font-bold pb-2">
          Forecast Risk Grid
        </div>

        {/* Forecast Data */}
        <div className="flex-grow flex flex-col justify-center items-center text-center px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="text-[9px] leading-snug text-white/90 space-y-2"
            >
              <div className="uppercase text-white/30 text-[8px]">Forecasted Scenario</div>
              <div>
                <span className="text-cyan-300 font-bold">{data.forecast}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-white/80 text-[8.5px] pt-2">
                <div>Confidence: {data.confidence}</div>
                <div>Volatility: {data.volatility}</div>
                <div>Foresight Score: {data.foresight}</div>
                <div>Drift Score: {data.driftScore}</div>
                <div>Regret: <span className="text-yellow-300">{data.regret}</span></div>
                <div>Emotion: <span className="text-blue-300">{data.emotion}</span></div>
              </div>

              <div className="pt-2 text-[8px] text-white/40 uppercase">Model Ensemble</div>
              <div className="grid grid-cols-2 gap-2 text-white/80 text-[8px]">
                <div>Gradient Boosting: {data.modelScores.gradientBoosting}</div>
                <div>Ridge Regression: {data.modelScores.ridgeRegression}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Timestamp */}
        <div className="text-[9px] text-white/20 text-right mt-2">
          Cycle: {new Date(data.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}