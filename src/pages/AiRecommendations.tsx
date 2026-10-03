import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { RecommendationSummaryCards } from '../components/recommendations/RecommendationSummaryCards';
import { RecommendationFilterBar } from '../components/recommendations/RecommendationFilterBar';
import { RecommendationCard } from '../components/recommendations/RecommendationCard';
import { CostOptimizationSection } from '../components/recommendations/CostOptimizationSection';
import { AiPipelineFlowSection } from '../components/recommendations/AiPipelineFlowSection';
import { RecommendationDetailModal } from '../components/modals/RecommendationDetailModal';
import { useDemoData } from '../context/DemoDataContext';

import {
  RecommendationCategory,
  RecommendationPriority,
  RecommendationStatus,
  RecommendationItem,
  RecommendationSummaryMetrics
} from '../types/recommendations';

import { COST_BREAKDOWN_DATA } from '../services/recommendationsMockData';
import { Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

export const AiRecommendations: React.FC = () => {
  const navigate = useNavigate();
  const {
    recommendations,
    applyRecommendation,
    dismissRecommendation,
    activeAlertCount,
    lastUpdated,
    isRefreshing,
    refreshAllData
  } = useDemoData();

  const [selectedRecommendation, setSelectedRecommendation] = useState<RecommendationItem | null>(null);

  // Filters state
  const [categoryFilter, setCategoryFilter] = useState<RecommendationCategory | 'All'>('All');
  const [priorityFilter, setPriorityFilter] = useState<RecommendationPriority | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<RecommendationStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // UI state
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Action: Apply
  const handleApply = (recId: string) => {
    applyRecommendation(recId);
    if (selectedRecommendation && selectedRecommendation.id === recId) {
      setSelectedRecommendation((prev) => (prev ? { ...prev, status: 'Applied' } : null));
    }
    setNotificationToast(`Recommendation ${recId} applied.`);
    setTimeout(() => setNotificationToast(null), 3000);
  };

  // Action: Dismiss
  const handleDismiss = (recId: string) => {
    dismissRecommendation(recId);
    if (selectedRecommendation && selectedRecommendation.id === recId) {
      setSelectedRecommendation((prev) => (prev ? { ...prev, status: 'Dismissed' } : null));
    }
    setNotificationToast(`Recommendation ${recId} dismissed.`);
    setTimeout(() => setNotificationToast(null), 3000);
  };

  // Compute Metrics dynamically
  const summaryMetrics: RecommendationSummaryMetrics = useMemo(() => {
    const highPriority = recommendations.filter(
      (r) => r.priority === 'High' || r.priority === 'Critical'
    );
    const cost = recommendations.filter((r) => r.category === 'Cost');
    const perf = recommendations.filter((r) => r.category === 'Performance');
    const rel = recommendations.filter(
      (r) => r.category === 'Reliability' || r.category === 'Capacity'
    );
    const applied = recommendations.filter((r) => r.status === 'Applied');
    const totalSavings = recommendations.reduce(
      (acc, curr) => acc + (curr.estimatedMonthlySavings || 0),
      0
    );

    return {
      totalCount: recommendations.length,
      highPriorityCount: highPriority.length,
      costCount: cost.length,
      performanceCount: perf.length,
      reliabilityCount: rel.length,
      estimatedMonthlySavingsTotal: totalSavings,
      resourcesAnalyzedCount: 14,
      recommendationsAppliedCount: applied.length
    };
  }, [recommendations]);

  // Filter recommendations
  const filteredRecommendations = recommendations.filter((rec) => {
    // 1. Category filter
    if (categoryFilter !== 'All' && rec.category !== categoryFilter) {
      return false;
    }

    // 2. Priority filter
    if (priorityFilter !== 'All' && rec.priority !== priorityFilter) {
      return false;
    }

    // 3. Status filter
    if (statusFilter !== 'All' && rec.status !== statusFilter) {
      return false;
    }

    // 4. Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = rec.title.toLowerCase().includes(q);
      const matchResource = rec.affectedResource.toLowerCase().includes(q);
      const matchReason = rec.reason.toLowerCase().includes(q);
      const matchSource = rec.source.toLowerCase().includes(q);
      const matchState = rec.recommendedState.toLowerCase().includes(q);
      return matchTitle || matchResource || matchReason || matchSource || matchState;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500/30">
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
                <span>AI Recommendations</span>
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 animate-pulse" />
                AI RECOMMENDATION ENGINE: ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Intelligent recommendations for infrastructure health, performance and cost optimization.
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
              <span>Refresh Analysis</span>
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
        <section aria-label="Recommendation Summary Metrics">
          <RecommendationSummaryCards metrics={summaryMetrics} />
        </section>

        {/* 2. AI PIPELINE FLOW */}
        <section aria-label="AI Recommendation Pipeline Flow">
          <AiPipelineFlowSection />
        </section>

        {/* 3. RECOMMENDATION FILTERS */}
        <section aria-label="Recommendation Filters">
          <RecommendationFilterBar
            currentCategory={categoryFilter}
            onCategoryChange={setCategoryFilter}
            currentPriority={priorityFilter}
            onPriorityChange={setPriorityFilter}
            currentStatus={statusFilter}
            onStatusChange={setStatusFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filteredCount={filteredRecommendations.length}
            totalCount={recommendations.length}
          />
        </section>

        {/* 4. RECOMMENDATION CARDS LIST */}
        <section aria-label="Recommendations List">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecommendations.map((rec) => (
              <RecommendationCard
                key={rec.id}
                recommendation={rec}
                onSelect={(r) => setSelectedRecommendation(r)}
                onReview={() => setSelectedRecommendation(rec)}
                onApply={handleApply}
                onDismiss={handleDismiss}
              />
            ))}
          </div>
        </section>

        {/* 5. POTENTIAL COST OPTIMIZATION SECTION */}
        <section aria-label="Cost Optimization Potential">
          <CostOptimizationSection breakdown={COST_BREAKDOWN_DATA} />
        </section>
      </main>

      {/* Recommendation Detailed Inspection Modal */}
      <RecommendationDetailModal
        recommendation={selectedRecommendation}
        onClose={() => setSelectedRecommendation(null)}
        onReview={(recId: string) => {
          const rec = recommendations.find((r) => r.id === recId);
          if (rec) setSelectedRecommendation(rec);
        }}
        onApply={handleApply}
        onDismiss={handleDismiss}
        onViewResource={(_resourceName: string, source: string) => {
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
