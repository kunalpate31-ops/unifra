import React, { useState } from 'react';
import {
  Radio,
  CheckCircle2,
  RefreshCw,
  Clock,
  Sparkles,
  Zap
} from 'lucide-react';

interface EdgeDiscoveryBannerProps {
  discoveredCount: number;
  newCount: number;
  unreachableCount: number;
  lastDiscoveryTime: string;
  onDiscoveryComplete: (newTimestamp: string) => void;
}

type DiscoveryStage = 'idle' | 'scanning' | 'discovering' | 'analyzing' | 'complete';

export const EdgeDiscoveryBanner: React.FC<EdgeDiscoveryBannerProps> = ({
  discoveredCount,
  newCount,
  unreachableCount,
  lastDiscoveryTime,
  onDiscoveryComplete
}) => {
  const [stage, setStage] = useState<DiscoveryStage>('idle');
  const [showToast, setShowToast] = useState(false);

  const handleRunDiscovery = () => {
    if (stage !== 'idle' && stage !== 'complete') return;

    setStage('scanning');

    setTimeout(() => {
      setStage('discovering');
      setTimeout(() => {
        setStage('analyzing');
        setTimeout(() => {
          setStage('complete');
          setShowToast(true);
          onDiscoveryComplete('Just now');

          setTimeout(() => {
            setShowToast(false);
            setStage('idle');
          }, 3500);
        }, 800);
      }, 900);
    }, 900);
  };

  const getStageLabel = () => {
    switch (stage) {
      case 'scanning':
        return 'Scanning subnet 192.168.0.0/16 & CAN/Modbus buses...';
      case 'discovering':
        return 'Discovering responsive edge gateways & MCUs...';
      case 'analyzing':
        return 'Analyzing telemetry probes & firmware profiles...';
      case 'complete':
        return 'Discovery Complete! 18 devices verified.';
      default:
        return 'Active background probing via mDNS, SNMP & OTel gRPC';
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800/90 rounded-xl p-4 sm:p-5 shadow-xl overflow-hidden">
      {/* Background glow subtle effect */}
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
        {/* Left: Discovery Info */}
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Radio className="w-4 h-4 animate-pulse text-cyan-400" />
            </div>
            <h3 className="text-base font-bold text-white tracking-wide">
              EDGE DISCOVERY ENGINE
            </h3>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              STATUS: ACTIVE
            </span>
          </div>

          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Automated discovery of distributed industrial gateways, Raspberry Pi endpoints, and PLC telemetry agents across LAN, cellular APNs, and edge subnets.
          </p>

          <div className="text-[11px] font-mono text-cyan-300 flex items-center gap-2">
            <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>{getStageLabel()}</span>
          </div>
        </div>

        {/* Middle Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
          {/* Discovered */}
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] text-slate-500 uppercase">Discovered</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg font-bold text-white">{discoveredCount}</span>
              <span className="text-[10px] text-slate-400">devices</span>
            </div>
          </div>

          {/* New */}
          <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex flex-col justify-between">
            <span className="text-[10px] text-cyan-400 uppercase flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              New
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg font-bold text-cyan-300">+{newCount}</span>
              <span className="text-[10px] text-cyan-500">recently</span>
            </div>
          </div>

          {/* Unreachable */}
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] text-slate-500 uppercase">Unreachable</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg font-bold text-amber-400">{unreachableCount}</span>
              <span className="text-[10px] text-slate-500">node</span>
            </div>
          </div>

          {/* Last Discovery */}
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] text-slate-500 uppercase flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-slate-500" />
              Last Scan
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xs font-bold text-slate-200">{lastDiscoveryTime}</span>
            </div>
          </div>
        </div>

        {/* Right Action Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={handleRunDiscovery}
            disabled={stage !== 'idle' && stage !== 'complete'}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-xs tracking-wide transition-all shadow-md ${
              stage !== 'idle' && stage !== 'complete'
                ? 'bg-indigo-700/60 text-slate-300 border border-indigo-500/30 cursor-wait'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-indigo-500/25 active:scale-95'
            }`}
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${
                stage !== 'idle' && stage !== 'complete' ? 'animate-spin text-cyan-300' : ''
              }`}
            />
            <span>
              {stage === 'scanning'
                ? 'Scanning...'
                : stage === 'discovering'
                ? 'Discovering devices...'
                : stage === 'analyzing'
                ? 'Analyzing...'
                : 'Run Discovery'}
            </span>
          </button>
        </div>
      </div>

      {/* Discovery Complete Toast Notification */}
      {showToast && (
        <div className="mt-3.5 p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Edge discovery scan completed successfully! 18 devices verified across 4 locations.</span>
          </div>
          <span className="text-[10px] text-emerald-400/80">Just now</span>
        </div>
      )}
    </div>
  );
};
