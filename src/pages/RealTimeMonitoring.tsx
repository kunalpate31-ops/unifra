import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { SummaryMetricsBar } from '../components/monitoring/SummaryMetricsBar';
import { MonitoringFilterBar } from '../components/monitoring/MonitoringFilterBar';
import { CpuUtilizationChart } from '../components/monitoring/CpuUtilizationChart';
import { MemoryUtilizationChart } from '../components/monitoring/MemoryUtilizationChart';
import { NetworkTrafficChart } from '../components/monitoring/NetworkTrafficChart';
import { ApiPerformanceSection } from '../components/monitoring/ApiPerformanceSection';
import { EdgeTemperatureChart } from '../components/monitoring/EdgeTemperatureChart';
import { LiveTelemetryTable } from '../components/monitoring/LiveTelemetryTable';
import { MonitoringResourceDetailModal } from '../components/modals/MonitoringResourceDetailModal';
import { useDemoData } from '../context/DemoDataContext';

import {
  MonitoringResourceScope,
  MonitoringTimeRange,
  LiveTelemetryRow
} from '../types/monitoring';

import {
  INITIAL_SUMMARY_METRICS,
  generateCpuData,
  generateMemoryData,
  generateNetworkData,
  generateApiPerformanceData,
  generateEdgeTemperatureData,
  stepTelemetryRow
} from '../services/monitoringMockData';

import { RefreshCw } from 'lucide-react';

export const RealTimeMonitoring: React.FC = () => {
  const navigate = useNavigate();
  const {
    liveTelemetryRows,
    activeAlertCount,
    lastUpdated,
    isRefreshing,
    refreshAllData
  } = useDemoData();

  // Filter states
  const [scope, setScope] = useState<MonitoringResourceScope>('All');
  const [timeRange, setTimeRange] = useState<MonitoringTimeRange>('15m');
  const [isLiveStreamActive, setIsLiveStreamActive] = useState(true);

  // Summary Metrics State
  const [summaryMetrics, setSummaryMetrics] = useState(INITIAL_SUMMARY_METRICS);

  // Time-Series Datasets
  const [cpuData, setCpuData] = useState(() => generateCpuData('All', '15m'));
  const [memData, setMemData] = useState(() => generateMemoryData('All', '15m'));
  const [netData, setNetData] = useState(() => generateNetworkData('All', '15m'));
  const [apiPerfData, setApiPerfData] = useState(() => generateApiPerformanceData('15m'));
  const [edgeTempData, setEdgeTempData] = useState(() => generateEdgeTemperatureData('15m'));

  // Live Telemetry Rows State (synced with central data model)
  const [telemetryRows, setTelemetryRows] = useState<LiveTelemetryRow[]>(liveTelemetryRows);

  useEffect(() => {
    setTelemetryRows(liveTelemetryRows);
  }, [liveTelemetryRows]);

  // Selected row for inspection modal
  const [selectedRow, setSelectedRow] = useState<LiveTelemetryRow | null>(null);

  // Regenerate time-series charts on Scope or TimeRange change
  useEffect(() => {
    setCpuData(generateCpuData(scope, timeRange));
    setMemData(generateMemoryData(scope, timeRange));
    setNetData(generateNetworkData(scope, timeRange));
    setApiPerfData(generateApiPerformanceData(timeRange));
    setEdgeTempData(generateEdgeTemperatureData(timeRange));
  }, [scope, timeRange]);

  // Live telemetry stream timer: subtle realistic drift every 3 seconds
  const liveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isLiveStreamActive) {
      liveIntervalRef.current = setInterval(() => {
        // Step telemetry rows with subtle drift
        setTelemetryRows((prevRows) => prevRows.map(stepTelemetryRow));

        // Subtle drift on summary metrics (e.g. CPU 62 -> 63)
        setSummaryMetrics((prev) =>
          prev.map((m) => {
            if (m.id === 'cpu') {
              const cur = parseInt(m.value) || 62;
              const next = Math.min(68, Math.max(59, cur + (Math.random() > 0.5 ? 1 : -1)));
              return { ...m, value: `${next}%`, progressPercent: next };
            }
            if (m.id === 'network') {
              const delta = (Math.random() * 0.04 - 0.02).toFixed(2);
              const nextVal = (1.24 + parseFloat(delta)).toFixed(2);
              return { ...m, value: `${nextVal} Gbps` };
            }
            if (m.id === 'latency') {
              const cur = parseInt(m.value) || 142;
              const next = Math.min(156, Math.max(132, cur + (Math.floor(Math.random() * 5) - 2)));
              return { ...m, value: `${next} ms` };
            }
            return m;
          })
        );
      }, 3000);
    }

    return () => {
      if (liveIntervalRef.current) {
        clearInterval(liveIntervalRef.current);
      }
    };
  }, [isLiveStreamActive]);

  // Manual refresh action
  const handleRefresh = () => {
    refreshAllData();
    setCpuData(generateCpuData(scope, timeRange));
    setMemData(generateMemoryData(scope, timeRange));
    setNetData(generateNetworkData(scope, timeRange));
    setApiPerfData(generateApiPerformanceData(timeRange));
    setEdgeTempData(generateEdgeTemperatureData(timeRange));
    setTelemetryRows((prev) => prev.map(stepTelemetryRow));
  };

  // Filter rows by selected scope
  const filteredRows = telemetryRows.filter((r) => {
    if (scope === 'All') return true;
    if (scope === 'AWS') return r.provider === 'AWS';
    if (scope === 'Edge') return r.provider === 'Edge';
    if (scope === 'On-Premise') return r.provider === 'On-Premise';
    if (scope === 'Docker') return r.type === 'Docker';
    if (scope === 'Kubernetes') return r.type === 'Kubernetes';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Universal Navbar */}
      <Navbar
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        alertCount={activeAlertCount}
        onOpenAlerts={() => navigate('/alerts')}
      />

      {/* Main Monitoring Dashboard Container */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Top Header Section with Stream Status and Demo Mode */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>Real-Time Monitoring</span>
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                TELEMETRY ENGINE: LIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Sub-second metrics aggregation across AWS Cloud, Docker, Kubernetes and On-Premise Industrial Edge.
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4 flex-wrap self-end sm:self-auto">
            {/* Live Stream Toggle Badge */}
            <button
              onClick={() => setIsLiveStreamActive(!isLiveStreamActive)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono transition-all ${
                isLiveStreamActive
                  ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-400 shadow-sm shadow-cyan-950'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300'
              }`}
              title="Toggle automatic telemetry streaming"
            >
              <span className="relative flex h-2 w-2">
                {isLiveStreamActive && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                )}
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isLiveStreamActive ? 'bg-cyan-400' : 'bg-slate-600'
                  }`}
                ></span>
              </span>
              <span>{isLiveStreamActive ? 'STREAM ACTIVE' : 'STREAM PAUSED'}</span>
            </button>

            {/* Demo Mode Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ● DEMO MODE
            </div>

            {/* Manual Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-semibold shadow-md shadow-indigo-900/30 transition-all focus:outline-none"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </section>

        {/* 1. TOP SUMMARY CARDS (8 Compact Cards) */}
        <section aria-label="Real-Time Metrics Summary">
          <SummaryMetricsBar metrics={summaryMetrics} />
        </section>

        {/* 2. MONITORING FILTERS: Scope and Time-Range Selectors */}
        <section aria-label="Monitoring Filters">
          <MonitoringFilterBar
            currentScope={scope}
            onScopeChange={setScope}
            currentRange={timeRange}
            onRangeChange={setTimeRange}
            isLiveStreamActive={isLiveStreamActive}
            onToggleLiveStream={() => setIsLiveStreamActive(!isLiveStreamActive)}
          />
        </section>

        {/* 3. REAL-TIME CHARTS GRID */}
        <section aria-label="Telemetry Charts" className="space-y-6">
          {/* Row 1: CPU & Memory Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CpuUtilizationChart
              data={cpuData.points}
              current={cpuData.current}
              average={cpuData.average}
              peak={cpuData.peak}
              threshold={cpuData.threshold}
            />
            <MemoryUtilizationChart
              data={memData.points}
              current={memData.current}
              average={memData.average}
              peak={memData.peak}
              warning={memData.warning}
            />
          </div>

          {/* Row 2: Network Traffic Full Width */}
          <div>
            <NetworkTrafficChart
              data={netData.points}
              currentInbound={netData.currentInbound}
              currentOutbound={netData.currentOutbound}
            />
          </div>

          {/* Row 3: API Performance Section (Requests, Latency, Error Rate) */}
          <div>
            <ApiPerformanceSection
              data={apiPerfData.points}
              currentReqRate={apiPerfData.currentReqRate}
              currentP99Latency={apiPerfData.currentP99Latency}
              currentErrorRate={apiPerfData.currentErrorRate}
            />
          </div>

          {/* Row 4: Edge Temperature Tracking (When Edge or All is selected) */}
          {(scope === 'All' || scope === 'Edge') && (
            <div>
              <EdgeTemperatureChart
                data={edgeTempData.points}
                edge001={edgeTempData.edge001}
                edge002={edgeTempData.edge002}
                edge003={edgeTempData.edge003}
                edge004={edgeTempData.edge004}
                threshold={edgeTempData.threshold}
              />
            </div>
          )}
        </section>

        {/* 4. LIVE TELEMETRY STREAM TABLE */}
        <section aria-label="Live Telemetry Stream">
          <LiveTelemetryTable
            rows={filteredRows}
            onSelectRow={(row) => setSelectedRow(row)}
          />
        </section>
      </main>

      {/* Resource Detail Inspection Modal */}
      <MonitoringResourceDetailModal
        row={selectedRow}
        onClose={() => setSelectedRow(null)}
        onViewInfrastructure={() => navigate('/resources')}
      />
    </div>
  );
};
