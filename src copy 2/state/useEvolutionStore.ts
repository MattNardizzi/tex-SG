import { create } from 'zustand'

type EvolutionEntry = {
  cycle: number
  dominant_variant: string
  score: number
  sandbox_pass: boolean
  emotion: string
  timestamp: string
  source: string
}

type EvolutionStore = {
  logs: EvolutionEntry[]
  pushLog: (entry: EvolutionEntry) => void
  clearLogs: () => void
}

export const useEvolutionStore = create<EvolutionStore>((set, get) => ({
  logs: [],
  pushLog: (entry) => {
    const exists = get().logs.some(
      (e) => e.timestamp === entry.timestamp && e.dominant_variant === entry.dominant_variant
    )
    if (!exists) {
      set((state) => ({ logs: [...state.logs, entry] }))
    }
  },
  clearLogs: () => set({ logs: [] }),
}))