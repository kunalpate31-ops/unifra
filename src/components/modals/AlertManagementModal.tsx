import React from 'react';
import { AlertItem } from '../../types/alerts';
import {
  X,
  Clock,
  Server,
  Cloud,
  Cpu,
  Box,
  Layers,
  Activity,
  HardDrive,
  Wifi,
  Thermometer,
  ExternalLink,
  Sparkles,
  Zap,
  Check,
  CheckCircle2
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, LineChart, Line } from 'recharts';

interface AlertManagementModalProps {
  alert: AlertItem | null;
  allAlerts: AlertItem[];
  onClose: () => void;
  onAcknowledge: (alertId: string) => void;
  onResolve: (alertId: string) => void;
  onViewResource: (resourceName: string, source: string) => void;
  onViewMetrics: () => void;
}

export const AlertManagementModal: React.FC<AlertManagementModalProps> = ({
  alert,
  allAlerts,
  onClose,
  onAcknowledge,
  onResolve,
  onViewResource,
  onViewMetrics
}) => {
  if (!alert) return null;

  const getSourceIcon = (source: AlertItem['source']) => {
    switch (source) {
      case 'AWS':
        return <Cloud className="w-5 h-5 text-cyan-400" />;
      case 'Edge':
        return <Cpu className="w-5 h-5 text-amber-400" />;
      case 'Kubernetes':
        return <Layers className="w-5 h-5 text-indigo-400" />;
      case 'Docker':
        return <Box className="w-5 h-5 text-blue-400" />;
      case 'Application':
        return <Activity className="w-5 h-5 text-rose-400" />;
      default:
        return <Server className="w-5 h-5 text-slate-400" />;
    }
  };

  const relatedAlertItems = allAlerts.filter(
    (a) => a.id !== alert.id && alert.relatedAlertIds.includes(a.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
              {getSourceIcon(alert.source)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs text-slate-400 font-bold">{alert.id}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    alert.severity === 'Critical'
                      ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                      : alert.severity === 'High'
                      ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                      : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                  }`}
                >
                  {alert.severity.toUpperCase()}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                    alert.status === 'Active'
                      ? 'bg-rose-950/40 text-rose-300 border-rose-500/30'
                      : alert.status === 'Acknowledged'
                      ? 'bg-amber-950/40 text-amber-300 border-amber-500/30'
                      : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  {alert.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-white font-sans mt-0.5">{alert.title}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs font-sans">
          {/* Key Alert Metadata Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Target Resource</span>
              <span className="font-bold text-slate-200 mt-0.5 block">{alert.resource}</span>
              <span className="text-[10px] text-slate-400 font-normal">({alert.resourceType})</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Telemetry Value</span>
              <span
                className={`font-bold text-base mt-0.5 block ${
                  alert.status === 'Resolved'
                    ? 'text-slate-300'
                    : alert.severity === 'Critical'
                    ? 'text-rose-400 animate-pulse'
                    : 'text-amber-300'
                }`}
              >
                {alert.currentValue}
              </span>
              <span className="text-[10px] text-slate-500 font-normal">Limit: {alert.thresholdValue}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Started At</span>
              <span className="font-bold text-slate-200 mt-0.5 block">{alert.startedAt}</span>
              <span className="text-[10px] text-slate-500 font-normal">Duration: {alert.duration}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Source System</span>
              <span className="font-bold text-cyan-300 mt-0.5 block">{alert.source}</span>
              <span className="text-[10px] text-slate-500 font-normal">OTel Alert Rule</span>
            </div>
          </div>

          {/* Description */}
          <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Event Description</span>
            <p className="text-slate-300 leading-relaxed">{alert.description}</p>
          </div>

          {/* AI Root Cause Hypothesis & Recommendation */}
          <div className="p-3.5 rounded-lg bg-indigo-950/20 border border-indigo-500/30 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-indigo-300 uppercase">
                Possible Root Cause (AI-Generated Hypothesis)
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed italic">
              "{alert.hypothesis}"
            </p>
            <div className="pt-1.5 border-t border-indigo-500/20 flex items-start gap-2 text-emerald-400 font-mono text-xs">
              <Zap className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>Recommended Remediation: {alert.recommendedAction}</span>
            </div>
          </div>

          {/* Related Telemetry Metrics (4 mini sparklines) */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Related Telemetry Metrics (Recent Probes)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* CPU */}
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                  <span>CPU (%)</span>
                  <Activity className="w-3 h-3 text-cyan-400" />
                </div>
                <div className="h-16 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={alert.relatedMetrics.cpu} margin={{ top: 2, right: 2, left: -30, bottom: 0 }}>
                      <Area type="monotone" dataKey="value" stroke="#06b6d4" fill="#06b6d425" strokeWidth={1.5} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Memory */}
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                  <span>RAM (%)</span>
                  <HardDrive className="w-3 h-3 text-indigo-400" />
                </div>
                <div className="h-16 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={alert.relatedMetrics.memory} margin={{ top: 2, right: 2, left: -30, bottom: 0 }}>
                      <Area type="monotone" dataKey="value" stroke="#6366f1" fill="#6366f125" strokeWidth={1.5} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Temperature if available */}
              {alert.relatedMetrics.temperature ? (
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span>Temp (°C)</span>
                    <Thermometer className="w-3 h-3 text-amber-400" />
                  </div>
                  <div className="h-16 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={alert.relatedMetrics.temperature} margin={{ top: 2, right: 2, left: -30, bottom: 0 }}>
                        <Line type="monotone" dataKey="value" stroke="#f43f5e" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span>Latency (ms)</span>
                    <Clock className="w-3 h-3 text-amber-400" />
                  </div>
                  <div className="h-16 w-full flex items-center justify-center text-slate-500 font-mono text-[11px]">
                    142 ms P99
                  </div>
                </div>
              )}

              {/* Network */}
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                  <span>Network IO</span>
                  <Wifi className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="h-16 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={alert.relatedMetrics.network} margin={{ top: 2, right: 2, left: -30, bottom: 0 }}>
                      <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b98125" strokeWidth={1.5} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Related Alerts Section */}
          {relatedAlertItems.length > 0 && (
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Correlated Incidents & Alerts ({relatedAlertItems.length})</span>
              </div>
              <div className="space-y-1.5">
                {relatedAlertItems.map((rel) => (
                  <div
                    key={rel.id}
                    className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-400">{rel.id}</span>
                      <span className="text-slate-200">{rel.title}</span>
                    </div>
                    <span className="text-cyan-400">{rel.currentValue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Actions */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-2 flex-wrap">
          {/* Left Actions: Acknowledge & Resolve */}
          <div className="flex items-center gap-2">
            {alert.status === 'Active' && (
              <button
                onClick={() => onAcknowledge(alert.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/50 hover:bg-amber-900/60 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-all shadow-sm"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Acknowledge</span>
              </button>
            )}

            {alert.status !== 'Resolved' && (
              <button
                onClick={() => onResolve(alert.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-all shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Resolve Alert</span>
              </button>
            )}

            {alert.status === 'Resolved' && (
              <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-mono font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                Alert is Resolved
              </span>
            )}
          </div>

          {/* Right Actions: View Resource & View Metrics */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onViewResource(alert.resource, alert.source);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-sm"
            >
              <span>View Resource</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                onClose();
                onViewMetrics();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all shadow-sm"
            >
              <span>View Metrics</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
