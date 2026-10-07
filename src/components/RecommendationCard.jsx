import React from 'react';
import { AlertTriangle, Lightbulb, CheckSquare, Square } from 'lucide-react';
import { getPriorityBadge } from '../utils/scoreUtils';

export default function RecommendationCard({
  rec,
  index,
  isCompleted = false,
  onToggleComplete
}) {
  const priorityBadge = getPriorityBadge(rec.priority);

  return (
    <div
      className={`glass-panel p-5 rounded-xl border transition-all ${
        isCompleted
          ? 'bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 opacity-85'
          : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${priorityBadge.bg}`}>
            {priorityBadge.label}
          </span>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            Slide {rec.slideNumber}
          </span>
        </div>

        {onToggleComplete && (
          <button
            onClick={() => onToggleComplete(rec.id)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
          >
            {isCompleted ? (
              <>
                <CheckSquare className="w-4 h-4 text-emerald-500" />
                <span className="line-through text-emerald-600 dark:text-emerald-400">Completed</span>
              </>
            ) : (
              <>
                <Square className="w-4 h-4" />
                <span>Mark Done</span>
              </>
            )}
          </button>
        )}
      </div>

      <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
        <span className="text-indigo-600 dark:text-indigo-400">#{index + 1}.</span> {rec.problem}
      </h4>

      <div className="space-y-2 text-xs">
        <div className="p-3 rounded-lg bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 text-slate-700 dark:text-slate-300">
          <span className="font-bold text-rose-600 dark:text-rose-400 block mb-0.5 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Problem Identified
          </span>
          {rec.explanation}
        </div>

        <div className="p-3 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-slate-700 dark:text-slate-300">
          <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5" /> Recommended AI Action
          </span>
          {rec.solution}
        </div>
      </div>
    </div>
  );
}

