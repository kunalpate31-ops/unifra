import React from 'react';
import {
  Bell,
  AlertTriangle,
  AlertCircle,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Server,
  Zap
} from 'lucide-react';
import { AlertSummaryMetrics } from '../../types/alerts';

interface AlertSummaryCardsProps {
  metrics: AlertSummaryMetrics;
}

export const AlertSummaryCards: React.FC<AlertSummaryCardsProps> = ({ metrics }) => {
  const cards = [
    {
      id: 'active',
      title: 'ACTIVE ALERTS',
      value: metrics.activeCount.toString(),
      subtext: 'Firing in cluster',
      status: 'critical',
      icon: Bell,
      trend: { direction: 'up', value: 'Live stream', isPositive: false }
    },
    {
      id: 'critical',
      title: 'CRITICAL',
      value: metrics.criticalCount.toString(),
      subtext: 'Immediate action',
      status: 'critical',
      icon: AlertTriangle,
      trend: { direction: 'neutral', value: 'EDGE-003, Host 2', isPositive: false }
    },
    {
      id: 'high',
      title: 'HIGH SEVERITY',
      value: metrics.highCount.toString(),
      subtext: 'Service degraded',
      status: 'warning',
      icon: ShieldAlert,
      trend: { direction: 'up', value: 'API & DB', isPositive: false }
    },
    {
      id: 'warning',
      title: 'WARNING',
      value: metrics.warningCount.toString(),
      subtext: 'Threshold buffer',
      status: 'warning',
      icon: AlertCircle,
      trend: { direction: 'neutral', value: 'Network & RAM', isPositive: true }
    },
    {
      id: 'acknowledged',
      title: 'ACKNOWLEDGED',
      value: metrics.acknowledgedCount.toString(),
      subtext: 'Under investigation',
      status: 'info',
      icon: Clock,
      trend: { direction: 'up', value: 'Assigned', isPositive: true }
    },
    {
      id: 'resolved',
      title: 'RESOLVED TODAY',
      value: metrics.resolvedCount.toString(),
      subtext: 'Auto & manual fixes',
      status: 'healthy',
      icon: CheckCircle2,
      trend: { direction: 'up', value: '+14 today', isPositive: true }
    },
    {
      id: 'affected',
      title: 'AFFECTED NODES',
      value: metrics.affectedResourcesCount.toString(),
      subtext: 'Cloud & edge resources',
      status: 'info',
      icon: Server,
      trend: { direction: 'neutral', value: '5 impacted', isPositive: false }
    },
    {
      id: 'mttr',
      title: 'MEAN TIME TO RESOLVE',
      value: metrics.mttrMinutes,
      subtext: 'P50 resolution window',
      status: 'healthy',
      icon: Zap,
      trend: { direction: 'down', value: '-4m vs last wk', isPositive: true }
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3">
      {cards.map((card) => {
        const IconComponent = card.icon;

        const statusStyles = {
          healthy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
          warning: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
          critical: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
          info: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
        };

        const currentStatusStyle = statusStyles[card.status as keyof typeof statusStyles];

        return (
          <div
            key={card.id}
            className="group bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700/80 rounded-lg p-3 transition-all duration-200 shadow-sm flex flex-col justify-between"
          >
            {/* Header: Title & Icon */}
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 line-clamp-1">
                {card.title}
              </span>
              <div className={`p-1 rounded border ${currentStatusStyle}`}>
                <IconComponent className="w-3 h-3" />
              </div>
            </div>

            {/* Value & Subtext */}
            <div className="flex items-baseline justify-between gap-1 mb-1">
              <span className="text-xl font-bold font-mono tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                {card.value}
              </span>
              {card.trend && (
                <span
                  className={`inline-flex items-center text-[9px] font-mono px-1 py-0.2 rounded ${
                    card.trend.isPositive
                      ? 'text-emerald-400 bg-emerald-500/10'
                      : 'text-amber-400 bg-amber-500/10'
                  }`}
                >
                  {card.trend.value}
                </span>
              )}
            </div>

            <p className="text-[10px] text-slate-500 font-mono line-clamp-1">{card.subtext}</p>
          </div>
        );
      })}
    </div>
  );
};
