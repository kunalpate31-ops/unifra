import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { ResourceSummaryCards } from '../components/resources/ResourceSummaryCards';
import { ResourceFilterBar } from '../components/resources/ResourceFilterBar';
import { ResourceInventoryTable } from '../components/resources/ResourceInventoryTable';
import { CostBreakdownSection } from '../components/resources/CostBreakdownSection';
import { InfrastructureResourceModal } from '../components/modals/InfrastructureResourceModal';
import { useDemoData } from '../context/DemoDataContext';

import {
  ResourceScope,
  ResourceStatus,
  ResourceType,
  InventoryResource
} from '../types/resources';

import {
  RESOURCE_SUMMARY_CARDS,
  COST_BREAKDOWN_ITEMS
} from '../services/resourcesMockData';

import { RefreshCw, Server, CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';

export const InfrastructureResources: React.FC = () => {
  const navigate = useNavigate();
  const {
    inventoryResources,
    activeAlertCount,
    lastUpdated,
    isRefreshing,
    refreshAllData
  } = useDemoData();

  // Filters State
  const [scope, setScope] = useState<ResourceScope>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ResourceStatus>('All Status');
  const [typeFilter, setTypeFilter] = useState<ResourceType>('All Types');

  // Modals state
  const [selectedResource, setSelectedResource] = useState<InventoryResource | null>(null);

  // Dynamic status counts
  const healthyCount = useMemo(
    () => inventoryResources.filter((r) => r.status === 'Healthy').length,
    [inventoryResources]
  );
  const warningCount = useMemo(
    () => inventoryResources.filter((r) => r.status === 'Warning').length,
    [inventoryResources]
  );
  const criticalCount = useMemo(
    () => inventoryResources.filter((r) => r.status === 'Critical').length,
    [inventoryResources]
  );

  // Filter resources
  const filteredResources = inventoryResources.filter((res) => {
    // 1. Scope filter
    if (scope !== 'All') {
      if (scope === 'AWS' && res.category !== 'AWS') return false;
      if (scope === 'Edge' && res.category !== 'Edge') return false;
      if (scope === 'On-Premise' && res.category !== 'On-Premise') return false;
      if (scope === 'Docker' && res.category !== 'Docker') return false;
      if (scope === 'Kubernetes' && res.category !== 'Kubernetes') return false;
    }

    // 2. Status filter
    if (statusFilter !== 'All Status' && res.status !== statusFilter) {
      return false;
    }

    // 3. Type filter
    if (typeFilter !== 'All Types' && res.type !== typeFilter) {
      return false;
    }

    // 4. Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = res.name.toLowerCase().includes(q);
      const matchType = res.type.toLowerCase().includes(q);
      const matchIp = res.ipAddress.toLowerCase().includes(q);
      const matchWorkload = res.workload.toLowerCase().includes(q);
      const matchLocation = res.location.toLowerCase().includes(q);
      return matchName || matchType || matchIp || matchWorkload || matchLocation;
    }

    return true;
  });

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

      {/* Main Container */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Top Header */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>Infrastructure Resources</span>
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                INVENTORY ENGINE: SYNCHRONIZED
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Unified inventory across cloud, edge and on-premise infrastructure.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap self-end sm:self-auto text-xs font-mono">
            {/* Status Pills */}
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
              <div className="flex items-center gap-1 text-slate-300">
                <Server className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-semibold text-white">{inventoryResources.length}</span>
                <span className="text-slate-500">Total</span>
              </div>
              <span className="text-slate-700">|</span>
              <div className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{healthyCount}</span>
              </div>
              <span className="text-slate-700">|</span>
              <div className="flex items-center gap-1 text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{warningCount}</span>
              </div>
              <span className="text-slate-700">|</span>
              <div className="flex items-center gap-1 text-rose-400">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{criticalCount}</span>
              </div>
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

        {/* 1. TOP SUMMARY CARDS (8 cards) */}
        <section aria-label="Resource Summary Cards">
          <ResourceSummaryCards cards={RESOURCE_SUMMARY_CARDS} />
        </section>

        {/* 2. INVENTORY FILTERS */}
        <section aria-label="Inventory Filters">
          <ResourceFilterBar
            currentScope={scope}
            onScopeChange={setScope}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentStatus={statusFilter}
            onStatusChange={setStatusFilter}
            currentType={typeFilter}
            onTypeChange={setTypeFilter}
            totalCount={inventoryResources.length}
            totalFilteredCount={filteredResources.length}
          />
        </section>

        {/* 3. RESOURCE INVENTORY TABLE */}
        <section aria-label="Resource Inventory Table">
          <ResourceInventoryTable
            resources={filteredResources}
            onSelectResource={(res) => setSelectedResource(res)}
            onViewMetrics={() => navigate('/monitoring')}
            onViewAlerts={() => navigate('/alerts')}
          />
        </section>

        {/* 4. COST BREAKDOWN BY CATEGORY */}
        <section aria-label="Resource Cost Breakdown">
          <CostBreakdownSection
            items={COST_BREAKDOWN_ITEMS}
            totalMonthlyCost={4820}
          />
        </section>
      </main>

      {/* Resource Detail Inspection Modal */}
      <InfrastructureResourceModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
        onViewMetrics={() => navigate('/monitoring')}
      />
    </div>
  );
};
