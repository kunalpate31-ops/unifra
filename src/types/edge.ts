export type EdgeStatusFilter =
  | 'All'
  | 'Online'
  | 'Warning'
  | 'Critical'
  | 'Offline';

export type EdgeLocationFilter =
  | 'All Locations'
  | 'Thane'
  | 'Vashi'
  | 'Mumbai'
  | 'Pune';

export type EdgeDeviceType =
  | 'Edge Gateway'
  | 'IoT Gateway'
  | 'Industrial Controller'
  | 'Raspberry Pi Gateway'
  | 'Edge Server';

export interface EdgeDevice {
  id: string;
  name: string;
  location: 'Thane' | 'Vashi' | 'Mumbai' | 'Pune';
  facilityName: string;
  deviceType: EdgeDeviceType;
  cpu: number;
  memory: number;
  disk: number;
  temperature: number;
  network: string;
  networkStatus: 'optimal' | 'stable' | 'degraded' | 'offline';
  uptime: string;
  status: 'Online' | 'Warning' | 'Critical' | 'Offline';
  lastSeen: string;
  ipAddress: string;
  macAddress: string;
  firmwareVersion: string;
  activeWorkloads: string;
  alertsCount: number;
  alerts?: Array<{
    id: string;
    severity: 'CRITICAL' | 'WARNING' | 'INFO';
    message: string;
    time: string;
  }>;
  recentTelemetry: {
    cpuHistory: Array<{ time: string; value: number }>;
    tempHistory: Array<{ time: string; value: number }>;
    netHistory: Array<{ time: string; value: number }>;
  };
}

export interface EdgeSummaryCardData {
  id: string;
  title: string;
  value: string;
  subtext: string;
  status: 'healthy' | 'warning' | 'critical' | 'info';
  icon: string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
    isPositive: boolean;
  };
}

export interface EdgeLocationTopologyNode {
  id: string;
  name: 'Thane' | 'Vashi' | 'Mumbai' | 'Pune';
  facility: string;
  deviceCount: number;
  onlineCount: number;
  warningCount: number;
  criticalCount: number;
  avgTemp: number;
  avgCpu: number;
  networkLatency: string;
  status: 'healthy' | 'warning' | 'critical';
  devices: string[];
}
