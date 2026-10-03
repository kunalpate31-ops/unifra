import React from 'react';
import {
  Activity,
  Cloud,
  Cpu,
  AlertTriangle,
  Sparkles,
  DollarSign,
  Gauge,
  Network,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { StatMetric } from '../../types/dashboard';

interface StatCardProps {
  stat: StatMetric;
}

const iconMap: Record<string, React.ElementType> = {
  Activity,
  Cloud,
  Cpu,
  AlertTriangle,
  Sparkles,
  DollarSign,
  Gauge,
  Network
};

export const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const IconComponent = iconMap[stat.icon] || Activity;

  // Status-driven styling tokens
  const statusStyles = {
    healthy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    warning: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    critical: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    info: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
  };

  const currentStatusStyle = statusStyles[stat.status || 'info'];

  return (
    <div className="relative group bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700/80 rounded-lg p-3.5 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-cyan-950/20 flex flex-col justify-between">
      {/* Top Header: Title & Icon */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[11px] font-medium tracking-wider uppercase text-slate-400 line-clamp-1">
          {stat.title}
        </span>
        <div className={`p-1.5 rounded-md border ${currentStatusStyle}`}>
          <IconComponent className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="flex items-baseline justify-between gap-1 mb-1">
        <span className="text-2xl font-bold font-mono tracking-tight text-white group-hover:text-cyan-300 transition-colors">
          {stat.value}
        </span>

        {/* Trend Indicator */}
        {stat.trend && (
          <span
            className={`inline-flex items-center text-[10px] font-mono font-medium px-1.5 py-0.5 rounded ${
              stat.trend.isPositive
                ? 'text-emerald-400 bg-emerald-500/10'
                : 'text-amber-400 bg-amber-500/10'
            }`}
          >
            {stat.trend.direction === 'up' && <ArrowUpRight className="w-2.5 h-2.5 mr-0.5" />}
            {stat.trend.direction === 'down' && <ArrowDownRight className="w-2.5 h-2.5 mr-0.5" />}
            {stat.trend.direction === 'neutral' && <Minus className="w-2.5 h-2.5 mr-0.5" />}
            {stat.trend.value}
          </span>
        )}
      </div>

      {/* Subtext */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
        <span>{stat.subtext}</span>
      </div>

      {/* Subtle indicator bar */}
      <div
        className={`h-0.5 w-full mt-2 rounded-full ${
          stat.status === 'critical'
            ? 'bg-rose-500/50'
            : stat.status === 'warning'
            ? 'bg-amber-500/50'
            : 'bg-indigo-500/30 group-hover:bg-cyan-500/50'
        } transition-colors`}
      />
    </div>
  );
};
