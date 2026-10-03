import { RecommendationItem, CostBreakdownItem } from '../types/recommendations';

export const INITIAL_RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: 'REC-2026-001',
    title: 'Rightsize production-api-01 EC2 instance',
    category: 'Cost',
    priority: 'High',
    status: 'New',
    confidence: 'High',
    affectedResource: 'production-api-01',
    resourceType: 'EC2 Instance',
    source: 'AWS',
    currentState: 'AWS EC2 t3.large (2 vCPU, 8 GB RAM)',
    recommendedState: 'AWS EC2 t3.medium (2 vCPU, 4 GB RAM)',
    reason: 'Average CPU utilization remains below 35% and peak memory under 2.8 GB during the observed 30-day baseline period.',
    reasoningDetails: [
      'P95 CPU load over 720 hours observed at 34.2%, with steady memory utilization of 32%.',
      'Instance is currently overprovisioned for non-burst standard worker workloads.',
      'Downsizing yields zero throughput latency degradation under synthetic benchmark validation.'
    ],
    supportingMetrics: [
      { name: 'Avg CPU Utilization', value: '31.4%', baseline: '< 35.0%', trend: 'stable' },
      { name: 'Peak Memory Footprint', value: '2.84 GB', baseline: '8.00 GB Allocated', trend: 'stable' },
      { name: 'P95 Network I/O', value: '14.2 MB/s', baseline: 'Up to 5 Gbps', trend: 'stable' }
    ],
    expectedImpact: 'Immediate $82.40 monthly infrastructure reduction with no SLO impact.',
    estimatedMonthlySavings: 82,
    generatedTime: '12 mins ago',
    relatedAlerts: ['ALT-002: High CPU utilization on production-api-01'],
    relatedResources: ['production-api-01', 'us-east-1-alb-core']
  },
  {
    id: 'REC-2026-002',
    title: 'Investigate EDGE-003 thermal condition and fan cooling',
    category: 'Reliability',
    priority: 'Critical',
    status: 'New',
    confidence: 'High',
    affectedResource: 'EDGE-003',
    resourceType: 'Industrial Edge Gateway',
    source: 'Edge',
    currentState: 'Thermal operating temp 82°C (Warning threshold: 75°C)',
    recommendedState: 'Inspect chassis thermal cooling fan & redistribute container workloads to EDGE-001',
    reason: 'Continuous thermal dissipation anomaly exceeding safe enclosure threshold (75°C), risking SoC thermal throttling.',
    reasoningDetails: [
      'SoC core temperature has risen from 68°C to 82°C over the last 4 hours.',
      'Edge fan RPM sensor telemetry indicates 45% lower air displacement velocity.',
      'Correlates with high video inferencing batch on NVIDIA Jetson runtime.'
    ],
    supportingMetrics: [
      { name: 'Core Temperature', value: '82.0°C', baseline: 'Threshold: 75.0°C', trend: 'up' },
      { name: 'Thermal Throttling Events', value: '14/hr', baseline: '0/hr', trend: 'up' },
      { name: 'Fan RPM Efficiency', value: '55.2%', baseline: '> 90.0%', trend: 'down' }
    ],
    expectedImpact: 'Prevents edge hardware failure, automated failover of local inference microservices to adjacent gateway.',
    generatedTime: '18 mins ago',
    relatedAlerts: ['ALT-001: EDGE-003 temperature threshold exceeded (82°C)'],
    relatedResources: ['EDGE-003', 'EDGE-001']
  },
  {
    id: 'REC-2026-003',
    title: 'Optimize production API workload and connection pooling',
    category: 'Performance',
    priority: 'High',
    status: 'New',
    confidence: 'High',
    affectedResource: 'production-api-01',
    resourceType: 'Containerized API Cluster',
    source: 'AWS',
    currentState: 'P99 Latency 245ms with 4.2% 5xx error spikes during burst traffic',
    recommendedState: 'Enable keep-alive connection pooling and tune Node.js libuv threadpool to 8',
    reason: 'High CPU utilization correlates directly with increased P99 latency and upstream HTTP 504 gateway timeouts.',
    reasoningDetails: [
      'Synchronous crypto hashing operations on the auth route block the Node event loop.',
      'Database client connection exhaustion creates cascading queue delays in ALB.'
    ],
    supportingMetrics: [
      { name: 'P99 API Latency', value: '245 ms', baseline: 'SLO: < 120 ms', trend: 'up' },
      { name: '5xx Error Rate', value: '4.20%', baseline: 'SLO: < 0.50%', trend: 'up' },
      { name: 'DB Connection Wait Queue', value: '42 reqs', baseline: '0 reqs', trend: 'up' }
    ],
    expectedImpact: 'Reduces P99 latency by ~58% (from 245ms to <105ms) and eliminates 5xx timeouts.',
    generatedTime: '24 mins ago',
    relatedAlerts: [
      'ALT-006: API 5xx error rate increased',
      'ALT-004: Kubernetes ingress latency increased'
    ],
    relatedResources: ['production-api-01', 'us-east-1-alb-core', 'k8s-ingress-gateway']
  },
  {
    id: 'REC-2026-004',
    title: 'Optimize production-db buffer pool and memory allocation',
    category: 'Performance',
    priority: 'Medium',
    status: 'Reviewed',
    confidence: 'High',
    affectedResource: 'production-db',
    resourceType: 'Aurora PostgreSQL Cluster',
    source: 'AWS',
    currentState: 'Memory utilization 88.4% with buffer cache hit ratio 84.1%',
    recommendedState: 'Adjust shared_buffers parameter to 4GB and enable pg_stat_statements index caching',
    reason: 'Frequent sequential disk reads on unindexed join queries causing buffer pool cache eviction.',
    reasoningDetails: [
      'Buffer cache hit ratio dipped from 98.6% to 84.1% during daily reporting cron.',
      'Query analyzer identified missing composite index on telemetry_events (timestamp, resource_id).'
    ],
    supportingMetrics: [
      { name: 'Buffer Cache Hit Ratio', value: '84.1%', baseline: '> 95.0%', trend: 'down' },
      { name: 'Committed Memory', value: '88.4%', baseline: '< 80.0%', trend: 'up' },
      { name: 'Read IOPS IO Bottleneck', value: '3,450 IOPS', baseline: '< 1,500 IOPS', trend: 'up' }
    ],
    expectedImpact: 'Restores cache hit ratio above 99% and drops query execution times by 40%.',
    estimatedMonthlySavings: 45,
    generatedTime: '45 mins ago',
    relatedAlerts: ['ALT-003: Production database memory usage high'],
    relatedResources: ['production-db', 'prod-aurora-cluster-writer']
  },
  {
    id: 'REC-2026-005',
    title: 'Adjust Kubernetes ingress capacity and HPA target threshold',
    category: 'Capacity',
    priority: 'Medium',
    status: 'New',
    confidence: 'Medium',
    affectedResource: 'k8s-ingress-gateway',
    resourceType: 'K8s Ingress Controller',
    source: 'Kubernetes',
    currentState: 'HPA CPU scale trigger set at 85% with minReplicas: 2',
    recommendedState: 'Lower HPA CPU trigger to 65% and increase minReplicas from 2 to 4',
    reason: 'Ingress controller pods experience sudden burst spikes, taking 90 seconds to autoscale new pods.',
    reasoningDetails: [
      'Traffic spikes from regional client polling saturate ingress buffer before KEDA initiates scale-out.',
      'Pre-warming 2 additional pods absorbs traffic bursts without queue buildup.'
    ],
    supportingMetrics: [
      { name: 'Pod CPU Scaling Delay', value: '92 sec', baseline: '< 20 sec', trend: 'up' },
      { name: 'Current Ingress Replicas', value: '2 pods', baseline: 'Target: 4 pods', trend: 'stable' },
      { name: 'Ingress Queue Latency', value: '185 ms', baseline: '< 30 ms', trend: 'up' }
    ],
    expectedImpact: 'Prevents ingress packet drops during 9:00 AM peak traffic bursts.',
    generatedTime: '1 hour ago',
    relatedAlerts: ['ALT-004: Kubernetes ingress latency increased'],
    relatedResources: ['k8s-ingress-gateway', 'k8s-cluster-core-prod']
  },
  {
    id: 'REC-2026-006',
    title: 'Enable S3 Intelligent-Tiering on telemetry-archive-s3',
    category: 'Cost',
    priority: 'Medium',
    status: 'New',
    confidence: 'High',
    affectedResource: 'telemetry-archive-s3',
    resourceType: 'S3 Object Storage',
    source: 'AWS',
    currentState: 'Standard S3 Storage (48.5 TB @ $0.023/GB = $1,115.50/mo)',
    recommendedState: 'Enable S3 Intelligent-Tiering lifecycle policy (transition after 30 days)',
    reason: 'Over 68% of stored telemetry logs are accessed fewer than once per quarter.',
    reasoningDetails: [
      '33 TB of cold log objects have been inactive for > 60 consecutive days.',
      'S3 Intelligent-Tiering automatically relocates cold data to infrequent access tiers ($0.0125/GB).'
    ],
    supportingMetrics: [
      { name: 'Cold Object Ratio', value: '68.2%', baseline: 'Expected Active: > 50%', trend: 'stable' },
      { name: 'Monthly Standard Cost', value: '$1,115.50', baseline: 'Optimized: $670.00', trend: 'stable' }
    ],
    expectedImpact: 'Estimated recurring monthly savings of $145.00 with zero retrieval latency impact.',
    estimatedMonthlySavings: 145,
    generatedTime: '2 hours ago',
    relatedAlerts: [],
    relatedResources: ['telemetry-archive-s3']
  },
  {
    id: 'REC-2026-007',
    title: 'Rotate edge-mesh mTLS certificates and restrict port 9090',
    category: 'Security',
    priority: 'High',
    status: 'New',
    confidence: 'High',
    affectedResource: 'EDGE-002',
    resourceType: 'Edge Gateway Gateway',
    source: 'Edge',
    currentState: 'mTLS certificate expires in 6 days; Prometheus scrape port 9090 exposed publicly',
    recommendedState: 'Automate mTLS cert renewal via Vault ACME provider & bind Prometheus scrape to 127.0.0.1/WireGuard',
    reason: 'Security scan detected imminent certificate expiration and unauthenticated telemetry endpoint on public interface.',
    reasoningDetails: [
      'Client cert issued on 2025-10-08 valid until 2026-10-08 (6 days remaining).',
      'Port 9090 TCP accessible outside the internal VPN tunnel mesh.'
    ],
    supportingMetrics: [
      { name: 'Cert Expiration Window', value: '6 days', baseline: 'Threshold: > 30 days', trend: 'down' },
      { name: 'Public Attack Surface', value: '1 Port Exposed', baseline: '0 Ports', trend: 'up' }
    ],
    expectedImpact: 'Eliminates edge-mesh authentication outage risk and seals telemetry perimeter.',
    generatedTime: '3 hours ago',
    relatedAlerts: [],
    relatedResources: ['EDGE-002', 'EDGE-001', 'EDGE-004']
  },
  {
    id: 'REC-2026-008',
    title: 'Migrate logs EBS volume from gp2 to gp3 for throughput efficiency',
    category: 'Cost',
    priority: 'Low',
    status: 'Applied',
    confidence: 'High',
    affectedResource: 'logs-vol-gp2',
    resourceType: 'EBS Volume',
    source: 'AWS',
    currentState: 'AWS EBS gp2 (1,000 GB, 3,000 baseline IOPS @ $100/mo)',
    recommendedState: 'AWS EBS gp3 (1,000 GB, 3,000 IOPS, 125 MB/s @ $80/mo)',
    reason: 'AWS gp3 offers 20% lower baseline storage cost per GB with independent IOPS and throughput scaling.',
    reasoningDetails: [
      'Volume is attached to central Elasticsearch ingest worker.',
      'Zero-downtime online EBS modification supported directly by AWS Elastic Block Store.'
    ],
    supportingMetrics: [
      { name: 'Current Cost', value: '$100.00/mo', baseline: 'gp3: $80.00/mo', trend: 'stable' },
      { name: 'Read/Write Latency', value: '4.2 ms', baseline: 'gp3: 3.8 ms', trend: 'stable' }
    ],
    expectedImpact: 'Immediate $20.00/month cost reduction and +15% disk burst throughput.',
    estimatedMonthlySavings: 20,
    generatedTime: '5 hours ago',
    relatedAlerts: [],
    relatedResources: ['logs-vol-gp2', 'docker-worker-01']
  }
];

export const COST_BREAKDOWN_DATA: CostBreakdownItem[] = [
  {
    category: 'Compute',
    currentCost: 3450,
    optimizedCost: 2810,
    savings: 640,
    percentSavings: 18.6
  },
  {
    category: 'Database',
    currentCost: 2180,
    optimizedCost: 1790,
    savings: 390,
    percentSavings: 17.9
  },
  {
    category: 'Storage',
    currentCost: 1120,
    optimizedCost: 890,
    savings: 230,
    percentSavings: 20.5
  },
  {
    category: 'Network',
    currentCost: 890,
    optimizedCost: 760,
    savings: 130,
    percentSavings: 14.6
  },
  {
    category: 'Edge',
    currentCost: 540,
    optimizedCost: 480,
    savings: 60,
    percentSavings: 11.1
  }
];
