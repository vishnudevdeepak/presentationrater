import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { EXAMPLE_TEMPLATES } from '../data/templates';
import { getRatingInfo } from '../utils/scoreUtils';

export default function Examples() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Sample Showcase Reports
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Explore Sample AI Reports
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Click any sample presentation report below to see how SlideScore AI evaluates deck storytelling, visual design, slide density, and citations.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EXAMPLE_TEMPLATES.map((tmpl) => {
          const ratingInfo = getRatingInfo(tmpl.overallScore);

          return (
            <div
              key={tmpl.id}
              className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col justify-between group shadow-sm hover:shadow-lg"
            >
              <div>
                <div className={`w-full h-32 rounded-xl bg-gradient-to-r ${tmpl.previewGradient} p-4 text-white flex flex-col justify-between mb-4 relative overflow-hidden shadow-md`}>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono uppercase font-semibold opacity-90 px-2 py-0.5 rounded bg-black/20">
                      {tmpl.type}
                    </span>
                    <span className="text-xl font-black bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                      {tmpl.overallScore} / 100
                    </span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-lg text-white drop-shadow-sm truncate">
                      {tmpl.title}
                    </h4>
                    <p className="text-xs opacity-80 font-medium">
                      {tmpl.slideCount} slides • {tmpl.audience}
                    </p>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tmpl.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {tmpl.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${ratingInfo.bgColor} ${ratingInfo.color}`}>
                  {tmpl.rating}
                </span>

                <Link
                  to={`/results/${tmpl.id === 'demo-ai-healthcare' ? 'presentation-001' : tmpl.id === 'demo-climate-change' ? 'presentation-002' : tmpl.id === 'demo-startup-pitch' ? 'presentation-003' : tmpl.id === 'demo-machine-learning' ? 'presentation-004' : 'presentation-005'}`}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm flex items-center gap-1.5 transition-all"
                >
                  View Sample Report <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

