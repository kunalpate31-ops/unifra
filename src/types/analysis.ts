export type IncidentSeverity = 'Critical' | 'High' | 'Medium' | 'Low';
export type IncidentStatus = 'Active' | 'Investigating' | 'Mitigated' | 'Resolved';
export type FactorImpact = 'High' | 'Medium' | 'Low';
export type FactorConfidence = 'High' | 'Medium' | 'Low';

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'metric' | 'alert' | 'incident' | 'system' | 'action';
  severity?: 'critical' | 'warning' | 'info';
  resource: string;
}

export interface ContributingFactor {
  id: string;
  factor: string;
  description: string;
  impact: FactorImpact;
  confidence: FactorConfidence;
  metricEvidence: string;
}

export interface RootCauseGraphNode {
  id: string;
  label: string;
  type: 'root_cause' | 'condition' | 'anomaly' | 'alert' | 'impact';
  details: string;
  resource?: string;
}

export interface AnalysisIncident {
  id: string;
  title: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  affectedResources: string[];
  relatedEventCount: number;
  startedTime: string;
  duration: string;
  confidenceScore: number;
  classification: string;
  primaryRootCause: string;
  rootCauseHypothesis: string;
  timeline: TimelineEvent[];
  contributingFactors: ContributingFactor[];
  graphNodes: RootCauseGraphNode[];
  recommendedActions: {
    id: string;
    title: string;
    description: string;
    priority: 'Immediate' | 'Recommended' | 'Follow-up';
    category: string;
  }[];
}

export interface AnalysisSummaryMetrics {
  activeIncidents: number;
  correlatedEvents: number;
  rootCausesIdentified: number;
  resourcesAffected: number;
  highConfidence: number;
  mediumConfidence: number;
  unresolvedIncidents: number;
  analysisRuns: number;
}
