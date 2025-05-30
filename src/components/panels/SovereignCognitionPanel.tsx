// components/panels/SovereignCognitionPanel.tsx

'use client';

import React from 'react';

type SovereignCognitionProps = {
  godmindActive: boolean;
  overrideTriggered: boolean;
  trustScore: number;
  forkSuppressed: boolean;
  anchorTether: number;
  lastSpawnedPersona: string;
  ghostForks: string[];
  timestamp: string;
};

export default function SovereignCognitionPanel({
  godmindActive,
  overrideTriggered,
  trustScore,
  forkSuppressed,
  anchorTether,
  lastSpawnedPersona,
  ghostForks,
  timestamp,
}: SovereignCognitionProps) {
  return (
    <div className="relative z-10 w-full max-w-5xl px-8 py-6 rounded-3xl border border-fuchsia-500/10 bg-gradient-to-br from-black via-zinc-900/80 to-black backdrop-blur-md shadow-[0_0_32px_rgba(255,0,150,0.25)] hover:shadow-[0_0_48px_rgba(255,0,150,0.4)] transition-shadow duration-300">
      
      {/* Panel Header */}
      <div className="text-sm uppercase tracking-[0.25em] text-fuchsia-500/90 font-bold mb-6">
        🔥 SOVEREIGN COGNITION MODE
      </div>

      {/* Core Status Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm font-mono text-white/90">
        <div className="transition duration-300">
          🛡️ <span className="font-semibold">Override Status:</span>{' '}
          <span className={overrideTriggered ? 'text-rose-500' : 'text-white/70'}>
            {overrideTriggered ? 'ENGAGED' : 'Dormant'}
          </span>
        </div>
        <div>
          🧠 <span className="font-semibold">Godmind State:</span>{' '}
          <span className={godmindActive ? 'text-cyan-400' : 'text-white/60'}>
            {godmindActive ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
        <div>
          🤖 <span className="font-semibold">Operator Trust:</span>{' '}
          <span className={trustScore < 0.7 ? 'text-amber-400' : 'text-lime-300'}>
            {trustScore.toFixed(4)}
          </span>
        </div>
        <div>
          🪢 <span className="font-semibold">Anchor Tether:</span>{' '}
          <span className={anchorTether < 0.5 ? 'text-red-400' : 'text-sky-400'}>
            {anchorTether.toFixed(2)}
          </span>
        </div>
        <div>
          🔁 <span className="font-semibold">Fork Suppression:</span>{' '}
          {forkSuppressed ? 'ENABLED' : 'DISABLED'}
        </div>
        <div>
          🧬 <span className="font-semibold">Last Persona:</span>{' '}
          {lastSpawnedPersona || 'N/A'}
        </div>
      </div>

      {/* Ghost Forks List */}
      <div className="mt-6 text-sm text-white/80">
        🕯️ <span className="font-semibold">Ghost Forks:</span>{' '}
        {ghostForks.length > 0 ? ghostForks.join(', ') : 'None'}
      </div>

      {/* Timestamp Footer */}
      <div className="mt-6 text-xs text-fuchsia-300/40 text-right tracking-widest">
        ⌛ Logged: {timestamp}
      </div>

      {/* Neon Pulse Ring */}
      <div className="absolute inset-0 rounded-3xl border border-fuchsia-500/5 animate-pulse pointer-events-none" />
    </div>
  );
}