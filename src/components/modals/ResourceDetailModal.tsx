import React from 'react';
import { InfrastructureResource } from '../../types/dashboard';
import {
  X,
  Server,
  Clock,
  Terminal,
  Activity,
  HardDrive,
  Thermometer
} from 'lucide-react';

interface ResourceDetailModalProps {
  resource: InfrastructureResource | null;
  onClose: () => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({ resource, onClose }) => {
  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-mono">{resource.name}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                  {resource.type}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                    resource.status === 'Critical'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      : resource.status === 'Warning'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  {resource.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                IP: {resource.ipAddress} • Region: {resource.location} • Provider: {resource.provider}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span>CPU Load</span>
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <p className="text-lg font-bold font-mono text-white">{resource.cpu}%</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span>Memory</span>
                <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <p className="text-lg font-bold font-mono text-white">{resource.memory}%</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span>Disk Storage</span>
                <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <p className="text-lg font-bold font-mono text-white">{resource.disk}%</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span>Uptime</span>
                <Clock className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p className="text-lg font-bold font-mono text-white">{resource.uptime}</p>
            </div>
          </div>

          {/* Environmental Sensors (For Edge Devices) */}
          {(resource.temperature || resource.powerWatts) && (
            <div className="p-3.5 rounded-lg bg-amber-500/5 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold uppercase tracking-wider text-[11px]">
                <Thermometer className="w-4 h-4" />
                <span>Edge Microcontroller Telemetry</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="text-slate-400">Rack Temperature:</span>{' '}
                  <span
                    className={`font-bold ${
                      (resource.temperature || 0) > 75 ? 'text-rose-400 animate-pulse' : 'text-slate-200'
                    }`}
                  >
                    {resource.temperature}°C
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Power Consumption:</span>{' '}
                  <span className="font-bold text-slate-200">{resource.powerWatts} Watts</span>
                </div>
              </div>
            </div>
          )}

          {/* Hardware & Workload Details */}
          <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
              Specification & Runtime Environment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400 font-mono">
              <div>
                Instance / Model:{' '}
                <span className="text-slate-200">{resource.specs.instanceType || 'Generic Node'}</span>
              </div>
              <div>
                Operating System:{' '}
                <span className="text-slate-200">{resource.specs.os || 'Linux'}</span>
              </div>
              <div>
                Compute Capacity:{' '}
                <span className="text-slate-200">
                  {resource.specs.cores} vCPUs, {resource.specs.ramGb} GB RAM
                </span>
              </div>
              <div>
                Last Heartbeat: <span className="text-emerald-400">{resource.lastSeen}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800 text-slate-400 font-mono">
              Active Workloads: <span className="text-slate-200">{resource.activeWorkloads}</span>
            </div>
          </div>

          {/* Simulated Terminal Log Stream */}
          <div className="rounded-lg bg-black border border-slate-800 p-3 font-mono text-[11px] space-y-1 text-slate-400">
            <div className="flex items-center justify-between text-slate-500 pb-1 border-b border-slate-800">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                Live Log Stream (Simulated via OpenTelemetry)
              </span>
              <span className="text-emerald-400 text-[10px]">● STREAMING</span>
            </div>
            <p className="text-slate-500">[22:50:01.120] otel.agent: Heartbeat ACK from collector</p>
            <p className="text-cyan-400">
              [22:50:15.304] kernel: cpu load sampled: {resource.cpu}% | mem: {resource.memory}%
            </p>
            {resource.status === 'Critical' ? (
              <p className="text-rose-400 font-bold">
                [22:50:22.891] thermal_daemon: WARNING core temperature exceeded safety ceiling
              </p>
            ) : (
              <p className="text-emerald-400">
                [22:50:22.891] healthcheck: all probes passed (200 OK)
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
