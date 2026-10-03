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
import { ApiPerformancePoint } from '../../types/monitoring';
import { Activity, Clock, AlertOctagon } from 'lucide-react';

interface ApiPerformanceSectionProps {
  data: ApiPerformancePoint[];
  currentReqRate: string;
  currentP99Latency: number;
  currentErrorRate: number;
}

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
      <div className="bg-slate-900/95 border border-slate-700 p-2 rounded shadow-xl text-xs font-mono">
        <p className="text-slate-400 mb-0.5">{label}</p>
        <p className="font-bold text-white">
          {payload[0].value} {unit}
        </p>
      </div>
    );
  }
  return null;
};

export const ApiPerformanceSection: React.FC<ApiPerformanceSectionProps> = ({
  data,
  currentReqRate,
  currentP99Latency,
  currentErrorRate
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Activity className="w-4 h-4 text-cyan-400" />
        <h3 className="text-sm font-semibold text-white tracking-wide">
          API & Service Performance
        </h3>
        <span className="text-[11px] font-mono text-slate-500">
          (OpenTelemetry HTTP Traces & Prometheus Metrics)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. API Request Rate */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/70">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                API Request Rate
              </span>
            </div>
            <div className="px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-mono font-bold text-xs">
              {currentReqRate}
            </div>
          </div>

          <div className="h-40 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="reqRateGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="timestamp" stroke="#64748b" fontSize={9} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={9} tickLine={false} />
                <Tooltip content={<CustomTooltip unit="K/min" />} />
                <Area
                  type="monotone"
                  dataKey="requestRate"
                  name="Requests"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#reqRateGrad)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. P99 Latency */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/70">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                P99 Latency
              </span>
            </div>
            <div className="px-2 py-0.5 rounded bg-amber-950/40 border border-amber-500/30 text-amber-300 font-mono font-bold text-xs">
              {currentP99Latency} ms
            </div>
          </div>

          <div className="h-40 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="timestamp" stroke="#64748b" fontSize={9} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={9} tickLine={false} />
                <Tooltip content={<CustomTooltip unit="ms" />} />
                <ReferenceLine y={200} stroke="#f59e0b" strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="p99Latency"
                  name="Latency"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Error Rate */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/70">
            <div className="flex items-center gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Error Rate (5xx)
              </span>
            </div>
            <div className="px-2 py-0.5 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300 font-mono font-bold text-xs">
              {currentErrorRate}%
            </div>
          </div>

          <div className="h-40 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="timestamp" stroke="#64748b" fontSize={9} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={9} tickLine={false} domain={[0, 4]} />
                <Tooltip content={<CustomTooltip unit="%" />} />
                <ReferenceLine y={2.0} stroke="#f43f5e" strokeDasharray="3 3" />
                <Bar
                  dataKey="errorRate"
                  name="5xx Failures"
                  fill="#f43f5e"
                  radius={[2, 2, 0, 0]}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
