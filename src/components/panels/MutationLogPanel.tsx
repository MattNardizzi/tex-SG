'use client';

import { motion } from 'framer-motion';

interface Props {
  className?: string;
}

export default function MutationLogPanel({ className = '' }: Props) {
  return (
    <div className={`${className} z-40`}>
      <div className="relative flex flex-col gap-1.5 bg-black/20 border border-white/10 backdrop-blur-sm rounded-md px-2 py-1.5 shadow-[inset_0_0_2px_#ffffff03,_0_0_3px_#00ffff06] max-w-[180px] text-white">
        {/* Header */}
        <div className="text-[8px] text-cyan-200/80 font-semibold uppercase tracking-wider mb-1">
          TEX: SOVEREIGN COGNITION
        </div>
        <div className="text-[7px] text-white/40 font-medium mb-2 tracking-wide">
          Mutation Log
        </div>

        {/* Example Logs */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="text-[9px] font-light text-white/70"
        >
          Agent: aggression spike → 0.74
        </motion.div>

        <div className="mt-2 text-[7px] text-right text-neutral-500 italic">
          Cognitive Mutation Log
        </div>
      </div>
    </div>
  );
}