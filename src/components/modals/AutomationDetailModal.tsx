import React from 'react';
import { ScheduledAutomationItem } from '../../types/actions';
import { Calendar, X, Play, Pause, Server } from 'lucide-react';

interface AutomationDetailModalProps {
  automation: ScheduledAutomationItem | null;
  onClose: () => void;
  onToggleStatus: (id: string) => void;
}

export const AutomationDetailModal: React.FC<AutomationDetailModalProps> = ({
  automation,
  onClose,
  onToggleStatus
}) => {
  if (!automation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-xl bg-slate-900 border border-slate-700 shadow-2xl shadow-black/80 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-purple-400 font-bold">{automation.id}</span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] font-mono border ${
                    automation.status === 'Active'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-900 text-slate-500 border-slate-700'
                  }`}
                >
                  {automation.status}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-0.5">{automation.name}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-3.5 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Description</span>
            <p className="text-slate-300 font-sans leading-relaxed">{automation.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">Execution Frequency</span>
              <span className="text-xs font-bold text-white block">{automation.frequency}</span>
            </div>
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">Next Scheduled Run</span>
              <span className="text-xs font-bold text-cyan-300 block">{automation.nextRun}</span>
            </div>
          </div>

          <div className="p-2.5 rounded bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">Last Execution</span>
            <span className="text-slate-300">{automation.lastRun}</span>
          </div>

          {/* Covered Resources */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">
              Resources In Scope
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {automation.resourcesCovered.map((res, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px] flex items-center gap-1"
                >
                  <Server className="w-3 h-3 text-cyan-400" />
                  {res}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-mono transition-colors border border-slate-800"
          >
            Close
          </button>

          <button
            onClick={() => onToggleStatus(automation.id)}
            className={`px-4 py-1.5 rounded text-xs font-mono font-bold shadow-md flex items-center gap-1.5 transition-all ${
              automation.status === 'Active'
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/30'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30'
            }`}
          >
            {automation.status === 'Active' ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Automation</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resume Automation</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
