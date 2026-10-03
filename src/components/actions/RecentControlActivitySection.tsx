import React from 'react';
import { RecentControlActivityItem } from '../../types/actions';
import { Clock, Check, X } from 'lucide-react';

interface RecentControlActivitySectionProps {
  activities: RecentControlActivityItem[];
}

export const RecentControlActivitySection: React.FC<RecentControlActivitySectionProps> = ({
  activities
}) => {
  const getResultBadge = (res: string) => {
    switch (res) {
      case 'Completed':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30';
      case 'Executing':
        return 'text-indigo-400 bg-indigo-950/60 border-indigo-500/30';
      case 'Rejected':
        return 'text-slate-400 bg-slate-900 border-slate-800';
      case 'Failed':
      default:
        return 'text-rose-400 bg-rose-950/60 border-rose-500/30';
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>Recent Control Activity (Audit Trail Preview)</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
              AUDIT LOG PREVIEW
            </span>
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Immutable audit record of user approvals, automated daemon remediations, and policy decisions.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-950/90 border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400 tracking-wider">
              <th className="py-2 px-3">Timestamp</th>
              <th className="py-2 px-3">Actor / User</th>
              <th className="py-2 px-3">Action Executed</th>
              <th className="py-2 px-3">Target Resource</th>
              <th className="py-2 px-3 text-right">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 font-mono">
            {activities.map((act) => (
              <tr key={act.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-slate-400 text-[11px] flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {act.time}
                </td>
                <td className="py-2 px-3 text-slate-200 font-semibold">{act.user}</td>
                <td className="py-2 px-3 text-cyan-300">{act.action}</td>
                <td className="py-2 px-3 text-slate-300">{act.resource}</td>
                <td className="py-2 px-3 text-right">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.2 rounded text-[10px] border ${getResultBadge(
                      act.result
                    )}`}
                  >
                    {act.result === 'Completed' && <Check className="w-2.5 h-2.5" />}
                    {act.result === 'Rejected' && <X className="w-2.5 h-2.5" />}
                    {act.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
