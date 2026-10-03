import React from 'react';
import { RecommendationItem } from '../../types/recommendations';
import {
  X,
  Sparkles,
  DollarSign,
  Zap,
  ShieldCheck,
  ShieldAlert,
  Layers,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Server,
  Cpu,
  Cloud,
  Box,
  Check,
  ExternalLink,
  Activity,
  Info
} from 'lucide-react';

interface RecommendationDetailModalProps {
  recommendation: RecommendationItem | null;
  onClose: () => void;
  onReview: (recId: string) => void;
  onApply: (recId: string) => void;
  onDismiss: (recId: string) => void;
  onViewResource: (resourceName: string, source: string) => void;
  onViewMetrics: () => void;
}

export const RecommendationDetailModal: React.FC<RecommendationDetailModalProps> = ({
  recommendation,
  onClose,
  onReview,
  onApply,
  onDismiss,
  onViewResource,
  onViewMetrics
}) => {
  if (!recommendation) return null;

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Cost':
        return { icon: DollarSign, color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30' };
      case 'Performance':
        return { icon: Zap, color: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30' };
      case 'Reliability':
        return { icon: ShieldAlert, color: 'text-amber-400 bg-amber-950/60 border-amber-500/30' };
      case 'Security':
        return { icon: ShieldCheck, color: 'text-purple-400 bg-purple-950/60 border-purple-500/30' };
      case 'Capacity':
      default:
        return { icon: Layers, color: 'text-indigo-400 bg-indigo-950/60 border-indigo-500/30' };
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'AWS':
        return <Cloud className="w-4 h-4 text-amber-400" />;
      case 'Edge':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'Docker':
        return <Box className="w-4 h-4 text-blue-400" />;
      case 'Kubernetes':
        return <Layers className="w-4 h-4 text-indigo-400" />;
      case 'On-Premise':
      default:
        return <Server className="w-4 h-4 text-slate-400" />;
    }
  };

  const categoryMeta = getCategoryBadge(recommendation.category);
  const CategoryIcon = categoryMeta.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-xl bg-slate-900 border border-slate-700 shadow-2xl shadow-black/80 overflow-hidden">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 font-semibold uppercase">
                  {recommendation.id}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono border font-medium ${categoryMeta.color}`}
                >
                  <CategoryIcon className="w-3 h-3" />
                  {recommendation.category}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                    recommendation.priority === 'Critical'
                      ? 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                      : recommendation.priority === 'High'
                      ? 'bg-amber-950/80 text-amber-300 border-amber-500/30'
                      : 'bg-indigo-950/80 text-indigo-300 border-indigo-500/30'
                  }`}
                >
                  {recommendation.priority} Priority
                </span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5 leading-tight">
                {recommendation.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs font-sans">
          {/* AI Simulation Disclaimer Banner */}
          <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-500/30 text-purple-200 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider font-mono text-purple-300">
                  Simulated AI Recommendation
                </span>
                <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono">
                  Confidence: {recommendation.confidence}
                </span>
              </div>
              <p className="text-[11px] text-purple-300/80 leading-relaxed">
                This is simulated demo telemetry optimization data. Changes are not applied to real cloud or hardware infrastructure.
              </p>
            </div>
          </div>

          {/* Current State vs Recommended Transformation Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
            {/* Current State */}
            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Current Observed State
              </span>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                {recommendation.currentState}
              </p>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  {getSourceIcon(recommendation.source)}
                  <strong className="text-slate-200">{recommendation.affectedResource}</strong>
                </span>
                <span>• {recommendation.resourceType}</span>
              </div>
            </div>

            {/* Recommended State */}
            <div className="p-3.5 rounded-lg bg-indigo-950/30 border border-indigo-500/40 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-cyan-400" />
                  Recommended Target State
                </span>
                {recommendation.estimatedMonthlySavings && (
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                    Save ${recommendation.estimatedMonthlySavings}/mo
                  </span>
                )}
              </div>
              <p className="text-xs text-cyan-200 font-medium leading-relaxed">
                {recommendation.recommendedState}
              </p>
              <div className="pt-2 text-[11px] text-indigo-300/90 font-sans">
                Impact: {recommendation.expectedImpact}
              </div>
            </div>
          </div>

          {/* Reasoning & Detailed Bullet Points */}
          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              AI Analysis Reasoning & Diagnosis
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{recommendation.reason}</p>

            <ul className="space-y-1.5 pt-1 border-t border-slate-800/80">
              {recommendation.reasoningDetails.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Supporting Metrics */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
              Supporting Telemetry Metrics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {recommendation.supportingMetrics.map((met, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono space-y-1"
                >
                  <span className="text-[10px] text-slate-500 block truncate">{met.name}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{met.value}</span>
                    {met.trend === 'up' ? (
                      <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                    ) : met.trend === 'down' ? (
                      <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 block">{met.baseline}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Alerts & Correlated Resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {/* Related Alerts */}
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block">
                Correlated Alerts
              </span>
              {recommendation.relatedAlerts.length > 0 ? (
                <ul className="space-y-1">
                  {recommendation.relatedAlerts.map((alt, idx) => (
                    <li
                      key={idx}
                      className="text-[11px] font-mono text-rose-300 bg-rose-950/40 border border-rose-500/20 px-2 py-1 rounded"
                    >
                      {alt}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-[11px] text-slate-500 italic">No direct active alert linkage</span>
              )}
            </div>

            {/* Related Resources */}
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block">
                Related Topology Nodes
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {recommendation.relatedResources.map((res, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded flex items-center gap-1"
                  >
                    <Server className="w-3 h-3 text-cyan-400" />
                    {res}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onViewResource(recommendation.affectedResource, recommendation.source);
              }}
              className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>View Resource</span>
            </button>

            <button
              onClick={onViewMetrics}
              className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              <span>View Metrics</span>
            </button>
          </div>

          {/* Workflow Action Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {recommendation.status !== 'Reviewed' && recommendation.status !== 'Applied' && (
              <button
                onClick={() => onReview(recommendation.id)}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium transition-colors border border-slate-700"
              >
                Mark Reviewed
              </button>
            )}

            {recommendation.status !== 'Dismissed' && (
              <button
                onClick={() => onDismiss(recommendation.id)}
                className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-300 text-xs font-mono transition-colors border border-slate-800"
              >
                Dismiss
              </button>
            )}

            {recommendation.status !== 'Applied' ? (
              <button
                onClick={() => onApply(recommendation.id)}
                className="px-4 py-1.5 rounded bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs font-mono shadow-md shadow-indigo-900/30 flex items-center gap-1.5 transition-all"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply in Demo Mode</span>
              </button>
            ) : (
              <span className="px-3 py-1.5 rounded bg-purple-950 border border-purple-500/50 text-purple-300 text-xs font-mono font-bold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-purple-400" />
                Applied
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
