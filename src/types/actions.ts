export type ActionStatus = 'Pending' | 'Approved' | 'Executing' | 'Completed' | 'Failed' | 'Scheduled' | 'Rejected';
export type ActionType = 'Remediation' | 'Scaling' | 'Optimization' | 'Restart' | 'Configuration' | 'Monitoring';
export type ActionRiskLevel = 'Low' | 'Medium' | 'High';
export type AutomationStatus = 'Active' | 'Paused';

export interface ControlActionItem {
  id: string;
  action: string;
  type: ActionType;
  resource: string;
  source: 'AWS' | 'Edge' | 'Kubernetes' | 'Docker' | 'On-Premise';
  risk: ActionRiskLevel;
  requestedBy: string;
  createdTime: string;
  status: ActionStatus;
  reason: string;
  currentState: string;
  expectedState: string;
  relatedAlertId?: string;
  relatedRecommendationId?: string;
  relatedIncidentId?: string;
  impactPreview: string;
  executionLog?: string[];
}

export interface ScheduledAutomationItem {
  id: string;
  name: string;
  description: string;
  frequency: string;
  nextRun: string;
  lastRun: string;
  status: AutomationStatus;
  resourcesCovered: string[];
  executionType: string;
}

export interface RecentControlActivityItem {
  id: string;
  time: string;
  user: string;
  action: string;
  resource: string;
  result: 'Completed' | 'Executing' | 'Failed' | 'Rejected';
}

export interface ActionSummaryMetrics {
  pendingApproval: number;
  approved: number;
  executing: number;
  completed: number;
  failed: number;
  scheduled: number;
  actionsToday: number;
  successRate: string;
}

export interface ActionImpactMetrics {
  cpuReductionPercent: number;
  monthlyCostSavings: number;
  incidentReductionPercent: number;
  availabilityPercent: number;
}
