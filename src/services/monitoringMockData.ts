import {
  MonitoringResourceScope,
  MonitoringTimeRange,
  MonitoringSummaryMetric,
  CpuTelemetryPoint,
  MemoryTelemetryPoint,
  NetworkTrafficPoint,
  ApiPerformancePoint,
  EdgeTemperaturePoint,
  LiveTelemetryRow
} from '../types/monitoring';

export const INITIAL_SUMMARY_METRICS: MonitoringSummaryMetric[] = [
  {
    id: 'cpu',
    title: 'CPU USAGE',
    value: '62%',
    progressPercent: 62,
    trend: { direction: 'up', value: '+1.8%', isPositive: false },
    status: 'warning',
    icon: 'Cpu'
  },
  {
    id: 'memory',
    title: 'MEMORY USAGE',
    value: '68%',
    progressPercent: 68,
    trend: { direction: 'up', value: '+0.6%', isPositive: false },
    status: 'warning',
    icon: 'HardDrive'
  },
  {
    id: 'disk',
    title: 'DISK USAGE',
    value: '54%',
    progressPercent: 54,
    trend: { direction: 'neutral', value: 'Steady', isPositive: true },
    status: 'healthy',
    icon: 'Server'
  },
  {
    id: 'network',
    title: 'NETWORK TRAFFIC',
    value: '1.24 Gbps',
    trend: { direction: 'up', value: '+42 Mbps', isPositive: true },
    status: 'healthy',
    icon: 'Wifi'
  },
  {
    id: 'temperature',
    title: 'EDGE TEMPERATURE',
    value: '64°C',
    progressPercent: 64,
    trend: { direction: 'up', value: 'Avg rack', isPositive: false },
    status: 'warning',
    icon: 'Thermometer'
  },
  {
    id: 'requests',
    title: 'API REQUESTS',
    value: '12.4K/min',
    trend: { direction: 'up', value: '+210 req', isPositive: true },
    status: 'healthy',
    icon: 'Activity'
  },
  {
    id: 'latency',
    title: 'P99 API LATENCY',
    value: '142 ms',
    trend: { direction: 'down', value: '-8 ms', isPositive: true },
    status: 'warning',
    icon: 'Clock'
  },
  {
    id: 'errors',
    title: 'ERROR RATE',
    value: '1.8%',
    progressPercent: 18,
    trend: { direction: 'up', value: '+0.3%', isPositive: false },
    status: 'warning',
    icon: 'AlertOctagon'
  }
];

export function getPointCount(range: MonitoringTimeRange): { count: number; intervalSecs: number } {
  switch (range) {
    case '15m':
      return { count: 16, intervalSecs: 60 };
    case '1h':
      return { count: 18, intervalSecs: 200 };
    case '6h':
      return { count: 20, intervalSecs: 1080 };
    case '24h':
      return { count: 24, intervalSecs: 3600 };
  }
}

export function generateCpuData(
  scope: MonitoringResourceScope,
  range: MonitoringTimeRange
): { points: CpuTelemetryPoint[]; current: number; average: number; peak: number; threshold: number } {
  const { count, intervalSecs } = getPointCount(range);
  const now = new Date();
  const points: CpuTelemetryPoint[] = [];

  let base = 62;
  if (scope === 'AWS') base = 58;
  if (scope === 'Edge') base = 74;
  if (scope === 'On-Premise') base = 52;
  if (scope === 'Docker') base = 66;
  if (scope === 'Kubernetes') base = 44;

  let sum = 0;
  let max = 0;

  for (let i = count - 1; i >= 0; i--) {
    const t = new Date(now.getTime() - i * intervalSecs * 1000);
    const timeLabel = t.toTimeString().substring(0, 5);
    const wave = Math.sin(i * 0.4) * 8;
    const noise = (Math.cos(i * 0.7) * 4) + (i === count - 1 ? 0 : (Math.sin(i) * 3));
    const val = Math.min(96, Math.max(20, Math.round(base + wave + noise)));
    const avgVal = Math.round(base - 4 + Math.sin(i * 0.2) * 2);

    sum += val;
    if (val > max) max = val;

    points.push({
      timestamp: timeLabel,
      cpu: val,
      avgCpu: avgVal
    });
  }

  const current = points[points.length - 1].cpu;
  const average = Math.round(sum / points.length);
  const peak = Math.max(max, 78);

  return { points, current, average, peak, threshold: 85 };
}

export function generateMemoryData(
  scope: MonitoringResourceScope,
  range: MonitoringTimeRange
): { points: MemoryTelemetryPoint[]; current: number; average: number; peak: number; warning: number } {
  const { count, intervalSecs } = getPointCount(range);
  const now = new Date();
  const points: MemoryTelemetryPoint[] = [];

  let base = 68;
  if (scope === 'AWS') base = 66;
  if (scope === 'Edge') base = 72;
  if (scope === 'On-Premise') base = 59;
  if (scope === 'Docker') base = 61;
  if (scope === 'Kubernetes') base = 48;

  let sum = 0;
  let max = 0;

  for (let i = count - 1; i >= 0; i--) {
    const t = new Date(now.getTime() - i * intervalSecs * 1000);
    const timeLabel = t.toTimeString().substring(0, 5);
    const val = Math.min(94, Math.max(30, Math.round(base + Math.sin(i * 0.3) * 4 + (i === 2 ? 6 : 0))));
    const avgVal = Math.round(base - 4);

    sum += val;
    if (val > max) max = val;

    points.push({
      timestamp: timeLabel,
      memory: val,
      avgMemory: avgVal
    });
  }

  const current = points[points.length - 1].memory;
  const average = Math.round(sum / points.length);
  const peak = Math.max(max, 74);

  return { points, current, average, peak, warning: 80 };
}

export function generateNetworkData(
  scope: MonitoringResourceScope,
  range: MonitoringTimeRange
): { points: NetworkTrafficPoint[]; currentInbound: number; currentOutbound: number } {
  const { count, intervalSecs } = getPointCount(range);
  const now = new Date();
  const points: NetworkTrafficPoint[] = [];

  let baseIn = 143;
  let baseOut = 98;

  if (scope === 'AWS') {
    baseIn = 290;
    baseOut = 210;
  } else if (scope === 'Edge') {
    baseIn = 78;
    baseOut = 44;
  }

  for (let i = count - 1; i >= 0; i--) {
    const t = new Date(now.getTime() - i * intervalSecs * 1000);
    const timeLabel = t.toTimeString().substring(0, 5);
    const inVal = Math.max(10, Math.round(baseIn + Math.sin(i * 0.5) * 15 + Math.cos(i) * 5));
    const outVal = Math.max(8, Math.round(baseOut + Math.cos(i * 0.4) * 12 + Math.sin(i * 0.8) * 4));

    points.push({
      timestamp: timeLabel,
      inbound: inVal,
      outbound: outVal
    });
  }

  return {
    points,
    currentInbound: points[points.length - 1].inbound,
    currentOutbound: points[points.length - 1].outbound
  };
}

export function generateApiPerformanceData(range: MonitoringTimeRange): {
  points: ApiPerformancePoint[];
  currentReqRate: string;
  currentP99Latency: number;
  currentErrorRate: number;
} {
  const { count, intervalSecs } = getPointCount(range);
  const now = new Date();
  const points: ApiPerformancePoint[] = [];

  for (let i = count - 1; i >= 0; i--) {
    const t = new Date(now.getTime() - i * intervalSecs * 1000);
    const timeLabel = t.toTimeString().substring(0, 5);

    const reqRate = Number((12.4 + Math.sin(i * 0.4) * 0.8 + (Math.random() * 0.2 - 0.1)).toFixed(1));
    const latency = Math.round(129 + Math.sin(i * 0.6) * 18 + (i === 1 ? 45 : 0));
    const errorRate = Number((0.6 + (i === 1 ? 0.9 : Math.sin(i * 0.8) * 0.2)).toFixed(2));

    points.push({
      timestamp: timeLabel,
      requestRate: reqRate,
      p99Latency: latency,
      errorRate: Math.max(0.08, errorRate)
    });
  }

  const last = points[points.length - 1];
  return {
    points,
    currentReqRate: `${last.requestRate}K/min`,
    currentP99Latency: last.p99Latency,
    currentErrorRate: last.errorRate
  };
}

export function generateEdgeTemperatureData(range: MonitoringTimeRange): {
  points: EdgeTemperaturePoint[];
  edge001: number;
  edge002: number;
  edge003: number;
  edge004: number;
  threshold: number;
} {
  const { count, intervalSecs } = getPointCount(range);
  const now = new Date();
  const points: EdgeTemperaturePoint[] = [];

  for (let i = count - 1; i >= 0; i--) {
    const t = new Date(now.getTime() - i * intervalSecs * 1000);
    const timeLabel = t.toTimeString().substring(0, 5);

    const t1 = Math.round(58 + Math.sin(i * 0.3) * 2);
    const t2 = Math.round(64 + Math.cos(i * 0.4) * 2.5);
    // EDGE-003 is critical (>75°C threshold)
    const t3 = Math.round(79 + Math.sin(i * 0.5) * 2.5 + (i === 2 ? 2 : 0));
    const t4 = Math.round(61 + Math.sin(i * 0.2) * 1.8);

    points.push({
      timestamp: timeLabel,
      edge001: t1,
      edge002: t2,
      edge003: Math.max(76, t3),
      edge004: t4
    });
  }

  const last = points[points.length - 1];
  return {
    points,
    edge001: last.edge001,
    edge002: last.edge002,
    edge003: last.edge003,
    edge004: last.edge004,
    threshold: 75
  };
}

export const INITIAL_LIVE_TELEMETRY: LiveTelemetryRow[] = [
  {
    id: 'tele-01',
    timestamp: '22:47:12',
    resource: 'EDGE-001',
    type: 'Edge Device',
    cpu: 43,
    memory: 51,
    network: '82 Mbps',
    latency: '104 ms',
    temperature: '58°C',
    errorRate: '0.02%',
    status: 'Healthy',
    location: 'Mumbai Gateway 1',
    ipAddress: '192.168.10.4',
    provider: 'Edge',
    workload: 'sensor-aggregator, mqtt-broker'
  },
  {
    id: 'tele-02',
    timestamp: '22:47:12',
    resource: 'EDGE-003',
    type: 'Edge Device',
    cpu: 94,
    memory: 82,
    network: '124 Mbps',
    latency: '380 ms',
    temperature: '79°C',
    errorRate: '4.85%',
    status: 'Critical',
    location: 'Mumbai Gateway 2',
    ipAddress: '192.168.10.12',
    provider: 'Edge',
    workload: 'vision-ml-infer, high-fps-stream'
  },
  {
    id: 'tele-03',
    timestamp: '22:47:11',
    resource: 'production-api-01',
    type: 'EC2',
    cpu: 54,
    memory: 61,
    network: '214 Mbps',
    latency: '129 ms',
    temperature: '—',
    errorRate: '0.12%',
    status: 'Healthy',
    location: 'us-east-1a',
    ipAddress: '10.0.14.88',
    provider: 'AWS',
    workload: 'api-gateway, auth-service'
  },
  {
    id: 'tele-04',
    timestamp: '22:47:10',
    resource: 'production-db',
    type: 'RDS',
    cpu: 72,
    memory: 68,
    network: '180 Mbps',
    latency: '142 ms',
    temperature: '—',
    errorRate: '0.85%',
    status: 'Warning',
    location: 'us-east-1b',
    ipAddress: '10.0.32.10',
    provider: 'AWS',
    workload: 'PostgreSQL 16.2 Read/Write Cluster'
  },
  {
    id: 'tele-05',
    timestamp: '22:47:09',
    resource: 'docker-worker-02',
    type: 'Docker',
    cpu: 67,
    memory: 59,
    network: '96 Mbps',
    latency: '48 ms',
    temperature: '—',
    errorRate: '0.04%',
    status: 'Healthy',
    location: 'On-Premise Host 2',
    ipAddress: '172.24.1.45',
    provider: 'On-Premise',
    workload: 'celery-async-queue, redis-cache'
  },
  {
    id: 'tele-06',
    timestamp: '22:47:08',
    resource: 'k8s-ingress-gateway',
    type: 'Kubernetes',
    cpu: 38,
    memory: 45,
    network: '310 Mbps',
    latency: '32 ms',
    temperature: '—',
    errorRate: '0.01%',
    status: 'Healthy',
    location: 'us-east-1 (EKS)',
    ipAddress: '10.0.12.9',
    provider: 'AWS',
    workload: 'ingress-nginx-controller'
  },
  {
    id: 'tele-07',
    timestamp: '22:47:08',
    resource: 'switch-core-rack-02',
    type: 'Switch',
    cpu: 24,
    memory: 38,
    network: '580 Mbps',
    latency: '2 ms',
    temperature: '42°C',
    errorRate: '0.00%',
    status: 'Healthy',
    location: 'On-Premise DC Rack 4',
    ipAddress: '10.100.1.1',
    provider: 'On-Premise',
    workload: 'VLAN Trunks, LACP, SNMP v3'
  },
  {
    id: 'tele-08',
    timestamp: '22:47:07',
    resource: 'EDGE-002',
    type: 'Edge Device',
    cpu: 52,
    memory: 58,
    network: '64 Mbps',
    latency: '95 ms',
    temperature: '64°C',
    errorRate: '0.05%',
    status: 'Healthy',
    location: 'Pune Facility Rack 1',
    ipAddress: '192.168.20.8',
    provider: 'Edge',
    workload: 'telemetry-agent, canbus-logger'
  },
  {
    id: 'tele-09',
    timestamp: '22:47:06',
    resource: 'EDGE-004',
    type: 'Edge Device',
    location: 'Pune Facility Rack 2',
    cpu: 48,
    memory: 50,
    network: '70 Mbps',
    latency: '112 ms',
    temperature: '61°C',
    errorRate: '0.03%',
    status: 'Healthy',
    ipAddress: '192.168.20.14',
    provider: 'Edge',
    workload: 'bms-rack-monitor, power-meter'
  }
];

/**
 * Step function to simulate gradual, realistic telemetry fluctuations:
 * e.g. CPU 62 -> 64 -> 63 -> 66 -> 65
 * EDGE-003 remains unhealthy (CPU 90-95%, Memory 80-85%, Temp 77-80°C, Error 4-5%)
 */
export function stepTelemetryRow(row: LiveTelemetryRow): LiveTelemetryRow {
  const now = new Date();
  const timeStr = now.toTimeString().substring(0, 8);

  if (row.resource === 'EDGE-003') {
    // Keep EDGE-003 critically elevated
    const deltaCpu = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
    const nextCpu = Math.min(96, Math.max(91, row.cpu + deltaCpu));

    const deltaMem = Math.floor(Math.random() * 3) - 1;
    const nextMem = Math.min(85, Math.max(80, row.memory + deltaMem));

    const deltaTemp = Math.floor(Math.random() * 3) - 1;
    const curTemp = parseInt(row.temperature.replace('°C', '')) || 79;
    const nextTemp = Math.min(80, Math.max(77, curTemp + deltaTemp));

    const deltaLat = Math.floor(Math.random() * 11) - 5;
    const curLat = parseInt(row.latency.replace(' ms', '')) || 380;
    const nextLat = Math.min(410, Math.max(360, curLat + deltaLat));

    const curErr = parseFloat(row.errorRate.replace('%', '')) || 4.85;
    const deltaErr = (Math.random() * 0.2 - 0.1);
    const nextErr = Math.min(5.5, Math.max(4.1, curErr + deltaErr)).toFixed(2);

    return {
      ...row,
      timestamp: timeStr,
      cpu: nextCpu,
      memory: nextMem,
      temperature: `${nextTemp}°C`,
      latency: `${nextLat} ms`,
      errorRate: `${nextErr}%`,
      status: 'Critical'
    };
  }

  // Normal subtle drift for healthy/warning nodes
  const deltaCpu = (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.4 ? 1 : 2);
  const nextCpu = Math.min(88, Math.max(18, row.cpu + deltaCpu));

  const deltaMem = Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0;
  const nextMem = Math.min(86, Math.max(22, row.memory + deltaMem));

  // Network drift
  const curNet = parseInt(row.network.replace(' Mbps', '')) || 100;
  const deltaNet = Math.floor(Math.random() * 9) - 4; // -4 to +4
  const nextNet = Math.max(15, curNet + deltaNet);

  // Latency drift
  const curLat = parseInt(row.latency.replace(' ms', '')) || 50;
  const deltaLat = Math.floor(Math.random() * 5) - 2;
  const nextLat = Math.max(2, curLat + deltaLat);

  // Error rate drift
  const curErr = parseFloat(row.errorRate.replace('%', '')) || 0.05;
  const deltaErr = (Math.random() * 0.02 - 0.01);
  const nextErr = Math.min(2.5, Math.max(0.01, curErr + deltaErr)).toFixed(2);

  // Temp drift if applicable
  let nextTempStr = row.temperature;
  if (row.temperature !== '—') {
    const curTemp = parseInt(row.temperature.replace('°C', '')) || 55;
    const deltaTemp = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
    nextTempStr = `${Math.min(74, Math.max(38, curTemp + deltaTemp))}°C`;
  }

  // Status computation based on CPU/RAM thresholds
  let nextStatus: LiveTelemetryRow['status'] = 'Healthy';
  if (nextCpu > 85 || nextMem > 85) nextStatus = 'Critical';
  else if (nextCpu > 70 || nextMem > 70) nextStatus = 'Warning';

  return {
    ...row,
    timestamp: timeStr,
    cpu: nextCpu,
    memory: nextMem,
    network: `${nextNet} Mbps`,
    latency: `${nextLat} ms`,
    temperature: nextTempStr,
    errorRate: `${nextErr}%`,
    status: nextStatus
  };
}
