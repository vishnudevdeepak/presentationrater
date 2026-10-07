import React from 'react';
import { getRatingInfo } from '../utils/scoreUtils';

export default function ScoreCircle({ score = 82, size = 'lg', subtitle }) {
  const ratingInfo = getRatingInfo(score);
  
  // Dimensions depending on size
  const dimensions = {
    sm: { size: 100, strokeWidth: 8, fontSize: 'text-2xl' },
    md: { size: 140, strokeWidth: 10, fontSize: 'text-3xl' },
    lg: { size: 180, strokeWidth: 12, fontSize: 'text-4xl' },
    xl: { size: 220, strokeWidth: 14, fontSize: 'text-5xl' }
  }[size] || { size: 180, strokeWidth: 12, fontSize: 'text-4xl' };

  const { size: svgSize, strokeWidth } = dimensions;
  const radius = (svgSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center justify-center">
        <svg width={svgSize} height={svgSize} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            className="stroke-slate-200 dark:stroke-slate-800"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated score circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke={ratingInfo.hex}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`font-black tracking-tight text-slate-900 dark:text-white ${dimensions.fontSize}`}>
            {score}
          </span>
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest -mt-1">
            / 100
          </span>
        </div>
      </div>

      <div className="mt-3 text-center">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${ratingInfo.bgColor} ${ratingInfo.color} border ${ratingInfo.borderColor}`}
        >
          {ratingInfo.label}
        </span>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

