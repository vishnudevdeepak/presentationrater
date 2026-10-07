import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { CATEGORY_DEFINITIONS } from '../data/categories';

export function CategoryRadarChart({ categoryScores }) {
  // Format category data normalized to 100% scale for radar view
  const data = CATEGORY_DEFINITIONS.slice(0, 6).map((cat) => {
    const rawVal = categoryScores[cat.key] || 0;
    const scorePct = Math.round((rawVal / cat.maxScore) * 100);
    return {
      category: cat.name.split(' ')[0],
      score: scorePct,
      fullMark: 100
    };
  });

  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#6366f1"
            fill="#818cf8"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CategoryBarChart({ categoryScores }) {
  const data = CATEGORY_DEFINITIONS.map((cat) => {
    const val = categoryScores[cat.key] || 0;
    const pct = Math.round((val / cat.maxScore) * 100);
    return {
      name: cat.name,
      shortName: cat.name.length > 12 ? cat.name.substring(0, 10) + '...' : cat.name,
      score: val,
      maxScore: cat.maxScore,
      percentage: pct
    };
  });

  const getBarColor = (pct) => {
    if (pct >= 85) return '#10b981';
    if (pct >= 75) return '#6366f1';
    if (pct >= 65) return '#3b82f6';
    if (pct >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="w-full h-72 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="shortName"
            width={100}
            tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
          />
          <Tooltip
            formatter={(value, name, item) => [`${item.payload.score} / ${item.payload.maxScore} (${value}%)`, 'Score']}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
            }}
          />
          <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.percentage)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

