// ─── Data Models — mirror Kotlin @Serializable data classes ─────────────────

export interface Profile {
  id: string;
  username: string;
  full_name: string;
  phone_verified: boolean;
  created_at: string;
  avatar: string | null;
}

export interface LearningTopic {
  id: string;
  user_id: string;
  topic: string;
  notes: string | null;
  created_at: string;
}

export interface LearningActivity {
  id?: string;
  user_id: string;
  activity_date: string;
  topics_count: number;
  notes_generated: number;
}

export interface GeneratedNotes {
  notes: string;
  videos: VideoResource[];
}

export interface VideoResource {
  title: string;
  url: string;
  thumbnail: string | null;
}

// ─── UI Models ──────────────────────────────────────────────────────────────

export interface Domain {
  id: string;
  name: string;
  icon: string; // Ionicons name
  gradient: [string, string];
  description: string;
  advantages: string[];
  disadvantages: string[];
  salary: string;
  timeToMaster: string;
}

export interface LearningPath {
  title: string;
  description: string;
  route: string;
  icon: string;
  color: string;
  duration: string;
}

export interface Language {
  id: string;
  name: string;
  icon: string;
  color: string;
}

// ─── Navigation Types ───────────────────────────────────────────────────────

export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
  VerifyPhone: undefined;
  Profile: undefined;
  Discover: undefined;
  MyTopics: undefined;
  // CP Track
  CPLanguage: undefined;
  CPLevel: { language: string };
  CPResources: { language: string; level: string };
  CPBlogs: undefined;
  // AIML Track
  AimlOverview: undefined;
  AimlStep: { step: string };
  AimlPapers: undefined;
  // Web3 Track
  Web3Track: undefined;
  Web3Insights: undefined;
  // Web2 Track
  Web2Track: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Domains: undefined;
  Learn: undefined;
  Track: undefined;
  Dashboard: undefined;
};
