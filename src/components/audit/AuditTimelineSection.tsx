import React from 'react';
import { AuditLogItem } from '../../types/audit';
import {
  Clock,
  Sparkles,
  User,
  Bell,
  Lightbulb,
  Play,
  Shield,
  ArrowRight
} from 'lucide-react';

interface AuditTimelineSectionProps {
  logs: AuditLogItem[];
  onSelectLog: (log: AuditLogItem) => void;
}

export const AuditTimelineSection: React.FC<AuditTimelineSectionProps> = ({
  logs,
  onSelectLog
}) => {
  // Show top 6 most recent events for a focused chronological timeline
  const timelineEvents = logs.slice(0, 6);

  const getNodeIcon = (actorType: string) => {
    switch (actorType) {
      case 'User':
        return <User className="w-3.5 h-3.5 text-cyan-400" />;
      case 'AI':
        return <Sparkles className="w-3.5 h-3.5 text-purple-400" />;
      case 'Alert':
        return <Bell className="w-3.5 h-3.5 text-rose-400" />;
      case 'Recommendation':
        return <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Control Action':
        return <Play className="w-3.5 h-3.5 text-indigo-400" />;
      default:
        return <Shield className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getNodeColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-rose-500/20 border-rose-500 text-rose-400 ring-rose-500/20';
      case 'Warning':
        return 'bg-amber-500/20 border-amber-500 text-amber-400 ring-amber-500/20';
      case 'Info':
      default:
        return 'bg-indigo-500/20 border-indigo-500 text-indigo-400 ring-indigo-500/20';
    }
  };

  return (
    <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-4 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">System Activity Timeline</h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Chronological Event Sequence
        </span>
      </div>

      <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
        {timelineEvents.map((event) => (
          <div
            key={event.id}
            onClick={() => onSelectLog(event)}
            className="relative group cursor-pointer"
          >
            {/* Node Icon on vertical line */}
            <div
              className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border flex items-center justify-center ring-4 ring-slate-950 bg-slate-900 transition-transform group-hover:scale-110 ${getNodeColor(
                event.severity
              )}`}
            >
              {getNodeIcon(event.actorType)}
            </div>

            {/* Event Box */}
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 group-hover:border-slate-700 transition-all ml-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {event.activity}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {event.resource}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap">
                  {event.timestamp.replace('2026-10-02 ', '')}
                </span>
              </div>

              <p className="text-xs text-slate-400 line-clamp-2 mb-2 font-sans">
                {event.description}
              </p>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/60 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">{event.actor}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-500">{event.actorType}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 group-hover:text-cyan-400 transition-colors">
                  <span>Inspect</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
