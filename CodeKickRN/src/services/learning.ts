import { supabase } from './supabase';
import { LearningTopic, LearningActivity } from '../types';
import { formatDate } from '../utils/helpers';

// ─── Learning Service — mirrors LearningRepository.kt ───────────────────────

export const learningService = {
  /**
   * Get recent 5 topics for a user.
   * Mirrors LearningRepository.getRecentTopics()
   */
  async getRecentTopics(userId: string): Promise<LearningTopic[]> {
    try {
      const { data, error } = await supabase
        .from('learning_topics')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(5);
      if (error) throw error;
      return (data as LearningTopic[]) || [];
    } catch {
      return [];
    }
  },

  /**
   * Get all topics for a user.
   * Mirrors LearningRepository.getAllTopics()
   */
  async getAllTopics(userId: string): Promise<LearningTopic[]> {
    try {
      const { data, error } = await supabase
        .from('learning_topics')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data as LearningTopic[]) || [];
    } catch {
      return [];
    }
  },

  /**
   * Delete a topic.
   * Mirrors LearningRepository.deleteTopic()
   */
  async deleteTopic(topicId: string): Promise<void> {
    await supabase.from('learning_topics').delete().eq('id', topicId);
  },

  /**
   * Get today's activity for a user.
   * Mirrors LearningRepository.getTodayActivity()
   */
  async getTodayActivity(userId: string): Promise<LearningActivity> {
    const today = formatDate();
    try {
      const { data, error } = await supabase
        .from('learning_activity')
        .select('*')
        .eq('user_id', userId)
        .eq('activity_date', today)
        .single();
      if (error || !data) {
        return { user_id: userId, activity_date: today, topics_count: 0, notes_generated: 0 };
      }
      return data as LearningActivity;
    } catch {
      return { user_id: userId, activity_date: today, topics_count: 0, notes_generated: 0 };
    }
  },

  /**
   * Get activity history (up to 365 days).
   * Mirrors LearningRepository.getActivityHistory()
   */
  async getActivityHistory(userId: string): Promise<LearningActivity[]> {
    try {
      const { data, error } = await supabase
        .from('learning_activity')
        .select('*')
        .eq('user_id', userId)
        .order('activity_date', { ascending: false })
        .limit(365);
      if (error) throw error;
      return (data as LearningActivity[]) || [];
    } catch {
      return [];
    }
  },

  /**
   * Get total topics count.
   * Mirrors LearningRepository.getTotalTopicsCount()
   */
  async getTotalTopicsCount(userId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('learning_topics')
        .select('id')
        .eq('user_id', userId);
      if (error) throw error;
      return data?.length || 0;
    } catch {
      return 0;
    }
  },

  /**
   * Generate notes via Supabase Edge Function.
   * Mirrors LearningRepository.generateNotes()
   */
  async generateNotes(topic: string, focusArea?: string): Promise<string> {
    const body: Record<string, string> = { topic };
    if (focusArea) body.focus_area = focusArea;

    const { data, error } = await supabase.functions.invoke('generate-notes', {
      body,
    });
    if (error) throw error;
    // The edge function returns text content
    return typeof data === 'string' ? data : JSON.stringify(data);
  },

  /**
   * Save a topic with generated notes.
   * Mirrors LearningRepository.saveTopic()
   */
  async saveTopic(userId: string, topic: string, notes: string): Promise<void> {
    const { error } = await supabase.from('learning_topics').insert({
      user_id: userId,
      topic,
      notes,
    });
    if (error) throw error;
  },
};
