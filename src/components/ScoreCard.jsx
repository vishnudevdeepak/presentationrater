import React from 'react';
import { getRatingInfo } from '../utils/scoreUtils';

export default function ScoreCard({ title, score, maxScore = 100, icon: Icon, description, badgeText }) {
  const percentage = Math.round((score / maxScore) * 100);
  const ratingInfo = getRatingInfo(percentage);

  return (
    <div className="glass-panel p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
            {title}
          </h4>
        </div>
        {badgeText && (
          <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {badgeText}
          </span>
        )}
      </div>

      <div className="flex items-baseline justify-between mb-2">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {score}
          </span>
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
            / {maxScore}
          </span>
        </div>
        <span className={`text-xs font-bold ${ratingInfo.color}`}>
          {ratingInfo.label}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-700 rounded-full ${ratingInfo.badgeBg}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

