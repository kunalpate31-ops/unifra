import React, { createContext, useContext, useState, useMemo, useEffect, ReactNode, useRef } from 'react';
import {
  CENTRAL_RESOURCES,
  CentralResourceItem,
  toInventoryResource,
  toEdgeDevice,
  toLiveTelemetryRow,
  toInfrastructureResource
} from '../data/centralResources';
import {
  CENTRAL_ALERTS,
  toSystemAlert
} from '../data/centralAlerts';
import {
  CENTRAL_ANALYSIS_INCIDENTS,
  toIncidentGroup
} from '../data/centralIncidents';
import {
  CENTRAL_RECOMMENDATIONS,
  toAIRecommendation
} from '../data/centralRecommendations';
import {
  CENTRAL_CONTROL_ACTIONS,
  CENTRAL_SCHEDULED_AUTOMATIONS,
  CENTRAL_RECENT_CONTROL_ACTIVITIES,
  CENTRAL_ACTION_IMPACT_METRICS
} from '../data/centralControlActions';
import {
  CENTRAL_MONTHLY_COST_TREND,
  CENTRAL_COST_CATEGORIES,
  CENTRAL_RESOURCE_COSTS,
  CENTRAL_COST_ANOMALIES,
  CENTRAL_COST_OPPORTUNITIES,
  CENTRAL_COST_ENVIRONMENTS,
  CENTRAL_COST_SUMMARY_METRICS
} from '../data/centralCost';
import {
  CENTRAL_AUDIT_LOGS,
  CENTRAL_SYSTEM_HEALTH_ENGINES
} from '../data/centralAudit';

import { InventoryResource } from '../types/resources';
import { EdgeDevice } from '../types/edge';
import { LiveTelemetryRow } from '../types/monitoring';
import { InfrastructureResource, SystemAlert, AIRecommendation } from '../types/dashboard';
import { AlertItem, IncidentGroup } from '../types/alerts';
import { AnalysisIncident } from '../types/analysis';
import { RecommendationItem } from '../types/recommendations';
import {
  ControlActionItem,
  ScheduledAutomationItem,
  RecentControlActivityItem,
  ActionImpactMetrics
} from '../types/actions';
import {
  MonthlyCostTrend,
  CostCategoryBreakdown,
  ResourceCostItem,
  CostAnomalyItem,
  CostOptimizationOpportunity,
  CostEnvironmentItem,
  CostSummaryMetrics
} from '../types/cost';
import { AuditLogItem, SystemEngineHealthItem } from '../types/audit';

export interface SimulationLogEntry {
  time: string;
  text: string;
  level: 'info' | 'warning' | 'critical' | 'success';
}

export interface SimulationState {
  isActive: boolean;
  isModalOpen: boolean;
  currentStep: number; // 0 = not started, 1..11 = steps
  stepStatus: 'idle' | 'running' | 'paused_approval' | 'executing' | 'completed';
  autoPlay: boolean;
  executionProgress: number;
  executionSubStep: string;
  simulationLogs: SimulationLogEntry[];
}

const DEMO_STORAGE_KEY = 'unifra_demo_state_v1';

interface PersistedDemoState {
  resources: CentralResourceItem[];
  alerts: AlertItem[];
  analysisIncidents: AnalysisIncident[];
  recommendations: RecommendationItem[];
  controlActions: ControlActionItem[];
  recentActivities: RecentControlActivityItem[];
  costOpportunities: CostOptimizationOpportunity[];
  costSummaryMetrics: CostSummaryMetrics;
  auditLogs: AuditLogItem[];
  simulationState: SimulationState;
}

const getInitialPersistedState = (): PersistedDemoState | null => {
  try {
    const saved = localStorage.getItem(DEMO_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Failed to load persisted demo state', e);
  }
  return null;
};

interface DemoDataContextType {
  // Master Datasets
  resources: CentralResourceItem[];
  alerts: AlertItem[];
  analysisIncidents: AnalysisIncident[];
  incidents: IncidentGroup[];
  recommendations: RecommendationItem[];
  controlActions: ControlActionItem[];
  scheduledAutomations: ScheduledAutomationItem[];
  recentActivities: RecentControlActivityItem[];
  actionImpactMetrics: ActionImpactMetrics;
  costTrends: MonthlyCostTrend[];
  costCategories: CostCategoryBreakdown[];
  resourceCosts: ResourceCostItem[];
  costAnomalies: CostAnomalyItem[];
  costOpportunities: CostOptimizationOpportunity[];
  costEnvironments: CostEnvironmentItem[];
  costSummaryMetrics: CostSummaryMetrics;
  auditLogs: AuditLogItem[];
  engineHealth: SystemEngineHealthItem[];

  // Global State
  lastUpdated: string;
  isRefreshing: boolean;

  // View Adapters (Derived seamlessly)
  inventoryResources: InventoryResource[];
  edgeDevices: EdgeDevice[];
  liveTelemetryRows: LiveTelemetryRow[];
  dashboardResources: InfrastructureResource[];
  systemAlerts: SystemAlert[];
  dashboardRecommendations: AIRecommendation[];
  activeAlertCount: number;

  // Simulation Engine (Main Scenario)
  simulationState: SimulationState;
  isResetModalOpen: boolean;
  openResetModal: () => void;
  closeResetModal: () => void;
  openSimulationModal: () => void;
  closeSimulationModal: () => void;
  startIncidentSimulation: () => void;
  advanceSimulationStep: () => void;
  approveSimulationAction: () => void;
  rejectSimulationAction: () => void;
  toggleAutoPlay: () => void;
  resetDemoScenario: () => void;

  // Cross-Page Shared Mutators
  refreshAllData: () => void;
  updateIncidentConfidence: (incidentId: string, delta: number) => void;
  acknowledgeAlert: (alertId: string, user?: string) => void;
  resolveAlert: (alertId: string) => void;
  approveControlAction: (actionId: string, user?: string) => void;
  rejectControlAction: (actionId: string) => void;
  executeControlAction: (actionId: string) => void;
  applyRecommendation: (recommendationId: string) => void;
  dismissRecommendation: (recommendationId: string) => void;
  applyCostOpportunity: (opportunityId: string) => void;
  dismissCostOpportunity: (opportunityId: string) => void;
  addAuditLog: (entry: Omit<AuditLogItem, 'id' | 'timestamp'>) => void;
}

const DemoDataContext = createContext<DemoDataContextType | undefined>(undefined);

export const DemoDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const persisted = useMemo(() => getInitialPersistedState(), []);

  // Master active React State across the whole application (hydrated from localStorage if available)
  const [resources, setResources] = useState<CentralResourceItem[]>(() => persisted?.resources || CENTRAL_RESOURCES);
  const [alerts, setAlerts] = useState<AlertItem[]>(() => persisted?.alerts || CENTRAL_ALERTS);
  const [analysisIncidents, setAnalysisIncidents] = useState<AnalysisIncident[]>(() => persisted?.analysisIncidents || CENTRAL_ANALYSIS_INCIDENTS);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(() => persisted?.recommendations || CENTRAL_RECOMMENDATIONS);
  const [controlActions, setControlActions] = useState<ControlActionItem[]>(() => persisted?.controlActions || CENTRAL_CONTROL_ACTIONS);
  const [scheduledAutomations] = useState<ScheduledAutomationItem[]>(CENTRAL_SCHEDULED_AUTOMATIONS);
  const [recentActivities, setRecentActivities] = useState<RecentControlActivityItem[]>(() => persisted?.recentActivities || CENTRAL_RECENT_CONTROL_ACTIVITIES);
  const [actionImpactMetrics] = useState<ActionImpactMetrics>(CENTRAL_ACTION_IMPACT_METRICS);
  const [costTrends] = useState<MonthlyCostTrend[]>(CENTRAL_MONTHLY_COST_TREND);
  const [costCategories] = useState<CostCategoryBreakdown[]>(CENTRAL_COST_CATEGORIES);
  const [resourceCosts] = useState<ResourceCostItem[]>(CENTRAL_RESOURCE_COSTS);
  const [costAnomalies] = useState<CostAnomalyItem[]>(CENTRAL_COST_ANOMALIES);
  const [costOpportunities, setCostOpportunities] = useState<CostOptimizationOpportunity[]>(() => persisted?.costOpportunities || CENTRAL_COST_OPPORTUNITIES);
  const [costEnvironments] = useState<CostEnvironmentItem[]>(CENTRAL_COST_ENVIRONMENTS);
  const [costSummaryMetrics, setCostSummaryMetrics] = useState<CostSummaryMetrics>(() => persisted?.costSummaryMetrics || CENTRAL_COST_SUMMARY_METRICS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => persisted?.auditLogs || CENTRAL_AUDIT_LOGS);
  const [engineHealth] = useState<SystemEngineHealthItem[]>(CENTRAL_SYSTEM_HEALTH_ENGINES);

  const [lastUpdated, setLastUpdated] = useState('Just now');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Simulation State
  const [simulationState, setSimulationState] = useState<SimulationState>(() => persisted?.simulationState || {
    isActive: false,
    isModalOpen: false,
    currentStep: 0,
    stepStatus: 'idle',
    autoPlay: true,
    executionProgress: 0,
    executionSubStep: '',
    simulationLogs: []
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Synchronize state changes to localStorage for persistent DEMO MODE
  useEffect(() => {
    try {
      const snapshot: PersistedDemoState = {
        resources,
        alerts,
        analysisIncidents,
        recommendations,
        controlActions,
        recentActivities,
        costOpportunities,
        costSummaryMetrics,
        auditLogs,
        simulationState
      };
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(snapshot));
    } catch (e) {
      console.warn('Failed to persist demo state to localStorage', e);
    }
  }, [
    resources,
    alerts,
    analysisIncidents,
    recommendations,
    controlActions,
    recentActivities,
    costOpportunities,
    costSummaryMetrics,
    auditLogs,
    simulationState
  ]);

  // Derived view models
  const incidents = useMemo(() => analysisIncidents.map(toIncidentGroup), [analysisIncidents]);
  const inventoryResources = useMemo(() => resources.map(toInventoryResource), [resources]);
  const edgeDevices = useMemo(() => resources.filter((r) => r.category === 'Edge').map(toEdgeDevice), [resources]);
  const liveTelemetryRows = useMemo(() => resources.map(toLiveTelemetryRow), [resources]);
  const dashboardResources = useMemo(() => resources.map(toInfrastructureResource), [resources]);
  const systemAlerts = useMemo(() => alerts.map(toSystemAlert), [alerts]);
  const dashboardRecommendations = useMemo(() => recommendations.map(toAIRecommendation), [recommendations]);
  const activeAlertCount = useMemo(() => alerts.filter((a) => a.status === 'Active').length, [alerts]);

  // Append Audit Log Helper
  const addAuditLog = (entry: Omit<AuditLogItem, 'id' | 'timestamp'>) => {
    const newLog: AuditLogItem = {
      ...entry,
      id: `AUD-2026-${1013 + auditLogs.length}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const addSimLog = (text: string, level: SimulationLogEntry['level'] = 'info') => {
    const now = new Date().toTimeString().slice(0, 8);
    setSimulationState((prev) => ({
      ...prev,
      simulationLogs: [{ time: now, text, level }, ...prev.simulationLogs]
    }));
  };

  // Refresh all data
  const refreshAllData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated('Just now');
      setIsRefreshing(false);
    }, 450);
  };

  // ----------------------------------------------------
  // SIMULATION CONTROLLER (Scenario: Production API Incident)
  // ----------------------------------------------------

  const openSimulationModal = () => {
    setSimulationState((prev) => ({ ...prev, isModalOpen: true }));
  };

  const closeSimulationModal = () => {
    setSimulationState((prev) => ({ ...prev, isModalOpen: false }));
  };

  const openResetModal = () => setIsResetModalOpen(true);
  const closeResetModal = () => setIsResetModalOpen(false);

  const toggleAutoPlay = () => {
    setSimulationState((prev) => ({ ...prev, autoPlay: !prev.autoPlay }));
  };

  // Reset demo scenario
  const resetDemoScenario = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    try {
      localStorage.removeItem(DEMO_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear demo state from localStorage', e);
    }
    setResources(CENTRAL_RESOURCES);
    setAlerts(CENTRAL_ALERTS);
    setAnalysisIncidents(CENTRAL_ANALYSIS_INCIDENTS);
    setRecommendations(CENTRAL_RECOMMENDATIONS);
    setControlActions(CENTRAL_CONTROL_ACTIONS);
    setRecentActivities(CENTRAL_RECENT_CONTROL_ACTIVITIES);
    setCostOpportunities(CENTRAL_COST_OPPORTUNITIES);
    setCostSummaryMetrics(CENTRAL_COST_SUMMARY_METRICS);
    setAuditLogs(CENTRAL_AUDIT_LOGS);
    setSimulationState({
      isActive: false,
      isModalOpen: false,
      currentStep: 0,
      stepStatus: 'idle',
      autoPlay: true,
      executionProgress: 0,
      executionSubStep: '',
      simulationLogs: [
        {
          time: new Date().toTimeString().slice(0, 8),
          text: 'Demo scenario reset to canonical baseline state.',
          level: 'info'
        }
      ]
    });
    setLastUpdated('Just now');
  };

  // Step 1: Telemetry Anomaly
  const runStep1_TelemetryAnomaly = () => {
    setSimulationState((prev) => ({
      ...prev,
      isActive: true,
      currentStep: 1,
      stepStatus: 'running'
    }));

    setResources((prev) =>
      prev.map((r) =>
        r.name === 'production-api-01'
          ? {
              ...r,
              cpu: 91,
              memory: 78,
              apiLatency: '245 ms',
              errorRate: '4.20%',
              status: 'Warning',
              workload: 'Authentication Service & Token Cryptography (High CPU)',
              recentTelemetry: [
                { time: 'Just now', cpu: 91, mem: 78 },
                ...r.recentTelemetry.slice(0, 4)
              ]
            }
          : r
      )
    );

    addSimLog('Collecting live telemetry... Anomaly detected on production-api-01: CPU 91.2%, Latency 245ms, Error Rate 4.20%', 'warning');

    addAuditLog({
      actor: 'Telemetry Ingestion Daemon',
      actorType: 'System',
      activity: 'Telemetry anomaly detected on production-api-01',
      resource: 'production-api-01',
      source: 'AWS',
      severity: 'Warning',
      status: 'Success',
      description: 'Ingestion pipeline flagged CPU saturation (91.2%) and P99 API latency breach (245ms).'
    });

    if (simulationState.autoPlay) {
      timerRef.current = setTimeout(() => runStep2_AlertGenerated(), 1400);
    }
  };

  // Step 2: Alert Generated
  const runStep2_AlertGenerated = () => {
    setSimulationState((prev) => ({
      ...prev,
      currentStep: 2,
      stepStatus: 'running'
    }));

    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id === 'ALT-002') {
          return {
            ...a,
            status: 'Active',
            severity: 'Critical',
            currentValue: '91.2%',
            startedAt: 'Just now',
            description: 'CPU utilization reached 91.2% (exceeds threshold 75%). P99 API latency degraded to 245ms with 4.2% 5xx errors.'
          };
        }
        if (a.id === 'ALT-004') {
          return {
            ...a,
            status: 'Active',
            severity: 'High',
            currentValue: '245 ms',
            startedAt: 'Just now'
          };
        }
        return a;
      })
    );

    addSimLog('Alerts triggered: High CPU on production-api-01 (ALT-002) and elevated API latency (ALT-004) set to Active.', 'critical');

    addAuditLog({
      actor: 'Alert Evaluation Daemon',
      actorType: 'Alert',
      activity: 'Active alerts generated for production API cluster',
      resource: 'production-api-01',
      source: 'AWS',
      severity: 'Critical',
      status: 'Success',
      description: 'Threshold breach ALT-002 (91.2% CPU > 75%) and ALT-004 (245ms latency) dispatched to incident pipeline.',
      relatedAlertId: 'ALT-002: High CPU on production-api-01'
    });

    if (simulationState.autoPlay) {
      timerRef.current = setTimeout(() => runStep3_IncidentCreated(), 1400);
    }
  };

  // Step 3: Incident Created
  const runStep3_IncidentCreated = () => {
    setSimulationState((prev) => ({
      ...prev,
      currentStep: 3,
      stepStatus: 'running'
    }));

    setAnalysisIncidents((prev) =>
      prev.map((inc) =>
        inc.id === 'INC-PROD-API-001'
          ? {
              ...inc,
              status: 'Active',
              severity: 'High',
              relatedEventCount: 3,
              startedTime: 'Just now',
              title: 'Production API Performance Degradation',
              affectedResources: ['production-api-01', 'production-api-02', 'k8s-ingress-gateway'],
              rootCauseHypothesis: 'Incident correlated from 3 related alerts (High CPU, elevated P99 latency, 5xx error rate).'
            }
          : inc
      )
    );

    addSimLog('Incident correlated: INC-PROD-API-001 (Production API Performance Degradation) created from 3 related alerts across production-api-01, production-api-02, and k8s-ingress-gateway.', 'warning');

    addAuditLog({
      actor: 'AI Incident Correlator',
      actorType: 'AI',
      activity: 'Incident INC-PROD-API-001 correlated from active alert cluster',
      resource: 'production-api-01',
      source: 'AWS',
      severity: 'Critical',
      status: 'Success',
      description: 'Correlated 3 active alerts into unified incident INC-PROD-API-001.',
      relatedIncidentId: 'INC-PROD-API-001: Production API Degradation'
    });

    if (simulationState.autoPlay) {
      timerRef.current = setTimeout(() => runStep4_RootCauseAnalysis(), 1500);
    }
  };

  // Step 4: Root Cause Analysis
  const runStep4_RootCauseAnalysis = () => {
    setSimulationState((prev) => ({
      ...prev,
      currentStep: 4,
      stepStatus: 'running'
    }));

    addSimLog('Collecting telemetry... Correlating alerts... Analyzing dependencies... Evaluating anomalies... Generating root cause hypothesis...', 'info');
    addSimLog('Probable Root Cause (87% confidence): High CPU utilization on production-api-01 is correlated with increased API latency and elevated 5xx errors. [Classification: Infrastructure Performance]', 'success');

    addAuditLog({
      actor: 'Root Cause Analysis Engine',
      actorType: 'AI',
      activity: 'Root cause analysis hypothesis produced with 87% confidence',
      resource: 'production-api-01',
      source: 'AWS',
      severity: 'Info',
      status: 'Success',
      description: 'AI model isolated auth worker event loop contention on production-api-01 as primary driver of P99 degradation.'
    });

    if (simulationState.autoPlay) {
      timerRef.current = setTimeout(() => runStep5_RecommendationGenerated(), 1500);
    }
  };

  // Step 5: AI Recommendation
  const runStep5_RecommendationGenerated = () => {
    setSimulationState((prev) => ({
      ...prev,
      currentStep: 5,
      stepStatus: 'running'
    }));

    setRecommendations((prev) =>
      prev.map((r) =>
        r.id === 'REC-2026-001'
          ? {
              ...r,
              title: 'Optimize production-api-01 workload',
              priority: 'High',
              category: 'Performance',
              status: 'New',
              confidence: 'High',
              reason: 'Review workload distribution and rightsizing of production-api-01.',
              expectedImpact: 'Reduced CPU utilization (91% → 58%), reduced API latency (245ms → 118ms), reduced 5xx errors (4.2% → 0.6%)',
              estimatedMonthlySavings: 82
            }
          : r
      )
    );

    addSimLog('AI recommendation REC-2026-001 generated: Optimize production-api-01 workload (Estimated savings: $82/mo). Status: New.', 'success');

    addAuditLog({
      actor: 'AI Recommendation Engine',
      actorType: 'Recommendation',
      activity: 'Optimization recommendation REC-2026-001 drafted',
      resource: 'production-api-01',
      source: 'AWS',
      severity: 'Info',
      status: 'Success',
      description: 'Proposed workload rightsizing for production-api-01 with $82/mo projected savings and latency reduction.',
      relatedRecommendationId: 'REC-2026-001: Optimize production-api-01'
    });

    if (simulationState.autoPlay) {
      timerRef.current = setTimeout(() => runStep6_ActionAwaitingApproval(), 1500);
    }
  };

  // Step 6 & 7: Control Action & Awaiting Approval (PAUSES HERE)
  const runStep6_ActionAwaitingApproval = () => {
    setControlActions((prev) =>
      prev.map((act) =>
        act.id === 'ACT-2026-901'
          ? {
              ...act,
              action: 'Optimize production-api-01',
              type: 'Optimization',
              risk: 'Medium',
              status: 'Pending',
              reason: 'High CPU utilization is contributing to API latency and error rate.',
              expectedState: 'Lower CPU (~58%), lower latency (~118 ms), reduced errors (~0.6%)'
            }
          : act
      )
    );

    setSimulationState((prev) => ({
      ...prev,
      currentStep: 6,
      stepStatus: 'paused_approval'
    }));

    addSimLog('Control action ACT-2026-901 queued: "Optimize production-api-01". Status: Pending Approval. Simulation PAUSED for operator review.', 'warning');

    addAuditLog({
      actor: 'Automation Policy Engine',
      actorType: 'Control Action',
      activity: 'Control action ACT-2026-901 submitted for operator elevation',
      resource: 'production-api-01',
      source: 'AWS',
      severity: 'Warning',
      status: 'Success',
      description: 'Medium-risk remediation queued awaiting operator approval.',
      relatedActionId: 'ACT-2026-901: Optimize production-api-01'
    });
  };

  // Step 7/8: Explicit User Approval
  const approveSimulationAction = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setControlActions((prev) =>
      prev.map((act) => (act.id === 'ACT-2026-901' ? { ...act, status: 'Approved' } : act))
    );

    addSimLog('User approved action ACT-2026-901. Launching simulated remediation workflow...', 'success');

    addAuditLog({
      actor: 'Demo Operator (KP)',
      actorType: 'User',
      activity: 'Operator approved control action ACT-2026-901',
      resource: 'production-api-01',
      source: 'AWS',
      severity: 'Info',
      status: 'Success',
      description: 'Authorized execution of optimization action for production-api-01.',
      relatedActionId: 'ACT-2026-901: Optimize production-api-01'
    });

    runStep8_SimulatedExecution();
  };

  const rejectSimulationAction = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setControlActions((prev) =>
      prev.map((act) => (act.id === 'ACT-2026-901' ? { ...act, status: 'Rejected' } : act))
    );

    setSimulationState((prev) => ({
      ...prev,
      stepStatus: 'idle'
    }));

    addSimLog('Operator rejected action ACT-2026-901. Remediation halted.', 'warning');

    addAuditLog({
      actor: 'Demo Operator (KP)',
      actorType: 'User',
      activity: 'Operator rejected control action ACT-2026-901',
      resource: 'production-api-01',
      source: 'AWS',
      severity: 'Warning',
      status: 'Failed',
      description: 'Declined execution of ACT-2026-901.',
      relatedActionId: 'ACT-2026-901: Optimize production-api-01'
    });
  };

  // Step 8: Simulated Execution Stages
  const runStep8_SimulatedExecution = () => {
    setSimulationState((prev) => ({
      ...prev,
      currentStep: 8,
      stepStatus: 'executing',
      executionProgress: 10,
      executionSubStep: 'Preparing action...'
    }));

    addSimLog('[Execution Engine] Preparing action...', 'info');

    setTimeout(() => {
      setSimulationState((prev) => ({
        ...prev,
        executionProgress: 35,
        executionSubStep: 'Validating resource...'
      }));
      addSimLog('[Execution Engine] Validating resource target health...', 'info');
    }, 700);

    setTimeout(() => {
      setSimulationState((prev) => ({
        ...prev,
        executionProgress: 60,
        executionSubStep: 'Applying optimization...'
      }));
      addSimLog('[Execution Engine] Applying optimization (rebalancing worker threads)...', 'info');
    }, 1400);

    setTimeout(() => {
      setSimulationState((prev) => ({
        ...prev,
        executionProgress: 85,
        executionSubStep: 'Monitoring response...'
      }));
      addSimLog('[Execution Engine] Monitoring response and verifying P99 metrics...', 'info');
    }, 2100);

    setTimeout(() => {
      setSimulationState((prev) => ({
        ...prev,
        executionProgress: 100,
        executionSubStep: 'Verifying result...'
      }));
      addSimLog('[Execution Engine] Verifying result... All checks passed successfully!', 'success');
      runStep9_Recovery();
    }, 2800);
  };

  // Step 9: Infrastructure Recovery
  const runStep9_Recovery = () => {
    setSimulationState((prev) => ({
      ...prev,
      currentStep: 9,
      stepStatus: 'running'
    }));

    setResources((prev) =>
      prev.map((r) =>
        r.name === 'production-api-01'
          ? {
              ...r,
              cpu: 58,
              memory: 46,
              apiLatency: '118 ms',
              errorRate: '0.60%',
              status: 'Healthy',
              workload: 'Authentication Service & Token Cryptography (Optimized)',
              recentTelemetry: [
                { time: 'Just now', cpu: 58, mem: 46 },
                ...r.recentTelemetry.slice(0, 4)
              ]
            }
          : r
      )
    );

    addSimLog('Infrastructure recovered: production-api-01 CPU 91% → 58%, Latency 245ms → 118ms, 5xx errors 4.2% → 0.60%. Status: Healthy.', 'success');

    addAuditLog({
      actor: 'Telemetry Ingestion Daemon',
      actorType: 'System',
      activity: 'Telemetry recovered to nominal levels on production-api-01',
      resource: 'production-api-01',
      source: 'AWS',
      severity: 'Info',
      status: 'Success',
      description: 'Resource telemetry restored within healthy thresholds (58% CPU, 118ms latency).'
    });

    if (simulationState.autoPlay) {
      timerRef.current = setTimeout(() => runStep10_IncidentResolved(), 1500);
    }
  };

  // Step 10: Incident Resolved & Recommendation Applied
  const runStep10_IncidentResolved = () => {
    setSimulationState((prev) => ({
      ...prev,
      currentStep: 10,
      stepStatus: 'running'
    }));

    setAnalysisIncidents((prev) =>
      prev.map((inc) => (inc.id === 'INC-PROD-API-001' ? { ...inc, status: 'Resolved' } : inc))
    );

    setAlerts((prev) =>
      prev.map((a) => (a.id === 'ALT-002' || a.id === 'ALT-004' ? { ...a, status: 'Resolved' } : a))
    );

    setRecommendations((prev) =>
      prev.map((r) => (r.id === 'REC-2026-001' ? { ...r, status: 'Applied' } : r))
    );

    setControlActions((prev) =>
      prev.map((act) => (act.id === 'ACT-2026-901' ? { ...act, status: 'Completed' } : act))
    );

    addSimLog('Incident INC-PROD-API-001 marked Resolved. Active alerts marked Resolved. Recommendation REC-2026-001 Applied. Control action ACT-2026-901 Completed.', 'success');

    addAuditLog({
      actor: 'AI Incident Correlator',
      actorType: 'AI',
      activity: 'Incident INC-PROD-API-001 marked Resolved',
      resource: 'production-api-01',
      source: 'AWS',
      severity: 'Info',
      status: 'Success',
      description: 'Incident resolved following successful automated execution of ACT-2026-901.',
      relatedIncidentId: 'INC-PROD-API-001: Production API Degradation'
    });

    if (simulationState.autoPlay) {
      timerRef.current = setTimeout(() => runStep11_AuditCompleted(), 1500);
    }
  };

  // Step 11: Complete & Audit Trail
  const runStep11_AuditCompleted = () => {
    setSimulationState((prev) => ({
      ...prev,
      currentStep: 11,
      stepStatus: 'completed'
    }));

    addSimLog('Audit events logged: Full 8-stage telemetry, alert, incident, RCA, recommendation, and control action trail written to /audit. Incident Demo Complete!', 'success');

    addAuditLog({
      actor: 'Audit & Compliance Engine',
      actorType: 'System',
      activity: 'Incident simulation completed and fully audited',
      resource: 'production-api-01',
      source: 'AWS',
      severity: 'Info',
      status: 'Success',
      description: 'Full end-to-end incident lifecycle successfully simulated and validated across all UNIFRA intelligence systems.'
    });
  };

  // Manual Step Advancer
  const advanceSimulationStep = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const step = simulationState.currentStep;
    if (step === 0) runStep1_TelemetryAnomaly();
    else if (step === 1) runStep2_AlertGenerated();
    else if (step === 2) runStep3_IncidentCreated();
    else if (step === 3) runStep4_RootCauseAnalysis();
    else if (step === 4) runStep5_RecommendationGenerated();
    else if (step === 5) runStep6_ActionAwaitingApproval();
    else if (step === 6) approveSimulationAction();
    else if (step === 7) runStep8_SimulatedExecution();
    else if (step === 8) runStep9_Recovery();
    else if (step === 9) runStep10_IncidentResolved();
    else if (step === 10) runStep11_AuditCompleted();
  };

  const startIncidentSimulation = () => {
    runStep1_TelemetryAnomaly();
  };

  // ----------------------------------------------------
  // INDIVIDUAL USER MUTATORS
  // ----------------------------------------------------

  const updateIncidentConfidence = (incidentId: string, delta: number) => {
    setAnalysisIncidents((prev) =>
      prev.map((inc) =>
        inc.id === incidentId
          ? {
              ...inc,
              confidenceScore: Math.min(99, Math.max(0, inc.confidenceScore + delta)),
              lastAnalyzed: 'Just now'
            }
          : inc
      )
    );
  };

  const acknowledgeAlert = (alertId: string, user: string = 'Demo Operator (KP)') => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'Acknowledged' as const } : a))
    );

    const targetAlert = alerts.find((a) => a.id === alertId);
    if (targetAlert) {
      addAuditLog({
        actor: user,
        actorType: 'User',
        activity: `Demo Operator acknowledged alert ${alertId}`,
        resource: targetAlert.resource,
        source: targetAlert.source === 'Application' ? 'System' : targetAlert.source,
        severity: 'Info',
        status: 'Success',
        description: `Alert ${alertId} (${targetAlert.title}) was acknowledged. Investigation in progress.`,
        relatedAlertId: `${alertId}: ${targetAlert.title}`
      });
    }
  };

  const resolveAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'Resolved' as const } : a))
    );

    const targetAlert = alerts.find((a) => a.id === alertId);
    if (targetAlert) {
      setResources((prev) =>
        prev.map((r) => {
          if (r.name === targetAlert.resource) {
            return {
              ...r,
              status: 'Healthy',
              temperature: r.temperature && r.temperature > 70 ? 48 : r.temperature,
              cpu: r.cpu > 70 ? 42 : r.cpu,
              network: r.network.includes('degraded') ? '45 Mbps' : r.network,
              errorRate: '0.00%'
            };
          }
          return r;
        })
      );

      if (targetAlert.incidentId) {
        setAnalysisIncidents((prev) =>
          prev.map((inc) =>
            inc.id === targetAlert.incidentId ? { ...inc, status: 'Resolved' as const } : inc
          )
        );
      }

      addAuditLog({
        actor: 'Demo Operator (KP)',
        actorType: 'User',
        activity: `Resolved alert ${alertId}`,
        resource: targetAlert.resource,
        source: targetAlert.source === 'Application' ? 'System' : targetAlert.source,
        severity: 'Info',
        status: 'Success',
        description: `Alert ${alertId} resolved. Target resource ${targetAlert.resource} verified healthy.`,
        relatedAlertId: `${alertId}: ${targetAlert.title}`
      });
    }
  };

  const approveControlAction = (actionId: string, user: string = 'Demo Operator (KP)') => {
    setControlActions((prev) =>
      prev.map((act) => (act.id === actionId ? { ...act, status: 'Approved' as const } : act))
    );

    const targetAction = controlActions.find((a) => a.id === actionId);
    if (targetAction) {
      addAuditLog({
        actor: user,
        actorType: 'User',
        activity: `Control action approved: ${targetAction.action}`,
        resource: targetAction.resource,
        source: targetAction.source,
        severity: 'Info',
        status: 'Success',
        description: `Operator authorized execution of ${actionId} (${targetAction.action}).`,
        relatedActionId: `${actionId}: ${targetAction.action}`,
        relatedRecommendationId: targetAction.relatedRecommendationId,
        relatedIncidentId: targetAction.relatedIncidentId
      });
    }
  };

  const rejectControlAction = (actionId: string) => {
    setControlActions((prev) =>
      prev.map((act) => (act.id === actionId ? { ...act, status: 'Rejected' as const } : act))
    );

    const targetAction = controlActions.find((a) => a.id === actionId);
    if (targetAction) {
      addAuditLog({
        actor: 'Demo Operator (KP)',
        actorType: 'User',
        activity: `Control action rejected: ${targetAction.action}`,
        resource: targetAction.resource,
        source: targetAction.source,
        severity: 'Warning',
        status: 'Failed',
        description: `Operator declined execution of ${actionId}.`,
        relatedActionId: `${actionId}: ${targetAction.action}`
      });
    }
  };

  const executeControlAction = (actionId: string) => {
    setControlActions((prev) =>
      prev.map((act) => (act.id === actionId ? { ...act, status: 'Completed' as const } : act))
    );

    const targetAction = controlActions.find((a) => a.id === actionId);
    if (targetAction) {
      if (targetAction.resource === 'EDGE-003') {
        setResources((prev) =>
          prev.map((r) =>
            r.name === 'EDGE-003'
              ? {
                  ...r,
                  status: 'Healthy',
                  temperature: 52,
                  cpu: 48,
                  memory: 56,
                  disk: 65,
                  network: '45 Mbps',
                  errorRate: '0.00%'
                }
              : r
          )
        );
        setAlerts((prev) =>
          prev.map((a) => (a.id === 'ALT-001' ? { ...a, status: 'Resolved' as const } : a))
        );
        setAnalysisIncidents((prev) =>
          prev.map((inc) => (inc.id === 'INC-2026-802' ? { ...inc, status: 'Resolved' as const } : inc))
        );
      } else if (targetAction.resource === 'production-api-01') {
        setResources((prev) =>
          prev.map((r) =>
            r.name === 'production-api-01'
              ? {
                  ...r,
                  status: 'Healthy',
                  cpu: 58,
                  memory: 46,
                  apiLatency: '118 ms',
                  errorRate: '0.60%',
                  monthlyCost: 280 - 82,
                  costFormatted: `$${280 - 82}/mo`
                }
              : r
          )
        );
        setAlerts((prev) =>
          prev.map((a) => (a.id === 'ALT-002' ? { ...a, status: 'Resolved' as const } : a))
        );
        setAnalysisIncidents((prev) =>
          prev.map((inc) => (inc.id === 'INC-PROD-API-001' ? { ...inc, status: 'Resolved' as const } : inc))
        );
      } else if (targetAction.resource === 'docker-worker-02') {
        setResources((prev) =>
          prev.map((r) =>
            r.name === 'docker-worker-02'
              ? { ...r, status: 'Healthy', cpu: 38, memory: 46, errorRate: '0.00%' }
              : r
          )
        );
        setAlerts((prev) =>
          prev.map((a) => (a.id === 'ALT-006' ? { ...a, status: 'Resolved' as const } : a))
        );
      } else if (targetAction.resource === 'k8s-ingress-gateway') {
        setResources((prev) =>
          prev.map((r) =>
            r.name === 'k8s-ingress-gateway'
              ? { ...r, status: 'Healthy', cpu: 48, apiLatency: '28 ms', errorRate: '0.00%' }
              : r
          )
        );
        setAlerts((prev) =>
          prev.map((a) => (a.id === 'ALT-004' ? { ...a, status: 'Resolved' as const } : a))
        );
      }

      setRecentActivities((prev) => [
        {
          id: `ACT-LOG-${Date.now().toString().slice(-4)}`,
          time: 'Just now',
          user: 'Demo Operator (KP)',
          action: targetAction.action,
          resource: targetAction.resource,
          result: 'Completed'
        },
        ...prev
      ]);

      addAuditLog({
        actor: 'Automation Engine',
        actorType: 'Control Action',
        activity: `Simulated remediation completed: ${targetAction.action}`,
        resource: targetAction.resource,
        source: targetAction.source,
        severity: 'Info',
        status: 'Success',
        description: `Action ${actionId} successfully executed in demo mode. Resource telemetry restored to healthy limits.`,
        relatedActionId: `${actionId}: ${targetAction.action}`
      });
    }
  };

  const applyRecommendation = (recId: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === recId ? { ...r, status: 'Applied' as const } : r))
    );

    const targetRec = recommendations.find((r) => r.id === recId);
    if (targetRec) {
      addAuditLog({
        actor: 'Demo Operator (KP)',
        actorType: 'User',
        activity: `Recommendation applied: ${targetRec.title}`,
        resource: targetRec.affectedResource,
        source: targetRec.source,
        severity: 'Info',
        status: 'Success',
        description: `Applied optimization ${recId} for ${targetRec.affectedResource}.`,
        relatedRecommendationId: `${recId}: ${targetRec.title}`
      });
    }
  };

  const dismissRecommendation = (recId: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === recId ? { ...r, status: 'Dismissed' as const } : r))
    );
  };

  const applyCostOpportunity = (oppId: string) => {
    setCostOpportunities((prev) =>
      prev.map((o) => (o.id === oppId ? { ...o, status: 'Applied' as const } : o))
    );

    const targetOpp = costOpportunities.find((o) => o.id === oppId);
    if (targetOpp) {
      setCostSummaryMetrics((prev) => ({
        ...prev,
        monthlyCloudCost: prev.monthlyCloudCost - targetOpp.monthlySavings,
        potentialSavings: Math.max(0, prev.potentialSavings - targetOpp.monthlySavings)
      }));

      addAuditLog({
        actor: 'Demo Operator (KP)',
        actorType: 'User',
        activity: `FinOps opportunity applied: ${targetOpp.title}`,
        resource: targetOpp.resource,
        source: 'AWS',
        severity: 'Info',
        status: 'Success',
        description: `Captured estimated recurring savings of $${targetOpp.monthlySavings}/mo on ${targetOpp.resource}.`,
        metadata: {
          'Monthly Savings': `$${targetOpp.monthlySavings}/mo`,
          'Yearly Savings': `$${targetOpp.yearlySavings}/yr`
        }
      });
    }
  };

  const dismissCostOpportunity = (oppId: string) => {
    setCostOpportunities((prev) =>
      prev.map((o) => (o.id === oppId ? { ...o, status: 'Dismissed' as const } : o))
    );
  };

  return (
    <DemoDataContext.Provider
      value={{
        resources,
        alerts,
        analysisIncidents,
        incidents,
        recommendations,
        controlActions,
        scheduledAutomations,
        recentActivities,
        actionImpactMetrics,
        costTrends,
        costCategories,
        resourceCosts,
        costAnomalies,
        costOpportunities,
        costEnvironments,
        costSummaryMetrics,
        auditLogs,
        engineHealth,
        lastUpdated,
        isRefreshing,
        inventoryResources,
        edgeDevices,
        liveTelemetryRows,
        dashboardResources,
        systemAlerts,
        dashboardRecommendations,
        activeAlertCount,
        simulationState,
        isResetModalOpen,
        openResetModal,
        closeResetModal,
        openSimulationModal,
        closeSimulationModal,
        startIncidentSimulation,
        advanceSimulationStep,
        approveSimulationAction,
        rejectSimulationAction,
        toggleAutoPlay,
        resetDemoScenario,
        refreshAllData,
        updateIncidentConfidence,
        acknowledgeAlert,
        resolveAlert,
        approveControlAction,
        rejectControlAction,
        executeControlAction,
        applyRecommendation,
        dismissRecommendation,
        applyCostOpportunity,
        dismissCostOpportunity,
        addAuditLog
      }}
    >
      {children}
    </DemoDataContext.Provider>
  );
};

export const useDemoData = (): DemoDataContextType => {
  const context = useContext(DemoDataContext);
  if (!context) {
    throw new Error('useDemoData must be used within a DemoDataProvider');
  }
  return context;
};
