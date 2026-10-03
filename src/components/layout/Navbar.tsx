import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  RefreshCw,
  Bell,
  ShieldCheck,
  Activity,
  LayoutDashboard,
  Radio,
  Server,
  Cpu,
  Sparkles,
  GitMerge,
  DollarSign,
  SlidersHorizontal,
  FileText,
  RotateCcw
} from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { IncidentSimulationModal } from '../demo/IncidentSimulationModal';
import { ResetDemoConfirmModal } from '../modals/ResetDemoConfirmModal';
import { SimulationQuickBanner } from '../demo/SimulationQuickBanner';

interface NavbarProps {
  lastUpdated: string;
  onRefresh: () => void;
  isRefreshing: boolean;
  alertCount: number;
  onOpenAlerts: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lastUpdated,
  onRefresh,
  isRefreshing,
  alertCount,
  onOpenAlerts
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();

  const {
    simulationState,
    isResetModalOpen,
    openResetModal,
    closeResetModal,
    openSimulationModal,
    resetDemoScenario
  } = useDemoData();

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md px-4 sm:px-6 py-2.5 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Left: Brand Title & Nav Tabs */}
          <div className="flex items-center gap-6 flex-wrap">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <Activity className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black tracking-wider text-white">UNIFRA</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    v1.0-RC
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Hybrid Infrastructure Intelligence</p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono flex-wrap">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Overview</span>
              </NavLink>

              <NavLink
                to="/monitoring"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                    isActive || location.pathname.includes('monitoring')
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Real-Time Monitoring</span>
              </NavLink>

              <NavLink
                to="/resources"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                    isActive || location.pathname.includes('resources')
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <Server className="w-3.5 h-3.5 text-indigo-400" />
                <span>Infrastructure</span>
              </NavLink>

              <NavLink
                to="/edge"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                    isActive || location.pathname.includes('edge')
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span>Edge Devices</span>
              </NavLink>

              <NavLink
                to="/alerts"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                    isActive || location.pathname.includes('alerts')
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <Bell className="w-3.5 h-3.5 text-rose-400" />
                <span>Alerts</span>
              </NavLink>

              <NavLink
                to="/recommendations"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                    isActive || location.pathname.includes('recommendations')
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>AI Recommendations</span>
              </NavLink>

              <NavLink
                to="/analysis"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                    isActive || location.pathname.includes('analysis')
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <GitMerge className="w-3.5 h-3.5 text-emerald-400" />
                <span>Root Cause Analysis</span>
              </NavLink>

              <NavLink
                to="/cost"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                    isActive || location.pathname.includes('cost')
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cost Optimization</span>
              </NavLink>

              <NavLink
                to="/actions"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                    isActive || location.pathname.includes('actions')
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Control Actions</span>
              </NavLink>

              <NavLink
                to="/audit"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                    isActive || location.pathname.includes('audit')
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Audit Logs</span>
              </NavLink>
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3 self-end sm:self-auto">
            
            {/* Run Incident Demo Button */}
            <button
              onClick={openSimulationModal}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shadow-md transform hover:scale-[1.02] focus:outline-none ${
                simulationState.isActive && simulationState.currentStep < 11
                  ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-900/40 ring-1 ring-cyan-400/50 animate-pulse'
                  : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-indigo-900/40'
              }`}
              title="Run End-to-End Production API Incident Demo Scenario"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>{simulationState.isActive && simulationState.currentStep < 11 ? `Demo Step ${simulationState.currentStep}/11` : 'Run Incident Demo'}</span>
            </button>

            {/* Reset Demo Button */}
            <button
              onClick={openResetModal}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono transition-colors focus:outline-none"
              title="Reset Demo Scenario to Baseline"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>

            {/* Last Updated Timestamp & Refresh */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-slate-900/90 border border-slate-800/90 px-2.5 py-1.5 rounded-md">
              <span className="hidden md:inline text-slate-500">Updated:</span>
              <span className="text-slate-200">{lastUpdated}</span>
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                title="Refresh Telemetry Data"
                className="ml-1 text-slate-400 hover:text-cyan-400 transition-colors p-0.5 rounded hover:bg-slate-800 focus:outline-none"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
              </button>
            </div>

            {/* Demo Mode Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              DEMO MODE
            </div>

            {/* Notification Bell */}
            <button
              onClick={onOpenAlerts}
              className="relative p-2 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/90 transition-all focus:outline-none"
              title="Active Alerts"
            >
              <Bell className="w-4 h-4" />
              {alertCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm shadow-rose-900">
                  {alertCount}
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-md bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all focus:outline-none"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-[11px] font-bold">
                  KP
                </div>
                <span className="text-xs font-medium pr-1 hidden lg:inline">Admin</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-slate-900 border border-slate-800 py-1.5 shadow-xl shadow-black/60 z-50">
                  <div className="px-3 py-2 border-b border-slate-800 text-xs">
                    <p className="font-semibold text-white">Kunal Pate</p>
                    <p className="text-slate-400 text-[11px]">admin@unifra.internal</p>
                  </div>
                  <div className="px-3 py-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Role: Super Administrator
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Global Demo Simulation Floating Banner & Modals */}
      <SimulationQuickBanner />
      <IncidentSimulationModal />
      <ResetDemoConfirmModal
        isOpen={isResetModalOpen}
        onClose={closeResetModal}
        onConfirm={resetDemoScenario}
      />
    </>
  );
};
