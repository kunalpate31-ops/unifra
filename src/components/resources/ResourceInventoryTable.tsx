import React from 'react';
import { InventoryResource } from '../../types/resources';
import {
  Cloud,
  Cpu,
  Server,
  Box,
  Layers,
  Database,
  Eye,
  Activity,
  AlertTriangle,
  Network
} from 'lucide-react';

interface ResourceInventoryTableProps {
  resources: InventoryResource[];
  onSelectResource: (resource: InventoryResource) => void;
  onViewMetrics: (resource: InventoryResource) => void;
  onViewAlerts: (resource: InventoryResource) => void;
}

export const ResourceInventoryTable: React.FC<ResourceInventoryTableProps> = ({
  resources,
  onSelectResource,
  onViewMetrics,
  onViewAlerts
}) => {
  const getTypeIcon = (type: InventoryResource['type']) => {
    switch (type) {
      case 'AWS EC2':
        return <Cloud className="w-3.5 h-3.5 text-cyan-400" />;
      case 'AWS RDS':
        return <Database className="w-3.5 h-3.5 text-indigo-400" />;
      case 'AWS ElastiCache':
        return <Database className="w-3.5 h-3.5 text-blue-400" />;
      case 'Edge Gateway':
      case 'IoT Device':
        return <Cpu className="w-3.5 h-3.5 text-amber-400" />;
      case 'Docker':
        return <Box className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Kubernetes':
        return <Layers className="w-3.5 h-3.5 text-indigo-400" />;
      case 'On-Premise Network':
        return <Network className="w-3.5 h-3.5 text-slate-400" />;
      default:
        return <Server className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: InventoryResource['status']) => {
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

  const getEnvironmentBadge = (env: InventoryResource['environment']) => {
    switch (env) {
      case 'Production':
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            Prod
          </span>
        );
      case 'Edge Gateway':
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
            Edge
          </span>
        );
      case 'Data Center':
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            DC
          </span>
        );
      default:
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
            {env}
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 shadow-lg space-y-3.5">
      {/* Table Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-semibold text-white tracking-wide">
              INFRASTRUCTURE INVENTORY
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Real-time status, specifications, allocation and monthly cost breakdown
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800/80">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/90 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3 font-semibold">Resource</th>
              <th className="py-2.5 px-3 font-semibold">Type</th>
              <th className="py-2.5 px-3 font-semibold">Environment</th>
              <th className="py-2.5 px-3 font-semibold">Location</th>
              <th className="py-2.5 px-3 font-semibold">CPU</th>
              <th className="py-2.5 px-3 font-semibold">Memory</th>
              <th className="py-2.5 px-3 font-semibold">Status</th>
              <th className="py-2.5 px-3 font-semibold">Monthly Cost</th>
              <th className="py-2.5 px-3 font-semibold">Last Seen</th>
              <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-slate-900/30 font-mono">
            {resources.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-8 text-center text-slate-500 font-mono text-xs">
                  No infrastructure resources found matching the specified filters.
                </td>
              </tr>
            ) : (
              resources.map((res) => (
                <tr
                  key={res.id}
                  onClick={() => onSelectResource(res)}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                >
                  {/* Resource */}
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded bg-slate-800/80 border border-slate-700/60">
                        {getTypeIcon(res.type)}
                      </span>
                      <div>
                        <span className="font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                          {res.name}
                        </span>
                        <span className="block text-[10px] text-slate-500 font-normal">
                          {res.ipAddress}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="py-2.5 px-3 text-slate-300 text-[11px] whitespace-nowrap">
                    {res.type}
                  </td>

                  {/* Environment */}
                  <td className="py-2.5 px-3 whitespace-nowrap">{getEnvironmentBadge(res.environment)}</td>

                  {/* Location */}
                  <td className="py-2.5 px-3 text-slate-300 text-[11px] whitespace-nowrap">
                    {res.location}
                  </td>

                  {/* CPU */}
                  <td className="py-2.5 px-3">
                    <span
                      className={`font-bold ${
                        res.cpu > 85
                          ? 'text-rose-400'
                          : res.cpu > 70
                          ? 'text-amber-400'
                          : 'text-cyan-300'
                      }`}
                    >
                      {res.cpu}%
                    </span>
                  </td>

                  {/* Memory */}
                  <td className="py-2.5 px-3">
                    <span
                      className={`font-bold ${
                        res.memory > 80
                          ? 'text-rose-400'
                          : res.memory > 65
                          ? 'text-amber-400'
                          : 'text-indigo-300'
                      }`}
                    >
                      {res.memory}%
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-2.5 px-3 font-sans whitespace-nowrap">{getStatusBadge(res.status)}</td>

                  {/* Monthly Cost */}
                  <td className="py-2.5 px-3 text-slate-200 font-bold whitespace-nowrap">
                    {res.monthlyCost > 0 ? (
                      <span className="text-emerald-400">${res.monthlyCost}/mo</span>
                    ) : (
                      <span className="text-slate-500 font-normal text-[11px]">Included</span>
                    )}
                  </td>

                  {/* Last Seen */}
                  <td className="py-2.5 px-3 text-slate-400 text-[11px] whitespace-nowrap">
                    {res.lastSeen}
                  </td>

                  {/* Actions */}
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <div
                      className="inline-flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => onSelectResource(res)}
                        title="View Resource Details"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors text-[10px]"
                      >
                        <Eye className="w-3 h-3 text-cyan-400" />
                        <span>Details</span>
                      </button>

                      <button
                        onClick={() => onViewMetrics(res)}
                        title="View Metrics in Monitoring"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors text-[10px]"
                      >
                        <Activity className="w-3 h-3 text-emerald-400" />
                        <span>Metrics</span>
                      </button>

                      {res.status !== 'Healthy' && (
                        <button
                          onClick={() => onViewAlerts(res)}
                          title="View Alerts"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 hover:text-rose-200 border border-rose-500/30 transition-colors text-[10px]"
                        >
                          <AlertTriangle className="w-3 h-3 text-rose-400" />
                          <span>Alerts</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
