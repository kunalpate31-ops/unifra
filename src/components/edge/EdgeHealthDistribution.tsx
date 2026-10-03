import React from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, AlertTriangle, PowerOff } from 'lucide-react';

interface EdgeHealthDistributionProps {
  healthyCount: number;
  warningCount: number;
  criticalCount: number;
  offlineCount: number;
  totalCount: number;
}

export const EdgeHealthDistribution: React.FC<EdgeHealthDistributionProps> = ({
  healthyCount,
  warningCount,
  criticalCount,
  offlineCount,
  totalCount
}) => {
  const healthyPercent = totalCount > 0 ? ((healthyCount / totalCount) * 100).toFixed(1) : '0';
  const warningPercent = totalCount > 0 ? ((warningCount / totalCount) * 100).toFixed(1) : '0';
  const criticalPercent = totalCount > 0 ? ((criticalCount / totalCount) * 100).toFixed(1) : '0';
  const offlinePercent = totalCount > 0 ? ((offlineCount / totalCount) * 100).toFixed(1) : '0';

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 shadow-lg space-y-3.5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">
              FLEET HEALTH DISTRIBUTION
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Live status categorization across all 18 edge compute and IoT devices
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-emerald-400 font-bold">
          {healthyPercent}% System Stability
        </div>
      </div>

      {/* Multi-segment Horizontal Bar */}
      <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800/80">
        <div
          style={{ width: `${healthyPercent}%` }}
          title={`Healthy: ${healthyCount} (${healthyPercent}%)`}
          className="h-full bg-emerald-500 transition-all duration-500"
        />
        <div
          style={{ width: `${warningPercent}%` }}
          title={`Warning: ${warningCount} (${warningPercent}%)`}
          className="h-full bg-amber-400 transition-all duration-500"
        />
        <div
          style={{ width: `${criticalPercent}%` }}
          title={`Critical: ${criticalCount} (${criticalPercent}%)`}
          className="h-full bg-rose-500 transition-all duration-500 animate-pulse"
        />
        <div
          style={{ width: `${offlinePercent}%` }}
          title={`Offline: ${offlineCount} (${offlinePercent}%)`}
          className="h-full bg-slate-600 transition-all duration-500"
        />
      </div>

      {/* 4 Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        {/* Healthy */}
        <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Healthy</span>
              <span className="text-base font-bold text-white">{healthyCount}</span>
            </div>
          </div>
          <span className="text-emerald-400 text-xs font-bold">{healthyPercent}%</span>
        </div>

        {/* Warning */}
        <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Warning</span>
              <span className="text-base font-bold text-white">{warningCount}</span>
            </div>
          </div>
          <span className="text-amber-400 text-xs font-bold">{warningPercent}%</span>
        </div>

        {/* Critical */}
        <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
            <div>
              <span className="text-[10px] text-rose-400 uppercase block">Critical</span>
              <span className="text-base font-bold text-rose-300">{criticalCount}</span>
            </div>
          </div>
          <span className="text-rose-400 text-xs font-bold">{criticalPercent}%</span>
        </div>

        {/* Offline */}
        <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PowerOff className="w-4 h-4 text-slate-500" />
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Offline</span>
              <span className="text-base font-bold text-slate-300">{offlineCount}</span>
            </div>
          </div>
          <span className="text-slate-500 text-xs">{offlinePercent}%</span>
        </div>
      </div>
    </div>
  );
};
