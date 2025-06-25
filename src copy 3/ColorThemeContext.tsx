// context/ColorThemeContext.tsx
'use client'

import { createContext, useContext } from 'react'

export const colorMap = {
  A1: '#00F0FF', B1: '#FF365D', C1: '#00F0FF',
  A2: '#FF365D', B2: '#00F0FF', C2: '#FF365D',
  A3: '#5A6BFF', B3: '#D74EFF', C3: '#5A6BFF',
  A4: '#D74EFF', B4: '#5A6BFF', C4: '#D74EFF',
}

const ColorThemeContext = createContext(colorMap)

export const useColorTheme = () => useContext(ColorThemeContext)

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ColorThemeContext.Provider value={colorMap}>
      {children}
    </ColorThemeContext.Provider>
  )
}
