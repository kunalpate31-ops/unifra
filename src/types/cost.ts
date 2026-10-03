export type CostAnomalySeverity = 'Normal' | 'Warning' | 'Critical';
export type OpportunityStatus = 'New' | 'Reviewed' | 'Applied' | 'Dismissed';
export type OpportunityPriority = 'Critical' | 'High' | 'Medium' | 'Low';

export interface MonthlyCostTrend {
  month: string;
  actualCost: number;
  projectedCost: number;
  budget: number;
}

export interface CostCategoryBreakdown {
  category: 'Compute' | 'Database' | 'Storage' | 'Network' | 'Kubernetes' | 'Other';
  cost: number;
  percentage: number;
  monthlyChange: number; // positive = increase, negative = decrease
}

export interface ResourceCostItem {
  id: string;
  resource: string;
  type: string;
  environment: 'Production' | 'Staging' | 'Development' | 'Edge' | 'On-Premise';
  source: 'AWS' | 'Edge' | 'Kubernetes' | 'Docker' | 'On-Premise';
  monthlyCost: number;
  previousMonthCost: number;
  changePercent: number;
  utilization: string;
  optimizationPotential: string;
  status: 'Optimized' | 'Warning' | 'Overprovisioned' | 'Idle';
  recommendation?: string;
  historicalTrend: { day: string; cost: number }[];
}

export interface CostAnomalyItem {
  id: string;
  title: string;
  severity: CostAnomalySeverity;
  resource: string;
  currentCost: string;
  expectedCost: string;
  difference: string;
  detectedTime: string;
  status: 'Active' | 'Investigating' | 'Resolved';
  reason: string;
}

export interface CostOptimizationOpportunity {
  id: string;
  title: string;
  resource: string;
  currentConfig: string;
  recommendedConfig: string;
  monthlySavings: number;
  yearlySavings: number;
  reason: string;
  priority: OpportunityPriority;
  status: OpportunityStatus;
  category: string;
}

export interface CostEnvironmentItem {
  environment: 'Production' | 'Staging' | 'Development' | 'Edge' | 'On-Premise';
  monthlyCost: number;
  resourceCount: number;
  percentage: number;
}

export interface CostSummaryMetrics {
  monthlyCloudCost: number;
  projectedMonthlyCost: number;
  potentialSavings: number;
  awsComputeCost: number;
  databaseCost: number;
  storageCost: number;
  networkCost: number;
  costAnomaliesCount: number;
}
