import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, Layers, ArrowRight, Trash2, RotateCcw } from 'lucide-react';
import { getRatingInfo } from '../utils/scoreUtils';

export default function PresentationCard({ presentation, onDelete, onAnalyzeAgain }) {
  const ratingInfo = getRatingInfo(presentation.overallScore);

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all flex flex-col justify-between group">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-900 dark:text-white text-base truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {presentation.title}
              </h4>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium truncate">
                {presentation.fileName}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-xl font-black text-slate-900 dark:text-white">
              {presentation.overallScore}
              <span className="text-xs font-semibold text-slate-400">/100</span>
            </div>
            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${ratingInfo.bgColor} ${ratingInfo.color}`}>
              {presentation.rating}
            </span>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-medium my-3">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>{presentation.slideCount} slides</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{presentation.analyzedAt || 'Today'}</span>
          </div>
          <div className="text-right">
            <span className="capitalize px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold">
              {presentation.type}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-2 pt-2">
        {onDelete ? (
          <button
            onClick={() => onDelete(presentation.id)}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
            title="Delete analysis"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2">
          {onAnalyzeAgain && (
            <button
              onClick={() => onAnalyzeAgain(presentation)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Re-analyze
            </button>
          )}
          <Link
            to={`/results/${presentation.id}`}
            className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-sm shadow-indigo-500/20 flex items-center gap-1.5 transition-all"
          >
            View Report <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

