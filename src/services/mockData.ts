import {
  StatMetric,
  TelemetryPoint,
  InfrastructureResource,
  SystemAlert,
  AIRecommendation,
  SystemServiceStatus,
  ScopeFilter,
  TimeRange
} from '../types/dashboard';

export const INITIAL_STATS: StatMetric[] = [
  {
    id: 'health',
    title: 'Infrastructure Health',
    value: '98.2%',
    subtext: 'Healthy',
    trend: { direction: 'up', value: '+0.4%', isPositive: true },
    status: 'healthy',
    icon: 'Activity'
  },
  {
    id: 'aws',
    title: 'AWS Resources',
    value: '47',
    subtext: 'Resources Monitored',
    trend: { direction: 'neutral', value: '4 regions', isPositive: true },
    status: 'info',
    icon: 'Cloud'
  },
  {
    id: 'edge',
    title: 'Edge Devices',
    value: '18',
    subtext: 'Connected',
    trend: { direction: 'up', value: '100% online', isPositive: true },
    status: 'info',
    icon: 'Cpu'
  },
  {
    id: 'alerts',
    title: 'Active Alerts',
    value: '4',
    subtext: '2 Critical',
    trend: { direction: 'down', value: '-1 resolved', isPositive: true },
    status: 'critical',
    icon: 'AlertTriangle'
  },
  {
    id: 'recommendations',
    title: 'AI Recommendations',
    value: '7',
    subtext: '3 High Priority',
    trend: { direction: 'up', value: '+$340/mo potential', isPositive: true },
    status: 'warning',
    icon: 'Sparkles'
  },
  {
    id: 'cost',
    title: 'Monthly Cloud Cost',
    value: '$4,820',
    subtext: '↓ 8.4% estimated',
    trend: { direction: 'down', value: '-$442 vs last mo', isPositive: true },
    status: 'healthy',
    icon: 'DollarSign'
  },
  {
    id: 'cpu',
    title: 'CPU Utilization',
    value: '62%',
    subtext: 'Across Infrastructure',
    trend: { direction: 'up', value: '+3% peak', isPositive: false },
    status: 'warning',
    icon: 'Gauge'
  },
  {
    id: 'network',
    title: 'Network Health',
    value: '99.1%',
    subtext: 'Healthy',
    trend: { direction: 'up', value: '0.02% packet loss', isPositive: true },
    status: 'healthy',
    icon: 'Network'
  }
];

export const INFRASTRUCTURE_RESOURCES: InfrastructureResource[] = [
  {
    id: 'res-ec2-01',
    name: 'production-api-01',
    type: 'EC2',
    location: 'us-east-1',
    cpu: 54,
    memory: 61,
    disk: 42,
    status: 'Healthy',
    ipAddress: '10.0.14.88',
    uptime: '48d 14h',
    activeWorkloads: 'api-gateway, auth-service, proxy',
    provider: 'AWS',
    lastSeen: 'Just now',
    specs: {
      instanceType: 'c6i.xlarge',
      cores: 4,
      ramGb: 8,
      os: 'Amazon Linux 2023'
    }
  },
  {
    id: 'res-rds-01',
    name: 'production-db',
    type: 'RDS',
    location: 'us-east-1',
    cpu: 72,
    memory: 68,
    disk: 79,
    status: 'Warning',
    ipAddress: '10.0.32.10',
    uptime: '112d 6h',
    activeWorkloads: 'PostgreSQL 16.2 primary cluster (Read/Write)',
    provider: 'AWS',
    lastSeen: '30s ago',
    specs: {
      instanceType: 'db.r6g.2xlarge',
      cores: 8,
      ramGb: 64,
      os: 'Managed RDS engine'
    }
  },
  {
    id: 'res-edge-01',
    name: 'EDGE-001',
    type: 'Edge Device',
    location: 'Mumbai',
    cpu: 43,
    memory: 51,
    disk: 35,
    temperature: 58,
    powerWatts: 42,
    status: 'Healthy',
    ipAddress: '192.168.10.4',
    uptime: '19d 08h',
    activeWorkloads: 'sensor-aggregator, mqtt-broker, telemetry-agent',
    provider: 'Edge',
    lastSeen: 'Just now',
    specs: {
      instanceType: 'Industrial Gateway v2',
      cores: 4,
      ramGb: 4,
      os: 'Debian 12 RT-Kernel'
    }
  },
  {
    id: 'res-edge-03',
    name: 'EDGE-003',
    type: 'Edge Device',
    location: 'Mumbai',
    cpu: 94,
    memory: 82,
    disk: 88,
    temperature: 78,
    powerWatts: 96,
    status: 'Critical',
    ipAddress: '192.168.10.12',
    uptime: '4d 21h',
    activeWorkloads: 'vision-ml-infer, high-fps-stream, worker-daemon',
    provider: 'Edge',
    lastSeen: '10s ago',
    specs: {
      instanceType: 'NVIDIA Jetson Xavier NX',
      cores: 6,
      ramGb: 8,
      os: 'Ubuntu 22.04 LTS (JetPack 5.1)'
    }
  },
  {
    id: 'res-docker-02',
    name: 'docker-worker-02',
    type: 'Docker',
    location: 'On-Premise',
    cpu: 67,
    memory: 59,
    disk: 54,
    status: 'Healthy',
    ipAddress: '172.24.1.45',
    uptime: '31d 04h',
    activeWorkloads: 'celery-async-queue, redis-cache, batch-indexer',
    provider: 'On-Premise',
    lastSeen: 'Just now',
    specs: {
      instanceType: 'Dell PowerEdge R740',
      cores: 16,
      ramGb: 32,
      os: 'Docker Engine 25.0.3 on Rocky Linux 9'
    }
  },
  {
    id: 'res-k8s-01',
    name: 'k8s-ingress-gateway',
    type: 'Kubernetes',
    location: 'us-east-1',
    cpu: 38,
    memory: 45,
    disk: 28,
    status: 'Healthy',
    ipAddress: '10.0.12.9',
    uptime: '89d 11h',
    activeWorkloads: 'ingress-nginx-controller, cert-manager',
    provider: 'AWS',
    lastSeen: 'Just now',
    specs: {
      instanceType: 'EKS Managed NodeGroup (t3.xlarge)',
      cores: 4,
      ramGb: 16,
      os: 'Bottlerocket OS'
    }
  },
  {
    id: 'res-sw-01',
    name: 'switch-core-rack-02',
    type: 'Switch',
    location: 'On-Premise',
    cpu: 24,
    memory: 38,
    disk: 15,
    status: 'Healthy',
    ipAddress: '10.100.1.1',
    uptime: '240d 18h',
    activeWorkloads: 'VLAN 10/20/30 Routing, LACP Trunks, SNMP v3',
    provider: 'On-Premise',
    lastSeen: 'Just now',
    specs: {
      instanceType: 'Cisco Catalyst 9300 48-Port',
      cores: 4,
      ramGb: 8,
      os: 'Cisco IOS-XE 17.6'
    }
  }
];

export const ACTIVE_ALERTS: SystemAlert[] = [
  {
    id: 'ALT-1001',
    severity: 'CRITICAL',
    resource: 'EDGE-003',
    resourceType: 'Edge Device (Mumbai)',
    description: 'EDGE-003 CPU exceeded 90% (sustained 94% for >5m)',
    time: '2 mins ago',
    timestamp: '2026-10-01 22:49:15',
    impactScore: 92,
    rootCauseHypothesis: 'Vision inference container running unthrottled loop; thermal throttling engaged (+78°C).',
    recommendedAction: 'Apply container CPU limit or dynamically scale workload to secondary edge node.',
    status: 'Firing'
  },
  {
    id: 'ALT-1002',
    severity: 'WARNING',
    resource: 'production-db',
    resourceType: 'RDS PostgreSQL',
    description: 'Production DB memory usage increasing (trend +14%/hr)',
    time: '8 mins ago',
    timestamp: '2026-10-01 22:43:00',
    impactScore: 74,
    rootCauseHypothesis: 'Connection pool saturation and unindexed analytical query cache accumulation.',
    recommendedAction: 'Inspect pg_stat_activity queries and flush idle client connections.',
    status: 'Firing'
  },
  {
    id: 'ALT-1003',
    severity: 'WARNING',
    resource: 'production-api-01',
    resourceType: 'EC2 Cluster',
    description: 'API latency above baseline (p99 latency 380ms vs 120ms normal)',
    time: '14 mins ago',
    timestamp: '2026-10-01 22:37:20',
    impactScore: 68,
    rootCauseHypothesis: 'Downstream DB lock wait on payment callback webhook table.',
    recommendedAction: 'Review database slow query logs and enable trace span breakdown in OTel.',
    status: 'Firing'
  },
  {
    id: 'ALT-1004',
    severity: 'CRITICAL',
    resource: 'AWS Cost Budget',
    resourceType: 'CloudWatch / Billing',
    description: 'EC2 cost threshold exceeded (run-rate projecting +22% over monthly budget)',
    time: '29 mins ago',
    timestamp: '2026-10-01 22:22:00',
    impactScore: 88,
    rootCauseHypothesis: 'Unused GPU g4dn.xlarge instance running continuously in staging region.',
    recommendedAction: 'Execute automated instance stop action or apply night/weekend auto-shutdown schedule.',
    status: 'Firing'
  }
];

export const AI_RECOMMENDATIONS: AIRecommendation[] = [
  {
    id: 'REC-01',
    title: 'Scale EDGE-003 container',
    agentSource: 'Health Agent',
    confidence: 94,
    risk: 'Low',
    impact: 'Reduce CPU utilization from 94% to ~55%',
    category: 'RELIABILITY',
    description: 'Distribute computer vision batch frame pipeline across EDGE-001 and local worker to prevent thermal throttling and hardware degradation.',
    suggestedActionPayload: {
      service: 'docker_actuator',
      action: 'scale_container_replica',
      target: 'EDGE-003:vision-infer'
    }
  },
  {
    id: 'REC-02',
    title: 'Resize underutilized EC2 instance',
    agentSource: 'Cost Agent',
    confidence: 91,
    risk: 'Low',
    impact: 'Optimize memory allocation without throughput drop',
    estimatedSavings: '$128/month',
    category: 'COST',
    description: 'Instance i-0a81f3d82 (staging-api-test) has averaged 1.8% CPU over the past 14 days. Downsizing from t3.xlarge to t3.small eliminates waste.',
    suggestedActionPayload: {
      service: 'ec2',
      action: 'modify_instance_attribute',
      target: 'i-0a81f3d82'
    }
  },
  {
    id: 'REC-03',
    title: 'Investigate production API latency',
    agentSource: 'API Performance Agent',
    confidence: 87,
    risk: 'Medium',
    impact: 'Restore p99 latency SLA from 380ms to <140ms',
    category: 'PERFORMANCE',
    description: 'Trace analysis shows 71% of response latency occurs on query "SELECT * FROM audit_events ORDER BY id DESC" on production-db.',
    suggestedActionPayload: {
      service: 'rds_optimizer',
      action: 'analyze_query_execution_plan',
      target: 'production-db'
    }
  },
  {
    id: 'REC-04',
    title: 'Attach S3 Intelligent-Tiering to log archive',
    agentSource: 'Cost Agent',
    confidence: 96,
    risk: 'Low',
    impact: 'Reduce infrequent access storage billing',
    estimatedSavings: '$214/month',
    category: 'COST',
    description: 'Archive bucket "unifra-telemetry-archive-useast1" holds 14 TB with 0 read requests over 30 days. Tiering automatically transitions objects to Glacier Instant Retrieval.',
    suggestedActionPayload: {
      service: 's3',
      action: 'put_bucket_lifecycle_configuration',
      target: 'unifra-telemetry-archive-useast1'
    }
  },
  {
    id: 'REC-05',
    title: 'Prune dangling Docker volumes on On-Premise Host',
    agentSource: 'Health Agent',
    confidence: 98,
    risk: 'Low',
    impact: 'Reclaim 42 GB disk space on worker node',
    category: 'RELIABILITY',
    description: 'Host docker-worker-02 has 18 unreferenced anonymous volumes from completed build tasks.',
    suggestedActionPayload: {
      service: 'docker_actuator',
      action: 'volume_prune',
      target: 'docker-worker-02'
    }
  }
];

export const SYSTEM_STATUSES: SystemServiceStatus[] = [
  {
    name: 'Prometheus',
    status: 'Simulated / Connected',
    badgeColor: 'emerald',
    type: 'Time-Series DB :9090',
    latencyMs: 3
  },
  {
    name: 'Grafana',
    status: 'Simulated / Connected',
    badgeColor: 'emerald',
    type: 'Dashboard Engine :3001',
    latencyMs: 8
  },
  {
    name: 'AWS',
    status: 'Demo Data',
    badgeColor: 'cyan',
    type: 'CloudWatch & Cost Explorer',
    latencyMs: 14
  },
  {
    name: 'OpenTelemetry',
    status: 'Simulated',
    badgeColor: 'indigo',
    type: 'OTel Collector Contrib :4317',
    latencyMs: 1
  }
];

/**
 * Generates dynamic time-series telemetry data based on chosen Scope & TimeRange
 */
export function generateTelemetryData(scope: ScopeFilter, range: TimeRange): TelemetryPoint[] {
  let count = 12;
  let intervalMinutes = 1;

  if (range === '15m') {
    count = 15;
    intervalMinutes = 1;
  } else if (range === '1h') {
    count = 12;
    intervalMinutes = 5;
  } else if (range === '6h') {
    count = 18;
    intervalMinutes = 20;
  } else if (range === '24h') {
    count = 24;
    intervalMinutes = 60;
  }

  // Multiplier adjustments based on scope
  let cpuBase = 62;
  let memBase = 64;
  let netBaseIn = 140; // Mbps
  let netBaseOut = 95;
  let latencyBase = 124; // ms
  let errorBase = 0.8; // %

  if (scope === 'AWS') {
    cpuBase = 58;
    memBase = 66;
    netBaseIn = 280;
    netBaseOut = 210;
    latencyBase = 145;
    errorBase = 0.5;
  } else if (scope === 'Edge') {
    cpuBase = 74;
    memBase = 68;
    netBaseIn = 45;
    netBaseOut = 32;
    latencyBase = 85;
    errorBase = 1.4;
  } else if (scope === 'On-Premise') {
    cpuBase = 52;
    memBase = 56;
    netBaseIn = 180;
    netBaseOut = 120;
    latencyBase = 42;
    errorBase = 0.2;
  }

  const now = new Date();
  const points: TelemetryPoint[] = [];

  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * intervalMinutes * 60 * 1000);
    const hour = time.getHours().toString().padStart(2, '0');
    const min = time.getMinutes().toString().padStart(2, '0');
    const timeLabel = `${hour}:${min}`;

    // Realistic sinusoidal + pseudo-random noise fluctuation
    const noise = Math.sin(i * 0.7) * 6 + (Math.random() * 4 - 2);
    const cpu = Math.min(99, Math.max(15, Math.round(cpuBase + noise + (i === 1 ? 12 : 0))));
    const memory = Math.min(98, Math.max(25, Math.round(memBase + Math.cos(i * 0.5) * 3 + (Math.random() * 2))));
    const networkIn = Math.max(10, Math.round(netBaseIn + noise * 4));
    const networkOut = Math.max(8, Math.round(netBaseOut + noise * 2.5));
    const apiLatency = Math.max(20, Math.round(latencyBase + noise * 6 + (i === 2 ? 65 : 0)));
    const errorRate = Number(Math.max(0.05, Math.min(6.5, errorBase + (noise > 3 ? 0.9 : -0.2))).toFixed(2));

    points.push({
      timestamp: timeLabel,
      cpu,
      memory,
      networkIn,
      networkOut,
      apiLatency,
      errorRate
    });
  }

  return points;
}
