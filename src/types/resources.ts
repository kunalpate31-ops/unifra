export type ResourceScope =
  | 'All'
  | 'AWS'
  | 'Edge'
  | 'On-Premise'
  | 'Docker'
  | 'Kubernetes';

export type ResourceStatus = 'All Status' | 'Healthy' | 'Warning' | 'Critical';

export type ResourceType =
  | 'All Types'
  | 'AWS EC2'
  | 'AWS RDS'
  | 'AWS ElastiCache'
  | 'Edge Gateway'
  | 'IoT Device'
  | 'Docker'
  | 'Kubernetes'
  | 'On-Premise Network';

export interface InventoryResource {
  id: string;
  name: string;
  type:
    | 'AWS EC2'
    | 'AWS RDS'
    | 'AWS ElastiCache'
    | 'Edge Gateway'
    | 'IoT Device'
    | 'Docker'
    | 'Kubernetes'
    | 'On-Premise Network';
  category: 'AWS' | 'Edge' | 'On-Premise' | 'Docker' | 'Kubernetes';
  environment: 'Production' | 'Staging' | 'Edge Gateway' | 'Data Center';
  location: 'AWS Mumbai' | 'AWS Singapore' | 'Thane Edge' | 'Vashi Edge' | 'On-Premise DC';
  cpu: number;
  memory: number;
  disk: number;
  network: string;
  temperature?: number;
  apiLatency?: string;
  errorRate?: string;
  status: 'Healthy' | 'Warning' | 'Critical';
  monthlyCost: number; // in USD, 0 for on-prem/edge hardware
  costFormatted: string;
  uptime: string;
  lastSeen: string;
  ipAddress: string;
  workload: string;
  specs: {
    cores: number;
    ramGb: number;
    storageGb: number;
    osOrEngine: string;
  };
  recentTelemetry: Array<{ time: string; cpu: number; mem: number }>;
}

export interface ResourceSummaryCardData {
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

export interface CostBreakdownItem {
  id: string;
  category: 'AWS Compute' | 'AWS Database' | 'Storage' | 'Network' | 'Other';
  monthlyCost: number;
  percentage: number;
  resourceCount: number;
  trend: string;
  color: string;
}
