import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Award,
  TrendingUp,
  CheckCircle2,
  Plus,
  ArrowRight,
} from 'lucide-react';
import PresentationCard from '../components/PresentationCard';
import { GooeyInput } from '../components/ui/gooey-input';
import { getPresentations, deletePresentation } from '../services/storageService';

export default function Dashboard({ userAuth }) {
  const navigate = useNavigate();
  const [presentations, setPresentations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getPresentations()
      .then(setPresentations)
      .catch((error) => setErrorMsg(error.message || 'Could not load presentations.'));
  }, []);

  const handleDelete = async (id) => {
    try {
      const updated = await deletePresentation(id);
      setPresentations(updated);
    } catch (error) {
      setErrorMsg(error.message || 'Could not delete this presentation.');
    }
  };

  const handleAnalyzeAgain = () => {
    navigate('/analyze');
  };

  // Stats
  const totalCount = presentations.length;
  const avgScore = totalCount > 0
    ? Math.round(presentations.reduce((acc, p) => acc + p.overallScore, 0) / totalCount)
    : 0;
  const bestScore = totalCount > 0
    ? Math.max(...presentations.map(p => p.overallScore))
    : 0;

  const filtered = presentations.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Welcome back 👋 {userAuth?.user?.name || 'Presenter'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Track your presentation scores, view history, and keep elevating slide impact.
          </p>
        </div>

        <Link
          to="/analyze"
          className="px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 inline-flex items-center gap-2 transition-all shrink-0"
        >
          <Plus className="w-5 h-5" /> Analyze Presentation
        </Link>
      </div>

      {errorMsg && (
        <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-700">
          {errorMsg}
        </div>
      )}

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Presentations
            </span>
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {totalCount}
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Average Score
            </span>
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {avgScore} <span className="text-xs font-normal text-slate-400">/100</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Best Score
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {bestScore} <span className="text-xs font-normal text-slate-400">/100</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Improvements Made
            </span>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            27
          </div>
        </div>

      </div>

      {/* Recent Analyses Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Recent Analyses
          </h2>

          <GooeyInput
            placeholder="Search presentations..."
            value={searchTerm}
            onValueChange={setSearchTerm}
            className="w-full sm:w-80"
            collapsedWidth={190}
            expandedWidth={280}
            expandedOffset={0}
          />
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <PresentationCard
                key={p.id}
                presentation={p}
                onDelete={handleDelete}
                onAnalyzeAgain={handleAnalyzeAgain}
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel p-12 rounded-3xl text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No presentations analyzed yet.
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Upload your first presentation and get your AI score and actionable feedback.
            </p>
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Analyze Presentation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}
