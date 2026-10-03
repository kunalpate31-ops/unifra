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
import { MemoryTelemetryPoint } from '../../types/monitoring';
import { HardDrive, AlertCircle } from 'lucide-react';

interface MemoryUtilizationChartProps {
  data: MemoryTelemetryPoint[];
  current: number;
  average: number;
  peak: number;
  warning: number;
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

export const MemoryUtilizationChart: React.FC<MemoryUtilizationChartProps> = ({
  data,
  current,
  average,
  peak,
  warning
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 shadow-lg flex flex-col justify-between space-y-3">
      {/* Title & Stats Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <HardDrive className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">Memory Utilization</h3>
            <p className="text-[11px] text-slate-400 font-mono">
              RAM utilization across cloud instances & edge workers
            </p>
          </div>
        </div>

        {/* Stats Pill Box */}
        <div className="flex items-center gap-3 font-mono text-xs flex-wrap">
          <div className="px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 text-[10px]">Current: </span>
            <span className="font-bold text-indigo-300">{current}%</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 text-[10px]">Average: </span>
            <span className="font-bold text-slate-200">{average}%</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 text-[10px]">Peak: </span>
            <span className="font-bold text-amber-300">{peak}%</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-amber-950/40 border border-amber-500/30 text-amber-300 flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-amber-400" />
            <span className="text-[10px]">Warning: </span>
            <span className="font-bold">{warning}%</span>
          </div>
        </div>
      </div>

      {/* Area Chart Container */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 12, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="memAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="timestamp" stroke="#64748b" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={warning}
              stroke="#f59e0b"
              strokeDasharray="4 4"
              label={{
                value: `Warning Threshold ${warning}%`,
                fill: '#f59e0b',
                fontSize: 10,
                position: 'insideTopRight'
              }}
            />
            <Area
              type="monotone"
              dataKey="memory"
              name="Active RAM"
              stroke="#6366f1"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#memAreaGrad)"
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="avgMemory"
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
