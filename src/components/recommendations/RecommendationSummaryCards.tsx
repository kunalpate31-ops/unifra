import React from 'react';
import { RecommendationSummaryMetrics } from '../../types/recommendations';
import {
  Lightbulb,
  AlertTriangle,
  DollarSign,
  Zap,
  ShieldCheck,
  TrendingDown,
  Layers,
  CheckCircle2
} from 'lucide-react';

interface RecommendationSummaryCardsProps {
  metrics: RecommendationSummaryMetrics;
}

export const RecommendationSummaryCards: React.FC<RecommendationSummaryCardsProps> = ({ metrics }) => {
  const cards = [
    {
      label: 'Total Recommendations',
      value: metrics.totalCount,
      subtext: 'Active suggestions',
      icon: Lightbulb,
      textColor: 'text-white',
      badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      iconColor: 'text-indigo-400'
    },
    {
      label: 'High Priority',
      value: metrics.highPriorityCount,
      subtext: 'Requires attention',
      icon: AlertTriangle,
      textColor: 'text-rose-400',
      badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      iconColor: 'text-rose-400'
    },
    {
      label: 'Cost Optimization',
      value: metrics.costCount,
      subtext: 'Rightsizing & tiers',
      icon: DollarSign,
      textColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      iconColor: 'text-emerald-400'
    },
    {
      label: 'Performance',
      value: metrics.performanceCount,
      subtext: 'Latency & throughput',
      icon: Zap,
      textColor: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      iconColor: 'text-cyan-400'
    },
    {
      label: 'Reliability',
      value: metrics.reliabilityCount,
      subtext: 'Thermal & failover',
      icon: ShieldCheck,
      textColor: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      iconColor: 'text-amber-400'
    },
    {
      label: 'Est. Monthly Savings',
      value: `$${metrics.estimatedMonthlySavingsTotal}`,
      subtext: 'Calculated baseline',
      icon: TrendingDown,
      textColor: 'text-emerald-400 font-mono font-bold',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      iconColor: 'text-emerald-400'
    },
    {
      label: 'Resources Analyzed',
      value: metrics.resourcesAnalyzedCount,
      subtext: 'Hybrid nodes & pods',
      icon: Layers,
      textColor: 'text-slate-200 font-mono',
      badgeBg: 'bg-slate-800 text-slate-400 border-slate-700',
      iconColor: 'text-slate-400'
    },
    {
      label: 'Recommendations Applied',
      value: metrics.recommendationsAppliedCount,
      subtext: 'Simulated applied',
      icon: CheckCircle2,
      textColor: 'text-purple-400 font-mono',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      iconColor: 'text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-medium text-slate-400 truncate leading-tight" title={card.label}>
                {card.label}
              </span>
              <div className={`p-1 rounded border ${card.badgeBg}`}>
                <Icon className={`w-3 h-3 ${card.iconColor}`} />
              </div>
            </div>
            <div>
              <div className={`text-xl font-bold ${card.textColor}`}>{card.value}</div>
              <div className="text-[10px] text-slate-500 truncate mt-0.5">{card.subtext}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
