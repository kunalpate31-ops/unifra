import React, { useState } from 'react';
import { AIRecommendation } from '../../types/dashboard';
import {
  X,
  Sparkles,
  Zap,
  TrendingDown,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface AllRecommendationsModalProps {
  recommendations: AIRecommendation[];
  isOpen: boolean;
  onClose: () => void;
}

export const AllRecommendationsModal: React.FC<AllRecommendationsModalProps> = ({
  recommendations,
  isOpen,
  onClose
}) => {
  const [approvedIds, setApprovedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'ALL' | 'COST' | 'PERFORMANCE' | 'RELIABILITY'>('ALL');

  if (!isOpen) return null;

  const filteredRecs =
    activeTab === 'ALL'
      ? recommendations
      : recommendations.filter((r) => r.category === activeTab);

  const handleApprove = (id: string) => {
    setApprovedIds((prev) => [...prev, id]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">
                AI Optimization & Reliability Recommendations
              </h3>
              <p className="text-xs text-slate-400">
                Generated via Cost Agent, Health Agent, and API Performance Agent
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

        {/* Category Tabs */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800/80 bg-slate-950/40 text-xs">
          {(['ALL', 'COST', 'PERFORMANCE', 'RELIABILITY'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-md font-mono text-[11px] transition-colors ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Body List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 text-xs">
          {filteredRecs.map((rec) => {
            const isApproved = approvedIds.includes(rec.id);

            return (
              <div
                key={rec.id}
                className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-3 hover:border-slate-700 transition-all"
              >
                {/* Title & Stats */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {rec.category}
                    </span>
                    <h4 className="font-bold text-sm text-white">{rec.title}</h4>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="flex items-center gap-1 text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                      <Zap className="w-3 h-3" />
                      Confidence: {rec.confidence}%
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded border ${
                        rec.risk === 'Low'
                          ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/20'
                          : 'text-amber-400 bg-amber-950/60 border-amber-500/20'
                      }`}
                    >
                      Risk: {rec.risk}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 leading-relaxed text-xs">{rec.description}</p>

                {/* Impact & Savings */}
                <div className="flex flex-wrap items-center gap-3 text-slate-400">
                  <span className="text-slate-200">
                    <strong className="text-slate-400">Impact:</strong> {rec.impact}
                  </span>
                  {rec.estimatedSavings && (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-mono font-bold">
                      <TrendingDown className="w-3.5 h-3.5" />
                      Estimated Savings: {rec.estimatedSavings}
                    </span>
                  )}
                </div>

                {/* Structured Executable Payload */}
                <div className="p-2.5 rounded-lg bg-black border border-slate-800/80 font-mono text-[11px] text-slate-400 flex items-center justify-between">
                  <div>
                    <span className="text-slate-500">Action:</span>{' '}
                    <span className="text-indigo-400 font-bold">
                      {rec.suggestedActionPayload.service}.{rec.suggestedActionPayload.action}
                    </span>{' '}
                    &rarr; <span className="text-slate-200">{rec.suggestedActionPayload.target}</span>
                  </div>

                  {/* Approve Button */}
                  <button
                    onClick={() => handleApprove(rec.id)}
                    disabled={isApproved}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-all ${
                      isApproved
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
                    }`}
                  >
                    {isApproved ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        <span>Action Approved</span>
                      </>
                    ) : (
                      <>
                        <span>Approve Action</span>
                        <ArrowRight className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Human-in-the-Loop approval required for all state-altering changes.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
