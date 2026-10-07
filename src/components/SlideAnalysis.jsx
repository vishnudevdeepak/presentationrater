import React from 'react';
import { AlertCircle, Lightbulb, CheckCircle2, MessageSquare, Monitor } from 'lucide-react';
import { getRatingInfo } from '../utils/scoreUtils';

export default function SlideAnalysis({ slide }) {
  if (!slide) return null;

  const ratingInfo = getRatingInfo(slide.score);

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Slide {slide.slideNumber} Inspection
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
            {slide.title}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {slide.score} <span className="text-xs text-slate-400 font-semibold">/ 100</span>
            </div>
            <span className={`text-xs font-extrabold ${ratingInfo.color}`}>
              {slide.status}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Slide Preview + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Large Slide Mockup Preview */}
        <div className="lg:col-span-6 flex flex-col justify-between rounded-xl bg-slate-900 text-slate-100 p-6 min-h-[260px] shadow-lg relative border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5" /> Slide {slide.slideNumber} Frame
            </span>
            <span className="text-[10px] text-slate-400 font-mono">16:9 HD</span>
          </div>

          <div className="space-y-3 my-auto">
            <h4 className="text-lg font-bold text-white leading-tight">
              {slide.title}
            </h4>
            <div className="p-3 rounded bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 space-y-1">
              <p className="font-semibold text-indigo-300">" {slide.mainMessage} "</p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>SlideScore AI Scan</span>
            <span>{slide.problems?.length > 0 ? `${slide.problems.length} issues flagged` : 'Clean layout'}</span>
          </div>
        </div>

        {/* Breakdown & Analysis */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Main message */}
          <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
            <h5 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <MessageSquare className="w-3.5 h-3.5" /> Main Message of this slide:
            </h5>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium italic">
              "{slide.mainMessage}"
            </p>
          </div>

          {/* Category score breakdown grid */}
          {slide.breakdown && (
            <div>
              <h5 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Slide Metric Breakdown
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <span className="text-slate-500 text-[10px] block">Content</span>
                  <span className="font-bold text-slate-900 dark:text-white">{slide.breakdown.content} / 15</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <span className="text-slate-500 text-[10px] block">Design</span>
                  <span className="font-bold text-slate-900 dark:text-white">{slide.breakdown.design} / 15</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <span className="text-slate-500 text-[10px] block">Readability</span>
                  <span className="font-bold text-slate-900 dark:text-white">{slide.breakdown.readability} / 10</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <span className="text-slate-500 text-[10px] block">Typography</span>
                  <span className="font-bold text-slate-900 dark:text-white">{slide.breakdown.typography} / 8</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <span className="text-slate-500 text-[10px] block">Visuals</span>
                  <span className="font-bold text-slate-900 dark:text-white">{slide.breakdown.visuals} / 8</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <span className="text-slate-500 text-[10px] block">Clarity</span>
                  <span className="font-bold text-slate-900 dark:text-white">{slide.breakdown.clarity} / 10</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Problems & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-200 dark:border-slate-800 pt-4">
        {/* Problems */}
        <div>
          <h5 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" /> Problems Detected
          </h5>
          {slide.problems && slide.problems.length > 0 ? (
            <div className="space-y-1.5">
              {slide.problems.map((prob, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 text-xs font-semibold border border-rose-200 dark:border-rose-800">
                  {prob}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No critical design or text problems detected on this slide.
            </div>
          )}
        </div>

        {/* AI Recommendations */}
        <div>
          <h5 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> AI Recommendation
          </h5>
          <div className="space-y-1.5">
            {slide.recommendations?.map((rec, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 text-slate-800 dark:text-slate-200 text-xs font-medium border border-indigo-200 dark:border-indigo-800">
                💡 {rec}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

