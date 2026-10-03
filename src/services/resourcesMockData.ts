import {
  InventoryResource,
  ResourceSummaryCardData,
  CostBreakdownItem
} from '../types/resources';

export const INVENTORY_RESOURCES: InventoryResource[] = [
  {
    id: 'res-01',
    name: 'production-api-01',
    type: 'AWS EC2',
    category: 'AWS',
    environment: 'Production',
    location: 'AWS Mumbai',
    cpu: 54,
    memory: 61,
    disk: 42,
    network: '214 Mbps',
    apiLatency: '129 ms',
    errorRate: '0.12%',
    status: 'Healthy',
    monthlyCost: 280,
    costFormatted: '$280/mo',
    uptime: '48d 14h',
    lastSeen: 'Just now',
    ipAddress: '10.0.14.88',
    workload: 'api-gateway, auth-service, proxy',
    specs: {
      cores: 4,
      ramGb: 8,
      storageGb: 100,
      osOrEngine: 'Amazon Linux 2023 (c6i.xlarge)'
    },
    recentTelemetry: [
      { time: '10m', cpu: 52, mem: 60 },
      { time: '8m', cpu: 55, mem: 61 },
      { time: '6m', cpu: 53, mem: 61 },
      { time: '4m', cpu: 56, mem: 62 },
      { time: '2m', cpu: 54, mem: 61 }
    ]
  },
  {
    id: 'res-02',
    name: 'production-api-02',
    type: 'AWS EC2',
    category: 'AWS',
    environment: 'Production',
    location: 'AWS Mumbai',
    cpu: 48,
    memory: 58,
    disk: 38,
    network: '185 Mbps',
    apiLatency: '115 ms',
    errorRate: '0.08%',
    status: 'Healthy',
    monthlyCost: 280,
    costFormatted: '$280/mo',
    uptime: '32d 09h',
    lastSeen: '1m ago',
    ipAddress: '10.0.14.92',
    workload: 'api-gateway, billing-service, grpc-router',
    specs: {
      cores: 4,
      ramGb: 8,
      storageGb: 100,
      osOrEngine: 'Amazon Linux 2023 (c6i.xlarge)'
    },
    recentTelemetry: [
      { time: '10m', cpu: 46, mem: 57 },
      { time: '8m', cpu: 49, mem: 58 },
      { time: '6m', cpu: 47, mem: 58 },
      { time: '4m', cpu: 50, mem: 59 },
      { time: '2m', cpu: 48, mem: 58 }
    ]
  },
  {
    id: 'res-03',
    name: 'production-db',
    type: 'AWS RDS',
    category: 'AWS',
    environment: 'Production',
    location: 'AWS Mumbai',
    cpu: 72,
    memory: 68,
    disk: 79,
    network: '180 Mbps',
    apiLatency: '142 ms',
    errorRate: '0.85%',
    status: 'Warning',
    monthlyCost: 640,
    costFormatted: '$640/mo',
    uptime: '112d 06h',
    lastSeen: 'Just now',
    ipAddress: '10.0.32.10',
    workload: 'PostgreSQL 16.2 primary cluster (Read/Write)',
    specs: {
      cores: 8,
      ramGb: 64,
      storageGb: 500,
      osOrEngine: 'Managed RDS PostgreSQL 16.2 (db.r6g.2xlarge)'
    },
    recentTelemetry: [
      { time: '10m', cpu: 69, mem: 67 },
      { time: '8m', cpu: 74, mem: 68 },
      { time: '6m', cpu: 71, mem: 68 },
      { time: '4m', cpu: 75, mem: 69 },
      { time: '2m', cpu: 72, mem: 68 }
    ]
  },
  {
    id: 'res-04',
    name: 'production-cache',
    type: 'AWS ElastiCache',
    category: 'AWS',
    environment: 'Production',
    location: 'AWS Singapore',
    cpu: 34,
    memory: 46,
    disk: 22,
    network: '140 Mbps',
    apiLatency: '8 ms',
    errorRate: '0.00%',
    status: 'Healthy',
    monthlyCost: 190,
    costFormatted: '$190/mo',
    uptime: '78d 18h',
    lastSeen: 'Just now',
    ipAddress: '10.0.48.5',
    workload: 'Redis 7.2 cluster mode, session storage & rate limiter',
    specs: {
      cores: 2,
      ramGb: 16,
      storageGb: 50,
      osOrEngine: 'AWS ElastiCache Redis (cache.m6g.large)'
    },
    recentTelemetry: [
      { time: '10m', cpu: 32, mem: 45 },
      { time: '8m', cpu: 35, mem: 46 },
      { time: '6m', cpu: 33, mem: 46 },
      { time: '4m', cpu: 36, mem: 47 },
      { time: '2m', cpu: 34, mem: 46 }
    ]
  },
  {
    id: 'res-05',
    name: 'EDGE-001',
    type: 'Edge Gateway',
    category: 'Edge',
    environment: 'Edge Gateway',
    location: 'Thane Edge',
    cpu: 43,
    memory: 51,
    disk: 35,
    network: '82 Mbps',
    temperature: 58,
    apiLatency: '104 ms',
    errorRate: '0.02%',
    status: 'Healthy',
    monthlyCost: 0,
    costFormatted: '$0 (Edge Hardware)',
    uptime: '19d 08h',
    lastSeen: 'Just now',
    ipAddress: '192.168.10.4',
    workload: 'sensor-aggregator, mqtt-broker, telemetry-agent',
    specs: {
      cores: 4,
      ramGb: 4,
      storageGb: 64,
      osOrEngine: 'Debian 12 RT-Kernel (Industrial Gateway v2)'
    },
    recentTelemetry: [
      { time: '10m', cpu: 41, mem: 50 },
      { time: '8m', cpu: 44, mem: 51 },
      { time: '6m', cpu: 42, mem: 51 },
      { time: '4m', cpu: 45, mem: 52 },
      { time: '2m', cpu: 43, mem: 51 }
    ]
  },
  {
    id: 'res-06',
    name: 'EDGE-002',
    type: 'IoT Device',
    category: 'Edge',
    environment: 'Edge Gateway',
    location: 'Thane Edge',
    cpu: 52,
    memory: 58,
    disk: 44,
    network: '64 Mbps',
    temperature: 64,
    apiLatency: '95 ms',
    errorRate: '0.05%',
    status: 'Healthy',
    monthlyCost: 0,
    costFormatted: '$0 (Edge Hardware)',
    uptime: '14d 11h',
    lastSeen: '2m ago',
    ipAddress: '192.168.20.8',
    workload: 'telemetry-agent, canbus-logger, thermal-monitor',
    specs: {
      cores: 4,
      ramGb: 4,
      storageGb: 64,
      osOrEngine: 'Alpine Linux (Edge ARM64)'
    },
    recentTelemetry: [
      { time: '10m', cpu: 50, mem: 57 },
      { time: '8m', cpu: 53, mem: 58 },
      { time: '6m', cpu: 51, mem: 58 },
      { time: '4m', cpu: 54, mem: 59 },
      { time: '2m', cpu: 52, mem: 58 }
    ]
  },
  {
    id: 'res-07',
    name: 'EDGE-003',
    type: 'Edge Gateway',
    category: 'Edge',
    environment: 'Edge Gateway',
    location: 'Vashi Edge',
    cpu: 94,
    memory: 82,
    disk: 78,
    network: '124 Mbps',
    temperature: 79,
    apiLatency: '380 ms',
    errorRate: '4.85%',
    status: 'Critical',
    monthlyCost: 0,
    costFormatted: '$0 (Edge Hardware)',
    uptime: '5d 02h',
    lastSeen: 'Just now',
    ipAddress: '192.168.10.12',
    workload: 'vision-ml-infer, high-fps-stream, opencv-pipeline',
    specs: {
      cores: 4,
      ramGb: 4,
      storageGb: 64,
      osOrEngine: 'Debian 12 RT-Kernel (High Heat Alert)'
    },
    recentTelemetry: [
      { time: '10m', cpu: 91, mem: 80 },
      { time: '8m', cpu: 95, mem: 82 },
      { time: '6m', cpu: 93, mem: 81 },
      { time: '4m', cpu: 96, mem: 83 },
      { time: '2m', cpu: 94, mem: 82 }
    ]
  },
  {
    id: 'res-08',
    name: 'EDGE-004',
    type: 'IoT Device',
    category: 'Edge',
    environment: 'Edge Gateway',
    location: 'Vashi Edge',
    cpu: 48,
    memory: 50,
    disk: 39,
    network: '70 Mbps',
    temperature: 61,
    apiLatency: '112 ms',
    errorRate: '0.03%',
    status: 'Healthy',
    monthlyCost: 0,
    costFormatted: '$0 (Edge Hardware)',
    uptime: '22d 19h',
    lastSeen: 'Just now',
    ipAddress: '192.168.20.14',
    workload: 'bms-rack-monitor, power-meter, gpio-controller',
    specs: {
      cores: 2,
      ramGb: 2,
      storageGb: 32,
      osOrEngine: 'Embedded Linux RT'
    },
    recentTelemetry: [
      { time: '10m', cpu: 46, mem: 49 },
      { time: '8m', cpu: 49, mem: 50 },
      { time: '6m', cpu: 47, mem: 50 },
      { time: '4m', cpu: 50, mem: 51 },
      { time: '2m', cpu: 48, mem: 50 }
    ]
  },
  {
    id: 'res-09',
    name: 'docker-worker-01',
    type: 'Docker',
    category: 'Docker',
    environment: 'Production',
    location: 'On-Premise DC',
    cpu: 58,
    memory: 64,
    disk: 52,
    network: '110 Mbps',
    apiLatency: '42 ms',
    errorRate: '0.02%',
    status: 'Healthy',
    monthlyCost: 0,
    costFormatted: '$0 (On-Prem Compute)',
    uptime: '61d 04h',
    lastSeen: '1m ago',
    ipAddress: '172.24.1.44',
    workload: 'data-pipeline, batch-processor, image-resizer',
    specs: {
      cores: 8,
      ramGb: 32,
      storageGb: 500,
      osOrEngine: 'Docker Engine v26.1 / Ubuntu 22.04 LTS'
    },
    recentTelemetry: [
      { time: '10m', cpu: 56, mem: 63 },
      { time: '8m', cpu: 59, mem: 64 },
      { time: '6m', cpu: 57, mem: 64 },
      { time: '4m', cpu: 60, mem: 65 },
      { time: '2m', cpu: 58, mem: 64 }
    ]
  },
  {
    id: 'res-10',
    name: 'docker-worker-02',
    type: 'Docker',
    category: 'Docker',
    environment: 'Production',
    location: 'On-Premise DC',
    cpu: 67,
    memory: 59,
    disk: 56,
    network: '96 Mbps',
    apiLatency: '48 ms',
    errorRate: '0.04%',
    status: 'Healthy',
    monthlyCost: 0,
    costFormatted: '$0 (On-Prem Compute)',
    uptime: '61d 04h',
    lastSeen: 'Just now',
    ipAddress: '172.24.1.45',
    workload: 'celery-async-queue, redis-cache, task-scheduler',
    specs: {
      cores: 8,
      ramGb: 32,
      storageGb: 500,
      osOrEngine: 'Docker Engine v26.1 / Ubuntu 22.04 LTS'
    },
    recentTelemetry: [
      { time: '10m', cpu: 65, mem: 58 },
      { time: '8m', cpu: 69, mem: 59 },
      { time: '6m', cpu: 66, mem: 59 },
      { time: '4m', cpu: 70, mem: 60 },
      { time: '2m', cpu: 67, mem: 59 }
    ]
  },
  {
    id: 'res-11',
    name: 'k8s-ingress-gateway',
    type: 'Kubernetes',
    category: 'Kubernetes',
    environment: 'Production',
    location: 'AWS Mumbai',
    cpu: 38,
    memory: 45,
    disk: 30,
    network: '310 Mbps',
    apiLatency: '32 ms',
    errorRate: '0.01%',
    status: 'Healthy',
    monthlyCost: 320,
    costFormatted: '$320/mo',
    uptime: '94d 12h',
    lastSeen: 'Just now',
    ipAddress: '10.0.12.9',
    workload: 'ingress-nginx-controller, cert-manager, tls-termination',
    specs: {
      cores: 4,
      ramGb: 16,
      storageGb: 80,
      osOrEngine: 'Kubernetes v1.29 (EKS managed node group)'
    },
    recentTelemetry: [
      { time: '10m', cpu: 36, mem: 44 },
      { time: '8m', cpu: 39, mem: 45 },
      { time: '6m', cpu: 37, mem: 45 },
      { time: '4m', cpu: 40, mem: 46 },
      { time: '2m', cpu: 38, mem: 45 }
    ]
  },
  {
    id: 'res-12',
    name: 'k8s-api-cluster',
    type: 'Kubernetes',
    category: 'Kubernetes',
    environment: 'Production',
    location: 'AWS Singapore',
    cpu: 74,
    memory: 72,
    disk: 65,
    network: '260 Mbps',
    apiLatency: '68 ms',
    errorRate: '0.25%',
    status: 'Warning',
    monthlyCost: 480,
    costFormatted: '$480/mo',
    uptime: '45d 08h',
    lastSeen: '3m ago',
    ipAddress: '10.0.12.24',
    workload: 'microservices-pool, payment-processor, notification-daemon',
    specs: {
      cores: 8,
      ramGb: 32,
      storageGb: 200,
      osOrEngine: 'Kubernetes v1.29 (EKS multi-AZ cluster)'
    },
    recentTelemetry: [
      { time: '10m', cpu: 71, mem: 70 },
      { time: '8m', cpu: 76, mem: 72 },
      { time: '6m', cpu: 73, mem: 72 },
      { time: '4m', cpu: 77, mem: 73 },
      { time: '2m', cpu: 74, mem: 72 }
    ]
  },
  {
    id: 'res-13',
    name: 'switch-core-rack-01',
    type: 'On-Premise Network',
    category: 'On-Premise',
    environment: 'Data Center',
    location: 'On-Premise DC',
    cpu: 28,
    memory: 40,
    disk: 18,
    network: '620 Mbps',
    temperature: 44,
    apiLatency: '2 ms',
    errorRate: '0.00%',
    status: 'Healthy',
    monthlyCost: 0,
    costFormatted: '$0 (On-Prem Network)',
    uptime: '180d 02h',
    lastSeen: 'Just now',
    ipAddress: '10.100.1.2',
    workload: 'Layer 3 Routing, BGP Peer, OSPF Area 0',
    specs: {
      cores: 4,
      ramGb: 8,
      storageGb: 32,
      osOrEngine: 'NOS Enterprise 10GbE Switch'
    },
    recentTelemetry: [
      { time: '10m', cpu: 27, mem: 39 },
      { time: '8m', cpu: 29, mem: 40 },
      { time: '6m', cpu: 28, mem: 40 },
      { time: '4m', cpu: 30, mem: 41 },
      { time: '2m', cpu: 28, mem: 40 }
    ]
  },
  {
    id: 'res-14',
    name: 'switch-core-rack-02',
    type: 'On-Premise Network',
    category: 'On-Premise',
    environment: 'Data Center',
    location: 'On-Premise DC',
    cpu: 24,
    memory: 38,
    disk: 16,
    network: '580 Mbps',
    temperature: 42,
    apiLatency: '2 ms',
    errorRate: '0.00%',
    status: 'Healthy',
    monthlyCost: 0,
    costFormatted: '$0 (On-Prem Network)',
    uptime: '180d 02h',
    lastSeen: 'Just now',
    ipAddress: '10.100.1.1',
    workload: 'VLAN Trunks, LACP, SNMP v3',
    specs: {
      cores: 4,
      ramGb: 8,
      storageGb: 32,
      osOrEngine: 'NOS Enterprise 10GbE Switch'
    },
    recentTelemetry: [
      { time: '10m', cpu: 23, mem: 37 },
      { time: '8m', cpu: 25, mem: 38 },
      { time: '6m', cpu: 24, mem: 38 },
      { time: '4m', cpu: 26, mem: 39 },
      { time: '2m', cpu: 24, mem: 38 }
    ]
  }
];

export const RESOURCE_SUMMARY_CARDS: ResourceSummaryCardData[] = [
  {
    id: 'total',
    title: 'TOTAL RESOURCES',
    value: '14',
    subtext: 'Across all clusters',
    status: 'info',
    icon: 'Layers',
    trend: { direction: 'neutral', value: '14 active', isPositive: true }
  },
  {
    id: 'aws',
    title: 'AWS RESOURCES',
    value: '6',
    subtext: 'EC2, RDS, K8s, Cache',
    status: 'info',
    icon: 'Cloud',
    trend: { direction: 'neutral', value: '2 regions', isPositive: true }
  },
  {
    id: 'edge',
    title: 'EDGE DEVICES',
    value: '4',
    subtext: 'Gateways & MCUs',
    status: 'warning',
    icon: 'Cpu',
    trend: { direction: 'down', value: '1 critical', isPositive: false }
  },
  {
    id: 'onprem',
    title: 'ON-PREMISE',
    value: '4',
    subtext: 'Docker & Core Switches',
    status: 'info',
    icon: 'Server',
    trend: { direction: 'neutral', value: 'DC Rack 4', isPositive: true }
  },
  {
    id: 'healthy',
    title: 'HEALTHY',
    value: '10',
    subtext: 'Optimal baseline',
    status: 'healthy',
    icon: 'CheckCircle2',
    trend: { direction: 'up', value: '71.4%', isPositive: true }
  },
  {
    id: 'warning',
    title: 'WARNING',
    value: '3',
    subtext: 'Elevated load/RAM',
    status: 'warning',
    icon: 'AlertCircle',
    trend: { direction: 'neutral', value: '21.4%', isPositive: false }
  },
  {
    id: 'critical',
    title: 'CRITICAL',
    value: '1',
    subtext: 'EDGE-003 High Temp',
    status: 'critical',
    icon: 'AlertTriangle',
    trend: { direction: 'up', value: 'Requires Action', isPositive: false }
  },
  {
    id: 'cost',
    title: 'MONTHLY COST',
    value: '$2,190',
    subtext: 'Cloud compute & DB',
    status: 'healthy',
    icon: 'DollarSign',
    trend: { direction: 'down', value: '-$140 vs last mo', isPositive: true }
  }
];

export const COST_BREAKDOWN_ITEMS: CostBreakdownItem[] = [
  {
    id: 'cost-compute',
    category: 'AWS Compute',
    monthlyCost: 880,
    percentage: 40.2,
    resourceCount: 4,
    trend: '-$60 vs prev',
    color: '#06b6d4'
  },
  {
    id: 'cost-db',
    category: 'AWS Database',
    monthlyCost: 640,
    percentage: 29.2,
    resourceCount: 1,
    trend: 'Steady',
    color: '#6366f1'
  },
  {
    id: 'cost-storage',
    category: 'Storage',
    monthlyCost: 310,
    percentage: 14.2,
    resourceCount: 6,
    trend: '+$15 vs prev',
    color: '#10b981'
  },
  {
    id: 'cost-network',
    category: 'Network',
    monthlyCost: 240,
    percentage: 11.0,
    resourceCount: 14,
    trend: '-$95 vs prev',
    color: '#f59e0b'
  },
  {
    id: 'cost-other',
    category: 'Other',
    monthlyCost: 120,
    percentage: 5.4,
    resourceCount: 4,
    trend: 'Standard',
    color: '#8b5cf6'
  }
];
