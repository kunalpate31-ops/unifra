import React from 'react';
import { Sparkles, ArrowRight, Zap, RotateCcw } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';

export const SimulationQuickBanner: React.FC = () => {
  const {
    simulationState,
    openSimulationModal,
    approveSimulationAction,
    resetDemoScenario
  } = useDemoData();

  if (!simulationState.isActive && simulationState.currentStep === 0) return null;

  const currentStep = simulationState.currentStep;
  const isPaused = currentStep === 6 && simulationState.stepStatus === 'paused_approval';
  const isCompleted = currentStep >= 11;

  return (
    <div className="w-full bg-gradient-to-r from-slate-950 via-indigo-950/90 to-slate-950 border-b border-indigo-500/30 px-4 sm:px-6 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 z-30 animate-in slide-in-from-top-2 duration-200">
      <div className="flex items-center gap-2.5 flex-wrap">
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
            isCompleted ? 'bg-emerald-400' : isPaused ? 'bg-amber-400' : 'bg-cyan-400'
          } opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${
            isCompleted ? 'bg-emerald-500' : isPaused ? 'bg-amber-500' : 'bg-cyan-500'
          }`}></span>
        </span>

        <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>INCIDENT DEMO SCENARIO:</span>
        </span>

        <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
          isCompleted
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            : isPaused
            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
            : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
        }`}>
          {isCompleted
            ? 'INCIDENT RESOLVED & RECOVERED (11/11)'
            : isPaused
            ? 'STEP 7/11: OPERATOR APPROVAL REQUIRED'
            : `STEP ${currentStep}/11 ACTIVE`}
        </span>

        <span className="text-xs text-slate-300 hidden md:inline">
          {isCompleted
            ? 'production-api-01 restored to healthy 58% CPU / 118ms latency'
            : isPaused
            ? 'Review and approve optimization action for production-api-01'
            : 'Cross-page shared state updating across /monitoring, /alerts, /analysis, /actions'}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {isPaused && (
          <button
            onClick={approveSimulationAction}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs shadow-md shadow-emerald-900/40 transition-all"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Approve Action</span>
          </button>
        )}

        <button
          onClick={openSimulationModal}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-semibold text-xs shadow-sm transition-all"
        >
          <span>Open Simulation Console</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={resetDemoScenario}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Reset Demo Scenario"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
