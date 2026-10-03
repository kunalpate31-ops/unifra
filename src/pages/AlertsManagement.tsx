import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { AlertSummaryCards } from '../components/alerts/AlertSummaryCards';
import { IncidentCorrelationSection } from '../components/alerts/IncidentCorrelationSection';
import { AlertFilterBar } from '../components/alerts/AlertFilterBar';
import { AlertInventoryTable } from '../components/alerts/AlertInventoryTable';
import { AlertManagementModal } from '../components/modals/AlertManagementModal';
import { useDemoData } from '../context/DemoDataContext';

import {
  AlertSeverity,
  AlertStatus,
  AlertSource,
  AlertTimeRange,
  AlertItem,
  AlertSummaryMetrics
} from '../types/alerts';

import { RefreshCw, Bell, CheckCircle2 } from 'lucide-react';

export const AlertsManagement: React.FC = () => {
  const navigate = useNavigate();
  const {
    alerts,
    incidents,
    acknowledgeAlert,
    resolveAlert,
    activeAlertCount,
    lastUpdated,
    isRefreshing,
    refreshAllData
  } = useDemoData();

  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);

  // Filters State
  const [severityFilter, setSeverityFilter] = useState<AlertSeverity | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<AlertStatus | 'All'>('All');
  const [sourceFilter, setSourceFilter] = useState<AlertSource>('All');
  const [timeRange, setTimeRange] = useState<AlertTimeRange>('Last 24 hours');
  const [searchQuery, setSearchQuery] = useState('');

  // UI toast
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Action: Acknowledge Alert
  const handleAcknowledgeAlert = (alertId: string) => {
    acknowledgeAlert(alertId);
    if (selectedAlert && selectedAlert.id === alertId) {
      setSelectedAlert((prev) => (prev ? { ...prev, status: 'Acknowledged' } : null));
    }
    setNotificationToast(`Alert ${alertId} has been acknowledged.`);
    setTimeout(() => setNotificationToast(null), 3000);
  };

  // Action: Resolve Alert
  const handleResolveAlert = (alertId: string) => {
    resolveAlert(alertId);
    if (selectedAlert && selectedAlert.id === alertId) {
      setSelectedAlert((prev) => (prev ? { ...prev, status: 'Resolved' } : null));
    }
    setNotificationToast(`Alert ${alertId} marked as Resolved.`);
    setTimeout(() => setNotificationToast(null), 3000);
  };

  // Compute Metrics dynamically
  const summaryMetrics: AlertSummaryMetrics = useMemo(() => {
    const active = alerts.filter((a) => a.status === 'Active');
    const critical = alerts.filter((a) => a.severity === 'Critical');
    const high = alerts.filter((a) => a.severity === 'High');
    const warning = alerts.filter((a) => a.severity === 'Medium');
    const acknowledged = alerts.filter((a) => a.status === 'Acknowledged');
    const resolved = alerts.filter((a) => a.status === 'Resolved');

    // unique affected resources
    const uniqueResources = new Set(
      alerts.filter((a) => a.status !== 'Resolved').map((a) => a.resource)
    );

    return {
      activeCount: active.length,
      criticalCount: critical.length,
      highCount: high.length,
      warningCount: warning.length,
      acknowledgedCount: acknowledged.length,
      resolvedCount: resolved.length,
      affectedResourcesCount: uniqueResources.size,
      mttrMinutes: '14.2 min'
    };
  }, [alerts]);

  // Filter alerts
  const filteredAlerts = alerts.filter((alert) => {
    // 1. Severity filter
    if (severityFilter !== 'All' && alert.severity !== severityFilter) {
      return false;
    }

    // 2. Status filter
    if (statusFilter !== 'All' && alert.status !== statusFilter) {
      return false;
    }

    // 3. Source filter
    if (sourceFilter !== 'All' && alert.source !== sourceFilter) {
      return false;
    }

    // 4. Incident grouping filter
    if (selectedIncidentId) {
      const targetInc = incidents.find((inc) => inc.id === selectedIncidentId);
      if (targetInc && !targetInc.alertIds.includes(alert.id)) {
        return false;
      }
    }

    // 5. Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = alert.title.toLowerCase().includes(q);
      const matchResource = alert.resource.toLowerCase().includes(q);
      const matchDesc = alert.description.toLowerCase().includes(q);
      const matchSource = alert.source.toLowerCase().includes(q);
      const matchHypothesis = alert.hypothesis.toLowerCase().includes(q);
      return matchTitle || matchResource || matchDesc || matchSource || matchHypothesis;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500/30">
      {/* Top Universal Navbar */}
      <Navbar
        lastUpdated={lastUpdated}
        onRefresh={refreshAllData}
        isRefreshing={isRefreshing}
        alertCount={activeAlertCount}
        onOpenAlerts={() => {
          if (alerts.length > 0) setSelectedAlert(alerts[0]);
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Top Header */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>Alerts & Incidents</span>
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
                <Bell className="w-3 h-3 animate-bounce" />
                CORRELATION ENGINE: ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Centralized infrastructure alerts, correlated incident groups and automated triage guidance.
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap self-end sm:self-auto">
            {/* Active Alert Count Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="text-slate-500">Active Alerts:</span>
              <span className="font-bold text-rose-400">{summaryMetrics.activeCount}</span>
            </div>

            {/* Demo Mode Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ● DEMO MODE
            </div>

            {/* Refresh Button */}
            <button
              onClick={refreshAllData}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-semibold shadow-md shadow-indigo-900/30 transition-all focus:outline-none"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </section>

        {/* Action Toast Feedback */}
        {notificationToast && (
          <div className="p-2.5 rounded-lg bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{notificationToast}</span>
            </div>
            <span className="text-[10px] text-emerald-400/80">Demo State Synced</span>
          </div>
        )}

        {/* 1. TOP SUMMARY CARDS (8 cards) */}
        <section aria-label="Alert Summary Metrics">
          <AlertSummaryCards metrics={summaryMetrics} />
        </section>

        {/* 2. INCIDENT CORRELATION SECTION */}
        <section aria-label="Correlated Incident Groups">
          <IncidentCorrelationSection
            incidents={incidents}
            selectedIncidentId={selectedIncidentId}
            onSelectIncident={(incId) =>
              setSelectedIncidentId(selectedIncidentId === incId ? null : incId)
            }
          />
        </section>

        {/* 3. ALERT FILTERS */}
        <section aria-label="Alert Filters">
          <AlertFilterBar
            currentSeverity={severityFilter}
            onSeverityChange={setSeverityFilter}
            currentStatus={statusFilter}
            onStatusChange={setStatusFilter}
            currentSource={sourceFilter}
            onSourceChange={setSourceFilter}
            currentTimeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filteredCount={filteredAlerts.length}
            totalCount={alerts.length}
          />
        </section>

        {/* 4. ALERT INVENTORY TABLE */}
        <section aria-label="Alerts Inventory Table">
          <AlertInventoryTable
            alerts={filteredAlerts}
            onSelectAlert={(alert) => setSelectedAlert(alert)}
            onAcknowledgeAlert={handleAcknowledgeAlert}
            onResolveAlert={handleResolveAlert}
          />
        </section>
      </main>

      {/* Alert Management Detailed Inspection Modal */}
      <AlertManagementModal
        alert={selectedAlert}
        allAlerts={alerts}
        onClose={() => setSelectedAlert(null)}
        onAcknowledge={handleAcknowledgeAlert}
        onResolve={handleResolveAlert}
        onViewResource={(_resourceName, source) => {
          if (source === 'Edge') {
            navigate('/edge');
          } else {
            navigate('/resources');
          }
        }}
        onViewMetrics={() => navigate('/monitoring')}
      />
    </div>
  );
};
