import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { EdgeSummaryCards } from '../components/edge/EdgeSummaryCards';
import { EdgeDiscoveryBanner } from '../components/edge/EdgeDiscoveryBanner';
import { EdgeLocationTopology } from '../components/edge/EdgeLocationTopology';
import { EdgeHealthDistribution } from '../components/edge/EdgeHealthDistribution';
import { EdgeFilterBar } from '../components/edge/EdgeFilterBar';
import { EdgeDeviceTable } from '../components/edge/EdgeDeviceTable';
import { EdgeDeviceDetailModal } from '../components/modals/EdgeDeviceDetailModal';
import { useDemoData } from '../context/DemoDataContext';

import {
  EdgeStatusFilter,
  EdgeLocationFilter,
  EdgeDevice
} from '../types/edge';

import {
  EDGE_SUMMARY_CARDS,
  EDGE_LOCATION_TOPOLOGY
} from '../services/edgeMockData';

import { RefreshCw, Radio } from 'lucide-react';

export const EdgeDevices: React.FC = () => {
  const navigate = useNavigate();
  const {
    edgeDevices,
    activeAlertCount,
    lastUpdated,
    isRefreshing,
    refreshAllData
  } = useDemoData();

  // Filters State
  const [statusFilter, setStatusFilter] = useState<EdgeStatusFilter>('All');
  const [locationFilter, setLocationFilter] = useState<EdgeLocationFilter>('All Locations');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals and discovery state
  const [selectedDevice, setSelectedDevice] = useState<EdgeDevice | null>(null);
  const [lastDiscoveryTime, setLastDiscoveryTime] = useState('Just now');

  const handleDiscoveryComplete = (newTimestamp: string) => {
    setLastDiscoveryTime(newTimestamp);
  };

  // Filtered devices
  const filteredDevices = edgeDevices.filter((device) => {
    // 1. Status filter
    if (statusFilter !== 'All') {
      if (statusFilter === 'Online' && device.status !== 'Online') return false;
      if (statusFilter === 'Warning' && device.status !== 'Warning') return false;
      if (statusFilter === 'Critical' && device.status !== 'Critical') return false;
      if (statusFilter === 'Offline' && device.status !== 'Offline') return false;
    }

    // 2. Location filter
    if (locationFilter !== 'All Locations') {
      if (device.location !== locationFilter) return false;
    }

    // 3. Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = device.name.toLowerCase().includes(q);
      const matchIp = device.ipAddress.toLowerCase().includes(q);
      const matchMac = device.macAddress.toLowerCase().includes(q);
      const matchWorkload = device.activeWorkloads.toLowerCase().includes(q);
      const matchType = device.deviceType.toLowerCase().includes(q);
      const matchFacility = device.facilityName.toLowerCase().includes(q);
      return matchName || matchIp || matchMac || matchWorkload || matchType || matchFacility;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30">
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
                <span>Edge Devices</span>
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                <Radio className="w-3 h-3 animate-pulse" />
                DISCOVERY DAEMON: ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Discover, monitor and manage distributed edge infrastructure across regional factory units.
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

        {/* 1. TOP SUMMARY CARDS (8 cards) */}
        <section aria-label="Edge Summary Metrics">
          <EdgeSummaryCards cards={EDGE_SUMMARY_CARDS} />
        </section>

        {/* 2. DISCOVERY ACTIVE BANNER */}
        <section aria-label="Edge Discovery Engine">
          <EdgeDiscoveryBanner
            discoveredCount={edgeDevices.length}
            newCount={0}
            unreachableCount={0}
            lastDiscoveryTime={lastDiscoveryTime}
            onDiscoveryComplete={handleDiscoveryComplete}
          />
        </section>

        {/* 3. LOCATION TOPOLOGY & HEALTH DISTRIBUTION GRID */}
        <section aria-label="Edge Topology and Health" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EdgeLocationTopology
              nodes={EDGE_LOCATION_TOPOLOGY}
              selectedLocation={locationFilter}
              onSelectLocation={(loc) => setLocationFilter(loc as EdgeLocationFilter)}
            />
          </div>
          <div>
            <EdgeHealthDistribution
              healthyCount={edgeDevices.filter((d) => d.status === 'Online').length}
              warningCount={edgeDevices.filter((d) => d.status === 'Warning').length}
              criticalCount={edgeDevices.filter((d) => d.status === 'Critical').length}
              offlineCount={edgeDevices.filter((d) => d.status === 'Offline').length}
              totalCount={edgeDevices.length}
            />
          </div>
        </section>

        {/* 4. EDGE DEVICE FILTERS */}
        <section aria-label="Edge Device Filters">
          <EdgeFilterBar
            currentStatus={statusFilter}
            onStatusChange={setStatusFilter}
            currentLocation={locationFilter}
            onLocationChange={setLocationFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalCount={edgeDevices.length}
            filteredCount={filteredDevices.length}
          />
        </section>

        {/* 5. EDGE DEVICE TABLE */}
        <section aria-label="Edge Devices Table">
          <EdgeDeviceTable
            devices={filteredDevices}
            onSelectDevice={(device) => setSelectedDevice(device)}
          />
        </section>
      </main>

      {/* Edge Device Detail Inspection Modal */}
      <EdgeDeviceDetailModal
        device={selectedDevice}
        onClose={() => setSelectedDevice(null)}
        onViewMonitoring={(_dev) => navigate('/monitoring')}
      />
    </div>
  );
};
