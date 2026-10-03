import React, { useState } from 'react';
import { SystemAlert } from '../../types/dashboard';
import {
  X,
  AlertCircle,
  AlertTriangle,
  Clock,
  Zap,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface AlertDetailModalProps {
  alert: SystemAlert | null;
  onClose: () => void;
}

export const AlertDetailModal: React.FC<AlertDetailModalProps> = ({ alert, onClose }) => {
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  if (!alert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            {alert.severity === 'CRITICAL' ? (
              <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
                <AlertCircle className="w-5 h-5" />
              </div>
            ) : (
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white font-mono">{alert.id}</h3>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    alert.severity === 'CRITICAL'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {alert.severity}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Target: {alert.resource} ({alert.resourceType})
              </p>
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
        <div className="p-5 space-y-4 text-xs">
          {/* Main Description */}
          <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
              Incident Description
            </span>
            <p className="text-sm text-slate-200 font-medium">{alert.description}</p>
            <div className="flex items-center gap-2 text-slate-400 font-mono mt-2 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Triggered at: {alert.timestamp} ({alert.time})</span>
            </div>
          </div>

          {/* AI Correlation & Root Cause Hypothesis */}
          <div className="p-3.5 rounded-lg bg-indigo-500/5 border border-indigo-500/20 space-y-1.5">
            <div className="flex items-center gap-1.5 text-indigo-400 font-semibold tracking-wider uppercase text-[11px]">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>AI Correlation Agent Analysis</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-mono text-xs">
              {alert.rootCauseHypothesis}
            </p>
          </div>

          {/* Recommended Action */}
          <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold tracking-wider uppercase text-[11px]">
              <FileText className="w-4 h-4" />
              <span>Remediation Recommendation</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-mono text-xs">
              {alert.recommendedAction}
            </p>
          </div>

          {/* Impact Score Meter */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 font-mono">Impact Score:</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full"
                  style={{ width: `${alert.impactScore}%` }}
                />
              </div>
              <span className="font-mono font-bold text-rose-400">{alert.impactScore} / 100</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            onClick={() => setIsAcknowledged(true)}
            disabled={isAcknowledged}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isAcknowledged
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isAcknowledged ? 'Acknowledged' : 'Acknowledge Incident'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
