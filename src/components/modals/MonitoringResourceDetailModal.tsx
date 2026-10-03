import React from 'react';
import { LiveTelemetryRow } from '../../types/monitoring';
import {
  X,
  Server,
  Cloud,
  Cpu,
  Box,
  Layers,
  Activity,
  HardDrive,
  Wifi,
  Clock,
  Thermometer,
  AlertTriangle,
  FileText,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

interface MonitoringResourceDetailModalProps {
  row: LiveTelemetryRow | null;
  onClose: () => void;
  onViewInfrastructure: (resourceName: string) => void;
}

export const MonitoringResourceDetailModal: React.FC<MonitoringResourceDetailModalProps> = ({
  row,
  onClose,
  onViewInfrastructure
}) => {
  if (!row) return null;

  // Mini sparkline data tailored to this resource's load
  const sparklineData = [
    { v: row.cpu - 6 },
    { v: row.cpu - 2 },
    { v: row.cpu + 3 },
    { v: row.cpu - 1 },
    { v: row.cpu + 4 },
    { v: row.cpu }
  ];

  const getTypeIcon = (type: LiveTelemetryRow['type']) => {
    switch (type) {
      case 'EC2':
      case 'RDS':
        return <Cloud className="w-5 h-5 text-cyan-400" />;
      case 'Edge Device':
        return <Cpu className="w-5 h-5 text-amber-400" />;
      case 'Docker':
        return <Box className="w-5 h-5 text-blue-400" />;
      case 'Kubernetes':
        return <Layers className="w-5 h-5 text-indigo-400" />;
      default:
        return <Server className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              {getTypeIcon(row.type)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-mono">{row.resource}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                  {row.type}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                    row.status === 'Critical'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      : row.status === 'Warning'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  {row.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Location: {row.location} • IP: {row.ipAddress} • Provider: {row.provider}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs font-sans">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {/* CPU */}
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-mono uppercase">CPU</span>
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <p
                className={`text-lg font-bold font-mono ${
                  row.cpu > 85 ? 'text-rose-400' : 'text-white'
                }`}
              >
                {row.cpu}%
              </p>
              {/* Mini Sparkline */}
              <div className="h-6 w-full mt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sparklineData}>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={row.cpu > 85 ? '#f43f5e' : '#06b6d4'}
                      fill={row.cpu > 85 ? '#f43f5e20' : '#06b6d420'}
                      strokeWidth={1.5}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Memory */}
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-mono uppercase">Memory</span>
                <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <p className="text-lg font-bold font-mono text-white">{row.memory}%</p>
              <div className="w-full bg-slate-800 rounded-full h-1 mt-3">
                <div
                  className="bg-indigo-500 h-1 rounded-full"
                  style={{ width: `${row.memory}%` }}
                />
              </div>
            </div>

            {/* Network */}
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-mono uppercase">Network</span>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <p className="text-lg font-bold font-mono text-emerald-300">{row.network}</p>
              <span className="text-[10px] text-slate-500 font-mono">Inbound IO</span>
            </div>

            {/* Temperature */}
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-mono uppercase">Temp</span>
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p
                className={`text-lg font-bold font-mono ${
                  parseInt(row.temperature) > 75 ? 'text-rose-400 animate-pulse' : 'text-slate-200'
                }`}
              >
                {row.temperature}
              </p>
              <span className="text-[10px] text-slate-500 font-mono">Thermal probe</span>
            </div>

            {/* API Latency */}
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-mono uppercase">Latency</span>
                <Clock className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p
                className={`text-lg font-bold font-mono ${
                  parseInt(row.latency) > 250 ? 'text-rose-400' : 'text-white'
                }`}
              >
                {row.latency}
              </p>
              <span className="text-[10px] text-slate-500 font-mono">P99 probe</span>
            </div>

            {/* Error Rate */}
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-mono uppercase">Errors</span>
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              </div>
              <p
                className={`text-lg font-bold font-mono ${
                  parseFloat(row.errorRate) > 2.0 ? 'text-rose-400 font-extrabold' : 'text-emerald-400'
                }`}
              >
                {row.errorRate}
              </p>
              <span className="text-[10px] text-slate-500 font-mono">5xx Failure rate</span>
            </div>
          </div>

          {/* Temperature & Environmental Telemetry (if available) */}
          {row.temperature !== '—' && (
            <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-amber-400" />
                <span className="font-mono text-xs text-slate-300">
                  Rack MCU Temperature Sensor:
                </span>
              </div>
              <span
                className={`text-sm font-mono font-bold ${
                  parseInt(row.temperature) > 75 ? 'text-rose-400 animate-pulse' : 'text-amber-300'
                }`}
              >
                {row.temperature}
              </span>
            </div>
          )}

          {/* Workload Profile */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1 font-mono text-xs">
            <span className="text-slate-500 text-[10px] uppercase">Active Workloads</span>
            <p className="text-slate-200">{row.workload}</p>
          </div>

          {/* Recent Alerts */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold text-xs">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Recent Alerts</span>
            </div>
            {row.status === 'Critical' ? (
              <div className="p-2 rounded bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs font-mono">
                [ALERT] High CPU saturation ({row.cpu}%) exceeded threshold (85%) for &gt;5m.
              </div>
            ) : row.status === 'Warning' ? (
              <div className="p-2 rounded bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs font-mono">
                [ALERT] Elevated resource pressure detected ({row.cpu}% CPU, {row.memory}% RAM).
              </div>
            ) : (
              <div className="p-2 rounded bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 text-xs font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                No active firing incidents. Health checks passing.
              </div>
            )}
          </div>

          {/* Recent Activity Stream */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1.5 font-mono text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 text-slate-300 font-sans font-semibold text-xs">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Recent Activity Stream</span>
            </div>
            <p className="text-slate-500">[22:47:10] OTel heartbeat received (status: healthy)</p>
            <p className="text-slate-400">
              [22:47:11] Network IO spike: in={row.network}, latency={row.latency}
            </p>
            <p className="text-cyan-400">
              [22:47:12] Prometheus scrape complete. Metric points exported.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onViewInfrastructure(row.resource);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-sm"
          >
            <span>View Infrastructure Details</span>
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
  );
};
