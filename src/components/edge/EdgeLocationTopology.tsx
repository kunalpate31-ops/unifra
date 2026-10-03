import React from 'react';
import { EdgeLocationTopologyNode } from '../../types/edge';
import { MapPin } from 'lucide-react';

interface EdgeLocationTopologyProps {
  nodes: EdgeLocationTopologyNode[];
  selectedLocation: string;
  onSelectLocation: (location: string) => void;
}

export const EdgeLocationTopology: React.FC<EdgeLocationTopologyProps> = ({
  nodes,
  selectedLocation,
  onSelectLocation
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">
              EDGE TOPOLOGY & LOCATION MAP
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Distributed gateway distribution across regional industrial hubs and edge clusters
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Click any location node to filter edge inventory
        </div>
      </div>

      {/* Grid of Location Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {nodes.map((node) => {
          const isSelected = selectedLocation === node.name;

          return (
            <div
              key={node.id}
              onClick={() => onSelectLocation(selectedLocation === node.name ? 'All Locations' : node.name)}
              className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              {/* Top Location Title & Status Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-1.5 rounded-lg ${
                      node.status === 'critical'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        : node.status === 'warning'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono">{node.name} Hub</h4>
                    <span className="text-[10px] text-slate-400 block line-clamp-1">
                      {node.facility}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${
                    node.status === 'critical'
                      ? 'bg-rose-950/50 text-rose-400 border-rose-500/40 animate-pulse'
                      : node.status === 'warning'
                      ? 'bg-amber-950/50 text-amber-400 border-amber-500/40'
                      : 'bg-emerald-950/50 text-emerald-400 border-emerald-500/40'
                  }`}
                >
                  {node.status.toUpperCase()}
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 font-mono text-xs pt-1 border-t border-slate-800/60">
                <div className="p-2 rounded bg-slate-900/90 border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase block">Devices</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-sm font-bold text-white">{node.deviceCount}</span>
                    <span className="text-[10px] text-emerald-400">({node.onlineCount} On)</span>
                  </div>
                </div>

                <div className="p-2 rounded bg-slate-900/90 border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase block">Avg Temp</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span
                      className={`text-sm font-bold ${
                        node.avgTemp > 70 ? 'text-rose-400' : 'text-slate-200'
                      }`}
                    >
                      {node.avgTemp}°C
                    </span>
                  </div>
                </div>

                <div className="p-2 rounded bg-slate-900/90 border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase block">Avg CPU</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-sm font-bold text-cyan-300">{node.avgCpu}%</span>
                  </div>
                </div>

                <div className="p-2 rounded bg-slate-900/90 border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase block">Latency</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-sm font-bold text-slate-300">{node.networkLatency}</span>
                  </div>
                </div>
              </div>

              {/* Connected Device Tags */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-slate-500">Active Nodes:</span>
                <div className="flex items-center gap-1 flex-wrap">
                  {node.devices.slice(0, 3).map((d) => (
                    <span
                      key={d}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-mono border ${
                        d.includes('Critical')
                          ? 'bg-rose-950/40 text-rose-300 border-rose-500/30'
                          : d.includes('Warning')
                          ? 'bg-amber-950/40 text-amber-300 border-amber-500/30'
                          : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      {d}
                    </span>
                  ))}
                  {node.devices.length > 3 && (
                    <span className="text-[9px] font-mono text-slate-500">
                      +{node.devices.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
