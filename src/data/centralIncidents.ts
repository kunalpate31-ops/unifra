import { AnalysisIncident } from '../types/analysis';
import { IncidentGroup } from '../types/alerts';

export const CENTRAL_ANALYSIS_INCIDENTS: AnalysisIncident[] = [
  {
    id: 'INC-PROD-API-001',
    title: 'Production API Performance Degradation',
    severity: 'High',
    status: 'Active',
    affectedResources: ['production-api-01', 'production-api-02', 'k8s-ingress-gateway', 'production-db'],
    relatedEventCount: 5,
    startedTime: '09:12 UTC (34 mins ago)',
    duration: '34m 18s',
    confidenceScore: 87,
    classification: 'Infrastructure Performance & Load Imbalance',
    primaryRootCause: 'High CPU utilization on production-api-01 (91%) is strongly correlated with increased API latency (245ms) and upstream 5xx errors (4.2%).',
    rootCauseHypothesis: 'Synchronous crypto hashing on auth worker thread blocking libuv event loop during 2.4x burst traffic, exhausting DB connection pool and causing ALB gateway timeouts.',
    timeline: [
      {
        id: 'TL-1',
        time: '09:12:04',
        title: 'CPU utilization increased to 91%',
        description: 'Host CPU spike detected on production-api-01 exceeding 85% threshold.',
        type: 'metric',
        severity: 'warning',
        resource: 'production-api-01'
      },
      {
        id: 'TL-2',
        time: '09:14:18',
        title: 'API P99 latency increased to 245ms',
        description: 'Synthetic health checks report response time degradation from 42ms to 245ms.',
        type: 'metric',
        severity: 'warning',
        resource: 'k8s-ingress-gateway'
      },
      {
        id: 'TL-3',
        time: '09:15:30',
        title: 'HTTP 5xx error rate increased to 4.2%',
        description: 'Upstream HTTP 504 Gateway Timeout responses surged past 0.50% threshold.',
        type: 'metric',
        severity: 'critical',
        resource: 'production-api-01'
      },
      {
        id: 'TL-4',
        time: '09:16:12',
        title: 'Production API alert triggered',
        description: 'Alert ALT-002 (High CPU) and ALT-004 (API latency) triggered concurrently.',
        type: 'alert',
        severity: 'critical',
        resource: 'production-api-01'
      },
      {
        id: 'TL-5',
        time: '09:17:00',
        title: 'Incident INC-PROD-API-001 created',
        description: 'UNIFRA AI Correlator aggregated 3 concurrent telemetry anomalies into unified incident.',
        type: 'incident',
        severity: 'critical',
        resource: 'production-api-01'
      }
    ],
    contributingFactors: [
      {
        id: 'CF-1',
        factor: 'High CPU Utilization (91.4%)',
        description: 'Node.js event loop saturation caused by synchronous JWT verification.',
        impact: 'High',
        confidence: 'High',
        metricEvidence: 'Threadpool wait queue: +340ms'
      },
      {
        id: 'CF-2',
        factor: 'Increased Request Volume (+240%)',
        description: 'Sudden surge from regional mobile client batch polling.',
        impact: 'High',
        confidence: 'High',
        metricEvidence: 'RPS increased from 2,100 to 5,040 req/s'
      },
      {
        id: 'CF-3',
        factor: 'Database Connection Queue (42 pending)',
        description: 'Client connection pool exhaustion delaying query return times.',
        impact: 'Medium',
        confidence: 'Medium',
        metricEvidence: 'Wait queue size: 42 connections'
      },
      {
        id: 'CF-4',
        factor: 'Container Workload Imbalance',
        description: 'production-api-01 receiving 68% of ingress traffic due to ALB session affinity.',
        impact: 'Medium',
        confidence: 'Medium',
        metricEvidence: 'Target group imbalance ratio: 2.1:1'
      }
    ],
    graphNodes: [
      { id: 'GN-1', label: 'Root Cause', type: 'root_cause', details: 'Auth CPU Event Loop Saturation', resource: 'production-api-01' },
      { id: 'GN-2', label: 'Infrastructure Condition', type: 'condition', details: 'Host CPU 91.4% / Pool Maxed', resource: 'production-api-01' },
      { id: 'GN-3', label: 'Telemetry Anomaly', type: 'anomaly', details: 'P99 Latency 245ms / 5xx Spike', resource: 'k8s-ingress-gateway' },
      { id: 'GN-4', label: 'Alert Triggered', type: 'alert', details: 'ALT-002 & ALT-004 Active', resource: 'production-api-01' },
      { id: 'GN-5', label: 'Application Impact', type: 'impact', details: 'Degraded User Checkout SLO', resource: 'production-api-01' }
    ],
    recommendedActions: [
      {
        id: 'RA-1',
        title: 'Optimize production-api-01 workload and rightsizing',
        description: 'Apply REC-2026-001 and trigger horizontal worker scaling to distribute queue load.',
        priority: 'Immediate',
        category: 'Compute'
      },
      {
        id: 'RA-2',
        title: 'Inspect recent auth microservice deployment',
        description: 'Check commit hash v1.4.12 for non-asynchronous bcrypt iterations in auth middleware.',
        priority: 'Immediate',
        category: 'Application'
      },
      {
        id: 'RA-3',
        title: 'Check Kubernetes ingress traffic distribution',
        description: 'Rebalance ALB target group cookie stickiness to round-robin to relieve host 01.',
        priority: 'Recommended',
        category: 'Networking'
      },
      {
        id: 'RA-4',
        title: 'Increase database connection pool limits',
        description: 'Scale max_connections on prod-aurora-cluster from 100 to 200.',
        priority: 'Follow-up',
        category: 'Database'
      }
    ]
  },
  {
    id: 'INC-2026-802',
    title: 'EDGE-003 Industrial Thermal Limit Breach',
    severity: 'Critical',
    status: 'Active',
    affectedResources: ['EDGE-003', 'EDGE-001', 'switch-core-rack-01'],
    relatedEventCount: 4,
    startedTime: '08:44 UTC (1h 02m ago)',
    duration: '1h 02m',
    confidenceScore: 92,
    classification: 'Edge Hardware Thermal & Sensor Throttling',
    primaryRootCause: 'Enclosure cooling fan failure on EDGE-003 caused thermal dissipation degradation to 82°C (threshold: 75°C), triggering GPU clock throttling and telemetry packet drops.',
    rootCauseHypothesis: 'Hardware cooling fan operating at 55% nominal RPM combined with continuous 4K video tensor inference on Jetson AGX module.',
    timeline: [
      {
        id: 'TL-201',
        time: '08:44:10',
        title: 'Fan RPM dropped below 60%',
        description: 'Sensor telemetry reported hardware fan tachometer drop on EDGE-003.',
        type: 'metric',
        severity: 'warning',
        resource: 'EDGE-003'
      },
      {
        id: 'TL-202',
        time: '08:52:30',
        title: 'SoC temperature exceeded 75°C threshold',
        description: 'Thermal core sensor crossed warning threshold, reaching 78.4°C.',
        type: 'metric',
        severity: 'warning',
        resource: 'EDGE-003'
      },
      {
        id: 'TL-203',
        time: '09:05:12',
        title: 'Peak thermal alert at 82°C',
        description: 'Critical Alert ALT-001 triggered: Edge temperature threshold exceeded.',
        type: 'alert',
        severity: 'critical',
        resource: 'EDGE-003'
      },
      {
        id: 'TL-204',
        time: '09:06:00',
        title: 'Incident INC-2026-802 created',
        description: 'Correlated hardware sensor degradation with inference latency spikes.',
        type: 'incident',
        severity: 'critical',
        resource: 'EDGE-003'
      }
    ],
    contributingFactors: [
      {
        id: 'CF-201',
        factor: 'Cooling Fan RPM Drop (55%)',
        description: 'Dust accumulation or mechanical bearing resistance in industrial enclosure.',
        impact: 'High',
        confidence: 'High',
        metricEvidence: 'Tachometer: 1,840 RPM vs 3,300 RPM target'
      },
      {
        id: 'CF-202',
        factor: 'High Inference Workload (94% GPU)',
        description: 'Concurrent video stream pipeline processing 4 HD camera feeds.',
        impact: 'High',
        confidence: 'High',
        metricEvidence: 'TensorRT GPU Core: 94.2%'
      },
      {
        id: 'CF-203',
        factor: 'Ambient Room Temperature (31°C)',
        description: 'Factory floor HVAC unit operating above normal 22°C ambient.',
        impact: 'Medium',
        confidence: 'Medium',
        metricEvidence: 'Chassis intake sensor: 31.4°C'
      }
    ],
    graphNodes: [
      { id: 'GN-201', label: 'Root Cause', type: 'root_cause', details: 'Cooling Fan Mechanical Fault', resource: 'EDGE-003' },
      { id: 'GN-202', label: 'Infrastructure Condition', type: 'condition', details: 'Thermal Chamber 82°C / Fan 55%', resource: 'EDGE-003' },
      { id: 'GN-203', label: 'Telemetry Anomaly', type: 'anomaly', details: 'SoC Clock Throttling (-35%)', resource: 'EDGE-003' },
      { id: 'GN-204', label: 'Alert Triggered', type: 'alert', details: 'ALT-001: Temp Exceeded', resource: 'EDGE-003' },
      { id: 'GN-205', label: 'Application Impact', type: 'impact', details: 'Edge Frame Dropping 18%', resource: 'EDGE-003' }
    ],
    recommendedActions: [
      {
        id: 'RA-201',
        title: 'Initiate workload failover to EDGE-001',
        description: 'Reroute video inference camera streams to adjacent online edge gateway.',
        priority: 'Immediate',
        category: 'Edge Compute'
      },
      {
        id: 'RA-202',
        title: 'Force cooling fan PWM curve to 100%',
        description: 'Apply ACT-2026-903 to bypass governor and maximize airflow.',
        priority: 'Immediate',
        category: 'Hardware Maintenance'
      }
    ]
  },
  {
    id: 'INC-2026-803',
    title: 'Database Committed Memory & Buffer Cache Strain',
    severity: 'High',
    status: 'Investigating',
    affectedResources: ['production-db', 'production-cache'],
    relatedEventCount: 3,
    startedTime: '07:30 UTC (2h 16m ago)',
    duration: '2h 16m',
    confidenceScore: 78,
    classification: 'Relational Database Buffer Saturation',
    primaryRootCause: 'Sequential table scans on unindexed telemetry partition evicted cached buffer pages, causing 3,450 IOPS spike.',
    rootCauseHypothesis: 'Nightly analytics cron job executed missing composite index query across 12M historical rows.',
    timeline: [
      {
        id: 'TL-401',
        time: '07:30:00',
        title: 'Nightly analytics job started',
        description: 'Cron batch initiated unindexed SELECT queries.',
        type: 'system',
        severity: 'info',
        resource: 'production-db'
      },
      {
        id: 'TL-402',
        time: '07:42:15',
        title: 'Buffer Cache Hit Ratio dropped to 84.1%',
        description: 'Disk IOPS surged past 3,000 IOPS as cache was exhausted.',
        type: 'metric',
        severity: 'warning',
        resource: 'production-db'
      },
      {
        id: 'TL-403',
        time: '07:45:00',
        title: 'Alert ALT-003 triggered',
        description: 'Production database memory usage high (88.4%).',
        type: 'alert',
        severity: 'warning',
        resource: 'production-db'
      }
    ],
    contributingFactors: [
      {
        id: 'CF-401',
        factor: 'Unindexed Table Scans',
        description: 'Missing composite index on telemetry_events (timestamp, resource_id).',
        impact: 'High',
        confidence: 'High',
        metricEvidence: 'Seq scans: 84 / 15 mins'
      }
    ],
    graphNodes: [
      { id: 'GN-401', label: 'Root Cause', type: 'root_cause', details: 'Unindexed Analytics Batch Job', resource: 'production-db' },
      { id: 'GN-402', label: 'Infrastructure Condition', type: 'condition', details: 'Buffer Cache Eviction (84%)', resource: 'production-db' },
      { id: 'GN-403', label: 'Telemetry Anomaly', type: 'anomaly', details: 'Disk IOPS Saturation 3,450', resource: 'production-db' },
      { id: 'GN-404', label: 'Alert Triggered', type: 'alert', details: 'ALT-003 DB Memory Warning', resource: 'production-db' },
      { id: 'GN-405', label: 'Application Impact', type: 'impact', details: 'Slow Query Execution (+40%)', resource: 'production-db' }
    ],
    recommendedActions: [
      {
        id: 'RA-401',
        title: 'Create composite index on telemetry_events',
        description: 'Run CREATE INDEX CONCURRENTLY on target table.',
        priority: 'Immediate',
        category: 'Database'
      }
    ]
  },
  {
    id: 'INC-2026-804',
    title: 'Core Switch Rack 02 Intermittent Packet Drops',
    severity: 'Medium',
    status: 'Investigating',
    affectedResources: ['switch-core-rack-02', 'switch-core-rack-01'],
    relatedEventCount: 3,
    startedTime: '08:15 UTC (1h 31m ago)',
    duration: '1h 31m',
    confidenceScore: 74,
    classification: 'Hybrid Switch Trunk Port Degradation',
    primaryRootCause: 'SFP+ optical transceiver CRC errors on trunk interface causing intermittent frame drops.',
    rootCauseHypothesis: 'Optical power degradation on fiber link between switch-core-rack-02 and spine aggregation.',
    timeline: [
      {
        id: 'TL-501',
        time: '08:15:20',
        title: 'Switch trunk frame CRC errors',
        description: 'Core switch reported 2.8% packet drops on 100GbE uplink.',
        type: 'metric',
        severity: 'warning',
        resource: 'switch-core-rack-02'
      },
      {
        id: 'TL-502',
        time: '08:20:00',
        title: 'Alert ALT-005 triggered',
        description: 'Network packet loss detected across switch-core-rack-02.',
        type: 'alert',
        severity: 'warning',
        resource: 'switch-core-rack-02'
      }
    ],
    contributingFactors: [
      {
        id: 'CF-501',
        factor: 'Optical Attenuation',
        description: 'Optical signal level dipped below -12 dBm.',
        impact: 'High',
        confidence: 'High',
        metricEvidence: 'Rx Optical Power: -13.2 dBm'
      }
    ],
    graphNodes: [
      { id: 'GN-501', label: 'Root Cause', type: 'root_cause', details: 'SFP+ Optical Attenuation', resource: 'switch-core-rack-02' },
      { id: 'GN-502', label: 'Infrastructure Condition', type: 'condition', details: 'Trunk Port CRC Discards', resource: 'switch-core-rack-02' },
      { id: 'GN-503', label: 'Telemetry Anomaly', type: 'anomaly', details: 'Packet Loss 2.80%', resource: 'switch-core-rack-02' },
      { id: 'GN-504', label: 'Alert Triggered', type: 'alert', details: 'ALT-005 Network Packet Loss', resource: 'switch-core-rack-02' },
      { id: 'GN-505', label: 'Application Impact', type: 'impact', details: 'Inter-Rack Sync Jitter', resource: 'switch-core-rack-02' }
    ],
    recommendedActions: [
      {
        id: 'RA-501',
        title: 'Trigger LACP failover to redundant spine link',
        description: 'Reroute active traffic to switch-core-rack-01.',
        priority: 'Immediate',
        category: 'Networking'
      }
    ]
  }
];

export function toIncidentGroup(inc: AnalysisIncident): IncidentGroup {
  return {
    id: inc.id,
    title: inc.title,
    severity: inc.severity,
    affectedResources: inc.affectedResources,
    alertIds: inc.timeline.filter((t) => t.type === 'alert').map((t) => t.id),
    alertCount: inc.relatedEventCount,
    startedAt: inc.startedTime,
    duration: inc.duration,
    status: inc.status === 'Mitigated' ? 'Investigating' : inc.status,
    hypothesis: inc.rootCauseHypothesis,
    mitigationStep: inc.recommendedActions[0]?.title || 'Review recommendations'
  };
}
