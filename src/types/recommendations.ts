export type RecommendationCategory = 'Cost' | 'Performance' | 'Reliability' | 'Security' | 'Capacity';
export type RecommendationPriority = 'Critical' | 'High' | 'Medium' | 'Low';
export type RecommendationStatus = 'New' | 'Reviewed' | 'Applied' | 'Dismissed';
export type RecommendationConfidence = 'High' | 'Medium' | 'Low';

export interface RecommendationItem {
  id: string;
  title: string;
  category: RecommendationCategory;
  priority: RecommendationPriority;
  status: RecommendationStatus;
  confidence: RecommendationConfidence;
  affectedResource: string;
  resourceType: string;
  source: 'AWS' | 'Edge' | 'Kubernetes' | 'Docker' | 'On-Premise';
  currentState: string;
  recommendedState: string;
  reason: string;
  reasoningDetails: string[];
  supportingMetrics: {
    name: string;
    value: string;
    baseline: string;
    trend: 'up' | 'down' | 'stable';
  }[];
  expectedImpact: string;
  estimatedMonthlySavings?: number;
  generatedTime: string;
  relatedAlerts: string[];
  relatedResources: string[];
}

export interface RecommendationSummaryMetrics {
  totalCount: number;
  highPriorityCount: number;
  costCount: number;
  performanceCount: number;
  reliabilityCount: number;
  estimatedMonthlySavingsTotal: number;
  resourcesAnalyzedCount: number;
  recommendationsAppliedCount: number;
}

export interface CostBreakdownItem {
  category: 'Compute' | 'Database' | 'Storage' | 'Network' | 'Edge';
  currentCost: number;
  optimizedCost: number;
  savings: number;
  percentSavings: number;
}
