import React from 'react';
import { InventoryResource } from '../../types/resources';
import {
  X,
  Cloud,
  Cpu,
  Server,
  Box,
  Layers,
  Database,
  Activity,
  HardDrive,
  Wifi,
  Clock,
  Thermometer,
  ExternalLink,
  DollarSign,
  MapPin,
  Calendar,
  Network
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';

interface InfrastructureResourceModalProps {
  resource: InventoryResource | null;
  onClose: () => void;
  onViewMetrics: (resource: InventoryResource) => void;
}

export const InfrastructureResourceModal: React.FC<InfrastructureResourceModalProps> = ({
  resource,
  onClose,
  onViewMetrics
}) => {
  if (!resource) return null;

  const getTypeIcon = (type: InventoryResource['type']) => {
    switch (type) {
      case 'AWS EC2':
        return <Cloud className="w-5 h-5 text-cyan-400" />;
      case 'AWS RDS':
        return <Database className="w-5 h-5 text-indigo-400" />;
      case 'AWS ElastiCache':
        return <Database className="w-5 h-5 text-blue-400" />;
      case 'Edge Gateway':
      case 'IoT Device':
        return <Cpu className="w-5 h-5 text-amber-400" />;
      case 'Docker':
        return <Box className="w-5 h-5 text-cyan-400" />;
      case 'Kubernetes':
        return <Layers className="w-5 h-5 text-indigo-400" />;
      case 'On-Premise Network':
        return <Network className="w-5 h-5 text-slate-400" />;
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
            <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              {getTypeIcon(resource.type)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-white font-mono">{resource.name}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                  {resource.type}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                    resource.status === 'Critical'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      : resource.status === 'Warning'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  {resource.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {resource.location} ({resource.environment})
                </span>
                <span>•</span>
                <span>IP: {resource.ipAddress}</span>
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

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs font-sans">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* CPU */}
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-mono uppercase">CPU</span>
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <p
                className={`text-lg font-bold font-mono ${
                  resource.cpu > 85 ? 'text-rose-400' : 'text-white'
                }`}
              >
                {resource.cpu}%
              </p>
              <div className="w-full bg-slate-800 rounded-full h-1 mt-2">
                <div
                  className={`h-1 rounded-full ${
                    resource.cpu > 85
                      ? 'bg-rose-500'
                      : resource.cpu > 70
                      ? 'bg-amber-400'
                      : 'bg-cyan-500'
                  }`}
                  style={{ width: `${resource.cpu}%` }}
                />
              </div>
            </div>

            {/* Memory */}
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-mono uppercase">Memory</span>
                <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <p className="text-lg font-bold font-mono text-white">{resource.memory}%</p>
              <div className="w-full bg-slate-800 rounded-full h-1 mt-2">
                <div
                  className="bg-indigo-500 h-1 rounded-full"
                  style={{ width: `${resource.memory}%` }}
                />
              </div>
            </div>

            {/* Disk */}
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-mono uppercase">Disk Usage</span>
                <Server className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <p className="text-lg font-bold font-mono text-white">{resource.disk}%</p>
              <div className="w-full bg-slate-800 rounded-full h-1 mt-2">
                <div
                  className="bg-blue-500 h-1 rounded-full"
                  style={{ width: `${resource.disk}%` }}
                />
              </div>
            </div>

            {/* Monthly Cost */}
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-mono uppercase">Monthly Cost</span>
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <p className="text-lg font-bold font-mono text-emerald-300">
                {resource.monthlyCost > 0 ? `$${resource.monthlyCost}/mo` : 'Included'}
              </p>
              <span className="text-[10px] text-slate-500 font-mono">
                {resource.monthlyCost > 0 ? 'Cloud resource' : 'Hardware Asset'}
              </span>
            </div>
          </div>

          {/* Secondary Telemetry: Network + Latency + Temperature + Uptime */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-mono uppercase">Network</span>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <p className="text-sm font-bold font-mono text-slate-200">{resource.network}</p>
              <span className="text-[10px] text-slate-500 font-mono">Throughput</span>
            </div>

            {resource.apiLatency ? (
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-mono uppercase">API Latency</span>
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <p
                  className={`text-sm font-bold font-mono ${
                    parseInt(resource.apiLatency) > 250 ? 'text-rose-400' : 'text-slate-200'
                  }`}
                >
                  {resource.apiLatency}
                </p>
                <span className="text-[10px] text-slate-500 font-mono">P99 response</span>
              </div>
            ) : null}

            {resource.temperature !== undefined ? (
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-mono uppercase">Temperature</span>
                  <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <p
                  className={`text-sm font-bold font-mono ${
                    resource.temperature > 75 ? 'text-rose-400 animate-pulse' : 'text-slate-200'
                  }`}
                >
                  {resource.temperature}°C
                </p>
                <span className="text-[10px] text-slate-500 font-mono">Rack MCU sensor</span>
              </div>
            ) : null}

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-mono uppercase">Uptime</span>
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <p className="text-sm font-bold font-mono text-slate-200">{resource.uptime}</p>
              <span className="text-[10px] text-slate-500 font-mono">Last seen: {resource.lastSeen}</span>
            </div>
          </div>

          {/* Hardware & Instance Specifications */}
          <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1.5 font-mono text-xs">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Instance Specifications</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300">
              <div>
                <span className="text-slate-500">vCPU: </span>
                <span className="font-bold text-white">{resource.specs.cores} Cores</span>
              </div>
              <div>
                <span className="text-slate-500">RAM: </span>
                <span className="font-bold text-white">{resource.specs.ramGb} GB</span>
              </div>
              <div>
                <span className="text-slate-500">Storage: </span>
                <span className="font-bold text-white">{resource.specs.storageGb} GB</span>
              </div>
              <div>
                <span className="text-slate-500">Engine: </span>
                <span className="font-bold text-cyan-300 line-clamp-1">{resource.specs.osOrEngine}</span>
              </div>
            </div>
          </div>

          {/* Active Workloads */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1 font-mono text-xs">
            <span className="text-slate-500 text-[10px] uppercase">Active Workloads & Services</span>
            <p className="text-slate-200">{resource.workload}</p>
          </div>

          {/* Recent Telemetry Sparkline */}
          <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>Recent Telemetry (Last 10 minutes)</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">CPU & Memory %</span>
            </div>

            <div className="h-24 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={resource.recentTelemetry} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="modalCpuGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={resource.cpu > 85 ? '#f43f5e' : '#06b6d4'}
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="95%"
                        stopColor={resource.cpu > 85 ? '#f43f5e' : '#06b6d4'}
                        stopOpacity={0.0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#64748b" fontSize={9} tickLine={false} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900 border border-slate-700 p-2 rounded text-[11px] font-mono">
                            <p className="text-slate-400">{label}</p>
                            <p className="text-cyan-300 font-bold">CPU: {payload[0].value}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="cpu"
                    stroke={resource.cpu > 85 ? '#f43f5e' : '#06b6d4'}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#modalCpuGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onViewMetrics(resource);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-sm"
          >
            <span>View Real-Time Metrics</span>
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
