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
  { title: "Striver's DSA Sheet — 180 Problems", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" },
  { title: 'NeetCode 150 — Curated Problem List', url: "https://neetcode.io/practice" },
  { title: 'Codeforces — Competitive Programming', url: "https://codeforces.com/" },
  { title: 'LeetCode — Interview Prep Problems', url: "https://leetcode.com/problemset/all/" },
  { title: 'GeeksforGeeks — Concept Articles', url: "https://www.geeksforgeeks.org/data-structures/" },
  { title: 'CP-Algorithms — Advanced Techniques', url: "https://cp-algorithms.com/" },
];

// ─── CP Blogs ───────────────────────────────────────────────────────────────

export const cpBlogs = [
  { title: 'Codeforces Round #945: Editorial', url: 'https://codeforces.com/blog/entry/129331' },
  { title: 'How to approach Dynamic Programming problems', url: 'https://medium.com/@george.seif94/a-graphic-approach-to-dynamic-programming-25cbfa8ea81b' },
  { title: 'Graph algorithms you must know for interviews', url: 'https://www.geeksforgeeks.org/top-10-interview-questions-on-depth-first-search-dfs/' },
  { title: 'Binary Search: From basics to advanced patterns', url: 'https://leetcode.com/discuss/general-discussion/786126/python-powerful-ultimate-binary-search-template-solved-many-problems' },
  { title: 'Top 10 Segment Tree problems', url: 'https://cp-algorithms.com/data_structures/segment_tree.html' },
];

// ─── AIML Roadmap — mirrors AimlScreens.kt ──────────────────────────────────

export const aimlRoadmapSteps: { title: string; desc: string; url?: string }[] = [
  { title: 'Linear Algebra & Calculus', desc: 'Math foundations for ML' },
  { title: 'Python & NumPy', desc: 'Core programming tools' },
  { title: 'Statistics & Probability', desc: 'Statistical foundations' },
  { title: 'Machine Learning Basics', desc: 'Supervised & unsupervised' },
  { title: 'Neural Networks', desc: 'Deep learning foundations' },
  { title: 'Computer Vision', desc: 'CNNs & image processing' },
  { title: 'Natural Language Processing', desc: 'Transformers & LLMs' },
  { title: 'MLOps & Deployment', desc: 'Production-ready models' },
];

export const aimlStepResources = [
  { title: 'Video Lectures', url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMlWvxc34U9' },
  { title: 'Notes & Articles', url: 'https://towardsdatascience.com/' },
  { title: 'Hands-on Projects', url: 'https://www.kaggle.com/' },
  { title: 'Practice Exercises', url: 'https://github.com/GokuMohandas/Made-With-ML' },
  { title: 'Community Forums', url: 'https://www.reddit.com/r/MachineLearning/' },
];

export const aimlPapers: { title: string; author: string; url: string }[] = [
  { title: 'Attention Is All You Need (Transformers)', author: 'Vaswani et al., 2017', url: 'https://arxiv.org/abs/1706.03762' },
  { title: 'BERT: Pre-training of Deep Bidirectional Transformers', author: 'Devlin et al., 2018', url: 'https://arxiv.org/abs/1810.04805' },
  { title: 'GPT-3: Language Models are Few-Shot Learners', author: 'Brown et al., 2020', url: 'https://arxiv.org/abs/2005.14165' },
  { title: 'ResNet: Deep Residual Learning for Image Recognition', author: 'He et al., 2015', url: 'https://arxiv.org/abs/1512.03385' },
  { title: 'AlphaFold: Protein Structure Prediction', author: 'Jumper et al., 2021', url: 'https://www.nature.com/articles/s41586-021-03819-2' },
  { title: 'Stable Diffusion: High-Resolution Image Synthesis', author: 'Rombach et al., 2022', url: 'https://arxiv.org/abs/2112.10752' },
];

// ─── Web3 Data — mirrors Web3Screens.kt ─────────────────────────────────────

export const web3Modules: { title: string; desc: string; url: string }[] = [
  { title: 'Blockchain Fundamentals', desc: 'Blocks, chains, consensus, wallets', url: 'https://bitcoin.org/bitcoin.pdf' },
  { title: 'Smart Contracts with Solidity', desc: 'ERC standards, events, gas', url: 'https://docs.soliditylang.org/' },
  { title: 'Ethereum Development', desc: 'Hardhat, Foundry, testing', url: 'https://ethereum.org/en/developers/' },
  { title: 'DeFi Protocols', desc: 'Uniswap, Aave, lending/borrowing', url: 'https://docs.uniswap.org/' },
  { title: 'NFT Development', desc: 'ERC-721, ERC-1155, metadata', url: 'https://eips.ethereum.org/EIPS/eip-721' },
  { title: 'Web3 Frontend', desc: 'ethers.js, wagmi, RainbowKit', url: 'https://wagmi.sh/' },
  { title: 'Security Auditing', desc: 'Common vulnerabilities, reentrancy', url: 'https://consensys.github.io/smart-contract-best-practices/' },
  { title: 'Layer 2 Scaling', desc: 'Optimism, Arbitrum, zkSync', url: 'https://l2beat.com/' },
];

export const web3Insights: { name: string; price: string; change: string }[] = [
  { name: 'Bitcoin', price: '$71,000', change: '+2.3%' },
  { name: 'Ethereum', price: '$3,800', change: '+1.8%' },
  { name: 'Solana', price: '$180', change: '+4.2%' },
  { name: 'Polygon', price: '$0.85', change: '-0.5%' },
];

// ─── Web2 Data — mirrors Web2TrackScreen.kt ─────────────────────────────────

export const web2Tracks: { title: string; desc: string; url: string }[] = [
  { title: 'HTML & CSS Fundamentals', desc: 'Semantic HTML, Flexbox, Grid, Responsive', url: 'https://developer.mozilla.org/en-US/docs/Learn' },
  { title: 'JavaScript Essentials', desc: 'ES6+, DOM, async/await, APIs', url: 'https://javascript.info/' },
  { title: 'React.js', desc: 'Hooks, state management, routing', url: 'https://react.dev/' },
  { title: 'Node.js & Express', desc: 'REST APIs, middleware, authentication', url: 'https://expressjs.com/' },
  { title: 'Databases', desc: 'PostgreSQL, MongoDB, Supabase', url: 'https://supabase.com/docs' },
  { title: 'TypeScript', desc: 'Types, generics, decorators', url: 'https://www.typescriptlang.org/docs/' },
  { title: 'Next.js', desc: 'SSR, SSG, API routes, deployment', url: 'https://nextjs.org/docs' },
  { title: 'Testing', desc: 'Jest, React Testing Library, Cypress', url: 'https://jestjs.io/' },
  { title: 'DevOps Basics', desc: 'Git, Docker, CI/CD, Vercel', url: 'https://roadmap.sh/devops' },
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
