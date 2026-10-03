export type AuditActorType = 'User' | 'AI' | 'Infrastructure' | 'Alert' | 'Recommendation' | 'Control Action' | 'System';
export type AuditSeverity = 'Info' | 'Warning' | 'Critical';
export type AuditStatus = 'Success' | 'Failed' | 'Pending';
export type AuditTimeRange = 'Last 15 min' | 'Last 1 hour' | 'Last 6 hours' | 'Last 24 hours' | 'Last 7 days';

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  actorType: AuditActorType;
  activity: string;
  resource: string;
  source: 'AWS' | 'Edge' | 'Kubernetes' | 'Docker' | 'On-Premise' | 'System';
  severity: AuditSeverity;
  status: AuditStatus;
  description: string;
  ipAddress?: string;
  metadata?: Record<string, string>;
  relatedAlertId?: string;
  relatedRecommendationId?: string;
  relatedIncidentId?: string;
  relatedActionId?: string;
}

export interface AuditSummaryMetrics {
  totalEvents: number;
  userActions: number;
  aiActions: number;
  infrastructureEvents: number;
  alertsGenerated: number;
  recommendationsCount: number;
  controlActionsCount: number;
  failedActionsCount: number;
}

export interface SystemEngineHealthItem {
  name: string;
  category: string;
  status: 'Operational' | 'Warning' | 'Simulated';
  latency: string;
  eventsProcessed: string;
  lastHeartbeat: string;
}
