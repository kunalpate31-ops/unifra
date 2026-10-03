export type ScopeFilter = 'All' | 'AWS' | 'Edge' | 'On-Premise';
export type TimeRange = '15m' | '1h' | '6h' | '24h';

export interface StatMetric {
  id: string;
  title: string;
  value: string;
  subtext: string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
    isPositive: boolean;
  };
  status?: 'healthy' | 'warning' | 'critical' | 'info';
  icon: string;
}

export interface TelemetryPoint {
  timestamp: string;
  cpu: number;
  memory: number;
  networkIn: number;
  networkOut: number;
  apiLatency: number;
  errorRate: number;
}

export interface InfrastructureResource {
  id: string;
  name: string;
  type: 'EC2' | 'RDS' | 'Edge Device' | 'Docker' | 'Kubernetes' | 'Switch' | 'Router';
  location: string;
  cpu: number;
  memory: number;
  disk: number;
  temperature?: number;
  powerWatts?: number;
  status: 'Healthy' | 'Warning' | 'Critical';
  ipAddress: string;
  uptime: string;
  activeWorkloads: string;
  provider: 'AWS' | 'Edge' | 'On-Premise';
  lastSeen: string;
  specs: {
    cores?: number;
    ramGb?: number;
    os?: string;
    instanceType?: string;
  };
}

export interface SystemAlert {
  id: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  resource: string;
  resourceType: string;
  description: string;
  time: string;
  timestamp: string;
  impactScore: number;
  rootCauseHypothesis: string;
  recommendedAction: string;
  status: 'Firing' | 'Acknowledged' | 'Resolved';
}

export interface AIRecommendation {
  id: string;
  title: string;
  agentSource: 'Cost Agent' | 'Health Agent' | 'API Performance Agent' | 'Correlation Agent';
  confidence: number;
  risk: 'Low' | 'Medium' | 'High';
  impact: string;
  estimatedSavings?: string;
  category: 'COST' | 'PERFORMANCE' | 'RELIABILITY';
  description: string;
  suggestedActionPayload: {
    service: string;
    action: string;
    target: string;
  };
}

export interface SystemServiceStatus {
  name: string;
  status: 'Simulated / Connected' | 'Demo Data' | 'Simulated';
  badgeColor: 'emerald' | 'cyan' | 'amber' | 'indigo';
  type: string;
  latencyMs: number;
}
