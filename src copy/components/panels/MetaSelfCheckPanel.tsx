'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const generateMetaSnapshot = () => {
  const randomFloat = (min: number, max: number, decimals = 3) =>
    parseFloat((Math.random() * (max - min) + min).toFixed(decimals))
  const randomChoice = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

  return {
    driftScore: randomFloat(0.01, 0.27),
    coherenceDrop: -1 * randomFloat(0.04, 0.18),
    biasDetected: Math.random() < 0.35,
    reflexTrigger: randomChoice([
      'goal_engine',
      'self_reflective_loop',
      'meta_self_check',
      'sovereign_loop_auto',
    ]),
    patchTarget: randomChoice([
      'tex_core.main_loop',
      'goal_engine.interruptor',
      'meta_learning.regulator',
      'emotion_heuristics.calibrator',
    ]),
    quote: randomChoice([
      '“Override triggered due to contradiction stack.”',
      '“Recursive self-patch confirmed under drift.”',
      '“Bias mitigation applied: emotion bias = curiosity”',
      '“Autonomous correction cycle complete.”',
    ]),
  }
}

export default function MetaSelfCheckPanel() {
  const [data, setData] = useState(generateMetaSnapshot())
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateMetaSnapshot())
      setIndex((prev) => prev + 1)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative flex flex-col justify-between h-full w-full text-white font-body text-xs leading-tight bg-gradient-to-br from-red-900 via-black to-[#330000] border border-red-500/30 rounded-2xl px-4 py-3 overflow-hidden shadow-[0_0_40px_#ff444444]">
      {/* Background FX */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-64 h-64 -translate-x-1/2 bg-red-400/10 rounded-full blur-[90px] animate-pulse" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center font-display text-[11px] tracking-[0.3em] uppercase leading-tight text-red-400 pt-[1px] pb-0">
        Meta-Self Check
      </div>

      {/* Data Display */}
      <div className="relative z-10 flex-grow flex flex-col justify-center items-center text-[8px] leading-snug text-white/90">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[92%] space-y-[1px]"
          >
            <div className="flex justify-between font-body">
              <span className="text-yellow-300">DRIFT SCORE</span>
              <span className="text-orange-400 font-mono">{data.driftScore.toFixed(3)}</span>
            </div>
            <div className="flex justify-between font-body">
              <span className="text-yellow-300">COHERENCE DROP</span>
              <span className="text-blue-300 font-mono">{data.coherenceDrop.toFixed(3)}</span>
            </div>
            <div className="flex justify-between font-body">
              <span className="text-yellow-300">BIAS FLAG</span>
              <span className={data.biasDetected ? 'text-red-400 animate-pulse font-mono' : 'text-white/40 font-mono'}>
                {data.biasDetected ? 'TRUE' : 'FALSE'}
              </span>
            </div>
            <div className="flex justify-between pt-1 font-body">
              <span className="text-yellow-300">REFLEX TRIGGER</span>
              <span className="text-purple-300 font-mono">{data.reflexTrigger}</span>
            </div>
            <div className="flex justify-between font-body">
              <span className="text-yellow-300">LAST PATCH</span>
              <span className="text-cyan-300 font-mono">{data.patchTarget}</span>
            </div>
            <div className="pt-2 text-center text-white/70 text-[7.4px] italic font-body">
              {data.quote}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}