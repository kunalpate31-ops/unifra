import React from 'react';
import {
  MonitoringResourceScope,
  MonitoringTimeRange
} from '../../types/monitoring';
import { Filter, Clock, Play, Pause, Radio } from 'lucide-react';

interface MonitoringFilterBarProps {
  currentScope: MonitoringResourceScope;
  onScopeChange: (scope: MonitoringResourceScope) => void;
  currentRange: MonitoringTimeRange;
  onRangeChange: (range: MonitoringTimeRange) => void;
  isLiveStreamActive: boolean;
  onToggleLiveStream: () => void;
}

const RESOURCE_SCOPES: MonitoringResourceScope[] = [
  'All',
  'AWS',
  'Edge',
  'On-Premise',
  'Docker',
  'Kubernetes'
];

const TIME_RANGES: MonitoringTimeRange[] = ['15m', '1h', '6h', '24h'];

export const MonitoringFilterBar: React.FC<MonitoringFilterBarProps> = ({
  currentScope,
  onScopeChange,
  currentRange,
  onRangeChange,
  isLiveStreamActive,
  onToggleLiveStream
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 sm:p-3.5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
      {/* Resource Scope Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono pr-1">
          <Filter className="w-3.5 h-3.5 text-cyan-400" />
          <span>Scope:</span>
        </div>
        <div className="inline-flex rounded-lg p-0.5 bg-slate-950/80 border border-slate-800 text-xs font-medium flex-wrap">
          {RESOURCE_SCOPES.map((scope) => (
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

      {/* Right Controls: Time Range & Live Streaming Toggle */}
      <div className="flex items-center gap-3 self-end md:self-auto flex-wrap">
        {/* Time Range */}
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />
          <div className="inline-flex rounded-lg p-0.5 bg-slate-950/80 border border-slate-800 text-xs font-mono">
            {TIME_RANGES.map((range) => (
              <button
                key={range}
                onClick={() => onRangeChange(range)}
                className={`px-2.5 py-1 rounded-md transition-all text-[11px] ${
                  currentRange === range
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Live Stream Status & Toggle */}
        <button
          onClick={onToggleLiveStream}
          title={isLiveStreamActive ? 'Pause real-time telemetry updates' : 'Resume real-time telemetry updates'}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono border transition-all ${
            isLiveStreamActive
              ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30 hover:bg-emerald-900/40'
              : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-700'
          }`}
        >
          {isLiveStreamActive ? (
            <>
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>LIVE: 3s</span>
              <Pause className="w-2.5 h-2.5 ml-1 text-slate-400" />
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-amber-400" />
              <span>PAUSED</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
