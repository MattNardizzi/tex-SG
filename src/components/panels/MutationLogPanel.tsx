'use client'

import { useEffect, useState } from 'react'

export default function MutationLogPanel() {
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    // Set 3 logs immediately on mount
    setLogs([
      generateLog(),
      generateLog(),
      generateLog()
    ])

    // Append one new log every 3 seconds
    const interval = setInterval(() => {
      const newLog = generateLog()
      setLogs((prev) => [newLog, ...prev.slice(0, 2)])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute top-12 left-6 z-40">
      <div className="relative flex flex-col gap-1.5 bg-black/20 border border-white/10 backdrop-blur-sm rounded-md px-2 py-1.5 shadow-[inset_0_0_2px_#ffffff03,_0_0_3px_#00ffff06] max-w-[180px] text-white">
        
        {/* Header */}
        <div className="text-[8px] text-cyan-200/80 font-semibold uppercase tracking-wider mb-1">
          TEX: SOVEREIGN COGNITION
        </div>

        {/* Logs */}
        {logs.map((log, idx) => (
          <span
            key={idx}
            className="text-[9px] text-white/75 font-light leading-tight whitespace-normal break-words pl-[2px]"
          >
            {log}
          </span>
        ))}

        {/* Footer */}
        <div className="mt-2 text-[7px] text-right text-neutral-500 italic">
          Cognitive Mutation Log
        </div>
      </div>
    </div>
  )
}

function generateLog() {
  const samples = [
    'Agent 0: aggression spike → 0.63',
    'Agent 2: curiosity spike → 0.74',
    'Memory stored: bias = aggressive',
    'Memory stored: fear ↑, resolve ↑',
    'Trait rewrite: greed suppressed',
    'Emotion path split → anger | hope',
    'Cortex divergence: Agent 3',
    'Swarm snapshot: 22:47:01',
  ]
  return samples[Math.floor(Math.random() * samples.length)]
}