import { useEffect, useState } from 'react';

type MutationRecord = {
  cycle: number;
  mutationId: string;
  status: 'SUCCESS' | 'FAILURE' | 'RETRY';
  trigger: string;
  patchTarget: string;
  mutationType: string;
  description: string;
  hash: string;
  timestamp: string;
};

export function useMutationStream(): MutationRecord[] {
  const [mutations, setMutations] = useState<MutationRecord[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // Check if this looks like a mutation
        if (
          data?.mutationId &&
          data?.mutationType &&
          typeof data.description === 'string'
        ) {
          const record: MutationRecord = {
            cycle: data.cycle ?? 0,
            mutationId: data.mutationId,
            status: data.status ?? 'RETRY',
            trigger: data.trigger ?? 'unknown',
            patchTarget: data.patchTarget ?? 'core',
            mutationType: data.mutationType,
            description: data.description,
            hash: data.hash ?? 'nohash',
            timestamp: data.timestamp ?? new Date().toISOString(),
          };

          setMutations((prev) => [record, ...prev.slice(0, 19)]);
        }
      } catch (err) {
        console.warn('❌ Mutation parse error:', err);
      }
    };

    ws.onerror = (e) => console.error('WebSocket error:', e);
    ws.onclose = () => console.log('WebSocket closed');

    return () => ws.close();
  }, []);

  return mutations;
}