import { AlertItem, IncidentGroup } from '../types/alerts';

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'ALT-101',
    incidentId: 'INC-2026-085',
    severity: 'Critical',
    title: 'Edge temperature threshold exceeded',
    description: 'Rack enclosure ambient temperature and MCU core sensor exceeded safety operating envelope (>75°C), triggering active CPU thermal throttling.',
    resource: 'EDGE-003',
    resourceType: 'Edge Gateway',
    source: 'Edge',
    currentValue: '82°C',
    thresholdValue: '75°C',
    startedAt: '12m ago',
    duration: '12m',
    status: 'Active',
    hypothesis: 'Thermal dissipation fan failure on Vashi enclosure 2 combined with sustained high FPS video processing inference load.',
    recommendedAction: 'Engage active cooling fan circuit or dynamically throttle edge vision batch processing rate to 15 FPS.',
    relatedMetrics: {
      cpu: [
        { time: '10m', value: 88 },
        { time: '8m', value: 92 },
        { time: '6m', value: 90 },
        { time: '4m', value: 94 },
        { time: '2m', value: 91 }
      ],
      memory: [
        { time: '10m', value: 84 },
        { time: '8m', value: 86 },
        { time: '6m', value: 85 },
        { time: '4m', value: 88 },
        { time: '2m', value: 87 }
      ],
      temperature: [
        { time: '10m', value: 78 },
        { time: '8m', value: 80 },
        { time: '6m', value: 81 },
        { time: '4m', value: 83 },
        { time: '2m', value: 82 }
      ],
      network: [
        { time: '10m', value: 110 },
        { time: '8m', value: 125 },
        { time: '6m', value: 118 },
        { time: '4m', value: 128 },
        { time: '2m', value: 124 }
      ]
    },
    relatedAlertIds: ['ALT-107']
  },
  {
    id: 'ALT-102',
    incidentId: 'INC-2026-084',
    severity: 'High',
    title: 'High CPU utilization on production-api-01',
    description: 'EC2 c6i.xlarge instance running auth & API gateway exceeded 85% continuous CPU utilization threshold for >5 consecutive metric periods.',
    resource: 'production-api-01',
    resourceType: 'AWS EC2',
    source: 'AWS',
    currentValue: '92%',
    thresholdValue: '85%',
    startedAt: '18m ago',
    duration: '18m',
    status: 'Active',
    hypothesis: 'High CPU saturation appears correlated with unindexed authorization query scans under peak tenant traffic bursts.',
    recommendedAction: 'Scale target group to 3 active replicas or enable auto-scaling step scaling policy.',
    relatedMetrics: {
      cpu: [
        { time: '10m', value: 82 },
        { time: '8m', value: 87 },
        { time: '6m', value: 91 },
        { time: '4m', value: 93 },
        { time: '2m', value: 92 }
      ],
      memory: [
        { time: '10m', value: 58 },
        { time: '8m', value: 60 },
        { time: '6m', value: 61 },
        { time: '4m', value: 61 },
        { time: '2m', value: 61 }
      ],
      network: [
        { time: '10m', value: 180 },
        { time: '8m', value: 210 },
        { time: '6m', value: 225 },
        { time: '4m', value: 220 },
        { time: '2m', value: 214 }
      ]
    },
    relatedAlertIds: ['ALT-104', 'ALT-106']
  },
  {
    id: 'ALT-103',
    incidentId: 'INC-2026-086',
    severity: 'High',
    title: 'Production database memory usage high',
    description: 'PostgreSQL RDS primary instance memory buffer cache utilization sustained above 80%, increasing swap pressure.',
    resource: 'production-db',
    resourceType: 'AWS RDS',
    source: 'AWS',
    currentValue: '88%',
    thresholdValue: '80%',
    startedAt: '35m ago',
    duration: '35m',
    status: 'Acknowledged',
    acknowledgedBy: 'Kunal Pate',
    hypothesis: 'Buffer pool saturation caused by long-running aggregate analytical queries holding shared cache locks.',
    recommendedAction: 'Terminate idle backend connections or offload read-heavy reports to read-replica.',
    relatedMetrics: {
      cpu: [
        { time: '10m', value: 68 },
        { time: '8m', value: 71 },
        { time: '6m', value: 73 },
        { time: '4m', value: 72 },
        { time: '2m', value: 72 }
      ],
      memory: [
        { time: '10m', value: 84 },
        { time: '8m', value: 86 },
        { time: '6m', value: 87 },
        { time: '4m', value: 88 },
        { time: '2m', value: 88 }
      ],
      network: [
        { time: '10m', value: 160 },
        { time: '8m', value: 175 },
        { time: '6m', value: 182 },
        { time: '4m', value: 180 },
        { time: '2m', value: 180 }
      ]
    },
    relatedAlertIds: []
  },
  {
    id: 'ALT-104',
    incidentId: 'INC-2026-084',
    severity: 'High',
    title: 'Kubernetes ingress latency increased',
    description: 'Ingress NGINX controller response latency (P99) spiked past 200 ms threshold on API routing ingress path.',
    resource: 'k8s-ingress-gateway',
    resourceType: 'Kubernetes',
    source: 'Kubernetes',
    currentValue: '290 ms',
    thresholdValue: '150 ms',
    startedAt: '15m ago',
    duration: '15m',
    status: 'Active',
    hypothesis: 'Backpressure from upstream production-api-01 service causing ingress buffer queue buildup.',
    recommendedAction: 'Increase upstream timeout and scale ingress worker pods from 2 to 4.',
    relatedMetrics: {
      cpu: [
        { time: '10m', value: 32 },
        { time: '8m', value: 36 },
        { time: '6m', value: 38 },
        { time: '4m', value: 40 },
        { time: '2m', value: 38 }
      ],
      memory: [
        { time: '10m', value: 42 },
        { time: '8m', value: 44 },
        { time: '6m', value: 45 },
        { time: '4m', value: 46 },
        { time: '2m', value: 45 }
      ],
      network: [
        { time: '10m', value: 270 },
        { time: '8m', value: 305 },
        { time: '6m', value: 315 },
        { time: '4m', value: 312 },
        { time: '2m', value: 310 }
      ]
    },
    relatedAlertIds: ['ALT-102', 'ALT-106']
  },
  {
    id: 'ALT-105',
    severity: 'Critical',
    title: 'Docker worker host heartbeat timeout',
    description: 'Docker host daemon on On-Premise DC Host 2 missed 3 consecutive OpenTelemetry heartbeats.',
    resource: 'docker-worker-02',
    resourceType: 'Docker',
    source: 'Docker',
    currentValue: 'Heartbeat Lost',
    thresholdValue: 'Heartbeat <10s',
    startedAt: '6m ago',
    duration: '6m',
    status: 'Active',
    hypothesis: 'High IO pressure on Celery queue disk partition causing temporary process freeze.',
    recommendedAction: 'Restart OTel agent daemon or trigger automatic health recovery probe.',
    relatedMetrics: {
      cpu: [
        { time: '10m', value: 62 },
        { time: '8m', value: 65 },
        { time: '6m', value: 67 },
        { time: '4m', value: 68 },
        { time: '2m', value: 67 }
      ],
      memory: [
        { time: '10m', value: 56 },
        { time: '8m', value: 58 },
        { time: '6m', value: 59 },
        { time: '4m', value: 60 },
        { time: '2m', value: 59 }
      ],
      network: [
        { time: '10m', value: 88 },
        { time: '8m', value: 94 },
        { time: '6m', value: 96 },
        { time: '4m', value: 98 },
        { time: '2m', value: 96 }
      ]
    },
    relatedAlertIds: []
  },
  {
    id: 'ALT-106',
    incidentId: 'INC-2026-084',
    severity: 'High',
    title: 'API 5xx error rate increased',
    description: 'Global HTTP 5xx error rate exceeded 1.5% SLA limit, peaking at 4.85% for auth and transaction routes.',
    resource: 'production-api-01',
    resourceType: 'Application',
    source: 'Application',
    currentValue: '4.85%',
    thresholdValue: '1.5%',
    startedAt: '14m ago',
    duration: '14m',
    status: 'Active',
    hypothesis: 'Database connection pool timeout causing downstream API gateway 504 Gateway Timeout responses.',
    recommendedAction: 'Increase RDS max connections pool limit and enable Redis query caching layer.',
    relatedMetrics: {
      cpu: [
        { time: '10m', value: 80 },
        { time: '8m', value: 88 },
        { time: '6m', value: 92 },
        { time: '4m', value: 94 },
        { time: '2m', value: 92 }
      ],
      memory: [
        { time: '10m', value: 57 },
        { time: '8m', value: 60 },
        { time: '6m', value: 61 },
        { time: '4m', value: 62 },
        { time: '2m', value: 61 }
      ],
      network: [
        { time: '10m', value: 190 },
        { time: '8m', value: 215 },
        { time: '6m', value: 220 },
        { time: '4m', value: 218 },
        { time: '2m', value: 214 }
      ]
    },
    relatedAlertIds: ['ALT-102', 'ALT-104']
  },
  {
    id: 'ALT-107',
    incidentId: 'INC-2026-085',
    severity: 'Medium',
    title: 'Network packet loss detected on edge uplink',
    description: 'Cellular 4G/5G backup uplink for Vashi Gateway cluster experiencing 1.8% intermittent packet drops.',
    resource: 'EDGE-003',
    resourceType: 'Edge Gateway',
    source: 'Edge',
    currentValue: '1.8% drop',
    thresholdValue: '0.5%',
    startedAt: '24m ago',
    duration: '24m',
    status: 'Acknowledged',
    acknowledgedBy: 'Kunal Pate',
    hypothesis: 'Cellular tower carrier signal degradation during heavy cloud cover.',
    recommendedAction: 'Switch edge gateway primary route to fiber backup WAN link.',
    relatedMetrics: {
      cpu: [
        { time: '10m', value: 85 },
        { time: '8m', value: 89 },
        { time: '6m', value: 92 },
        { time: '4m', value: 94 },
        { time: '2m', value: 91 }
      ],
      memory: [
        { time: '10m', value: 80 },
        { time: '8m', value: 82 },
        { time: '6m', value: 85 },
        { time: '4m', value: 86 },
        { time: '2m', value: 87 }
      ],
      network: [
        { time: '10m', value: 112 },
        { time: '8m', value: 120 },
        { time: '6m', value: 115 },
        { time: '4m', value: 126 },
        { time: '2m', value: 124 }
      ]
    },
    relatedAlertIds: ['ALT-101']
  },
  {
    id: 'ALT-108',
    severity: 'Critical',
    title: 'AWS instance health check failed',
    description: 'EC2 system status check failed on us-east-1 subnet during automated EBS volume snapshot.',
    resource: 'production-api-02',
    resourceType: 'AWS EC2',
    source: 'AWS',
    currentValue: '1/2 Failed',
    thresholdValue: '2/2 Passed',
    startedAt: '1h 10m ago',
    duration: '18m',
    status: 'Resolved',
    resolvedAt: '52m ago',
    hypothesis: 'Underlying hypervisor maintenance event completed successfully; instance recovered.',
    recommendedAction: 'No further action needed. Health checks passing 2/2.',
    relatedMetrics: {
      cpu: [
        { time: '10m', value: 45 },
        { time: '8m', value: 48 },
        { time: '6m', value: 46 },
        { time: '4m', value: 49 },
        { time: '2m', value: 48 }
      ],
      memory: [
        { time: '10m', value: 55 },
        { time: '8m', value: 57 },
        { time: '6m', value: 58 },
        { time: '4m', value: 58 },
        { time: '2m', value: 58 }
      ],
      network: [
        { time: '10m', value: 175 },
        { time: '8m', value: 182 },
        { time: '6m', value: 186 },
        { time: '4m', value: 184 },
        { time: '2m', value: 185 }
      ]
    },
    relatedAlertIds: []
  }
];

export const INCIDENT_GROUPS: IncidentGroup[] = [
  {
    id: 'INC-2026-084',
    title: 'Production API Performance Degradation & Latency Spike',
    severity: 'High',
    affectedResources: ['production-api-01', 'k8s-ingress-gateway'],
    alertIds: ['ALT-102', 'ALT-104', 'ALT-106'],
    alertCount: 3,
    startedAt: '18m ago',
    duration: '18m',
    status: 'Investigating',
    hypothesis: 'High CPU utilization on production-api-01 appears correlated with increased API latency and 5xx errors.',
    mitigationStep: 'Scale API pods + enable read-replica query caching.'
  },
  {
    id: 'INC-2026-085',
    title: 'Vashi Edge Thermal Hazard & Telemetry Degrade',
    severity: 'Critical',
    affectedResources: ['EDGE-003'],
    alertIds: ['ALT-101', 'ALT-107'],
    alertCount: 2,
    startedAt: '24m ago',
    duration: '24m',
    status: 'Active',
    hypothesis: 'EDGE-003 ambient temperature rise (82°C) is driving CPU thermal throttling, causing frame drop in vision-ml-infer.',
    mitigationStep: 'Activate secondary cooling fans and route traffic to EDGE-004 backup node.'
  },
  {
    id: 'INC-2026-086',
    title: 'Database Memory Buffer Saturation',
    severity: 'High',
    affectedResources: ['production-db'],
    alertIds: ['ALT-103'],
    alertCount: 1,
    startedAt: '35m ago',
    duration: '35m',
    status: 'Mitigating',
    hypothesis: 'Long-running aggregate analytical queries holding shared memory cache lock.',
    mitigationStep: 'Offload analytical workloads to read-only replica cluster.'
  }
];
