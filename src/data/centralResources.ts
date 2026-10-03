import { InventoryResource } from '../types/resources';
import { EdgeDevice } from '../types/edge';
import { LiveTelemetryRow } from '../types/monitoring';
import { InfrastructureResource } from '../types/dashboard';

export interface CentralResourceItem {
  id: string;
  name: string;
  type: 'AWS EC2' | 'AWS RDS' | 'AWS ElastiCache' | 'Edge Gateway' | 'IoT Device' | 'Docker' | 'Kubernetes' | 'On-Premise Network' | 'AWS S3' | 'AWS ALB';
  category: 'AWS' | 'Edge' | 'On-Premise' | 'Docker' | 'Kubernetes';
  environment: 'Production' | 'Staging' | 'Edge Gateway' | 'Data Center';
  location: 'AWS Mumbai' | 'AWS Singapore' | 'Thane Edge' | 'Vashi Edge' | 'On-Premise DC' | 'Pune Edge' | 'Mumbai Edge';
  status: 'Healthy' | 'Warning' | 'Critical';
  cpu: number;
  memory: number;
  disk: number;
  network: string;
  temperature?: number;
  apiLatency?: string;
  errorRate?: string;
  uptime: string;
  monthlyCost: number;
  costFormatted: string;
  lastSeen: string;
  ipAddress: string;
  macAddress?: string;
  workload: string;
  specs: {
    cores: number;
    ramGb: number;
    storageGb: number;
    osOrEngine: string;
  };
  recentTelemetry: Array<{ time: string; cpu: number; mem: number; temp?: number }>;
}

export const CENTRAL_RESOURCES: CentralResourceItem[] = [
  // 1. production-api-01
  {
    id: 'res-api-01',
    name: 'production-api-01',
    type: 'AWS EC2',
    category: 'AWS',
    environment: 'Production',
    location: 'AWS Mumbai',
    status: 'Warning',
    cpu: 78,
    memory: 64,
    disk: 42,
    network: '214 Mbps',
    temperature: 46,
    apiLatency: '180 ms',
    errorRate: '1.80%',
    uptime: '48d 14h',
    monthlyCost: 280,
    costFormatted: '$280/mo',
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
      { time: '10m', cpu: 74, mem: 62 },
      { time: '8m', cpu: 76, mem: 63 },
      { time: '6m', cpu: 82, mem: 65 },
      { time: '4m', cpu: 80, mem: 64 },
      { time: '2m', cpu: 78, mem: 64 }
    ]
  },

  // 2. production-api-02
  {
    id: 'res-api-02',
    name: 'production-api-02',
    type: 'AWS EC2',
    category: 'AWS',
    environment: 'Production',
    location: 'AWS Mumbai',
    status: 'Healthy',
    cpu: 48,
    memory: 58,
    disk: 38,
    network: '185 Mbps',
    temperature: 42,
    apiLatency: '65 ms',
    errorRate: '0.08%',
    uptime: '32d 09h',
    monthlyCost: 280,
    costFormatted: '$280/mo',
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

  // 3. production-db
  {
    id: 'res-db-01',
    name: 'production-db',
    type: 'AWS RDS',
    category: 'AWS',
    environment: 'Production',
    location: 'AWS Mumbai',
    status: 'Warning',
    cpu: 62,
    memory: 88,
    disk: 71,
    network: '310 Mbps',
    temperature: 49,
    apiLatency: '42 ms',
    errorRate: '0.05%',
    uptime: '124d 02h',
    monthlyCost: 340,
    costFormatted: '$340/mo',
    lastSeen: 'Just now',
    ipAddress: '10.0.22.14',
    workload: 'PostgreSQL 15.4 (Aurora Cluster Primary)',
    specs: {
      cores: 8,
      ramGb: 32,
      storageGb: 500,
      osOrEngine: 'Aurora PostgreSQL Multi-AZ (db.r6g.2xlarge)'
    },
    recentTelemetry: [
      { time: '10m', cpu: 59, mem: 86 },
      { time: '8m', cpu: 61, mem: 87 },
      { time: '6m', cpu: 64, mem: 88 },
      { time: '4m', cpu: 63, mem: 88 },
      { time: '2m', cpu: 62, mem: 88 }
    ]
  },

  // 4. production-cache
  {
    id: 'res-cache-01',
    name: 'production-cache',
    type: 'AWS ElastiCache',
    category: 'AWS',
    environment: 'Production',
    location: 'AWS Mumbai',
    status: 'Healthy',
    cpu: 28,
    memory: 52,
    disk: 15,
    network: '85 Mbps',
    temperature: 38,
    apiLatency: '4 ms',
    errorRate: '0.00%',
    uptime: '89d 18h',
    monthlyCost: 110,
    costFormatted: '$110/mo',
    lastSeen: 'Just now',
    ipAddress: '10.0.30.5',
    workload: 'Redis 7.0 Cluster (In-Memory Session Store)',
    specs: {
      cores: 2,
      ramGb: 6,
      storageGb: 20,
      osOrEngine: 'ElastiCache Redis (cache.m6g.large)'
    },
    recentTelemetry: [
      { time: '10m', cpu: 26, mem: 51 },
      { time: '8m', cpu: 27, mem: 52 },
      { time: '6m', cpu: 29, mem: 52 },
      { time: '4m', cpu: 28, mem: 52 },
      { time: '2m', cpu: 28, mem: 52 }
    ]
  },

  // 5. EDGE-001
  {
    id: 'res-edge-001',
    name: 'EDGE-001',
    type: 'Edge Gateway',
    category: 'Edge',
    environment: 'Edge Gateway',
    location: 'Thane Edge',
    status: 'Healthy',
    cpu: 38,
    memory: 46,
    disk: 35,
    network: '45 Mbps',
    temperature: 48,
    apiLatency: '18 ms',
    errorRate: '0.00%',
    uptime: '18d 04h',
    monthlyCost: 0,
    costFormatted: '$0/mo (Hardware)',
    lastSeen: 'Just now',
    ipAddress: '192.168.10.21',
    macAddress: 'B8:27:EB:01:2A:44',
    workload: 'Industrial Sensor Ingest, MQTT Broker, mTLS Agent',
    specs: {
      cores: 4,
      ramGb: 4,
      storageGb: 64,
      osOrEngine: 'Ubuntu Core 22.04 LTS (ARM64)'
    },
    recentTelemetry: [
      { time: '10m', cpu: 35, mem: 44, temp: 47 },
      { time: '8m', cpu: 37, mem: 45, temp: 48 },
      { time: '6m', cpu: 39, mem: 46, temp: 48 },
      { time: '4m', cpu: 38, mem: 46, temp: 48 },
      { time: '2m', cpu: 38, mem: 46, temp: 48 }
    ]
  },

  // 6. EDGE-002
  {
    id: 'res-edge-002',
    name: 'EDGE-002',
    type: 'IoT Device',
    category: 'Edge',
    environment: 'Edge Gateway',
    location: 'Vashi Edge',
    status: 'Healthy',
    cpu: 52,
    memory: 58,
    disk: 42,
    network: '38 Mbps',
    temperature: 54,
    apiLatency: '24 ms',
    errorRate: '0.00%',
    uptime: '12d 22h',
    monthlyCost: 0,
    costFormatted: '$0/mo (Hardware)',
    lastSeen: '1m ago',
    ipAddress: '192.168.12.18',
    macAddress: 'B8:27:EB:02:5F:11',
    workload: 'HVAC & Warehouse Telemetry Streamer',
    specs: {
      cores: 4,
      ramGb: 4,
      storageGb: 64,
      osOrEngine: 'Ubuntu Core 22.04 LTS (ARM64)'
    },
    recentTelemetry: [
      { time: '10m', cpu: 50, mem: 56, temp: 53 },
      { time: '8m', cpu: 53, mem: 57, temp: 54 },
      { time: '6m', cpu: 54, mem: 58, temp: 54 },
      { time: '4m', cpu: 52, mem: 58, temp: 54 },
      { time: '2m', cpu: 52, mem: 58, temp: 54 }
    ]
  },

  // 7. EDGE-003 (PRIMARY CRITICAL EXAMPLE)
  {
    id: 'res-edge-003',
    name: 'EDGE-003',
    type: 'Edge Gateway',
    category: 'Edge',
    environment: 'Edge Gateway',
    location: 'Thane Edge',
    status: 'Critical',
    cpu: 91,
    memory: 87,
    disk: 82,
    network: '12 Mbps (degraded)',
    temperature: 82,
    apiLatency: '185 ms',
    errorRate: '4.20%',
    uptime: '2d 06h',
    monthlyCost: 0,
    costFormatted: '$0/mo (Hardware)',
    lastSeen: 'Just now',
    ipAddress: '192.168.10.33',
    macAddress: 'B8:27:EB:03:9C:77',
    workload: 'Factory Assembly Line Sensor Aggregator (High Heat)',
    specs: {
      cores: 4,
      ramGb: 4,
      storageGb: 64,
      osOrEngine: 'Ubuntu Core 22.04 LTS (ARM64)'
    },
    recentTelemetry: [
      { time: '10m', cpu: 88, mem: 84, temp: 79 },
      { time: '8m', cpu: 89, mem: 85, temp: 80 },
      { time: '6m', cpu: 92, mem: 86, temp: 81 },
      { time: '4m', cpu: 93, mem: 87, temp: 82 },
      { time: '2m', cpu: 91, mem: 87, temp: 82 }
    ]
  },

  // 8. EDGE-004
  {
    id: 'res-edge-004',
    name: 'EDGE-004',
    type: 'Edge Gateway',
    category: 'Edge',
    environment: 'Edge Gateway',
    location: 'Pune Edge',
    status: 'Healthy',
    cpu: 34,
    memory: 42,
    disk: 28,
    network: '50 Mbps',
    temperature: 45,
    apiLatency: '16 ms',
    errorRate: '0.00%',
    uptime: '45d 11h',
    monthlyCost: 0,
    costFormatted: '$0/mo (Hardware)',
    lastSeen: 'Just now',
    ipAddress: '192.168.14.15',
    macAddress: 'B8:27:EB:04:88:99',
    workload: 'Solar Array & Grid Inverter Monitor',
    specs: {
      cores: 4,
      ramGb: 4,
      storageGb: 64,
      osOrEngine: 'Ubuntu Core 22.04 LTS (ARM64)'
    },
    recentTelemetry: [
      { time: '10m', cpu: 32, mem: 40, temp: 44 },
      { time: '8m', cpu: 33, mem: 41, temp: 44 },
      { time: '6m', cpu: 35, mem: 42, temp: 45 },
      { time: '4m', cpu: 34, mem: 42, temp: 45 },
      { time: '2m', cpu: 34, mem: 42, temp: 45 }
    ]
  },

  // 9. docker-worker-01
  {
    id: 'res-docker-01',
    name: 'docker-worker-01',
    type: 'Docker',
    category: 'Docker',
    environment: 'Production',
    location: 'On-Premise DC',
    status: 'Healthy',
    cpu: 42,
    memory: 55,
    disk: 48,
    network: '64 Mbps',
    temperature: 44,
    apiLatency: '15 ms',
    errorRate: '0.00%',
    uptime: '61d 08h',
    monthlyCost: 0,
    costFormatted: '$0/mo (On-Prem)',
    lastSeen: 'Just now',
    ipAddress: '172.16.4.101',
    workload: 'Batch Data Transformation Worker (16 containers)',
    specs: {
      cores: 8,
      ramGb: 16,
      storageGb: 250,
      osOrEngine: 'Docker Engine 24.0 (Debian 12)'
    },
    recentTelemetry: [
      { time: '10m', cpu: 40, mem: 53 },
      { time: '8m', cpu: 43, mem: 54 },
      { time: '6m', cpu: 44, mem: 55 },
      { time: '4m', cpu: 42, mem: 55 },
      { time: '2m', cpu: 42, mem: 55 }
    ]
  },

  // 10. docker-worker-02
  {
    id: 'res-docker-02',
    name: 'docker-worker-02',
    type: 'Docker',
    category: 'Docker',
    environment: 'Production',
    location: 'On-Premise DC',
    status: 'Warning',
    cpu: 76,
    memory: 72,
    disk: 58,
    network: '32 Mbps',
    temperature: 51,
    apiLatency: '85 ms',
    errorRate: '1.20%',
    uptime: '14d 02h',
    monthlyCost: 0,
    costFormatted: '$0/mo (On-Prem)',
    lastSeen: '2m ago',
    ipAddress: '172.16.4.102',
    workload: 'Telemetry Enrichment Worker (Zombie Task PID 4410)',
    specs: {
      cores: 8,
      ramGb: 16,
      storageGb: 250,
      osOrEngine: 'Docker Engine 24.0 (Debian 12)'
    },
    recentTelemetry: [
      { time: '10m', cpu: 72, mem: 69 },
      { time: '8m', cpu: 75, mem: 71 },
      { time: '6m', cpu: 78, mem: 73 },
      { time: '4m', cpu: 77, mem: 72 },
      { time: '2m', cpu: 76, mem: 72 }
    ]
  },

  // 11. k8s-ingress-gateway
  {
    id: 'res-k8s-ingress',
    name: 'k8s-ingress-gateway',
    type: 'Kubernetes',
    category: 'Kubernetes',
    environment: 'Production',
    location: 'AWS Mumbai',
    status: 'Warning',
    cpu: 72,
    memory: 68,
    disk: 30,
    network: '340 Mbps',
    temperature: 45,
    apiLatency: '185 ms',
    errorRate: '2.10%',
    uptime: '38d 19h',
    monthlyCost: 180,
    costFormatted: '$180/mo',
    lastSeen: 'Just now',
    ipAddress: '10.0.10.12',
    workload: 'NGINX Ingress Controller (2 Pods, Backlog in Queue)',
    specs: {
      cores: 4,
      ramGb: 8,
      storageGb: 50,
      osOrEngine: 'Kubernetes v1.28 (EKS Cluster)'
    },
    recentTelemetry: [
      { time: '10m', cpu: 68, mem: 65 },
      { time: '8m', cpu: 71, mem: 67 },
      { time: '6m', cpu: 74, mem: 69 },
      { time: '4m', cpu: 73, mem: 68 },
      { time: '2m', cpu: 72, mem: 68 }
    ]
  },

  // 12. k8s-api-cluster
  {
    id: 'res-k8s-cluster',
    name: 'k8s-api-cluster',
    type: 'Kubernetes',
    category: 'Kubernetes',
    environment: 'Production',
    location: 'AWS Mumbai',
    status: 'Healthy',
    cpu: 58,
    memory: 62,
    disk: 44,
    network: '420 Mbps',
    temperature: 46,
    apiLatency: '28 ms',
    errorRate: '0.10%',
    uptime: '95d 12h',
    monthlyCost: 480,
    costFormatted: '$480/mo',
    lastSeen: 'Just now',
    ipAddress: '10.0.10.50',
    workload: 'EKS Managed Node Group (6 Nodes, 48 Microservice Pods)',
    specs: {
      cores: 16,
      ramGb: 64,
      storageGb: 400,
      osOrEngine: 'Kubernetes v1.28 (EKS Cluster)'
    },
    recentTelemetry: [
      { time: '10m', cpu: 56, mem: 60 },
      { time: '8m', cpu: 58, mem: 61 },
      { time: '6m', cpu: 60, mem: 63 },
      { time: '4m', cpu: 59, mem: 62 },
      { time: '2m', cpu: 58, mem: 62 }
    ]
  },

  // 13. switch-core-rack-01
  {
    id: 'res-switch-01',
    name: 'switch-core-rack-01',
    type: 'On-Premise Network',
    category: 'On-Premise',
    environment: 'Data Center',
    location: 'On-Premise DC',
    status: 'Healthy',
    cpu: 22,
    memory: 31,
    disk: 12,
    network: '1.2 Gbps',
    temperature: 39,
    apiLatency: '2 ms',
    errorRate: '0.00%',
    uptime: '340d 05h',
    monthlyCost: 0,
    costFormatted: '$0/mo (On-Prem)',
    lastSeen: 'Just now',
    ipAddress: '172.16.0.1',
    workload: '48-Port 10GbE Top-of-Rack Core Switch',
    specs: {
      cores: 2,
      ramGb: 4,
      storageGb: 16,
      osOrEngine: 'Cisco NX-OS / Arista EOS'
    },
    recentTelemetry: [
      { time: '10m', cpu: 20, mem: 30 },
      { time: '8m', cpu: 22, mem: 31 },
      { time: '6m', cpu: 23, mem: 31 },
      { time: '4m', cpu: 22, mem: 31 },
      { time: '2m', cpu: 22, mem: 31 }
    ]
  },

  // 14. switch-core-rack-02
  {
    id: 'res-switch-02',
    name: 'switch-core-rack-02',
    type: 'On-Premise Network',
    category: 'On-Premise',
    environment: 'Data Center',
    location: 'On-Premise DC',
    status: 'Warning',
    cpu: 64,
    memory: 58,
    disk: 14,
    network: '850 Mbps',
    temperature: 52,
    apiLatency: '45 ms',
    errorRate: '1.80%',
    uptime: '180d 14h',
    monthlyCost: 0,
    costFormatted: '$0/mo (On-Prem)',
    lastSeen: '1m ago',
    ipAddress: '172.16.0.2',
    workload: '48-Port 10GbE Secondary Trunk Switch (Packet Drop)',
    specs: {
      cores: 2,
      ramGb: 4,
      storageGb: 16,
      osOrEngine: 'Cisco NX-OS / Arista EOS'
    },
    recentTelemetry: [
      { time: '10m', cpu: 61, mem: 56 },
      { time: '8m', cpu: 63, mem: 57 },
      { time: '6m', cpu: 66, mem: 59 },
      { time: '4m', cpu: 65, mem: 58 },
      { time: '2m', cpu: 64, mem: 58 }
    ]
  }
];

// Adapter Helpers for backward compatibility with component interfaces
export function toInventoryResource(item: CentralResourceItem): InventoryResource {
  return {
    id: item.id,
    name: item.name,
    type: item.type as any,
    category: item.category,
    environment: item.environment,
    location: item.location as any,
    cpu: item.cpu,
    memory: item.memory,
    disk: item.disk,
    network: item.network,
    temperature: item.temperature,
    apiLatency: item.apiLatency,
    errorRate: item.errorRate,
    status: item.status,
    monthlyCost: item.monthlyCost,
    costFormatted: item.costFormatted,
    uptime: item.uptime,
    lastSeen: item.lastSeen,
    ipAddress: item.ipAddress,
    workload: item.workload,
    specs: item.specs,
    recentTelemetry: item.recentTelemetry.map((t) => ({ time: t.time, cpu: t.cpu, mem: t.mem }))
  };
}

export function toEdgeDevice(item: CentralResourceItem): EdgeDevice {
  const locMap: Record<string, 'Thane' | 'Vashi' | 'Mumbai' | 'Pune'> = {
    'Thane Edge': 'Thane',
    'Vashi Edge': 'Vashi',
    'Pune Edge': 'Pune',
    'Mumbai Edge': 'Mumbai'
  };

  const netStatus: 'optimal' | 'stable' | 'degraded' | 'offline' =
    item.status === 'Critical' ? 'degraded' : item.status === 'Warning' ? 'stable' : 'optimal';

  return {
    id: item.id,
    name: item.name,
    location: locMap[item.location] || 'Thane',
    facilityName: `${item.name.replace('EDGE-', 'Facility ')} Industrial Unit`,
    deviceType: (item.type === 'IoT Device' ? 'IoT Gateway' : 'Edge Gateway'),
    cpu: item.cpu,
    memory: item.memory,
    disk: item.disk,
    temperature: item.temperature || 45,
    network: item.network,
    networkStatus: netStatus,
    uptime: item.uptime,
    status: item.status === 'Healthy' ? 'Online' : item.status === 'Warning' ? 'Warning' : 'Critical',
    lastSeen: item.lastSeen,
    ipAddress: item.ipAddress,
    macAddress: item.macAddress || 'B8:27:EB:00:00:00',
    firmwareVersion: 'v2.4.1-rc3',
    activeWorkloads: item.workload,
    alertsCount: item.status === 'Critical' ? 2 : item.status === 'Warning' ? 1 : 0,
    alerts: item.status === 'Critical' ? [
      {
        id: 'ALT-001',
        severity: 'CRITICAL',
        message: `${item.name} thermal threshold exceeded (82°C vs 75°C max)`,
        time: '12m ago'
      }
    ] : undefined,
    recentTelemetry: {
      cpuHistory: item.recentTelemetry.map((t) => ({ time: t.time, value: t.cpu })),
      tempHistory: item.recentTelemetry.map((t) => ({ time: t.time, value: t.temp || item.temperature || 45 })),
      netHistory: [
        { time: '10m', value: item.status === 'Critical' ? 15 : 45 },
        { time: '8m', value: item.status === 'Critical' ? 14 : 46 },
        { time: '6m', value: item.status === 'Critical' ? 11 : 44 },
        { time: '4m', value: item.status === 'Critical' ? 12 : 45 },
        { time: '2m', value: item.status === 'Critical' ? 12 : 45 }
      ]
    }
  };
}

export function toLiveTelemetryRow(item: CentralResourceItem): LiveTelemetryRow {
  let typeMapping: 'Edge Device' | 'EC2' | 'RDS' | 'Docker' | 'Kubernetes' | 'Switch' = 'Edge Device';
  if (item.type === 'AWS EC2') typeMapping = 'EC2';
  else if (item.type === 'AWS RDS') typeMapping = 'RDS';
  else if (item.type === 'Docker') typeMapping = 'Docker';
  else if (item.type === 'Kubernetes') typeMapping = 'Kubernetes';
  else if (item.type === 'On-Premise Network') typeMapping = 'Switch';

  return {
    id: item.id,
    timestamp: 'Just now',
    resource: item.name,
    type: typeMapping,
    cpu: item.cpu,
    memory: item.memory,
    network: item.network,
    latency: item.apiLatency || '12 ms',
    temperature: item.temperature ? `${item.temperature}°C` : 'N/A',
    errorRate: item.errorRate || '0.00%',
    status: item.status,
    location: item.location,
    ipAddress: item.ipAddress,
    provider: item.category === 'AWS' ? 'AWS' : item.category === 'Edge' ? 'Edge' : 'On-Premise',
    workload: item.workload
  };
}

export function toInfrastructureResource(item: CentralResourceItem): InfrastructureResource {
  let type: InfrastructureResource['type'] = 'EC2';
  if (item.type.includes('RDS') || item.type.includes('ElastiCache') || item.type.includes('Database')) {
    type = 'RDS';
  } else if (item.type.includes('Edge') || item.type.includes('IoT') || item.type.includes('Gateway')) {
    type = 'Edge Device';
  } else if (item.type.includes('Docker')) {
    type = 'Docker';
  } else if (item.type.includes('Kubernetes') || item.type.includes('Cluster') || item.type.includes('Ingress')) {
    type = 'Kubernetes';
  } else if (item.type.includes('Switch')) {
    type = 'Switch';
  } else if (item.type.includes('Router')) {
    type = 'Router';
  }

  return {
    id: item.id,
    name: item.name,
    type,
    location: item.location,
    cpu: item.cpu,
    memory: item.memory,
    disk: item.disk,
    temperature: item.temperature,
    powerWatts: item.temperature ? Math.round(item.temperature * 1.8) : undefined,
    status: item.status,
    ipAddress: item.ipAddress,
    uptime: item.uptime,
    activeWorkloads: item.workload,
    provider: item.category === 'AWS' ? 'AWS' : item.category === 'Edge' ? 'Edge' : 'On-Premise',
    lastSeen: item.lastSeen,
    specs: {
      cores: item.specs.cores,
      ramGb: item.specs.ramGb,
      os: item.specs.osOrEngine
    }
  };
}
