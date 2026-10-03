import React from 'react';
import { SystemEngineHealthItem } from '../../types/audit';
import {
  Activity,
  CheckCircle2,
  Sparkles,
  Radio,
  Bell,
  SlidersHorizontal,
  Lightbulb,
  GitMerge
} from 'lucide-react';

interface SystemHealthActivitySectionProps {
  engines: SystemEngineHealthItem[];
}

export const SystemHealthActivitySection: React.FC<SystemHealthActivitySectionProps> = ({
  engines
}) => {
  const getEngineIcon = (name: string) => {
    if (name.includes('Telemetry')) return <Radio className="w-4 h-4 text-cyan-400" />;
    if (name.includes('Monitoring')) return <Activity className="w-4 h-4 text-indigo-400" />;
    if (name.includes('Alert')) return <Bell className="w-4 h-4 text-rose-400" />;
    if (name.includes('Root Cause') || name.includes('AI')) return <GitMerge className="w-4 h-4 text-emerald-400" />;
    if (name.includes('FinOps') || name.includes('Recommendation')) return <Lightbulb className="w-4 h-4 text-amber-400" />;
    if (name.includes('Control') || name.includes('Automation')) return <SlidersHorizontal className="w-4 h-4 text-purple-400" />;
    return <Sparkles className="w-4 h-4 text-slate-400" />;
  };

  const getStatusBadge = (status: 'Operational' | 'Warning' | 'Simulated') => {
    switch (status) {
      case 'Operational':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Operational
          </span>
        );
      case 'Warning':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Warning
          </span>
        );
      case 'Simulated':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            Simulated
          </span>
        );
    }
  };

  return (
    <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">System Activity & Core Engine Health</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>All Core Subsystems Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {engines.map((engine) => (
          <div
            key={engine.name}
            className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-slate-900 border border-slate-800">
                    {getEngineIcon(engine.name)}
                  </div>
                  <span className="text-xs font-semibold text-white truncate max-w-[140px]" title={engine.name}>
                    {engine.name}
                  </span>
                </div>
                {getStatusBadge(engine.status)}
              </div>
              <p className="text-[11px] text-slate-400 font-mono mb-2">{engine.category}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono border-t border-slate-900 pt-2 text-slate-400">
              <div>
                <span className="text-slate-500 block text-[10px]">Latency</span>
                <span className="text-slate-200">{engine.latency}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[10px]">Throughput</span>
                <span className="text-slate-200">{engine.eventsProcessed}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
