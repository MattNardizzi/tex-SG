// src/state/TexContext.tsx

import { createContext } from 'react';

// 🔵 Mood → Color map
const emotionColorMap: Record<string, string> = {
  Focused: '#00ffaa',
  Alert: '#ffcc00',
  Angry: '#ff0040',
  Calm: '#00e0ff',
  Curious: '#bb00ff',
  Offline: '#333333',
};

interface TexState {
  emotion: string;
  pulse: number;
  emotionColor: string;
}

// 🔁 Default fallback (safe mode)
const defaultState: TexState = {
  emotion: 'Focused',
  pulse: 0.2,
  emotionColor: emotionColorMap['Focused'],
};

// 🔧 Context setup (inactive for now)
const _TexStateContext = createContext<TexState>(defaultState);

// ✅ Safe-mode hook returning static state
export const useTexState = () => {
  return defaultState;
};