export interface Project {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  period: string;
  role: string;
  description: string;
  highlights: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface SkillCategory {
  title: string;
  icon: string;
  accentColor: string;
  skills: { name: string; level: string; iconKey?: string }[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
  type: 'Work' | 'Leadership';
}

export interface EducationItem {
  institution: string;
  degree: string;
  field?: string;
  location: string;
  period: string;
  score: string;
  highlights?: string[];
}

export const PERSONAL_INFO = {
  name: 'Vedansh Gupta',
  tagline: 'Full-Stack Developer & Cybersecurity Specialist',
  headline: 'Architecting High-Performance Full-Stack Applications & Resilient Security Frameworks',
  bio: 'Computer Science and Engineering undergraduate specializing in Cybersecurity and Full-Stack Web Development at PSIT Kanpur. Experienced in building secure, transactional platforms, biometric identity-gated frameworks, and real-time community ecosystems. Driven by a deep passion for writing clean code, preventing security vulnerabilities, and scaling modern web applications.',
  email: 'vedanshg112@gmail.com',
  phone: '+91 63064 78673',
  location: 'Kanpur, Uttar Pradesh, India',
  github: 'https://github.com/Vedanshg6303',
  linkedin: 'https://www.linkedin.com/in/vedansh-gupta/',
  status: 'Open for Software Engineering Roles & Internships',
  cgpa: '7.40 / 10.0',
  university: 'Pranveer Singh Institute of Technology (PSIT)',
};

export const METRICS = [
  { label: 'CGPA in Cybersecurity', value: '7.40', sub: 'PSIT B.Tech CSE' },
  { label: 'Flagship Projects', value: '3+', sub: 'Full-Stack & Biometrics' },
  { label: 'Technologies Mastered', value: '15+', sub: 'Languages & Tools' },
  { label: 'Live Deployments', value: '100%', sub: 'Production Cloud' },
];

export const PROJECTS: Project[] = [
  {
    id: 'tridrishti',
    title: 'Tridrishti Platform',
    subtitle: 'Full-Stack Community Empowerment & Gamified Rewards Ecosystem',
    badge: 'Live Production',
    badgeColor: 'cyan',
    period: '2026',
    role: 'Full-Stack Developer',
    description: 'An enterprise-grade full-stack networking and gamified rewards platform featuring 40+ dynamic pages, a 10-tier user progression matrix, an atomic transaction ledger, and real-time downline network tree tracking.',
    highlights: [
      'Engineered an automated referral & reward-points ledger engine handling atomic coin balances and benefit claim audits.',
      'Implemented robust multi-role RBAC (Super Admin, Admin, Member) with secure JWT auth and Zod schema validations.',
      'Configured real-time WebSockets (Socket.io) for instant balance updates, downline tree synchronization, and administrative alerts.',
      'Full production deployment across Render (Node API) and Vercel (React Vite SPA) with automated CI/CD.'
    ],
    techStack: ['React 18', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://tridrishti-api.vercel.app',
    githubUrl: 'https://github.com/Vedanshg6303/Tridrishti',
    featured: true,
  },
  {
    id: 'guardian-id',
    title: 'Guardian-ID',
    subtitle: 'Multi-User Biometric UPI Security Framework',
    badge: 'Cybersecurity & FinTech',
    badgeColor: 'violet',
    period: 'Feb 2026 – Present',
    role: 'Lead Developer',
    description: 'An identity-gated security layer designed to mitigate account takeover and unauthorized transaction risks in shared financial environments and digital payment ecosystems.',
    highlights: [
      'Integrated real-time computer vision facial recognition coupled with multi-profile fingerprint validation for step-up auth.',
      'Designed a modular architecture providing tokenized RESTful integration across secure open-banking payment protocols.',
      'Engineered zero-trust session validation ensuring unauthorized users cannot approve payment intents on shared devices.'
    ],
    techStack: ['Python', 'Computer Vision', 'Biometrics', 'REST APIs', 'Open-Banking Protocols', 'Cryptography'],
    githubUrl: 'https://github.com/Vedanshg6303',
    featured: true,
  },
  {
    id: 'music-web-app',
    title: 'Interactive Music Web Application',
    subtitle: 'High-Performance Audio Streaming & Playlist Engine',
    badge: 'Web Systems',
    badgeColor: 'emerald',
    period: 'Mar 2024 – Jun 2024',
    role: 'Frontend Engineer',
    description: 'A lightweight, responsive web audio streaming engine optimized for fluid cross-platform browser playback with zero audio lag and zero dependency bloat.',
    highlights: [
      'Architected custom audio queue logic, responsive timeline scrub controls, and seamless background playlist state management.',
      'Leveraged native HTML5 Audio APIs and vanilla JavaScript for minimal memory consumption and ultra-fast load times.',
      'Crafted an intuitive dark glassmorphism interface with responsive track visualizations.'
    ],
    techStack: ['JavaScript', 'HTML5 Audio API', 'CSS3', 'Web Audio', 'Responsive UI'],
    githubUrl: 'https://github.com/Vedanshg6303',
    featured: true,
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    icon: 'Code2',
    accentColor: '#00F0FF',
    skills: [
      { name: 'C++', level: 'Proficient' },
      { name: 'Java', level: 'Core & OOP' },
      { name: 'Python', level: 'Advanced' },
      { name: 'JavaScript (ES6+)', level: 'Expert' },
      { name: 'TypeScript', level: 'Proficient' },
      { name: 'HTML5 & CSS3', level: 'Expert' },
    ],
  },
  {
    title: 'Frontend Development',
    icon: 'Layout',
    accentColor: '#38BDF8',
    skills: [
      { name: 'React.js (v18)', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Expert' },
      { name: 'Vite', level: 'Advanced' },
      { name: 'Responsive Web Design', level: 'Expert' },
      { name: 'Glassmorphism & Micro-UI', level: 'Advanced' },
      { name: 'State Management', level: 'Proficient' },
    ],
  },
  {
    title: 'Backend & APIs',
    icon: 'Server',
    accentColor: '#8B5CF6',
    skills: [
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Express.js', level: 'Advanced' },
      { name: 'RESTful API Design', level: 'Expert' },
      { name: 'Socket.io (WebSockets)', level: 'Proficient' },
      { name: 'JWT & Authentication', level: 'Advanced' },
      { name: 'Role-Based Access Control', level: 'Advanced' },
    ],
  },
  {
    title: 'Databases & Storage',
    icon: 'Database',
    accentColor: '#10B981',
    skills: [
      { name: 'MongoDB & Mongoose', level: 'Advanced' },
      { name: 'MySQL', level: 'Proficient' },
      { name: 'Schema & Index Design', level: 'Advanced' },
      { name: 'Transactional Data Modeling', level: 'Proficient' },
    ],
  },
  {
    title: 'Cybersecurity & Core CS',
    icon: 'ShieldCheck',
    accentColor: '#F43F5E',
    skills: [
      { name: 'Biometric Authentication', level: 'Advanced' },
      { name: 'Information Security', level: 'Advanced' },
      { name: 'Security Protocols & TCP/IP', level: 'Proficient' },
      { name: 'Data Structures & Algorithms', level: 'Core' },
      { name: 'Object-Oriented Programming', level: 'Expert' },
      { name: 'Operating Systems & DBMS', level: 'Core' },
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: 'Wrench',
    accentColor: '#F59E0B',
    skills: [
      { name: 'Git & GitHub', level: 'Advanced' },
      { name: 'VS Code', level: 'Daily Driver' },
      { name: 'Postman API Testing', level: 'Advanced' },
      { name: 'Vercel & Render Cloud', level: 'Proficient' },
      { name: 'Generative AI Tools', level: 'Advanced' },
      { name: 'Linux / Shell Scripting', level: 'Proficient' },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: 'DevLaunch (IIT Kharagpur)',
    role: 'Tech & Management Intern',
    location: 'Remote / Kanpur, UP',
    period: 'Dec 2024 – Mar 2025',
    description: [
      'Spearheaded targeted outreach campaigns across high-velocity student communities, accelerating technical user signups and engagement.',
      'Assisted engineering squads with frontend enhancements, landing page UI updates, and technical documentation using HTML, CSS, JavaScript, and Git.',
      'Collaborated closely with cross-functional product teams to streamline onboarding funnels.'
    ],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'Product Management', 'Community Outreach'],
    type: 'Work',
  },
  {
    company: 'PSIT Vyomnauts',
    role: 'Event Coordinator & Technical Lead',
    location: 'Kanpur, UP',
    period: '2024 – Present',
    description: [
      'Organized large-scale technical hackathons and tech exhibitions at PSIT, driving cross-functional task distribution and logistics.',
      'Mentored junior students on full-stack web development best practices, version control workflows, and project presentation.',
      'Coordinated venue technical infrastructure, live AV streaming, and participant judging rubrics.'
    ],
    skills: ['Leadership', 'Event Management', 'Hackathons', 'Mentorship', 'Public Speaking'],
    type: 'Leadership',
  },
];

export const EDUCATION: EducationItem[] = [
  {
    institution: 'Pranveer Singh Institute of Technology (PSIT)',
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Computer Science & Engineering (Specialization: Cybersecurity)',
    location: 'Kanpur, Uttar Pradesh',
    period: '2023 – 2027',
    score: 'CGPA: 7.40 / 10.0',
    highlights: [
      'Specializing in Information Security, Cryptography, Network Defense, and Secure Software Engineering.',
      'Active leadership coordinator at PSIT Vyomnauts club.'
    ],
  },
  {
    institution: 'Spring Dales Higher Secondary School (UP Board)',
    degree: 'Class XII (Senior Secondary Examination)',
    location: 'Kanpur, Uttar Pradesh',
    period: '2021 – 2022',
    score: 'Percentage: 75.5%',
    highlights: ['Focus in Physics, Chemistry, Mathematics, and Computer Science.'],
  },
  {
    institution: 'Spring Dales Higher Secondary School (UP Board)',
    degree: 'Class X (Secondary Examination)',
    location: 'Kanpur, Uttar Pradesh',
    period: '2019 – 2020',
    score: 'Percentage: 83.5%',
    highlights: ['Distinction in Mathematics and Science.'],
  },
];

export const CERTIFICATIONS = [
  {
    name: 'Infosys Technical Certification',
    issuer: 'Infosys Springboard',
    description: 'Verified competencies in HTML, CSS, and structured Python 3 application development and algorithms.',
    icon: 'Award',
  },
  {
    name: 'AI Tools Specialist',
    issuer: 'be10x',
    description: 'Professional validation in deploying modern AI workflows and generative tools to accelerate full-stack engineering cycles.',
    icon: 'Sparkles',
  },
];
