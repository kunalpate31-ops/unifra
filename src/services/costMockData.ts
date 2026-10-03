import {
  MonthlyCostTrend,
  CostCategoryBreakdown,
  ResourceCostItem,
  CostAnomalyItem,
  CostOptimizationOpportunity,
  CostEnvironmentItem
} from '../types/cost';

export const MONTHLY_COST_TREND_DATA: MonthlyCostTrend[] = [
  { month: 'May', actualCost: 4120, projectedCost: 4100, budget: 5000 },
  { month: 'Jun', actualCost: 4290, projectedCost: 4300, budget: 5000 },
  { month: 'Jul', actualCost: 4450, projectedCost: 4400, budget: 5000 },
  { month: 'Aug', actualCost: 4610, projectedCost: 4550, budget: 5000 },
  { month: 'Sep', actualCost: 4780, projectedCost: 4700, budget: 5200 },
  { month: 'Oct', actualCost: 4820, projectedCost: 5140, budget: 5200 }
];

export const COST_CATEGORY_BREAKDOWN_DATA: CostCategoryBreakdown[] = [
  { category: 'Compute', cost: 2450, percentage: 50.8, monthlyChange: 6.2 },
  { category: 'Database', cost: 1280, percentage: 26.6, monthlyChange: 12.4 },
  { category: 'Storage', cost: 640, percentage: 13.3, monthlyChange: -2.1 },
  { category: 'Network', cost: 450, percentage: 9.3, monthlyChange: 18.5 },
  { category: 'Kubernetes', cost: 380, percentage: 7.9, monthlyChange: 4.0 },
  { category: 'Other', cost: 120, percentage: 2.5, monthlyChange: 0.8 }
];

export const RESOURCE_COST_TABLE_DATA: ResourceCostItem[] = [
  {
    id: 'RC-001',
    resource: 'production-api-01',
    type: 'AWS EC2 (t3.large)',
    environment: 'Production',
    source: 'AWS',
    monthlyCost: 148,
    previousMonthCost: 125,
    changePercent: 18.4,
    utilization: '31.4% Avg CPU',
    optimizationPotential: 'Save $82/mo (Rightsizing)',
    status: 'Overprovisioned',
    recommendation: 'Downsize from t3.large to t3.medium',
    historicalTrend: [
      { day: 'Day 1', cost: 4.1 },
      { day: 'Day 5', cost: 4.3 },
      { day: 'Day 10', cost: 4.8 },
      { day: 'Day 15', cost: 5.1 },
      { day: 'Day 20', cost: 5.2 },
      { day: 'Day 25', cost: 4.9 },
      { day: 'Day 30', cost: 5.0 }
    ]
  },
  {
    id: 'RC-002',
    resource: 'production-api-02',
    type: 'AWS EC2 (t3.large)',
    environment: 'Production',
    source: 'AWS',
    monthlyCost: 142,
    previousMonthCost: 140,
    changePercent: 1.4,
    utilization: '48.1% Avg CPU',
    optimizationPotential: 'None (Well balanced)',
    status: 'Optimized',
    recommendation: 'Maintain current instance type',
    historicalTrend: [
      { day: 'Day 1', cost: 4.7 },
      { day: 'Day 5', cost: 4.7 },
      { day: 'Day 10', cost: 4.8 },
      { day: 'Day 15', cost: 4.7 },
      { day: 'Day 20', cost: 4.8 },
      { day: 'Day 25', cost: 4.7 },
      { day: 'Day 30', cost: 4.7 }
    ]
  },
  {
    id: 'RC-003',
    resource: 'production-db',
    type: 'AWS Aurora PostgreSQL (db.r6g.xlarge)',
    environment: 'Production',
    source: 'AWS',
    monthlyCost: 890,
    previousMonthCost: 795,
    changePercent: 11.9,
    utilization: '88.4% Mem / 64% CPU',
    optimizationPotential: 'Save $120/mo (Buffer Tuning)',
    status: 'Warning',
    recommendation: 'Optimize shared_buffers & index caching instead of vertical scaling',
    historicalTrend: [
      { day: 'Day 1', cost: 26.5 },
      { day: 'Day 5', cost: 27.2 },
      { day: 'Day 10', cost: 28.9 },
      { day: 'Day 15', cost: 30.1 },
      { day: 'Day 20', cost: 31.0 },
      { day: 'Day 25', cost: 29.8 },
      { day: 'Day 30', cost: 30.5 }
    ]
  },
  {
    id: 'RC-004',
    resource: 'production-cache',
    type: 'AWS ElastiCache Redis (cache.m6g.large)',
    environment: 'Production',
    source: 'AWS',
    monthlyCost: 184,
    previousMonthCost: 184,
    changePercent: 0.0,
    utilization: '42.0% Mem Hit Rate 99%',
    optimizationPotential: 'Save $35/mo (Reserved Node)',
    status: 'Optimized',
    recommendation: 'Purchase 1-Year All-Upfront Reserved Node',
    historicalTrend: [
      { day: 'Day 1', cost: 6.1 },
      { day: 'Day 5', cost: 6.1 },
      { day: 'Day 10', cost: 6.1 },
      { day: 'Day 15', cost: 6.1 },
      { day: 'Day 20', cost: 6.1 },
      { day: 'Day 25', cost: 6.1 },
      { day: 'Day 30', cost: 6.1 }
    ]
  },
  {
    id: 'RC-005',
    resource: 'k8s-ingress-gateway',
    type: 'EKS Managed Node (c6i.xlarge)',
    environment: 'Production',
    source: 'Kubernetes',
    monthlyCost: 240,
    previousMonthCost: 220,
    changePercent: 9.1,
    utilization: '86.2% Pod CPU',
    optimizationPotential: 'Save $40/mo (KEDA Autoscale)',
    status: 'Warning',
    recommendation: 'Configure scale-to-zero / KEDA off-peak scaling',
    historicalTrend: [
      { day: 'Day 1', cost: 7.3 },
      { day: 'Day 5', cost: 7.5 },
      { day: 'Day 10', cost: 8.1 },
      { day: 'Day 15', cost: 8.4 },
      { day: 'Day 20', cost: 8.6 },
      { day: 'Day 25', cost: 8.0 },
      { day: 'Day 30', cost: 8.2 }
    ]
  },
  {
    id: 'RC-006',
    resource: 'docker-worker-01',
    type: 'Docker Engine Host (c5.large)',
    environment: 'Production',
    source: 'Docker',
    monthlyCost: 88,
    previousMonthCost: 88,
    changePercent: 0.0,
    utilization: '64.0% Load',
    optimizationPotential: 'None (Active Ingestion)',
    status: 'Optimized',
    recommendation: 'Maintain configuration',
    historicalTrend: [
      { day: 'Day 1', cost: 2.9 },
      { day: 'Day 5', cost: 2.9 },
      { day: 'Day 10', cost: 2.9 },
      { day: 'Day 15', cost: 2.9 },
      { day: 'Day 20', cost: 2.9 },
      { day: 'Day 25', cost: 2.9 },
      { day: 'Day 30', cost: 2.9 }
    ]
  },
  {
    id: 'RC-007',
    resource: 'docker-worker-02',
    type: 'Docker Engine Host (c5.large)',
    environment: 'Staging',
    source: 'Docker',
    monthlyCost: 88,
    previousMonthCost: 88,
    changePercent: 0.0,
    utilization: '4.2% Load (Idle > 14 Days)',
    optimizationPotential: 'Save $45/mo (Decommission)',
    status: 'Idle',
    recommendation: 'Decommission idle staging worker or stop on schedule',
    historicalTrend: [
      { day: 'Day 1', cost: 2.9 },
      { day: 'Day 5', cost: 2.9 },
      { day: 'Day 10', cost: 2.9 },
      { day: 'Day 15', cost: 2.9 },
      { day: 'Day 20', cost: 2.9 },
      { day: 'Day 25', cost: 2.9 },
      { day: 'Day 30', cost: 2.9 }
    ]
  }
];

export const COST_ANOMALIES_DATA: CostAnomalyItem[] = [
  {
    id: 'ANO-001',
    title: 'Production API compute cost increased 18%',
    severity: 'Warning',
    resource: 'production-api-01',
    currentCost: '$148.00/mo',
    expectedCost: '$125.00/mo',
    difference: '+$23.00 (+18.4%)',
    detectedTime: '3 hours ago',
    status: 'Active',
    reason: 'Burst CPU utilization from regional mobile client polling triggering prolonged on-demand compute credits.'
  },
  {
    id: 'ANO-002',
    title: 'Database cost increased 12%',
    severity: 'Warning',
    resource: 'production-db',
    currentCost: '$890.00/mo',
    expectedCost: '$795.00/mo',
    difference: '+$95.00 (+11.9%)',
    detectedTime: '6 hours ago',
    status: 'Active',
    reason: 'Unindexed query sequential scans driving 3,450 IOPS spike on Aurora I/O storage layer.'
  },
  {
    id: 'ANO-003',
    title: 'Network transfer cost unusually high',
    severity: 'Critical',
    resource: 'us-east-1-alb-core',
    currentCost: '$450.00/mo',
    expectedCost: '$310.00/mo',
    difference: '+$140.00 (+45.2%)',
    detectedTime: '12 hours ago',
    status: 'Active',
    reason: 'Inter-AZ cross-zone load balancing data transfer charges without local subnet affinity.'
  },
  {
    id: 'ANO-004',
    title: 'Unused compute capacity detected on staging',
    severity: 'Normal',
    resource: 'docker-worker-02',
    currentCost: '$88.00/mo',
    expectedCost: '$0.00/mo',
    difference: '+$88.00 (100% Waste)',
    detectedTime: '1 day ago',
    status: 'Investigating',
    reason: 'Node has remained under 5% CPU utilization for 14 consecutive calendar days.'
  }
];

export const COST_OPTIMIZATION_OPPORTUNITIES: CostOptimizationOpportunity[] = [
  {
    id: 'OPT-001',
    title: 'Rightsize production-api-01',
    resource: 'production-api-01',
    currentConfig: 'AWS EC2 t3.large (2 vCPU, 8 GB RAM)',
    recommendedConfig: 'AWS EC2 t3.medium (2 vCPU, 4 GB RAM)',
    monthlySavings: 82,
    yearlySavings: 984,
    reason: 'Average CPU utilization remains below 35% during observed 30-day baseline period.',
    priority: 'High',
    status: 'New',
    category: 'Compute Rightsizing'
  },
  {
    id: 'OPT-002',
    title: 'Remove idle docker-worker-02',
    resource: 'docker-worker-02',
    currentConfig: 'Docker Host c5.large (Always Running)',
    recommendedConfig: 'Terminate instance or Auto-Stop after 19:00 UTC',
    monthlySavings: 45,
    yearlySavings: 540,
    reason: 'Staging container worker idle with under 5% CPU load for over 14 consecutive days.',
    priority: 'Medium',
    status: 'New',
    category: 'Idle Cleanup'
  },
  {
    id: 'OPT-003',
    title: 'Optimize production-db allocation',
    resource: 'production-db',
    currentConfig: 'Aurora PostgreSQL db.r6g.xlarge (Unindexed IOPS)',
    recommendedConfig: 'Add composite indexes & tune shared_buffers to eliminate IOPS cost',
    monthlySavings: 120,
    yearlySavings: 1440,
    reason: 'Buffer cache misses driving excessive Aurora I/O request charges.',
    priority: 'High',
    status: 'New',
    category: 'Database Optimization'
  },
  {
    id: 'OPT-004',
    title: 'Reduce unnecessary network transfer',
    resource: 'us-east-1-alb-core',
    currentConfig: 'Cross-AZ ALB Routing Enabled Globally',
    recommendedConfig: 'Enable Target Group Subnet Zonal Shift & Route53 Local Routing',
    monthlySavings: 96,
    yearlySavings: 1152,
    reason: 'Cross-Availability-Zone data transfer charges represent 38% of total networking bill.',
    priority: 'Medium',
    status: 'New',
    category: 'Network Transfer'
  }
];

export const COST_ENVIRONMENT_DATA: CostEnvironmentItem[] = [
  { environment: 'Production', monthlyCost: 3240, resourceCount: 28, percentage: 67.2 },
  { environment: 'Staging', monthlyCost: 680, resourceCount: 10, percentage: 14.1 },
  { environment: 'Development', monthlyCost: 420, resourceCount: 8, percentage: 8.7 },
  { environment: 'Edge', monthlyCost: 290, resourceCount: 6, percentage: 6.0 },
  { environment: 'On-Premise', monthlyCost: 190, resourceCount: 4, percentage: 4.0 }
];
