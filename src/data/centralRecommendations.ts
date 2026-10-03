import { RecommendationItem } from '../types/recommendations';
import { AIRecommendation } from '../types/dashboard';

export const CENTRAL_RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: 'REC-2026-001',
    title: 'Rightsize production-api-01 compute instance',
    category: 'Cost',
    priority: 'High',
    status: 'New',
    confidence: 'High',
    affectedResource: 'production-api-01',
    resourceType: 'AWS EC2',
    source: 'AWS',
    currentState: 't3.large (2 vCPU, 8 GB RAM) running at ~$148/mo baseline',
    recommendedState: 'Downsize to c6i.large or rightsize reservation (projected $82/mo savings)',
    reason: 'Average compute utilization analysis over 30 days indicates memory usage rarely exceeds 3.5GB despite sporadic CPU verification bursts.',
    reasoningDetails: [
      'Memory utilization averages 42.5% over the past 30 days.',
      'Auth crypto verification workload can be offloaded to Redis session store cache.',
      'Transitioning to compute-optimized Graviton instance reduces cost while improving p99 latency.'
    ],
    supportingMetrics: [
      { name: 'Avg CPU Utilization', value: '48.2%', baseline: '45.0%', trend: 'stable' },
      { name: 'Avg Memory Utilization', value: '42.5%', baseline: '70.0%', trend: 'down' },
      { name: 'P99 Latency Impact', value: '-18 ms', baseline: '0 ms', trend: 'down' }
    ],
    expectedImpact: 'Save $82/month while preserving p99 latency SLAs with zero downtime via blue/green deployment.',
    estimatedMonthlySavings: 82,
    generatedTime: '2 hours ago',
    relatedAlerts: ['ALT-002: High CPU on production-api-01'],
    relatedResources: ['production-api-01', 'production-cache']
  },
  {
    id: 'REC-2026-002',
    title: 'Enable query caching for production-cache session store',
    category: 'Performance',
    priority: 'High',
    status: 'New',
    confidence: 'High',
    affectedResource: 'production-cache',
    resourceType: 'AWS ElastiCache',
    source: 'AWS',
    currentState: 'Redis session store operating with standard TTL and 52% memory capacity',
    recommendedState: 'Warm auth token validation hash table in production-cache to reduce DB queries',
    reason: 'Database query analysis identified 1,420 duplicate token lookup queries per minute that can be served directly from Redis memory in under 4ms.',
    reasoningDetails: [
      'Reduces production-db CPU load by an estimated 14%.',
      'Decreases production-api-01 auth verification time from 180ms to < 10ms.',
      'Zero additional infrastructure cost required; leverages existing 48% unused cache buffer.'
    ],
    supportingMetrics: [
      { name: 'Cache Hit Ratio', value: '78.4%', baseline: '95.0%', trend: 'up' },
      { name: 'Target Query Latency', value: '3.8 ms', baseline: '42.0 ms', trend: 'down' }
    ],
    expectedImpact: 'Improves auth throughput by 4.2x and relieves memory contention on production-db.',
    estimatedMonthlySavings: 0,
    generatedTime: '3 hours ago',
    relatedAlerts: ['ALT-002: High CPU on production-api-01', 'ALT-003: Production database memory usage high'],
    relatedResources: ['production-cache', 'production-db', 'production-api-01']
  },
  {
    id: 'REC-2026-003',
    title: 'Cooling fan curve & thermal mitigation on EDGE-003',
    category: 'Reliability',
    priority: 'Critical',
    status: 'New',
    confidence: 'High',
    affectedResource: 'EDGE-003',
    resourceType: 'Edge Gateway',
    source: 'Edge',
    currentState: 'Fan curve operating at 55% nominal RPM with core temperature at 82°C (Critical)',
    recommendedState: 'Execute ACT-2026-903: Force fan speed to 100% PWM and throttle BLE discovery beacon scans',
    reason: 'Critical thermal violation ALT-001 active. Hardware risk imminent if temperature stays above 80°C threshold during afternoon production shift.',
    reasoningDetails: [
      'Ambient industrial enclosure temperature reached 38°C in Thane facility.',
      'Sensor aggregation thread loop running at 100Hz can be throttled to 20Hz without loss of telemetry fidelity.',
      'Forcing 100% fan speed reduces temperature by an estimated 12°C within 8 minutes.'
    ],
    supportingMetrics: [
      { name: 'Core Temperature', value: '82.0°C', baseline: '68.0°C', trend: 'up' },
      { name: 'Fan PWM Speed', value: '55%', baseline: '100%', trend: 'down' }
    ],
    expectedImpact: 'Eliminates hardware throttling risk and returns EDGE-003 to Healthy operating status.',
    estimatedMonthlySavings: 0,
    generatedTime: '12m ago',
    relatedAlerts: ['ALT-001: EDGE-003 temperature threshold exceeded'],
    relatedResources: ['EDGE-003']
  },
  {
    id: 'REC-2026-004',
    title: 'Optimize production-db buffer pool and memory allocation',
    category: 'Performance',
    priority: 'High',
    status: 'New',
    confidence: 'High',
    affectedResource: 'production-db',
    resourceType: 'AWS RDS',
    source: 'AWS',
    currentState: 'Aurora PostgreSQL committed memory at 88.4% with buffer cache hit ratio at 84.1%',
    recommendedState: 'Adjust shared_buffers to 16GB and create partial index on telemetry_events(tenant_id, created_at)',
    reason: 'Sequential scans on 18M row table telemetry_events causing buffer eviction and elevated disk IOPS.',
    reasoningDetails: [
      'Eliminates 92% of full table scans on analytics queries.',
      'Restores buffer cache hit ratio above 99.0%.',
      'Prevents out-of-memory (OOM) killer invocation during nightly aggregation jobs.'
    ],
    supportingMetrics: [
      { name: 'Buffer Hit Ratio', value: '84.1%', baseline: '99.0%', trend: 'down' },
      { name: 'Committed Memory', value: '88.4%', baseline: '70.0%', trend: 'up' }
    ],
    expectedImpact: 'Reduces database query latency by 65% and stabilizes committed memory below 72%.',
    estimatedMonthlySavings: 0,
    generatedTime: '45m ago',
    relatedAlerts: ['ALT-003: Production database memory usage high'],
    relatedResources: ['production-db']
  },
  {
    id: 'REC-2026-005',
    title: 'Scale Kubernetes ingress gateway replicas from 2 to 4',
    category: 'Capacity',
    priority: 'Medium',
    status: 'New',
    confidence: 'Medium',
    affectedResource: 'k8s-ingress-gateway',
    resourceType: 'Kubernetes',
    source: 'Kubernetes',
    currentState: 'NGINX Ingress running with 2 pods experiencing socket buffer backlog (185ms queue delay)',
    recommendedState: 'Execute ACT-2026-905: Increase HPA minReplicas from 2 to 4 pods',
    reason: 'Morning peak client connection volume saturated the socket backlog on the current 2 ingress pods.',
    reasoningDetails: [
      'Ingress queue delay increased from 25ms baseline to 185ms.',
      '4 pods will distribute TCP connections across multiple node interfaces.',
      'Sufficient compute headroom exists in the EKS worker node group.'
    ],
    supportingMetrics: [
      { name: 'Ingress Queue Latency', value: '185 ms', baseline: '25 ms', trend: 'up' },
      { name: 'Active Ingress Pods', value: '2', baseline: '4', trend: 'down' }
    ],
    expectedImpact: 'Reduces ingress queue latency to < 30ms and eliminates connection timeout errors.',
    estimatedMonthlySavings: 0,
    generatedTime: '35m ago',
    relatedAlerts: ['ALT-004: Kubernetes ingress latency increased'],
    relatedResources: ['k8s-ingress-gateway', 'k8s-api-cluster']
  },
  {
    id: 'REC-2026-006',
    title: 'Enable S3 Intelligent-Tiering on telemetry archive bucket',
    category: 'Cost',
    priority: 'Medium',
    status: 'New',
    confidence: 'High',
    affectedResource: 'telemetry-archive-s3',
    resourceType: 'AWS S3',
    source: 'AWS',
    currentState: '48.5 TB telemetry archive in S3 Standard storage ($420/mo)',
    recommendedState: 'Apply lifecycle policy to transition objects older than 30 days to Intelligent-Tiering',
    reason: '68% of archive telemetry objects have not been accessed in over 45 days.',
    reasoningDetails: [
      '33 TB of cold telemetry data qualifies for Archive Instant Access tier.',
      'Zero retrieval penalty for unexpected historical audit queries.',
      'Calculated monthly cost reduction of $145/mo (34.5% bucket spend savings).'
    ],
    supportingMetrics: [
      { name: 'Inactive Object Ratio', value: '68.2%', baseline: '20.0%', trend: 'up' },
      { name: 'Current S3 Spend', value: '$420/mo', baseline: '$275/mo', trend: 'up' }
    ],
    expectedImpact: 'Immediate projected savings of $145/month ($1,740/year) with zero operational impact.',
    estimatedMonthlySavings: 145,
    generatedTime: '4 hours ago',
    relatedAlerts: [],
    relatedResources: ['telemetry-archive-s3']
  }
];

export function toAIRecommendation(rec: RecommendationItem): AIRecommendation {
  const agentSource: AIRecommendation['agentSource'] =
    rec.category === 'Cost' ? 'Cost Agent'
    : rec.category === 'Performance' ? 'API Performance Agent'
    : rec.category === 'Reliability' ? 'Health Agent'
    : 'Correlation Agent';

  const category: AIRecommendation['category'] =
    rec.category === 'Cost' ? 'COST'
    : rec.category === 'Performance' ? 'PERFORMANCE'
    : 'RELIABILITY';

  const risk: AIRecommendation['risk'] =
    rec.priority === 'Critical' ? 'High'
    : rec.priority === 'High' ? 'Medium'
    : 'Low';

  return {
    id: rec.id,
    title: rec.title,
    agentSource,
    confidence: rec.confidence === 'High' ? 94 : rec.confidence === 'Medium' ? 82 : 68,
    risk,
    impact: rec.expectedImpact,
    estimatedSavings: rec.estimatedMonthlySavings ? `$${rec.estimatedMonthlySavings}/mo` : undefined,
    category,
    description: rec.reason,
    suggestedActionPayload: {
      service: rec.affectedResource,
      action: rec.recommendedState,
      target: rec.affectedResource
    }
  };
}
