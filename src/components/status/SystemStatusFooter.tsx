import React from 'react';
import { SYSTEM_STATUSES } from '../../services/mockData';
import { Server } from 'lucide-react';

export const SystemStatusFooter: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 shadow-lg backdrop-blur-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Title */}
        <div className="flex items-center gap-2.5">
          <Server className="w-4 h-4 text-cyan-400" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              System Integration Status
            </h4>
            <p className="text-[11px] text-slate-500 font-mono">
              Hybrid telemetry pipelines & simulated collector endpoints
            </p>
          </div>
        </div>

        {/* 4 Status Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {SYSTEM_STATUSES.map((sys) => {
            const dotColorClass =
              sys.name === 'AWS'
                ? 'bg-cyan-400'
                : sys.name === 'OpenTelemetry'
                ? 'bg-indigo-400'
                : 'bg-emerald-400';

            const borderClass =
              sys.name === 'AWS'
                ? 'border-cyan-500/20 bg-cyan-950/20'
                : sys.name === 'OpenTelemetry'
                ? 'border-indigo-500/20 bg-indigo-950/20'
                : 'border-emerald-500/20 bg-emerald-950/20';

            return (
              <div
                key={sys.name}
                className={`flex flex-col p-2.5 rounded-lg border ${borderClass} transition-colors`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-white font-mono">{sys.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{sys.latencyMs}ms</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
                  <span className={`w-2 h-2 rounded-full ${dotColorClass} animate-pulse`} />
                  <span className="truncate">{sys.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
};
