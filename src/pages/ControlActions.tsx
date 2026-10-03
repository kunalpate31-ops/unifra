import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { ActionSummaryCards } from '../components/actions/ActionSummaryCards';
import { ActionFilterBar } from '../components/actions/ActionFilterBar';
import { ActionQueueTable } from '../components/actions/ActionQueueTable';
import { ScheduledAutomationSection } from '../components/actions/ScheduledAutomationSection';
import { ActionImpactSection } from '../components/actions/ActionImpactSection';
import { RecentControlActivitySection } from '../components/actions/RecentControlActivitySection';
import { ActionDetailModal } from '../components/modals/ActionDetailModal';
import { HighRiskConfirmModal } from '../components/modals/HighRiskConfirmModal';
import { AutomationDetailModal } from '../components/modals/AutomationDetailModal';
import { useDemoData } from '../context/DemoDataContext';

import {
  ControlActionItem,
  ScheduledAutomationItem,
  ActionStatus,
  ActionType,
  ActionRiskLevel,
  ActionSummaryMetrics
} from '../types/actions';

import { RefreshCw, CheckCircle2 } from 'lucide-react';

export const ControlActions: React.FC = () => {
  const navigate = useNavigate();
  const {
    controlActions,
    scheduledAutomations,
    recentActivities,
    actionImpactMetrics,
    approveControlAction,
    rejectControlAction,
    executeControlAction,
    activeAlertCount,
    lastUpdated,
    isRefreshing,
    refreshAllData
  } = useDemoData();

  // Modals state
  const [selectedAction, setSelectedAction] = useState<ControlActionItem | null>(null);
  const [highRiskPendingAction, setHighRiskPendingAction] = useState<ControlActionItem | null>(null);
  const [selectedAutomation, setSelectedAutomation] = useState<ScheduledAutomationItem | null>(null);

  // Filters state
  const [statusFilter, setStatusFilter] = useState<ActionStatus | 'All'>('All');
  const [typeFilter, setTypeFilter] = useState<ActionType | 'All'>('All');
  const [riskFilter, setRiskFilter] = useState<ActionRiskLevel | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // UI state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Compute Metrics dynamically
  const summaryMetrics: ActionSummaryMetrics = useMemo(() => {
    const pending = controlActions.filter((a) => a.status === 'Pending').length;
    const approved = controlActions.filter((a) => a.status === 'Approved').length;
    const executing = controlActions.filter((a) => a.status === 'Executing').length;
    const completed = controlActions.filter((a) => a.status === 'Completed').length;
    const failed = controlActions.filter((a) => a.status === 'Failed').length;
    const scheduled = controlActions.filter((a) => a.status === 'Scheduled').length;
    const actionsToday = controlActions.length + 11;
    const successRate = '98.4%';

    return {
      pendingApproval: pending,
      approved,
      executing,
      completed,
      failed,
      scheduled,
      actionsToday,
      successRate
    };
  }, [controlActions]);

  // Handle Approve Action
  const handleApproveAction = (action: ControlActionItem) => {
    if (action.risk === 'High') {
      setHighRiskPendingAction(action);
      return;
    }
    approveControlAction(action.id);
    if (selectedAction && selectedAction.id === action.id) {
      setSelectedAction((prev) => (prev ? { ...prev, status: 'Approved' } : null));
    }
    setToastMessage(`Action ${action.id} approved successfully.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Confirm High Risk Action
  const handleConfirmHighRisk = (actionId: string) => {
    approveControlAction(actionId);
    setHighRiskPendingAction(null);
    if (selectedAction && selectedAction.id === actionId) {
      setSelectedAction((prev) => (prev ? { ...prev, status: 'Approved' } : null));
    }
    setToastMessage(`High-risk action ${actionId} approved with operator elevation.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handle Reject Action
  const handleRejectAction = (actionId: string) => {
    rejectControlAction(actionId);
    if (selectedAction && selectedAction.id === actionId) {
      setSelectedAction((prev) => (prev ? { ...prev, status: 'Rejected' } : null));
    }
    setToastMessage(`Action ${actionId} was rejected.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle Execute Simulated Action
  const handleExecuteAction = (actionId: string) => {
    executeControlAction(actionId);
    if (selectedAction && selectedAction.id === actionId) {
      setSelectedAction((prev) => (prev ? { ...prev, status: 'Completed' } : null));
    }
    setToastMessage(`Action ${actionId} executed successfully in simulated environment.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter actions
  const filteredActions = controlActions.filter((act) => {
    if (statusFilter !== 'All' && act.status !== statusFilter) return false;
    if (typeFilter !== 'All' && act.type !== typeFilter) return false;
    if (riskFilter !== 'All' && act.risk !== riskFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchAction = act.action.toLowerCase().includes(q);
      const matchResource = act.resource.toLowerCase().includes(q);
      const matchReason = act.reason.toLowerCase().includes(q);
      const matchId = act.id.toLowerCase().includes(q);
      return matchAction || matchResource || matchReason || matchId;
    }
    return true;
  });

  const handleNavigateResource = (_resourceName: string, source: string) => {
    if (source === 'Edge') {
      navigate('/edge');
    } else {
      navigate('/resources');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30">
      {/* Top Universal Navbar */}
      <Navbar
        lastUpdated={lastUpdated}
        onRefresh={refreshAllData}
        isRefreshing={isRefreshing}
        alertCount={activeAlertCount}
        onOpenAlerts={() => navigate('/alerts')}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Top Header */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>Control Actions</span>
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                AUTOMATION ENGINE: SIMULATED
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Review, approve and simulate infrastructure remediation and optimization actions.
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap self-end sm:self-auto">
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
        {toastMessage && (
          <div className="p-2.5 rounded-lg bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <span className="text-[10px] text-emerald-400/80">Demo State Updated</span>
          </div>
        )}

        {/* 1. TOP SUMMARY CARDS (8 cards) */}
        <section aria-label="Action Summary Metrics">
          <ActionSummaryCards metrics={summaryMetrics} />
        </section>

        {/* 2. ACTION FILTERS */}
        <section aria-label="Action Filters">
          <ActionFilterBar
            currentStatus={statusFilter}
            onStatusChange={setStatusFilter}
            currentType={typeFilter}
            onTypeChange={setTypeFilter}
            currentRisk={riskFilter}
            onRiskChange={setRiskFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filteredCount={filteredActions.length}
            totalCount={controlActions.length}
          />
        </section>

        {/* 3. ACTION QUEUE TABLE */}
        <section aria-label="Control Action Queue">
          <ActionQueueTable
            actions={filteredActions}
            onSelectAction={setSelectedAction}
            onApproveAction={handleApproveAction}
            onRejectAction={handleRejectAction}
            onExecuteAction={handleExecuteAction}
          />
        </section>

        {/* 4. SCHEDULED AUTOMATION TASKS */}
        <section aria-label="Scheduled Automations">
          <ScheduledAutomationSection
            automations={scheduledAutomations}
            onSelectAutomation={(auto) => setSelectedAutomation(auto)}
            onToggleStatus={(_id) => {}}
          />
        </section>

        {/* 5. IMPACT PREVIEW & PROJECTED BENEFITS */}
        <section aria-label="Projected Action Impact">
          <ActionImpactSection metrics={actionImpactMetrics} />
        </section>

        {/* 6. RECENT CONTROL ACTIVITY */}
        <section aria-label="Recent Control Activity Log">
          <RecentControlActivitySection activities={recentActivities} />
        </section>
      </main>

      {/* Action Detail Inspection Modal */}
      <ActionDetailModal
        action={selectedAction}
        onClose={() => setSelectedAction(null)}
        onApprove={handleApproveAction}
        onReject={handleRejectAction}
        onExecute={handleExecuteAction}
        onNavigateResource={handleNavigateResource}
      />

      {/* High-Risk Action Confirmation Modal */}
      <HighRiskConfirmModal
        action={highRiskPendingAction}
        onClose={() => setHighRiskPendingAction(null)}
        onConfirm={(act) => handleConfirmHighRisk(act.id)}
      />

      {/* Scheduled Automation Detail Modal */}
      <AutomationDetailModal
        automation={selectedAutomation}
        onClose={() => setSelectedAutomation(null)}
        onToggleStatus={(_id) => {}}
      />
    </div>
  );
};
