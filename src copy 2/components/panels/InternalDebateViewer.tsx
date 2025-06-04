'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const agentLabels = ['LOGIC', 'EMOTION', 'SKEPTIC'] as const;
type AgentType = typeof agentLabels[number];

interface AgentEvent {
  id: number;
  agent: AgentType;
  verdict: string;
  emotion?: string;
  override?: boolean;
  confidence: number;
  coherence: number;
  regret: number;
}

const agentColors: Record<AgentType, string> = {
  LOGIC: 'text-cyan-300',
  EMOTION: 'text-rose-400',
  SKEPTIC: 'text-yellow-300',
};

function generateAgentEvent(id: number): AgentEvent[] {
  const emotions = ['hope', 'fear', 'joy', 'anger', 'curiosity'];
  const verdicts = {
    LOGIC: ['Verdict: Logical', 'Conclusion Verified', 'Inference Sound'],
    EMOTION: [
      `Emotion Triggered: ${emotions[Math.floor(Math.random() * emotions.length)]}`,
      `Emotional Cascade: ${emotions[Math.floor(Math.random() * emotions.length)]}`,
      'Affective Response Recorded',
    ],
    SKEPTIC: ['Challenge: Requires Evidence', 'Contradiction Noted', 'Inference Unclear'],
  };

  return agentLabels.map((agent) => ({
    id: id + Math.random(),
    agent,
    verdict: verdicts[agent][Math.floor(Math.random() * verdicts[agent].length)],
    confidence: parseFloat((Math.random() * 0.2 + 0.75).toFixed(3)),
    coherence: parseFloat((Math.random() * 0.2 + 0.7).toFixed(3)),
    regret: parseFloat((Math.random() * 0.3).toFixed(3)),
    override: Math.random() < 0.1,
  }));
}

export default function InternalDebateViewer() {
  const [events, setEvents] = useState<AgentEvent[][]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newRound = generateAgentEvent(count);
      setEvents((prev) => {
        const updated = [newRound, ...prev];
        return updated.slice(0, 2);
      });
      setCount((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl px-4 py-3 bg-gradient-to-br from-red-900 via-black to-[#330000] border border-red-500/30 shadow-[0_0_40px_#ff444444] text-white font-body">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 bg-red-400/10 rounded-full blur-[90px] animate-pulse" />
      </div>

      {/* Header (extra-tight spacing) */}
      <div className="relative z-10 text-center font-display text-[11px] tracking-[0.3em] uppercase leading-tight text-red-400 pt-[1px] pb-0">
        Internal Debate
      </div>

      {/* Debate Content */}
      <div className="relative z-10 px-3 pb-4 grid grid-cols-3 gap-[3px]">
        <AnimatePresence mode="wait">
          {events.length > 0 &&
            events[0].map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.5 }}
                className="px-1 text-fluid text-white/90"
              >
                <div className={`uppercase text-[8px] leading-tight ${agentColors[event.agent]} font-display`}>
                  {event.agent}
                </div>
                <div className="text-cyan-200 text-[8px] font-mono">
                  CONF: {event.confidence} · COH: {event.coherence}
                </div>
                <div className="italic text-white/85 text-[7px] leading-snug tracking-tight font-body">
                  ⟶ {event.verdict}
                  {event.override && (
                    <div className="text-[7px] text-red-400 mt-1">⚠ Override Flagged</div>
                  )}
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}