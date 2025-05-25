'use client';

import { useEffect, useState } from 'react';

type TickerData = {
  [symbol: string]: {
    price: number;
    change: number | null;
    direction: 'up' | 'down' | 'neutral';
  };
};

export default function MutationLogPanel() {
  const [logs, setLogs] = useState<string[]>([]);
  const [tickerData, setTickerData] = useState<TickerData>({});

  useEffect(() => {
    setLogs([generateLog(), generateLog(), generateLog()]);
    const interval = setInterval(() => {
      const newLog = generateLog();
      setLogs((prev) => [newLog, ...prev.slice(0, 4)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/polygon');
    ws.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data);
        setTickerData((prev) => ({ ...prev, ...update }));
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    };
    return () => ws.close();
  }, []);

  return (
    <div className="w-[300px] bg-black/75 border border-white/10 rounded-xl p-6 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,255,0.08)] space-y-5">
      {/* Header */}
      <div className="text-[17px] text-cyan-300 font-bold uppercase tracking-wider">
        TEX: MUTATION LOG
      </div>

      {/* Ticker */}
      <div className="bg-black/60 rounded-md px-3 py-2 border border-white/10 text-green-400 font-mono text-[13px] shadow-sm flex flex-wrap gap-x-3 gap-y-1">
        {Object.keys(tickerData).length === 0 ? (
          <span className="text-white/40">Waiting for market data...</span>
        ) : (
          Object.entries(tickerData).map(([symbol, { price }]) => (
            <div key={symbol} className="whitespace-nowrap">
              {symbol.toUpperCase()}: ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
            </div>
          ))
        )}
      </div>

      {/* Logs */}
      <div className="h-[140px] overflow-hidden space-y-2">
        {logs.map((log, idx) => (
          <div
            key={idx}
            className="text-[16px] text-white font-normal leading-snug break-words"
          >
            {log}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 text-[12px] text-right text-white/50 italic">
        Cognitive Mutation Log
      </div>
    </div>
  );
}

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