import React from 'react';
import { ActionImpactMetrics } from '../../types/actions';
import { TrendingDown, TrendingUp, DollarSign, ShieldCheck, Activity, Cpu } from 'lucide-react';

interface ActionImpactSectionProps {
  metrics: ActionImpactMetrics;
}

export const ActionImpactSection: React.FC<ActionImpactSectionProps> = ({ metrics }) => {
  return (
    <div className="p-4 sm:p-5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>Control Action Cumulative Impact</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 border border-emerald-500/30 text-emerald-300">
              REMEDIATION OUTCOMES
            </span>
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Operational improvements realized through executed auto-remediations and optimization workflows.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 font-mono">
        {/* CPU Reduction */}
        <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase font-bold">
            <span>CPU Load Reduction</span>
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-cyan-300 flex items-center gap-1">
            <TrendingDown className="w-4 h-4 text-cyan-400" />
            -{metrics.cpuReductionPercent}%
          </div>
          <span className="text-[10px] text-slate-400">Post-restart threadpool relief</span>
        </div>

        {/* Cost Savings */}
        <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase font-bold">
            <span>Cost Savings Realized</span>
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-300 flex items-center gap-1">
            <TrendingDown className="w-4 h-4 text-emerald-400" />
            ${metrics.monthlyCostSavings}/mo
          </div>
          <span className="text-[10px] text-slate-400">Rightsizing & idle reclamation</span>
        </div>

        {/* Incident Reduction */}
        <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase font-bold">
            <span>Incident MTTR Reduction</span>
            <Activity className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-purple-300 flex items-center gap-1">
            <TrendingDown className="w-4 h-4 text-purple-400" />
            -{metrics.incidentReductionPercent}%
          </div>
          <span className="text-[10px] text-slate-400">Automated failure mitigation</span>
        </div>

        {/* Availability Improvement */}
        <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase font-bold">
            <span>System SLO Availability</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            {metrics.availabilityPercent}%
          </div>
          <span className="text-[10px] text-emerald-400/90 font-bold">Zero critical SLO breaches</span>
        </div>
      </div>
    </div>
  );
};
