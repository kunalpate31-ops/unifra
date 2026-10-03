import { TrendingDown, Calendar } from 'lucide-react';

interface SavingsForecastSectionProps {
  currentMonthlyCost: number;
  optimizedMonthlyCost: number;
  monthlySavings: number;
  annualSavings: number;
}

export const SavingsForecastSection: React.FC<SavingsForecastSectionProps> = ({
  currentMonthlyCost,
  optimizedMonthlyCost,
  monthlySavings,
  annualSavings
}) => {
  const savingsPercent = ((monthlySavings / currentMonthlyCost) * 100).toFixed(1);

  return (
    <div className="p-4 sm:p-5 rounded-lg bg-gradient-to-r from-slate-900 via-slate-900/95 to-indigo-950/30 border border-slate-800 space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>Potential Savings Forecast & ROI Simulation</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 border border-emerald-500/30 text-emerald-300">
              FINOPS PROJECTION
            </span>
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Simulated end-of-year impact upon applying all recommended rightsizing and lifecycle policies.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Current Monthly */}
        <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1 font-mono">
          <span className="text-[10px] uppercase text-slate-500 font-bold block">Current Monthly Cost</span>
          <div className="text-xl font-bold text-slate-200">${currentMonthlyCost.toLocaleString()}/mo</div>
          <span className="text-[10px] text-slate-500">Unoptimized baseline spend</span>
        </div>

        {/* Card 2: Optimized Monthly */}
        <div className="p-3.5 rounded-lg bg-indigo-950/30 border border-indigo-500/40 space-y-1 font-mono">
          <span className="text-[10px] uppercase text-indigo-400 font-bold block">Optimized Monthly Cost</span>
          <div className="text-xl font-bold text-cyan-300">${optimizedMonthlyCost.toLocaleString()}/mo</div>
          <span className="text-[10px] text-indigo-300/80">Post-optimization run rate</span>
        </div>

        {/* Card 3: Monthly Savings */}
        <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 space-y-1 font-mono">
          <span className="text-[10px] uppercase text-emerald-400 font-bold block">Monthly Savings</span>
          <div className="text-xl font-bold text-emerald-300 flex items-center gap-1">
            <TrendingDown className="w-4 h-4 text-emerald-400" />
            ${monthlySavings.toLocaleString()}/mo
          </div>
          <span className="text-[10px] text-emerald-400/80 font-bold">{savingsPercent}% total reduction</span>
        </div>

        {/* Card 4: Annualized Savings */}
        <div className="p-3.5 rounded-lg bg-gradient-to-br from-emerald-950/60 to-slate-950 border border-emerald-500/50 space-y-1 font-mono">
          <span className="text-[10px] uppercase text-emerald-400 font-bold block">Annualized Savings</span>
          <div className="text-xl font-bold text-white flex items-center gap-1">
            <Calendar className="w-4 h-4 text-emerald-400" />
            ${annualSavings.toLocaleString()}/yr
          </div>
          <span className="text-[10px] text-emerald-300/90 font-bold">12-Month Projected ROI</span>
        </div>
      </div>
    </div>
  );
};
