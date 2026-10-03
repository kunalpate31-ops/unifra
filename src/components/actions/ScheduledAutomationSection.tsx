import React from 'react';
import { ScheduledAutomationItem } from '../../types/actions';
import { Calendar, Eye } from 'lucide-react';

interface ScheduledAutomationSectionProps {
  automations: ScheduledAutomationItem[];
  onSelectAutomation: (automation: ScheduledAutomationItem) => void;
  onToggleStatus: (id: string) => void;
}

export const ScheduledAutomationSection: React.FC<ScheduledAutomationSectionProps> = ({
  automations,
  onSelectAutomation,
  onToggleStatus
}) => {
  return (
    <div className="p-4 sm:p-5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>Scheduled Automation</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 border border-purple-500/30 text-purple-300">
              RECURRING CRON JOBS
            </span>
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Autonomous recurring background scans for health diagnostics, cost evaluation, and anomaly sweeps.
          </p>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          {automations.filter((a) => a.status === 'Active').length} Active Schedules
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-950/90 border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400 tracking-wider">
              <th className="py-2.5 px-3">Automation Name</th>
              <th className="py-2.5 px-3">Frequency</th>
              <th className="py-2.5 px-3">Next Run</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Last Run</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 font-mono">
            {automations.map((sch) => (
              <tr
                key={sch.id}
                onClick={() => onSelectAutomation(sch)}
                className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
              >
                {/* Automation Name */}
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors block">
                        {sch.name}
                      </span>
                      <span className="text-[10px] text-slate-500 block truncate max-w-[280px]">
                        {sch.description}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Frequency */}
                <td className="py-2.5 px-3 text-slate-300 text-[11px]">
                  {sch.frequency}
                </td>

                {/* Next Run */}
                <td className="py-2.5 px-3 text-cyan-300 text-[11px] font-semibold">
                  {sch.nextRun}
                </td>

                {/* Status */}
                <td className="py-2.5 px-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono border font-medium ${
                      sch.status === 'Active'
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-500/30'
                        : 'bg-slate-900 text-slate-500 border-slate-700'
                    }`}
                  >
                    {sch.status}
                  </span>
                </td>

                {/* Last Run */}
                <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                  {sch.lastRun}
                </td>

                {/* Actions */}
                <td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onToggleStatus(sch.id)}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors border ${
                        sch.status === 'Active'
                          ? 'bg-slate-900 hover:bg-slate-800 text-amber-400 border-slate-700'
                          : 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border-emerald-500/40'
                      }`}
                    >
                      {sch.status === 'Active' ? 'Pause' : 'Resume'}
                    </button>

                    <button
                      onClick={() => onSelectAutomation(sch)}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
