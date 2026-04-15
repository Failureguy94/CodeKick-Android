import { Domain, LearningPath, Language } from '../types';

// ─── Domain Data — mirrors DomainsScreen.kt ─────────────────────────────────

export const domains: Domain[] = [
  {
    id: 'cp',
    name: 'CP/DSA',
    icon: 'code-slash',
    gradient: ['#1a1a2e', '#16213e'],
    description: 'Competitive Programming & Data Structures and Algorithms',
    advantages: [
      'Strong problem-solving skills',
      'Excellent for tech interviews',
      'High-paying job opportunities',
      'Logical thinking development',
    ],
    disadvantages: [
      'Steep learning curve',
      'Time-intensive practice needed',
      'Can be frustrating initially',
    ],
    salary: '$80K - $200K+ annually',
    timeToMaster: '12-18 months with consistent practice',
  },
  {
    id: 'aiml',
    name: 'AI/ML',
    icon: 'hardware-chip',
    gradient: ['#2d132c', '#1a0a1a'],
    description: 'Artificial Intelligence & Machine Learning',
    advantages: [
      'Cutting-edge technology field',
      'High demand in the market',
      'Diverse applications',
      'Research opportunities',
    ],
    disadvantages: [
      'Requires strong math background',
      'Hardware-intensive',
      'Constantly evolving field',
    ],
    salary: '$90K - $250K+ annually',
    timeToMaster: '18-24 months including prerequisites',
  },
  {
    id: 'web3',
    name: 'Web3',
    icon: 'git-network',
    gradient: ['#0f2027', '#203a43'],
    description: 'Blockchain & Decentralized Applications',
    advantages: [
      'Emerging technology',
      'High earning potential',
      'Remote work opportunities',
      'Innovation-driven',
    ],
    disadvantages: [
      'Market volatility',
      'Requires web2 foundation',
      'Security concerns',
    ],
    salary: '$70K - $180K+ annually',
    timeToMaster: '6-12 months with web2 background',
  },
  {
    id: 'web2',
    name: 'Web2',
    icon: 'globe',
    gradient: ['#3d1c1c', '#1a0a0a'],
    description: 'Traditional Web Development',
    advantages: [
      'Wide job market',
      'Immediate practical applications',
      'Large community support',
      'Versatile skill set',
    ],
    disadvantages: [
      'Highly competitive',
      'Rapidly changing frameworks',
      'Can feel saturated',
    ],
    salary: '$60K - $150K+ annually',
    timeToMaster: '6-12 months for proficiency',
  },
];

// ─── Learning Paths — mirrors DiscoverScreen.kt ─────────────────────────────

export const allPaths: LearningPath[] = [
  { title: 'CP/DSA', description: 'Competitive Programming & Algorithms', route: 'CPLanguage', icon: 'code-slash', color: '#3B82F6', duration: '12-18 months' },
  { title: 'AI/ML', description: 'Artificial Intelligence & Machine Learning', route: 'AimlOverview', icon: 'hardware-chip', color: '#8B5CF6', duration: '18-24 months' },
  { title: 'Web3', description: 'Blockchain & Decentralized Apps', route: 'Web3Track', icon: 'git-network', color: '#06B6D4', duration: '6-12 months' },
  { title: 'Web2', description: 'Full-Stack Web Development', route: 'Web2Track', icon: 'globe', color: '#EC4899', duration: '6-12 months' },
];

// ─── CP Languages — mirrors CPScreens.kt ────────────────────────────────────

export const cpLanguages: Language[] = [
  { id: 'cpp', name: 'C++', icon: 'code-slash', color: '#0077CC' },
  { id: 'java', name: 'Java', icon: 'cafe', color: '#E76F00' },
  { id: 'python', name: 'Python', icon: 'terminal', color: '#3776AB' },
  { id: 'javascript', name: 'JavaScript', icon: 'logo-javascript', color: '#F7DF1E' },
  { id: 'go', name: 'Go', icon: 'code-slash', color: '#00ADD8' },
  { id: 'rust', name: 'Rust', icon: 'hardware-chip', color: '#CE422B' },
];

// ─── CP Levels ──────────────────────────────────────────────────────────────

export const cpLevels = [
  { id: 'beginner', label: 'Beginner', desc: 'Arrays, Strings, Basic Algorithms' },
  { id: 'intermediate', label: 'Intermediate', desc: 'Trees, Graphs, DP, Greedy' },
  { id: 'advanced', label: 'Advanced', desc: 'Advanced DP, Network Flow, Segment Trees' },
];

// ─── CP Resources ───────────────────────────────────────────────────────────

export const cpResources = [
  "Striver's DSA Sheet — 180 Problems",
  'NeetCode 150 — Curated Problem List',
  'Codeforces — Competitive Programming',
  'LeetCode — Interview Prep Problems',
  'GeeksforGeeks — Concept Articles',
  'CP-Algorithms — Advanced Techniques',
];

// ─── CP Blogs ───────────────────────────────────────────────────────────────

export const cpBlogs = [
  'Codeforces Round #945: Editorial',
  'How to approach Dynamic Programming problems',
  'Graph algorithms you must know for interviews',
  'Binary Search: From basics to advanced patterns',
  'Top 10 Segment Tree problems',
];

// ─── AIML Roadmap — mirrors AimlScreens.kt ──────────────────────────────────

export const aimlRoadmapSteps: [string, string][] = [
  ['Linear Algebra & Calculus', 'Math foundations for ML'],
  ['Python & NumPy', 'Core programming tools'],
  ['Statistics & Probability', 'Statistical foundations'],
  ['Machine Learning Basics', 'Supervised & unsupervised'],
  ['Neural Networks', 'Deep learning foundations'],
  ['Computer Vision', 'CNNs & image processing'],
  ['Natural Language Processing', 'Transformers & LLMs'],
  ['MLOps & Deployment', 'Production-ready models'],
];

export const aimlStepResources = [
  'Video Lectures',
  'Notes & Articles',
  'Hands-on Projects',
  'Practice Exercises',
  'Community Forums',
];

export const aimlPapers: [string, string][] = [
  ['Attention Is All You Need (Transformers)', 'Vaswani et al., 2017'],
  ['BERT: Pre-training of Deep Bidirectional Transformers', 'Devlin et al., 2018'],
  ['GPT-3: Language Models are Few-Shot Learners', 'Brown et al., 2020'],
  ['ResNet: Deep Residual Learning for Image Recognition', 'He et al., 2015'],
  ['AlphaFold: Protein Structure Prediction', 'Jumper et al., 2021'],
  ['Stable Diffusion: High-Resolution Image Synthesis', 'Rombach et al., 2022'],
];

// ─── Web3 Data — mirrors Web3Screens.kt ─────────────────────────────────────

export const web3Modules: [string, string][] = [
  ['Blockchain Fundamentals', 'Blocks, chains, consensus, wallets'],
  ['Smart Contracts with Solidity', 'ERC standards, events, gas'],
  ['Ethereum Development', 'Hardhat, Foundry, testing'],
  ['DeFi Protocols', 'Uniswap, Aave, lending/borrowing'],
  ['NFT Development', 'ERC-721, ERC-1155, metadata'],
  ['Web3 Frontend', 'ethers.js, wagmi, RainbowKit'],
  ['Security Auditing', 'Common vulnerabilities, reentrancy'],
  ['Layer 2 Scaling', 'Optimism, Arbitrum, zkSync'],
];

export const web3Insights: { name: string; price: string; change: string }[] = [
  { name: 'Bitcoin', price: '$71,000', change: '+2.3%' },
  { name: 'Ethereum', price: '$3,800', change: '+1.8%' },
  { name: 'Solana', price: '$180', change: '+4.2%' },
  { name: 'Polygon', price: '$0.85', change: '-0.5%' },
];

// ─── Web2 Data — mirrors Web2TrackScreen.kt ─────────────────────────────────

export const web2Tracks: [string, string][] = [
  ['HTML & CSS Fundamentals', 'Semantic HTML, Flexbox, Grid, Responsive'],
  ['JavaScript Essentials', 'ES6+, DOM, async/await, APIs'],
  ['React.js', 'Hooks, state management, routing'],
  ['Node.js & Express', 'REST APIs, middleware, authentication'],
  ['Databases', 'PostgreSQL, MongoDB, Supabase'],
  ['TypeScript', 'Types, generics, decorators'],
  ['Next.js', 'SSR, SSG, API routes, deployment'],
  ['Testing', 'Jest, React Testing Library, Cypress'],
  ['DevOps Basics', 'Git, Docker, CI/CD, Vercel'],
];

// ─── Focus Areas — mirrors LearnTopicScreen.kt ──────────────────────────────

export const focusAreas = [
  'Basics',
  'Advanced',
  'Interview Prep',
  'Project Ideas',
  'Best Practices',
  'Examples',
];
