import { create } from 'zustand';

interface SovereignStore {
  logs: string[];
  addLog: (log: string) => void;
}

export const useSovereignStore = create<SovereignStore>((set) => ({
  logs: [],
  addLog: (log) =>
    set((state) => ({
      logs: [log, ...state.logs.slice(0, 10)],
    })),
}));