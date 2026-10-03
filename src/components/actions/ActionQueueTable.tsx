import React from 'react';
import { ControlActionItem } from '../../types/actions';
import {
  Play,
  Check,
  Eye,
  Server,
  Cpu,
  Layers,
  Box,
  Cloud,
  Loader2,
  AlertTriangle
} from 'lucide-react';

interface ActionQueueTableProps {
  actions: ControlActionItem[];
  onSelectAction: (action: ControlActionItem) => void;
  onApproveAction: (action: ControlActionItem) => void;
  onRejectAction: (actionId: string) => void;
  onExecuteAction: (actionId: string) => void;
}

export const ActionQueueTable: React.FC<ActionQueueTableProps> = ({
  actions,
  onSelectAction,
  onApproveAction,
  onRejectAction,
  onExecuteAction
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'text-amber-400 bg-amber-950/60 border-amber-500/30';
      case 'Approved':
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30';
      case 'Executing':
        return 'text-indigo-400 bg-indigo-950/60 border-indigo-500/30 animate-pulse';
      case 'Completed':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30';
      case 'Failed':
        return 'text-rose-400 bg-rose-950/60 border-rose-500/30';
      case 'Scheduled':
        return 'text-purple-400 bg-purple-950/60 border-purple-500/30';
      case 'Rejected':
      default:
        return 'text-slate-500 bg-slate-900 border-slate-800 line-through';
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'text-rose-400 bg-rose-950/60 border-rose-500/40 font-bold';
      case 'Medium':
        return 'text-amber-400 bg-amber-950/60 border-amber-500/30';
      case 'Low':
      default:
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'AWS':
        return <Cloud className="w-3.5 h-3.5 text-amber-400" />;
      case 'Edge':
        return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Kubernetes':
        return <Layers className="w-3.5 h-3.5 text-indigo-400" />;
      case 'Docker':
        return <Box className="w-3.5 h-3.5 text-blue-400" />;
      case 'On-Premise':
      default:
        return <Server className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>Control Action Queue</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950 border border-indigo-500/30 text-indigo-300">
              OPERATIONAL WORKFLOWS
            </span>
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Review recommendations, grant operator approval, and simulate remediation execution.
          </p>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          Showing {actions.length} action items
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-950/90 border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400 tracking-wider">
              <th className="py-2.5 px-3">Action Description</th>
              <th className="py-2.5 px-3">Type</th>
              <th className="py-2.5 px-3">Resource</th>
              <th className="py-2.5 px-3">Risk Level</th>
              <th className="py-2.5 px-3">Requested By</th>
              <th className="py-2.5 px-3">Created</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Workflow Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 font-mono">
            {actions.map((act) => (
              <tr
                key={act.id}
                onClick={() => onSelectAction(act)}
                className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
              >
                {/* Action Title */}
                <td className="py-2.5 px-3">
                  <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors block leading-snug max-w-[260px] truncate" title={act.action}>
                    {act.action}
                  </span>
                  <span className="text-[10px] text-slate-500 block truncate max-w-[260px]">
                    {act.reason}
                  </span>
                </td>

                {/* Type */}
                <td className="py-2.5 px-3 text-slate-300 text-[11px]">
                  {act.type}
                </td>

                {/* Resource */}
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-1.5">
                    {getSourceIcon(act.source)}
                    <span className="text-slate-200 font-medium truncate max-w-[130px]" title={act.resource}>
                      {act.resource}
                    </span>
                  </div>
                </td>

                {/* Risk */}
                <td className="py-2.5 px-3">
                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-mono border ${getRiskBadge(
                      act.risk
                    )}`}
                  >
                    {act.risk === 'High' && <AlertTriangle className="w-2.5 h-2.5" />}
                    {act.risk}
                  </span>
                </td>

                {/* Requested By */}
                <td className="py-2.5 px-3 text-slate-400 text-[11px] truncate max-w-[140px]" title={act.requestedBy}>
                  {act.requestedBy}
                </td>

                {/* Created */}
                <td className="py-2.5 px-3 text-slate-500 text-[10px]">
                  {act.createdTime}
                </td>

                {/* Status */}
                <td className="py-2.5 px-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono border font-medium ${getStatusBadge(
                      act.status
                    )}`}
                  >
                    {act.status}
                  </span>
                </td>

                {/* Workflow Action Buttons */}
                <td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1.5">
                    {act.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => onApproveAction(act)}
                          className="px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[11px] font-mono shadow-sm transition-all"
                          title="Approve Action"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => onRejectAction(act.id)}
                          className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 text-[11px] font-mono transition-colors border border-slate-800"
                          title="Reject Action"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {act.status === 'Approved' && (
                      <button
                        onClick={() => onExecuteAction(act.id)}
                        className="px-2.5 py-1 rounded bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-[11px] font-mono shadow-sm flex items-center gap-1 transition-all"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Execute in Demo</span>
                      </button>
                    )}

                    {act.status === 'Executing' && (
                      <span className="text-indigo-400 text-[11px] font-mono flex items-center gap-1">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Executing...
                      </span>
                    )}

                    {act.status === 'Completed' && (
                      <span className="text-emerald-400 text-[11px] font-mono flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Done
                      </span>
                    )}

                    {act.status === 'Rejected' && (
                      <span className="text-slate-500 text-[11px] font-mono">
                        Rejected
                      </span>
                    )}

                    <button
                      onClick={() => onSelectAction(act)}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                      title="View Action Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
