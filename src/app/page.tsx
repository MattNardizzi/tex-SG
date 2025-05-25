'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
// import { MutationLogPanelR3F as MutationLogPanel } from '@/components/panels/FiberPanels';
import SovereignStatusPanel from '@/components/panels/SovereignStatusPanel';
import MarketTicker from '@/components/ui/MarketTicker';
import SovereignTextbox from '@/components/ui/SovereignTextbox';

// ✅ Dynamic R3F Canvas
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
      {/* ✅ Market Ticker */}
      <MarketTicker />

      {/* ✅ Panels */}
      {isClient && (
        <>
          {/*
          <div className="absolute top-20 left-8 z-20">
            <MutationLogPanel />
          </div>
          */}
          <div className="absolute top-20 right-8 z-20 text-right">
            <SovereignStatusPanel />
          </div>
        </>
      )}

      {/* ✅ 3D Canvas */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        {isClient && <SpineCanvas />}
      </div>

      {/* ✅ Input Console */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30">
        <SovereignTextbox />
      </div>
    </div>
  );
}