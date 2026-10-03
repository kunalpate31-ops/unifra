import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { CostSummaryCards } from '../components/cost/CostSummaryCards';
import { CostTrendChart } from '../components/cost/CostTrendChart';
import { CostCategoryBreakdownSection } from '../components/cost/CostCategoryBreakdownSection';
import { ResourceCostAnalysisTable } from '../components/cost/ResourceCostAnalysisTable';
import { CostAnomaliesSection } from '../components/cost/CostAnomaliesSection';
import { CostOpportunitiesSection } from '../components/cost/CostOpportunitiesSection';
import { SavingsForecastSection } from '../components/cost/SavingsForecastSection';
import { CostByEnvironmentSection } from '../components/cost/CostByEnvironmentSection';
import { ResourceCostDetailModal } from '../components/modals/ResourceCostDetailModal';
import { useDemoData } from '../context/DemoDataContext';

import {
  ResourceCostItem
} from '../types/cost';

import { RefreshCw, CheckCircle2, Calendar } from 'lucide-react';

export const CostOptimization: React.FC = () => {
  const navigate = useNavigate();
  const {
    costTrends,
    costCategories,
    resourceCosts,
    costAnomalies,
    costOpportunities,
    costEnvironments,
    costSummaryMetrics,
    applyCostOpportunity,
    dismissCostOpportunity,
    activeAlertCount,
    lastUpdated,
    isRefreshing,
    refreshAllData
  } = useDemoData();

  const [selectedResourceCost, setSelectedResourceCost] = useState<ResourceCostItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Action: Review Opportunity
  const handleReviewOpportunity = (id: string) => {
    setToastMessage(`Opportunity ${id} marked for engineering review.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Action: Apply Opportunity
  const handleApplyOpportunity = (id: string) => {
    applyCostOpportunity(id);
    setToastMessage(`Optimization opportunity ${id} applied.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Action: Dismiss Opportunity
  const handleDismissOpportunity = (id: string) => {
    dismissCostOpportunity(id);
    setToastMessage(`Optimization opportunity ${id} dismissed.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleNavigateResource = (_resourceName: string, source: string) => {
    if (source === 'Edge') {
      navigate('/edge');
    } else {
      navigate('/resources');
    }
  };

  const handleNavigateMonitoring = () => {
    navigate('/monitoring');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30">
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
                <span>Cost Optimization</span>
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                FINOPS ENGINE: CONTINUOUS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Monitor infrastructure spending, detect cost anomalies and execute automated FinOps optimization opportunities.
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap self-end sm:self-auto">
            {/* Billing Period Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>Billing Period: Oct 2026</span>
            </div>

            {/* Demo Mode Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ● DEMO MODE
            </div>

            {/* Refresh Analysis Button */}
            <button
              onClick={refreshAllData}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-semibold shadow-md shadow-indigo-900/30 transition-all focus:outline-none"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Spend</span>
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
            <span className="text-[10px] text-emerald-400/80">FinOps State Synced</span>
          </div>
        )}

        {/* 1. TOP SUMMARY CARDS (8 cards) */}
        <section aria-label="Cost Summary Metrics">
          <CostSummaryCards metrics={costSummaryMetrics} />
        </section>

        {/* 2. MONTHLY COST TREND CHART */}
        <section aria-label="Monthly Cost Trend">
          <CostTrendChart data={costTrends} />
        </section>

        {/* 3. COST BREAKDOWN BY CATEGORY */}
        <section aria-label="Cost Breakdown by Category">
          <CostCategoryBreakdownSection breakdown={costCategories} />
        </section>

        {/* 4. RESOURCE COST ANALYSIS TABLE */}
        <section aria-label="Resource Cost Analysis">
          <ResourceCostAnalysisTable
            resources={resourceCosts}
            onSelectResource={(res) => setSelectedResourceCost(res)}
          />
        </section>

        {/* 5. COST ANOMALIES */}
        <section aria-label="Cost Anomalies and Outliers">
          <CostAnomaliesSection anomalies={costAnomalies} />
        </section>

        {/* 6. COST OPTIMIZATION OPPORTUNITIES */}
        <section aria-label="Cost Optimization Opportunities">
          <CostOpportunitiesSection
            opportunities={costOpportunities}
            onReview={handleReviewOpportunity}
            onApply={handleApplyOpportunity}
            onDismiss={handleDismissOpportunity}
          />
        </section>

        {/* 7. SAVINGS FORECAST SECTION */}
        <section aria-label="Potential Savings Forecast">
          <SavingsForecastSection
            currentMonthlyCost={costSummaryMetrics.monthlyCloudCost}
            optimizedMonthlyCost={costSummaryMetrics.monthlyCloudCost - costSummaryMetrics.potentialSavings}
            monthlySavings={costSummaryMetrics.potentialSavings}
            annualSavings={costSummaryMetrics.potentialSavings * 12}
          />
        </section>

        {/* 8. COST BY ENVIRONMENT */}
        <section aria-label="Cost by Environment">
          <CostByEnvironmentSection environments={costEnvironments} />
        </section>
      </main>

      {/* 9. RESOURCE COST DETAIL MODAL */}
      <ResourceCostDetailModal
        resource={selectedResourceCost}
        onClose={() => setSelectedResourceCost(null)}
        onNavigateResource={handleNavigateResource}
        onNavigateMonitoring={handleNavigateMonitoring}
      />
    </div>
  );
};
