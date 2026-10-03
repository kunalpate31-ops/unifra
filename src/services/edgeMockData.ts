import {
  EdgeDevice,
  EdgeSummaryCardData,
  EdgeLocationTopologyNode
} from '../types/edge';

export const INITIAL_EDGE_DEVICES: EdgeDevice[] = [
  {
    id: 'EDGE-001',
    name: 'EDGE-001-Gateway-Thane',
    location: 'Thane',
    facilityName: 'Thane Central Facility (Rack A-01)',
    deviceType: 'Edge Gateway',
    cpu: 43,
    memory: 51,
    disk: 35,
    temperature: 58,
    network: '82 Mbps',
    networkStatus: 'optimal',
    uptime: '19d 08h',
    status: 'Online',
    lastSeen: 'Just now',
    ipAddress: '192.168.10.4',
    macAddress: '00:1B:44:11:3A:B7',
    firmwareVersion: 'v2.4.1-edge-rt',
    activeWorkloads: 'sensor-aggregator, mqtt-broker, telemetry-agent',
    alertsCount: 0,
    alerts: [],
    recentTelemetry: {
      cpuHistory: [
        { time: '10m', value: 41 },
        { time: '8m', value: 44 },
        { time: '6m', value: 42 },
        { time: '4m', value: 45 },
        { time: '2m', value: 43 }
      ],
      tempHistory: [
        { time: '10m', value: 57 },
        { time: '8m', value: 58 },
        { time: '6m', value: 58 },
        { time: '4m', value: 59 },
        { time: '2m', value: 58 }
      ],
      netHistory: [
        { time: '10m', value: 78 },
        { time: '8m', value: 84 },
        { time: '6m', value: 80 },
        { time: '4m', value: 85 },
        { time: '2m', value: 82 }
      ]
    }
  },
  {
    id: 'EDGE-002',
    name: 'EDGE-002-IoT-Thane',
    location: 'Thane',
    facilityName: 'Thane Central Facility (Rack A-03)',
    deviceType: 'IoT Gateway',
    cpu: 52,
    memory: 58,
    disk: 44,
    temperature: 64,
    network: '64 Mbps',
    networkStatus: 'optimal',
    uptime: '14d 11h',
    status: 'Online',
    lastSeen: '2m ago',
    ipAddress: '192.168.20.8',
    macAddress: '00:1B:44:11:3C:99',
    firmwareVersion: 'v2.4.0-edge-rt',
    activeWorkloads: 'telemetry-agent, canbus-logger, thermal-monitor',
    alertsCount: 0,
    alerts: [],
    recentTelemetry: {
      cpuHistory: [
        { time: '10m', value: 50 },
        { time: '8m', value: 53 },
        { time: '6m', value: 51 },
        { time: '4m', value: 54 },
        { time: '2m', value: 52 }
      ],
      tempHistory: [
        { time: '10m', value: 63 },
        { time: '8m', value: 64 },
        { time: '6m', value: 64 },
        { time: '4m', value: 65 },
        { time: '2m', value: 64 }
      ],
      netHistory: [
        { time: '10m', value: 60 },
        { time: '8m', value: 66 },
        { time: '6m', value: 63 },
        { time: '4m', value: 68 },
        { time: '2m', value: 64 }
      ]
    }
  },
  {
    id: 'EDGE-003',
    name: 'EDGE-003-Infer-Vashi',
    location: 'Vashi',
    facilityName: 'Vashi Gateway Cluster (Enclosure 2)',
    deviceType: 'Edge Gateway',
    cpu: 91,
    memory: 87,
    disk: 78,
    temperature: 82,
    network: '124 Mbps (degraded)',
    networkStatus: 'degraded',
    uptime: '5d 02h',
    status: 'Critical',
    lastSeen: 'Just now',
    ipAddress: '192.168.10.12',
    macAddress: '00:1B:44:22:9E:04',
    firmwareVersion: 'v2.3.9-edge-rt',
    activeWorkloads: 'vision-ml-infer, high-fps-stream, opencv-pipeline',
    alertsCount: 2,
    alerts: [
      {
        id: 'alt-e03-1',
        severity: 'CRITICAL',
        message: 'High Core Temperature (82°C) exceeded thermal safety threshold (75°C).',
        time: '3m ago'
      },
      {
        id: 'alt-e03-2',
        severity: 'CRITICAL',
        message: 'CPU saturation (91%) & memory pressure (87%) causing frame drops in vision-ml-infer.',
        time: '7m ago'
      }
    ],
    recentTelemetry: {
      cpuHistory: [
        { time: '10m', value: 88 },
        { time: '8m', value: 92 },
        { time: '6m', value: 90 },
        { time: '4m', value: 93 },
        { time: '2m', value: 91 }
      ],
      tempHistory: [
        { time: '10m', value: 79 },
        { time: '8m', value: 81 },
        { time: '6m', value: 80 },
        { time: '4m', value: 83 },
        { time: '2m', value: 82 }
      ],
      netHistory: [
        { time: '10m', value: 115 },
        { time: '8m', value: 128 },
        { time: '6m', value: 120 },
        { time: '4m', value: 130 },
        { time: '2m', value: 124 }
      ]
    }
  },
  {
    id: 'EDGE-004',
    name: 'EDGE-004-Sensors-Vashi',
    location: 'Vashi',
    facilityName: 'Vashi Gateway Cluster (Enclosure 1)',
    deviceType: 'Industrial Controller',
    cpu: 48,
    memory: 50,
    disk: 39,
    temperature: 61,
    network: '70 Mbps',
    networkStatus: 'optimal',
    uptime: '22d 19h',
    status: 'Online',
    lastSeen: 'Just now',
    ipAddress: '192.168.20.14',
    macAddress: '00:1B:44:22:9E:18',
    firmwareVersion: 'v2.4.1-edge-rt',
    activeWorkloads: 'bms-rack-monitor, power-meter, gpio-controller',
    alertsCount: 0,
    alerts: [],
    recentTelemetry: {
      cpuHistory: [
        { time: '10m', value: 46 },
        { time: '8m', value: 49 },
        { time: '6m', value: 47 },
        { time: '4m', value: 50 },
        { time: '2m', value: 48 }
      ],
      tempHistory: [
        { time: '10m', value: 60 },
        { time: '8m', value: 61 },
        { time: '6m', value: 61 },
        { time: '4m', value: 62 },
        { time: '2m', value: 61 }
      ],
      netHistory: [
        { time: '10m', value: 66 },
        { time: '8m', value: 72 },
        { time: '6m', value: 68 },
        { time: '4m', value: 74 },
        { time: '2m', value: 70 }
      ]
    }
  },
  {
    id: 'EDGE-005',
    name: 'EDGE-005-Server-Mumbai',
    location: 'Mumbai',
    facilityName: 'Mumbai DC Edge Ingress (Rack E-04)',
    deviceType: 'Edge Server',
    cpu: 68,
    memory: 74,
    disk: 62,
    temperature: 69,
    network: '240 Mbps',
    networkStatus: 'stable',
    uptime: '41d 16h',
    status: 'Warning',
    lastSeen: '1m ago',
    ipAddress: '192.168.30.5',
    macAddress: '00:1B:44:33:AA:05',
    firmwareVersion: 'v2.4.1-edge-server',
    activeWorkloads: 'local-cache, redis-edge, envoy-gateway-sidecar',
    alertsCount: 1,
    alerts: [
      {
        id: 'alt-e05-1',
        severity: 'WARNING',
        message: 'Elevated Memory Utilization (74%) approaching warning buffer limit (75%).',
        time: '12m ago'
      }
    ],
    recentTelemetry: {
      cpuHistory: [
        { time: '10m', value: 65 },
        { time: '8m', value: 70 },
        { time: '6m', value: 67 },
        { time: '4m', value: 71 },
        { time: '2m', value: 68 }
      ],
      tempHistory: [
        { time: '10m', value: 68 },
        { time: '8m', value: 69 },
        { time: '6m', value: 69 },
        { time: '4m', value: 70 },
        { time: '2m', value: 69 }
      ],
      netHistory: [
        { time: '10m', value: 220 },
        { time: '8m', value: 250 },
        { time: '6m', value: 235 },
        { time: '4m', value: 255 },
        { time: '2m', value: 240 }
      ]
    }
  },
  {
    id: 'EDGE-006',
    name: 'EDGE-006-RPi-Mumbai',
    location: 'Mumbai',
    facilityName: 'Mumbai DC Security & Env (Unit 12)',
    deviceType: 'Raspberry Pi Gateway',
    cpu: 32,
    memory: 42,
    disk: 28,
    temperature: 52,
    network: '45 Mbps',
    networkStatus: 'optimal',
    uptime: '68d 04h',
    status: 'Online',
    lastSeen: 'Just now',
    ipAddress: '192.168.30.18',
    macAddress: 'B8:27:EB:4F:18:22',
    firmwareVersion: 'v1.9.8-armv8',
    activeWorkloads: 'badge-reader-api, env-sensors, lora-receiver',
    alertsCount: 0,
    alerts: [],
    recentTelemetry: {
      cpuHistory: [
        { time: '10m', value: 30 },
        { time: '8m', value: 34 },
        { time: '6m', value: 31 },
        { time: '4m', value: 35 },
        { time: '2m', value: 32 }
      ],
      tempHistory: [
        { time: '10m', value: 51 },
        { time: '8m', value: 52 },
        { time: '6m', value: 52 },
        { time: '4m', value: 53 },
        { time: '2m', value: 52 }
      ],
      netHistory: [
        { time: '10m', value: 42 },
        { time: '8m', value: 48 },
        { time: '6m', value: 44 },
        { time: '4m', value: 49 },
        { time: '2m', value: 45 }
      ]
    }
  },
  {
    id: 'EDGE-007',
    name: 'EDGE-007-Ctrl-Pune',
    location: 'Pune',
    facilityName: 'Pune Manufacturing Hub (Line 1 PLC)',
    deviceType: 'Industrial Controller',
    cpu: 58,
    memory: 62,
    disk: 48,
    temperature: 66,
    network: '95 Mbps',
    networkStatus: 'optimal',
    uptime: '16d 22h',
    status: 'Online',
    lastSeen: 'Just now',
    ipAddress: '192.168.40.10',
    macAddress: '00:1B:44:44:FC:11',
    firmwareVersion: 'v2.4.1-plc-rt',
    activeWorkloads: 'modbus-master, opc-ua-exporter, scada-proxy',
    alertsCount: 0,
    alerts: [],
    recentTelemetry: {
      cpuHistory: [
        { time: '10m', value: 55 },
        { time: '8m', value: 60 },
        { time: '6m', value: 57 },
        { time: '4m', value: 61 },
        { time: '2m', value: 58 }
      ],
      tempHistory: [
        { time: '10m', value: 65 },
        { time: '8m', value: 66 },
        { time: '6m', value: 66 },
        { time: '4m', value: 67 },
        { time: '2m', value: 66 }
      ],
      netHistory: [
        { time: '10m', value: 90 },
        { time: '8m', value: 98 },
        { time: '6m', value: 94 },
        { time: '4m', value: 102 },
        { time: '2m', value: 95 }
      ]
    }
  },
  {
    id: 'EDGE-008',
    name: 'EDGE-008-Gateway-Pune',
    location: 'Pune',
    facilityName: 'Pune Manufacturing Hub (Line 2 PLC)',
    deviceType: 'Edge Gateway',
    cpu: 76,
    memory: 70,
    disk: 55,
    temperature: 71,
    network: '110 Mbps',
    networkStatus: 'stable',
    uptime: '8d 14h',
    status: 'Warning',
    lastSeen: '4m ago',
    ipAddress: '192.168.40.14',
    macAddress: '00:1B:44:44:FC:28',
    firmwareVersion: 'v2.4.0-edge-rt',
    activeWorkloads: 'vision-inspection, anomaly-detector-light',
    alertsCount: 1,
    alerts: [
      {
        id: 'alt-e08-1',
        severity: 'WARNING',
        message: 'CPU load spikes detected (>75%) during line 2 camera batch inspection cycles.',
        time: '18m ago'
      }
    ],
    recentTelemetry: {
      cpuHistory: [
        { time: '10m', value: 72 },
        { time: '8m', value: 78 },
        { time: '6m', value: 75 },
        { time: '4m', value: 80 },
        { time: '2m', value: 76 }
      ],
      tempHistory: [
        { time: '10m', value: 70 },
        { time: '8m', value: 71 },
        { time: '6m', value: 71 },
        { time: '4m', value: 72 },
        { time: '2m', value: 71 }
      ],
      netHistory: [
        { time: '10m', value: 104 },
        { time: '8m', value: 114 },
        { time: '6m', value: 108 },
        { time: '4m', value: 118 },
        { time: '2m', value: 110 }
      ]
    }
  }
];

export const EDGE_SUMMARY_CARDS: EdgeSummaryCardData[] = [
  {
    id: 'total',
    title: 'TOTAL EDGE DEVICES',
    value: '18',
    subtext: '4 Edge facilities',
    status: 'info',
    icon: 'Cpu',
    trend: { direction: 'up', value: '+2 new', isPositive: true }
  },
  {
    id: 'online',
    title: 'ONLINE',
    value: '15',
    subtext: 'Optimal state',
    status: 'healthy',
    icon: 'CheckCircle2',
    trend: { direction: 'neutral', value: '83.3%', isPositive: true }
  },
  {
    id: 'warning',
    title: 'WARNING',
    value: '2',
    subtext: 'High RAM / Load',
    status: 'warning',
    icon: 'AlertCircle',
    trend: { direction: 'neutral', value: '11.1%', isPositive: false }
  },
  {
    id: 'critical',
    title: 'CRITICAL',
    value: '1',
    subtext: 'EDGE-003 High Temp',
    status: 'critical',
    icon: 'AlertTriangle',
    trend: { direction: 'up', value: '82°C Thermal', isPositive: false }
  },
  {
    id: 'avg-cpu',
    title: 'AVERAGE CPU',
    value: '54.2%',
    subtext: 'Across edge fleet',
    status: 'info',
    icon: 'Activity',
    trend: { direction: 'up', value: '+1.4%', isPositive: false }
  },
  {
    id: 'avg-temp',
    title: 'AVG TEMPERATURE',
    value: '62.4°C',
    subtext: 'Rack ambient 28°C',
    status: 'warning',
    icon: 'Thermometer',
    trend: { direction: 'neutral', value: 'Normal band', isPositive: true }
  },
  {
    id: 'net-health',
    title: 'NETWORK HEALTH',
    value: '98.4%',
    subtext: '0.04% packet drop',
    status: 'healthy',
    icon: 'Wifi',
    trend: { direction: 'up', value: 'Low jitter', isPositive: true }
  },
  {
    id: 'locations',
    title: 'LOCATIONS',
    value: '4',
    subtext: 'Thane, Vashi, Mumbai, Pune',
    status: 'info',
    icon: 'MapPin',
    trend: { direction: 'neutral', value: 'All connected', isPositive: true }
  }
];

export const EDGE_LOCATION_TOPOLOGY: EdgeLocationTopologyNode[] = [
  {
    id: 'loc-thane',
    name: 'Thane',
    facility: 'Thane Central Edge Facility',
    deviceCount: 5,
    onlineCount: 5,
    warningCount: 0,
    criticalCount: 0,
    avgTemp: 61,
    avgCpu: 47,
    networkLatency: '8 ms',
    status: 'healthy',
    devices: ['EDGE-001', 'EDGE-002', 'EDGE-009', 'EDGE-010', 'EDGE-011']
  },
  {
    id: 'loc-vashi',
    name: 'Vashi',
    facility: 'Vashi Gateway Cluster & Vision Lab',
    deviceCount: 4,
    onlineCount: 3,
    warningCount: 0,
    criticalCount: 1,
    avgTemp: 71,
    avgCpu: 69,
    networkLatency: '14 ms',
    status: 'critical',
    devices: ['EDGE-003 (Critical)', 'EDGE-004', 'EDGE-012', 'EDGE-013']
  },
  {
    id: 'loc-mumbai',
    name: 'Mumbai',
    facility: 'Mumbai DC Edge Ingress Hub',
    deviceCount: 5,
    onlineCount: 4,
    warningCount: 1,
    criticalCount: 0,
    avgTemp: 60,
    avgCpu: 50,
    networkLatency: '4 ms',
    status: 'warning',
    devices: ['EDGE-005 (Warning)', 'EDGE-006', 'EDGE-014', 'EDGE-015', 'EDGE-016']
  },
  {
    id: 'loc-pune',
    name: 'Pune',
    facility: 'Pune Manufacturing PLC Hub',
    deviceCount: 4,
    onlineCount: 3,
    warningCount: 1,
    criticalCount: 0,
    avgTemp: 68,
    avgCpu: 67,
    networkLatency: '18 ms',
    status: 'warning',
    devices: ['EDGE-007', 'EDGE-008 (Warning)', 'EDGE-017', 'EDGE-018']
  }
];
