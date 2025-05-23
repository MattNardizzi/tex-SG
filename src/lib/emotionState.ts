// emotionState.ts
import { create } from 'zustand'

// Define all supported emotions
export type Emotion =
  | 'focused'
  | 'curious'
  | 'threatened'
  | 'conflicted'
  | 'enlightened'
  | 'asleep'

// Bold, futuristic color mapping for each emotion
export const emotionColors: Record<Emotion, string> = {
  focused:     '#00fff7', // Neon cyan
  curious:     '#f5e663', // Luminous yellow
  threatened:  '#ff3b3b', // Alert red
  conflicted:  '#aa00ff', // Vivid violet
  enlightened: '#ffffff', // Blinding white
  asleep:      '#222222', // Dim sleep grey
}

// Global emotion store for Tex
interface EmotionState {
  emotion: Emotion
  color: string
  setEmotion: (e: Emotion) => void
}

export const useEmotionState = create<EmotionState>((set) => ({
  emotion: 'focused',
  color: emotionColors['focused'],
  setEmotion: (e: Emotion) =>
    set({
      emotion: e,
      color: emotionColors[e] || '#00fff7', // fallback color
    }),
}))