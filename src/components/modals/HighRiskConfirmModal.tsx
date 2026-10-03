import React from 'react';
import { ControlActionItem } from '../../types/actions';
import { AlertTriangle, X, ShieldAlert, Check } from 'lucide-react';

interface HighRiskConfirmModalProps {
  action: ControlActionItem | null;
  onClose: () => void;
  onConfirm: (action: ControlActionItem) => void;
}

export const HighRiskConfirmModal: React.FC<HighRiskConfirmModalProps> = ({
  action,
  onClose,
  onConfirm
}) => {
  if (!action) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-xl bg-slate-900 border border-rose-500/50 shadow-2xl shadow-rose-950/40 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-rose-500/30 bg-rose-950/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-400">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                High-Risk Action Confirmation
              </h3>
              <p className="text-[11px] text-rose-300/80">Requires Explicit Operator Approval</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-3.5 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-slate-300 font-bold leading-snug">
              {action.action}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Target: <strong className="text-cyan-300">{action.resource}</strong></span>
              <span className="text-rose-400 font-bold uppercase">Risk: High</span>
            </div>
          </div>

          <p className="text-slate-300 font-sans leading-relaxed">
            High-risk action. Are you sure you want to approve this action?
          </p>

          <div className="p-2 rounded bg-rose-950/30 border border-rose-500/20 text-rose-200 text-[11px] flex items-center gap-2 font-sans">
            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>This is simulated in demo mode. No physical cloud hosts will be restarted or modified.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-mono transition-colors border border-slate-800"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(action)}
            className="px-4 py-1.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs font-mono shadow-md shadow-rose-900/40 flex items-center gap-1.5 transition-all"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Confirm Approval</span>
          </button>
        </div>
      </div>
    </div>
  );
};
