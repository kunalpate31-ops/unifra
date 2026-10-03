import React from 'react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { TelemetryPoint, ScopeFilter, TimeRange } from '../../types/dashboard';
import { Activity, Cpu, HardDrive, Wifi, Clock, AlertOctagon } from 'lucide-react';

interface TelemetryChartsProps {
  data: TelemetryPoint[];
  currentScope: ScopeFilter;
  onScopeChange: (scope: ScopeFilter) => void;
  currentRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

const SCOPES: ScopeFilter[] = ['All', 'AWS', 'Edge', 'On-Premise'];
const RANGES: TimeRange[] = ['15m', '1h', '6h', '24h'];

// Custom Dark Tooltip
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
  unit?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, unit = '' }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border border-slate-700/80 p-2.5 rounded shadow-xl text-xs font-mono backdrop-blur-sm z-50">
        <p className="text-slate-400 font-semibold mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4 py-0.5">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="font-bold text-white">
              {entry.value} {unit}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const TelemetryCharts: React.FC<TelemetryChartsProps> = ({
  data,
  currentScope,
  onScopeChange,
  currentRange,
  onRangeChange
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 shadow-lg space-y-4">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base font-semibold text-white tracking-wide">
              Real-Time Infrastructure Telemetry
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Streaming OpenTelemetry metrics scraped via Prometheus TSDB
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Scope Filters */}
          <div className="inline-flex rounded-lg p-0.5 bg-slate-950/80 border border-slate-800 text-xs font-medium">
            {SCOPES.map((scope) => (
              <button
                key={scope}
                onClick={() => onScopeChange(scope)}
                className={`px-3 py-1 rounded-md transition-all ${
                  currentScope === scope
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {scope}
              </button>
            ))}
          </div>

          {/* Time Range Selector */}
          <div className="inline-flex rounded-lg p-0.5 bg-slate-950/80 border border-slate-800 text-xs font-mono">
            {RANGES.map((range) => (
              <button
                key={range}
                onClick={() => onRangeChange(range)}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  currentRange === range
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Charts Grid: 2 Columns for Primary + 3 Columns for Secondary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 1. CPU Utilization Chart */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-medium text-slate-200 uppercase tracking-wider">
                CPU Utilization
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="text-slate-400">Current:</span>
              <span className="font-bold text-cyan-300">
                {data.length > 0 ? `${data[data.length - 1].cpu}%` : '--'}
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">Threshold:</span>
              <span className="text-rose-400">85%</span>
            </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="timestamp" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} tickLine={false} />
                <Tooltip content={<CustomTooltip unit="%" />} />
                <ReferenceLine y={85} stroke="#f43f5e" strokeDasharray="3 3" />
                <Area
                  type="monotone"
                  dataKey="cpu"
                  name="CPU Load"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#cpuGradient)"
                  isAnimationActive={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Memory Utilization Chart */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-medium text-slate-200 uppercase tracking-wider">
                Memory Utilization
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="text-slate-400">Current:</span>
              <span className="font-bold text-indigo-300">
                {data.length > 0 ? `${data[data.length - 1].memory}%` : '--'}
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">Warning:</span>
              <span className="text-amber-400">80%</span>
            </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="memGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="timestamp" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} tickLine={false} />
                <Tooltip content={<CustomTooltip unit="%" />} />
                <ReferenceLine y={80} stroke="#f59e0b" strokeDasharray="3 3" />
                <Area
                  type="monotone"
                  dataKey="memory"
                  name="RAM Util"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#memGradient)"
                  isAnimationActive={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Row: 3 Dense Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        {/* 3. Network Traffic */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] font-medium text-slate-300 uppercase">
                Network Traffic
              </span>
            </div>
            <div className="text-[10px] font-mono text-emerald-400">
              {data.length > 0 ? `${data[data.length - 1].networkIn} Mbps` : '--'}
            </div>
          </div>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="netGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="timestamp" stroke="#64748b" fontSize={9} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={9} tickLine={false} />
                <Tooltip content={<CustomTooltip unit="Mbps" />} />
                <Area
                  type="monotone"
                  dataKey="networkIn"
                  name="Inbound"
                  stroke="#10b981"
                  strokeWidth={1.5}
                  fillOpacity={1}
                  fill="url(#netGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="networkOut"
                  name="Outbound"
                  stroke="#3b82f6"
                  strokeWidth={1.5}
                  fillOpacity={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. API Latency */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-medium text-slate-300 uppercase">
                API Latency (p99)
              </span>
            </div>
            <div className="text-[10px] font-mono text-amber-400">
              {data.length > 0 ? `${data[data.length - 1].apiLatency} ms` : '--'}
            </div>
          </div>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="timestamp" stroke="#64748b" fontSize={9} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={9} tickLine={false} />
                <Tooltip content={<CustomTooltip unit="ms" />} />
                <ReferenceLine y={250} stroke="#f59e0b" strokeDasharray="2 2" />
                <Line
                  type="monotone"
                  dataKey="apiLatency"
                  name="Latency"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5. Error Rate */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-[11px] font-medium text-slate-300 uppercase">
                Error Rate (5xx)
              </span>
            </div>
            <div className="text-[10px] font-mono text-rose-400">
              {data.length > 0 ? `${data[data.length - 1].errorRate}%` : '--'}
            </div>
          </div>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="timestamp" stroke="#64748b" fontSize={9} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={9} tickLine={false} />
                <Tooltip content={<CustomTooltip unit="%" />} />
                <Bar dataKey="errorRate" name="5xx Errors" fill="#f43f5e" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
