import React from 'react';
import { AnalysisIncident } from '../../types/analysis';
import {
  Sparkles,
  ShieldCheck,
  Server,
  Layers,
  ArrowRight,
  CheckCircle2,
  Zap,
  Info
} from 'lucide-react';

interface ProbableRootCauseSectionProps {
  incident: AnalysisIncident;
  onSelectResource: (resourceName: string) => void;
}

export const ProbableRootCauseSection: React.FC<ProbableRootCauseSectionProps> = ({
  incident,
  onSelectResource
}) => {
  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'text-rose-400 bg-rose-950/70 border-rose-500/40';
      case 'Medium':
        return 'text-amber-400 bg-amber-950/70 border-amber-500/30';
      case 'Low':
      default:
        return 'text-indigo-400 bg-indigo-950/70 border-indigo-500/30';
    }
  };

  const getConfidenceBadge = (conf: string) => {
    switch (conf) {
      case 'High':
        return 'text-emerald-400 bg-emerald-950/70 border-emerald-500/40';
      case 'Medium':
        return 'text-cyan-400 bg-cyan-950/70 border-cyan-500/30';
      case 'Low':
      default:
        return 'text-slate-400 bg-slate-900 border-slate-700';
    }
  };

  return (
    <div className="space-y-5">
      {/* 1. PROBABLE ROOT CAUSE HERO CARD */}
      <div className="p-4 sm:p-5 rounded-lg bg-gradient-to-b from-indigo-950/40 via-slate-900/90 to-slate-900 border border-indigo-500/40 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-500/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Probable Root Cause
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-purple-950 border border-purple-500/40 text-purple-300">
                  AI-GENERATED HYPOTHESIS
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulated AI diagnostic inference based on multi-variate telemetry correlation.
              </p>
            </div>
          </div>

          {/* AI Metrics Badges */}
          <div className="flex items-center gap-3 font-mono text-xs flex-wrap self-start sm:self-auto">
            <div className="px-3 py-1.5 rounded-md bg-slate-950 border border-slate-800">
              <span className="text-slate-500 text-[10px] block">Classification</span>
              <span className="text-indigo-300 font-bold">{incident.classification}</span>
            </div>

            <div className="px-3 py-1.5 rounded-md bg-purple-950/70 border border-purple-500/40 text-purple-300">
              <span className="text-purple-400/80 text-[10px] block">Confidence Score</span>
              <span className="text-purple-300 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {incident.confidenceScore}% Certainty
              </span>
            </div>
          </div>
        </div>

        {/* Primary Diagnosis & Hypothesis Explanation */}
        <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2.5">
          <div className="flex items-start gap-2">
            <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <h3 className="text-sm font-bold text-slate-100 leading-snug">
              {incident.primaryRootCause}
            </h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed pl-6 font-sans">
            {incident.rootCauseHypothesis}
          </p>

          <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs font-mono text-slate-400 pl-6">
            <span>
              Primary Affected Node: <strong className="text-cyan-300">{incident.affectedResources[0]}</strong>
            </span>
            <span className="text-[11px] text-slate-500">
              Engine Version: UNIFRA-Correlator-v1.0 (Simulated)
            </span>
          </div>
        </div>

        {/* Root Cause Propagation Graph */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="font-bold text-slate-300">Propagation Causal Graph</span>
            <span className="text-[11px] text-slate-500">Node-to-App Topology Path</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 relative">
            {incident.graphNodes.map((node, idx) => (
              <div key={node.id} className="relative flex flex-col justify-between">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1 hover:border-slate-700 transition-all h-full flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-indigo-400 uppercase block font-bold">
                      {node.label}
                    </span>
                    <p className="text-xs font-semibold text-slate-200 mt-1 leading-snug">
                      {node.details}
                    </p>
                  </div>
                  {node.resource && (
                    <div className="mt-2 text-[10px] font-mono text-slate-400 truncate pt-1 border-t border-slate-900">
                      {node.resource}
                    </div>
                  )}
                </div>

                {idx < incident.graphNodes.length - 1 && (
                  <div className="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. CONTRIBUTING FACTORS & RELATED RESOURCES GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Contributing Factors (7 cols) */}
        <div className="lg:col-span-7 p-4 sm:p-5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white tracking-tight">
                Contributing Factors & Metric Evidence
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Ranked by causal weight
            </span>
          </div>

          <div className="space-y-2.5">
            {incident.contributingFactors.map((factor) => (
              <div
                key={factor.id}
                className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-200 font-mono">
                    {factor.factor}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[10px]">
                    <span className={`px-1.5 py-0.2 rounded border ${getImpactBadge(factor.impact)}`}>
                      Impact: {factor.impact}
                    </span>
                    <span className={`px-1.5 py-0.2 rounded border ${getConfidenceBadge(factor.confidence)}`}>
                      Conf: {factor.confidence}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {factor.description}
                </p>

                <div className="p-1.5 rounded bg-slate-900 border border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span className="text-slate-500">Metric Evidence:</span>
                  <span className="text-cyan-300 font-semibold">{factor.metricEvidence}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Affected Resources & Recommended Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Affected Resources */}
          <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Affected Topology Nodes
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Click to inspect</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {incident.affectedResources.map((res) => (
                <button
                  key={res}
                  onClick={() => onSelectResource(res)}
                  className="p-2.5 rounded-md bg-slate-950 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/50 text-left transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Server className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 group-hover:text-cyan-300" />
                    <span className="text-xs font-mono font-semibold text-slate-300 group-hover:text-white truncate">
                      {res}
                    </span>
                  </div>
                  <Info className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Recommended Mitigation Actions */}
          <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Recommended Actions
                </h3>
              </div>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-950 px-1.5 py-0.2 rounded border border-purple-500/30">
                AI SUGGESTIONS
              </span>
            </div>

            <div className="space-y-2">
              {incident.recommendedActions.map((action) => (
                <div
                  key={action.id}
                  className="p-2.5 rounded-md bg-slate-950 border border-slate-800 space-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-200">{action.title}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase border ${
                        action.priority === 'Immediate'
                          ? 'bg-rose-950 text-rose-300 border-rose-500/30'
                          : 'bg-indigo-950 text-indigo-300 border-indigo-500/30'
                      }`}
                    >
                      {action.priority}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    {action.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
