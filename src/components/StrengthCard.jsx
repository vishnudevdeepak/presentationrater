import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function StrengthCard({ strengths }) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20">
      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        What You're Doing Well
      </h3>

      <ul className="space-y-3">
        {strengths?.map((str, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200 font-medium">
            <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
            <span>{str}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

