export const INITIAL_DEMO_PRESENTATIONS = [
  {
    id: 'presentation-001',
    title: 'AI in Healthcare',
    fileName: 'AI_in_Healthcare.pptx',
    type: 'academic',
    audience: 'Students',
    goal: 'Inform',
    slideCount: 10,
    overallScore: 82,
    rating: 'Excellent',
    analyzedAt: '2026-10-06',
    
    categoryScores: {
      content: 13,
      structure: 14,
      design: 12,
      readability: 8,
      typography: 7,
      visuals: 6,
      clarity: 9,
      evidence: 5,
      consistency: 6,
      engagement: 2
    },

    health: {
      content: 87,
      design: 80,
      readability: 80,
      structure: 93,
      evidence: 71
    },

    summary: 'This presentation has a strong structure and clear objective. Its biggest weakness is information density, particularly in slides 4, 6 and 8. Improving visual storytelling and reducing text would significantly increase its overall presentation impact.',

    strengths: [
      'Strong logical narrative sequence from clinical problems to AI solutions',
      'Consistent indigo/blue primary color theme across slide backgrounds',
      'Clear introduction with slide outline and executive agenda',
      'Good use of real-world medical imaging case studies',
      'Strong concluding slide with clear takeaways'
    ],

    weaknesses: [
      'Slide 4 contains an overloaded paragraph with 110+ words',
      'Slide 7 lacks visual diagrams for the diagnostic neural net architecture',
      'Statistical statements on Slide 8 miss primary journal citations',
      'Inconsistent font size variations between body text on Slide 5 and Slide 10'
    ],

    recommendations: [
      {
        id: 'rec-1',
        priority: 'High',
        slideNumber: 4,
        problem: 'Too Much Text',
        explanation: 'Slide 4 contains a 110-word continuous paragraph that overwhelms viewers during live delivery.',
        solution: 'Convert the paragraph into 4 concise bullet points (40-60 words total) and add an illustrative diagram.'
      },
      {
        id: 'rec-2',
        priority: 'High',
        slideNumber: 8,
        problem: 'Missing Citation',
        explanation: 'The claim that AI reduces diagnostic error by 34% lacks reference source data.',
        solution: 'Add the original journal citation (e.g. Lancet Digital Health 2025) in small caption text at the bottom.'
      },
      {
        id: 'rec-3',
        priority: 'Medium',
        slideNumber: 6,
        problem: 'Weak Visual Hierarchy',
        explanation: 'Heading font size matches body text size, making key takeaways hard to scan.',
        solution: 'Increase heading weight to Bold and scale font size from 18pt to 28pt.'
      },
      {
        id: 'rec-4',
        priority: 'Medium',
        slideNumber: 10,
        problem: 'Inconsistent Typography',
        explanation: 'Slide 10 switches font family from Inter to Times New Roman.',
        solution: 'Standardize font family to Inter across all master layout templates.'
      },
      {
        id: 'rec-5',
        priority: 'Low',
        slideNumber: 9,
        problem: 'Weak Call-to-Action Conclusion',
        explanation: 'The conclusion slide ends abruptly without explicit discussion prompts.',
        solution: 'Add a bullet list with 2 open discussion questions for student engagement.'
      }
    ],

    slides: [
      {
        slideNumber: 1,
        score: 92,
        title: 'Title Slide: AI in Healthcare',
        status: 'Excellent',
        mainMessage: 'Artificial intelligence is revolutionizing modern clinical diagnosis and patient outcome accuracy.',
        breakdown: { content: 14, design: 14, readability: 9, typography: 8, visuals: 7, clarity: 10, consistency: 7 },
        problems: [],
        recommendations: ['Consider adding a subtler hero graphic overlay behind the presentation subtitle.']
      },
      {
        slideNumber: 2,
        score: 88,
        title: 'Executive Agenda & Scope',
        status: 'Excellent',
        mainMessage: 'Overview of key topics covering imaging, diagnostics, ethical bounds, and future outlook.',
        breakdown: { content: 14, design: 13, readability: 9, typography: 8, visuals: 6, clarity: 9, consistency: 7 },
        problems: ['Slightly uneven spacing between agenda items.'],
        recommendations: ['Increase vertical gap between items by 12px for better readability.']
      },
      {
        slideNumber: 3,
        score: 84,
        title: 'The Diagnostic Challenge',
        status: 'Good',
        mainMessage: 'Radiologists face skyrocketing scan volumes leading to cognitive fatigue and delays.',
        breakdown: { content: 13, design: 12, readability: 8, typography: 7, visuals: 6, clarity: 9, consistency: 6 },
        problems: ['Text alignment is slightly off center.'],
        recommendations: ['Align bullet items flush left with 24px left margin offset.']
      },
      {
        slideNumber: 4,
        score: 61,
        title: 'Neural Networks in Radiology',
        status: 'Needs Improvement',
        mainMessage: 'Convolutional neural networks process CT and MRI scans to flag micro-anomalies early.',
        breakdown: { content: 11, design: 8, readability: 4, typography: 5, visuals: 4, clarity: 6, consistency: 5 },
        problems: ['🔴 Too much text (110 words)', '🟠 Weak visual hierarchy', '🟡 Long continuous block paragraph'],
        recommendations: ['Reduce text density by 50% and introduce a 3-step CNN pipeline graphic.']
      },
      {
        slideNumber: 5,
        score: 85,
        title: 'Clinical Efficacy & Case Studies',
        status: 'Excellent',
        mainMessage: 'Empirical data shows 34% faster triage times in emergency trauma wards.',
        breakdown: { content: 14, design: 12, readability: 8, typography: 7, visuals: 7, clarity: 9, consistency: 6 },
        problems: ['Chart legend font is small.'],
        recommendations: ['Increase legend font size to 12pt for high contrast visibility.']
      },
      {
        slideNumber: 6,
        score: 72,
        title: 'Key Benefits for Hospitals',
        status: 'Good',
        mainMessage: 'Operational cost reductions and improved patient turnaround times.',
        breakdown: { content: 12, design: 10, readability: 7, typography: 6, visuals: 5, clarity: 8, consistency: 6 },
        problems: ['🟠 Weak visual hierarchy', '🟡 Unbalanced whitespace'],
        recommendations: ['Group benefits into 3 distinct visual cards rather than plain bullet points.']
      },
      {
        slideNumber: 7,
        score: 79,
        title: 'Ethical & Data Privacy Considerations',
        status: 'Good',
        mainMessage: 'Patient data security and algorithmic bias must be mitigated by design.',
        breakdown: { content: 13, design: 11, readability: 8, typography: 7, visuals: 4, clarity: 8, consistency: 6 },
        problems: ['Missing visual illustrations for privacy protocols.'],
        recommendations: ['Add shield/lock icons beside HIPPA compliance items.']
      },
      {
        slideNumber: 8,
        score: 68,
        title: 'Comparative Benchmark Statistics',
        status: 'Needs Improvement',
        mainMessage: 'Statistical comparison between manual diagnostic accuracy vs AI-assisted review.',
        breakdown: { content: 10, design: 9, readability: 6, typography: 6, visuals: 6, clarity: 7, consistency: 5 },
        problems: ['🔴 Unsupported statistic', '🟡 Missing source citation'],
        recommendations: ['Provide reference citations in footer and clarify percentage sample sizes.']
      },
      {
        slideNumber: 9,
        score: 86,
        title: 'Implementation Roadmap',
        status: 'Excellent',
        mainMessage: 'A 4-phase rollout plan for integrating AI into existing hospital EHR systems.',
        breakdown: { content: 13, design: 14, readability: 9, typography: 7, visuals: 8, clarity: 9, consistency: 7 },
        problems: [],
        recommendations: ['Timeline graphics look great! Add phase duration indicators.']
      },
      {
        slideNumber: 10,
        score: 90,
        title: 'Conclusion & Key Takeaways',
        status: 'Outstanding',
        mainMessage: 'AI is a powerful force multiplier for healthcare professionals when implemented responsibly.',
        breakdown: { content: 14, design: 14, readability: 9, typography: 7, visuals: 7, clarity: 10, consistency: 6 },
        problems: ['Inconsistent typography font family on footer.'],
        recommendations: ['Match body font with previous slides for flawless consistency.']
      }
    ]
  },
  {
    id: 'presentation-002',
    title: 'Climate Change Action Plan',
    fileName: 'Climate_Action_2026.pdf',
    type: 'educational',
    audience: 'Researchers',
    goal: 'Research',
    slideCount: 11,
    overallScore: 76,
    rating: 'Good',
    analyzedAt: '2026-10-01',
    categoryScores: {
      content: 12,
      structure: 11,
      design: 10,
      readability: 7,
      typography: 6,
      visuals: 6,
      clarity: 8,
      evidence: 6,
      consistency: 6,
      engagement: 4
    },
    health: { content: 80, design: 67, readability: 70, structure: 73, evidence: 85 },
    summary: 'Strong research data and empirical citations throughout, but slide visual layout and text contrast need refining for public engagement.',
    strengths: ['Rigorous research data citations', 'Clear environmental impact charts', 'Well-defined carbon reduction targets'],
    weaknesses: ['Low color contrast on slides 3 and 7', 'Dense paragraphs in methodology slides', 'Inconsistent heading margins'],
    recommendations: [
      { id: 'rec-c1', priority: 'High', slideNumber: 3, problem: 'Low Color Contrast', explanation: 'Gray text on light gray background fails WCAG accessibility guidelines.', solution: 'Darken body text color to #0f172a.' },
      { id: 'rec-c2', priority: 'High', slideNumber: 7, problem: 'Crowded Layout', explanation: 'Slide 7 packs 3 charts and 2 paragraphs into a single slide grid.', solution: 'Split Slide 7 into two separate slides.' },
      { id: 'rec-c3', priority: 'Medium', slideNumber: 5, problem: 'Tiny Font Size', explanation: 'Data table labels are 9pt font, impossible to read from distance.', solution: 'Increase font size to at least 14pt.' },
      { id: 'rec-c4', priority: 'Medium', slideNumber: 9, problem: 'Unclear Chart Axes', explanation: 'Emissions metric axis lacks measurement units (Mt vs Gt).', solution: 'Add clear axis labels (Gigatons of CO2 equivalent).' },
      { id: 'rec-c5', priority: 'Low', slideNumber: 11, problem: 'Abrupt Ending', explanation: 'Presentation finishes without summary contact details.', solution: 'Add presenter contact and policy repository links.' }
    ],
    slides: [
      { slideNumber: 1, score: 85, title: 'Global Climate Crisis Overview', status: 'Excellent', mainMessage: 'Urgent decarbonization measures are required to stay under 1.5C global warming.', breakdown: { content: 13, design: 13, readability: 8, typography: 7, visuals: 7, clarity: 9, consistency: 6 }, problems: [], recommendations: ['Good clean title layout.'] },
      { slideNumber: 2, score: 78, title: 'Key Emission Drivers', status: 'Good', mainMessage: 'Energy generation and heavy transport account for over 60% of total emissions.', breakdown: { content: 12, design: 11, readability: 8, typography: 6, visuals: 6, clarity: 8, consistency: 6 }, problems: ['Inconsistent line spacing.'], recommendations: ['Set line-height to 1.5.'] },
      { slideNumber: 3, score: 62, title: 'Regional Footprint Analysis', status: 'Needs Improvement', mainMessage: 'Comparative breakdown of regional carbon outputs.', breakdown: { content: 10, design: 7, readability: 5, typography: 5, visuals: 6, clarity: 7, consistency: 5 }, problems: ['🔴 Low contrast text', '🟡 Small chart font'], recommendations: ['Increase text contrast and simplify color keys.'] }
    ]
  },
  {
    id: 'presentation-003',
    title: 'Series A Startup Pitch Deck',
    fileName: 'FinTech_SeriesA_Pitch.pptx',
    type: 'startup',
    audience: 'Investors',
    goal: 'Pitch',
    slideCount: 12,
    overallScore: 91,
    rating: 'Outstanding',
    analyzedAt: '2026-10-04',
    categoryScores: {
      content: 14,
      structure: 15,
      design: 14,
      readability: 9,
      typography: 7,
      visuals: 7,
      clarity: 9,
      evidence: 6,
      consistency: 6,
      engagement: 4
    },
    health: { content: 93, design: 93, readability: 90, structure: 100, evidence: 86 },
    summary: 'An exemplary startup pitch deck with immaculate visual storytelling, clear value proposition, and compelling financial metrics.',
    strengths: ['Concise 12-slide investor narrative structure', 'Bold metric callouts highlighting 3.5x YoY growth', 'Flawless typography and visual spacing', 'Compelling competitive moat matrix'],
    weaknesses: ['Slide 9 financial pro-forma chart could highlight net margin more clearly', 'Slide 11 team slide missing LinkedIn profile QR codes'],
    recommendations: [
      { id: 'rec-s1', priority: 'Medium', slideNumber: 9, problem: 'Chart Legend Clarity', explanation: 'Net margin line graph blends in with gross revenue bars.', solution: 'Use contrasting emerald accent color for net margin trend line.' },
      { id: 'rec-s2', priority: 'Low', slideNumber: 11, problem: 'Missing Founder Links', explanation: 'Investor team slide lacks clickable/scannable profiles.', solution: 'Add small QR codes linking to founder executive credentials.' }
    ],
    slides: [
      { slideNumber: 1, score: 96, title: 'PayPulse - NextGen B2B Payments', status: 'Outstanding', mainMessage: 'Eliminating cross-border settlement latency for global enterprises.', breakdown: { content: 15, design: 15, readability: 9, typography: 8, visuals: 8, clarity: 10, consistency: 7 }, problems: [], recommendations: ['Flawless title presentation.'] },
      { slideNumber: 2, score: 94, title: 'The \$50B Inefficiency Problem', status: 'Outstanding', mainMessage: 'Traditional wire transfers cost 3.2% in fees and take 3 days to settle.', breakdown: { content: 15, design: 14, readability: 9, typography: 7, visuals: 8, clarity: 9, consistency: 7 }, problems: [], recommendations: ['Strong emotional hook.'] }
    ]
  },
  {
    id: 'presentation-004',
    title: 'Machine Learning Basics',
    fileName: 'ML_Architecture_Lecture.pdf',
    type: 'technical',
    audience: 'Developers',
    goal: 'Teach',
    slideCount: 14,
    overallScore: 87,
    rating: 'Excellent',
    analyzedAt: '2026-09-28',
    categoryScores: {
      content: 14,
      structure: 13,
      design: 13,
      readability: 9,
      typography: 7,
      visuals: 6,
      clarity: 9,
      evidence: 6,
      consistency: 6,
      engagement: 4
    },
    health: { content: 93, design: 87, readability: 90, structure: 87, evidence: 86 },
    summary: 'Very clear technical presentation with step-by-step code snippets and diagrammatic explanations of algorithm mechanics.',
    strengths: ['High-contrast code snippet blocks', 'Clear mathematical notation', 'Practical python implementation examples'],
    weaknesses: ['Slide 8 math equation line spacing is slightly tight', 'Diagram icons vary in stroke weight'],
    recommendations: [
      { id: 'rec-m1', priority: 'Medium', slideNumber: 8, problem: 'Dense Math Formula', explanation: 'Loss function formula feels compressed against text.', solution: 'Add 16px vertical margin padding above and below math block.' }
    ],
    slides: [
      { slideNumber: 1, score: 90, title: 'Intro to Machine Learning', status: 'Outstanding', mainMessage: 'Supervised vs Unsupervised learning paradigms explained.', breakdown: { content: 14, design: 13, readability: 9, typography: 7, visuals: 7, clarity: 9, consistency: 6 }, problems: [], recommendations: ['Clean slide visual.'] }
    ]
  },
  {
    id: 'presentation-005',
    title: 'Digital Marketing Strategy',
    fileName: 'Q4_Growth_Plan.pptx',
    type: 'marketing',
    audience: 'Executives',
    goal: 'Persuade',
    slideCount: 9,
    overallScore: 73,
    rating: 'Good',
    analyzedAt: '2026-09-22',
    categoryScores: {
      content: 11,
      structure: 11,
      design: 10,
      readability: 7,
      typography: 6,
      visuals: 6,
      clarity: 7,
      evidence: 5,
      consistency: 6,
      engagement: 4
    },
    health: { content: 73, design: 67, readability: 70, structure: 73, evidence: 71 },
    summary: 'Covers key customer acquisition channels well, but suffers from inconsistent slide templates and crowded bullet list layouts.',
    strengths: ['Clear campaign ROI projections', 'Well defined customer persona segment'],
    weaknesses: ['Bullet lists are overly lengthy on slides 3, 5, and 6', 'Color palette changes mid-presentation', 'Missing clear budget breakdown summary slide'],
    recommendations: [
      { id: 'rec-d1', priority: 'High', slideNumber: 5, problem: 'Inconsistent Color Theme', explanation: 'Switches from corporate navy blue to neon teal suddenly.', solution: 'Standardize brand palette across all master templates.' },
      { id: 'rec-d2', priority: 'High', slideNumber: 3, problem: 'Too Many Bullet Points', explanation: 'Slide 3 has 8 bullet points with 2 lines each.', solution: 'Limit bullets to maximum 4 key points per slide.' }
    ],
    slides: [
      { slideNumber: 1, score: 78, title: 'Q4 Growth Strategy Overview', status: 'Good', mainMessage: 'Scaling organic search and performance social ads in Q4.', breakdown: { content: 12, design: 11, readability: 8, typography: 6, visuals: 6, clarity: 8, consistency: 6 }, problems: [], recommendations: ['Standardize background styling.'] }
    ]
  }
];

