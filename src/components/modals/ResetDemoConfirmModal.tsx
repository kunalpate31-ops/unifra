import React from 'react';
import { RotateCcw, X, AlertTriangle, Check } from 'lucide-react';

interface ResetDemoConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetDemoConfirmModal: React.FC<ResetDemoConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-xl bg-slate-900 border border-slate-700 shadow-2xl shadow-black/80 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-400">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Reset Demo Scenario
              </h3>
              <p className="text-[11px] text-slate-400">Restore Baseline Demo State</p>
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
          <p className="text-slate-200 font-sans text-sm leading-relaxed">
            Reset the UNIFRA demo scenario to its initial state?
          </p>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 text-[11px] text-slate-300">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold">
              <Check className="w-3.5 h-3.5" />
              <span>Restores canonical resource telemetry and specs</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-400 font-semibold">
              <Check className="w-3.5 h-3.5" />
              <span>Clears active incident simulation & resets alerts</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-400 font-semibold">
              <Check className="w-3.5 h-3.5" />
              <span>Restores recommendations & pending control actions</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-400 font-semibold">
              <Check className="w-3.5 h-3.5" />
              <span>Reinitializes baseline audit history</span>
            </div>
          </div>

          <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] flex items-center gap-2 font-sans">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>This is frontend simulation only. No backend data or server configuration is modified.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors border border-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold transition-all shadow-md shadow-indigo-900/40"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Confirm Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
