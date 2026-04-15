import { create } from 'zustand';
import { LearningTopic } from '../types';
import { learningService } from '../services/learning';
import { useAuthStore } from './authStore';

// ─── My Topics Store — mirrors MyTopicsViewModel ────────────────────────────

interface MyTopicsState {
  topics: LearningTopic[];
  isLoading: boolean;

  loadTopics: () => Promise<void>;
  deleteTopic: (id: string) => Promise<void>;
}

export const useMyTopicsStore = create<MyTopicsState>((set) => ({
  topics: [],
  isLoading: true,

  loadTopics: async () => {
    const userId = useAuthStore.getState().userId;
    if (!userId) return;
    set({ isLoading: true });
    const topics = await learningService.getAllTopics(userId);
    set({ topics, isLoading: false });
  },

  deleteTopic: async (id: string) => {
    try {
      await learningService.deleteTopic(id);
      set((state) => ({
        topics: state.topics.filter((t) => t.id !== id),
      }));
    } catch {}
  },
}));
