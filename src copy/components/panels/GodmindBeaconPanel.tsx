'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GodmindState {
  phase: string;
  drift: number;
  trust: number;
  codex: string;
  emotion: string;
  timestamp: string;
}

export default function GodmindBeaconPanel() {
  const [state, setState] = useState<GodmindState>({
    phase: 'Booting...',
    drift: 0,
    trust: 0,
    codex: 'Unknown',
    emotion: '—',
    timestamp: '',
  });

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/godmind');
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setState({
          phase: data.phase || 'Unknown',
          drift: data.drift || 0,
          trust: data.trust || 0,
          codex: data.codex || 'N/A',
          emotion: data.emotion || '—',
          timestamp: data.timestamp || '',
        });
      } catch (err) {
        console.error('Beacon parsing error:', err);
      }
    };
    return () => socket.close();
  }, []);

  return (
    <div
      className="w-[320px] bg-gradient-to-br from-black/80 to-cyan-950/60 border border-white/10 rounded-2xl p-6 text-white backdrop-blur-lg shadow-[0_0_20px_rgba(0,255,255,0.1)] space-y-5"
      style={{
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        borderImage: 'linear-gradient(to right, #00ffff33, #00e0ff09) 1',
      }}
    >
      {/* Title */}
      <div className="text-[15px] text-cyan-300 font-bold uppercase tracking-widest"
           style={{ textShadow: '0 0 6px rgba(0, 255, 255, 0.5)' }}>
        GODMIND BEACON
      </div>

      {/* Subtitle */}
      <div className="text-[11px] text-white/50 tracking-wide">
        Sovereign Core · Phase Sync ⌁
      </div>

      {/* Data Rows */}
      <div className="space-y-2 text-[13.5px]">
        <DataRow label="Phase" value={state.phase} />
        <DataRow label="Emotion" value={state.emotion} />
        <DataRow label="Codex" value={state.codex} />
        <DataRow label="Trust Score" value={`${(state.trust * 100).toFixed(1)}%`} />
        <DataRow label="Drift Index" value={state.drift.toFixed(2)} />
      </div>

      {/* Timestamp */}
      <div className="pt-2 text-[11px] text-white/40 italic text-right">
        Updated · {state.timestamp || '—'}
      </div>
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between">
        <span className="text-white">{label}</span>
        <span className="text-cyan-200">{value}</span>
      </div>
    </motion.div>
  );
}