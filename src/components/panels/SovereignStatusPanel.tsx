'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function SovereignStatusPanel() {
  const [forkstreamData, setForkstreamData] = useState([
    { label: 'Dominant Trait', value: 'Loading...' },
    { label: 'Agent Focus', value: 'Loading...' },
    { label: 'Swarm Status', value: 'Loading...' },
  ])

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/tex')

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)

        const updated = [
          { label: 'Dominant Trait', value: data.dominant_trait || '—' },
          { label: 'Agent Focus', value: data.agent_focus || '—' },
          { label: 'Swarm Status', value: `Coherence ${Math.round((data.coherence || 0) * 100)}%` },
        ]

        setForkstreamData(updated)
      } catch (err) {
        console.error('WebSocket parse error:', err)
      }
    }

    socket.onerror = (event) => {
      console.error('WebSocket error:', event)
      alert('⚠️ WebSocket connection failed. Check server status and URL.')
    }

    return () => socket.close()
  }, [])

  return (
    <div className="absolute top-12 right-6 z-40">
      <div className="relative flex flex-col gap-1.5 bg-black/20 border border-white/10 backdrop-blur-sm rounded-md px-2 py-1.5 shadow-[inset_0_0_2px_#ffffff03,_0_0_3px_#00ffff06] max-w-[180px] text-white">
        
        {/* Header */}
        <div className="text-[8px] text-cyan-200/80 font-semibold uppercase tracking-wider mb-1">
          TEX: SOVEREIGN COGNITION
        </div>
        <div className="text-[7px] text-white/40 font-medium mb-2 tracking-wide">
          Godmind · Forkstream ⑂
        </div>

        {/* Forkstream Data */}
        {forkstreamData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15 }}
            className="flex justify-between text-[9px] font-light text-white/70"
          >
            <span>{item.label}</span>
            <span className="text-cyan-200/80">{item.value}</span>
          </motion.div>
        ))}

        {/* Footer */}
        <div className="mt-2 text-[7px] text-right text-neutral-500 italic">
          Sovereign Interface · Live Sync
        </div>
      </div>
    </div>
  )
}