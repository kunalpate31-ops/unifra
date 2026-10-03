import React from 'react';
import { CostSummaryMetrics } from '../../types/cost';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Server,
  Database,
  HardDrive,
  Network,
  AlertTriangle
} from 'lucide-react';

interface CostSummaryCardsProps {
  metrics: CostSummaryMetrics;
}

export const CostSummaryCards: React.FC<CostSummaryCardsProps> = ({ metrics }) => {
  const cards = [
    {
      label: 'Monthly Cloud Cost',
      value: `$${metrics.monthlyCloudCost.toLocaleString()}`,
      subtext: 'Current billing MTD',
      icon: DollarSign,
      textColor: 'text-white font-mono font-bold',
      badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      iconColor: 'text-indigo-400'
    },
    {
      label: 'Projected Monthly Cost',
      value: `$${metrics.projectedMonthlyCost.toLocaleString()}`,
      subtext: 'End-of-month forecast',
      icon: TrendingUp,
      textColor: 'text-amber-400 font-mono font-bold',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      iconColor: 'text-amber-400'
    },
    {
      label: 'Potential Savings',
      value: `$${metrics.potentialSavings.toLocaleString()}/mo`,
      subtext: 'Active FinOps opportunities',
      icon: TrendingDown,
      textColor: 'text-emerald-400 font-mono font-bold',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      iconColor: 'text-emerald-400'
    },
    {
      label: 'AWS Compute Cost',
      value: `$${metrics.awsComputeCost.toLocaleString()}`,
      subtext: 'EC2 & Container hosts',
      icon: Server,
      textColor: 'text-slate-200 font-mono',
      badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      iconColor: 'text-indigo-400'
    },
    {
      label: 'Database Cost',
      value: `$${metrics.databaseCost.toLocaleString()}`,
      subtext: 'Aurora & ElastiCache',
      icon: Database,
      textColor: 'text-cyan-400 font-mono',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      iconColor: 'text-cyan-400'
    },
    {
      label: 'Storage Cost',
      value: `$${metrics.storageCost.toLocaleString()}`,
      subtext: 'EBS & S3 buckets',
      icon: HardDrive,
      textColor: 'text-emerald-400 font-mono',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      iconColor: 'text-emerald-400'
    },
    {
      label: 'Network Cost',
      value: `$${metrics.networkCost.toLocaleString()}`,
      subtext: 'ALB & Transit Gateway',
      icon: Network,
      textColor: 'text-indigo-400 font-mono',
      badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      iconColor: 'text-indigo-400'
    },
    {
      label: 'Cost Anomalies',
      value: `${metrics.costAnomaliesCount} Active`,
      subtext: 'Spend outliers detected',
      icon: AlertTriangle,
      textColor: 'text-rose-400 font-bold',
      badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      iconColor: 'text-rose-400'
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
              <div className={`text-lg sm:text-xl font-bold ${card.textColor}`}>{card.value}</div>
              <div className="text-[10px] text-slate-500 truncate mt-0.5">{card.subtext}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
