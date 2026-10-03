import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { NetworkTrafficPoint } from '../../types/monitoring';
import { Wifi, ArrowDown, ArrowUp } from 'lucide-react';

interface NetworkTrafficChartProps {
  data: NetworkTrafficPoint[];
  currentInbound: number;
  currentOutbound: number;
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
            <span className="font-bold text-white">{entry.value} Mbps</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const NetworkTrafficChart: React.FC<NetworkTrafficChartProps> = ({
  data,
  currentInbound,
  currentOutbound
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 shadow-lg flex flex-col justify-between space-y-3">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Wifi className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">Network Traffic</h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Inbound and outbound bandwidth throughput
            </p>
          </div>
        </div>

        {/* Inbound & Outbound Badges */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800 flex items-center gap-1.5">
            <ArrowDown className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400 text-[10px]">Inbound: </span>
            <span className="font-bold text-emerald-300">{currentInbound} Mbps</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800 flex items-center gap-1.5">
            <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-400 text-[10px]">Outbound: </span>
            <span className="font-bold text-blue-300">{currentOutbound} Mbps</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="inboundGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="outboundGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="timestamp" stroke="#64748b" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }}
            />
            <Area
              type="monotone"
              dataKey="inbound"
              name="Inbound Traffic"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#inboundGrad)"
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="outbound"
              name="Outbound Traffic"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#outboundGrad)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
