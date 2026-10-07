export const CATEGORY_DEFINITIONS = [
  {
    key: 'content',
    name: 'Content Quality',
    maxScore: 15,
    description: 'Evaluates accuracy, relevance, depth, completeness, and factual clarity of explanations.',
    iconName: 'FileText'
  },
  {
    key: 'structure',
    name: 'Structure & Storytelling',
    maxScore: 15,
    description: 'Evaluates logical narrative flow, introduction, section organization, and conclusion.',
    iconName: 'GitBranch'
  },
  {
    key: 'design',
    name: 'Visual Design',
    maxScore: 15,
    description: 'Detects clutter, alignment, whitespace balance, visual hierarchy, and layout professionalism.',
    iconName: 'Layout'
  },
  {
    key: 'readability',
    name: 'Readability',
    maxScore: 10,
    description: 'Identifies text-heavy slides, font sizes, contrast, and sentence length.',
    iconName: 'Eye'
  },
  {
    key: 'clarity',
    name: 'Clarity & Relevance',
    maxScore: 10,
    description: 'Checks main message clarity, slide title precision, and succinct messaging.',
    iconName: 'Target'
  },
  {
    key: 'typography',
    name: 'Typography',
    maxScore: 8,
    description: 'Checks font consistency, heading hierarchy, line spacing, and font choice suitability.',
    iconName: 'Type'
  },
  {
    key: 'visuals',
    name: 'Visuals & Media',
    maxScore: 8,
    description: 'Evaluates image quality, relevance, diagrams, icons, and text-to-visual ratio.',
    iconName: 'Image'
  },
  {
    key: 'evidence',
    name: 'Data & Evidence',
    maxScore: 7,
    description: 'Inspects citations, statistics credibility, chart sources, and empirical support.',
    iconName: 'BarChart2'
  },
  {
    key: 'consistency',
    name: 'Consistency',
    maxScore: 7,
    description: 'Checks margin uniformity, color themes, icon styles, and layout template rhythm.',
    iconName: 'Sliders'
  },
  {
    key: 'engagement',
    name: 'Audience & Engagement',
    maxScore: 5,
    description: 'Measures audience alignment, call-to-action impact, and memorable takeaways.',
    iconName: 'Users'
  }
];

export const PRESENTATION_TYPES = [
  { id: 'academic', title: 'Academic', description: 'For college, school, and research presentations.', icon: 'GraduationCap' },
  { id: 'business', title: 'Business', description: 'For professional executive & corporate presentations.', icon: 'Briefcase' },
  { id: 'startup', title: 'Startup Pitch', description: 'For startup pitch decks and investor meetings.', icon: 'Rocket' },
  { id: 'marketing', title: 'Marketing', description: 'For marketing campaigns and promotional decks.', icon: 'TrendingUp' },
  { id: 'educational', title: 'Educational', description: 'For teaching, workshops, and lectures.', icon: 'BookOpen' },
  { id: 'conference', title: 'Conference', description: 'For keynote speeches and public events.', icon: 'Mic' },
  { id: 'technical', title: 'Technical', description: 'For software, engineering, and architecture decks.', icon: 'Code' },
  { id: 'general', title: 'General', description: 'For general-purpose slides and multi-topic presentations.', icon: 'Layers' }
];

export const AUDIENCE_OPTIONS = [
  'Students',
  'Teachers',
  'Investors',
  'Customers',
  'Executives',
  'Developers',
  'Researchers',
  'General Audience'
];

export const GOAL_OPTIONS = [
  'Inform',
  'Teach',
  'Persuade',
  'Sell',
  'Pitch',
  'Explain',
  'Report',
  'Research',
  'Entertain'
];

