import React from 'react';
import {
  Cpu,
  HardDrive,
  Server,
  Wifi,
  Thermometer,
  Activity,
  Clock,
  AlertOctagon,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { MonitoringSummaryMetric } from '../../types/monitoring';

interface SummaryMetricsBarProps {
  metrics: MonitoringSummaryMetric[];
}

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  HardDrive,
  Server,
  Wifi,
  Thermometer,
  Activity,
  Clock,
  AlertOctagon
};

export const SummaryMetricsBar: React.FC<SummaryMetricsBarProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3">
      {metrics.map((metric) => {
        const IconComponent = iconMap[metric.icon] || Activity;

        const statusStyles = {
          healthy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
          warning: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
          critical: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
          info: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
        };

        const currentStatusStyle = statusStyles[metric.status];

        return (
          <div
            key={metric.id}
            className="group bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700/80 rounded-lg p-3 transition-all duration-200 shadow-sm flex flex-col justify-between"
          >
            {/* Header: Title & Icon */}
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 line-clamp-1">
                {metric.title}
              </span>
              <div className={`p-1 rounded border ${currentStatusStyle}`}>
                <IconComponent className="w-3 h-3" />
              </div>
            </div>

            {/* Value & Trend */}
            <div className="flex items-baseline justify-between gap-1 mb-1">
              <span className="text-xl font-bold font-mono tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                {metric.value}
              </span>
              <span
                className={`inline-flex items-center text-[9px] font-mono px-1 py-0.2 rounded ${
                  metric.trend.isPositive
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-amber-400 bg-amber-500/10'
                }`}
              >
                {metric.trend.direction === 'up' && <ArrowUpRight className="w-2.5 h-2.5 mr-0.5" />}
                {metric.trend.direction === 'down' && <ArrowDownRight className="w-2.5 h-2.5 mr-0.5" />}
                {metric.trend.direction === 'neutral' && <Minus className="w-2.5 h-2.5 mr-0.5" />}
                {metric.trend.value}
              </span>
            </div>

            {/* Subtle Progress Bar */}
            {metric.progressPercent !== undefined ? (
              <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden mt-1">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    metric.progressPercent > 80
                      ? 'bg-rose-500'
                      : metric.progressPercent > 65
                      ? 'bg-amber-400'
                      : 'bg-cyan-500'
                  }`}
                  style={{ width: `${metric.progressPercent}%` }}
                />
              </div>
            ) : (
              <div className="h-1 w-full mt-1 rounded-full bg-indigo-500/20 group-hover:bg-cyan-500/30 transition-colors" />
            )}
          </div>
        );
      })}
    </div>
  );
};
