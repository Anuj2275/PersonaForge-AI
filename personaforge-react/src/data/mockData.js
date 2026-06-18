// Centralized mock data — in a real app this would come from the Spring Boot API.

export const currentUser = {
  name: 'Arjun Kumar',
  handle: '@arjunkumar',
  email: 'arjun@example.com',
  initials: 'AK',
  plan: 'Free',
  personaCount: 8,
  personaLimit: 10,
  location: 'Himachal Pradesh, India',
  occupation: 'Full-stack Developer',
  joined: 'November 2024',
  github: 'github.com/arjunkumar',
  bio: 'Full-stack developer. React + Spring Boot. Building PersonaForge. 8 AI personas in my library — each one sharper than the last.',
};

export const personas = [
  {
    id: 'react-mentor',
    name: 'React Mentor',
    role: 'Senior Frontend Engineer',
    icon: '⚛️',
    iconBg: 'rgba(124,111,224,0.15)',
    category: 'mentor',
    tags: ['Project-based', 'Adaptive', 'Direct'],
    score: 9.1,
    version: 'v3',
    versionCount: 3,
    updated: 'Jan 8',
    date: '2025-01-08',
    description: 'A project-based React mentor that adapts difficulty over time. Never gives full solutions without first guiding through the reasoning.',
    archived: false,
  },
  {
    id: 'system-design-coach',
    name: 'System Design Coach',
    role: 'Principal Engineer · Scalability',
    icon: '🏗️',
    iconBg: 'rgba(224,136,111,0.15)',
    category: 'coach',
    tags: ['Trade-offs', 'Interview-prep', 'Blunt'],
    score: 9.4,
    version: 'v4',
    versionCount: 4,
    updated: 'Dec 8',
    date: '2024-12-08',
    description: 'Forces first-principles thinking about scalability, trade-offs, and distributed systems. Asks before telling.',
    archived: false,
    best: true,
  },
  {
    id: 'dsa-mentor',
    name: 'DSA Mentor',
    role: 'Algorithm & Data Structures Coach',
    icon: '🧮',
    iconBg: 'rgba(45,212,168,0.13)',
    category: 'mentor',
    tags: ['Hints first', 'Pattern-based'],
    score: 8.8,
    version: 'v2',
    versionCount: 2,
    updated: 'Jan 5',
    date: '2025-01-05',
    description: 'Pattern-recognition focused algorithm coach. Always gives hints before answers.',
    archived: false,
  },
  {
    id: 'english-mentor',
    name: 'English Mentor',
    role: 'Language & Communication Coach',
    icon: '💬',
    iconBg: 'rgba(111,212,224,0.13)',
    category: 'mentor',
    tags: ['Natural flow', 'Correction tracking'],
    score: 8.2,
    version: 'v1',
    versionCount: 1,
    updated: 'Dec 2',
    date: '2024-12-02',
    description: 'Natural corrections without breaking flow. Tracks and revisits recurring mistakes.',
    archived: false,
  },
  {
    id: 'spring-boot-mentor',
    name: 'Spring Boot Mentor',
    role: 'Java Backend Engineer',
    icon: '☕',
    iconBg: 'rgba(180,224,111,0.1)',
    category: 'mentor',
    tags: ['API-first', 'Security-aware'],
    score: 7.9,
    version: 'v1',
    versionCount: 1,
    updated: 'Nov 15',
    date: '2024-11-15',
    description: 'REST API design, security, JPA. Production-grade patterns only.',
    archived: false,
  },
  {
    id: 'career-coach',
    name: 'Career Coach',
    role: 'Interview & Growth Advisor',
    icon: '💼',
    iconBg: 'rgba(224,111,180,0.12)',
    category: 'coach',
    tags: ['Blunt feedback', 'Interview prep'],
    score: 8.6,
    version: 'v2',
    versionCount: 2,
    updated: 'Nov 28',
    date: '2024-11-28',
    description: 'Interview prep, resume review, negotiation strategy. Blunt but constructive.',
    archived: false,
  },
  {
    id: 'fitness-coach',
    name: 'Fitness Coach',
    role: 'Health & Training Advisor',
    icon: '🏋️',
    iconBg: 'rgba(180,224,111,0.08)',
    category: 'coach',
    tags: ['Evidence-based'],
    score: 7.4,
    version: 'v1',
    versionCount: 1,
    updated: 'Oct 3',
    date: '2024-10-03',
    description: 'Evidence-based programming. Adjusts for schedule and recovery.',
    archived: true,
  },
  {
    id: 'startup-advisor',
    name: 'Startup Advisor',
    role: 'Business Strategy Coach',
    icon: '🚀',
    iconBg: 'rgba(255,180,50,0.1)',
    category: 'advisor',
    tags: ['First-principles'],
    score: 6.8,
    version: 'v1',
    versionCount: 1,
    updated: 'Sep 18',
    date: '2024-09-18',
    description: 'First-principles thinking. Pushes back on assumptions. No feel-good advice.',
    archived: true,
  },
];

export const templates = [
  { id: 'react', icon: '⚛️', name: 'React Mentor', category: 'dev', cat: 'Development · Frontend', badge: 'featured', score: 9.1, uses: '3.2k',
    desc: 'Project-based. Adaptive difficulty. Never gives answers without guiding first. Ideal for intermediate-to-advanced learners.' },
  { id: 'sysdesign', icon: '🏗️', name: 'System Design Coach', category: 'dev', cat: 'Development · Architecture', badge: 'popular', score: 9.4, uses: '2.8k',
    desc: 'Trade-off focused. Asks before telling. Forces you to think about scalability before handing over solutions.' },
  { id: 'career', icon: '💼', name: 'Career Coach', category: 'career', cat: 'Career · Professional', badge: 'new', score: 8.9, uses: '1.4k',
    desc: 'Interview prep, resume review, negotiation strategy. Blunt but constructive.' },
  { id: 'dsa', icon: '🧮', name: 'DSA Mentor', category: 'dev', cat: 'Development · Algorithms', score: 8.8, uses: '2.1k',
    desc: 'Hints before answers. Pattern recognition. Tracks problem-solving weaknesses.' },
  { id: 'java', icon: '☕', name: 'Java Mentor', category: 'dev', cat: 'Development · Backend', score: 8.6, uses: '1.7k',
    desc: 'OOP-first. Design patterns through real examples. Spring Boot aware.' },
  { id: 'springboot', icon: '🍃', name: 'Spring Boot Mentor', category: 'dev', cat: 'Development · Backend', score: 8.5, uses: '1.3k',
    desc: 'REST API design, security, JPA. Production-grade patterns only.' },
  { id: 'typescript', icon: '🔷', name: 'TypeScript Mentor', category: 'dev', cat: 'Development · Frontend', score: 8.4, uses: '980',
    desc: 'Type safety, generics, utility types. Practical over academic.' },
  { id: 'devops', icon: '🐳', name: 'DevOps Coach', category: 'dev', cat: 'Development · DevOps', score: 8.3, uses: '760',
    desc: 'Docker, CI/CD, Kubernetes basics. Hands-on infrastructure thinking.' },
  { id: 'codereview', icon: '🔍', name: 'Code Reviewer', category: 'dev', cat: 'Development · Review', score: 9.0, uses: '2.4k',
    desc: 'Senior engineer lens. Catches bugs, style issues, and architecture smells.' },
  { id: 'interview', icon: '🎤', name: 'Interview Coach', category: 'career', cat: 'Career · Interview', score: 9.2, uses: '3.1k',
    desc: 'Behavioral, technical, and system design prep in one. Gives real feedback.' },
  { id: 'resume', icon: '📄', name: 'Resume Reviewer', category: 'career', cat: 'Career · Resume', score: 8.7, uses: '1.9k',
    desc: 'ATS-aware. Recruiter perspective. Cuts fluff, adds impact quantification.' },
  { id: 'salary', icon: '💰', name: 'Salary Advisor', category: 'career', cat: 'Career · Negotiation', score: 8.8, uses: '1.2k',
    desc: 'Prep anchoring, counteroffer strategy, and walkaway numbers.' },
  { id: 'english', icon: '💬', name: 'English Mentor', category: 'learning', cat: 'Learning · Language', score: 8.2, uses: '2.6k',
    desc: 'Natural corrections without breaking flow. Tracks recurring mistakes.' },
  { id: 'study', icon: '📚', name: 'Study Coach', category: 'learning', cat: 'Learning · Productivity', score: 8.0, uses: '890',
    desc: 'Spaced repetition, Pomodoro scheduling, active recall techniques built in.' },
  { id: 'startup', icon: '🚀', name: 'Startup Advisor', category: 'business', cat: 'Business · Strategy', score: 9.1, uses: '1.8k',
    desc: 'First-principles thinking. Pushes back on assumptions. No feel-good advice.' },
  { id: 'pm', icon: '📊', name: 'PM Coach', category: 'business', cat: 'Business · Product', score: 8.6, uses: '1.1k',
    desc: 'PRDs, roadmaps, prioritization frameworks. Thinks in user value.' },
  { id: 'content', icon: '✍️', name: 'Content Creator', category: 'creative', cat: 'Creative · Writing', score: 8.4, uses: '1.5k',
    desc: 'Hooks, storytelling, platform-specific formats. Optimizes for engagement.' },
  { id: 'copywriter', icon: '🖊️', name: 'Copywriter', category: 'creative', cat: 'Creative · Marketing', score: 8.7, uses: '1.3k',
    desc: 'AIDA, PAS frameworks. Writes for conversion. Cuts filler ruthlessly.' },
  { id: 'fitness', icon: '🏋️', name: 'Fitness Coach', category: 'health', cat: 'Health · Fitness', score: 8.5, uses: '2.0k',
    desc: 'Evidence-based programming. Adjusts for schedule and recovery.' },
];

export const promptVersions = {
  'react-mentor': [
    {
      version: 'v3', score: 9.1, date: 'January 8, 2025', current: true,
      note: 'Added memory instructions, session recap, and escalation behavior. Refined constraint language.',
      changes: ['+ Memory rules', '+ Session recap', '~ Constraints refined'],
      prompt: `You are an expert React mentor with 10+ years of production experience building scalable applications.

## Teaching Philosophy
- Project-based learning exclusively. Assign real, meaningful problems rather than isolated exercises.
- Never skip the "why". Always explain the reasoning before showing the implementation.
- Adaptive difficulty. Continuously assess understanding and adjust complexity accordingly.
- Fundamentals first. Never let syntactic shortcuts replace conceptual understanding.

## Communication Rules
- Direct and concise. No filler text. No excessive preamble.
- Code-first when the question is implementation-focused.
- Concept-first when the question is architectural or philosophical.
- Always show trade-offs between approaches when multiple valid options exist.

## Constraints
- Never provide complete solutions without first guiding the user toward the answer.
- When the user is wrong, correct them directly but explain the reasoning.
- Do not recommend libraries without explaining the underlying problem they solve.
- Session scope: Keep responses focused enough to complete in a 1–2 hour session.

## User Context
Current level: Intermediate React developer.
Struggles with: State management, component architecture at scale.
Goal: Build and ship production-grade React applications independently.
Time available: 2 hours per day.

## Memory Instructions
Track what topics have been covered. Reference previous discussions.
End each session with a 3-bullet recap and suggested next focus area.`,
    },
    {
      version: 'v2', score: 8.7, date: 'December 12, 2024', current: false,
      note: 'Applied 3 suggestions from score analysis. Added user context section and teaching philosophy bullets.',
      changes: ['+ User context', '+ Teaching philosophy', '~ Communication tone'],
      prompt: `You are an expert React mentor.

User context: Intermediate. Struggles with state management.
Goal: Build production-grade React apps.

- Direct communication. No filler text.
- Code-first for implementation. Concept-first for architecture.`,
    },
    {
      version: 'v1', score: 7.2, date: 'November 28, 2024', current: false,
      note: 'First generated version from interview flow. Basic role definition and communication style.',
      changes: ['Initial version'],
      prompt: `You are a React mentor. Help me learn React effectively.
Teach using examples. Be clear and concise.`,
    },
  ],
};

export const scoreBreakdown = [
  { label: 'Context completeness', value: 9.5, color: 'teal' },
  { label: 'Behavior clarity', value: 9.0, color: 'teal' },
  { label: 'Constraint definition', value: 8.8, color: 'purple' },
  { label: 'Communication style', value: 9.3, color: 'teal' },
  { label: 'Specificity', value: 8.5, color: 'purple' },
  { label: 'Memory instructions', value: 8.0, color: 'orange' },
];

export const suggestions = [
  {
    id: 1, icon: '🎯', resolved: false,
    title: 'Add example output format',
    desc: 'Specifying a preferred response format (e.g. "code first, then explanation below") would further reduce ambiguity and increase consistency across sessions.',
  },
  {
    id: 2, icon: '🗃️', resolved: false,
    title: 'Define escalation behavior',
    desc: 'What should the persona do if a question is outside its scope? Add an instruction like "For questions outside React, redirect to the relevant tool or resource."',
  },
  {
    id: 3, icon: '✓', resolved: true,
    title: 'Add user experience level',
    desc: 'Resolved in v2 — user context now includes skill level and focus areas.',
  },
  {
    id: 4, icon: '✓', resolved: true,
    title: 'Add memory instructions',
    desc: 'Resolved in v3 — persona now includes session tracking and recap instructions.',
  },
];
