import { runMockAnalysis } from './analysisEngine';
import { savePresentation } from './storageService';

/**
 * AI Service Architecture
 * Frontend interface designed to seamlessly swap between mock AI engine
 * and real backend REST/WebSocket endpoints.
 */
export const analyzePresentationAPI = async ({
  file,
  presentationType = 'general',
  audience = 'General Audience',
  goal = 'Inform',
  slideCount = 10,
  onProgress
}) => {
  // Simulate progressive analysis stages (0% -> 100%)
  const stages = [
    { progress: 10, label: 'Reading presentation file...' },
    { progress: 20, label: 'Understanding slide content & text density...' },
    { progress: 35, label: 'Checking slide narrative & storytelling flow...' },
    { progress: 50, label: 'Evaluating visual design & color contrast...' },
    { progress: 65, label: 'Analyzing typography & line spacing...' },
    { progress: 80, label: 'Checking evidence, facts & citations...' },
    { progress: 95, label: 'Generating slide-by-slide recommendations...' },
    { progress: 100, label: 'Analysis complete!' }
  ];

  for (const stage of stages) {
    if (onProgress) {
      onProgress(stage);
    }
    // Artificial delay for smooth UX analysis loading state (approx 3.5 sec total)
    await new Promise((resolve) => setTimeout(resolve, 450));
  }

  // Run structured mock analysis engine
  const analysisResult = runMockAnalysis({
    fileName: file ? file.name : 'Presentation.pptx',
    presentationType,
    audience,
    goal,
    slideCount: slideCount || 10,
    fileSize: file ? file.size : 4000000
  });

  // Persist to local storage history
  savePresentation(analysisResult);

  return analysisResult;
};

