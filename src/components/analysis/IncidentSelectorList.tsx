import React from 'react';
import { AnalysisIncident } from '../../types/analysis';
import { AlertOctagon, Clock, Layers, Server, Sparkles, CheckCircle2 } from 'lucide-react';

interface IncidentSelectorListProps {
  incidents: AnalysisIncident[];
  selectedIncidentId: string;
  onSelectIncident: (incidentId: string) => void;
}

export const IncidentSelectorList: React.FC<IncidentSelectorListProps> = ({
  incidents,
  selectedIncidentId,
  onSelectIncident
}) => {
  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'Critical':
        return 'bg-rose-950/70 border-rose-500/40 text-rose-300';
      case 'High':
        return 'bg-amber-950/70 border-amber-500/30 text-amber-300';
      case 'Medium':
        return 'bg-indigo-950/70 border-indigo-500/30 text-indigo-300';
      case 'Low':
      default:
        return 'bg-slate-900 border-slate-700 text-slate-400';
    }
  };

  const getStatusBadge = (st: string) => {
    switch (st) {
      case 'Active':
        return 'text-rose-400 border-rose-500/30 bg-rose-950/50';
      case 'Investigating':
        return 'text-amber-400 border-amber-500/30 bg-amber-950/50';
      case 'Mitigated':
      case 'Resolved':
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/50';
      default:
        return 'text-slate-400 border-slate-700 bg-slate-900';
    }
  };

  return (
    <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3 shadow-sm">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-white tracking-tight">
            Incident Correlation Queue
          </h2>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Select incident to load root cause telemetry
        </span>
      </div>

      {/* Horizontal Scrollable or Grid of Incidents */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {incidents.map((inc) => {
          const isSelected = inc.id === selectedIncidentId;
          return (
            <button
              key={inc.id}
              onClick={() => onSelectIncident(inc.id)}
              className={`p-3 rounded-lg text-left transition-all flex flex-col justify-between border relative group ${
                isSelected
                  ? 'bg-slate-800/90 border-cyan-500 shadow-md shadow-cyan-950/30'
                  : 'bg-slate-950/70 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-mono text-cyan-400">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  Active View
                </div>
              )}

              <div className="space-y-1.5 w-full pr-6">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold uppercase border ${getSeverityBadge(
                      inc.severity
                    )}`}
                  >
                    {inc.severity}
                  </span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-mono border ${getStatusBadge(
                      inc.status
                    )}`}
                  >
                    {inc.status}
                  </span>
                </div>

                <h3
                  className={`text-xs font-bold line-clamp-2 leading-snug ${
                    isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}
                >
                  {inc.title}
                </h3>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 w-full space-y-1 text-[10px] font-mono text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3 text-cyan-400" />
                    {inc.relatedEventCount} Events
                  </span>
                  <span className="flex items-center gap-1 text-purple-300">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    {inc.confidenceScore}% Conf.
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-500">
                  <span className="flex items-center gap-1 truncate max-w-[110px]" title={inc.affectedResources.join(', ')}>
                    <Server className="w-2.5 h-2.5" />
                    {inc.affectedResources[0]}
                    {inc.affectedResources.length > 1 ? ` +${inc.affectedResources.length - 1}` : ''}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {inc.startedTime.split(' ')[0]}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
