import {
  MonthlyCostTrend,
  CostCategoryBreakdown,
  ResourceCostItem,
  CostAnomalyItem,
  CostOptimizationOpportunity,
  CostEnvironmentItem,
  CostSummaryMetrics
} from '../types/cost';

export const CENTRAL_MONTHLY_COST_TREND: MonthlyCostTrend[] = [
  { month: 'May', actualCost: 5240, projectedCost: 5200, budget: 5500 },
  { month: 'Jun', actualCost: 5120, projectedCost: 5100, budget: 5500 },
  { month: 'Jul', actualCost: 4980, projectedCost: 5000, budget: 5500 },
  { month: 'Aug', actualCost: 4910, projectedCost: 4900, budget: 5200 },
  { month: 'Sep', actualCost: 4850, projectedCost: 4800, budget: 5200 },
  { month: 'Oct (Est)', actualCost: 4820, projectedCost: 4100, budget: 5200 }
];

export const CENTRAL_COST_CATEGORIES: CostCategoryBreakdown[] = [
  { category: 'Compute', cost: 2180, percentage: 45.2, monthlyChange: -3.4 },
  { category: 'Database', cost: 1140, percentage: 23.6, monthlyChange: 1.2 },
  { category: 'Storage', cost: 680, percentage: 14.1, monthlyChange: -8.5 },
  { category: 'Kubernetes', cost: 520, percentage: 10.8, monthlyChange: 2.1 },
  { category: 'Network', cost: 300, percentage: 6.3, monthlyChange: 14.5 }
];

export const CENTRAL_RESOURCE_COSTS: ResourceCostItem[] = [
  {
    id: 'cost-res-01',
    resource: 'production-api-01',
    type: 'AWS EC2 (t3.large)',
    environment: 'Production',
    source: 'AWS',
    monthlyCost: 280,
    previousMonthCost: 280,
    changePercent: 0.0,
    utilization: '48% Avg CPU / 42% RAM',
    optimizationPotential: 'Downsize to c6i.large ($82/mo savings)',
    status: 'Overprovisioned',
    recommendation: 'REC-2026-001: Rightsize instance to t3.medium or c6i.large',
    historicalTrend: [
      { day: 'Day 1', cost: 9.33 },
      { day: 'Day 5', cost: 9.33 },
      { day: 'Day 10', cost: 9.33 },
      { day: 'Day 15', cost: 9.33 },
      { day: 'Day 20', cost: 9.33 },
      { day: 'Day 25', cost: 9.33 },
      { day: 'Day 30', cost: 9.33 }
    ]
  },
  {
    id: 'cost-res-02',
    resource: 'production-api-02',
    type: 'AWS EC2 (t3.large)',
    environment: 'Production',
    source: 'AWS',
    monthlyCost: 280,
    previousMonthCost: 280,
    changePercent: 0.0,
    utilization: '52% Avg CPU / 48% RAM',
    optimizationPotential: 'Optimal for active redundancy',
    status: 'Optimized',
    historicalTrend: [
      { day: 'Day 1', cost: 9.33 },
      { day: 'Day 5', cost: 9.33 },
      { day: 'Day 10', cost: 9.33 },
      { day: 'Day 15', cost: 9.33 },
      { day: 'Day 20', cost: 9.33 },
      { day: 'Day 25', cost: 9.33 },
      { day: 'Day 30', cost: 9.33 }
    ]
  },
  {
    id: 'cost-res-03',
    resource: 'production-db',
    type: 'AWS RDS Aurora PostgreSQL',
    environment: 'Production',
    source: 'AWS',
    monthlyCost: 340,
    previousMonthCost: 335,
    changePercent: 1.5,
    utilization: '62% CPU / 88% RAM',
    optimizationPotential: 'Add query caching in production-cache',
    status: 'Warning',
    recommendation: 'REC-2026-004: Buffer cache optimization and query tuning',
    historicalTrend: [
      { day: 'Day 1', cost: 11.16 },
      { day: 'Day 5', cost: 11.20 },
      { day: 'Day 10', cost: 11.25 },
      { day: 'Day 15', cost: 11.30 },
      { day: 'Day 20', cost: 11.32 },
      { day: 'Day 25', cost: 11.35 },
      { day: 'Day 30', cost: 11.33 }
    ]
  },
  {
    id: 'cost-res-04',
    resource: 'production-cache',
    type: 'AWS ElastiCache Redis',
    environment: 'Production',
    source: 'AWS',
    monthlyCost: 110,
    previousMonthCost: 110,
    changePercent: 0.0,
    utilization: '28% CPU / 52% RAM',
    optimizationPotential: 'High ROI cache offloader',
    status: 'Optimized',
    historicalTrend: [
      { day: 'Day 1', cost: 3.66 },
      { day: 'Day 5', cost: 3.66 },
      { day: 'Day 10', cost: 3.66 },
      { day: 'Day 15', cost: 3.66 },
      { day: 'Day 20', cost: 3.66 },
      { day: 'Day 25', cost: 3.66 },
      { day: 'Day 30', cost: 3.66 }
    ]
  },
  {
    id: 'cost-res-05',
    resource: 'k8s-api-cluster',
    type: 'EKS Managed Node Pool',
    environment: 'Production',
    source: 'Kubernetes',
    monthlyCost: 480,
    previousMonthCost: 470,
    changePercent: 2.1,
    utilization: '58% CPU / 62% RAM across 6 nodes',
    optimizationPotential: 'Convert 2 on-demand nodes to Spot ($90/mo savings)',
    status: 'Overprovisioned',
    historicalTrend: [
      { day: 'Day 1', cost: 15.66 },
      { day: 'Day 5', cost: 15.80 },
      { day: 'Day 10', cost: 16.00 },
      { day: 'Day 15', cost: 16.00 },
      { day: 'Day 20', cost: 16.00 },
      { day: 'Day 25', cost: 16.00 },
      { day: 'Day 30', cost: 16.00 }
    ]
  },
  {
    id: 'cost-res-06',
    resource: 'k8s-ingress-gateway',
    type: 'NGINX Ingress Controller',
    environment: 'Production',
    source: 'Kubernetes',
    monthlyCost: 180,
    previousMonthCost: 180,
    changePercent: 0.0,
    utilization: '72% CPU / 68% RAM',
    optimizationPotential: 'Scale to 4 pods for load distribution',
    status: 'Warning',
    historicalTrend: [
      { day: 'Day 1', cost: 6.00 },
      { day: 'Day 5', cost: 6.00 },
      { day: 'Day 10', cost: 6.00 },
      { day: 'Day 15', cost: 6.00 },
      { day: 'Day 20', cost: 6.00 },
      { day: 'Day 25', cost: 6.00 },
      { day: 'Day 30', cost: 6.00 }
    ]
  },
  {
    id: 'cost-res-07',
    resource: 'telemetry-archive-s3',
    type: 'AWS S3 Bucket (48.5 TB)',
    environment: 'Production',
    source: 'AWS',
    monthlyCost: 420,
    previousMonthCost: 440,
    changePercent: -4.5,
    utilization: '68% Inactive cold objects (>45d)',
    optimizationPotential: 'Enable S3 Intelligent-Tiering ($145/mo savings)',
    status: 'Overprovisioned',
    recommendation: 'REC-2026-006: Enable Intelligent-Tiering lifecycle policy',
    historicalTrend: [
      { day: 'Day 1', cost: 14.66 },
      { day: 'Day 5', cost: 14.50 },
      { day: 'Day 10', cost: 14.30 },
      { day: 'Day 15', cost: 14.10 },
      { day: 'Day 20', cost: 14.00 },
      { day: 'Day 25', cost: 14.00 },
      { day: 'Day 30', cost: 14.00 }
    ]
  },
  {
    id: 'cost-res-08',
    resource: 'us-east-1-alb-core',
    type: 'AWS Application Load Balancer',
    environment: 'Production',
    source: 'AWS',
    monthlyCost: 160,
    previousMonthCost: 110,
    changePercent: 45.4,
    utilization: '1.4M LCU requests/day',
    optimizationPotential: 'Cross-AZ traffic anomaly detected (+$140/mo)',
    status: 'Warning',
    historicalTrend: [
      { day: 'Day 1', cost: 3.66 },
      { day: 'Day 5', cost: 3.80 },
      { day: 'Day 10', cost: 4.20 },
      { day: 'Day 15', cost: 5.10 },
      { day: 'Day 20', cost: 5.80 },
      { day: 'Day 25', cost: 5.33 },
      { day: 'Day 30', cost: 5.33 }
    ]
  }
];

export const CENTRAL_COST_ANOMALIES: CostAnomalyItem[] = [
  {
    id: 'ANO-001',
    title: 'Cross-AZ ALB Data Transfer Surge',
    severity: 'Critical',
    resource: 'us-east-1-alb-core',
    currentCost: '$160.00/mo',
    expectedCost: '$110.00/mo',
    difference: '+$50.00 (+45.4%)',
    detectedTime: '1 hour ago',
    status: 'Active',
    reason: 'Unbalanced cross-AZ routing caused inter-zone transfer traffic surge between us-east-1a and us-east-1b.'
  },
  {
    id: 'ANO-002',
    title: 'Aurora Database IOPS Spike',
    severity: 'Warning',
    resource: 'production-db',
    currentCost: '$340.00/mo',
    expectedCost: '$310.00/mo',
    difference: '+$30.00 (+9.6%)',
    detectedTime: '3 hours ago',
    status: 'Investigating',
    reason: 'Full table sequential scans on telemetry partitions triggered unexpected I/O operations.'
  },
  {
    id: 'ANO-003',
    title: 'S3 Standard Cold Object Storage Waste',
    severity: 'Warning',
    resource: 'telemetry-archive-s3',
    currentCost: '$420.00/mo',
    expectedCost: '$275.00/mo',
    difference: '+$145.00 (+52.7%)',
    detectedTime: '1 day ago',
    status: 'Active',
    reason: '33 TB of inactive telemetry data remaining in expensive S3 Standard storage tier without lifecycle rule.'
  }
];

export const CENTRAL_COST_OPPORTUNITIES: CostOptimizationOpportunity[] = [
  {
    id: 'OPP-001',
    title: 'Rightsize production-api-01 from t3.large to c6i.large',
    resource: 'production-api-01',
    currentConfig: 'AWS t3.large (2 vCPU, 8 GB RAM) — $148/mo',
    recommendedConfig: 'AWS c6i.large (2 vCPU, 4 GB RAM) — $66/mo',
    monthlySavings: 82,
    yearlySavings: 984,
    reason: 'Memory utilization never exceeds 3.5GB while compute workload is CPU bound.',
    priority: 'High',
    status: 'New',
    category: 'Compute Rightsizing'
  },
  {
    id: 'OPP-002',
    title: 'Enable S3 Intelligent-Tiering on Telemetry Bucket',
    resource: 'telemetry-archive-s3',
    currentConfig: 'S3 Standard — 48.5 TB @ $420/mo',
    recommendedConfig: 'S3 Intelligent-Tiering with 30-day lifecycle rule — $275/mo',
    monthlySavings: 145,
    yearlySavings: 1740,
    reason: '68% of archive files have zero read requests for over 45 days.',
    priority: 'High',
    status: 'New',
    category: 'Storage Tiering'
  },
  {
    id: 'OPP-003',
    title: 'Convert 2 EKS Worker Nodes to Spot Instances',
    resource: 'k8s-api-cluster',
    currentConfig: '6x m6i.xlarge On-Demand nodes — $480/mo',
    recommendedConfig: '4x On-Demand + 2x Spot Instances — $390/mo',
    monthlySavings: 90,
    yearlySavings: 1080,
    reason: 'Stateless worker pods can withstand spot interruption with zero user impact.',
    priority: 'Medium',
    status: 'New',
    category: 'Spot Optimization'
  },
  {
    id: 'OPP-004',
    title: 'Purge Orphaned EBS Volume Snapshots',
    resource: 'AWS us-east-1 EBS Storage',
    currentConfig: '14 unattached EBS volumes and 42 stale snapshots — $75/mo',
    recommendedConfig: 'Delete unattached volumes and retain only 7-day snapshot window — $22/mo',
    monthlySavings: 53,
    yearlySavings: 636,
    reason: 'Volumes from decommissioned staging test runs were left unattached.',
    priority: 'Low',
    status: 'New',
    category: 'Orphaned Cleanup'
  }
];

export const CENTRAL_COST_ENVIRONMENTS: CostEnvironmentItem[] = [
  { environment: 'Production', monthlyCost: 3480, resourceCount: 8, percentage: 72.2 },
  { environment: 'Staging', monthlyCost: 890, resourceCount: 3, percentage: 18.5 },
  { environment: 'Development', monthlyCost: 450, resourceCount: 2, percentage: 9.3 },
  { environment: 'Edge', monthlyCost: 0, resourceCount: 4, percentage: 0.0 },
  { environment: 'On-Premise', monthlyCost: 0, resourceCount: 4, percentage: 0.0 }
];

export const CENTRAL_COST_SUMMARY_METRICS: CostSummaryMetrics = {
  monthlyCloudCost: 4820,
  projectedMonthlyCost: 4100,
  potentialSavings: 720,
  awsComputeCost: 2180,
  databaseCost: 1140,
  storageCost: 680,
  networkCost: 300,
  costAnomaliesCount: 3
};
