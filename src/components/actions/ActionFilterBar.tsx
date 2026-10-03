import React from 'react';
import { ActionStatus, ActionType, ActionRiskLevel } from '../../types/actions';
import { Search, X } from 'lucide-react';

interface ActionFilterBarProps {
  currentStatus: ActionStatus | 'All';
  onStatusChange: (status: ActionStatus | 'All') => void;
  currentType: ActionType | 'All';
  onTypeChange: (type: ActionType | 'All') => void;
  currentRisk: ActionRiskLevel | 'All';
  onRiskChange: (risk: ActionRiskLevel | 'All') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filteredCount: number;
  totalCount: number;
}

export const ActionFilterBar: React.FC<ActionFilterBarProps> = ({
  currentStatus,
  onStatusChange,
  currentType,
  onTypeChange,
  currentRisk,
  onRiskChange,
  searchQuery,
  onSearchChange,
  filteredCount,
  totalCount
}) => {
  const statuses: (ActionStatus | 'All')[] = [
    'All',
    'Pending',
    'Approved',
    'Executing',
    'Completed',
    'Failed',
    'Scheduled'
  ];

  const types: (ActionType | 'All')[] = [
    'All',
    'Remediation',
    'Scaling',
    'Optimization',
    'Restart',
    'Configuration',
    'Monitoring'
  ];

  const risks: (ActionRiskLevel | 'All')[] = ['All', 'Low', 'Medium', 'High'];

  const hasActiveFilters =
    currentStatus !== 'All' ||
    currentType !== 'All' ||
    currentRisk !== 'All' ||
    searchQuery.trim() !== '';

  const clearFilters = () => {
    onStatusChange('All');
    onTypeChange('All');
    onRiskChange('All');
    onSearchChange('');
  };

  return (
    <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3 shadow-sm">
      {/* Search and Counts Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search control actions, resources, reasons..."
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

        <div className="flex items-center gap-3 text-xs text-slate-400 font-mono self-end sm:self-auto">
          <span>
            Showing <strong className="text-white">{filteredCount}</strong> of {totalCount} actions
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 border-t border-slate-800/60 text-xs">
        {/* Status Filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono text-slate-400 mr-1">Status:</span>
          <div className="flex items-center gap-1 flex-wrap">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => onStatusChange(st)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                  currentStatus === st
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Action Type Filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono text-slate-400 mr-1">Type:</span>
          <div className="flex items-center gap-1 flex-wrap">
            {types.map((tp) => (
              <button
                key={tp}
                onClick={() => onTypeChange(tp)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                  currentType === tp
                    ? 'bg-cyan-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                {tp}
              </button>
            ))}
          </div>
        </div>

        {/* Risk Level Filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono text-slate-400 mr-1">Risk:</span>
          <div className="flex items-center gap-1 flex-wrap">
            {risks.map((rk) => (
              <button
                key={rk}
                onClick={() => onRiskChange(rk)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                  currentRisk === rk
                    ? rk === 'High'
                      ? 'bg-rose-600 text-white font-semibold shadow-sm'
                      : rk === 'Medium'
                      ? 'bg-amber-600 text-white font-semibold shadow-sm'
                      : 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                {rk}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
