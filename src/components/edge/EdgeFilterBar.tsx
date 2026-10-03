import React from 'react';
import { EdgeStatusFilter, EdgeLocationFilter } from '../../types/edge';
import { Filter, Search, MapPin } from 'lucide-react';

interface EdgeFilterBarProps {
  currentStatus: EdgeStatusFilter;
  onStatusChange: (status: EdgeStatusFilter) => void;
  currentLocation: EdgeLocationFilter;
  onLocationChange: (location: EdgeLocationFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredCount: number;
  totalCount: number;
}

const STATUS_TABS: EdgeStatusFilter[] = ['All', 'Online', 'Warning', 'Critical', 'Offline'];
const LOCATION_OPTIONS: EdgeLocationFilter[] = [
  'All Locations',
  'Thane',
  'Vashi',
  'Mumbai',
  'Pune'
];

export const EdgeFilterBar: React.FC<EdgeFilterBarProps> = ({
  currentStatus,
  onStatusChange,
  currentLocation,
  onLocationChange,
  searchQuery,
  onSearchChange,
  filteredCount,
  totalCount
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 sm:p-4 shadow-sm space-y-3">
      {/* Top Row: Status Tabs & Count */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono pr-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Status:</span>
          </div>
          <div className="inline-flex rounded-lg p-0.5 bg-slate-950/80 border border-slate-800 text-xs font-medium flex-wrap">
            {STATUS_TABS.map((status) => (
              <button
                key={status}
                onClick={() => onStatusChange(status)}
                className={`px-3 py-1 rounded-md transition-all font-mono text-[11px] ${
                  currentStatus === status
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs font-mono text-slate-400 flex items-center gap-2 self-end md:self-auto">
          <span>Showing</span>
          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 font-bold text-cyan-300">
            {filteredCount} of {totalCount}
          </span>
          <span>devices</span>
        </div>
      </div>

      {/* Bottom Row: Search + Location Dropdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative sm:col-span-2">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search edge devices by ID, name, facility, IP, or workload..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors font-sans"
          />
        </div>

        {/* Location Dropdown */}
        <div className="relative sm:col-span-1">
          <div className="flex items-center gap-1.5 absolute left-2.5 top-2 pointer-events-none text-slate-500 text-xs">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <select
            value={currentLocation}
            onChange={(e) => onLocationChange(e.target.value as EdgeLocationFilter)}
            aria-label="Filter by Location"
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors font-mono appearance-none cursor-pointer"
          >
            {LOCATION_OPTIONS.map((loc) => (
              <option key={loc} value={loc} className="bg-slate-900 text-slate-200">
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
