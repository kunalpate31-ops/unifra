import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { AuditSummaryCards } from '../components/audit/AuditSummaryCards';
import { AuditFilterBar } from '../components/audit/AuditFilterBar';
import { AuditLogTable } from '../components/audit/AuditLogTable';
import { AuditTimelineSection } from '../components/audit/AuditTimelineSection';
import { SystemHealthActivitySection } from '../components/audit/SystemHealthActivitySection';
import { AuditDetailModal } from '../components/modals/AuditDetailModal';
import { useDemoData } from '../context/DemoDataContext';

import {
  AuditActorType,
  AuditSeverity,
  AuditStatus,
  AuditTimeRange,
  AuditLogItem,
  AuditSummaryMetrics
} from '../types/audit';

import {
  FileText,
  Download,
  CheckCircle2
} from 'lucide-react';

export const AuditLogs: React.FC = () => {
  const navigate = useNavigate();
  const {
    auditLogs,
    engineHealth,
    activeAlertCount,
    lastUpdated,
    isRefreshing,
    refreshAllData
  } = useDemoData();

  const [selectedLog, setSelectedLog] = useState<AuditLogItem | null>(null);

  // Filters State
  const [currentType, setCurrentType] = useState<AuditActorType | 'All'>('All');
  const [currentSeverity, setCurrentSeverity] = useState<AuditSeverity | 'All'>('All');
  const [currentStatus, setCurrentStatus] = useState<AuditStatus | 'All'>('All');
  const [currentTimeRange, setCurrentTimeRange] = useState<AuditTimeRange>('Last 24 hours');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter computation
  const filteredLogs = useMemo(() => {
    return auditLogs.filter((item) => {
      if (currentType !== 'All' && item.actorType !== currentType) {
        return false;
      }
      if (currentSeverity !== 'All' && item.severity !== currentSeverity) {
        return false;
      }
      if (currentStatus !== 'All' && item.status !== currentStatus) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQuery =
          item.id.toLowerCase().includes(query) ||
          item.actor.toLowerCase().includes(query) ||
          item.activity.toLowerCase().includes(query) ||
          item.resource.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.source.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }
      return true;
    });
  }, [auditLogs, currentType, currentSeverity, currentStatus, searchQuery]);

  // Metrics computation (8 cards)
  const metrics: AuditSummaryMetrics = useMemo(() => {
    return {
      totalEvents: auditLogs.length,
      userActions: auditLogs.filter((l) => l.actorType === 'User').length,
      aiActions: auditLogs.filter((l) => l.actorType === 'AI').length,
      infrastructureEvents: auditLogs.filter((l) => l.actorType === 'Infrastructure').length,
      alertsGenerated: auditLogs.filter((l) => l.actorType === 'Alert').length,
      recommendationsCount: auditLogs.filter((l) => l.actorType === 'Recommendation').length,
      controlActionsCount: auditLogs.filter((l) => l.actorType === 'Control Action').length,
      failedActionsCount: auditLogs.filter((l) => l.status === 'Failed').length
    };
  }, [auditLogs]);

  // CSV Export Handler
  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Timestamp',
      'Actor',
      'ActorType',
      'Activity',
      'Resource',
      'Source',
      'Severity',
      'Status',
      'Description',
      'IP_Address',
      'Related_Alert',
      'Related_Recommendation',
      'Related_Incident',
      'Related_Action'
    ];

    const rows = filteredLogs.map((log) => [
      `"${log.id}"`,
      `"${log.timestamp}"`,
      `"${log.actor.replace(/"/g, '""')}"`,
      `"${log.actorType}"`,
      `"${log.activity.replace(/"/g, '""')}"`,
      `"${log.resource}"`,
      `"${log.source}"`,
      `"${log.severity}"`,
      `"${log.status}"`,
      `"${log.description.replace(/"/g, '""')}"`,
      `"${log.ipAddress || 'Internal'}"`,
      `"${log.relatedAlertId || ''}"`,
      `"${log.relatedRecommendationId || ''}"`,
      `"${log.relatedIncidentId || ''}"`,
      `"${log.relatedActionId || ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `unifra_audit_logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setToastMessage(`Successfully exported ${filteredLogs.length} audit records to CSV.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleNavigateResource = (_resourceName: string, source: string) => {
    if (source === 'Edge') {
      navigate('/edge');
    } else {
      navigate('/resources');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Top Universal Navbar */}
      <Navbar
        lastUpdated={lastUpdated}
        onRefresh={refreshAllData}
        isRefreshing={isRefreshing}
        alertCount={activeAlertCount}
        onOpenAlerts={() => navigate('/alerts')}
      />

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Top Header */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <FileText className="w-6 h-6 text-indigo-400" />
                <span>Audit Logs</span>
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                LEDGER: UNALTERABLE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Track infrastructure events, AI decisions, user actions and system activity.
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap self-end sm:self-auto">
            {/* Total Events Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="text-slate-500">Total Events:</span>
              <span className="font-bold text-white">{auditLogs.length}</span>
            </div>

            {/* Demo Mode Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ● DEMO MODE
            </div>

            {/* Export Button */}
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold font-mono shadow-md shadow-indigo-900/30 transition-all focus:outline-none"
              title="Export current audit logs to CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit Log</span>
            </button>
          </div>
        </section>

        {/* Action Toast Feedback */}
        {toastMessage && (
          <div className="p-2.5 rounded-lg bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <span className="text-[10px] text-emerald-400/80">Audit State Sync</span>
          </div>
        )}

        {/* 1. TOP SUMMARY CARDS (8 cards) */}
        <section aria-label="Audit Summary Metrics">
          <AuditSummaryCards metrics={metrics} />
        </section>

        {/* 2. ACTIVITY FILTERS */}
        <section aria-label="Audit Filters">
          <AuditFilterBar
            currentType={currentType}
            onTypeChange={setCurrentType}
            currentSeverity={currentSeverity}
            onSeverityChange={setCurrentSeverity}
            currentStatus={currentStatus}
            onStatusChange={setCurrentStatus}
            currentTimeRange={currentTimeRange}
            onTimeRangeChange={setCurrentTimeRange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filteredCount={filteredLogs.length}
            totalCount={auditLogs.length}
          />
        </section>

        {/* 3. AUDIT TABLE & TIMELINE GRID */}
        <section aria-label="Audit Table and Activity Timeline" className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <AuditLogTable
              logs={filteredLogs}
              onSelectLog={setSelectedLog}
              onNavigateResource={handleNavigateResource}
            />
          </div>

          <div className="space-y-6">
            <AuditTimelineSection
              logs={filteredLogs}
              onSelectLog={setSelectedLog}
            />
          </div>
        </section>

        {/* 4. SYSTEM HEALTH ACTIVITY */}
        <section aria-label="System Health Engine Activity">
          <SystemHealthActivitySection engines={engineHealth} />
        </section>
      </main>

      {/* 5. AUDIT DETAIL MODAL */}
      <AuditDetailModal
        log={selectedLog}
        onClose={() => setSelectedLog(null)}
        onNavigateResource={handleNavigateResource}
      />
    </div>
  );
};
