import React from 'react';
import { AlertItem } from '../../types/alerts';
import {
  AlertTriangle,
  Clock,
  Check,
  Eye,
  Server,
  Cloud,
  Cpu,
  Box,
  Layers,
  Activity
} from 'lucide-react';

interface AlertInventoryTableProps {
  alerts: AlertItem[];
  onSelectAlert: (alert: AlertItem) => void;
  onAcknowledgeAlert: (alertId: string) => void;
  onResolveAlert: (alertId: string) => void;
}

export const AlertInventoryTable: React.FC<AlertInventoryTableProps> = ({
  alerts,
  onSelectAlert,
  onAcknowledgeAlert,
  onResolveAlert
}) => {
  const getSeverityBadge = (sev: AlertItem['severity']) => {
    switch (sev) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 shadow-sm shadow-rose-950">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            Critical
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            High
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Medium
          </span>
        );
      case 'Low':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            Low
          </span>
        );
    }
  };

  const getStatusBadge = (status: AlertItem['status']) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950/40 text-rose-300 border border-rose-500/30 font-semibold">
            Active
          </span>
        );
      case 'Acknowledged':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950/40 text-amber-300 border border-amber-500/30">
            Acknowledged
          </span>
        );
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/40 text-emerald-300 border border-emerald-500/30">
            Resolved
          </span>
        );
    }
  };

  const getSourceIcon = (source: AlertItem['source']) => {
    switch (source) {
      case 'AWS':
        return <Cloud className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Edge':
        return <Cpu className="w-3.5 h-3.5 text-amber-400" />;
      case 'Kubernetes':
        return <Layers className="w-3.5 h-3.5 text-indigo-400" />;
      case 'Docker':
        return <Box className="w-3.5 h-3.5 text-blue-400" />;
      case 'Application':
        return <Activity className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Server className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 shadow-lg space-y-3.5">
      {/* Table Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-semibold text-white tracking-wide">
              CENTRALIZED INCIDENTS & ALERTS FEED
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Real-time telemetry threshold events with automated correlation & one-click lifecycle triage
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800/80">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/90 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3 font-semibold">Severity</th>
              <th className="py-2.5 px-3 font-semibold">Alert</th>
              <th className="py-2.5 px-3 font-semibold">Resource</th>
              <th className="py-2.5 px-3 font-semibold">Source</th>
              <th className="py-2.5 px-3 font-semibold">Value</th>
              <th className="py-2.5 px-3 font-semibold">Threshold</th>
              <th className="py-2.5 px-3 font-semibold">Started</th>
              <th className="py-2.5 px-3 font-semibold">Duration</th>
              <th className="py-2.5 px-3 font-semibold">Status</th>
              <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-slate-900/30 font-mono">
            {alerts.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-8 text-center text-slate-500 font-mono text-xs">
                  No alerts matching the selected filters.
                </td>
              </tr>
            ) : (
              alerts.map((alt) => (
                <tr
                  key={alt.id}
                  onClick={() => onSelectAlert(alt)}
                  className={`hover:bg-slate-800/40 transition-colors cursor-pointer group ${
                    alt.severity === 'Critical' && alt.status !== 'Resolved'
                      ? 'bg-rose-950/10'
                      : ''
                  }`}
                >
                  {/* Severity */}
                  <td className="py-2.5 px-3 whitespace-nowrap">{getSeverityBadge(alt.severity)}</td>

                  {/* Alert Title & Snippet */}
                  <td className="py-2.5 px-3 min-w-[240px]">
                    <span className="font-bold text-slate-200 group-hover:text-cyan-300 transition-colors block">
                      {alt.title}
                    </span>
                    <span className="text-[10px] text-slate-500 font-sans line-clamp-1 mt-0.5">
                      {alt.description}
                    </span>
                  </td>

                  {/* Resource */}
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className="p-1 rounded bg-slate-800/80 border border-slate-700/60">
                        {getSourceIcon(alt.source)}
                      </span>
                      <div>
                        <span className="font-bold text-slate-200">{alt.resource}</span>
                        <span className="text-[10px] text-slate-500 block">{alt.resourceType}</span>
                      </div>
                    </div>
                  </td>

                  {/* Source */}
                  <td className="py-2.5 px-3 text-slate-300 text-[11px] whitespace-nowrap">
                    {alt.source}
                  </td>

                  {/* Current Value */}
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span
                      className={`font-bold ${
                        alt.status === 'Resolved'
                          ? 'text-slate-400'
                          : alt.severity === 'Critical'
                          ? 'text-rose-400 animate-pulse'
                          : 'text-amber-300'
                      }`}
                    >
                      {alt.currentValue}
                    </span>
                  </td>

                  {/* Threshold */}
                  <td className="py-2.5 px-3 text-slate-400 text-[11px] whitespace-nowrap">
                    {alt.thresholdValue}
                  </td>

                  {/* Started */}
                  <td className="py-2.5 px-3 text-slate-400 text-[11px] whitespace-nowrap">
                    {alt.startedAt}
                  </td>

                  {/* Duration */}
                  <td className="py-2.5 px-3 text-slate-300 text-[11px] whitespace-nowrap">
                    {alt.duration}
                  </td>

                  {/* Status */}
                  <td className="py-2.5 px-3 whitespace-nowrap">{getStatusBadge(alt.status)}</td>

                  {/* Actions */}
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <div
                      className="inline-flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {alt.status === 'Active' && (
                        <button
                          onClick={() => onAcknowledgeAlert(alt.id)}
                          title="Acknowledge Alert"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-500/30 transition-colors text-[10px]"
                        >
                          <Clock className="w-2.5 h-2.5" />
                          <span>Ack</span>
                        </button>
                      )}

                      {alt.status !== 'Resolved' && (
                        <button
                          onClick={() => onResolveAlert(alt.id)}
                          title="Resolve Alert"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-500/30 transition-colors text-[10px]"
                        >
                          <Check className="w-2.5 h-2.5" />
                          <span>Resolve</span>
                        </button>
                      )}

                      <button
                        onClick={() => onSelectAlert(alt)}
                        title="View Alert & Incident Details"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors text-[10px]"
                      >
                        <Eye className="w-3 h-3 text-cyan-400" />
                        <span>Details</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
