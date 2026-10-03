import React from 'react';
import { MonthlyCostTrend } from '../../types/cost';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';

interface CostTrendChartProps {
  data: MonthlyCostTrend[];
}

export const CostTrendChart: React.FC<CostTrendChartProps> = ({ data }) => {
  return (
    <div className="p-4 sm:p-5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-white tracking-tight">
              Monthly Infrastructure Cost Trend & Projection
            </h2>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Historical actual infrastructure expenditure vs. end-of-month projected trend.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-indigo-500 inline-block"></span>
            <span>Actual Cost</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-amber-400 inline-block"></span>
            <span>Projected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-slate-500 inline-block"></span>
            <span>Budget Limit</span>
          </div>
        </div>
      </div>

      <div className="h-60 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="actualCostGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="projCostGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
              tickFormatter={(val) => `$${val}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#090d16',
                borderColor: '#334155',
                borderRadius: '6px',
                fontSize: '11px',
                color: '#f8fafc',
                fontFamily: 'monospace'
              }}
              formatter={(val: number) => [`$${val.toLocaleString()}`]}
            />
            <Area
              type="monotone"
              dataKey="actualCost"
              name="Actual Cost"
              stroke="#6366f1"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#actualCostGrad)"
            />
            <Area
              type="monotone"
              dataKey="projectedCost"
              name="Projected Cost"
              stroke="#fbbf24"
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#projCostGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          Active Billing Cycle: 01 Oct 2026 - 31 Oct 2026 (28 Days Remaining)
        </span>
        <span className="text-emerald-400">Within Budget Target ($5,200/mo cap)</span>
      </div>
    </div>
  );
};
