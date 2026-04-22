# CodeKick — AI-Powered Learning Platform for Developers

> **Your journey into tech starts here.** CodeKick is a cross-platform mobile application that helps aspiring developers discover the right tech domain, learn through AI-generated content, and track their progress — all in one beautifully designed app.

---

## 📌 Project Overview

**CodeKick** is a React Native mobile application built with Expo, designed to solve a critical problem in the developer learning space: **information overload and lack of guided learning paths**. With 4 curated tech domains, AI-powered note generation, an intelligent chatbot, and comprehensive progress tracking, CodeKick acts as a personal tech mentor in your pocket.

### The Problem
- New developers struggle to choose between multiple tech domains (CP/DSA, AI/ML, Web2, Web3)
- Learning resources are scattered across the internet with no clear roadmap
- There's no personalized, interactive way to learn and track progress in one place
- Existing platforms lack AI integration for instant, topic-specific learning

### The Solution
CodeKick provides:
- **Domain Discovery** — Explore 4 tech domains with detailed pros/cons, salary insights, and time-to-master estimates
- **AI-Powered Learning** — Generate structured notes on any programming topic instantly using Grok AI
- **Intelligent Chatbot** — Get real-time coding help, career guidance, and learning recommendations
- **Structured Learning Paths** — Step-by-step roadmaps for CP/DSA, AI/ML, Web3, and Web2
- **Progress Tracking** — Daily streaks, activity history, and saved topics

---

## 🏗️ Architecture & Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React Native 0.81** | Cross-platform mobile UI framework |
| **Expo SDK 54** | Development tooling, build system, OTA updates |
| **TypeScript 5.9** | Type-safe development across the entire codebase |
| **React Navigation 7** | Native stack + bottom tab navigation |
| **Zustand 5** | Lightweight, hook-based state management |
| **Expo Linear Gradient** | Gradient backgrounds for domain cards |
| **React Native Reanimated 4** | Smooth 60fps animations |

### Backend & Services
| Technology | Purpose |
|---|---|
| **Firebase Authentication** | Email/password auth with username-based login support |
| **Cloud Firestore** | NoSQL database for profiles, topics, and activity data |
| **Grok AI (xAI)** | Powers note generation and conversational AI chatbot |
| **EmailJS** | Automated welcome emails on sign-up |

### Design System
| Feature | Implementation |
|---|---|
| **Neumorphic UI** | Custom `NeumorphicView` and `NeumorphicButton` components with dual-shadow system |
| **Dark/Light Theme** | Full theme system with `ThemeContext`, auto-switching, curated color palettes |
| **Animated Background** | Floating particle system with sine-wave physics |
| **Flip Cards** | Interactive 3D flip animations for domain exploration |

---

## 📱 App Features (Detailed)

### 1. Home Screen — Landing Experience
- Animated particle background with floating orbs
- Animated underline text reveal effect
- Hero CTA button ("Get Started" / "Go to Domains")
- Scroll indicator with bounce animation
- Links to Discover learning paths

### 2. Authentication System
- **Dual Sign-In Mode**: Login with either **username** or **email** + password
- **Sign-Up Fields**: Full Name, Username, Email, Password
- **Username System**: Usernames are stored in a separate Firestore `usernames` collection for O(1) lookup
- **Welcome Email**: Automated welcome email sent via EmailJS after successful registration
- **Session Persistence**: Firebase `onAuthStateChanged` listener for session management
- **Error Handling**: Specific error messages for wrong password, user not found, username taken, rate limiting, etc.

### 3. Domain Discovery (Flip Cards)
Four curated tech domains with interactive **3D flip cards**:

| Domain | Description | Salary Range | Time to Master |
|---|---|---|---|
| **CP/DSA** | Competitive Programming & Data Structures | $80K – $200K+ | 12–18 months |
| **AI/ML** | Artificial Intelligence & Machine Learning | $90K – $250K+ | 18–24 months |
| **Web3** | Blockchain & Decentralized Applications | $70K – $180K+ | 6–12 months |
| **Web2** | Full-Stack Web Development | $60K – $150K+ | 6–12 months |

Each card shows:
- Front: Domain name, icon, gradient background
- Back: Description, advantages, disadvantages, salary range, time to master

### 4. Learning Tracks (Structured Roadmaps)

#### CP/DSA Track
- **Language Selection**: C++, Java, Python, JavaScript, Go, Rust
- **Difficulty Levels**: Beginner → Intermediate → Advanced
- **Curated Resources**: Striver's DSA Sheet, NeetCode 150, Codeforces, LeetCode, CP-Algorithms
- **Blog Posts**: Editorial discussions, DP approaches, graph algorithms

#### AI/ML Track
- **8-Step Roadmap**: Linear Algebra → Python/NumPy → Statistics → ML Basics → Neural Networks → Computer Vision → NLP → MLOps
- **Research Papers**: Attention Is All You Need, BERT, GPT-3, ResNet, AlphaFold, Stable Diffusion
- **Resources**: Kaggle, Made With ML, Towards Data Science

#### Web3 Track
- **8 Modules**: Blockchain Fundamentals → Solidity → Ethereum Dev → DeFi → NFTs → Web3 Frontend → Security → L2 Scaling
- **Live Crypto Prices**: Real-time Bitcoin, Ethereum, Solana, Polygon prices via CoinGecko API
- **Clickable Resources**: Direct links to official documentation

#### Web2 Track
- **9 Modules**: HTML/CSS → JavaScript → React.js → Node/Express → Databases → TypeScript → Next.js → Testing → DevOps
- **Clickable Resources**: Links to MDN, React docs, Express, Jest, roadmap.sh

### 5. AI Features (Grok-Powered)

#### Learn a Topic — AI Note Generation
- Enter **any programming topic** (e.g., "Binary Search Trees", "Neural Networks")
- Select a **focus area**: Basics, Advanced, Interview Prep, Project Ideas, Best Practices, Examples
- Grok AI generates:
  - **Structured Markdown Notes** with: Introduction, Key Concepts, How It Works, Code Examples, Use Cases, Practice Problems
  - **4 YouTube Video Suggestions** with search queries — tapping opens YouTube
- Notes can be **saved to Firestore** for later access

#### AI Chatbot Assistant
- Accessible via the **raised center tab button** (✨ sparkles icon)
- Opens a **full-screen chat modal** with message bubbles
- **Context-aware**: Maintains full conversation history per session
- Covers: coding questions, DSA, AI/ML, Web3, Web2, career guidance, interview prep
- Shows "Thinking..." indicator while Grok processes
- Falls back to pattern-matched responses if API is unavailable

### 6. Progress Tracking

#### Dashboard Screen
- **Profile Section**: Display name and username
- **Today's Stats**: Topics learned today, notes generated
- **Recent Topics**: Last 5 saved topics
- **Activity Streak**: Consecutive-day streak calculator
- **Total Stats**: All-time topic count

#### Track Screen
- **Activity History**: Daily learning activity over time
- **Streak Counter**: Based on the `calculateStreak()` algorithm
- **Total Progress Metrics**: Topics count, notes generated

#### My Topics Screen
- **All Saved Topics**: Full list with timestamps
- **Delete Functionality**: Remove saved topics
- **Notes Preview**: View saved notes for any topic

### 7. Profile & Settings
- **Profile Screen**: View username, full name, email, join date
- **Theme Toggle**: Switch between Dark and Light mode
- **Sign Out**: Clear session and return to auth screen

---

## 🗄️ Database Schema (Firestore)

```
Firestore Database
├── users/{uid}
│   ├── uid: string
│   ├── username: string
│   ├── fullName: string
│   ├── email: string
│   └── createdAt: Timestamp
│
├── usernames/{username}
│   ├── uid: string
│   └── email: string
│
├── learning_topics/{autoId}
│   ├── userId: string
│   ├── topic: string
│   ├── notes: string (markdown)
│   └── createdAt: Timestamp
│
└── learning_activity/{userId_YYYY-MM-DD}
    ├── userId: string
    ├── activityDate: string
    ├── topicsCount: number
    └── notesGenerated: number
```

---

## 📂 Project Structure

```
CodeKickRN/
├── App.tsx                          # Entry point — theme provider + auth session init
├── index.ts                         # Expo entry
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── .env                             # Environment variables (Firebase, EmailJS, Grok)
│
└── src/
    ├── components/
    │   ├── AIChatbotFab.tsx          # Full-screen AI chat modal (Grok-powered)
    │   ├── AnimatedBackground.tsx    # Floating particle animation system
    │   ├── FlipCard.tsx              # 3D flip card component for domains
    │   ├── Neumorphic.tsx            # Neumorphic UI system (View + Button)
    │   └── TopBar.tsx                # Header with logo, theme toggle, profile
    │
    ├── navigation/
    │   └── AppNavigator.tsx          # Stack + Tab navigator with center AI button
    │
    ├── screens/
    │   ├── HomeScreen.tsx            # Landing page with animations
    │   ├── AuthScreen.tsx            # Sign In / Sign Up with neumorphic design
    │   ├── DomainsScreen.tsx         # 4 domain flip cards
    │   ├── DiscoverScreen.tsx        # All learning paths overview
    │   ├── LearnTopicScreen.tsx      # AI note generation + video suggestions
    │   ├── DashboardScreen.tsx       # User stats, streak, recent topics
    │   ├── TrackScreen.tsx           # Activity tracking & streak
    │   ├── MyTopicsScreen.tsx        # Saved topics list
    │   ├── ProfileScreen.tsx         # User profile & settings
    │   ├── cp/                       # CP/DSA track screens (Language, Level, Resources, Blogs)
    │   ├── aiml/                     # AI/ML track screens (Overview, Steps, Papers)
    │   ├── web3/                     # Web3 track screens (Modules, Live Crypto Insights)
    │   └── web2/                     # Web2 track screen (Full-stack roadmap)
    │
    ├── services/
    │   ├── firebase.ts               # Firebase app + Auth + Firestore initialization
    │   ├── firestore.ts              # All Firestore CRUD operations
    │   ├── auth.ts                   # Sign-in, sign-up, profile management
    │   ├── grok.ts                   # Grok AI — note generation + chatbot
    │   ├── emailjs.ts                # Welcome email via EmailJS REST API
    │   └── learning.ts               # Learning service (wraps Firestore + Grok)
    │
    ├── store/                        # Zustand state management
    │   ├── authStore.ts              # Auth state, sign-in/up, session
    │   ├── learnStore.ts             # Topic generation & saving
    │   ├── dashboardStore.ts         # Dashboard data fetching
    │   ├── trackStore.ts             # Activity tracking data
    │   ├── myTopicsStore.ts          # Saved topics management
    │   └── themeStore.ts             # Dark/light theme toggle
    │
    ├── theme/
    │   ├── colors.ts                 # Curated dark/light color palettes
    │   ├── ThemeContext.tsx           # React context provider
    │   └── typography.ts             # Font system
    │
    ├── types/
    │   └── index.ts                  # TypeScript interfaces & navigation types
    │
    └── utils/
        ├── constants.ts              # All domain data, resources, roadmaps
        ├── helpers.ts                # Streak calculator, date formatter, validators
        └── linking.ts                # Deep linking configuration
```

---

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────────────┐
│                    SIGN UP FLOW                         │
│                                                         │
│  User fills → Name, Username, Email, Password           │
│       ↓                                                 │
│  Check username availability (Firestore lookup)         │
│       ↓                                                 │
│  Create Firebase Auth account (email + password)        │
│       ↓                                                 │
│  Create Firestore profile (users/{uid})                 │
│       ↓                                                 │
│  Create username mapping (usernames/{username})         │
│       ↓                                                 │
│  Send welcome email via EmailJS (fire-and-forget)       │
│       ↓                                                 │
│  Navigate to Home → Logged In ✅                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    SIGN IN FLOW                         │
│                                                         │
│  User enters → Username OR Email + Password             │
│       ↓                                                 │
│  Detect input type (contains @ → email, else username)  │
│       ↓                                                 │
│  If username → Lookup email from usernames collection   │
│       ↓                                                 │
│  Firebase signInWithEmailAndPassword(email, password)   │
│       ↓                                                 │
│  Fetch profile from Firestore                           │
│       ↓                                                 │
│  Navigate to Home → Logged In ✅                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🤖 AI Architecture

### Grok AI Integration (xAI)

```
┌──────────────────────────────────────┐
│            CodeKick App              │
│                                      │
│  ┌────────────┐   ┌──────────────┐   │
│  │ Learn Topic│   │  AI Chatbot  │   │
│  │  Screen    │   │   (Modal)    │   │
│  └─────┬──────┘   └──────┬───────┘   │
│        │                 │           │
│        ▼                 ▼           │
│  ┌─────────────────────────────────┐ │
│  │       grok.ts Service           │ │
│  │  • generateNotesWithGrok()      │ │
│  │  • chatWithGrok()               │ │
│  └──────────────┬──────────────────┘ │
└─────────────────┼────────────────────┘
                  │
                  ▼
    ┌─────────────────────────────┐
    │    Grok API (api.x.ai)     │
    │    Model: grok-3-mini-fast │
    │    Format: OpenAI-compat   │
    └─────────────────────────────┘
```

**Note Generation Response Format:**
```json
{
  "notes": "## Introduction\n...\n## Key Concepts\n...\n## Code Examples\n...",
  "videos": [
    { "title": "Binary Search Tutorial", "searchQuery": "binary search tutorial beginners" },
    { "title": "Binary Search Crash Course", "searchQuery": "binary search crash course" }
  ]
}
```

---

## 🎨 Design System

### Neumorphic UI
CodeKick uses a custom **neumorphic design system** — a modern UI trend that creates soft, extruded shapes using dual light/dark shadows:

- `NeumorphicView` — Container with raised shadow effect
- `NeumorphicButton` — Pressable with inset effect on press (web uses CSS `box-shadow`, native uses stacked shadow layers)
- Adapts automatically to dark/light theme

### Color Palette
- **Dark Mode**: Pure blacks (#0A0A0A) with subtle grays
- **Light Mode**: Off-white (#F9F9F9) with clean whites
- **Accent Colors**: Indigo (#6366F1), Orange (#F97316), Green (#22C55E), Red (#EF4444)
- **Domain Gradients**: Unique gradient pairs per tech domain

### Animations
- **Floating Particles**: Sine-wave based particle system on home screen
- **Flip Cards**: 3D rotation with `rotateY` transform for domain exploration
- **Underline Reveal**: Animated width expansion for hero text
- **Bounce Scroll**: Looping translateY for scroll indicator
- **Spring Press**: Scale bounce on FAB button press

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Expo Go app on your Android/iOS device
- Firebase project with Email/Password auth + Firestore
- Grok API key (free at https://console.x.ai/)

### Setup
```bash
# Clone and install
git clone https://github.com/your-repo/CodeKick-Android.git
cd CodeKick-Android/CodeKickRN
npm install

# Configure environment
cp .env.example .env
# Edit .env with your Firebase, EmailJS, and Grok API keys

# Run
npx expo start
```

### Environment Variables
```env
# Firebase
EXPO_PUBLIC_FIREBASE_API_KEY=your_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id

# EmailJS (welcome emails)
EXPO_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
EXPO_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
EXPO_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Grok AI (xAI)
EXPO_PUBLIC_GROK_API_KEY=your_grok_api_key
```

---

## 📊 Key Highlights for Presentation

1. **AI-First Approach** — Two distinct AI features (note generation + conversational chatbot) powered by Grok, making learning personalized and interactive
2. **Cross-Platform** — Single codebase (React Native + Expo) runs on Android, iOS, and Web
3. **Production-Grade Auth** — Dual-mode sign-in (username/email), Firestore-backed profiles, automated welcome emails
4. **4 Curated Learning Tracks** — Each with structured roadmaps, curated resources, and clickable external links
5. **Modern Design** — Neumorphic UI, dark/light themes, particle animations, 3D flip cards
6. **Real-Time Data** — Live crypto prices (CoinGecko API) in Web3 track, daily activity tracking
7. **Scalable Architecture** — Clean separation of concerns: Services → Stores → Screens, with TypeScript safety throughout
8. **State Management** — Zustand for lightweight, hook-based state without boilerplate
9. **Firebase Backend** — Serverless infrastructure with Auth + Firestore for zero-maintenance deployment
10. **Developer Experience** — Full TypeScript, hot reload, OTA updates via Expo

---

## 👨‍💻 Built By

**Sarthak** — Full-stack developer passionate about building tools that help developers learn and grow.

---

## 📄 License

This project is proprietary. All rights reserved.
