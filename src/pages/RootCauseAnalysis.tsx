import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { AnalysisSummaryCards } from '../components/analysis/AnalysisSummaryCards';
import { IncidentSelectorList } from '../components/analysis/IncidentSelectorList';
import { CorrelationTimeline } from '../components/analysis/CorrelationTimeline';
import { EventCorrelationVisualizer } from '../components/analysis/EventCorrelationVisualizer';
import { ProbableRootCauseSection } from '../components/analysis/ProbableRootCauseSection';
import { RelatedResourceModal } from '../components/modals/RelatedResourceModal';
import { useDemoData } from '../context/DemoDataContext';

import {
  AnalysisSummaryMetrics
} from '../types/analysis';

import { Play, CheckCircle2, Loader2 } from 'lucide-react';

export const RootCauseAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const {
    activeAlertCount,
    lastUpdated,
    isRefreshing,
    refreshAllData,
    analysisIncidents,
    updateIncidentConfidence
  } = useDemoData();

  // Incidents Data & Selection State from single source of truth
  const incidents = analysisIncidents;
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('INC-PROD-API-001');
  const [selectedResourceModal, setSelectedResourceModal] = useState<string | null>(null);

  // Analysis Execution Simulation State
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false);
  const [analysisStepText, setAnalysisStepText] = useState<string | null>(null);
  const [analysisRunCount, setAnalysisRunCount] = useState(14);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentIncident = incidents.find((i) => i.id === selectedIncidentId) || incidents[0];

  // Dynamic calculations for 8 summary cards
  const activeCount = incidents.filter((i) => i.status === 'Active' || i.status === 'Investigating').length;
  const totalEvents = incidents.reduce((acc, curr) => acc + curr.relatedEventCount, 0);
  const highConfCount = incidents.filter((i) => i.confidenceScore >= 80).length;
  const medConfCount = incidents.filter((i) => i.confidenceScore < 80 && i.confidenceScore >= 60).length;
  const unresolvedCount = incidents.filter((i) => i.status !== 'Resolved' && i.status !== 'Mitigated').length;

  // Unique resources affected
  const allAffectedResources = new Set(incidents.flatMap((i) => i.affectedResources));

  const summaryMetrics: AnalysisSummaryMetrics = {
    activeIncidents: activeCount,
    correlatedEvents: totalEvents,
    rootCausesIdentified: incidents.length,
    resourcesAffected: allAffectedResources.size,
    highConfidence: highConfCount,
    mediumConfidence: medConfCount,
    unresolvedIncidents: unresolvedCount,
    analysisRuns: analysisRunCount
  };

  // Run Analysis simulated progression sequence
  const handleRunAnalysis = () => {
    if (isRunningAnalysis) return;
    setIsRunningAnalysis(true);
    setAnalysisStepText('Step 1/4: Ingesting correlated telemetry & alert events...');

    setTimeout(() => {
      setAnalysisStepText('Step 2/4: Building multi-tier causal graph & dependency path...');
    }, 600);

    setTimeout(() => {
      setAnalysisStepText('Step 3/4: Scoring probable root cause hypothesis via Bayesian model...');
    }, 1200);

    setTimeout(() => {
      setAnalysisStepText('Step 4/4: Synthesizing diagnostic evidence and mitigation steps...');
    }, 1700);

    setTimeout(() => {
      setIsRunningAnalysis(false);
      setAnalysisStepText(null);
      setAnalysisRunCount((prev) => prev + 1);

      updateIncidentConfidence(selectedIncidentId, 2);

      setToastMessage(`Root Cause Analysis complete for ${currentIncident.id}. Diagnostic confidence updated.`);
      setTimeout(() => setToastMessage(null), 3500);
    }, 2200);
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
                <span>Root Cause Analysis</span>
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                AI DIAGNOSTIC ENGINE: ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Correlate telemetry, evaluate causal event trees and isolate underlying infrastructure root causes.
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

            {/* Run Analysis Button */}
            <button
              onClick={handleRunAnalysis}
              disabled={isRunningAnalysis}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-semibold shadow-md shadow-emerald-900/30 transition-all focus:outline-none disabled:opacity-75"
            >
              {isRunningAnalysis ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Analysis</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Live Analysis Status Banner / Toast */}
        {isRunningAnalysis && (
          <div className="p-3 rounded-lg bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between animate-pulse shadow-lg">
            <div className="flex items-center gap-2.5">
              <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>{analysisStepText}</span>
            </div>
            <span className="text-[10px] text-emerald-400/80">Autonomous Diagnostics In Progress</span>
          </div>
        )}

        {toastMessage && (
          <div className="p-2.5 rounded-lg bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <span className="text-[10px] text-emerald-400/80">Diagnostic State Synced</span>
          </div>
        )}

        {/* 1. TOP SUMMARY CARDS (8 cards) */}
        <section aria-label="Analysis Summary Metrics">
          <AnalysisSummaryCards metrics={summaryMetrics} />
        </section>

        {/* 2. INCIDENT SELECTOR */}
        <section aria-label="Incident Selection List">
          <IncidentSelectorList
            incidents={incidents}
            selectedIncidentId={selectedIncidentId}
            onSelectIncident={(id) => setSelectedIncidentId(id)}
          />
        </section>

        {/* 3. EVENT CORRELATION TIMELINE */}
        <section aria-label="Event Correlation Timeline">
          <CorrelationTimeline
            timeline={currentIncident.timeline}
            incidentTitle={currentIncident.title}
          />
        </section>

        {/* 4. EVENT CORRELATION GRAPH / TOPOLOGY VISUALIZER */}
        <section aria-label="Causal Graph Visualizer">
          <EventCorrelationVisualizer incident={currentIncident} />
        </section>

        {/* 5. PROBABLE ROOT CAUSE & MITIGATION GUIDANCE */}
        <section aria-label="Probable Root Cause and Evidence">
          <ProbableRootCauseSection
            incident={currentIncident}
            onSelectResource={(resName: string) => setSelectedResourceModal(resName)}
          />
        </section>
      </main>

      {/* Resource Quick Inspection Modal */}
      <RelatedResourceModal
        resourceName={selectedResourceModal}
        onClose={() => setSelectedResourceModal(null)}
        onNavigateResource={(name: string) => {
          if (name.includes('EDGE')) {
            navigate('/edge');
          } else {
            navigate('/resources');
          }
        }}
        onNavigateMonitoring={() => navigate('/monitoring')}
      />
    </div>
  );
};
