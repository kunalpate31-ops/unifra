import React from 'react';
import { ActionSummaryMetrics } from '../../types/actions';
import {
  Clock,
  CheckCircle2,
  Play,
  Check,
  AlertOctagon,
  Calendar,
  Activity,
  ShieldCheck
} from 'lucide-react';

interface ActionSummaryCardsProps {
  metrics: ActionSummaryMetrics;
}

export const ActionSummaryCards: React.FC<ActionSummaryCardsProps> = ({ metrics }) => {
  const cards = [
    {
      label: 'Pending Approval',
      value: metrics.pendingApproval,
      subtext: 'Awaiting operator review',
      icon: Clock,
      textColor: 'text-amber-400 font-bold',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      iconColor: 'text-amber-400'
    },
    {
      label: 'Approved',
      value: metrics.approved,
      subtext: 'Ready for execution',
      icon: CheckCircle2,
      textColor: 'text-cyan-400 font-bold',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      iconColor: 'text-cyan-400'
    },
    {
      label: 'Executing',
      value: metrics.executing,
      subtext: 'In-flight workflows',
      icon: Play,
      textColor: 'text-indigo-400 font-bold',
      badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      iconColor: 'text-indigo-400'
    },
    {
      label: 'Completed',
      value: metrics.completed,
      subtext: 'Successfully finished',
      icon: Check,
      textColor: 'text-emerald-400 font-bold',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      iconColor: 'text-emerald-400'
    },
    {
      label: 'Failed',
      value: metrics.failed,
      subtext: 'Execution faults',
      icon: AlertOctagon,
      textColor: 'text-rose-400 font-bold',
      badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      iconColor: 'text-rose-400'
    },
    {
      label: 'Scheduled',
      value: metrics.scheduled,
      subtext: 'Automated recurring tasks',
      icon: Calendar,
      textColor: 'text-purple-400 font-bold',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      iconColor: 'text-purple-400'
    },
    {
      label: 'Actions Today',
      value: metrics.actionsToday,
      subtext: 'Past 24-hour cycle',
      icon: Activity,
      textColor: 'text-slate-200 font-mono font-bold',
      badgeBg: 'bg-slate-800 text-slate-400 border-slate-700',
      iconColor: 'text-slate-400'
    },
    {
      label: 'Success Rate',
      value: metrics.successRate,
      subtext: 'Autonomous & manual',
      icon: ShieldCheck,
      textColor: 'text-emerald-400 font-mono font-bold',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      iconColor: 'text-emerald-400'
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
