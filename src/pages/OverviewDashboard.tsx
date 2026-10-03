import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { StatCard } from '../components/cards/StatCard';
import { TelemetryCharts } from '../components/charts/TelemetryCharts';
import { InfrastructureTable } from '../components/tables/InfrastructureTable';
import { ActiveAlertsList } from '../components/alerts/ActiveAlertsList';
import { RecommendationsList } from '../components/recommendations/RecommendationsList';
import { SystemStatusFooter } from '../components/status/SystemStatusFooter';
import { ResourceDetailModal } from '../components/modals/ResourceDetailModal';
import { AlertDetailModal } from '../components/modals/AlertDetailModal';
import { AllRecommendationsModal } from '../components/modals/AllRecommendationsModal';
import { useDemoData } from '../context/DemoDataContext';

import {
  INITIAL_STATS,
  generateTelemetryData
} from '../services/mockData';

import {
  ScopeFilter,
  TimeRange,
  InfrastructureResource,
  SystemAlert
} from '../types/dashboard';

export const OverviewDashboard: React.FC = () => {
  const {
    dashboardResources,
    systemAlerts,
    dashboardRecommendations,
    activeAlertCount,
    lastUpdated,
    isRefreshing,
    refreshAllData
  } = useDemoData();

  // Telemetry filters
  const [currentScope, setCurrentScope] = useState<ScopeFilter>('All');
  const [currentRange, setCurrentRange] = useState<TimeRange>('15m');
  const [telemetryData, setTelemetryData] = useState(() =>
    generateTelemetryData('All', '15m')
  );

  // Stats
  const [stats] = useState(INITIAL_STATS);

  // Modals state
  const [selectedResource, setSelectedResource] = useState<InfrastructureResource | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<SystemAlert | null>(null);
  const [isAllRecsOpen, setIsAllRecsOpen] = useState(false);

  // Regenerate telemetry whenever scope or range changes
  useEffect(() => {
    setTelemetryData(generateTelemetryData(currentScope, currentRange));
  }, [currentScope, currentRange]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar
        lastUpdated={lastUpdated}
        onRefresh={refreshAllData}
        isRefreshing={isRefreshing}
        alertCount={activeAlertCount}
        onOpenAlerts={() => {
          if (systemAlerts.length > 0) {
            setSelectedAlert(systemAlerts[0]);
          }
        }}
      />

      {/* Main Dashboard Container */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* 1. TOP STATISTICS: 8 Compact Professional Cards */}
        <section aria-label="Key Infrastructure Statistics">
          <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3">
            {stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </section>

        {/* 2. REAL-TIME TELEMETRY: 5 Charts with Scope and Time Range Filters */}
        <section aria-label="Real-Time Telemetry">
          <TelemetryCharts
            data={telemetryData}
            currentScope={currentScope}
            onScopeChange={setCurrentScope}
            currentRange={currentRange}
            onRangeChange={setCurrentRange}
          />
        </section>

        {/* 3. INFRASTRUCTURE HEALTH: Professional Table with Status Badges */}
        <section aria-label="Infrastructure Health Table">
          <InfrastructureTable
            resources={dashboardResources}
            onSelectResource={(res) => setSelectedResource(res)}
          />
        </section>

        {/* 4. ACTIVE ALERTS & AI RECOMMENDATIONS GRID */}
        <section aria-label="Alerts and Recommendations" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Alerts */}
          <ActiveAlertsList
            alerts={systemAlerts}
            onSelectAlert={(alert) => setSelectedAlert(alert)}
          />

          {/* AI Recommendations */}
          <RecommendationsList
            recommendations={dashboardRecommendations}
            onViewAll={() => setIsAllRecsOpen(true)}
            onSelectRecommendation={() => {
              setIsAllRecsOpen(true);
            }}
          />
        </section>

        {/* 5. SYSTEM INTEGRATION STATUS FOOTER */}
        <section aria-label="System Integration Status">
          <SystemStatusFooter />
        </section>
      </main>

      {/* Interactive Detail Modals */}
      <ResourceDetailModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
      />

      <AlertDetailModal
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />

      <AllRecommendationsModal
        recommendations={dashboardRecommendations}
        isOpen={isAllRecsOpen}
        onClose={() => setIsAllRecsOpen(false)}
      />
    </div>
  );
};
