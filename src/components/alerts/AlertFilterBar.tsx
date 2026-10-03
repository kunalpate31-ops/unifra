import React from 'react';
import {
  AlertSeverity,
  AlertStatus,
  AlertSource,
  AlertTimeRange
} from '../../types/alerts';
import { Filter, Search, Clock, ShieldCheck, Layers } from 'lucide-react';

interface AlertFilterBarProps {
  currentSeverity: AlertSeverity | 'All';
  onSeverityChange: (severity: AlertSeverity | 'All') => void;
  currentStatus: AlertStatus | 'All';
  onStatusChange: (status: AlertStatus | 'All') => void;
  currentSource: AlertSource;
  onSourceChange: (source: AlertSource) => void;
  currentTimeRange: AlertTimeRange;
  onTimeRangeChange: (range: AlertTimeRange) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredCount: number;
  totalCount: number;
}

const SEVERITY_TABS: (AlertSeverity | 'All')[] = ['All', 'Critical', 'High', 'Medium', 'Low'];
const STATUS_TABS: (AlertStatus | 'All')[] = ['All', 'Active', 'Acknowledged', 'Resolved'];
const SOURCE_OPTIONS: AlertSource[] = [
  'All',
  'AWS',
  'Edge',
  'Kubernetes',
  'Docker',
  'On-Premise',
  'Application'
];
const TIME_OPTIONS: AlertTimeRange[] = [
  'Last 15 min',
  'Last 1 hour',
  'Last 6 hours',
  'Last 24 hours',
  'Last 7 days'
];

export const AlertFilterBar: React.FC<AlertFilterBarProps> = ({
  currentSeverity,
  onSeverityChange,
  currentStatus,
  onStatusChange,
  currentSource,
  onSourceChange,
  currentTimeRange,
  onTimeRangeChange,
  searchQuery,
  onSearchChange,
  filteredCount,
  totalCount
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 sm:p-4 shadow-sm space-y-3">
      {/* Top Row: Severity Tabs & Status Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
        {/* Severity Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono pr-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Severity:</span>
          </div>
          <div className="inline-flex rounded-lg p-0.5 bg-slate-950/80 border border-slate-800 text-xs font-medium flex-wrap">
            {SEVERITY_TABS.map((sev) => (
              <button
                key={sev}
                onClick={() => onSeverityChange(sev)}
                className={`px-3 py-1 rounded-md transition-all font-mono text-[11px] ${
                  currentSeverity === sev
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono pr-1">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>Status:</span>
          </div>
          <div className="inline-flex rounded-lg p-0.5 bg-slate-950/80 border border-slate-800 text-xs font-medium flex-wrap">
            {STATUS_TABS.map((st) => (
              <button
                key={st}
                onClick={() => onStatusChange(st)}
                className={`px-2.5 py-1 rounded-md transition-all font-mono text-[11px] ${
                  currentStatus === st
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Count Pill */}
        <div className="text-xs font-mono text-slate-400 flex items-center gap-2 self-end lg:self-auto">
          <span>Showing</span>
          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 font-bold text-cyan-300">
            {filteredCount} of {totalCount}
          </span>
          <span>alerts</span>
        </div>
      </div>

      {/* Bottom Row: Search + Source Dropdown + Time Range Dropdown */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative sm:col-span-2">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search alerts by title, resource, description or root cause..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors font-sans"
          />
        </div>

        {/* Source Dropdown */}
        <div className="relative sm:col-span-1">
          <div className="flex items-center gap-1.5 absolute left-2.5 top-2 pointer-events-none text-slate-500 text-xs">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <select
            value={currentSource}
            onChange={(e) => onSourceChange(e.target.value as AlertSource)}
            aria-label="Filter by Source"
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors font-mono appearance-none cursor-pointer"
          >
            {SOURCE_OPTIONS.map((src) => (
              <option key={src} value={src} className="bg-slate-900 text-slate-200">
                Source: {src}
              </option>
            ))}
          </select>
        </div>

        {/* Time Range Dropdown */}
        <div className="relative sm:col-span-1">
          <div className="flex items-center gap-1.5 absolute left-2.5 top-2 pointer-events-none text-slate-500 text-xs">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <select
            value={currentTimeRange}
            onChange={(e) => onTimeRangeChange(e.target.value as AlertTimeRange)}
            aria-label="Filter by Time Range"
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors font-mono appearance-none cursor-pointer"
          >
            {TIME_OPTIONS.map((time) => (
              <option key={time} value={time} className="bg-slate-900 text-slate-200">
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
