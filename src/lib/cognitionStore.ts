import { create } from 'zustand'

type CognitionState = {
  pulse: number
  nodes: number[]
  setPulse: (v: number) => void
  setNodes: (n: number[]) => void
}

const useCognition = create<CognitionState>((set) => ({
  pulse: 1,
  nodes: Array.from({ length: 12 }, (_, i) => i * 1.5 - 9),
  setPulse: (v) => set({ pulse: v }),
  setNodes: (n) => set({ nodes: n }),
}))

export default useCognition