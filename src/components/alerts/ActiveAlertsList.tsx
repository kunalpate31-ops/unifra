import React from 'react';
import { SystemAlert } from '../../types/dashboard';
import { AlertCircle, Info, Clock, Eye } from 'lucide-react';

interface ActiveAlertsListProps {
  alerts: SystemAlert[];
  onSelectAlert: (alert: SystemAlert) => void;
}

export const ActiveAlertsList: React.FC<ActiveAlertsListProps> = ({ alerts, onSelectAlert }) => {
  const getSeverityBadge = (severity: SystemAlert['severity']) => {
    switch (severity) {
      case 'CRITICAL':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            CRITICAL
          </span>
        );
      case 'WARNING':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            WARNING
          </span>
        );
      case 'INFO':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            <Info className="w-2.5 h-2.5" />
            INFO
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 shadow-lg flex flex-col justify-between space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400" />
          <h3 className="text-base font-semibold text-white tracking-wide">Active Alerts</h3>
        </div>
        <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
          {alerts.length} Firing
        </span>
      </div>

      {/* Alerts Cards Stack */}
      <div className="space-y-2.5">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            onClick={() => onSelectAlert(alert)}
            className="group relative bg-slate-950/70 hover:bg-slate-950 border border-slate-800/80 hover:border-slate-700 rounded-lg p-3 transition-all duration-150 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                {getSeverityBadge(alert.severity)}
                <span className="font-mono font-bold text-xs text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {alert.resource}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">({alert.resourceType})</span>
              </div>
              <p className="text-xs text-slate-300 font-medium">{alert.description}</p>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                <Clock className="w-3 h-3" />
                <span>{alert.time}</span>
              </div>
            </div>

            {/* View Button */}
            <div className="self-end sm:self-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectAlert(alert);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-all shadow-sm"
              >
                <Eye className="w-3 h-3" />
                <span>View</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
