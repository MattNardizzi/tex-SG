import { useEffect, useState } from 'react';

type Hallucination = {
  simId: string;
  theme: string;
  confidence: number;
  coherence: number;
  emotion: string;
  timestamp: string;
};

export function useHallucinationFeed(): Hallucination[] {
  const [hallucinations, setHallucinations] = useState<Hallucination[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (
          data?.simId &&
          typeof data.theme === 'string' &&
          typeof data.confidence === 'number'
        ) {
          const hallucination: Hallucination = {
            simId: data.simId,
            theme: data.theme,
            confidence: data.confidence ?? 0,
            coherence: data.coherence ?? 0,
            emotion: data.emotion ?? 'neutral',
            timestamp: data.timestamp ?? new Date().toISOString(),
          };

          setHallucinations((prev) => [hallucination, ...prev.slice(0, 14)]);
        }
      } catch (err) {
        console.warn('❌ Hallucination stream error:', err);
      }
    };

    ws.onerror = (e) => console.error('WebSocket error:', e);
    ws.onclose = () => console.log('Simulacrum WebSocket closed');

    return () => ws.close();
  }, []);

  return hallucinations;
}