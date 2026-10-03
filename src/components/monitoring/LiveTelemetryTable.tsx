import React, { useState } from 'react';
import { LiveTelemetryRow } from '../../types/monitoring';
import {
  Server,
  Cloud,
  Cpu,
  Box,
  Layers,
  ChevronRight,
  Search,
  Radio
} from 'lucide-react';

interface LiveTelemetryTableProps {
  rows: LiveTelemetryRow[];
  onSelectRow: (row: LiveTelemetryRow) => void;
}

export const LiveTelemetryTable: React.FC<LiveTelemetryTableProps> = ({ rows, onSelectRow }) => {
  const [filterText, setFilterText] = useState('');

  const filteredRows = rows.filter(
    (r) =>
      r.resource.toLowerCase().includes(filterText.toLowerCase()) ||
      r.type.toLowerCase().includes(filterText.toLowerCase()) ||
      r.location.toLowerCase().includes(filterText.toLowerCase())
  );

  const getTypeIcon = (type: LiveTelemetryRow['type']) => {
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

  const getStatusBadge = (status: LiveTelemetryRow['status']) => {
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

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 shadow-lg space-y-3.5">
      {/* Table Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <h3 className="text-base font-semibold text-white tracking-wide">
              LIVE TELEMETRY STREAM
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Streaming metric probes received by OpenTelemetry Collector
          </p>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search telemetry..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full sm:w-60 pl-8 pr-3 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800/80">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/90 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3 font-semibold">Resource</th>
              <th className="py-2.5 px-3 font-semibold">Type</th>
              <th className="py-2.5 px-3 font-semibold">CPU</th>
              <th className="py-2.5 px-3 font-semibold">Memory</th>
              <th className="py-2.5 px-3 font-semibold">Network</th>
              <th className="py-2.5 px-3 font-semibold">Temperature</th>
              <th className="py-2.5 px-3 font-semibold">API Latency</th>
              <th className="py-2.5 px-3 font-semibold">Status</th>
              <th className="py-2.5 px-3 font-semibold">Last Updated</th>
              <th className="py-2.5 px-3 font-semibold text-right">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-slate-900/30 font-mono">
            {filteredRows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onSelectRow(row)}
                className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
              >
                {/* Resource */}
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-slate-800/80 border border-slate-700/60">
                      {getTypeIcon(row.type)}
                    </span>
                    <div>
                      <span className="font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {row.resource}
                      </span>
                      <span className="block text-[10px] text-slate-500 font-normal">
                        {row.location}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Type */}
                <td className="py-2.5 px-3 text-slate-300 text-[11px]">{row.type}</td>

                {/* CPU */}
                <td className="py-2.5 px-3">
                  <span
                    className={`font-bold ${
                      row.cpu > 85
                        ? 'text-rose-400'
                        : row.cpu > 70
                        ? 'text-amber-400'
                        : 'text-cyan-300'
                    }`}
                  >
                    {row.cpu}%
                  </span>
                </td>

                {/* Memory */}
                <td className="py-2.5 px-3">
                  <span
                    className={`font-bold ${
                      row.memory > 80
                        ? 'text-rose-400'
                        : row.memory > 65
                        ? 'text-amber-400'
                        : 'text-indigo-300'
                    }`}
                  >
                    {row.memory}%
                  </span>
                </td>

                {/* Network */}
                <td className="py-2.5 px-3 text-slate-300">{row.network}</td>

                {/* Temperature */}
                <td className="py-2.5 px-3">
                  <span
                    className={`${
                      parseInt(row.temperature) > 75
                        ? 'text-rose-400 font-bold animate-pulse'
                        : 'text-slate-400'
                    }`}
                  >
                    {row.temperature}
                  </span>
                </td>

                {/* API Latency */}
                <td className="py-2.5 px-3">
                  <span
                    className={`${
                      parseInt(row.latency) > 250
                        ? 'text-rose-400 font-bold'
                        : parseInt(row.latency) > 135
                        ? 'text-amber-400'
                        : 'text-slate-300'
                    }`}
                  >
                    {row.latency}
                  </span>
                </td>

                {/* Status */}
                <td className="py-2.5 px-3 font-sans">{getStatusBadge(row.status)}</td>

                {/* Last Updated */}
                <td className="py-2.5 px-3 text-slate-400 text-[11px] whitespace-nowrap">
                  {row.timestamp}
                </td>

                {/* Action button */}
                <td className="py-2.5 px-3 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRow(row);
                    }}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors text-[10px]"
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
