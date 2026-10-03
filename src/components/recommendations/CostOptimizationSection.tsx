import React from 'react';
import { CostBreakdownItem } from '../../types/recommendations';
import { DollarSign, TrendingDown, Server, Database, HardDrive, Network, Cpu } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface CostOptimizationSectionProps {
  breakdown: CostBreakdownItem[];
}

export const CostOptimizationSection: React.FC<CostOptimizationSectionProps> = ({ breakdown }) => {
  const totalCurrent = breakdown.reduce((acc, curr) => acc + curr.currentCost, 0);
  const totalOptimized = breakdown.reduce((acc, curr) => acc + curr.optimizedCost, 0);
  const totalSavings = totalCurrent - totalOptimized;
  const overallSavingsPercent = ((totalSavings / totalCurrent) * 100).toFixed(1);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Compute':
        return <Server className="w-3.5 h-3.5 text-indigo-400" />;
      case 'Database':
        return <Database className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Storage':
        return <HardDrive className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Network':
        return <Network className="w-3.5 h-3.5 text-amber-400" />;
      case 'Edge':
      default:
        return <Cpu className="w-3.5 h-3.5 text-rose-400" />;
    }
  };

  const chartData = breakdown.map((item) => ({
    name: item.category,
    Current: item.currentCost,
    Optimized: item.optimizedCost,
    Savings: item.savings
  }));

  return (
    <div className="p-4 sm:p-5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-4 shadow-sm">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Potential Monthly Savings & Cost Optimization
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Calculated rightsizing, cold storage tiering, and edge workload efficiency opportunities.
          </p>
        </div>

        {/* Aggregate KPI Badges */}
        <div className="flex items-center gap-3 font-mono text-xs flex-wrap">
          <div className="px-3 py-1.5 rounded-md bg-slate-950 border border-slate-800">
            <span className="text-slate-500 text-[10px] block">Current Estimated Cost</span>
            <span className="text-slate-200 font-bold">${totalCurrent.toLocaleString()}/mo</span>
          </div>

          <div className="px-3 py-1.5 rounded-md bg-slate-950 border border-slate-800">
            <span className="text-slate-500 text-[10px] block">Potential Optimized Cost</span>
            <span className="text-cyan-300 font-bold">${totalOptimized.toLocaleString()}/mo</span>
          </div>

          <div className="px-3 py-1.5 rounded-md bg-emerald-950/70 border border-emerald-500/30 text-emerald-300">
            <span className="text-emerald-400/80 text-[10px] block">Total Monthly Savings</span>
            <span className="text-emerald-300 font-bold flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
              ${totalSavings.toLocaleString()}/mo ({overallSavingsPercent}%)
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Bar Chart & Category Breakdown Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left: Recharts Horizontal/Vertical Comparison Chart */}
        <div className="lg:col-span-7 bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Spend Comparison by Infrastructure Domain ($/mo)</span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-slate-600 inline-block"></span> Current
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block"></span> Optimized
              </span>
            </div>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <XAxis
                  dataKey="name"
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
                  formatter={(val: number) => [`$${val}/mo`]}
                />
                <Bar dataKey="Current" fill="#475569" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Optimized" fill="#10b981" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Category Savings Progress Bars */}
        <div className="lg:col-span-5 space-y-2.5">
          {breakdown.map((item) => {
            const savingsPct = item.percentSavings;
            return (
              <div
                key={item.category}
                className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-slate-300 font-semibold">
                    {getCategoryIcon(item.category)}
                    <span>{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-slate-500 text-[11px]">${item.currentCost} → ${item.optimizedCost}</span>
                    <span className="text-emerald-400 font-bold">-${item.savings}/mo</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(savingsPct * 3.5, 100)}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Efficiency Gain</span>
                  <span className="text-emerald-400/90">{savingsPct}% reduction</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
