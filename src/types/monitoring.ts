export type MonitoringResourceScope =
  | 'All'
  | 'AWS'
  | 'Edge'
  | 'On-Premise'
  | 'Docker'
  | 'Kubernetes';

export type MonitoringTimeRange = '15m' | '1h' | '6h' | '24h';

export interface MonitoringSummaryMetric {
  id: string;
  title: string;
  value: string;
  unit?: string;
  trend: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
    isPositive: boolean;
  };
  status: 'healthy' | 'warning' | 'critical' | 'info';
  progressPercent?: number;
  icon: string;
}

export interface CpuTelemetryPoint {
  timestamp: string;
  cpu: number;
  avgCpu: number;
}

export interface MemoryTelemetryPoint {
  timestamp: string;
  memory: number;
  avgMemory: number;
}

export interface NetworkTrafficPoint {
  timestamp: string;
  inbound: number; // Mbps
  outbound: number; // Mbps
}

export interface ApiPerformancePoint {
  timestamp: string;
  requestRate: number; // Requests/sec or K/min
  p99Latency: number; // ms
  errorRate: number; // %
}

export interface EdgeTemperaturePoint {
  timestamp: string;
  edge001: number;
  edge002: number;
  edge003: number;
  edge004: number;
}

export interface LiveTelemetryRow {
  id: string;
  timestamp: string;
  resource: string;
  type: 'Edge Device' | 'EC2' | 'RDS' | 'Docker' | 'Kubernetes' | 'Switch';
  cpu: number;
  memory: number;
  network: string;
  latency: string;
  temperature: string;
  errorRate: string;
  status: 'Healthy' | 'Warning' | 'Critical';
  location: string;
  ipAddress: string;
  provider: 'AWS' | 'Edge' | 'On-Premise';
  workload: string;
}
