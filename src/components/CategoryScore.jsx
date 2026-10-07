import React from 'react';
import * as Icons from 'lucide-react';
import { getRatingInfo } from '../utils/scoreUtils';

export default function CategoryScore({ category, score, maxScore, description }) {
  const percentage = Math.round((score / maxScore) * 100);
  const ratingInfo = getRatingInfo(percentage);

  // Dynamic icon component
  const IconComponent = Icons[category.iconName] || Icons.FileText;

  return (
    <div className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            <IconComponent className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-slate-900 dark:text-white">
              {category.name}
            </h5>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Weight: {maxScore} pts
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-lg font-black text-slate-900 dark:text-white">
            {score}
          </span>
          <span className="text-xs font-semibold text-slate-400">/{maxScore}</span>
        </div>
      </div>

      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden my-2">
        <div
          className={`h-full transition-all duration-700 rounded-full ${ratingInfo.badgeBg}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
        {description || category.description}
      </p>
    </div>
  );
}

