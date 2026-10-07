import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { PRESENTATION_TYPES, AUDIENCE_OPTIONS, GOAL_OPTIONS } from '../data/categories';
import UploadBox from '../components/UploadBox';
import AnalysisLoader from '../components/AnalysisLoader';
import { analyzePresentationAPI } from '../services/aiService';

export default function Analyze() {
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState('general');
  const [selectedAudience, setSelectedAudience] = useState('General Audience');
  const [customAudience, setCustomAudience] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('Inform');
  
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentProgressStep, setCurrentProgressStep] = useState('Preparing analysis...');

  const handleStartAnalysis = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const finalAudience = selectedAudience === 'Custom Audience' && customAudience.trim()
      ? customAudience.trim()
      : selectedAudience;

    try {
      const result = await analyzePresentationAPI({
        file: selectedFile.file,
        presentationType: selectedType,
        audience: finalAudience,
        goal: selectedGoal,
        slideCount: selectedFile.slidesCount || 10,
        onProgress: (stage) => {
          setAnalysisProgress(stage.progress);
          setCurrentProgressStep(stage.label);
        }
      });

      // Redirect to results page
      navigate(`/results/${result.id}`);
    } catch (error) {
      console.error('Analysis failed:', error);
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <AnalysisLoader progress={analysisProgress} currentStep={currentProgressStep} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Heading */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Analyze Your Presentation
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto">
          Upload your presentation and get detailed AI feedback across 10 category metrics and individual slide cards.
        </p>
      </div>

      {/* Step 1: Presentation Type Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">1</span>
            Select Presentation Type
          </h3>
          <span className="text-xs text-slate-400 font-medium">Influences scoring weighting</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PRESENTATION_TYPES.map((pt) => {
            const IconComp = Icons[pt.icon] || Icons.Layers;
            const isSelected = selectedType === pt.id;

            return (
              <div
                key={pt.id}
                onClick={() => setSelectedType(pt.id)}
                className={`glass-panel p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  {isSelected && <Icons.CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-0.5">
                    {pt.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                    {pt.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 2: Audience Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">2</span>
          Who is your audience?
        </h3>

        <div className="flex flex-wrap gap-2">
          {AUDIENCE_OPTIONS.map((aud) => {
            const isSelected = selectedAudience === aud;
            return (
              <button
                key={aud}
                type="button"
                onClick={() => setSelectedAudience(aud)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'glass-panel text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {aud}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setSelectedAudience('Custom Audience')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              selectedAudience === 'Custom Audience'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'glass-panel text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Custom Audience...
          </button>
        </div>

        {selectedAudience === 'Custom Audience' && (
          <div className="mt-2">
            <input
              type="text"
              placeholder="e.g. Hospital Board Directors, Angel Investors, High School Students..."
              value={customAudience}
              onChange={(e) => setCustomAudience(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Step 3: Goal Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">3</span>
          What is the goal of your presentation?
        </h3>

        <div className="flex flex-wrap gap-2">
          {GOAL_OPTIONS.map((g) => {
            const isSelected = selectedGoal === g;
            return (
              <button
                key={g}
                type="button"
                onClick={() => setSelectedGoal(g)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'glass-panel text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 4: Upload Area */}
      <div className="space-y-4 pt-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">4</span>
          Upload Presentation File
        </h3>

        <UploadBox
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          onStartAnalysis={handleStartAnalysis}
          isLoading={isAnalyzing}
        />
      </div>

    </div>
  );
}

