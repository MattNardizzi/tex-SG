'use client';
import React, { useEffect, useState } from 'react';

export default function TexBootScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDone();
    }, 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, [onDone]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black text-white text-2xl font-mono tracking-widest animate-fadeIn">
      <div className="text-center">
        <div className="text-[#00f0ff] text-[26px] mb-2">Tex Brain Online</div>
        <div className="text-white/60 text-sm">Sovereign Cognition Activated</div>
      </div>
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeInOut 3s ease-in-out forwards;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}