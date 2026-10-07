import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TextFlippingBoard } from '../components/ui/text-flipping-board';

const MESSAGES = [
  "WELCOME TO \nSLIDESCORE AI",
  "BE HAPPY TO KNOW \nUR POWERPOINT SCORE",
  "UPLOAD YOUR SLIDES \nKNOW YOUR IMPACT",
  "MAKE EVERY SLIDE \nBETTER WITH AI"
];

export default function Home() {
  const [msgIdx, setMsgIdx] = useState(0);

  const next = useCallback(() => setMsgIdx((i) => (i + 1) % MESSAGES.length), []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-8">
        <Sparkles className="w-4 h-4" /> SlideScore AI — Presentation Evaluator
      </div>

      {/* Center Text Flipping Board */}
      <div className="w-full flex justify-center mb-8">
        <TextFlippingBoard text={MESSAGES[msgIdx]} maxCols={22} />
      </div>

      {/* Simple Subtitle */}
      <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium mb-10">
        Upload your presentation file and get an instant AI score, slide-by-slide feedback, and actionable design recommendations.
      </p>

      {/* Call to action button */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
        <Link
          to="/analyze"
          className="w-full sm:w-auto px-10 py-4.5 rounded-2xl text-lg font-black text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:scale-98"
        >
          Analyze My Presentation <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-semibold">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free instant analysis
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Supports PPTX & PDF
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card required
        </span>
      </div>

    </div>
  );
}
