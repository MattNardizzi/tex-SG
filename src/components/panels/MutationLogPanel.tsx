'use client'

import { useEffect, useState } from 'react'

export default function MutationLogPanel() {
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    setLogs([generateLog(), generateLog(), generateLog()])
    const interval = setInterval(() => {
      const newLog = generateLog()
      setLogs((prev) => [newLog, ...prev.slice(0, 2)])
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-10 left-1/2 -translate-x-[160px] z-50 w-[220px]">
      <div className="bg-black/20 border border-white/10 backdrop-blur-sm rounded-md p-2 shadow-[inset_0_0_2px_#ffffff03,_0_0_3px_#00ffff06] text-white text-[10px] leading-tight font-grotesk space-y-1">
        <div className="text-[8px] text-cyan-200/80 font-semibold uppercase tracking-wider">
          TEX: SOVEREIGN COGNITION
        </div>

        {logs.map((log, idx) => (
          <div key={idx} className="text-white/75 text-[9px] font-light leading-tight break-words">
            {log}
          </div>
        ))}

        <div className="text-[7px] text-right text-neutral-500 italic mt-1">
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