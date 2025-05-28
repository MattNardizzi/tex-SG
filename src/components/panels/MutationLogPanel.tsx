// components/panels/MutationLogPanel.tsx

'use client';

import React from 'react';

type MutationLogProps = {
  mutationId: string;
  reason: string;
  targetModule: string;
  overrideTriggered: boolean;
  success: boolean;
  timestamp: string;
};

export default function MutationLogPanel({
  mutationId,
  reason,
  targetModule,
  overrideTriggered,
  success,
  timestamp,
}: MutationLogProps) {
  return (
    <div className="bg-black/80 border border-white/10 rounded-2xl p-6 shadow-xl w-full max-w-xl text-white space-y-4 backdrop-blur-sm">
      <div className="text-xs uppercase tracking-widest text-amber-400/80">🧬 Mutation Log</div>

      <div className="text-sm font-mono text-white/70">ID: {mutationId}</div>

      <div className="grid grid-cols-2 gap-4 text-sm mt-2">
        <div>
          <div className="text-white/60">Reason</div>
          <div className="text-white font-bold">{reason}</div>
        </div>
        <div>
          <div className="text-white/60">Target Module</div>
          <div className="text-white font-bold">{targetModule}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mt-2">
        <div>
          <div className="text-white/60">Sovereign Override</div>
          <div className={`font-bold ${overrideTriggered ? 'text-red-400' : 'text-green-400'}`}>
            {overrideTriggered ? 'YES' : 'NO'}
          </div>
        </div>
        <div>
          <div className="text-white/60">Mutation Status</div>
          <div className={`font-bold ${success ? 'text-green-400' : 'text-red-400'}`}>
            {success ? 'SUCCESS' : 'FAILED'}
          </div>
        </div>
      </div>

      <div className="text-xs text-white/40 mt-4">Logged: {timestamp}</div>
    </div>
  );
}