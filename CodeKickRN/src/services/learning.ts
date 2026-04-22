import { firestoreService } from './firestore';
import { LearningTopic, LearningActivity } from '../types';

// ─── Learning Service — Firestore replacement for Supabase learning queries ──

export const learningService = {
  /** Get recent 5 topics for a user. */
  async getRecentTopics(userId: string): Promise<LearningTopic[]> {
    return firestoreService.getRecentTopics(userId);
  },

  /** Get all topics for a user. */
  async getAllTopics(userId: string): Promise<LearningTopic[]> {
    return firestoreService.getAllTopics(userId);
  },

  /** Delete a topic by ID. */
  async deleteTopic(topicId: string): Promise<void> {
    return firestoreService.deleteTopic(topicId);
  },

  /** Get today's activity for a user. */
  async getTodayActivity(userId: string): Promise<LearningActivity> {
    return firestoreService.getTodayActivity(userId);
  },

  /** Get activity history (up to 365 days). */
  async getActivityHistory(userId: string): Promise<LearningActivity[]> {
    return firestoreService.getActivityHistory(userId);
  },

  /** Get total topics count for a user. */
  async getTotalTopicsCount(userId: string): Promise<number> {
    return firestoreService.getTotalTopicsCount(userId);
  },

  /**
   * Generate notes via Gemini API (direct call, no Supabase edge function).
   * Falls back to a placeholder if the API key is not set.
   */
  async generateNotes(topic: string, focusArea?: string): Promise<string> {
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      // Stub response for development
      return `# Notes on: ${topic}\n\n${focusArea ? `**Focus area:** ${focusArea}\n\n` : ''}Add your EXPO_PUBLIC_GEMINI_API_KEY to .env to generate real AI notes.\n\nIn the meantime, here are some things to explore:\n- Core concepts of ${topic}\n- Practical applications\n- Common pitfalls\n- Resources and further reading`;
    }

    const body = {
      contents: [
        {
          parts: [
            {
              text: `Generate concise, structured learning notes about the topic: "${topic}"${focusArea ? `, focusing specifically on: "${focusArea}"` : ''}. Use markdown formatting with headers, bullet points, and code examples where appropriate. Keep it practical and beginner-friendly.`,
            },
          ],
        },
      ],
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) throw new Error('Failed to generate notes');
    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Empty response from AI');
    return text;
  },

  /** Save a topic with generated notes. */
  async saveTopic(userId: string, topic: string, notes: string): Promise<void> {
    return firestoreService.saveTopic(userId, topic, notes);
  },
};
