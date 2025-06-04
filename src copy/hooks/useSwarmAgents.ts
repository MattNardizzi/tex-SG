import { useEffect, useState } from 'react';

type SwarmAgent = {
  id: string;
  emotion: string;
  cognition: number;
  survival: number;
  bias: string;
};

type SwarmSnapshot = {
  agents: SwarmAgent[];
  averageSurvival: number;
  cycle: number;
  timestamp: string;
};

export function useSwarmAgents(): SwarmSnapshot {
  const [snapshot, setSnapshot] = useState<SwarmSnapshot>({
    agents: [],
    averageSurvival: 0,
    cycle: 0,
    timestamp: '',
  });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (Array.isArray(data.agents)) {
          const agents = data.agents.map((a: any) => ({
            id: a.id ?? 'unknown',
            emotion: a.emotion ?? 'neutral',
            cognition: typeof a.cognition === 'number' ? a.cognition : 0,
            survival: typeof a.survival === 'number' ? a.survival : 0,
            bias: a.bias ?? 'adaptive',
          }));

          setSnapshot({
            agents,
            averageSurvival: typeof data.averageSurvival === 'number' ? data.averageSurvival : 0,
            cycle: data.cycle ?? 0,
            timestamp: data.timestamp ?? new Date().toISOString(),
          });
        }
      } catch (err) {
        console.warn('❌ Failed to parse swarm agent data:', err);
      }
    };

    ws.onerror = (e) => console.error('WebSocket error:', e);
    ws.onclose = () => console.log('🛑 Swarm WebSocket closed');

    return () => ws.close();
  }, []);

  return snapshot;
}