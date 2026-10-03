import React from 'react';
import { CostBreakdownItem } from '../../types/resources';
import { DollarSign, TrendingDown } from 'lucide-react';

interface CostBreakdownSectionProps {
  items: CostBreakdownItem[];
  totalMonthlyCost: number;
}

export const CostBreakdownSection: React.FC<CostBreakdownSectionProps> = ({
  items,
  totalMonthlyCost
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">
              MONTHLY CLOUD COST ALLOCATION & BREAKDOWN
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Estimated usage-based spending across AWS compute, RDS database, storage & data transfer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-3 py-1 rounded bg-slate-950/80 border border-slate-800 flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px]">Total Cloud Spend:</span>
            <span className="text-emerald-400 font-bold text-sm">${totalMonthlyCost.toLocaleString()}/mo</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>-8.4% Optimizations</span>
          </div>
        </div>
      </div>

      {/* Multi-segment Progress Bar */}
      <div className="space-y-1.5">
        <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800/80">
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color
              }}
              title={`${item.category}: $${item.monthlyCost}/mo (${item.percentage}%)`}
              className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full hover:brightness-125 cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* Category Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-semibold text-slate-200">{item.category}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">{item.percentage}%</span>
            </div>

            <div className="flex items-baseline justify-between mt-1">
              <span className="text-base font-bold font-mono text-white">
                ${item.monthlyCost}
                <span className="text-[10px] text-slate-500 font-normal">/mo</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {item.resourceCount} {item.resourceCount === 1 ? 'svc' : 'svcs'}
              </span>
            </div>

            <div className="mt-1 pt-1 border-t border-slate-800/50 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Trend:</span>
              <span className="text-emerald-400">{item.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
