import { create } from 'zustand';
import { LearningActivity } from '../types';
import { learningService } from '../services/learning';
import { calculateStreak } from '../utils/helpers';
import { useAuthStore } from './authStore';

// ─── Track Store — mirrors TrackViewModel ───────────────────────────────────

interface TrackState {
  activityHistory: LearningActivity[];
  totalTopics: number;
  currentStreak: number;
  isLoading: boolean;

  loadData: () => Promise<void>;
}

export const useTrackStore = create<TrackState>((set) => ({
  activityHistory: [],
  totalTopics: 0,
  currentStreak: 0,
  isLoading: true,

  loadData: async () => {
    const userId = useAuthStore.getState().userId;
    if (!userId) return;
    try {
      const [history, total] = await Promise.all([
        learningService.getActivityHistory(userId),
        learningService.getTotalTopicsCount(userId),
      ]);
      const streak = calculateStreak(history);
      set({ activityHistory: history, totalTopics: total, currentStreak: streak, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
