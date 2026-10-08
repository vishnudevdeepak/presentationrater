import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Download,
  Share2,
  Calendar,
  Layers,
  Users,
  Target,
  FileText,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  BarChart2,
  Copy,
  Check
} from 'lucide-react';
import ScoreCircle from '../components/ScoreCircle';
import CategoryScore from '../components/CategoryScore';
import { CategoryRadarChart } from '../components/Charts';
import HealthMeter from '../components/HealthMeter';
import StrengthCard from '../components/StrengthCard';
import WeaknessCard from '../components/WeaknessCard';
import RecommendationCard from '../components/RecommendationCard';
import SlideCard from '../components/SlideCard';
import SlideAnalysis from '../components/SlideAnalysis';
import Modal from '../components/Modal';
import { getPresentationById } from '../services/storageService';
import { CATEGORY_DEFINITIONS } from '../data/categories';

export default function Results() {
  const { id } = useParams();

  const [presentation, setPresentation] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [completedRecs, setCompletedRecs] = useState({});

  // Modals state
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getPresentationById(id)
      .then((data) => {
        if (isMounted) {
          setPresentation(data);
          setLoadError('');
        }
      })
      .catch((error) => {
        if (isMounted) {
          setPresentation(null);
          setLoadError(error.message || 'Could not load this analysis.');
        }
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (!presentation) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {loadError ? 'Unable to Load Analysis' : 'Loading Analysis...'}
        </h2>
        {loadError && (
          <>
            <p role="alert" className="text-slate-500 text-sm">{loadError}</p>
            <Link
              to="/history"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <ArrowLeft className="w-4 h-4" /> Go to History
            </Link>
          </>
        )}
      </div>
    );
  }

  const toggleRecComplete = (recId) => {
    setCompletedRecs((prev) => ({
      ...prev,
      [recId]: !prev[recId]
    }));
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownload = (format) => {
    setDownloadSuccessMsg(`Downloading ${presentation.title} - ${format}...`);
    setTimeout(() => {
      setDownloadSuccessMsg(null);
      setIsDownloadModalOpen(false);
    }, 2000);
  };

  const selectedSlide = presentation.slides ? presentation.slides[selectedSlideIndex] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Top Header / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            <Link to="/history" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to History
            </Link>
            <span>/</span>
            <span>Report #{presentation.id}</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <FileText className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            {presentation.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mt-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Analyzed: {presentation.analyzedAt || 'Today'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-400" /> {presentation.slideCount} Slides
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" /> Audience: {presentation.audience}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-slate-400" /> Goal: {presentation.goal}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-4 py-2.5 rounded-xl font-bold text-slate-700 dark:text-slate-200 glass-panel hover:bg-slate-100 dark:hover:bg-slate-800 text-xs flex items-center gap-2 transition-all"
          >
            <Share2 className="w-4 h-4 text-slate-500" /> Share Report
          </button>
          <button
            onClick={() => setIsDownloadModalOpen(true)}
            className="px-5 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 text-xs shadow-md shadow-indigo-500/20 flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" /> Download Report
          </button>
        </div>
      </div>

      {/* OVERALL SCORE HERO CARD */}
      <section className="glass-panel p-8 rounded-3xl border border-indigo-200 dark:border-indigo-900/60 shadow-xl bg-gradient-to-r from-white via-indigo-50/30 to-purple-50/30 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-4 text-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 pb-6 md:pb-0 md:pr-6">
            <ScoreCircle score={presentation.overallScore} size="xl" />
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> AI Diagnostic Summary
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-snug">
              Overall Score: {presentation.overallScore} / 100 — <span className="gradient-text">{presentation.rating}</span>
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
              {presentation.summary}
            </p>

            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span className="font-semibold">AI Quality Benchmark Goal: <strong className="text-indigo-600 dark:text-indigo-400">85+ Points</strong></span>
              <span className="text-slate-500">
                {presentation.overallScore >= 85 ? '✅ Exceeds benchmark' : `Needed: +${85 - presentation.overallScore} pts`}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* CATEGORY SCORE BREAKDOWN GRID (Section 16) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Category Score Breakdown
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Weighted scoring breakdown across all 10 evaluation categories (100 pts total)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORY_DEFINITIONS.map((cat) => (
            <CategoryScore
              key={cat.key}
              category={cat}
              score={presentation.categoryScores ? presentation.categoryScores[cat.key] || 0 : 0}
              maxScore={cat.maxScore}
            />
          ))}
        </div>
      </section>

      {/* VISUAL DIAGNOSTIC CHARTS & HEALTH METERS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Radar Chart */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Category Score Radar Comparison
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Normalized 6-axis presentation balance footprint
          </p>
          <CategoryRadarChart categoryScores={presentation.categoryScores || {}} />
        </div>

        {/* Right: Health Meters */}
        <div className="lg:col-span-6">
          <HealthMeter health={presentation.health} />
        </div>

      </section>

      {/* STRENGTHS & WEAKNESSES SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StrengthCard strengths={presentation.strengths} />
        <WeaknessCard weaknesses={presentation.weaknesses} />
      </section>

      {/* TOP 5 PRIORITY IMPROVEMENTS & ACTION PLAN (Section 30 & 38) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-indigo-600 dark:text-indigo-400">#</span> Top 5 Priority Improvements
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              High-impact fixes to boost your presentation score before presenting
            </p>
          </div>

          <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800">
            {Object.values(completedRecs).filter(Boolean).length} / {presentation.recommendations?.length || 0} Tasks Completed
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {presentation.recommendations?.map((rec, idx) => (
            <RecommendationCard
              key={rec.id || idx}
              rec={rec}
              index={idx}
              isCompleted={!!completedRecs[rec.id]}
              onToggleComplete={toggleRecComplete}
            />
          ))}
        </div>
      </section>

      {/* SLIDE-BY-SLIDE ANALYSIS (Section 31 & 32) */}
      <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Slide-by-Slide Analysis
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click any slide below to inspect individual issues, text density, and AI recommendations
          </p>
        </div>

        {/* Slide Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {presentation.slides?.map((slide, idx) => (
            <SlideCard
              key={idx}
              slide={slide}
              isSelected={selectedSlideIndex === idx}
              onClick={() => setSelectedSlideIndex(idx)}
            />
          ))}
        </div>

        {/* Selected Slide Detail View */}
        {selectedSlide && (
          <SlideAnalysis slide={selectedSlide} />
        )}
      </section>

      {/* DOWNLOAD REPORT MODAL */}
      <Modal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        title="Download AI Report"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Select export format for <strong>{presentation.title}</strong>:
          </p>

          <div className="space-y-2">
            <button
              onClick={() => handleDownload('PDF Executive Report')}
              className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 bg-white dark:bg-slate-800 text-left flex items-center justify-between transition-all group"
            >
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600">
                  📄 Full PDF Report
                </h5>
                <p className="text-xs text-slate-500">Complete analysis with charts, slide cards & scores.</p>
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
            </button>

            <button
              onClick={() => handleDownload('Presentation Summary Text')}
              className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 bg-white dark:bg-slate-800 text-left flex items-center justify-between transition-all group"
            >
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600">
                  📝 Executive Summary Text
                </h5>
                <p className="text-xs text-slate-500">High level key takeaways for email or slack.</p>
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
            </button>

            <button
              onClick={() => handleDownload('Improvement Action Plan')}
              className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 bg-white dark:bg-slate-800 text-left flex items-center justify-between transition-all group"
            >
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600">
                  ☑️ Improvement Checklist
                </h5>
                <p className="text-xs text-slate-500">Action items to fix before your final presentation.</p>
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
            </button>
          </div>

          {downloadSuccessMsg && (
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{downloadSuccessMsg}</span>
            </div>
          )}
        </div>
      </Modal>

      {/* SHARE REPORT MODAL */}
      <Modal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Share Presentation Analysis"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Share this report link with teammates, advisors, or educators:
          </p>

          <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
            <input
              type="text"
              readOnly
              value={window.location.href}
              className="w-full text-xs bg-transparent text-slate-800 dark:text-slate-200 font-mono outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center gap-1 shrink-0"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Link
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
