import { LearningActivity } from '../types';

/**
 * Calculate consecutive day streak — mirrors Dashboard.tsx / TrackViewModel streak logic.
 */
export const calculateStreak = (history: LearningActivity[]): number => {
  if (history.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let streak = 0;

  for (let i = 0; i < history.length; i++) {
    const actDate = new Date(history[i].activity_date);
    actDate.setHours(0, 0, 0, 0);
    const daysDiff = Math.floor(
      (today.getTime() - actDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff === i && history[i].topics_count > 0) {
      streak++;
    } else if (daysDiff > i) {
      break;
    }
  }

  return streak;
};

/**
 * Format date as YYYY-MM-DD (mirrors SimpleDateFormat("yyyy-MM-dd")).
 */
export const formatDate = (date: Date = new Date()): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

/**
 * Validate username — mirrors validateUsername() in AuthViewModel.kt.
 */
export const validateUsername = (username: string): boolean => {
  const trimmed = username.trim();
  if (trimmed.length < 3) return false;
  return /^[a-zA-Z0-9_]+$/.test(trimmed);
};

/**
 * Build email from username — mirrors buildEmail() in AuthRepository.kt.
 */
export const buildEmail = (username: string): string => {
  return `${username.trim()}@codekick.local`;
};
