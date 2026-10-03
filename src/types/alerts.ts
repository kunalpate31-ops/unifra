export type AlertSeverity = 'Critical' | 'High' | 'Medium' | 'Low';

export type AlertStatus = 'Active' | 'Acknowledged' | 'Resolved';

export type AlertSource =
  | 'All'
  | 'AWS'
  | 'Edge'
  | 'Kubernetes'
  | 'Docker'
  | 'On-Premise'
  | 'Application';

export type AlertTimeRange =
  | 'Last 15 min'
  | 'Last 1 hour'
  | 'Last 6 hours'
  | 'Last 24 hours'
  | 'Last 7 days';

export interface AlertItem {
  id: string;
  incidentId?: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  resource: string;
  resourceType: string;
  source: 'AWS' | 'Edge' | 'Kubernetes' | 'Docker' | 'On-Premise' | 'Application';
  currentValue: string;
  thresholdValue: string;
  startedAt: string;
  duration: string;
  status: AlertStatus;
  acknowledgedBy?: string;
  resolvedAt?: string;
  hypothesis: string;
  recommendedAction: string;
  relatedMetrics: {
    cpu: Array<{ time: string; value: number }>;
    memory: Array<{ time: string; value: number }>;
    temperature?: Array<{ time: string; value: number }>;
    network: Array<{ time: string; value: number }>;
  };
  relatedAlertIds: string[];
}

export interface IncidentGroup {
  id: string;
  title: string;
  severity: AlertSeverity;
  affectedResources: string[];
  alertIds: string[];
  alertCount: number;
  startedAt: string;
  duration: string;
  status: 'Active' | 'Investigating' | 'Mitigating' | 'Resolved';
  hypothesis: string;
  mitigationStep: string;
}

export interface AlertSummaryMetrics {
  activeCount: number;
  criticalCount: number;
  highCount: number;
  warningCount: number;
  acknowledgedCount: number;
  resolvedCount: number;
  affectedResourcesCount: number;
  mttrMinutes: string;
}
