import React from 'react';
import { IncidentGroup } from '../../types/alerts';
import {
  Sparkles,
  Layers,
  Clock,
  Server,
  ArrowRight,
  Zap,
  Info
} from 'lucide-react';

interface IncidentCorrelationSectionProps {
  incidents: IncidentGroup[];
  selectedIncidentId: string | null;
  onSelectIncident: (incidentId: string | null) => void;
}

export const IncidentCorrelationSection: React.FC<IncidentCorrelationSectionProps> = ({
  incidents,
  selectedIncidentId,
  onSelectIncident
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-white tracking-wide">
                INCIDENT CORRELATION & ROOT CAUSE ANALYSIS
              </h3>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                MULTI-SIGNAL AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Graph-based grouping of concurrent telemetry spikes into unified infrastructure incidents
            </p>
          </div>
        </div>

        {/* Demo Disclaimer Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800 text-slate-400 text-xs font-mono">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>Root cause previews are AI-generated hypotheses (Simulated Demo Data)</span>
        </div>
      </div>

      {/* Incidents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {incidents.map((inc) => {
          const isSelected = selectedIncidentId === inc.id;

          const severityStyles = {
            Critical: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
            High: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
            Medium: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
            Low: 'bg-slate-800 text-slate-300 border-slate-700'
          };

          return (
            <div
              key={inc.id}
              onClick={() => onSelectIncident(isSelected ? null : inc.id)}
              className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              {/* Top Row: ID, Severity & Status */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">{inc.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border ${
                      severityStyles[inc.severity]
                    }`}
                  >
                    {inc.severity}
                  </span>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800">
                  {inc.status}
                </span>
              </div>

              {/* Title */}
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight leading-snug">
                  {inc.title}
                </h4>
                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    Started {inc.startedAt} ({inc.duration})
                  </span>
                  <span>•</span>
                  <span className="text-cyan-400 font-semibold">{inc.alertCount} related alerts</span>
                </div>
              </div>

              {/* Affected Resources Tags */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-slate-500">Affected Resources:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {inc.affectedResources.map((res) => (
                    <span
                      key={res}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1"
                    >
                      <Server className="w-2.5 h-2.5 text-cyan-400" />
                      {res}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Root Cause Hypothesis Preview */}
              <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-500/20 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-indigo-300 uppercase">
                  <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
                  <span>Possible Root Cause (AI Hypothesis)</span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  "{inc.hypothesis}"
                </p>
                <div className="pt-1 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  <span>Mitigation: {inc.mitigationStep}</span>
                </div>
              </div>

              {/* Selection footer */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
                <span>{isSelected ? 'Showing linked alerts' : 'Click to filter alerts'}</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-cyan-400' : ''}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
