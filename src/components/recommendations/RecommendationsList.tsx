import React from 'react';
import { AIRecommendation } from '../../types/dashboard';
import { Sparkles, ArrowRight, Zap, TrendingDown } from 'lucide-react';

interface RecommendationsListProps {
  recommendations: AIRecommendation[];
  onViewAll: () => void;
  onSelectRecommendation: (rec: AIRecommendation) => void;
}

export const RecommendationsList: React.FC<RecommendationsListProps> = ({
  recommendations,
  onViewAll,
  onSelectRecommendation
}) => {
  // Show top 3 recommendations
  const topRecommendations = recommendations.slice(0, 3);

  const getRiskBadge = (risk: AIRecommendation['risk']) => {
    switch (risk) {
      case 'Low':
        return (
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Risk: Low
          </span>
        );
      case 'Medium':
        return (
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Risk: Medium
          </span>
        );
      case 'High':
        return (
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Risk: High
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 shadow-lg flex flex-col justify-between space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="text-base font-semibold text-white tracking-wide">
            AI Recommendations
          </h3>
        </div>
        <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          Agent-Driven
        </span>
      </div>

      {/* Cards list */}
      <div className="space-y-3">
        {topRecommendations.map((rec, index) => (
          <div
            key={rec.id}
            onClick={() => onSelectRecommendation(rec)}
            className="group relative bg-slate-950/70 hover:bg-slate-950 border border-slate-800/80 hover:border-slate-700/90 rounded-lg p-3.5 transition-all duration-150 cursor-pointer space-y-2"
          >
            {/* Top row: Title & Confidence */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-xs flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {rec.title}
                </h4>
              </div>

              {/* Confidence Badge */}
              <div className="flex items-center gap-1.5 bg-indigo-950/80 border border-indigo-500/30 px-2 py-0.5 rounded text-[11px] font-mono text-indigo-300">
                <Zap className="w-3 h-3 text-cyan-400" />
                <span>{rec.confidence}%</span>
              </div>
            </div>

            {/* Impact / Savings Highlights */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {rec.estimatedSavings && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-semibold text-[11px]">
                  <TrendingDown className="w-3 h-3" />
                  Savings: {rec.estimatedSavings}
                </span>
              )}
              {getRiskBadge(rec.risk)}
              <span className="text-slate-400 text-[11px]">Impact: {rec.impact}</span>
            </div>

            {/* Subtle bottom agent tag */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] font-mono text-slate-500">
              <span>Agent: {rec.agentSource}</span>
              <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                Inspect Action &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button
        onClick={onViewAll}
        className="w-full mt-2 py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
      >
        <span>View All Recommendations</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
