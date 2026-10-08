import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Filter, History as HistoryIcon, Plus, ArrowRight } from 'lucide-react';
import PresentationCard from '../components/PresentationCard';
import { GooeyInput } from '../components/ui/gooey-input';
import { getPresentations, deletePresentation } from '../services/storageService';

export default function History() {
  const navigate = useNavigate();
  const [presentations, setPresentations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getPresentations()
      .then(setPresentations)
      .catch((error) => setErrorMsg(error.message || 'Could not load analysis history.'));
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

  // Filter & Sort Logic
  let processed = [...presentations];

  if (searchTerm.trim()) {
    const q = searchTerm.toLowerCase();
    processed = processed.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.fileName.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q)
    );
  }

  if (filterType !== 'all') {
    processed = processed.filter(p => p.type === filterType);
  }

  if (sortBy === 'highest') {
    processed.sort((a, b) => b.overallScore - a.overallScore);
  } else if (sortBy === 'lowest') {
    processed.sort((a, b) => a.overallScore - b.overallScore);
  } else {
    // recent
    processed.sort((a, b) => new Date(b.analyzedAt || 0) - new Date(a.analyzedAt || 0));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <HistoryIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            Analysis History
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Browse and review all your previously evaluated presentations.
          </p>
        </div>

        <Link
          to="/analyze"
          className="px-5 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md flex items-center gap-2 text-xs shrink-0"
        >
          <Plus className="w-4 h-4" /> Analyze New Presentation
        </Link>
      </div>

      {errorMsg && (
        <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-700">
          {errorMsg}
        </div>
      )}

      {/* Search, Filter & Sort Controls */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <GooeyInput
          placeholder="Search presentation title or file..."
          value={searchTerm}
          onValueChange={setSearchTerm}
          className="w-full md:w-80"
          collapsedWidth={200}
          expandedWidth={300}
          expandedOffset={0}
        />

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          {/* Filter dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="academic">Academic</option>
              <option value="business">Business</option>
              <option value="startup">Startup Pitch</option>
              <option value="marketing">Marketing</option>
              <option value="educational">Educational</option>
              <option value="technical">Technical</option>
            </select>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Score</option>
              <option value="lowest">Lowest Score</option>
            </select>
          </div>

        </div>

      </div>

      {/* Grid */}
      {processed.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processed.map((p) => (
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
            <HistoryIcon className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Your analysis history will appear here.
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            No matching presentations found for your search/filter criteria.
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
  );
}
