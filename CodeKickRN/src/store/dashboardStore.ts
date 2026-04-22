import { create } from 'zustand';
import { LearningTopic, LearningActivity } from '../types';
import { learningService } from '../services/learning';
import { authService } from '../services/auth';
import { calculateStreak } from '../utils/helpers';
import { useAuthStore } from './authStore';

// ─── Dashboard Store — Firestore-backed ─────────────────────────────────────

interface DashboardState {
  isLoading: boolean;
  recentTopics: LearningTopic[];
  todayActivity: LearningActivity | null;
  totalTopics: number;
  currentStreak: number;
  memberSince: string;
  username: string;

  loadDashboardData: () => Promise<void>;
  deleteTopic: (topicId: string) => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  isLoading: true,
  recentTopics: [],
  todayActivity: null,
  totalTopics: 0,
  currentStreak: 0,
  memberSince: '',
  username: '',

  loadDashboardData: async () => {
    const userId = useAuthStore.getState().userId;
    if (!userId) return;

    set({ isLoading: true });
    try {
      const [recentTopics, todayActivity, totalTopics, activityHistory, profile] =
        await Promise.all([
          learningService.getRecentTopics(userId),
          learningService.getTodayActivity(userId),
          learningService.getTotalTopicsCount(userId),
          learningService.getActivityHistory(userId),
          authService.getProfile(userId),
        ]);

      const streak = calculateStreak(activityHistory);

      set({
        isLoading: false,
        recentTopics,
        todayActivity,
        totalTopics,
        currentStreak: streak,
        memberSince: profile?.created_at?.substring(0, 10) || '',
        username: profile?.username || useAuthStore.getState().username || 'Learner',
      });
    } catch {
      set({ isLoading: false });
    }
  },

  deleteTopic: async (topicId: string) => {
    try {
      await learningService.deleteTopic(topicId);
      set((state) => ({
        recentTopics: state.recentTopics.filter((t) => t.id !== topicId),
      }));
    } catch {}
  },
}));
