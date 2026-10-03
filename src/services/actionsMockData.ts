import {
  ControlActionItem,
  ScheduledAutomationItem,
  RecentControlActivityItem,
  ActionImpactMetrics
} from '../types/actions';

export const INITIAL_CONTROL_ACTIONS: ControlActionItem[] = [
  {
    id: 'ACT-2026-901',
    action: 'Restart production-api-01 container instance',
    type: 'Restart',
    resource: 'production-api-01',
    source: 'AWS',
    risk: 'High',
    requestedBy: 'AI Anomaly Watcher (INC-801)',
    createdTime: '10 mins ago',
    status: 'Pending',
    reason: 'Threadpool event loop saturation exceeding 91% CPU with 5xx error spikes.',
    currentState: 'Host CPU 91.4% / P99 Latency 245ms / 5xx Rate 4.2%',
    expectedState: 'Graceful worker process recycle, reducing thread wait queue to <10ms.',
    relatedAlertId: 'ALT-002: High CPU on production-api-01',
    relatedRecommendationId: 'REC-2026-003: Optimize production API workload',
    relatedIncidentId: 'INC-PROD-API-001: Production API Performance Degradation',
    impactPreview: 'Brief 3-second warm-up window; traffic temporarily absorbed by production-api-02.',
    executionLog: [
      'Waiting for operator authorization...',
      'Pre-execution health validation queued.'
    ]
  },
  {
    id: 'ACT-2026-902',
    action: 'Scale Kubernetes ingress gateway replicas from 2 to 4',
    type: 'Scaling',
    resource: 'k8s-ingress-gateway',
    source: 'Kubernetes',
    risk: 'Medium',
    requestedBy: 'Capacity Auto-Tuner',
    createdTime: '25 mins ago',
    status: 'Approved',
    reason: 'Pre-warm ingress buffer before peak 10:00 AM traffic burst.',
    currentState: '2 Pod Replicas / CPU 86.2% / Queue Latency 185ms',
    expectedState: '4 Pod Replicas / CPU <50% / Queue Latency <30ms',
    relatedAlertId: 'ALT-004: Kubernetes ingress latency increased',
    relatedRecommendationId: 'REC-2026-005: Adjust Kubernetes ingress capacity',
    relatedIncidentId: 'INC-2026-803: Kubernetes Ingress Latency',
    impactPreview: 'Zero downtime rolling pod scale-out across k8s-cluster-core-prod.',
    executionLog: [
      'Authorization granted by Admin.',
      'Ready for execution sequence.'
    ]
  },
  {
    id: 'ACT-2026-903',
    action: 'Optimize production-db buffer pool and memory allocation',
    type: 'Optimization',
    resource: 'production-db',
    source: 'AWS',
    risk: 'High',
    requestedBy: 'AI Recommendation Engine (REC-004)',
    createdTime: '45 mins ago',
    status: 'Pending',
    reason: 'Buffer cache hit ratio dipped to 84.1%, causing 3,450 IOPS spike on Aurora storage.',
    currentState: 'Memory 88.4% / Cache Hit Ratio 84.1%',
    expectedState: 'shared_buffers set to 4GB / Cache Hit Ratio >99%',
    relatedAlertId: 'ALT-003: Production database memory usage high',
    relatedRecommendationId: 'REC-2026-004: Optimize production-db memory allocation',
    relatedIncidentId: 'INC-2026-804: Database Performance Degradation',
    impactPreview: 'Online parameter group modification with zero database connection drops.',
    executionLog: [
      'Awaiting DBA security approval.'
    ]
  },
  {
    id: 'ACT-2026-904',
    action: 'Restart unhealthy docker-worker-02 and purge zombie tasks',
    type: 'Remediation',
    resource: 'docker-worker-02',
    source: 'Docker',
    risk: 'Low',
    requestedBy: 'Docker Health Daemon',
    createdTime: '1 hour ago',
    status: 'Approved',
    reason: 'Container process zombie leak causing staging queue stagnation.',
    currentState: 'Unresponsive daemon / 4.2% CPU / Stale PID 4410',
    expectedState: 'Clean daemon restart and worker rejoin.',
    relatedAlertId: 'ALT-007: Docker worker unavailable',
    relatedRecommendationId: 'REC-2026-008: Idle worker cleanup',
    relatedIncidentId: undefined,
    impactPreview: 'Staging environment task replay; zero production impact.',
    executionLog: [
      'Staging safety gates verified.',
      'Ready for execution.'
    ]
  },
  {
    id: 'ACT-2026-905',
    action: 'Reduce EDGE-003 workload and trigger failover to EDGE-001',
    type: 'Remediation',
    resource: 'EDGE-003',
    source: 'Edge',
    risk: 'High',
    requestedBy: 'Edge Thermal Watcher (INC-802)',
    createdTime: '1 hour ago',
    status: 'Pending',
    reason: 'Chassis temperature at 82°C (Warning: 75°C), risking SoC thermal clock shutdown.',
    currentState: 'Temp 82.0°C / Fan RPM 55% / 4 Active Camera Feeds',
    expectedState: 'Reroute 2 inference streams to EDGE-001; core temperature drops to <68°C.',
    relatedAlertId: 'ALT-001: EDGE-003 temperature threshold exceeded',
    relatedRecommendationId: 'REC-2026-002: Investigate EDGE-003 thermal condition',
    relatedIncidentId: 'INC-2026-802: EDGE-003 Thermal Alert',
    impactPreview: 'Immediate workload rebalance across local factory edge mesh.',
    executionLog: [
      'Thermal safety threshold alert active.'
    ]
  },
  {
    id: 'ACT-2026-906',
    action: 'Clear abnormal network route and reset MTU MSS clamping',
    type: 'Configuration',
    resource: 'onprem-vcenter-core',
    source: 'On-Premise',
    risk: 'Medium',
    requestedBy: 'Network Anomaly Correlator',
    createdTime: '2 hours ago',
    status: 'Executing',
    reason: 'IPsec tunnel packet drops (2.8%) caused by MTU mismatch.',
    currentState: 'Packet loss 2.80% / DF bit fragmentation drops',
    expectedState: 'MSS clamping set to 1380 bytes; 0.0% packet drop.',
    relatedAlertId: 'ALT-005: Network packet loss detected',
    relatedRecommendationId: undefined,
    relatedIncidentId: 'INC-2026-805: Network Packet Loss on Hybrid Gateway',
    impactPreview: 'Router table sync across on-prem edge firewall.',
    executionLog: [
      'Flushing invalid route cache...',
      'Applying iptables TCPMSS 1380 rule...',
      'Verifying ICMP ping latency.'
    ]
  },
  {
    id: 'ACT-2026-907',
    action: 'Apply EC2 rightsizing recommendation on production-api-01',
    type: 'Optimization',
    resource: 'production-api-01',
    source: 'AWS',
    risk: 'Low',
    requestedBy: 'FinOps Optimization Engine',
    createdTime: '3 hours ago',
    status: 'Completed',
    reason: 'Downsize overprovisioned instance from t3.large to t3.medium saving $82/month.',
    currentState: 'AWS EC2 t3.medium ($66/mo)',
    expectedState: 'AWS EC2 t3.medium ($66/mo)',
    relatedAlertId: undefined,
    relatedRecommendationId: 'REC-2026-001: Rightsize production-api-01',
    relatedIncidentId: undefined,
    impactPreview: 'Cost reduced by $82.40/month with zero SLO degradation.',
    executionLog: [
      'Preparing action...',
      'Validating resource...',
      'Executing instance resize in demo mode...',
      'Verifying telemetry telemetry...',
      'Completed successfully.'
    ]
  }
];

export const SCHEDULED_AUTOMATIONS_DATA: ScheduledAutomationItem[] = [
  {
    id: 'SCH-001',
    name: 'Daily infrastructure health check',
    description: 'Autonomous health check across all AWS, Edge, K8s, and On-Prem nodes.',
    frequency: 'Daily at 04:00 UTC',
    nextRun: 'Tomorrow, 04:00 UTC',
    lastRun: 'Today, 04:00 UTC (Passed)',
    status: 'Active',
    resourcesCovered: ['All 48 Hybrid Nodes', 'AWS us-east-1', 'Edge Gateways 001-004'],
    executionType: 'Synthetic Probe & Health Diagnostic'
  },
  {
    id: 'SCH-002',
    name: 'Weekly cost optimization analysis',
    description: 'Deep FinOps scan evaluating rightsizing, idle hosts, and cold storage transitions.',
    frequency: 'Weekly (Mondays at 08:00 UTC)',
    nextRun: 'Mon Oct 05, 08:00 UTC',
    lastRun: 'Mon Sep 28, 08:00 UTC (4 suggestions)',
    status: 'Active',
    resourcesCovered: ['AWS EC2', 'RDS Aurora', 'EBS Volumes', 'S3 Buckets'],
    executionType: 'FinOps Cost Analyzer'
  },
  {
    id: 'SCH-003',
    name: 'Hourly telemetry anomaly scan',
    description: 'Statistical z-score outlier evaluation across CPU, memory, temperature, and latency.',
    frequency: 'Hourly (:00)',
    nextRun: 'In 24 mins',
    lastRun: '36 mins ago (2 anomalies flagged)',
    status: 'Active',
    resourcesCovered: ['Real-Time Stream', 'Prometheus Metrics', 'Edge Sensors'],
    executionType: 'Statistical Anomaly Detector'
  },
  {
    id: 'SCH-004',
    name: 'Daily inactive resource detection',
    description: 'Scans for unattached EBS volumes, idle staging containers, and unused IP addresses.',
    frequency: 'Daily at 02:00 UTC',
    nextRun: 'Tomorrow, 02:00 UTC',
    lastRun: 'Yesterday, 02:00 UTC (1 idle node)',
    status: 'Paused',
    resourcesCovered: ['Staging Environments', 'Docker Hosts', 'EBS Storage'],
    executionType: 'Idle Infrastructure Scanner'
  }
];

export const RECENT_CONTROL_ACTIVITIES: RecentControlActivityItem[] = [
  {
    id: 'AUD-001',
    time: '10:42 UTC',
    user: 'Demo Operator (KP)',
    action: 'Approved rightsizing recommendation',
    resource: 'production-api-01',
    result: 'Completed'
  },
  {
    id: 'AUD-002',
    time: '09:18 UTC',
    user: 'AI Auto-Remediator',
    action: 'Triggered container restart',
    resource: 'docker-worker-01',
    result: 'Completed'
  },
  {
    id: 'AUD-003',
    time: '08:30 UTC',
    user: 'Demo Operator (KP)',
    action: 'Scaled ingress replica count to 4',
    resource: 'k8s-ingress-gateway',
    result: 'Completed'
  },
  {
    id: 'AUD-004',
    time: '07:15 UTC',
    user: 'Policy Engine',
    action: 'Rejected unverified public port bind',
    resource: 'EDGE-002',
    result: 'Rejected'
  }
];

export const ACTION_IMPACT_METRICS: ActionImpactMetrics = {
  cpuReductionPercent: 38,
  monthlyCostSavings: 343,
  incidentReductionPercent: 45,
  availabilityPercent: 99.98
};
