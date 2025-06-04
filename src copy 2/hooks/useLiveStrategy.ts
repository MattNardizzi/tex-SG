import { useEffect, useState } from 'react';

type Strategy = {
  strategyId: string;
  action: string;
  futureTitle: string;
  bias: string;
  emotion: string;
  confidence: number;
  coherence: number;
  urgency: number;
  regret: number;
  timestamp: string;
  portfolio: {
    equities: number;
    bonds: number;
    alternatives: number;
    cash: number;
  };
};

export function useLiveStrategy(): Strategy | null {
  const [strategy, setStrategy] = useState<Strategy | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.strategyId && data.action) {
          setStrategy(data);
        }
      } catch (err) {
        console.warn('❌ Live strategy parse failed:', err);
      }
    };

    ws.onerror = (e) => console.error('WebSocket error:', e);
    ws.onclose = () => console.log('WebSocket closed');

    return () => ws.close();
  }, []);

  return strategy;
}