import React from 'react';
import {
  X,
  Server,
  Cpu,
  Activity,
  ExternalLink,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface RelatedResourceModalProps {
  resourceName: string | null;
  onClose: () => void;
  onNavigateResource: (resourceName: string) => void;
  onNavigateMonitoring: () => void;
}

export const RelatedResourceModal: React.FC<RelatedResourceModalProps> = ({
  resourceName,
  onClose,
  onNavigateResource,
  onNavigateMonitoring
}) => {
  if (!resourceName) return null;

  const isEdge = resourceName.startsWith('EDGE-') || resourceName.includes('edge');

  const getResourceDetails = (name: string) => {
    switch (name) {
      case 'production-api-01':
        return {
          type: 'AWS EC2 Instance (t3.large)',
          role: 'Core Backend API Ingress Worker',
          source: 'AWS (us-east-1a)',
          status: 'Degraded',
          cpu: '91.4%',
          memory: '78.2%',
          network: '14.2 MB/s',
          alerts: ['ALT-002: High CPU utilization (91%)', 'ALT-006: API 5xx error rate (4.2%)']
        };
      case 'production-api-02':
        return {
          type: 'AWS EC2 Instance (t3.large)',
          role: 'Secondary API Ingress Worker',
          source: 'AWS (us-east-1b)',
          status: 'Healthy',
          cpu: '48.1%',
          memory: '54.0%',
          network: '8.4 MB/s',
          alerts: []
        };
      case 'k8s-ingress-gateway':
        return {
          type: 'NGINX Ingress Controller Pod',
          role: 'Cluster Ingress & TLS Termination',
          source: 'Kubernetes (k8s-cluster-core-prod)',
          status: 'Warning',
          cpu: '86.2%',
          memory: '72.0%',
          network: '32.1 MB/s',
          alerts: ['ALT-004: Kubernetes ingress latency increased (185ms)']
        };
      case 'production-db':
      case 'prod-aurora-cluster-writer':
        return {
          type: 'AWS Aurora PostgreSQL (db.r6g.xlarge)',
          role: 'Primary ACID Transactional Database',
          source: 'AWS RDS (us-east-1)',
          status: 'Warning',
          cpu: '64.0%',
          memory: '88.4%',
          network: '18.6 MB/s',
          alerts: ['ALT-003: Production database memory usage high (88.4%)']
        };
      case 'EDGE-003':
        return {
          type: 'NVIDIA Jetson AGX Industrial Gateway',
          role: 'Edge AI Video Inferencing Node',
          source: 'Edge Gateway (Factory Floor North)',
          status: 'Critical',
          cpu: '74.2%',
          memory: '68.0%',
          network: '2.1 MB/s',
          alerts: ['ALT-001: Edge temperature threshold exceeded (82°C)']
        };
      default:
        return {
          type: 'Hybrid Compute Node',
          role: 'Cluster Worker Microservice',
          source: 'Infrastructure Core',
          status: 'Healthy',
          cpu: '42.0%',
          memory: '58.0%',
          network: '5.2 MB/s',
          alerts: []
        };
    }
  };

  const details = getResourceDetails(resourceName);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-xl bg-slate-900 border border-slate-700 shadow-2xl shadow-black/80 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              {isEdge ? <Cpu className="w-5 h-5" /> : <Server className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-400 font-bold">{resourceName}</span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] font-mono border font-semibold ${
                    details.status === 'Critical'
                      ? 'bg-rose-950/70 text-rose-400 border-rose-500/40'
                      : details.status === 'Warning' || details.status === 'Degraded'
                      ? 'bg-amber-950/70 text-amber-400 border-amber-500/30'
                      : 'bg-emerald-950/70 text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  {details.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">{details.type}</p>
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
        <div className="p-5 space-y-3.5 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-[10px] uppercase">Infrastructure Role:</span>
              <span className="text-slate-200 font-medium">{details.role}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-[10px] uppercase">Domain / Zone:</span>
              <span className="text-slate-300">{details.source}</span>
            </div>
          </div>

          {/* Telemetry Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">CPU Load</span>
              <span className="text-xs font-bold text-white mt-0.5 block">{details.cpu}</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Memory</span>
              <span className="text-xs font-bold text-white mt-0.5 block">{details.memory}</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Throughput</span>
              <span className="text-xs font-bold text-cyan-300 mt-0.5 block">{details.network}</span>
            </div>
          </div>

          {/* Active Alerts */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Active Alerts:</span>
            {details.alerts.length > 0 ? (
              <div className="space-y-1">
                {details.alerts.map((alt, idx) => (
                  <div
                    key={idx}
                    className="p-1.5 rounded bg-rose-950/40 border border-rose-500/20 text-rose-300 text-[11px] flex items-center gap-1.5"
                  >
                    <AlertTriangle className="w-3 h-3 text-rose-400 flex-shrink-0" />
                    <span className="truncate">{alt}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-1.5 rounded bg-emerald-950/30 border border-emerald-500/20 text-emerald-300 text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Zero active alarms on node</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onNavigateResource(resourceName);
            }}
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open in {isEdge ? 'Edge Console' : 'Resource Console'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onNavigateMonitoring();
            }}
            className="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-all"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>View Telemetry</span>
          </button>
        </div>
      </div>
    </div>
  );
};
