import React from 'react';
import {
  RecommendationCategory,
  RecommendationPriority,
  RecommendationStatus
} from '../../types/recommendations';
import { Search, X } from 'lucide-react';

interface RecommendationFilterBarProps {
  currentCategory: RecommendationCategory | 'All';
  onCategoryChange: (cat: RecommendationCategory | 'All') => void;
  currentPriority: RecommendationPriority | 'All';
  onPriorityChange: (prio: RecommendationPriority | 'All') => void;
  currentStatus: RecommendationStatus | 'All';
  onStatusChange: (st: RecommendationStatus | 'All') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filteredCount: number;
  totalCount: number;
}

export const RecommendationFilterBar: React.FC<RecommendationFilterBarProps> = ({
  currentCategory,
  onCategoryChange,
  currentPriority,
  onPriorityChange,
  currentStatus,
  onStatusChange,
  searchQuery,
  onSearchChange,
  filteredCount,
  totalCount
}) => {
  const categories: (RecommendationCategory | 'All')[] = [
    'All',
    'Cost',
    'Performance',
    'Reliability',
    'Security',
    'Capacity'
  ];

  const priorities: (RecommendationPriority | 'All')[] = [
    'All',
    'Critical',
    'High',
    'Medium',
    'Low'
  ];

  const statuses: (RecommendationStatus | 'All')[] = [
    'All',
    'New',
    'Reviewed',
    'Applied',
    'Dismissed'
  ];

  const hasActiveFilters =
    currentCategory !== 'All' ||
    currentPriority !== 'All' ||
    currentStatus !== 'All' ||
    searchQuery.trim() !== '';

  const clearAllFilters = () => {
    onCategoryChange('All');
    onPriorityChange('All');
    onStatusChange('All');
    onSearchChange('');
  };

  return (
    <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3 shadow-sm">
      {/* Top Row: Search & Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search recommendations, resources, reasons..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-1.5 bg-slate-950/80 border border-slate-800 rounded-md text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Counter & Clear Button */}
        <div className="flex items-center gap-3 text-xs text-slate-400 font-mono self-end sm:self-auto">
          <span>
            Showing <strong className="text-white">{filteredCount}</strong> of {totalCount} suggestions
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 underline underline-offset-2 flex items-center gap-1"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs Groups */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 border-t border-slate-800/60 text-xs">
        {/* 1. Category Filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono text-slate-400 mr-1">Category:</span>
          <div className="flex items-center gap-1 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                  currentCategory === cat
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Priority Filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono text-slate-400 mr-1">Priority:</span>
          <div className="flex items-center gap-1 flex-wrap">
            {priorities.map((prio) => (
              <button
                key={prio}
                onClick={() => onPriorityChange(prio)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                  currentPriority === prio
                    ? prio === 'Critical'
                      ? 'bg-rose-600 text-white font-semibold shadow-sm'
                      : prio === 'High'
                      ? 'bg-amber-600 text-white font-semibold shadow-sm'
                      : 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                {prio}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Status Filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono text-slate-400 mr-1">Status:</span>
          <div className="flex items-center gap-1 flex-wrap">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => onStatusChange(st)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                  currentStatus === st
                    ? 'bg-cyan-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
