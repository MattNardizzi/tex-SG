// File: state/useDebateStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

export type Agent = 'LOGIC' | 'EMOTION' | 'SKEPTIC';

export type DebateLog = {
  agent: Agent;
  text: string;
  confidence: number;
  regret: number;
  triggeredOverride: boolean;
  timestamp: string;
};

interface DebateStore {
  logs: Record<Agent, DebateLog[]>;
  lastUpdated: string | null;
  pushLog: (entry: DebateLog) => void;
  clearLogs: () => void;
}

export const useDebateStore = create<DebateStore>()(
  persist(
    (set, get) => ({
      logs: {
        LOGIC: [],
        EMOTION: [],
        SKEPTIC: [],
      },
      lastUpdated: null,

      pushLog: (entry) => {
        const updated = [entry, ...(get().logs[entry.agent] || [])].slice(0, 5);

        // 🚨 Trigger toast alert on override
        if (entry.triggeredOverride) {
          toast.warning(`⚠️ Override triggered by ${entry.agent}`, {
            description: entry.text,
            duration: 5000,
          });
        }

        set((state) => ({
          logs: {
            ...state.logs,
            [entry.agent]: updated,
          },
          lastUpdated: entry.timestamp,
        }));
      },

      clearLogs: () =>
        set(() => ({
          logs: {
            LOGIC: [],
            EMOTION: [],
            SKEPTIC: [],
          },
          lastUpdated: null,
        })),
    }),
    {
      name: 'tex-debate-log',
      version: 1,
    }
  )
);