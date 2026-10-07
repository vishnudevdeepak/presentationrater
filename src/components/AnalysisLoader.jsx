import React from 'react';
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

export default function AnalysisLoader({ progress = 0, currentStep = 'Analyzing slides...' }) {
  const stepsList = [
    'Reading presentation',
    'Understanding content',
    'Checking slide structure',
    'Evaluating visual design',
    'Checking readability',
    'Analyzing typography',
    'Checking consistency',
    'Evaluating storytelling',
    'Checking evidence and citations',
    'Generating recommendations'
  ];

  // Calculate completed index based on progress
  const activeStepIndex = Math.min(
    stepsList.length - 1,
    Math.floor((progress / 100) * stepsList.length)
  );

  return (
    <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-indigo-200 dark:border-indigo-900/60 max-w-2xl mx-auto text-center shadow-xl">
      {/* Animated icon circle */}
      <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping opacity-75" />
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-blue-600 p-1 shadow-lg shadow-indigo-500/30">
          <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[12px] flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-bounce" />
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
        AI is analyzing your presentation...
      </h3>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
        Evaluating slide density, storytelling, visual hierarchy, and citations.
      </p>

      {/* Progress Bar & Percentage */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">
          <span>{currentStep}</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Checklist items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left max-w-lg mx-auto bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        {stepsList.map((step, idx) => {
          const isDone = idx < activeStepIndex;
          const isCurrent = idx === activeStepIndex;

          return (
            <div
              key={idx}
              className={`flex items-center gap-2.5 text-xs font-semibold py-1 transition-colors ${
                isDone
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : isCurrent
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-400 dark:text-slate-600 opacity-60'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 shrink-0" />
              )}
              <span className="truncate">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

