import React from 'react';
import { EdgeDevice } from '../../types/edge';
import {
  X,
  Radio,
  Cpu,
  Server,
  Layers,
  Activity,
  HardDrive,
  Wifi,
  Thermometer,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, LineChart, Line } from 'recharts';

interface EdgeDeviceDetailModalProps {
  device: EdgeDevice | null;
  onClose: () => void;
  onViewMonitoring: (device: EdgeDevice) => void;
}

export const EdgeDeviceDetailModal: React.FC<EdgeDeviceDetailModalProps> = ({
  device,
  onClose,
  onViewMonitoring
}) => {
  if (!device) return null;

  const getDeviceTypeIcon = (type: EdgeDevice['deviceType']) => {
    switch (type) {
      case 'Edge Gateway':
        return <Radio className="w-5 h-5 text-cyan-400" />;
      case 'IoT Gateway':
        return <Wifi className="w-5 h-5 text-amber-400" />;
      case 'Industrial Controller':
        return <Layers className="w-5 h-5 text-indigo-400" />;
      case 'Raspberry Pi Gateway':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'Edge Server':
        return <Server className="w-5 h-5 text-blue-400" />;
      default:
        return <Cpu className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              {getDeviceTypeIcon(device.deviceType)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-white font-mono">{device.id}</h3>
                <span className="text-xs text-slate-300 font-semibold">{device.name}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                  {device.deviceType}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                    device.status === 'Critical'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      : device.status === 'Warning'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  {device.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {device.facilityName} ({device.location})
                </span>
                <span>•</span>
                <span>IP: {device.ipAddress}</span>
                <span>•</span>
                <span>MAC: {device.macAddress}</span>
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
          {/* 4 Key Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* CPU */}
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-mono uppercase">CPU</span>
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <p
                className={`text-lg font-bold font-mono ${
                  device.cpu > 85 ? 'text-rose-400' : 'text-white'
                }`}
              >
                {device.cpu}%
              </p>
              <div className="w-full bg-slate-800 rounded-full h-1 mt-2">
                <div
                  className={`h-1 rounded-full ${
                    device.cpu > 85 ? 'bg-rose-500' : device.cpu > 70 ? 'bg-amber-400' : 'bg-cyan-500'
                  }`}
                  style={{ width: `${device.cpu}%` }}
                />
              </div>
            </div>

            {/* Memory */}
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-mono uppercase">Memory</span>
                <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <p
                className={`text-lg font-bold font-mono ${
                  device.memory > 80 ? 'text-rose-400' : 'text-white'
                }`}
              >
                {device.memory}%
              </p>
              <div className="w-full bg-slate-800 rounded-full h-1 mt-2">
                <div
                  className="bg-indigo-500 h-1 rounded-full"
                  style={{ width: `${device.memory}%` }}
                />
              </div>
            </div>

            {/* Temperature */}
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-mono uppercase">Temperature</span>
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p
                className={`text-lg font-bold font-mono ${
                  device.temperature > 75 ? 'text-rose-400 animate-pulse' : 'text-amber-300'
                }`}
              >
                {device.temperature}°C
              </p>
              <span className="text-[10px] text-slate-500 font-mono">
                {device.temperature > 75 ? 'Critical Limit Exceeded' : 'Normal Operating Temp'}
              </span>
            </div>

            {/* Disk */}
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-mono uppercase">Disk</span>
                <Server className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <p className="text-lg font-bold font-mono text-white">{device.disk}%</p>
              <div className="w-full bg-slate-800 rounded-full h-1 mt-2">
                <div
                  className="bg-blue-500 h-1 rounded-full"
                  style={{ width: `${device.disk}%` }}
                />
              </div>
            </div>
          </div>

          {/* Device Profile & Operational Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Network</span>
              <span className="font-bold text-slate-200 mt-0.5 block">{device.network}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Uptime</span>
              <span className="font-bold text-slate-200 mt-0.5 block">{device.uptime}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Firmware</span>
              <span className="font-bold text-cyan-300 mt-0.5 block line-clamp-1">{device.firmwareVersion}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Last Seen</span>
              <span className="font-bold text-slate-200 mt-0.5 block">{device.lastSeen}</span>
            </div>
          </div>

          {/* Active Workloads */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1 font-mono text-xs">
            <span className="text-slate-500 text-[10px] uppercase">Active Edge Workloads</span>
            <p className="text-slate-200">{device.activeWorkloads}</p>
          </div>

          {/* Recent Telemetry: 3 mini charts (CPU, Temperature, Network) */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Recent Telemetry (Last 10 minutes)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* CPU Chart */}
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-[11px] font-mono text-slate-400">CPU Usage (%)</span>
                  <span className="text-xs font-bold font-mono text-cyan-300">{device.cpu}%</span>
                </div>
                <div className="h-20 w-full mt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={device.recentTelemetry.cpuHistory} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                      <defs>
                        <linearGradient id="modalEdgeCpu" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" stroke="#64748b" fontSize={8} tickLine={false} />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-slate-900 border border-slate-700 p-1.5 rounded text-[10px] font-mono">
                                <p className="text-slate-400">{label}</p>
                                <p className="text-cyan-300 font-bold">{payload[0].value}%</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#06b6d4"
                        strokeWidth={1.8}
                        fill="url(#modalEdgeCpu)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Temperature Chart */}
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-[11px] font-mono text-slate-400">Temperature (°C)</span>
                  <span className={`text-xs font-bold font-mono ${device.temperature > 75 ? 'text-rose-400' : 'text-amber-300'}`}>
                    {device.temperature}°C
                  </span>
                </div>
                <div className="h-20 w-full mt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={device.recentTelemetry.tempHistory} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                      <XAxis dataKey="time" stroke="#64748b" fontSize={8} tickLine={false} />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-slate-900 border border-slate-700 p-1.5 rounded text-[10px] font-mono">
                                <p className="text-slate-400">{label}</p>
                                <p className="text-amber-300 font-bold">{payload[0].value}°C</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={device.temperature > 75 ? '#f43f5e' : '#f59e0b'}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Network Chart */}
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-[11px] font-mono text-slate-400">Network IO (Mbps)</span>
                  <span className="text-xs font-bold font-mono text-emerald-300">{device.network}</span>
                </div>
                <div className="h-20 w-full mt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={device.recentTelemetry.netHistory} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                      <defs>
                        <linearGradient id="modalEdgeNet" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" stroke="#64748b" fontSize={8} tickLine={false} />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-slate-900 border border-slate-700 p-1.5 rounded text-[10px] font-mono">
                                <p className="text-slate-400">{label}</p>
                                <p className="text-emerald-300 font-bold">{payload[0].value} Mbps</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#10b981"
                        strokeWidth={1.8}
                        fill="url(#modalEdgeNet)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Active Alerts for this device */}
          <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-slate-200 font-semibold text-xs">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Active Alerts & Incidents</span>
            </div>

            {device.alerts && device.alerts.length > 0 ? (
              <div className="space-y-1.5">
                {device.alerts.map((alt) => (
                  <div
                    key={alt.id}
                    className={`p-2.5 rounded border text-xs font-mono flex items-start justify-between gap-2 ${
                      alt.severity === 'CRITICAL'
                        ? 'bg-rose-950/30 border-rose-500/30 text-rose-300'
                        : 'bg-amber-950/30 border-amber-500/30 text-amber-300'
                    }`}
                  >
                    <div className="flex items-start gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      <span>{alt.message}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">{alt.time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 text-xs font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>No active alerts. All hardware sensors and software agents are operating within normal parameters.</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onViewMonitoring(device);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all shadow-sm"
          >
            <span>View in Real-Time Monitoring</span>
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
