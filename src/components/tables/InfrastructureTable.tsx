import React, { useState } from 'react';
import { InfrastructureResource } from '../../types/dashboard';
import {
  Server,
  Cloud,
  Cpu,
  Box,
  Layers,
  Search,
  ChevronRight,
  MapPin
} from 'lucide-react';

interface InfrastructureTableProps {
  resources: InfrastructureResource[];
  onSelectResource: (resource: InfrastructureResource) => void;
}

export const InfrastructureTable: React.FC<InfrastructureTableProps> = ({
  resources,
  onSelectResource
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter(
    (res) =>
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: InfrastructureResource['status']) => {
    switch (status) {
      case 'Healthy':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Healthy
          </span>
        );
      case 'Warning':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Warning
          </span>
        );
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-sm shadow-rose-950">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
            Critical
          </span>
        );
    }
  };

  const getTypeIcon = (type: InfrastructureResource['type']) => {
    switch (type) {
      case 'EC2':
      case 'RDS':
        return <Cloud className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Edge Device':
        return <Cpu className="w-3.5 h-3.5 text-amber-400" />;
      case 'Docker':
        return <Box className="w-3.5 h-3.5 text-blue-400" />;
      case 'Kubernetes':
        return <Layers className="w-3.5 h-3.5 text-indigo-400" />;
      default:
        return <Server className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getMetricBarColor = (val: number) => {
    if (val > 85) return 'bg-rose-500';
    if (val > 70) return 'bg-amber-500';
    return 'bg-cyan-500';
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 shadow-lg space-y-3.5">
      {/* Table Header and Search Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
        <div>
          <h3 className="text-base font-semibold text-white tracking-wide">
            Infrastructure Health Matrix
          </h3>
          <p className="text-xs text-slate-400">
            Hybrid telemetry across AWS compute, local edge clusters, and on-premise nodes
          </p>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search resource, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pl-8 pr-3 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-slate-800/80">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/90 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3 font-semibold">Resource</th>
              <th className="py-2.5 px-3 font-semibold">Type</th>
              <th className="py-2.5 px-3 font-semibold">Location</th>
              <th className="py-2.5 px-3 font-semibold min-w-[120px]">CPU</th>
              <th className="py-2.5 px-3 font-semibold min-w-[120px]">Memory</th>
              <th className="py-2.5 px-3 font-semibold">Status</th>
              <th className="py-2.5 px-3 font-semibold text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-slate-900/30">
            {filteredResources.map((res) => (
              <tr
                key={res.id}
                onClick={() => onSelectResource(res)}
                className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
              >
                {/* Resource Name */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-slate-800/80 border border-slate-700/60 group-hover:border-cyan-500/40 transition-colors">
                      {getTypeIcon(res.type)}
                    </span>
                    <div>
                      <span className="font-mono font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {res.name}
                      </span>
                      <span className="block text-[10px] font-mono text-slate-500">
                        {res.ipAddress}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Type */}
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/50 text-slate-300 font-mono text-[11px]">
                    {res.type}
                  </span>
                </td>

                {/* Location */}
                <td className="py-3 px-3 text-slate-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{res.location}</span>
                  </div>
                </td>

                {/* CPU Utilization */}
                <td className="py-3 px-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-300 font-semibold">{res.cpu}%</span>
                      {res.temperature && (
                        <span className="text-[10px] text-amber-400 font-mono">
                          {res.temperature}°C
                        </span>
                      )}
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${getMetricBarColor(res.cpu)}`}
                        style={{ width: `${res.cpu}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Memory Utilization */}
                <td className="py-3 px-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-300 font-semibold">{res.memory}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${getMetricBarColor(res.memory)}`}
                        style={{ width: `${res.memory}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="py-3 px-3">{getStatusBadge(res.status)}</td>

                {/* Inspect Action */}
                <td className="py-3 px-3 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectResource(res);
                    }}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors text-[11px]"
                  >
                    <span>View</span>
                    <ChevronRight className="w-3 h-3" />
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
