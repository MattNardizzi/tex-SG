import { useEffect, useState } from 'react';

type DebateTrace = {
  cycle: number;
  logic: string;
  logicVerdict: string;
  emotion: string;
  emotionTriggeredBy: string;
  skeptic: string;
  skepticNote: string;
  impactScore: number;
  foresight: number;
  timestamp: string;
};

export function useDebateTraces(): DebateTrace[] {
  const [traces, setTraces] = useState<DebateTrace[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data?.logic && data?.logicVerdict && data?.impactScore != null) {
          const trace: DebateTrace = {
            cycle: data.cycle ?? 0,
            logic: data.logic,
            logicVerdict: data.logicVerdict,
            emotion: data.emotion ?? 'neutral',
            emotionTriggeredBy: data.emotionTriggeredBy ?? 'unknown',
            skeptic: data.skeptic ?? 'skeptic',
            skepticNote: data.skepticNote ?? 'n/a',
            impactScore: data.impactScore ?? 0,
            foresight: data.foresight ?? 0,
            timestamp: data.timestamp ?? new Date().toISOString(),
          };

          setTraces((prev) => [trace, ...prev.slice(0, 14)]); // Keep last 15
        }
      } catch (err) {
        console.warn('❌ Debate trace format error:', err);
      }
    };

    ws.onerror = (e) => console.error('WebSocket error:', e);
    ws.onclose = () => console.log('WebSocket closed');

    return () => ws.close();
  }, []);

  return traces;
}