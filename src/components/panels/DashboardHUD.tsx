'use client';

import React from 'react';
import SovereignCognitionPanel from './SovereignCognitionPanel';
import LiveStrategyConsole from './LiveStrategyConsole';
import MutationSandboxMonitor from './MutationSandboxMonitor';
import CodexPatchHistory from './CodexPatchHistory';
import ForecastRiskGrid from './ForecastRiskGrid';
import InternalDebateViewer from './InternalDebateViewer';
import SwarmIntelligenceMap from './SwarmIntelligenceMap';
import ExplainabilityConsole from './ExplainabilityConsole';
import SimulacrumHallucinationFeed from './SimulacrumHallucinationFeed';
import MultiverseMemoryPanel from './MultiverseMemoryPanel';
import AwarenessStream from './AwarenessStream';

export default function DashboardHUD() {
  return (
    <div className="grid grid-cols-3 gap-4 p-6 pt-28 min-h-screen bg-black text-white font-mono">
      {/* Row 1 */}
      <div className="bg-zinc-900 rounded-xl p-4 shadow-xl">
        <SovereignCognitionPanel />
      </div>
      <div className="bg-zinc-900 rounded-xl p-4 shadow-xl">
        <LiveStrategyConsole />
      </div>
      <div className="bg-zinc-900 rounded-xl p-4 shadow-xl">
        <MutationSandboxMonitor />
      </div>

      {/* Row 2 */}
      <div className="bg-zinc-900 rounded-xl p-4 shadow-xl">
        <CodexPatchHistory />
      </div>
      <div className="bg-purple-900/50 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-purple-500">
        <AwarenessStream />
      </div>
      <div className="bg-zinc-900 rounded-xl p-4 shadow-xl">
        <ForecastRiskGrid />
      </div>

      {/* Row 3 */}
      <div className="bg-zinc-900 rounded-xl p-4 shadow-xl">
        <InternalDebateViewer />
      </div>
      <div className="bg-purple-900/50 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-purple-500">
        <AwarenessStream />
      </div>
      <div className="bg-zinc-900 rounded-xl p-4 shadow-xl">
        <SwarmIntelligenceMap />
      </div>

      {/* Row 4 */}
      <div className="bg-zinc-900 rounded-xl p-4 shadow-xl">
        <ExplainabilityConsole />
      </div>
      <div className="bg-zinc-900 rounded-xl p-4 shadow-xl">
        <SimulacrumHallucinationFeed />
      </div>
      <div className="bg-zinc-900 rounded-xl p-4 shadow-xl">
        <MultiverseMemoryPanel />
      </div>
    </div>
  );
}