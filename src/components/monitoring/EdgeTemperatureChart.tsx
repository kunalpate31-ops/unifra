import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend
} from 'recharts';
import { EdgeTemperaturePoint } from '../../types/monitoring';
import { Thermometer, AlertTriangle } from 'lucide-react';

interface EdgeTemperatureChartProps {
  data: EdgeTemperaturePoint[];
  edge001: number;
  edge002: number;
  edge003: number;
  edge004: number;
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
            <span
              className={`font-bold ${
                entry.name.includes('EDGE-003') ? 'text-rose-400 font-extrabold' : 'text-white'
              }`}
            >
              {entry.value}°C
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const EdgeTemperatureChart: React.FC<EdgeTemperatureChartProps> = ({
  data,
  edge001,
  edge002,
  edge003,
  edge004,
  threshold
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 shadow-lg flex flex-col justify-between space-y-3">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Thermometer className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Edge Device Temperature Trends
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Rack thermal sensors & industrial gateway MCUs
            </p>
          </div>
        </div>

        {/* Temperature Indicators for all 4 devices */}
        <div className="flex items-center gap-2.5 font-mono text-xs flex-wrap">
          <div className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 text-[10px]">EDGE-001: </span>
            <span className="font-bold text-slate-200">{edge001}°C</span>
          </div>
          <div className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 text-[10px]">EDGE-002: </span>
            <span className="font-bold text-slate-200">{edge002}°C</span>
          </div>
          {/* EDGE-003 Visibly stands out */}
          <div className="px-2 py-0.5 rounded bg-rose-950/50 border border-rose-500/40 text-rose-300 font-bold flex items-center gap-1 shadow-sm shadow-rose-950">
            <AlertTriangle className="w-3 h-3 text-rose-400 animate-pulse" />
            <span className="text-[10px]">EDGE-003: </span>
            <span className="animate-pulse">{edge003}°C</span>
          </div>
          <div className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 text-[10px]">EDGE-004: </span>
            <span className="font-bold text-slate-200">{edge004}°C</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 12, right: 12, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="timestamp" stroke="#64748b" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={10} domain={[40, 90]} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }}
            />
            <ReferenceLine
              y={threshold}
              stroke="#f43f5e"
              strokeDasharray="4 4"
              label={{
                value: `Thermal Threshold ${threshold}°C`,
                fill: '#f43f5e',
                fontSize: 10,
                position: 'insideTopRight'
              }}
            />
            <Line
              type="monotone"
              dataKey="edge001"
              name="EDGE-001 (Gateway 1)"
              stroke="#06b6d4"
              strokeWidth={1.8}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="edge002"
              name="EDGE-002 (Pune 1)"
              stroke="#10b981"
              strokeWidth={1.8}
              dot={false}
              isAnimationActive={false}
            />
            {/* EDGE-003 with glowing red stroke and higher width */}
            <Line
              type="monotone"
              dataKey="edge003"
              name="EDGE-003 (Critical Node)"
              stroke="#f43f5e"
              strokeWidth={3}
              dot={{ r: 3, fill: '#f43f5e' }}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="edge004"
              name="EDGE-004 (Pune 2)"
              stroke="#64748b"
              strokeWidth={1.8}
              strokeDasharray="3 3"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
