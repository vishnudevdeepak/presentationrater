import React from 'react';
import { getRatingInfo } from '../utils/scoreUtils';

export default function SlideCard({ slide, isSelected, onClick }) {
  const ratingInfo = getRatingInfo(slide.score);

  return (
    <div
      onClick={onClick}
      className={`glass-panel p-4 rounded-xl border transition-all cursor-pointer text-left ${
        isSelected
          ? 'border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/20 shadow-md bg-indigo-50/30 dark:bg-indigo-950/30'
          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          [{slide.slideNumber < 10 ? `0${slide.slideNumber}` : slide.slideNumber}] Slide
        </span>
        <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${ratingInfo.bgColor} ${ratingInfo.color}`}>
          {slide.score} / 100
        </span>
      </div>

      {/* Mini Mock Slide Visual */}
      <div className="w-full h-24 rounded-lg bg-slate-100 dark:bg-slate-800 p-2.5 mb-3 flex flex-col justify-between border border-slate-200/80 dark:border-slate-700/80 relative overflow-hidden group">
        <div className="w-2/3 h-2.5 bg-indigo-500/40 rounded-sm" />
        <div className="space-y-1 my-auto">
          <div className="w-full h-1.5 bg-slate-300 dark:bg-slate-600 rounded-sm" />
          <div className="w-4/5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-sm" />
          <div className="w-3/5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-sm" />
        </div>
        <div className="flex items-center justify-between text-[9px] text-slate-400">
          <span>Slide {slide.slideNumber}</span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">{slide.status}</span>
        </div>
      </div>

      <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
        {slide.title}
      </h5>

      {slide.problems && slide.problems.length > 0 && (
        <div className="mt-2 text-[10px] text-amber-600 dark:text-amber-400 font-semibold truncate">
          ⚠️ {slide.problems[0]}
        </div>
      )}
    </div>
  );
}

