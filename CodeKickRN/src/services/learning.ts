import { firestoreService } from './firestore';

// ─── Learning Service — Firestore + Grok AI ──────────────────────────────────

export interface VideoSuggestion {
  title: string;
  searchQuery: string;
}

export interface TopicResult {
  notes: string;
  videos: VideoSuggestion[];
}

export const learningService = {
  /** Fetch all saved topics for a user. */
  async getAllTopics(userId: string) {
    return firestoreService.getAllTopics(userId);
  },

  /** Fetch recent 5 topics for dashboard. */
  async getRecentTopics(userId: string) {
    return firestoreService.getRecentTopics(userId);
  },

  /** Fetch activity history for streak/dashboard. */
  async getActivityHistory(userId: string) {
    return firestoreService.getActivityHistory(userId);
  },

  /** Get today's activity */
  async getTodayActivity(userId: string) {
    return firestoreService.getTodayActivity(userId);
  },

  /** Get total topics count */
  async getTotalTopicsCount(userId: string) {
    return firestoreService.getTotalTopicsCount(userId);
  },

  /** Delete a topic */
  async deleteTopic(topicId: string) {
    return firestoreService.deleteTopic(topicId);
  },

  /**
   * Generate notes + video suggestions via Grok AI API.
   * Falls back to a placeholder if the API key is not set.
   */
  async generateNotes(topic: string, focusArea?: string): Promise<TopicResult> {
    try {
      const { generateNotesWithGrok } = await import('./grok');
      return await generateNotesWithGrok(topic, focusArea);
    } catch (e: any) {
      if (e?.message === 'GROK_NOT_CONFIGURED') {
        return {
          notes: `# Notes on: ${topic}\n\n${focusArea ? `**Focus area:** ${focusArea}\n\n` : ''}Add your EXPO_PUBLIC_GROK_API_KEY to .env to generate real AI notes.\n\nGet a free key at https://console.x.ai/\n\nIn the meantime, here are some things to explore:\n- Core concepts of ${topic}\n- Practical applications\n- Common pitfalls\n- Resources and further reading`,
          videos: [
            { title: `${topic} Tutorial`, searchQuery: `${topic} tutorial for beginners` },
            { title: `${topic} Crash Course`, searchQuery: `${topic} crash course` },
            { title: `${topic} Explained`, searchQuery: `${topic} explained simply` },
            { title: `Advanced ${topic}`, searchQuery: `advanced ${topic} tutorial` },
          ],
        };
      }
      throw e;
    }
  },

  /** Save a topic with generated notes. */
  async saveTopic(userId: string, topic: string, notes: string): Promise<void> {
    return firestoreService.saveTopic(userId, topic, notes);
  },
};
