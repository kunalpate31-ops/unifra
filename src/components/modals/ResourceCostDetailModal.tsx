import React from 'react';
import { ResourceCostItem } from '../../types/cost';
import {
  X,
  Server,
  Cpu,
  Cloud,
  Layers,
  Box,
  DollarSign,
  ExternalLink,
  Activity,
  Zap
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts';

interface ResourceCostDetailModalProps {
  resource: ResourceCostItem | null;
  onClose: () => void;
  onNavigateResource: (resourceName: string, source: string) => void;
  onNavigateMonitoring: () => void;
}

export const ResourceCostDetailModal: React.FC<ResourceCostDetailModalProps> = ({
  resource,
  onClose,
  onNavigateResource,
  onNavigateMonitoring
}) => {
  if (!resource) return null;

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'AWS':
        return <Cloud className="w-4 h-4 text-amber-400" />;
      case 'Edge':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'Kubernetes':
        return <Layers className="w-4 h-4 text-indigo-400" />;
      case 'Docker':
        return <Box className="w-4 h-4 text-blue-400" />;
      case 'On-Premise':
      default:
        return <Server className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-xl bg-slate-900 border border-slate-700 shadow-2xl shadow-black/80 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs font-mono text-cyan-400 font-bold">
                  {getSourceIcon(resource.source)}
                  {resource.resource}
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono border border-slate-700 bg-slate-800 text-slate-300">
                  {resource.environment}
                </span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] font-mono border ${
                    resource.status === 'Optimized'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-500/30'
                      : resource.status === 'Warning'
                      ? 'bg-amber-950 text-amber-400 border-amber-500/30'
                      : 'bg-rose-950 text-rose-400 border-rose-500/30'
                  }`}
                >
                  {resource.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">{resource.type}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs font-mono">
          {/* KPI 3-grid */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">Current Monthly Cost</span>
              <span className="text-base font-bold text-white">${resource.monthlyCost}/mo</span>
              <span className="text-[10px] text-slate-500 block">Prev: ${resource.previousMonthCost}/mo</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">Telemetry Load</span>
              <span className="text-base font-bold text-cyan-300">{resource.utilization}</span>
              <span className="text-[10px] text-slate-500 block">30-Day Avg</span>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 space-y-1">
              <span className="text-[10px] text-emerald-400 uppercase font-bold block">Savings Potential</span>
              <span className="text-sm font-bold text-emerald-300">{resource.optimizationPotential}</span>
              <span className="text-[10px] text-emerald-400/80 block">FinOps Verified</span>
            </div>
          </div>

          {/* 30-Day Daily Spend Trend Line */}
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-bold text-slate-300">Daily Cost Telemetry (Past 30 Days)</span>
              <span className="text-indigo-400">USD ($) per 24h</span>
            </div>
            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={resource.historicalTrend} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                  <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090d16',
                      borderColor: '#334155',
                      borderRadius: '6px',
                      fontSize: '11px',
                      color: '#f8fafc'
                    }}
                    formatter={(val: number) => [`$${val}/day`]}
                  />
                  <Line
                    type="monotone"
                    dataKey="cost"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ fill: '#6366f1', r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Optimization Recommendation Box */}
          {resource.recommendation && (
            <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 space-y-1">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                Optimization Strategy
              </span>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                {resource.recommendation}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onNavigateResource(resource.resource, resource.source);
            }}
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open in Resources</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onNavigateMonitoring();
            }}
            className="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-all"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>View Metrics</span>
          </button>
        </div>
      </div>
    </div>
  );
};
