// components/panels/AeonDeltaPanel.tsx

'use client';

import React from 'react';

type AeonFeedback = {
  logic: string;
  logicVerdict: string;
  emotion: string;
  emotionTrigger: string;
  skeptic: string;
  skepticNote: string;
  score: number;
};

type AeonDeltaProps = {
  feedback: AeonFeedback;
  timestamp: string;
};

export default function AeonDeltaPanel({ feedback, timestamp }: AeonDeltaProps) {
  return (
    <div className="bg-black/80 border border-white/10 rounded-2xl p-6 shadow-xl w-full max-w-2xl text-white space-y-4 backdrop-blur-sm">
      <div className="text-xs uppercase tracking-widest text-indigo-400/80">
        🔍 AeonDelta Meta Feedback
      </div>

      <div className="space-y-2 text-sm font-mono text-white/80">
        <div>
          [LOGIC] {feedback.logicVerdict}: {feedback.logic}
        </div>
        <div>
          [EMOTION] ❤️ {feedback.emotion} triggered by: {feedback.emotionTrigger}
        </div>
        <div>
          [SKEPTIC] ❓ {feedback.skeptic}: {feedback.skepticNote}
        </div>
      </div>

      <div className="text-sm mt-4">
        Meta Score: <span className="font-bold text-white">{feedback.score.toFixed(3)}</span>
      </div>

      <div className="text-xs text-white/40 mt-4">Recorded: {timestamp}</div>
    </div>
  );
}