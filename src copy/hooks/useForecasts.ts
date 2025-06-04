import { useEffect, useState } from 'react';

type Forecast = {
  futureTitle: string;
  domain: string;
  confidence: number;
  urgency: number;
  coherence: number;
  emotion: string;
  riskLevel: 'LOW RISK' | 'MEDIUM RISK' | 'HIGH RISK';
  timestamp: string;
};

export function useForecasts(): Forecast[] {
  const [forecasts, setForecasts] = useState<Forecast[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (
          data.futureTitle &&
          typeof data.confidence === 'number' &&
          typeof data.urgency === 'number' &&
          typeof data.coherence === 'number'
        ) {
          const forecast: Forecast = {
            futureTitle: data.futureTitle,
            domain: data.domain || 'unknown',
            confidence: data.confidence,
            urgency: data.urgency,
            coherence: data.coherence,
            emotion: data.emotion || 'neutral',
            riskLevel: data.riskLevel || 'LOW RISK',
            timestamp: data.timestamp || new Date().toISOString(),
          };

          setForecasts((prev) => [forecast, ...prev.slice(0, 11)]); // Keep latest 12
        }
      } catch (err) {
        console.warn('❌ Forecast stream error:', err);
      }
    };

    ws.onerror = (e) => console.error('WebSocket error:', e);
    ws.onclose = () => console.log('WebSocket closed');

    return () => ws.close();
  }, []);

  return forecasts;
}