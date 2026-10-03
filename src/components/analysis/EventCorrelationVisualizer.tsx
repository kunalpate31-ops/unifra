import React from 'react';
import { AnalysisIncident } from '../../types/analysis';
import {
  Server,
  Activity,
  AlertTriangle,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';

interface EventCorrelationVisualizerProps {
  incident: AnalysisIncident;
}

export const EventCorrelationVisualizer: React.FC<EventCorrelationVisualizerProps> = ({ incident }) => {
  return (
    <div className="p-4 sm:p-5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>Correlated Events & Metric Flow</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950 border border-indigo-500/30 text-indigo-300">
              MULTI-TIER DEPENDENCY MAPPING
            </span>
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Dynamic causal telemetry propagation graph across host, network, and application layers.
          </p>
        </div>
        <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded">
          Correlated: {incident.relatedEventCount} Telemetry Signals
        </span>
      </div>

      {/* Visual Relationship Chain */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative items-stretch">
        {/* Tier 1: Infrastructure Resource & Metric */}
        <div className="p-3.5 rounded-lg bg-slate-950/80 border border-indigo-500/30 flex flex-col justify-between space-y-2 relative group hover:border-indigo-500/60 transition-all">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono text-indigo-400 mb-1">
              <span className="font-bold uppercase">Tier 1: Infrastructure</span>
              <Server className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold text-white font-mono">{incident.affectedResources[0]}</h4>
            <div className="mt-2 p-2 rounded bg-indigo-950/40 border border-indigo-500/20 font-mono text-xs text-indigo-200">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px]">Telemetry Load:</span>
                <span className="text-rose-400 font-bold flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> Peak 91.4%
                </span>
              </div>
              <span className="text-[10px] text-indigo-300/80 block mt-0.5">CPU Threadpool Contention</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-900">
            Source: Host Telemetry Daemon
          </div>
        </div>

        {/* Tier 2: Network & Ingress Metrics */}
        <div className="p-3.5 rounded-lg bg-slate-950/80 border border-cyan-500/30 flex flex-col justify-between space-y-2 relative group hover:border-cyan-500/60 transition-all">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
              <span className="font-bold uppercase">Tier 2: Ingress & Network</span>
              <Activity className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold text-white font-mono">
              {incident.affectedResources[1] || 'k8s-ingress-gateway'}
            </h4>
            <div className="mt-2 p-2 rounded bg-cyan-950/40 border border-cyan-500/20 font-mono text-xs text-cyan-200">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px]">P99 Latency:</span>
                <span className="text-amber-400 font-bold">245 ms</span>
              </div>
              <span className="text-[10px] text-cyan-300/80 block mt-0.5">+180ms vs Baseline SLA</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-900">
            Source: Envoy Ingress Mesh
          </div>
        </div>

        {/* Tier 3: Error Rate & Upstream Alerts */}
        <div className="p-3.5 rounded-lg bg-slate-950/80 border border-rose-500/30 flex flex-col justify-between space-y-2 relative group hover:border-rose-500/60 transition-all">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono text-rose-400 mb-1">
              <span className="font-bold uppercase">Tier 3: Error Rates</span>
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold text-white font-mono">HTTP 5xx Gateways</h4>
            <div className="mt-2 p-2 rounded bg-rose-950/40 border border-rose-500/20 font-mono text-xs text-rose-200">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px]">Failure Rate:</span>
                <span className="text-rose-400 font-bold">4.20%</span>
              </div>
              <span className="text-[10px] text-rose-300/80 block mt-0.5">HTTP 504 Gateway Timeouts</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-900">
            Source: Edge & ALB Telemetry
          </div>
        </div>

        {/* Tier 4: Incident Impact & Service Degradation */}
        <div className="p-3.5 rounded-lg bg-purple-950/30 border border-purple-500/40 flex flex-col justify-between space-y-2 relative group hover:border-purple-500/70 transition-all">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono text-purple-400 mb-1">
              <span className="font-bold uppercase">Tier 4: Service Health</span>
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold text-white font-mono">{incident.title}</h4>
            <div className="mt-2 p-2 rounded bg-purple-950/60 border border-purple-500/30 font-mono text-xs text-purple-200">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px]">Impact Level:</span>
                <span className="text-rose-300 font-bold">{incident.severity}</span>
              </div>
              <span className="text-[10px] text-purple-300/80 block mt-0.5">Checkout Latency Spike</span>
            </div>
          </div>
          <div className="text-[10px] text-purple-400 font-mono pt-1 border-t border-purple-900/50 flex items-center justify-between">
            <span>Confidence:</span>
            <span className="font-bold">{incident.confidenceScore}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
