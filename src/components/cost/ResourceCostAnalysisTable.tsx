import React from 'react';
import { ResourceCostItem } from '../../types/cost';
import {
  Server,
  Cpu,
  Cloud,
  Layers,
  Box,
  TrendingUp,
  TrendingDown,
  Eye,
  Zap
} from 'lucide-react';

interface ResourceCostAnalysisTableProps {
  resources: ResourceCostItem[];
  onSelectResource: (resource: ResourceCostItem) => void;
}

export const ResourceCostAnalysisTable: React.FC<ResourceCostAnalysisTableProps> = ({
  resources,
  onSelectResource
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Optimized':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30';
      case 'Warning':
        return 'text-amber-400 bg-amber-950/60 border-amber-500/30';
      case 'Overprovisioned':
        return 'text-rose-400 bg-rose-950/60 border-rose-500/30';
      case 'Idle':
      default:
        return 'text-purple-400 bg-purple-950/60 border-purple-500/30';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'AWS':
        return <Cloud className="w-3.5 h-3.5 text-amber-400" />;
      case 'Edge':
        return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Kubernetes':
        return <Layers className="w-3.5 h-3.5 text-indigo-400" />;
      case 'Docker':
        return <Box className="w-3.5 h-3.5 text-blue-400" />;
      case 'On-Premise':
      default:
        return <Server className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>Resource Cost Analysis</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 border border-cyan-500/30 text-cyan-300">
              NODE-LEVEL ATTRIBUTION
            </span>
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Individual compute, database, and container workload billing footprint and rightsizing potential.
          </p>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          Showing {resources.length} active tracked nodes
        </span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-950/90 border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400 tracking-wider">
              <th className="py-2.5 px-3">Resource</th>
              <th className="py-2.5 px-3">Type</th>
              <th className="py-2.5 px-3">Monthly Cost</th>
              <th className="py-2.5 px-3">Prev. Month</th>
              <th className="py-2.5 px-3">Change</th>
              <th className="py-2.5 px-3">Utilization</th>
              <th className="py-2.5 px-3">Optimization Potential</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 font-mono">
            {resources.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelectResource(item)}
                className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
              >
                {/* Resource */}
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2">
                    {getSourceIcon(item.source)}
                    <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {item.resource}
                    </span>
                  </div>
                </td>

                {/* Type */}
                <td className="py-2.5 px-3 text-slate-400 text-[11px] truncate max-w-[150px]" title={item.type}>
                  {item.type}
                </td>

                {/* Monthly Cost */}
                <td className="py-2.5 px-3 text-white font-bold">
                  ${item.monthlyCost.toLocaleString()}/mo
                </td>

                {/* Prev Month */}
                <td className="py-2.5 px-3 text-slate-400">
                  ${item.previousMonthCost.toLocaleString()}/mo
                </td>

                {/* Change */}
                <td className="py-2.5 px-3">
                  {item.changePercent > 0 ? (
                    <span className="text-rose-400 font-semibold flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" /> +{item.changePercent}%
                    </span>
                  ) : item.changePercent < 0 ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                      <TrendingDown className="w-3 h-3" /> {item.changePercent}%
                    </span>
                  ) : (
                    <span className="text-slate-500">0.0%</span>
                  )}
                </td>

                {/* Utilization */}
                <td className="py-2.5 px-3 text-slate-300 text-[11px]">
                  {item.utilization}
                </td>

                {/* Optimization Potential */}
                <td className="py-2.5 px-3 text-[11px]">
                  {item.optimizationPotential.includes('Save') ? (
                    <span className="text-emerald-300 font-semibold flex items-center gap-1">
                      <Zap className="w-3 h-3 text-emerald-400" />
                      {item.optimizationPotential}
                    </span>
                  ) : (
                    <span className="text-slate-500">{item.optimizationPotential}</span>
                  )}
                </td>

                {/* Status */}
                <td className="py-2.5 px-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono border font-medium ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Action */}
                <td className="py-2.5 px-3 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectResource(item);
                    }}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="View Cost Telemetry"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
