import { getRatingInfo } from '../utils/scoreUtils';

export const runMockAnalysis = ({
  fileName = 'Presentation.pptx',
  presentationType = 'general',
  audience = 'General Audience',
  goal = 'Inform',
  slideCount = 10,
  fileSize = 4200000
}) => {
  // Deterministic seed generation based on file string to keep scoring consistent for same file
  let hash = 0;
  const seedString = `${fileName}-${presentationType}-${audience}-${goal}-${slideCount}`;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash << 5) - hash + seedString.charCodeAt(i);
    hash |= 0;
  }
  const pseudoRandom = (min, max, offset = 0) => {
    const x = Math.sin(hash + offset) * 10000;
    const rnd = x - Math.floor(x);
    return Math.floor(rnd * (max - min + 1)) + min;
  };

  // Adjust baseline category scores based on presentation type & audience fit
  let baseContent = pseudoRandom(11, 15, 1);
  let baseStructure = pseudoRandom(11, 15, 2);
  let baseDesign = pseudoRandom(10, 14, 3);
  let baseReadability = pseudoRandom(6, 10, 4);
  let baseTypography = pseudoRandom(5, 8, 5);
  let baseVisuals = pseudoRandom(5, 8, 6);
  let baseClarity = pseudoRandom(7, 10, 7);
  let baseEvidence = pseudoRandom(4, 7, 8);
  let baseConsistency = pseudoRandom(4, 7, 9);
  let baseEngagement = pseudoRandom(3, 5, 10);

  // Type specific adjustments
  if (presentationType === 'startup') {
    baseStructure = Math.min(15, baseStructure + 1);
    baseEngagement = Math.min(5, baseEngagement + 1);
    if (slideCount > 15) {
      baseReadability = Math.max(4, baseReadability - 2);
      baseClarity = Math.max(5, baseClarity - 2);
    }
  } else if (presentationType === 'academic' || presentationType === 'technical') {
    baseEvidence = Math.min(7, baseEvidence + 1);
    baseContent = Math.min(15, baseContent + 1);
    baseVisuals = Math.max(4, baseVisuals - 1);
  } else if (presentationType === 'marketing') {
    baseVisuals = Math.min(8, baseVisuals + 1);
    baseEngagement = Math.min(5, baseEngagement + 1);
  }

  const categoryScores = {
    content: baseContent,
    structure: baseStructure,
    design: baseDesign,
    readability: baseReadability,
    typography: baseTypography,
    visuals: baseVisuals,
    clarity: baseClarity,
    evidence: baseEvidence,
    consistency: baseConsistency,
    engagement: baseEngagement
  };

  const overallScore = Object.values(categoryScores).reduce((acc, curr) => acc + curr, 0);
  const ratingObj = getRatingInfo(overallScore);

  const health = {
    content: Math.round((baseContent / 15) * 100),
    design: Math.round((baseDesign / 15) * 100),
    readability: Math.round((baseReadability / 10) * 100),
    structure: Math.round((baseStructure / 15) * 100),
    evidence: Math.round((baseEvidence / 7) * 100)
  };

  // Generate dynamic strengths
  const strengths = [
    `Clear narrative alignment for target audience (${audience})`,
    `Strong logical sequence tailored for ${goal.toLowerCase()} objectives`,
    `Consistent visual palette matching ${presentationType} standards`,
    `Effective slide title structure across major sections`,
    `Good balance of empirical data and takeaway highlights`
  ];

  // Dynamic weaknesses & priority recommendations
  const weaknesses = [];
  const recommendations = [];

  if (baseReadability < 8) {
    weaknesses.push(`Text density is high on slides 3 and 5, reducing scanning speed`);
    recommendations.push({
      id: 'rec-auto-1',
      priority: 'High',
      slideNumber: 3,
      problem: 'Too Much Text',
      explanation: 'Slide 3 contains a continuous paragraph exceeding recommended 60-word limits.',
      solution: 'Convert paragraph into 3 concise bullet points with key metrics highlighted.'
    });
  }

  if (baseEvidence < 6) {
    weaknesses.push(`Data claims lack explicit research or journal citations on key slides`);
    recommendations.push({
      id: 'rec-auto-2',
      priority: 'High',
      slideNumber: 5,
      problem: 'Missing Citation',
      explanation: 'Statistical claim on slide 5 lacks explicit primary source attribution.',
      solution: 'Add reference citation in footer caption format at bottom of slide.'
    });
  }

  if (baseTypography < 7) {
    weaknesses.push(`Font size hierarchy varies across sub-headings on slides 4 and 7`);
    recommendations.push({
      id: 'rec-auto-3',
      priority: 'Medium',
      slideNumber: 4,
      problem: 'Inconsistent Typography',
      explanation: 'Heading size drops from 28pt on slide 2 to 20pt on slide 4.',
      solution: 'Apply global master slide style rules to enforce uniform 28pt section titles.'
    });
  }

  if (baseVisuals < 7) {
    weaknesses.push(`Slide 6 relies heavily on text without supporting diagrams or icons`);
    recommendations.push({
      id: 'rec-auto-4',
      priority: 'Medium',
      slideNumber: 6,
      problem: 'Missing Visual Support',
      explanation: 'Key 3-step workflow is presented as plain text lines.',
      solution: 'Replace text list with a 3-stage process flow diagram with icons.'
    });
  }

  // Always ensure at least 3-5 recommendations
  if (recommendations.length < 5) {
    recommendations.push({
      id: 'rec-auto-5',
      priority: 'Low',
      slideNumber: Math.min(slideCount, 8),
      problem: 'Weak Conclusion Call-to-Action',
      explanation: 'Final slide lacks clear next steps or discussion questions for the audience.',
      solution: 'Add a high-impact summary block with 2 action items for the audience.'
    });
  }

  // Generate dynamic slides list
  const slides = [];
  for (let s = 1; s <= slideCount; s++) {
    const sScore = Math.min(98, Math.max(55, overallScore + pseudoRandom(-15, 12, s)));
    const sRating = getRatingInfo(sScore);

    const sProblems = [];
    const sRecs = [];

    if (sScore < 70) {
      sProblems.push('🔴 Too much text', '🟠 Weak visual hierarchy');
      sRecs.push('Reduce word count by 40% and add a visual icon graphic.');
    } else if (sScore < 85) {
      sProblems.push('🟡 Minor spacing misalignment');
      sRecs.push('Increase line spacing from 1.1 to 1.3 for easier reading.');
    }

    slides.push({
      slideNumber: s,
      score: sScore,
      title: s === 1 ? `Title Slide: ${fileName.replace(/\.[^/.]+$/, '')}` : `Slide ${s}: Key Focus Area ${s - 1}`,
      status: sRating.label,
      mainMessage: `Key takeaway regarding ${presentationType} objectives for ${audience}.`,
      breakdown: {
        content: Math.min(15, Math.round(baseContent * (sScore / 85))),
        design: Math.min(15, Math.round(baseDesign * (sScore / 85))),
        readability: Math.min(10, Math.round(baseReadability * (sScore / 85))),
        typography: Math.min(8, Math.round(baseTypography * (sScore / 85))),
        visuals: Math.min(8, Math.round(baseVisuals * (sScore / 85))),
        clarity: Math.min(10, Math.round(baseClarity * (sScore / 85))),
        consistency: Math.min(7, Math.round(baseConsistency * (sScore / 85)))
      },
      problems: sProblems,
      recommendations: sRecs.length ? sRecs : ['Slide structure adheres well to visual design standards.']
    });
  }

  const summary = `This presentation delivers a ${ratingObj.label.toLowerCase()} baseline structure for ${presentationType} delivery. Its key strengths lie in content clarity and logical organization. Addressing slide density and visual diagram support will elevate it to top-tier impact.`;

  return {
    id: `analysis-${Date.now()}`,
    title: fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
    fileName,
    type: presentationType,
    audience,
    goal,
    slideCount,
    overallScore,
    rating: ratingObj.label,
    analyzedAt: new Date().toISOString().split('T')[0],
    categoryScores,
    health,
    summary,
    strengths,
    weaknesses,
    recommendations,
    slides
  };
};

