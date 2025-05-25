'use client';

import { useState } from 'react';
import MutationLogPanel from '@/components/panels/MutationLogPanel';
import SovereignStatusPanel from '@/components/panels/SovereignStatusPanel';
import SpineCanvas from '@/components/Spine/SpineCanvas';

export default function Page() {
  const [input, setInput] = useState('');

  return (
    <div className="relative w-screen h-screen bg-black text-white overflow-hidden font-sans">
      {/* Left Panel – no extra div */}
      <div className="absolute top-8 left-8 z-20">
        <MutationLogPanel />
      </div>

      {/* Right Panel – no extra div */}
      <div className="absolute top-8 right-8 z-20 text-right">
        <SovereignStatusPanel />
      </div>

      {/* Center Beam */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <SpineCanvas />
      </div>

      {/* Bottom Textbox */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
        <div className="w-[360px] bg-black/60 border border-white/10 backdrop-blur-md rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.08)] px-4 py-3 flex items-center justify-between">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Speak to Tex..."
            className="w-full bg-transparent text-white text-sm placeholder-white/30 outline-none"
          />
          <button className="ml-3 text-white hover:text-cyan-300 transition-all">
            <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center shadow-[0_0_6px_rgba(255,255,255,0.2)]">
              ●
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}