import React from 'react';
import { CostEnvironmentItem } from '../../types/cost';

interface CostByEnvironmentSectionProps {
  environments: CostEnvironmentItem[];
}

export const CostByEnvironmentSection: React.FC<CostByEnvironmentSectionProps> = ({ environments }) => {
  const getEnvBadge = (env: string) => {
    switch (env) {
      case 'Production':
        return 'text-rose-400 border-rose-500/30 bg-rose-950/40';
      case 'Staging':
        return 'text-amber-400 border-amber-500/30 bg-amber-950/40';
      case 'Development':
        return 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40';
      case 'Edge':
        return 'text-purple-400 border-purple-500/30 bg-purple-950/40';
      case 'On-Premise':
      default:
        return 'text-indigo-400 border-indigo-500/30 bg-indigo-950/40';
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>Cost by Infrastructure Environment</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950 border border-indigo-500/30 text-indigo-300">
              ENVIRONMENT BREAKDOWN
            </span>
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Spending distribution across production tiers, edge field gateways, and on-premise clusters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {environments.map((env) => (
          <div
            key={env.environment}
            className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2 hover:border-slate-700 transition-all font-mono"
          >
            <div className="flex items-center justify-between">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getEnvBadge(
                  env.environment
                )}`}
              >
                {env.environment}
              </span>
              <span className="text-[10px] text-slate-500">{env.resourceCount} Nodes</span>
            </div>

            <div>
              <div className="text-lg font-bold text-white">${env.monthlyCost.toLocaleString()}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{env.percentage}% of overall spend</div>
            </div>

            <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                style={{ width: `${env.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
