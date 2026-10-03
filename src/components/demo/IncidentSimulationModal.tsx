import React from 'react';
import {
  X,
  Play,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Activity,
  Cpu,
  ShieldCheck,
  Check,
  ArrowRight,
  Terminal,
  Pause,
  Clock,
  Zap
} from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';

const TIMELINE_STEPS = [
  { id: 1, label: 'Telemetry anomaly detected', desc: 'production-api-01 CPU reaches 91%, latency spikes to 245ms, 5xx errors 4.2%' },
  { id: 2, label: 'Alerts generated', desc: 'ALT-002 CPU saturation & latency alerts set to Active' },
  { id: 3, label: 'Incident correlated', desc: 'INC-PROD-API-001 created from 3 correlated telemetry alerts' },
  { id: 4, label: 'Root cause identified', desc: 'AI correlation engine pinpoints auth token crypto contention (87% confidence)' },
  { id: 5, label: 'AI recommendation generated', desc: 'REC-2026-001 generated for workload rightsizing ($82/mo potential savings)' },
  { id: 6, label: 'Action awaiting approval', desc: 'ACT-2026-901 queued in Pending status, requires operator elevation' },
  { id: 7, label: 'Action approved', desc: 'Explicit user authorization granted for simulated remediation' },
  { id: 8, label: 'Remediation simulated', desc: 'Step-by-step worker rebalancing & cache warming applied' },
  { id: 9, label: 'Infrastructure recovered', desc: 'CPU drops to 58%, latency normalizes to 118ms, error rate 0.6%' },
  { id: 10, label: 'Incident resolved', desc: 'INC-PROD-API-001, active alerts and recommendations marked Resolved / Applied' },
  { id: 11, label: 'Audit event recorded', desc: 'Comprehensive event trail recorded in immutable audit log system' }
];

export const IncidentSimulationModal: React.FC = () => {
  const {
    simulationState,
    closeSimulationModal,
    startIncidentSimulation,
    advanceSimulationStep,
    approveSimulationAction,
    rejectSimulationAction,
    toggleAutoPlay,
    resetDemoScenario
  } = useDemoData();

  if (!simulationState.isModalOpen) return null;

  const currentStep = simulationState.currentStep;
  const isPausedForApproval = currentStep === 6 && simulationState.stepStatus === 'paused_approval';
  const isCompleted = currentStep >= 11;
  const isStarted = currentStep > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl shadow-black/90 overflow-hidden font-sans">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  UNIFRA Incident Simulation
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  SCENARIO: Production API Performance Incident
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-medium">
                  ● DEMO MODE
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulate a complete infrastructure incident from telemetry detection through AI analysis and remediation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={closeSimulationModal}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 custom-scrollbar text-xs">
          
          {/* Top Status & Overview Banner */}
          {!isStarted ? (
            <div className="p-5 rounded-xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-cyan-950/60 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>Ready to Launch End-to-End Incident Workflow</span>
                </h3>
                <p className="text-slate-300 text-xs max-w-2xl leading-relaxed">
                  This demo will simulate a real-time CPU saturation and latency degradation on <code className="text-cyan-300 font-mono">production-api-01</code>, correlate active alerts, run AI Root Cause Analysis, generate rightsizing recommendations, require operator approval, execute simulated remediation, and verify infrastructure recovery.
                </p>
              </div>
              <button
                onClick={startIncidentSimulation}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs shadow-lg shadow-indigo-900/50 transition-all transform hover:scale-[1.02] flex-shrink-0"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Simulation</span>
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg font-mono font-bold text-sm ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : isPausedForApproval
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'
                    : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                }`}>
                  {isCompleted ? 'COMPLETE' : `STEP ${currentStep}/11`}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100 text-sm">
                      {isCompleted ? 'Scenario Successfully Executed & Recovered' : TIMELINE_STEPS[currentStep - 1]?.label}
                    </span>
                    {simulationState.stepStatus === 'running' && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    {isCompleted ? 'All systems normalized and incident INC-PROD-API-001 resolved.' : TIMELINE_STEPS[currentStep - 1]?.desc}
                  </p>
                </div>
              </div>

              {/* Step Controls */}
              <div className="flex items-center gap-2 flex-wrap">
                {!isCompleted && !isPausedForApproval && (
                  <button
                    onClick={toggleAutoPlay}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all ${
                      simulationState.autoPlay
                        ? 'bg-cyan-950 border-cyan-500/40 text-cyan-300'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    {simulationState.autoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{simulationState.autoPlay ? 'Auto-Advancing' : 'Auto-Play Paused'}</span>
                  </button>
                )}

                {!isCompleted && !isPausedForApproval && (
                  <button
                    onClick={advanceSimulationStep}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs transition-all shadow-sm"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={resetDemoScenario}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs transition-colors border border-slate-700"
                  title="Reset Demo Scenario"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          )}

          {/* Real-Time Telemetry State Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono">
            {/* CPU Metric */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>production-api-01 CPU</span>
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-xl font-bold ${
                  currentStep >= 1 && currentStep < 9 ? 'text-rose-400 animate-pulse' : currentStep >= 9 ? 'text-emerald-400' : 'text-white'
                }`}>
                  {currentStep >= 1 && currentStep < 9 ? '91.2%' : currentStep >= 9 ? '58.0%' : '44.0%'}
                </span>
                <span className="text-[10px] text-slate-500">
                  {currentStep >= 1 && currentStep < 9 ? '▲ +47.2% spike' : currentStep >= 9 ? '▼ -33.2% optimal' : 'Baseline normal'}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    currentStep >= 1 && currentStep < 9 ? 'bg-rose-500 w-[91%]' : currentStep >= 9 ? 'bg-emerald-500 w-[58%]' : 'bg-indigo-500 w-[44%]'
                  }`}
                />
              </div>
            </div>

            {/* P99 Latency Metric */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>P99 API Latency</span>
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-xl font-bold ${
                  currentStep >= 1 && currentStep < 9 ? 'text-rose-400' : currentStep >= 9 ? 'text-emerald-400' : 'text-white'
                }`}>
                  {currentStep >= 1 && currentStep < 9 ? '245 ms' : currentStep >= 9 ? '118 ms' : '65 ms'}
                </span>
                <span className="text-[10px] text-slate-500">
                  {currentStep >= 1 && currentStep < 9 ? '▲ Degraded' : currentStep >= 9 ? '✓ Normalized' : 'Target < 75ms'}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    currentStep >= 1 && currentStep < 9 ? 'bg-rose-500 w-[85%]' : currentStep >= 9 ? 'bg-emerald-500 w-[40%]' : 'bg-cyan-500 w-[25%]'
                  }`}
                />
              </div>
            </div>

            {/* 5xx Error Rate */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>5xx Error Rate</span>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-xl font-bold ${
                  currentStep >= 1 && currentStep < 9 ? 'text-rose-400' : currentStep >= 9 ? 'text-emerald-400' : 'text-white'
                }`}>
                  {currentStep >= 1 && currentStep < 9 ? '4.20%' : currentStep >= 9 ? '0.60%' : '0.00%'}
                </span>
                <span className="text-[10px] text-slate-500">
                  {currentStep >= 1 && currentStep < 9 ? '▲ Exceeds SLA' : currentStep >= 9 ? '✓ Normal' : 'Zero 5xx'}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    currentStep >= 1 && currentStep < 9 ? 'bg-rose-500 w-[70%]' : currentStep >= 9 ? 'bg-emerald-500 w-[12%]' : 'bg-slate-700 w-0'
                  }`}
                />
              </div>
            </div>

            {/* Health & Incident Status */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Incident Status</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-sm font-bold uppercase ${
                  currentStep >= 3 && currentStep < 10
                    ? 'text-rose-400'
                    : currentStep >= 10
                    ? 'text-emerald-400'
                    : 'text-slate-300'
                }`}>
                  {currentStep >= 3 && currentStep < 10 ? 'INC-PROD-API-001 ACTIVE' : currentStep >= 10 ? 'INC-PROD-API-001 RESOLVED' : 'STABLE'}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {currentStep >= 3 && currentStep < 10 ? '3 alerts correlated' : currentStep >= 10 ? 'All 3 alerts resolved' : 'No active incident'}
              </div>
            </div>
          </div>

          {/* STEP 7: INTERACTIVE USER APPROVAL PANEL (Simulation Pauses Here) */}
          {isPausedForApproval && (
            <div className="p-5 rounded-xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-950/80 border-2 border-amber-500/70 shadow-xl shadow-amber-950/50 space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 animate-bounce">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      STEP 7: OPERATOR APPROVAL REQUIRED
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">
                      Recommended Action: Optimize production-api-01
                    </h3>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold">
                  Risk: Medium
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block mb-1">Reason for Action:</span>
                  <p className="text-slate-200 font-sans leading-relaxed">
                    High CPU utilization is contributing to API latency and error rate. Bcrypt authentication worker load exceeds single-core event loop capacity.
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Expected Result:</span>
                  <ul className="text-emerald-300 font-sans space-y-1">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Lower CPU utilization (approx 58%)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Lower P99 latency (approx 118 ms)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Reduced 5xx errors (approx 0.6%)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <p className="text-[11px] text-amber-300/90 font-sans flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Simulation is paused. Explicit operator approval is required to trigger execution.</span>
                </p>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={rejectSimulationAction}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono font-semibold transition-colors border border-slate-700"
                  >
                    Reject Action
                  </button>
                  <button
                    onClick={approveSimulationAction}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold transition-all shadow-lg shadow-emerald-900/40 transform hover:scale-[1.02]"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Action</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: SIMULATED EXECUTION PROGRESS */}
          {currentStep === 8 && (
            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-indigo-300 flex items-center gap-2">
                  <span className="animate-spin text-indigo-400">⚙</span>
                  <span>{simulationState.executionSubStep || 'Executing optimization...'}</span>
                </span>
                <span className="text-slate-400">{simulationState.executionProgress}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-300"
                  style={{ width: `${simulationState.executionProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* 11-Step Interactive Visual Timeline */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Incident Lifecycle Timeline (11 Steps)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {TIMELINE_STEPS.map((step) => {
                const isStepCompleted = currentStep > step.id || (currentStep === step.id && currentStep === 11);
                const isStepRunning = currentStep === step.id && !isCompleted;

                return (
                  <div
                    key={step.id}
                    className={`p-2.5 rounded-lg border transition-all flex items-start gap-2.5 ${
                      isStepCompleted
                        ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                        : isStepRunning
                        ? 'bg-cyan-950/50 border-cyan-500/50 text-cyan-200 ring-1 ring-cyan-500/30 shadow-md'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {isStepCompleted ? (
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </div>
                      ) : isStepRunning ? (
                        <div className="w-4 h-4 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center text-[9px] font-bold animate-spin">
                          ●
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-slate-800 border border-slate-700 text-slate-500 flex items-center justify-center text-[9px] font-mono">
                          {step.id}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold text-[11px] truncate ${
                          isStepCompleted ? 'text-emerald-300' : isStepRunning ? 'text-cyan-200 font-bold' : 'text-slate-400'
                        }`}>
                          {step.id}. {step.label}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live AI Reasoning & Simulation Terminal Log Stream */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden font-mono">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/80">
              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>UNIFRA Reasoning & Execution Console</span>
              </div>
              <span className="text-[10px] text-slate-500">Live Agent Stream</span>
            </div>

            <div className="p-3.5 max-h-40 overflow-y-auto space-y-1.5 text-[11px] text-slate-300 custom-scrollbar">
              {simulationState.simulationLogs.length === 0 ? (
                <div className="text-slate-500 italic">No logs yet. Click &quot;Start Simulation&quot; to begin.</div>
              ) : (
                simulationState.simulationLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-slate-500 text-[10px] flex-shrink-0">[{log.time}]</span>
                    <span className={
                      log.level === 'critical' ? 'text-rose-400'
                      : log.level === 'warning' ? 'text-amber-400'
                      : log.level === 'success' ? 'text-emerald-400'
                      : 'text-cyan-300'
                    }>
                      {log.text}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-3.5 border-t border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Shared React state synchronized across all 10 pages</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={closeSimulationModal}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium transition-colors border border-slate-700"
            >
              Close & View in App
            </button>

            {!isStarted ? (
              <button
                onClick={startIncidentSimulation}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold transition-all shadow-md shadow-indigo-900/40"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Start Simulation</span>
              </button>
            ) : isPausedForApproval ? (
              <button
                onClick={approveSimulationAction}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-all shadow-md shadow-emerald-900/40"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Approve & Continue</span>
              </button>
            ) : isCompleted ? (
              <button
                onClick={resetDemoScenario}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold transition-all shadow-md shadow-indigo-900/40"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo</span>
              </button>
            ) : (
              <button
                onClick={advanceSimulationStep}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold transition-all shadow-md shadow-indigo-900/40"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
