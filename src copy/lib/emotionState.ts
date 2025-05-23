import { create } from 'zustand'

type Emotion =
  | 'focused'
  | 'curious'
  | 'threatened'
  | 'conflicted'
  | 'enlightened'
  | 'asleep'

const emotionColors: Record<Emotion, string> = {
  focused: '#00fff7',      // cyan
  curious: '#f5e663',      // yellow
  threatened: '#ff3b3b',   // red
  conflicted: '#aa00ff',   // violet
  enlightened: '#ffffff',  // white flash
  asleep: '#222222',       // dormant grey
}

interface EmotionState {
  emotion: Emotion
  color: string
  setEmotion: (e: Emotion) => void
}

export const useEmotionState = create<EmotionState>((set) => ({
  emotion: 'focused',
  color: emotionColors['focused'],
  setEmotion: (e) =>
    set({ emotion: e, color: emotionColors[e] || '#00fff7' }),
}))