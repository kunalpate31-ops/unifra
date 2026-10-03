import React from 'react';
import { AuditSummaryMetrics } from '../../types/audit';
import {
  FileText,
  User,
  Sparkles,
  Server,
  Bell,
  Lightbulb,
  Play,
  AlertOctagon
} from 'lucide-react';

interface AuditSummaryCardsProps {
  metrics: AuditSummaryMetrics;
}

export const AuditSummaryCards: React.FC<AuditSummaryCardsProps> = ({ metrics }) => {
  const cards = [
    {
      label: 'Total Events',
      value: metrics.totalEvents,
      subtext: 'Tracked audit entries',
      icon: FileText,
      textColor: 'text-white font-mono font-bold',
      badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      iconColor: 'text-indigo-400'
    },
    {
      label: 'User Actions',
      value: metrics.userActions,
      subtext: 'Approvals & acknowledgements',
      icon: User,
      textColor: 'text-cyan-400 font-mono font-bold',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      iconColor: 'text-cyan-400'
    },
    {
      label: 'AI Actions',
      value: metrics.aiActions,
      subtext: 'RCA & FinOps scans',
      icon: Sparkles,
      textColor: 'text-purple-400 font-mono font-bold',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      iconColor: 'text-purple-400'
    },
    {
      label: 'Infrastructure Events',
      value: metrics.infrastructureEvents,
      subtext: 'Telemetry breaches & state',
      icon: Server,
      textColor: 'text-amber-400 font-mono font-bold',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      iconColor: 'text-amber-400'
    },
    {
      label: 'Alerts Generated',
      value: metrics.alertsGenerated,
      subtext: 'Threshold violations',
      icon: Bell,
      textColor: 'text-rose-400 font-mono font-bold',
      badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      iconColor: 'text-rose-400'
    },
    {
      label: 'Recommendations',
      value: metrics.recommendationsCount,
      subtext: 'Optimization outputs',
      icon: Lightbulb,
      textColor: 'text-emerald-400 font-mono font-bold',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      iconColor: 'text-emerald-400'
    },
    {
      label: 'Control Actions',
      value: metrics.controlActionsCount,
      subtext: 'Remediations & scaling',
      icon: Play,
      textColor: 'text-indigo-300 font-mono font-bold',
      badgeBg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
      iconColor: 'text-indigo-300'
    },
    {
      label: 'Failed Actions',
      value: metrics.failedActionsCount,
      subtext: 'Policy rejections & faults',
      icon: AlertOctagon,
      textColor: 'text-rose-400 font-mono font-bold',
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
