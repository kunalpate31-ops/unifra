import React from 'react';
import { CostAnomalyItem } from '../../types/cost';
import {
  Clock,
  Server,
  TrendingUp
} from 'lucide-react';

interface CostAnomaliesSectionProps {
  anomalies: CostAnomalyItem[];
}

export const CostAnomaliesSection: React.FC<CostAnomaliesSectionProps> = ({ anomalies }) => {
  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'Critical':
        return 'text-rose-400 bg-rose-950/70 border-rose-500/40 animate-pulse';
      case 'Warning':
        return 'text-amber-400 bg-amber-950/70 border-amber-500/30';
      case 'Normal':
      default:
        return 'text-indigo-400 bg-indigo-950/70 border-indigo-500/30';
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>Cost Anomalies & Spend Outliers</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950 border border-rose-500/30 text-rose-300">
              UNEXPECTED BILLING SURGES
            </span>
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Automated z-score statistical variance detection across hourly API, compute, and I/O charges.
          </p>
        </div>
        <span className="text-[10px] font-mono text-rose-400 bg-rose-950/60 border border-rose-500/30 px-2 py-0.5 rounded">
          {anomalies.filter((a) => a.status === 'Active').length} Active Anomalies
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {anomalies.map((ano) => (
          <div
            key={ano.id}
            className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getSeverityBadge(
                      ano.severity
                    )}`}
                  >
                    {ano.severity}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-600" />
                    {ano.detectedTime}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  {ano.status}
                </span>
              </div>

              <h3 className="text-xs font-bold text-white leading-snug">{ano.title}</h3>

              {/* Cost delta box */}
              <div className="p-2 rounded bg-slate-900 border border-slate-800/80 text-xs font-mono grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="text-[10px] text-slate-500 block">Current</span>
                  <span className="text-white font-bold">{ano.currentCost}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Baseline Expected</span>
                  <span className="text-slate-400">{ano.expectedCost}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Variance</span>
                  <span className="text-rose-400 font-bold flex items-center justify-center gap-0.5">
                    <TrendingUp className="w-3 h-3" />
                    {ano.difference}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                {ano.reason}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1 text-slate-400">
                <Server className="w-3 h-3 text-cyan-400" />
                {ano.resource}
              </span>
              <span className="text-indigo-400">FinOps Anomaly Watcher</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
