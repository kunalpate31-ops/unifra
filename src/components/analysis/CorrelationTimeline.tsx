import React from 'react';
import { TimelineEvent } from '../../types/analysis';
import { Activity, Bell, AlertTriangle, AlertOctagon, Cpu, CheckCircle } from 'lucide-react';

interface CorrelationTimelineProps {
  timeline: TimelineEvent[];
  incidentTitle: string;
}

export const CorrelationTimeline: React.FC<CorrelationTimelineProps> = ({ timeline, incidentTitle }) => {
  const getEventIcon = (type: string, severity?: string) => {
    switch (type) {
      case 'alert':
        return <Bell className="w-3.5 h-3.5 text-rose-400" />;
      case 'incident':
        return <AlertOctagon className="w-3.5 h-3.5 text-purple-400" />;
      case 'system':
        return <Cpu className="w-3.5 h-3.5 text-indigo-400" />;
      case 'action':
        return <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />;
      case 'metric':
      default:
        return severity === 'critical' ? (
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
        ) : (
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
        );
    }
  };

  const getEventBorder = (type: string, severity?: string) => {
    if (type === 'incident') return 'border-purple-500/50 bg-purple-950/20';
    if (severity === 'critical' || type === 'alert') return 'border-rose-500/40 bg-rose-950/20';
    if (severity === 'warning') return 'border-amber-500/40 bg-amber-950/20';
    return 'border-slate-800 bg-slate-950/80';
  };

  return (
    <div className="p-4 sm:p-5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>Incident Correlation Timeline</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 border border-cyan-500/30 text-cyan-300">
              CHRONOLOGICAL TELEMETRY
            </span>
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Sequential telemetry anomalies and alerts leading up to: <strong className="text-slate-200">{incidentTitle}</strong>
          </p>
        </div>
        <span className="text-[10px] font-mono text-slate-500">5-Second Window Correlation</span>
      </div>

      {/* Horizontal / Step Timeline Container */}
      <div className="relative pt-2">
        {/* Connecting Track Line for desktop */}
        <div className="hidden lg:block absolute top-[27px] left-8 right-8 h-0.5 bg-gradient-to-r from-cyan-500/50 via-indigo-500/50 to-rose-500/50 -z-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 relative z-10">
          {timeline.map((event, idx) => (
            <div
              key={event.id}
              className={`p-3 rounded-lg border transition-all hover:border-slate-700 flex flex-col justify-between space-y-2.5 ${getEventBorder(
                event.type,
                event.severity
              )}`}
            >
              {/* Event Step & Timestamp Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                    {getEventIcon(event.type, event.severity)}
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    {event.time}
                  </span>
                </div>
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-900/90 text-slate-400 border border-slate-800">
                  Step 0{idx + 1}
                </span>
              </div>

              {/* Event Title & Details */}
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-slate-100 leading-snug">
                  {event.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Resource Pill Footer */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Node:</span>
                <span className="text-slate-300 font-medium truncate max-w-[130px]" title={event.resource}>
                  {event.resource}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
