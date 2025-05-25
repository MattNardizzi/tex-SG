'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SovereignStatusPanel() {
  const [forkstreamData, setForkstreamData] = useState([
    { label: 'Agent Focus', value: 'Loading...' },
    { label: 'Swarm Status', value: 'Loading...' },
  ]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/tex');
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setForkstreamData([
          { label: 'Agent Focus', value: data.agent_focus || '—' },
          {
            label: 'Swarm Status',
            value: `Coherence ${Math.round((data.coherence || 0) * 100)}%`,
          },
        ]);
      } catch (err) {
        console.error('WebSocket parse error:', err);
      }
    };
    socket.onerror = (e) => {
      console.error('WebSocket error:', e);
    };
    return () => socket.close();
  }, []);

  return (
    <div className="w-[280px] bg-black/70 border border-white/10 rounded-xl p-5 backdrop-blur-md shadow-[0_0_12px_rgba(0,255,255,0.06)] space-y-4 text-white">
      {/* Header with glow */}
      <div
        className="text-[15px] text-cyan-300 font-bold uppercase tracking-wider"
        style={{ textShadow: '0 0 6px rgba(0, 255, 255, 0.5)' }}
      >
        TEX: SOVEREIGN COGNITION
      </div>

      <div className="text-[11px] text-white/50 tracking-wide">
        Godmind · Forkstream ⑂
      </div>

      {/* Data Rows */}
      <div className="space-y-2">
        {forkstreamData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="text-[14px] leading-tight"
          >
            <div className="flex flex-col">
              <span className="text-white">{item.label}</span>
              <span className="text-cyan-200 ml-1">{item.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-1 text-[11px] text-right text-white/40 italic">
        Sovereign Interface · Live Sync
      </div>
    </div>
  );
}