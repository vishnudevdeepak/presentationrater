import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function WeaknessCard({ weaknesses }) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/20">
      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-amber-500" />
        What Needs Improvement
      </h3>

      <ul className="space-y-3">
        {weaknesses?.map((wk, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200 font-medium">
            <span className="text-amber-500 font-bold shrink-0 mt-0.5">⚠️</span>
            <span>{wk}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

