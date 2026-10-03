import React from 'react';
import { CostOptimizationOpportunity } from '../../types/cost';
import {
  ArrowRight,
  TrendingDown,
  Check,
  X,
  Server
} from 'lucide-react';

interface CostOpportunitiesSectionProps {
  opportunities: CostOptimizationOpportunity[];
  onReview: (id: string) => void;
  onApply: (id: string) => void;
  onDismiss: (id: string) => void;
}

export const CostOpportunitiesSection: React.FC<CostOpportunitiesSectionProps> = ({
  opportunities,
  onReview,
  onApply,
  onDismiss
}) => {
  const getPriorityBadge = (prio: string) => {
    switch (prio) {
      case 'High':
        return 'text-amber-400 bg-amber-950/60 border-amber-500/30';
      case 'Medium':
        return 'text-indigo-400 bg-indigo-950/60 border-indigo-500/30';
      case 'Low':
      default:
        return 'text-slate-400 bg-slate-900 border-slate-700';
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>Cost Optimization Opportunities</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 border border-emerald-500/30 text-emerald-300">
              ACTIONABLE FINOPS SUGGESTIONS
            </span>
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Rightsizing, idle instance reclamation, and storage lifecycle optimizations.
          </p>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
          Total Savings: $343/mo ($4,116/yr)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className={`p-4 rounded-lg bg-slate-950/80 border transition-all flex flex-col justify-between space-y-3 ${
              opp.status === 'Applied'
                ? 'border-purple-500/40 bg-purple-950/10'
                : opp.status === 'Dismissed'
                ? 'border-slate-800/60 opacity-50'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="space-y-2.5">
              {/* Header: Title & Priority */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getPriorityBadge(
                      opp.priority
                    )}`}
                  >
                    {opp.priority} Priority
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                    {opp.category}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    opp.status === 'Applied'
                      ? 'bg-purple-950 text-purple-300 border-purple-500/40'
                      : opp.status === 'Reviewed'
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-500/30'
                      : opp.status === 'Dismissed'
                      ? 'bg-slate-900 text-slate-500 border-slate-800 line-through'
                      : 'bg-emerald-950 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  {opp.status}
                </span>
              </div>

              <h3 className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-cyan-400" />
                {opp.title}
              </h3>

              {/* Current vs Recommended */}
              <div className="p-2.5 rounded-md bg-slate-900/90 border border-slate-800/80 text-xs font-mono space-y-1.5">
                <div className="flex items-start gap-2">
                  <span className="text-slate-500 text-[10px] uppercase font-bold w-14 flex-shrink-0 pt-0.5">
                    Current:
                  </span>
                  <span className="text-slate-300 text-[11px]">{opp.currentConfig}</span>
                </div>
                <div className="flex items-start gap-2 border-t border-slate-800/60 pt-1">
                  <span className="text-cyan-400 text-[10px] uppercase font-bold w-14 flex-shrink-0 pt-0.5 flex items-center gap-0.5">
                    <ArrowRight className="w-2.5 h-2.5" /> Target:
                  </span>
                  <span className="text-cyan-200 text-[11px] font-medium">{opp.recommendedConfig}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {opp.reason}
              </p>

              {/* Savings metrics */}
              <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/20 font-mono text-xs text-emerald-300 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Monthly Savings: <strong>${opp.monthlySavings}/mo</strong></span>
                </div>
                <span className="text-[11px] text-emerald-400/80 font-bold">
                  ${opp.yearlySavings}/yr
                </span>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => onReview(opp.id)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-colors"
              >
                Review
              </button>

              <div className="flex items-center gap-1.5">
                {opp.status !== 'Dismissed' && (
                  <button
                    onClick={() => onDismiss(opp.id)}
                    className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-500 hover:text-rose-400 text-xs font-mono transition-colors border border-slate-800"
                    title="Dismiss"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {opp.status !== 'Applied' ? (
                  <button
                    onClick={() => onApply(opp.id)}
                    className="px-3 py-1 rounded bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs font-mono shadow-sm flex items-center gap-1 transition-all"
                  >
                    <Check className="w-3 h-3" />
                    <span>Apply in Demo</span>
                  </button>
                ) : (
                  <span className="px-2.5 py-1 rounded bg-purple-950 text-purple-300 text-xs font-mono font-medium flex items-center gap-1 border border-purple-500/40">
                    <Check className="w-3 h-3 text-purple-400" />
                    Applied
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
