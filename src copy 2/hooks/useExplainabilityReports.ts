import { useEffect, useState } from 'react';

type AlphaExplanation = {
  cycleId: string;
  timestamp: string;
  emotion: string;
  regret: number;
  coherence: number;
  confidence: number;
  urgency: number;
  reasoning: string;
};

export function useExplainabilityReports(): AlphaExplanation[] {
  const [reports, setReports] = useState<AlphaExplanation[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (
          data?.cycleId &&
          typeof data.regret === 'number' &&
          typeof data.reasoning === 'string'
        ) {
          const report: AlphaExplanation = {
            cycleId: data.cycleId,
            timestamp: data.timestamp ?? new Date().toISOString(),
            emotion: data.emotion ?? 'neutral',
            regret: data.regret ?? 0,
            coherence: data.coherence ?? 0,
            confidence: data.confidence ?? 0,
            urgency: data.urgency ?? 0,
            reasoning: data.reasoning ?? 'No explanation recorded.',
          };

          setReports((prev) => [report, ...prev.slice(0, 14)]);
        }
      } catch (err) {
        console.warn('❌ Explainability stream error:', err);
      }
    };

    ws.onerror = (err) => console.error('WebSocket error:', err);
    ws.onclose = () => console.log('Explainability WebSocket closed');

    return () => ws.close();
  }, []);

  return reports;
}