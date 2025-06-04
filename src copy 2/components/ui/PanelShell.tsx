'use client';
import React from 'react';

export default function PanelShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex items-center justify-center text-sm text-white
      bg-zinc-900 rounded-xl border border-white/10 
      shadow-[inset_0_0_0.5px_0.25px_rgba(255,255,255,0.05),_0_0_8px_rgba(168,85,247,0.04)]
      transition-all duration-200 ease-in-out
      hover:border-purple-400/20 hover:shadow-[0_0_20px_rgba(192,132,252,0.15)] hover:scale-[1.015]">
      {children}
    </div>
  );
}