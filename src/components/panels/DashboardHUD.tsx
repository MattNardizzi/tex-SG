'use client';

import React from 'react';
import CognitionCorePanel from './CognitionCorePanel';
import AlphaStrategyPanel from './AlphaStrategyPanel';
import MutationLogPanel from './MutationLogPanel';
import ShadowAgentArenaPanel from './ShadowAgentArenaPanel';
import AlphaExplanationPanel from './AlphaExplanationPanel';
import MultiverseMemoryPanel from './MultiverseMemoryPanel';
import OverrideReflexPanel from './OverrideReflexPanel';
import AeonDeltaPanel from './AeonDeltaPanel';

export default function DashboardHUD() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center px-4 py-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pointer-events-auto">
        <CognitionCorePanel
          cycle={2}
          goal="Evaluate systemic contagion risk"
          emotion="curious"
          confidence={0.935}
          coherence={0.87}
          urgency={0.72}
          timestamp="2025-05-28T20:49:04Z"
        />

        <AlphaStrategyPanel
          action="DIVERSIFY"
          bias="STRATEGIC"
          future="Bitcoin regulatory ban"
          confidence={0.821}
          coherence={0.87}
          riskScore={0.803}
          volatility={0.022}
          portfolio={{
            equities: 0.25,
            bonds: 0.15,
            alternatives: 0.45,
            cash: 0.15,
          }}
          swarmEmotion={{
            hope: 7,
            fear: 3,
            resolve: 4,
            curiosity: 8,
            anger: 1,
          }}
          timestamp="2025-05-28T20:49:04Z"
        />

        <MutationLogPanel
          mutationId="forced_mutation_2025-05-28T20:49:01.629461+00:00"
          reason="cognitive_stall"
          targetModule="tex_core.main_loop"
          overrideTriggered={true}
          success={true}
          timestamp="2025-05-28T20:49:01Z"
        />

        <ShadowAgentArenaPanel
          cycle={2}
          selectedId="3fb3752a"
          impactScore={0.8194}
          topAgents={[
            { id: '3fb3752a', bias: 'hope', score: 0.989, delta: 0.011 },
            { id: '6063fc54', bias: 'hope', score: 0.978, delta: 0.022 },
            { id: 'c1046f70', bias: 'resolve', score: 0.784, delta: 0.216 },
          ]}
        />

        <AlphaExplanationPanel
          explanation="Tex selected this approach based on emotional modulation, memory-driven awareness, and real-time swarm feedback. Confidence is further reinforced via mutation awareness and future volatility projections."
          timestamp="2025-05-28T20:49:03Z"
          confidence={0.821}
          coherence={0.87}
          urgency={0.72}
        />

        <MultiverseMemoryPanel
          universes={[
            { id: 'd239fe59-5554-4647-aa31-26540e86519a', divergence: 1.127, chaos: true },
            { id: '4851f2f2-1139-4b22-ba94-ae358f9eb2a4', divergence: 0.218, chaos: false },
            { id: '3cfa4468-a2a1-451f-83ee-17042af0979c', divergence: 0.487, chaos: false },
          ]}
          timestamp="2025-05-28T20:49:04Z"
        />

        <OverrideReflexPanel
          triggered={false}
          context="strategy_mutation_escalation"
          foresight="STAGNATION"
          confidence={0.935}
          score={0.616}
          timestamp="2025-05-28T20:49:04Z"
        />

        <AeonDeltaPanel
          feedback={{
            logic: "What patterns should I be aware of?",
            logicVerdict: "✅ Logical",
            emotion: "hope",
            emotionTrigger: "What patterns should I be aware of?",
            skeptic: "Challenge",
            skepticNote: "Requires more evidence",
            score: 0.566,
          }}
          timestamp="2025-05-28T20:49:04Z"
        />
      </div>
    </div>
  );
}