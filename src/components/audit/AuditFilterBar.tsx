import React from 'react';
import {
  AuditActorType,
  AuditSeverity,
  AuditStatus,
  AuditTimeRange
} from '../../types/audit';
import { Search, X, Calendar } from 'lucide-react';

interface AuditFilterBarProps {
  currentType: AuditActorType | 'All';
  onTypeChange: (type: AuditActorType | 'All') => void;
  currentSeverity: AuditSeverity | 'All';
  onSeverityChange: (sev: AuditSeverity | 'All') => void;
  currentStatus: AuditStatus | 'All';
  onStatusChange: (status: AuditStatus | 'All') => void;
  currentTimeRange: AuditTimeRange;
  onTimeRangeChange: (time: AuditTimeRange) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filteredCount: number;
  totalCount: number;
}

export const AuditFilterBar: React.FC<AuditFilterBarProps> = ({
  currentType,
  onTypeChange,
  currentSeverity,
  onSeverityChange,
  currentStatus,
  onStatusChange,
  currentTimeRange,
  onTimeRangeChange,
  searchQuery,
  onSearchChange,
  filteredCount,
  totalCount
}) => {
  const types: (AuditActorType | 'All')[] = [
    'All',
    'User',
    'AI',
    'Infrastructure',
    'Alert',
    'Recommendation',
    'Control Action',
    'System'
  ];

  const severities: (AuditSeverity | 'All')[] = ['All', 'Info', 'Warning', 'Critical'];
  const statuses: (AuditStatus | 'All')[] = ['All', 'Success', 'Failed', 'Pending'];
  const timeRanges: AuditTimeRange[] = [
    'Last 15 min',
    'Last 1 hour',
    'Last 6 hours',
    'Last 24 hours',
    'Last 7 days'
  ];

  const hasActiveFilters =
    currentType !== 'All' ||
    currentSeverity !== 'All' ||
    currentStatus !== 'All' ||
    searchQuery.trim() !== '';

  const clearFilters = () => {
    onTypeChange('All');
    onSeverityChange('All');
    onStatusChange('All');
    onSearchChange('');
  };

  return (
    <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3 shadow-sm">
      {/* Search, Time Filter, & Count Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search audit logs, actors, resources, descriptions..."
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

        {/* Time Filter Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap self-end sm:self-auto">
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mr-1">
            <Calendar className="w-3 h-3 text-slate-500" />
            Time:
          </span>
          <div className="flex items-center gap-1 p-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono">
            {timeRanges.map((tr) => (
              <button
                key={tr}
                onClick={() => onTimeRangeChange(tr)}
                className={`px-2 py-0.5 rounded transition-all ${
                  currentTimeRange === tr
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Tabs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 border-t border-slate-800/60 text-xs">
        {/* Type Filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono text-slate-400 mr-1">Event Type:</span>
          <div className="flex items-center gap-1 flex-wrap">
            {types.map((tp) => (
              <button
                key={tp}
                onClick={() => onTypeChange(tp)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                  currentType === tp
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                {tp}
              </button>
            ))}
          </div>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono text-slate-400 mr-1">Severity:</span>
          <div className="flex items-center gap-1 flex-wrap">
            {severities.map((sev) => (
              <button
                key={sev}
                onClick={() => onSeverityChange(sev)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                  currentSeverity === sev
                    ? sev === 'Critical'
                      ? 'bg-rose-600 text-white font-semibold shadow-sm'
                      : sev === 'Warning'
                      ? 'bg-amber-600 text-white font-semibold shadow-sm'
                      : 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter & Counter */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
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

          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
            <span>{filteredCount}/{totalCount} logs</span>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-cyan-400 underline underline-offset-2">
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
