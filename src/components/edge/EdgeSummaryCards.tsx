import React from 'react';
import {
  Cpu,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Activity,
  Thermometer,
  Wifi,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { EdgeSummaryCardData } from '../../types/edge';

interface EdgeSummaryCardsProps {
  cards: EdgeSummaryCardData[];
}

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Activity,
  Thermometer,
  Wifi,
  MapPin
};

export const EdgeSummaryCards: React.FC<EdgeSummaryCardsProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3">
      {cards.map((card) => {
        const IconComponent = iconMap[card.icon] || Cpu;

        const statusStyles = {
          healthy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
          warning: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
          critical: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
          info: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
        };

        const currentStatusStyle = statusStyles[card.status];

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
                  {card.trend.direction === 'up' && <ArrowUpRight className="w-2.5 h-2.5 mr-0.5" />}
                  {card.trend.direction === 'down' && <ArrowDownRight className="w-2.5 h-2.5 mr-0.5" />}
                  {card.trend.direction === 'neutral' && <Minus className="w-2.5 h-2.5 mr-0.5" />}
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
