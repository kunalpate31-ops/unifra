import React from 'react';
import {
  Activity,
  Search,
  Bell,
  DollarSign,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const AiPipelineFlowSection: React.FC = () => {
  const steps = [
    {
      id: 'step-1',
      title: 'Telemetry Collection',
      description: 'Ingesting CPU, memory, IOPS, and thermal sensor time-series',
      icon: Activity,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10 border-cyan-500/30'
    },
    {
      id: 'step-2',
      title: 'Pattern Detection',
      description: 'Identifying underutilized compute and thermal gradient anomalies',
      icon: Search,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10 border-indigo-500/30'
    },
    {
      id: 'step-3',
      title: 'Alert Correlation',
      description: 'Synthesizing concurrent alerts across hybrid edge and cloud nodes',
      icon: Bell,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10 border-rose-500/30'
    },
    {
      id: 'step-4',
      title: 'Cost Analysis',
      description: 'Evaluating AWS pricing tiers, storage lifecycle, and rightsizing gains',
      icon: DollarSign,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/30'
    },
    {
      id: 'step-5',
      title: 'Recommendation Generation',
      description: 'Formulating validated, actionable mitigations with impact scoring',
      icon: Sparkles,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/30'
    }
  ];

  return (
    <div className="p-4 sm:p-5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <span>AI Infrastructure Analysis Pipeline</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/60 border border-purple-500/30 text-purple-300">
                SIMULATED AI ENGINE
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Autonomous continuous telemetry evaluation and multi-dimensional optimization synthesis.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded-md self-start sm:self-auto">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Continuous Evaluation Active</span>
        </div>
      </div>

      {/* Visual Step Pipeline Flow */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="relative flex flex-col justify-between">
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/90 space-y-2 h-full flex flex-col justify-between group hover:border-slate-700 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-slate-500 font-bold">
                      STAGE 0{idx + 1}
                    </span>
                    <div className={`p-1.5 rounded-md border ${step.bgColor}`}>
                      <Icon className={`w-3.5 h-3.5 ${step.color}`} />
                    </div>
                  </div>
                  <h3 className="text-xs font-semibold text-slate-200">{step.title}</h3>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Status:</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                    Operational
                  </span>
                </div>
              </div>

              {/* Arrow connector between stages on desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
