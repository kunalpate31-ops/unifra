import React from 'react';
import { RecommendationItem } from '../../types/recommendations';
import {
  DollarSign,
  Zap,
  ShieldCheck,
  ShieldAlert,
  Layers,
  ArrowRight,
  TrendingDown,
  Check,
  Eye,
  X,
  Server,
  Cpu,
  Box,
  Cloud,
  Clock
} from 'lucide-react';

interface RecommendationCardProps {
  recommendation: RecommendationItem;
  onSelect: (rec: RecommendationItem) => void;
  onReview: (recId: string) => void;
  onApply: (recId: string) => void;
  onDismiss: (recId: string) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onSelect,
  onReview,
  onApply,
  onDismiss
}) => {
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Cost':
        return {
          icon: DollarSign,
          color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30'
        };
      case 'Performance':
        return {
          icon: Zap,
          color: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30'
        };
      case 'Reliability':
        return {
          icon: ShieldAlert,
          color: 'text-amber-400 bg-amber-950/60 border-amber-500/30'
        };
      case 'Security':
        return {
          icon: ShieldCheck,
          color: 'text-purple-400 bg-purple-950/60 border-purple-500/30'
        };
      case 'Capacity':
      default:
        return {
          icon: Layers,
          color: 'text-indigo-400 bg-indigo-950/60 border-indigo-500/30'
        };
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'text-rose-400 bg-rose-950/60 border-rose-500/40 animate-pulse';
      case 'High':
        return 'text-amber-400 bg-amber-950/60 border-amber-500/30';
      case 'Medium':
        return 'text-indigo-400 bg-indigo-950/60 border-indigo-500/30';
      case 'Low':
      default:
        return 'text-slate-400 bg-slate-900 border-slate-700';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'text-purple-400 bg-purple-950/60 border-purple-500/40';
      case 'Reviewed':
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30';
      case 'Dismissed':
        return 'text-slate-500 bg-slate-900 border-slate-800 line-through';
      case 'New':
      default:
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'AWS':
        return <Cloud className="w-3.5 h-3.5 text-amber-400" />;
      case 'Edge':
        return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Docker':
        return <Box className="w-3.5 h-3.5 text-blue-400" />;
      case 'Kubernetes':
        return <Layers className="w-3.5 h-3.5 text-indigo-400" />;
      case 'On-Premise':
      default:
        return <Server className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const categoryMeta = getCategoryBadge(recommendation.category);
  const CategoryIcon = categoryMeta.icon;

  return (
    <div
      className={`p-4 rounded-lg bg-slate-900/90 border transition-all hover:border-slate-700 flex flex-col justify-between group shadow-sm ${
        recommendation.status === 'Applied'
          ? 'border-purple-500/30 bg-purple-950/10'
          : recommendation.status === 'Dismissed'
          ? 'border-slate-800/60 opacity-60'
          : 'border-slate-800'
      }`}
    >
      <div className="space-y-3">
        {/* Top Header Row: Category, Priority, Status, Generated Time */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            {/* Category */}
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono border font-medium ${categoryMeta.color}`}
            >
              <CategoryIcon className="w-3 h-3" />
              {recommendation.category}
            </span>

            {/* Priority */}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono border font-semibold uppercase ${getPriorityBadge(
                recommendation.priority
              )}`}
            >
              {recommendation.priority}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Status */}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono border font-medium ${getStatusBadge(
                recommendation.status
              )}`}
            >
              {recommendation.status}
            </span>

            {/* Time */}
            <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-600" />
              {recommendation.generatedTime}
            </span>
          </div>
        </div>

        {/* Title & Resource */}
        <div>
          <button
            onClick={() => onSelect(recommendation)}
            className="text-left font-semibold text-white text-sm hover:text-cyan-300 transition-colors flex items-start gap-1.5 group-hover:text-cyan-200"
          >
            <span>{recommendation.title}</span>
          </button>

          <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              {getSourceIcon(recommendation.source)}
              <span className="text-slate-300 font-medium">{recommendation.affectedResource}</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500 text-[11px]">{recommendation.resourceType}</span>
          </div>
        </div>

        {/* Current vs. Recommended Transformation Box */}
        <div className="p-2.5 rounded-md bg-slate-950/70 border border-slate-800/80 text-xs font-mono space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-slate-500 text-[10px] uppercase font-bold w-16 flex-shrink-0 pt-0.5">
              Current:
            </span>
            <span className="text-slate-300 text-[11px] leading-snug">{recommendation.currentState}</span>
          </div>

          <div className="flex items-start gap-2 border-t border-slate-800/60 pt-1.5">
            <span className="text-cyan-400 text-[10px] uppercase font-bold w-16 flex-shrink-0 pt-0.5 flex items-center gap-0.5">
              <ArrowRight className="w-2.5 h-2.5" /> Rec:
            </span>
            <span className="text-cyan-200 text-[11px] font-medium leading-snug">
              {recommendation.recommendedState}
            </span>
          </div>
        </div>

        {/* Reason */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {recommendation.reason}
        </p>

        {/* Impact & Savings Badges */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/60">
          <div className="text-[11px] text-slate-400 truncate" title={recommendation.expectedImpact}>
            <span className="text-slate-500">Impact: </span>
            <span className="text-slate-300">{recommendation.expectedImpact}</span>
          </div>

          {recommendation.estimatedMonthlySavings && (
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold flex-shrink-0 shadow-sm">
              <TrendingDown className="w-3 h-3 text-emerald-400" />
              <span>Save ${recommendation.estimatedMonthlySavings}/mo</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-slate-800/80">
        <button
          onClick={() => onSelect(recommendation)}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1 transition-colors"
        >
          <Eye className="w-3 h-3" />
          <span>Details</span>
        </button>

        <div className="flex items-center gap-1.5">
          {/* Review Button */}
          {recommendation.status !== 'Reviewed' && recommendation.status !== 'Applied' && (
            <button
              onClick={() => onReview(recommendation.id)}
              className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-colors border border-slate-700/60"
              title="Mark as reviewed"
            >
              Review
            </button>
          )}

          {/* Dismiss Button */}
          {recommendation.status !== 'Dismissed' && (
            <button
              onClick={() => onDismiss(recommendation.id)}
              className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-500 hover:text-rose-400 text-xs font-mono transition-colors border border-slate-800"
              title="Dismiss recommendation"
            >
              <X className="w-3 h-3" />
            </button>
          )}

          {/* Apply Button */}
          {recommendation.status !== 'Applied' ? (
            <button
              onClick={() => onApply(recommendation.id)}
              className="px-3 py-1 rounded bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs font-mono shadow-sm flex items-center gap-1 transition-all"
            >
              <Check className="w-3 h-3" />
              <span>Apply</span>
            </button>
          ) : (
            <span className="px-2.5 py-1 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono font-medium flex items-center gap-1">
              <Check className="w-3 h-3 text-purple-400" />
              Applied
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
