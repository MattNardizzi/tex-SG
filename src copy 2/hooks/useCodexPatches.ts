import { useEffect, useState } from 'react';

type CodexPatch = {
  patchId: string;
  targetModule: string;
  logicType: 'heuristic' | 'causal' | 'emotional' | 'fallback';
  result: 'APPLIED' | 'REJECTED' | 'PENDING';
  cause: string;
  errorTag?: string;
  timestamp: string;
};

export function useCodexPatches(): CodexPatch[] {
  const [patches, setPatches] = useState<CodexPatch[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.patchId && data.targetModule && data.result) {
          const patch: CodexPatch = {
            patchId: data.patchId,
            targetModule: data.targetModule,
            logicType: data.logicType ?? 'fallback',
            result: data.result,
            cause: data.cause ?? 'unknown',
            errorTag: data.errorTag ?? '',
            timestamp: data.timestamp ?? new Date().toISOString(),
          };
          setPatches((prev) => [patch, ...prev.slice(0, 19)]);
        }
      } catch (err) {
        console.warn('❌ Invalid Codex patch payload:', err);
      }
    };

    ws.onerror = (e) => console.error('WebSocket error:', e);
    ws.onclose = () => console.log('WebSocket closed');

    return () => ws.close();
  }, []);

  return patches;
}