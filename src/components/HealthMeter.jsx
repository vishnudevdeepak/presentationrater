import React from 'react';
import { Activity, ShieldCheck, Eye, Layout, FileText } from 'lucide-react';

export default function HealthMeter({ health }) {
  const metrics = [
    { key: 'content', label: 'Content Health', val: health?.content || 80, icon: FileText, color: 'bg-emerald-500' },
    { key: 'design', label: 'Design Health', val: health?.design || 75, icon: Layout, color: 'bg-indigo-500' },
    { key: 'readability', label: 'Readability Health', val: health?.readability || 82, icon: Eye, color: 'bg-blue-500' },
    { key: 'structure', label: 'Structure Health', val: health?.structure || 90, icon: Activity, color: 'bg-purple-500' },
    { key: 'evidence', label: 'Evidence Health', val: health?.evidence || 70, icon: ShieldCheck, color: 'bg-amber-500' }
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-5">
        <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Presentation Health Metrics
        </h4>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
          AI Diagnosed
        </span>
      </div>

      <div className="space-y-4">
        {metrics.map((m) => {
          const IconComp = m.icon;
          return (
            <div key={m.key} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-2">
                  <IconComp className="w-3.5 h-3.5 text-slate-400" />
                  {m.label}
                </span>
                <span className="font-extrabold">{m.val}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${m.color}`}
                  style={{ width: `${m.val}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

