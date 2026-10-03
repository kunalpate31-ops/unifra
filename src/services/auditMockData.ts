import { AuditLogItem, SystemEngineHealthItem } from '../types/audit';

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'AUD-2026-1001',
    timestamp: '2026-10-02 10:42:15 UTC',
    actor: 'Demo Operator (KP)',
    actorType: 'User',
    activity: 'Control action approved: EC2 rightsizing',
    resource: 'production-api-01',
    source: 'AWS',
    severity: 'Info',
    status: 'Success',
    description: 'Operator Kunal Pate authorized ACT-2026-907 to downsize production-api-01 from t3.large to t3.medium.',
    ipAddress: '192.168.1.104',
    relatedActionId: 'ACT-2026-907: Apply EC2 rightsizing',
    relatedRecommendationId: 'REC-2026-001: Rightsize production-api-01',
    metadata: {
      'Authorized By': 'Kunal Pate',
      'Action ID': 'ACT-2026-907',
      'Expected Monthly Savings': '$82.00/mo'
    }
  },
  {
    id: 'AUD-2026-1002',
    timestamp: '2026-10-02 10:35:40 UTC',
    actor: 'UNIFRA FinOps Daemon',
    actorType: 'AI',
    activity: 'Cost anomaly detected: Network ALB Transfer',
    resource: 'us-east-1-alb-core',
    source: 'AWS',
    severity: 'Warning',
    status: 'Success',
    description: 'Statistical cost anomaly ANO-003 flagged: Cross-AZ data transfer surged 45.2% above rolling 30-day baseline.',
    relatedIncidentId: 'INC-2026-805: Network Jitter',
    metadata: {
      'Anomaly ID': 'ANO-003',
      'Cost Variance': '+$140.00/mo (+45.2%)',
      'Detection Engine': 'Z-Score Outlier Scanner'
    }
  },
  {
    id: 'AUD-2026-1003',
    timestamp: '2026-10-02 10:20:10 UTC',
    actor: 'AI Correlator Engine',
    actorType: 'AI',
    activity: 'Root Cause Analysis completed',
    resource: 'production-api-01',
    source: 'AWS',
    severity: 'Info',
    status: 'Success',
    description: 'Autonomous multi-tier causality analysis completed for INC-PROD-API-001 with 87% diagnostic confidence.',
    relatedIncidentId: 'INC-PROD-API-001: Production API Performance Degradation',
    relatedAlertId: 'ALT-002: High CPU on production-api-01',
    metadata: {
      'Incident ID': 'INC-PROD-API-001',
      'Confidence Score': '87%',
      'Causal Factors': 'Auth crypto hashing blocking libuv event loop'
    }
  },
  {
    id: 'AUD-2026-1004',
    timestamp: '2026-10-02 09:58:32 UTC',
    actor: 'Recommendation Engine',
    actorType: 'Recommendation',
    activity: 'AI Engine generated recommendation: S3 Tiering',
    resource: 'telemetry-archive-s3',
    source: 'AWS',
    severity: 'Info',
    status: 'Success',
    description: 'Generated REC-2026-006: Enable S3 Intelligent-Tiering lifecycle policy on 48.5 TB telemetry archive bucket.',
    relatedRecommendationId: 'REC-2026-006: S3 Intelligent-Tiering',
    metadata: {
      'Projected Savings': '$145.00/mo',
      'Object Inactive Ratio': '68.2%'
    }
  },
  {
    id: 'AUD-2026-1005',
    timestamp: '2026-10-02 09:44:18 UTC',
    actor: 'Edge Sensor Telemetry',
    actorType: 'Alert',
    activity: 'EDGE-003 temperature alert triggered',
    resource: 'EDGE-003',
    source: 'Edge',
    severity: 'Critical',
    status: 'Success',
    description: 'Critical threshold breach on hardware thermal core (82°C vs. 75°C max threshold). Alert ALT-001 generated.',
    relatedAlertId: 'ALT-001: EDGE-003 temperature threshold exceeded',
    relatedIncidentId: 'INC-2026-802: EDGE-003 Thermal Alert',
    metadata: {
      'Current Temp': '82.0°C',
      'Threshold': '75.0°C',
      'Fan RPM': '55% Nominal'
    }
  },
  {
    id: 'AUD-2026-1006',
    timestamp: '2026-10-02 09:30:00 UTC',
    actor: 'Demo Operator (KP)',
    actorType: 'User',
    activity: 'Demo Operator acknowledged alert ALT-001',
    resource: 'EDGE-003',
    source: 'Edge',
    severity: 'Info',
    status: 'Success',
    description: 'Alert ALT-001 acknowledged by Super Administrator. Investigation flagged for on-site thermal chassis inspection.',
    ipAddress: '192.168.1.104',
    relatedAlertId: 'ALT-001: EDGE-003 temperature threshold exceeded',
    metadata: {
      'Acknowledged By': 'Kunal Pate',
      'State': 'Acknowledged'
    }
  },
  {
    id: 'AUD-2026-1007',
    timestamp: '2026-10-02 09:15:45 UTC',
    actor: 'Kubernetes Telemetry Daemon',
    actorType: 'Infrastructure',
    activity: 'Kubernetes ingress analysis completed',
    resource: 'k8s-ingress-gateway',
    source: 'Kubernetes',
    severity: 'Warning',
    status: 'Success',
    description: 'Ingress NGINX socket buffer backlog analyzed: Latency reached 185ms during peak morning client polling.',
    relatedAlertId: 'ALT-004: Kubernetes ingress latency increased',
    relatedRecommendationId: 'REC-2026-005: Adjust Kubernetes ingress capacity',
    metadata: {
      'Ingress Queue': '185 ms',
      'Active Replicas': '2 Pods',
      'Scale Target': '4 Pods'
    }
  },
  {
    id: 'AUD-2026-1008',
    timestamp: '2026-10-02 08:50:22 UTC',
    actor: 'Automation Engine',
    actorType: 'Control Action',
    activity: 'Simulated remediation completed: Docker worker restart',
    resource: 'docker-worker-02',
    source: 'Docker',
    severity: 'Info',
    status: 'Success',
    description: 'Action ACT-2026-904 executed in demo mode: Zombie task PID purged and container worker cleanly rejoined queue.',
    relatedActionId: 'ACT-2026-904: Restart unhealthy docker worker',
    metadata: {
      'Execution Mode': 'Demo Simulation',
      'Task Cleared': 'PID 4410',
      'Health Status': 'Healthy'
    }
  },
  {
    id: 'AUD-2026-1009',
    timestamp: '2026-10-02 08:15:00 UTC',
    actor: 'Edge Discovery Daemon',
    actorType: 'System',
    activity: 'Discovery scan completed: 4 Edge Gateways',
    resource: 'edge-mesh-gateway',
    source: 'Edge',
    severity: 'Info',
    status: 'Success',
    description: 'mDNS and BLE beacon sweep identified 4 operational industrial gateways across regional factory subnet.',
    metadata: {
      'Devices Found': 'EDGE-001, EDGE-002, EDGE-003, EDGE-004',
      'Discovery Method': 'mDNS / SSDP Broadcast',
      'Mesh Sync': 'mTLS Active'
    }
  },
  {
    id: 'AUD-2026-1010',
    timestamp: '2026-10-02 07:42:15 UTC',
    actor: 'Database Watcher',
    actorType: 'Alert',
    activity: 'production-db memory threshold exceeded',
    resource: 'production-db',
    source: 'AWS',
    severity: 'Warning',
    status: 'Success',
    description: 'Aurora PostgreSQL committed memory reached 88.4% and buffer cache hit ratio dipped to 84.1%.',
    relatedAlertId: 'ALT-003: Production database memory usage high',
    relatedRecommendationId: 'REC-2026-004: Optimize production-db memory allocation',
    metadata: {
      'Memory': '88.4%',
      'Buffer Hit Ratio': '84.1%',
      'Disk IOPS': '3,450 IOPS'
    }
  },
  {
    id: 'AUD-2026-1011',
    timestamp: '2026-10-02 07:15:00 UTC',
    actor: 'Security Policy Guard',
    actorType: 'Control Action',
    activity: 'Unauthorized public port bind rejected',
    resource: 'EDGE-002',
    source: 'Edge',
    severity: 'Warning',
    status: 'Failed',
    description: 'Policy Guard blocked unverified binding on port 9090 on public interface. mTLS enforcement rule preserved.',
    relatedActionId: 'ACT-2026-899',
    metadata: {
      'Target Port': 'TCP 9090',
      'Reason': 'Zero Trust Network Policy Violation',
      'Rule ID': 'SEC-POL-04'
    }
  },
  {
    id: 'AUD-2026-1012',
    timestamp: '2026-10-02 06:30:10 UTC',
    actor: 'Scheduled Cron Daemon',
    actorType: 'System',
    activity: 'Daily infrastructure health check executed',
    resource: 'All 48 Hybrid Nodes',
    source: 'System',
    severity: 'Info',
    status: 'Success',
    description: 'Scheduled automation SCH-001 evaluated 48 cloud, container, and edge nodes. 47 healthy, 1 thermal warning.',
    metadata: {
      'Schedule ID': 'SCH-001',
      'Total Nodes': '48',
      'Pass Rate': '97.9%'
    }
  }
];

export const SYSTEM_HEALTH_ENGINES: SystemEngineHealthItem[] = [
  {
    name: 'Telemetry Ingestion Stream',
    category: 'Core Ingest',
    status: 'Operational',
    latency: '1.8 ms',
    eventsProcessed: '24,500/s',
    lastHeartbeat: 'Just now'
  },
  {
    name: 'Real-Time Monitoring Engine',
    category: 'Metrics Aggregator',
    status: 'Operational',
    latency: '4.2 ms',
    eventsProcessed: '1.4M points/hr',
    lastHeartbeat: 'Just now'
  },
  {
    name: 'Alert & Incident Correlator',
    category: 'Alert Dispatcher',
    status: 'Operational',
    latency: '12 ms',
    eventsProcessed: '48 alerts today',
    lastHeartbeat: 'Just now'
  },
  {
    name: 'AI Root Cause Analysis Engine',
    category: 'Diagnostic AI',
    status: 'Simulated',
    latency: '450 ms',
    eventsProcessed: '14 analyses run',
    lastHeartbeat: 'Just now'
  },
  {
    name: 'FinOps Recommendation Engine',
    category: 'Optimization AI',
    status: 'Simulated',
    latency: '320 ms',
    eventsProcessed: '8 recommendations active',
    lastHeartbeat: 'Just now'
  },
  {
    name: 'Control Action Automation Daemon',
    category: 'Workflow Orchestration',
    status: 'Simulated',
    latency: '85 ms',
    eventsProcessed: '18 workflows executed',
    lastHeartbeat: 'Just now'
  }
];
