import React from 'react';
import { AuditLogItem } from '../../types/audit';
import {
  X,
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
  Copy,
  Check,
  Globe,
  Tag,
  Info
} from 'lucide-react';

interface AuditDetailModalProps {
  log: AuditLogItem | null;
  onClose: () => void;
  onNavigateResource?: (resourceName: string, source: string) => void;
}

export const AuditDetailModal: React.FC<AuditDetailModalProps> = ({
  log,
  onClose,
  onNavigateResource
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!log) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(log.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      default:
        return <Server className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getActorIcon = (actorType: string) => {
    switch (actorType) {
      case 'User':
        return <User className="w-4 h-4 text-cyan-400" />;
      case 'AI':
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 'Alert':
        return <Bell className="w-4 h-4 text-rose-400" />;
      case 'Recommendation':
        return <Lightbulb className="w-4 h-4 text-emerald-400" />;
      case 'Control Action':
        return <Play className="w-4 h-4 text-indigo-400" />;
      default:
        return <Shield className="w-4 h-4 text-slate-400" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'Warning':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Info':
      default:
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Success':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Failed':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'Pending':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-xl bg-slate-900 border border-slate-700 shadow-2xl shadow-black/80 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <FileText className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-white">{log.id}</span>
                <button
                  onClick={handleCopyId}
                  className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
                  title="Copy Audit ID"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getSeverityBadge(log.severity)}`}>
                  {log.severity}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getStatusBadge(log.status)}`}>
                  {log.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">{log.timestamp}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Main Activity Banner */}
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
            <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">Activity</div>
            <div className="text-base font-semibold text-white">{log.activity}</div>
          </div>

          {/* Key Attributes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* Actor */}
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <div className="text-[11px] text-slate-400 font-mono mb-1 flex items-center gap-1.5">
                {getActorIcon(log.actorType)}
                Actor ({log.actorType})
              </div>
              <div className="text-xs font-semibold text-slate-200 font-mono truncate">{log.actor}</div>
            </div>

            {/* Resource */}
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <div className="text-[11px] text-slate-400 font-mono mb-1 flex items-center gap-1.5">
                {getSourceIcon(log.source)}
                Resource ({log.source})
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-400 font-mono truncate">{log.resource}</span>
                {onNavigateResource && log.resource !== 'All 48 Hybrid Nodes' && log.resource !== 'edge-mesh-gateway' && (
                  <button
                    onClick={() => onNavigateResource(log.resource, log.source)}
                    className="text-[10px] text-slate-400 hover:text-cyan-300 underline font-mono ml-1"
                  >
                    View
                  </button>
                )}
              </div>
            </div>

            {/* Network / Origin */}
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <div className="text-[11px] text-slate-400 font-mono mb-1 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                Network Origin
              </div>
              <div className="text-xs font-mono text-slate-300">
                {log.ipAddress ? log.ipAddress : 'Internal Service Mesh'}
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1.5">
            <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-indigo-400" />
              Description & Context
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">{log.description}</p>
          </div>

          {/* Related Entities Section (If Applicable) */}
          {(log.relatedAlertId ||
            log.relatedRecommendationId ||
            log.relatedIncidentId ||
            log.relatedActionId) && (
            <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-purple-400" />
                Related Incidents & Entities
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {log.relatedAlertId && (
                  <div className="p-2 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-start gap-1.5">
                    <Bell className="w-3.5 h-3.5 mt-0.5 shrink-0 text-rose-400" />
                    <div>
                      <span className="text-[10px] text-rose-400 block font-bold">Related Alert</span>
                      <span className="text-xs text-rose-200">{log.relatedAlertId}</span>
                    </div>
                  </div>
                )}
                {log.relatedRecommendationId && (
                  <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-400" />
                    <div>
                      <span className="text-[10px] text-emerald-400 block font-bold">Related Recommendation</span>
                      <span className="text-xs text-emerald-200">{log.relatedRecommendationId}</span>
                    </div>
                  </div>
                )}
                {log.relatedIncidentId && (
                  <div className="p-2 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300 flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0 text-purple-400" />
                    <div>
                      <span className="text-[10px] text-purple-400 block font-bold">Related RCA Incident</span>
                      <span className="text-xs text-purple-200">{log.relatedIncidentId}</span>
                    </div>
                  </div>
                )}
                {log.relatedActionId && (
                  <div className="p-2 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 flex items-start gap-1.5">
                    <Play className="w-3.5 h-3.5 mt-0.5 shrink-0 text-indigo-400" />
                    <div>
                      <span className="text-[10px] text-indigo-400 block font-bold">Related Control Action</span>
                      <span className="text-xs text-indigo-200">{log.relatedActionId}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Key-Value Metadata */}
          {log.metadata && Object.keys(log.metadata).length > 0 && (
            <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="text-xs text-slate-400 font-mono">Event Payload Metadata</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {Object.entries(log.metadata).map(([key, value]) => (
                  <div key={key} className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between gap-2">
                    <span className="text-slate-400">{key}:</span>
                    <span className="text-slate-200 font-medium text-right truncate">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800 bg-slate-950/90 text-xs font-mono">
          <span className="text-slate-500">Source: UNIFRA Audit Ledger</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
