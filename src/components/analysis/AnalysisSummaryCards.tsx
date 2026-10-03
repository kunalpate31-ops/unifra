import React from 'react';
import { AnalysisSummaryMetrics } from '../../types/analysis';
import {
  AlertOctagon,
  Layers,
  Sparkles,
  Server,
  ShieldCheck,
  HelpCircle,
  Clock,
  Play
} from 'lucide-react';

interface AnalysisSummaryCardsProps {
  metrics: AnalysisSummaryMetrics;
}

export const AnalysisSummaryCards: React.FC<AnalysisSummaryCardsProps> = ({ metrics }) => {
  const cards = [
    {
      label: 'Active Incidents',
      value: metrics.activeIncidents,
      subtext: 'Under investigation',
      icon: AlertOctagon,
      textColor: 'text-rose-400',
      badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      iconColor: 'text-rose-400'
    },
    {
      label: 'Correlated Events',
      value: metrics.correlatedEvents,
      subtext: 'Aggregated telemetry',
      icon: Layers,
      textColor: 'text-cyan-400 font-mono',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      iconColor: 'text-cyan-400'
    },
    {
      label: 'Root Causes Identified',
      value: metrics.rootCausesIdentified,
      subtext: 'AI hypothesized',
      icon: Sparkles,
      textColor: 'text-purple-400',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      iconColor: 'text-purple-400'
    },
    {
      label: 'Resources Affected',
      value: metrics.resourcesAffected,
      subtext: 'Across cloud & edge',
      icon: Server,
      textColor: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      iconColor: 'text-amber-400'
    },
    {
      label: 'High Confidence',
      value: metrics.highConfidence,
      subtext: '> 80% certainty',
      icon: ShieldCheck,
      textColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      iconColor: 'text-emerald-400'
    },
    {
      label: 'Medium Confidence',
      value: metrics.mediumConfidence,
      subtext: '60% - 80% score',
      icon: HelpCircle,
      textColor: 'text-indigo-400',
      badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      iconColor: 'text-indigo-400'
    },
    {
      label: 'Unresolved Incidents',
      value: metrics.unresolvedIncidents,
      subtext: 'Needs mitigation',
      icon: Clock,
      textColor: 'text-rose-300',
      badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      iconColor: 'text-rose-400'
    },
    {
      label: 'Analysis Runs',
      value: metrics.analysisRuns,
      subtext: 'Simulated engine runs',
      icon: Play,
      textColor: 'text-slate-200 font-mono',
      badgeBg: 'bg-slate-800 text-slate-400 border-slate-700',
      iconColor: 'text-slate-400'
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
