'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import MarketTicker from '@/components/ui/MarketTicker';
import DashboardHUD from '@/components/panels/DashboardHUD';

// 🎥 Load the spine dynamically (R3F WebGL canvas)
const SpineCanvas = dynamic(() => import('@/components/Spine/SpineCanvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
});

export default function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black text-white overflow-hidden font-sans antialiased">
      {/* 📈 Top Ticker Bar */}
      <MarketTicker />

      {/* 🧠 Sovereign Cognition Panels */}
      {isClient && <DashboardHUD />}

      {/* 🧬 3D Emotional Spine */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        {isClient && <SpineCanvas />}
      </div>
    </div>
  );
}