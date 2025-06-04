'use client'

import React from 'react'
import clsx from 'clsx'
import { useColorTheme } from '@/components/ui/ColorThemeContext';

export default function AGIPanelWrapper({
  gridSlot,
  children,
}: {
  gridSlot: string
  children: React.ReactNode
}) {
  const colorMap = useColorTheme()
  const color = colorMap[gridSlot] || '#ffffff'

  return (
    <div
      className={clsx(
        'rounded-xl p-4 overflow-hidden text-white font-mono shadow-lg backdrop-blur-md',
        'border border-white/10 flex flex-col min-h-0'
      )}
      style={{
        background: `linear-gradient(145deg, ${color}22, #00000011)`,
        boxShadow: `0 0 12px ${color}55`,
        fontSize: '0.875rem',
        lineHeight: '1.5',
        color: '#ffffff',
      }}
    >
      <div className="flex-grow overflow-hidden">{children}</div>
    </div>
  )
}
