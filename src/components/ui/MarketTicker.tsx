'use client';

import React, { useEffect, useState } from 'react';

type TickerData = {
  [symbol: string]: {
    price: number;
    change: number | null;
    direction: 'up' | 'down' | 'neutral';
  };
};

const MarketTicker = () => {
  const [data, setData] = useState<TickerData>({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/polygon');

    ws.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data);
        setData((prev) => ({ ...prev, ...update }));
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div className="w-screen bg-black/80 px-8 py-2 fixed top-0 left-0 z-50 text-green-400 font-mono text-sm border-b border-white/10 shadow-lg backdrop-blur-md flex items-center justify-center gap-6">
      {Object.keys(data).length === 0 ? (
        <span className="text-gray-400">Waiting for data...</span>
      ) : (
        Object.entries(data).map(([symbol, { price }]) => (
          <div key={symbol}>
            {symbol.toUpperCase()}: ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
          </div>
        ))
      )}
    </div>
  );
};

export default MarketTicker;