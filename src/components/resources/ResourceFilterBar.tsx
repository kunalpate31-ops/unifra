import React from 'react';
import {
  ResourceScope,
  ResourceStatus,
  ResourceType
} from '../../types/resources';
import { Filter, Search, ShieldCheck, Box } from 'lucide-react';

interface ResourceFilterBarProps {
  currentScope: ResourceScope;
  onScopeChange: (scope: ResourceScope) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentStatus: ResourceStatus;
  onStatusChange: (status: ResourceStatus) => void;
  currentType: ResourceType;
  onTypeChange: (type: ResourceType) => void;
  totalFilteredCount: number;
  totalCount: number;
}

const SCOPES: ResourceScope[] = [
  'All',
  'AWS',
  'Edge',
  'On-Premise',
  'Docker',
  'Kubernetes'
];

const STATUS_OPTIONS: ResourceStatus[] = [
  'All Status',
  'Healthy',
  'Warning',
  'Critical'
];

const TYPE_OPTIONS: ResourceType[] = [
  'All Types',
  'AWS EC2',
  'AWS RDS',
  'AWS ElastiCache',
  'Edge Gateway',
  'IoT Device',
  'Docker',
  'Kubernetes',
  'On-Premise Network'
];

export const ResourceFilterBar: React.FC<ResourceFilterBarProps> = ({
  currentScope,
  onScopeChange,
  searchQuery,
  onSearchChange,
  currentStatus,
  onStatusChange,
  currentType,
  onTypeChange,
  totalFilteredCount,
  totalCount
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 sm:p-4 shadow-sm space-y-3">
      {/* Top row: Scope Tabs & Count */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
        {/* Scope tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono pr-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Scope:</span>
          </div>
          <div className="inline-flex rounded-lg p-0.5 bg-slate-950/80 border border-slate-800 text-xs font-medium flex-wrap">
            {SCOPES.map((scope) => (
              <button
                key={scope}
                onClick={() => onScopeChange(scope)}
                className={`px-3 py-1 rounded-md transition-all font-mono text-[11px] ${
                  currentScope === scope
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {scope}
              </button>
            ))}
          </div>
        </div>

        {/* Counter Badge */}
        <div className="text-xs font-mono text-slate-400 flex items-center gap-2 self-end md:self-auto">
          <span>Showing</span>
          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 font-bold text-cyan-300">
            {totalFilteredCount} of {totalCount}
          </span>
          <span>resources</span>
        </div>
      </div>

      {/* Bottom row: Search + Status Dropdown + Type Dropdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search input */}
        <div className="relative sm:col-span-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors font-sans"
          />
        </div>

        {/* Status filter dropdown */}
        <div className="relative">
          <div className="flex items-center gap-1.5 absolute left-2.5 top-2 pointer-events-none text-slate-500 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <select
            value={currentStatus}
            onChange={(e) => onStatusChange(e.target.value as ResourceStatus)}
            aria-label="Filter by Status"
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors font-mono appearance-none cursor-pointer"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status} className="bg-slate-900 text-slate-200">
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Resource Type filter dropdown */}
        <div className="relative">
          <div className="flex items-center gap-1.5 absolute left-2.5 top-2 pointer-events-none text-slate-500 text-xs">
            <Box className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <select
            value={currentType}
            onChange={(e) => onTypeChange(e.target.value as ResourceType)}
            aria-label="Filter by Resource Type"
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors font-mono appearance-none cursor-pointer"
          >
            {TYPE_OPTIONS.map((type) => (
              <option key={type} value={type} className="bg-slate-900 text-slate-200">
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
