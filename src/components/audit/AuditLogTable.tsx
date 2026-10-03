import React, { useState } from 'react';
import { AuditLogItem } from '../../types/audit';
import {
  FileText,
  User,
  Sparkles,
  Server,
  Bell,
  Lightbulb,
  Play,
  Shield,
  Cloud,
  Cpu,
  Layers,
  Box,
  ArrowUpDown,
  ExternalLink,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

interface AuditLogTableProps {
  logs: AuditLogItem[];
  onSelectLog: (log: AuditLogItem) => void;
  onNavigateResource?: (resourceName: string, source: string) => void;
}

export const AuditLogTable: React.FC<AuditLogTableProps> = ({
  logs,
  onSelectLog,
  onNavigateResource
}) => {
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const sortedLogs = [...logs].sort((a, b) => {
    const timeA = new Date(a.timestamp).getTime();
    const timeB = new Date(b.timestamp).getTime();
    return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
  });

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
      default:
        return <Server className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getActorIcon = (actorType: string) => {
    switch (actorType) {
      case 'User':
        return <User className="w-3.5 h-3.5 text-cyan-400" />;
      case 'AI':
        return <Sparkles className="w-3.5 h-3.5 text-purple-400" />;
      case 'Alert':
        return <Bell className="w-3.5 h-3.5 text-rose-400" />;
      case 'Recommendation':
        return <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Control Action':
        return <Play className="w-3.5 h-3.5 text-indigo-400" />;
      default:
        return <Shield className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/40';
      case 'Warning':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/40';
      case 'Info':
      default:
        return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Success':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40';
      case 'Failed':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/40';
      case 'Pending':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/40';
      default:
        return 'bg-slate-500/15 text-slate-300 border-slate-500/40';
    }
  };

  return (
    <div className="rounded-lg bg-slate-900/90 border border-slate-800 shadow-sm overflow-hidden flex flex-col">
      {/* Header bar */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-semibold text-white">System Audit Log Ledger</h3>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {logs.length} Entries
          </span>
        </div>
        <button
          onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 font-mono px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors"
        >
          <ArrowUpDown className="w-3 h-3 text-slate-400" />
          <span>Timestamp: {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              <th className="py-2.5 px-4">Timestamp</th>
              <th className="py-2.5 px-3">Actor</th>
              <th className="py-2.5 px-4">Activity</th>
              <th className="py-2.5 px-3">Resource</th>
              <th className="py-2.5 px-3">Type</th>
              <th className="py-2.5 px-3">Severity</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {sortedLogs.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-500">
                  <AlertCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-sans font-medium text-slate-400">No audit records found matching your filters.</p>
                  <p className="text-xs font-sans text-slate-600 mt-1">Try broadening your search query or selecting "All" filters.</p>
                </td>
              </tr>
            ) : (
              sortedLogs.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => onSelectLog(log)}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                >
                  {/* Timestamp */}
                  <td className="py-3 px-4 text-slate-400 whitespace-nowrap text-[11px]">
                    {log.timestamp}
                  </td>

                  {/* Actor */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <div className="p-1 rounded bg-slate-800/80 border border-slate-700/60">
                        {getActorIcon(log.actorType)}
                      </div>
                      <span className="text-slate-200 font-medium text-xs truncate max-w-[140px]" title={log.actor}>
                        {log.actor}
                      </span>
                    </div>
                  </td>

                  {/* Activity */}
                  <td className="py-3 px-4 font-sans text-xs">
                    <div className="text-slate-200 font-medium group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {log.activity}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 font-mono">
                      {log.id}
                    </div>
                  </td>

                  {/* Resource */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      {getSourceIcon(log.source)}
                      <span className="text-cyan-400 text-xs font-semibold">{log.resource}</span>
                      {onNavigateResource && log.resource !== 'All 48 Hybrid Nodes' && log.resource !== 'edge-mesh-gateway' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateResource(log.resource, log.source);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-cyan-300 transition-opacity"
                          title="View resource inventory"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </td>

                  {/* Type */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                      {log.actorType}
                    </span>
                  </td>

                  {/* Severity */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] border font-bold ${getSeverityBadge(log.severity)}`}>
                      {log.severity}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] border ${getStatusBadge(log.status)}`}>
                      {log.status}
                    </span>
                  </td>

                  {/* Details Action */}
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLog(log);
                      }}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-[11px] border border-slate-700/60"
                    >
                      <span>Inspect</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
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
