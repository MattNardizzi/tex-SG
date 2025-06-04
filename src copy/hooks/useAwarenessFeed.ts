import { useEffect, useState } from 'react';

type AwarenessState = {
  emotion: string;
  urgency: number;
  coherence: number;
  suggestedPatch: string;
  timestamp: string;
};

export function useAwarenessFeed(): AwarenessState[] {
  const [feed, setFeed] = useState<AwarenessState[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.emotion && typeof data.urgency === 'number' && typeof data.coherence === 'number') {
          const newEntry: AwarenessState = {
            emotion: data.emotion,
            urgency: data.urgency,
            coherence: data.coherence,
            suggestedPatch: data.suggested_patch ?? 'none',
            timestamp: data.timestamp ?? new Date().toISOString(),
          };

          setFeed((prev) => [newEntry, ...prev.slice(0, 9)]); // Show last 10 entries
        }
      } catch (err) {
        console.warn('❌ Invalid awareness data:', err);
      }
    };

    ws.onerror = (err) => console.error('WebSocket error:', err);
    ws.onclose = () => console.log('WebSocket closed');

    return () => ws.close();
  }, []);

  return feed;
}