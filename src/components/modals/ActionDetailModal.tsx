import React from 'react';
import { ControlActionItem } from '../../types/actions';
import {
  X,
  Play,
  Check,
  Server,
  Cpu,
  Cloud,
  Box,
  Layers,
  ArrowRight,
  Activity,
  Loader2
} from 'lucide-react';

interface ActionDetailModalProps {
  action: ControlActionItem | null;
  onClose: () => void;
  onApprove: (action: ControlActionItem) => void;
  onReject: (actionId: string) => void;
  onExecute: (actionId: string) => void;
  onNavigateResource: (resourceName: string, source: string) => void;
}

export const ActionDetailModal: React.FC<ActionDetailModalProps> = ({
  action,
  onClose,
  onApprove,
  onReject,
  onExecute,
  onNavigateResource
}) => {
  if (!action) return null;

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'AWS':
        return <Cloud className="w-4 h-4 text-amber-400" />;
      case 'Edge':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'Kubernetes':
        return <Layers className="w-4 h-4 text-indigo-400" />;
      case 'Docker':
        return <Box className="w-4 h-4 text-blue-400" />;
      case 'On-Premise':
      default:
        return <Server className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-xl bg-slate-900 border border-slate-700 shadow-2xl shadow-black/80 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Play className="w-5 h-5 text-indigo-400 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 font-semibold">{action.id}</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono border border-slate-700 bg-slate-800 text-slate-300">
                  {action.type}
                </span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold uppercase border ${
                    action.risk === 'High'
                      ? 'bg-rose-950 text-rose-300 border-rose-500/40'
                      : action.risk === 'Medium'
                      ? 'bg-amber-950 text-amber-300 border-amber-500/30'
                      : 'bg-emerald-950 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  {action.risk} Risk
                </span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5 leading-tight">{action.action}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs font-sans">
          {/* Target Resource & Triggered By Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Target Resource</span>
              <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                {getSourceIcon(action.source)}
                <span>{action.resource}</span>
              </div>
              <span className="text-[10px] text-slate-400 block">{action.source} Infrastructure</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Triggered / Requested By</span>
              <div className="text-xs font-bold text-cyan-300 truncate">{action.requestedBy}</div>
              <span className="text-[10px] text-slate-500 block">Created {action.createdTime}</span>
            </div>
          </div>

          {/* Current vs Expected State */}
          <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2 font-mono">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Operational State Transition
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-start gap-2">
                <span className="text-slate-500 font-bold w-16 flex-shrink-0">Current:</span>
                <span className="text-slate-300">{action.currentState}</span>
              </div>
              <div className="flex items-start gap-2 border-t border-slate-800/80 pt-1.5">
                <span className="text-cyan-400 font-bold w-16 flex-shrink-0 flex items-center gap-0.5">
                  <ArrowRight className="w-3 h-3" /> Target:
                </span>
                <span className="text-cyan-200 font-medium">{action.expectedState}</span>
              </div>
            </div>
          </div>

          {/* Reason & Impact Preview */}
          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-slate-200 font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              Action Justification & Impact
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{action.reason}</p>
            <div className="p-2 rounded bg-indigo-950/30 border border-indigo-500/20 text-indigo-200 text-xs font-mono">
              <strong>Impact Preview:</strong> {action.impactPreview}
            </div>
          </div>

          {/* Workflow Linkages (Alerts -> Analysis -> Recommendation -> Action) */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider block">
              Causal Pipeline Traceability
            </span>
            <div className="space-y-1.5 font-mono text-[11px]">
              {action.relatedAlertId && (
                <div className="p-1.5 rounded bg-rose-950/30 border border-rose-500/20 text-rose-300 flex items-center gap-1.5">
                  <span className="text-[9px] uppercase font-bold bg-rose-900/60 px-1 rounded">Alert</span>
                  <span className="truncate">{action.relatedAlertId}</span>
                </div>
              )}
              {action.relatedIncidentId && (
                <div className="p-1.5 rounded bg-purple-950/30 border border-purple-500/20 text-purple-300 flex items-center gap-1.5">
                  <span className="text-[9px] uppercase font-bold bg-purple-900/60 px-1 rounded">Incident</span>
                  <span className="truncate">{action.relatedIncidentId}</span>
                </div>
              )}
              {action.relatedRecommendationId && (
                <div className="p-1.5 rounded bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 flex items-center gap-1.5">
                  <span className="text-[9px] uppercase font-bold bg-cyan-900/60 px-1 rounded">Rec</span>
                  <span className="truncate">{action.relatedRecommendationId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Execution Log */}
          {action.executionLog && (
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block">
                Workflow Execution Log
              </span>
              <div className="space-y-1 font-mono text-[11px] text-slate-400">
                {action.executionLog.map((log, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="text-slate-600">›</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onNavigateResource(action.resource, action.source);
            }}
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors border border-slate-700"
          >
            Inspect Node
          </button>

          <div className="flex items-center gap-2">
            {action.status === 'Pending' && (
              <>
                <button
                  onClick={() => onReject(action.id)}
                  className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-300 text-xs font-mono transition-colors border border-slate-800"
                >
                  Reject Action
                </button>
                <button
                  onClick={() => onApprove(action)}
                  className="px-3.5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs font-mono shadow-md shadow-indigo-900/30 transition-all"
                >
                  Approve Action
                </button>
              </>
            )}

            {action.status === 'Approved' && (
              <button
                onClick={() => onExecute(action.id)}
                className="px-4 py-1.5 rounded bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs font-mono shadow-md shadow-indigo-900/30 flex items-center gap-1.5 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Execute in Demo</span>
              </button>
            )}

            {action.status === 'Executing' && (
              <span className="text-indigo-400 text-xs font-mono flex items-center gap-1.5">
                <Loader2 className="w-4 h-4 animate-spin" />
                Executing Sequence...
              </span>
            )}

            {action.status === 'Completed' && (
              <span className="px-3 py-1.5 rounded bg-emerald-950 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 border border-emerald-500/40">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Completed
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
