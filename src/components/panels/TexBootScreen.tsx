'use client';
import React, { useEffect, useState } from 'react';

export default function TexBootScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDone();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onDone]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black text-white text-2xl font-mono tracking-widest animate-fadeIn">
      <div className="text-center">
        <div className="text-[#00f0ff] text-[26px] mb-2">Tex Brain Online</div>
        <div className="text-white/60 text-sm">Sovereign Cognition Activated</div>
      </div>
    </div>
  );
}