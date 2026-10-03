import { AlertItem, IncidentGroup } from '../types/alerts';
import { SystemAlert } from '../types/dashboard';
import { CENTRAL_ANALYSIS_INCIDENTS, toIncidentGroup } from './centralIncidents';

export const CENTRAL_ALERTS: AlertItem[] = [
  {
    id: 'ALT-001',
    incidentId: 'INC-2026-802',
    severity: 'Critical',
    title: 'EDGE-003 temperature threshold exceeded',
    description: 'Hardware thermal sensor on industrial edge core reading 82°C (exceeds max safe operating threshold 75°C). Risk of thermal degradation.',
    resource: 'EDGE-003',
    resourceType: 'Edge Gateway',
    source: 'Edge',
    currentValue: '82.0°C',
    thresholdValue: '75.0°C',
    startedAt: '12m ago',
    duration: '12m 45s',
    status: 'Active',
    hypothesis: 'High ambient enclosure temperature combined with sensor aggregation thread spike and 55% nominal cooling fan speed.',
    recommendedAction: 'Apply ACT-2026-903 to override cooling fan PWM curve to 100% and throttle non-critical background BLE discovery sync.',
    relatedAlertIds: [],
    relatedMetrics: {
      cpu: [
        { time: '10m', value: 88 },
        { time: '8m', value: 89 },
        { time: '6m', value: 92 },
        { time: '4m', value: 93 },
        { time: '2m', value: 91 }
      ],
      memory: [
        { time: '10m', value: 84 },
        { time: '8m', value: 85 },
        { time: '6m', value: 86 },
        { time: '4m', value: 87 },
        { time: '2m', value: 87 }
      ],
      temperature: [
        { time: '10m', value: 78 },
        { time: '8m', value: 80 },
        { time: '6m', value: 81 },
        { time: '4m', value: 82 },
        { time: '2m', value: 82 }
      ],
      network: [
        { time: '10m', value: 15 },
        { time: '8m', value: 14 },
        { time: '6m', value: 11 },
        { time: '4m', value: 12 },
        { time: '2m', value: 12 }
      ]
    }
  },
  {
    id: 'ALT-002',
    incidentId: 'INC-PROD-API-001',
    severity: 'Critical',
    title: 'High CPU on production-api-01',
    description: 'CPU utilization sustained above 78% for > 15m. P99 API latency degraded to 180ms during heavy auth token verification cycles.',
    resource: 'production-api-01',
    resourceType: 'AWS EC2',
    source: 'AWS',
    currentValue: '78.0%',
    thresholdValue: '75.0%',
    startedAt: '24m ago',
    duration: '24m 10s',
    status: 'Active',
    hypothesis: 'Bcrypt crypto hashing blocking the single-threaded Node.js event loop on t3.large instance.',
    recommendedAction: 'Execute ACT-2026-901 to scale worker threads or approve REC-2026-001 for compute instance rightsizing.',
    relatedAlertIds: ['ALT-004'],
    relatedMetrics: {
      cpu: [
        { time: '10m', value: 74 },
        { time: '8m', value: 76 },
        { time: '6m', value: 82 },
        { time: '4m', value: 80 },
        { time: '2m', value: 78 }
      ],
      memory: [
        { time: '10m', value: 62 },
        { time: '8m', value: 63 },
        { time: '6m', value: 65 },
        { time: '4m', value: 64 },
        { time: '2m', value: 64 }
      ],
      network: [
        { time: '10m', value: 180 },
        { time: '8m', value: 195 },
        { time: '6m', value: 220 },
        { time: '4m', value: 215 },
        { time: '2m', value: 214 }
      ]
    }
  },
  {
    id: 'ALT-003',
    incidentId: 'INC-2026-803',
    severity: 'High',
    title: 'Production database memory usage high',
    description: 'PostgreSQL buffer cache hit ratio dipped to 84.1% with committed memory reaching 88.4%. Large sequential scans detected on analytics partitions.',
    resource: 'production-db',
    resourceType: 'AWS RDS',
    source: 'AWS',
    currentValue: '88.4%',
    thresholdValue: '80.0%',
    startedAt: '45m ago',
    duration: '45m 00s',
    status: 'Active',
    hypothesis: 'Unindexed partition scan on historical telemetry tables exhausting shared_buffers cache.',
    recommendedAction: 'Execute REC-2026-004 to create partial indexes and warm shared buffer cache via production-cache.',
    relatedAlertIds: [],
    relatedMetrics: {
      cpu: [
        { time: '10m', value: 59 },
        { time: '8m', value: 61 },
        { time: '6m', value: 64 },
        { time: '4m', value: 63 },
        { time: '2m', value: 62 }
      ],
      memory: [
        { time: '10m', value: 86 },
        { time: '8m', value: 87 },
        { time: '6m', value: 88 },
        { time: '4m', value: 88 },
        { time: '2m', value: 88 }
      ],
      network: [
        { time: '10m', value: 290 },
        { time: '8m', value: 305 },
        { time: '6m', value: 320 },
        { time: '4m', value: 315 },
        { time: '2m', value: 310 }
      ]
    }
  },
  {
    id: 'ALT-004',
    incidentId: 'INC-PROD-API-001',
    severity: 'Medium',
    title: 'Kubernetes ingress latency increased',
    description: 'NGINX ingress queue latency breached 185ms during peak morning traffic. Upstream connection pool backlog observed.',
    resource: 'k8s-ingress-gateway',
    resourceType: 'Kubernetes',
    source: 'Kubernetes',
    currentValue: '185 ms',
    thresholdValue: '120 ms',
    startedAt: '35m ago',
    duration: '35m 12s',
    status: 'Active',
    hypothesis: 'Horizontal pod autoscaler minReplicas=2 insufficient for current ingress connection arrival rate.',
    recommendedAction: 'Execute ACT-2026-905 to scale ingress gateway pods to 4 replicas.',
    relatedAlertIds: ['ALT-002'],
    relatedMetrics: {
      cpu: [
        { time: '10m', value: 68 },
        { time: '8m', value: 71 },
        { time: '6m', value: 74 },
        { time: '4m', value: 73 },
        { time: '2m', value: 72 }
      ],
      memory: [
        { time: '10m', value: 65 },
        { time: '8m', value: 67 },
        { time: '6m', value: 69 },
        { time: '4m', value: 68 },
        { time: '2m', value: 68 }
      ],
      network: [
        { time: '10m', value: 310 },
        { time: '8m', value: 330 },
        { time: '6m', value: 355 },
        { time: '4m', value: 345 },
        { time: '2m', value: 340 }
      ]
    }
  },
  {
    id: 'ALT-005',
    incidentId: 'INC-2026-804',
    severity: 'Medium',
    title: 'Network switch packet loss detected',
    description: 'Core rack secondary switch switch-core-rack-02 reporting 1.8% packet drop rate across 10GbE fiber uplink trunk.',
    resource: 'switch-core-rack-02',
    resourceType: 'On-Premise Network',
    source: 'On-Premise',
    currentValue: '1.8%',
    thresholdValue: '0.5%',
    startedAt: '1h 10m ago',
    duration: '1h 10m',
    status: 'Active',
    hypothesis: 'Optical SFP+ transceiver CRC checksum errors on port Te1/0/48.',
    recommendedAction: 'Execute ACT-2026-906 to failover trunk to secondary redundant spine.',
    relatedAlertIds: [],
    relatedMetrics: {
      cpu: [
        { time: '10m', value: 61 },
        { time: '8m', value: 63 },
        { time: '6m', value: 66 },
        { time: '4m', value: 65 },
        { time: '2m', value: 64 }
      ],
      memory: [
        { time: '10m', value: 56 },
        { time: '8m', value: 57 },
        { time: '6m', value: 59 },
        { time: '4m', value: 58 },
        { time: '2m', value: 58 }
      ],
      network: [
        { time: '10m', value: 810 },
        { time: '8m', value: 830 },
        { time: '6m', value: 860 },
        { time: '4m', value: 850 },
        { time: '2m', value: 850 }
      ]
    }
  },
  {
    id: 'ALT-006',
    incidentId: 'INC-2026-806',
    severity: 'Low',
    title: 'Docker worker PID zombie task backlog',
    description: 'docker-worker-02 has 12 zombie process PIDs consuming thread descriptors without active container execution.',
    resource: 'docker-worker-02',
    resourceType: 'Docker',
    source: 'Docker',
    currentValue: '12 tasks',
    thresholdValue: '5 tasks',
    startedAt: '1h 45m ago',
    duration: '1h 45m',
    status: 'Active',
    hypothesis: 'Orphaned Python worker sub-process failed to catch SIGTERM signal on container exit.',
    recommendedAction: 'Execute ACT-2026-904 to clean PID table and rejoin queue.',
    relatedAlertIds: [],
    relatedMetrics: {
      cpu: [
        { time: '10m', value: 72 },
        { time: '8m', value: 75 },
        { time: '6m', value: 78 },
        { time: '4m', value: 77 },
        { time: '2m', value: 76 }
      ],
      memory: [
        { time: '10m', value: 69 },
        { time: '8m', value: 71 },
        { time: '6m', value: 73 },
        { time: '4m', value: 72 },
        { time: '2m', value: 72 }
      ],
      network: [
        { time: '10m', value: 30 },
        { time: '8m', value: 31 },
        { time: '6m', value: 34 },
        { time: '4m', value: 33 },
        { time: '2m', value: 32 }
      ]
    }
  }
];

export const CENTRAL_INCIDENTS: IncidentGroup[] = CENTRAL_ANALYSIS_INCIDENTS.map(toIncidentGroup);

export function toSystemAlert(alert: AlertItem): SystemAlert {
  return {
    id: alert.id,
    severity: alert.severity === 'Critical' ? 'CRITICAL' : alert.severity === 'High' ? 'WARNING' : 'INFO',
    resource: alert.resource,
    resourceType: alert.source,
    description: alert.description,
    time: alert.startedAt,
    timestamp: alert.startedAt,
    impactScore: alert.severity === 'Critical' ? 95 : alert.severity === 'High' ? 70 : 40,
    rootCauseHypothesis: alert.hypothesis,
    recommendedAction: alert.recommendedAction,
    status: alert.status === 'Active' ? 'Firing' : alert.status === 'Acknowledged' ? 'Acknowledged' : 'Resolved'
  };
}
