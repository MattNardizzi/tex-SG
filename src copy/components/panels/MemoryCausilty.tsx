'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const agents = ['logic', 'emotion', 'skeptic'] as const;
const emotions = ['resolve', 'doubt', 'hope', 'curiosity', 'anger'];

const generateCausalNode = () => {
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  return {
    timestamp: new Date().toISOString(),
    thought: 'What patterns should I be aware of?',
    decision: pick(agents),
    emotion: pick(emotions),
    override_triggered: Math.random() < 0.2,
    coherence: parseFloat((Math.random() * 0.3 + 0.6).toFixed(3)),
    foresight: parseFloat((Math.random() * 0.3 + 0.6).toFixed(3)),
    drift_score: parseFloat((Math.random() * 0.1).toFixed(3)),
  };
};

const MemoryCausalityViewer = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const refresh = () => {
      const generated = Array.from({ length: 5 }, generateCausalNode);
      setNodes(generated);
    };
    refresh();
    const interval = setInterval(refresh, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-4 shadow-xl text-white w-full h-full">
      <h2 className="text-red-400 text-sm tracking-wider mb-2">MEMORY CAUSALITY VIEWER</h2>
      <div className="space-y-3">
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            className="bg-gradient-to-r from-black/40 to-red-900/30 rounded-lg p-3 border border-white/10"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <div className="text-sm mb-1">
              🧠 <span className="text-white">"{node.thought}"</span>
            </div>
            <div className="grid grid-cols-2 text-xs gap-1">
              <div>Decision: <span className="text-cyan-300">{node.decision}</span></div>
              <div>Emotion: <span className="text-pink-400">{node.emotion}</span></div>
              <div>Coherence: <span className="text-green-400">{node.coherence}</span></div>
              <div>Foresight: <span className="text-purple-300">{node.foresight}</span></div>
              <div>Drift Score: <span className="text-yellow-300">{node.drift_score}</span></div>
              <div>
                Override: {node.override_triggered ? <span className="text-red-500 font-bold">⚡ YES</span> : <span className="text-gray-400">—</span>}
              </div>
            </div>
            <div className="text-[10px] text-right text-gray-500 mt-1">{new Date(node.timestamp).toLocaleTimeString()}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MemoryCausalityViewer;