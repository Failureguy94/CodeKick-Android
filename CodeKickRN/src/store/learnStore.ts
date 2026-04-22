import { create } from 'zustand';
import { learningService, VideoSuggestion } from '../services/learning';
import { useAuthStore } from './authStore';

// ─── Learn Store — mirrors LearnViewModel.kt ────────────────────────────────

interface LearnState {
  isGenerating: boolean;
  generatedNotes: string;
  videoSuggestions: VideoSuggestion[];
  currentTopic: string;
  error: string | null;
  isSaved: boolean;

  generateNotes: (topic: string, focusArea?: string) => Promise<void>;
  saveCurrentTopic: () => Promise<void>;
  clearNotes: () => void;
}

export const useLearnStore = create<LearnState>((set, get) => ({
  isGenerating: false,
  generatedNotes: '',
  videoSuggestions: [],
  currentTopic: '',
  error: null,
  isSaved: false,

  generateNotes: async (topic: string, focusArea?: string) => {
    if (!topic.trim()) return;
    set({
      isGenerating: true,
      error: null,
      generatedNotes: '',
      videoSuggestions: [],
      isSaved: false,
      currentTopic: topic,
    });
    try {
      const result = await learningService.generateNotes(topic, focusArea);
      set({
        isGenerating: false,
        generatedNotes: result.notes,
        videoSuggestions: result.videos,
      });
    } catch (e: any) {
      set({
        isGenerating: false,
        error: e?.message || 'Failed to generate notes. Please try again.',
      });
    }
  },

  saveCurrentTopic: async () => {
    const userId = useAuthStore.getState().userId;
    const { currentTopic, generatedNotes } = get();
    if (!userId || !currentTopic.trim() || !generatedNotes.trim()) return;
    try {
      await learningService.saveTopic(userId, currentTopic, generatedNotes);
      set({ isSaved: true });
    } catch {}
  },

  clearNotes: () => {
    set({
      isGenerating: false,
      generatedNotes: '',
      videoSuggestions: [],
      currentTopic: '',
      error: null,
      isSaved: false,
    });
  },
}));
