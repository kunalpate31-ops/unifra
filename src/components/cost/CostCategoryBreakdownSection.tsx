import React from 'react';
import { CostCategoryBreakdown } from '../../types/cost';
import {
  Server,
  Database,
  HardDrive,
  Network,
  Layers,
  Box,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface CostCategoryBreakdownSectionProps {
  breakdown: CostCategoryBreakdown[];
}

export const CostCategoryBreakdownSection: React.FC<CostCategoryBreakdownSectionProps> = ({
  breakdown
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Compute':
        return <Server className="w-4 h-4 text-indigo-400" />;
      case 'Database':
        return <Database className="w-4 h-4 text-cyan-400" />;
      case 'Storage':
        return <HardDrive className="w-4 h-4 text-emerald-400" />;
      case 'Network':
        return <Network className="w-4 h-4 text-amber-400" />;
      case 'Kubernetes':
        return <Layers className="w-4 h-4 text-purple-400" />;
      case 'Other':
      default:
        return <Box className="w-4 h-4 text-slate-400" />;
    }
  };

  const getBarColor = (category: string) => {
    switch (category) {
      case 'Compute':
        return 'bg-indigo-500';
      case 'Database':
        return 'bg-cyan-500';
      case 'Storage':
        return 'bg-emerald-500';
      case 'Network':
        return 'bg-amber-500';
      case 'Kubernetes':
        return 'bg-purple-500';
      case 'Other':
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>Cost Breakdown by Infrastructure Category</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950 border border-indigo-500/30 text-indigo-300">
              EXPENSE ALLOCATION
            </span>
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Distribution of current month infrastructure spending across architecture domains.
          </p>
        </div>
      </div>

      {/* Category Breakdown Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {breakdown.map((item) => (
          <div
            key={item.category}
            className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800/90 space-y-2 hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-200">
                {getCategoryIcon(item.category)}
                <span>{item.category}</span>
              </div>
              <span className="text-xs font-bold text-white font-mono">
                ${item.cost.toLocaleString()}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full ${getBarColor(item.category)} rounded-full`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>{item.percentage}% of total spend</span>
              <div className="flex items-center gap-1">
                {item.monthlyChange > 0 ? (
                  <span className="text-rose-400 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> +{item.monthlyChange}% MoM
                  </span>
                ) : item.monthlyChange < 0 ? (
                  <span className="text-emerald-400 flex items-center gap-0.5">
                    <TrendingDown className="w-3 h-3" /> {item.monthlyChange}% MoM
                  </span>
                ) : (
                  <span className="text-slate-500">0.0% MoM</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
