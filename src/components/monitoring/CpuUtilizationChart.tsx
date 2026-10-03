import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { CpuTelemetryPoint } from '../../types/monitoring';
import { Cpu, AlertTriangle } from 'lucide-react';

interface CpuUtilizationChartProps {
  data: CpuTelemetryPoint[];
  current: number;
  average: number;
  peak: number;
  threshold: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border border-slate-700 p-2.5 rounded shadow-xl text-xs font-mono">
        <p className="text-slate-400 font-semibold mb-1">{label}</p>
        {payload.map((entry, idx) => (
          <div key={`item-${idx}`} className="flex items-center justify-between gap-4 py-0.5">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="font-bold text-white">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const CpuUtilizationChart: React.FC<CpuUtilizationChartProps> = ({
  data,
  current,
  average,
  peak,
  threshold
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 shadow-lg flex flex-col justify-between space-y-3">
      {/* Title & Stats Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">CPU Utilization</h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Aggregate cross-cluster telemetry stream
            </p>
          </div>
        </div>

        {/* Stats Pill Box */}
        <div className="flex items-center gap-3 font-mono text-xs flex-wrap">
          <div className="px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 text-[10px]">Current: </span>
            <span className="font-bold text-cyan-300">{current}%</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 text-[10px]">Average: </span>
            <span className="font-bold text-slate-200">{average}%</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 text-[10px]">Peak: </span>
            <span className="font-bold text-amber-300">{peak}%</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            <span className="text-[10px]">Threshold: </span>
            <span className="font-bold">{threshold}%</span>
          </div>
        </div>
      </div>

      {/* Area Chart Container */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 12, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="cpuAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="timestamp" stroke="#64748b" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={threshold}
              stroke="#f43f5e"
              strokeDasharray="4 4"
              label={{
                value: `Critical Limit ${threshold}%`,
                fill: '#f43f5e',
                fontSize: 10,
                position: 'insideTopRight'
              }}
            />
            <Area
              type="monotone"
              dataKey="cpu"
              name="Active CPU"
              stroke="#06b6d4"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#cpuAreaGrad)"
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="avgCpu"
              name="Baseline Avg"
              stroke="#475569"
              strokeWidth={1.5}
              strokeDasharray="3 3"
              fillOpacity={0}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
