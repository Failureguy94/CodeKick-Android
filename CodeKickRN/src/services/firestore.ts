import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { LearningTopic, LearningActivity, Profile } from '../types';
import { formatDate } from '../utils/helpers';

// ─── Firestore Service — replaces Supabase DB calls ─────────────────────────

// ─── User Profiles ────────────────────────────────────────────────────────────

export const firestoreService = {

  /** Create a profile document in users/{uid} and username mapping */
  async createProfile(
    uid: string,
    username: string,
    fullName: string,
    email: string,
    phoneNumber: string,
  ): Promise<void> {
    // Write user profile
    await setDoc(doc(db, 'users', uid), {
      uid,
      username: username.trim().toLowerCase(),
      fullName,
      email: email.trim().toLowerCase(),
      phoneNumber,
      phoneVerified: false,
      createdAt: serverTimestamp(),
    });

    // Write username → uid + email mapping (for login-by-username lookup)
    await setDoc(doc(db, 'usernames', username.trim().toLowerCase()), {
      uid,
      email: email.trim().toLowerCase(),
    });
  },

  /** Get user profile by UID */
  async getProfile(uid: string): Promise<Profile | null> {
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      if (!snap.exists()) return null;
      const data = snap.data();
      return {
        id: uid,
        username: data.username,
        full_name: data.fullName,
        email: data.email,
        phone_verified: data.phoneVerified,
        created_at: data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : (data.createdAt || ''),
      } as Profile;
    } catch {
      return null;
    }
  },

  /** Look up the real email for a given username (for login-by-username) */
  async getEmailByUsername(username: string): Promise<string | null> {
    try {
      const snap = await getDoc(doc(db, 'usernames', username.trim().toLowerCase()));
      if (!snap.exists()) return null;
      return snap.data().email as string;
    } catch {
      return null;
    }
  },

  /** Check if a username is already taken */
  async isUsernameTaken(username: string): Promise<boolean> {
    const snap = await getDoc(doc(db, 'usernames', username.trim().toLowerCase()));
    return snap.exists();
  },

  // ─── Learning Topics ──────────────────────────────────────────────────────

  /** Get recent 5 topics for a user */
  async getRecentTopics(userId: string): Promise<LearningTopic[]> {
    try {
      const q = query(
        collection(db, 'learning_topics'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(5),
      );
      const snap = await getDocs(q);
      return snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          user_id: data.userId,
          topic: data.topic,
          notes: data.notes,
          created_at: data.createdAt instanceof Timestamp
            ? data.createdAt.toDate().toISOString()
            : '',
        } as LearningTopic;
      });
    } catch {
      return [];
    }
  },

  /** Get all topics for a user */
  async getAllTopics(userId: string): Promise<LearningTopic[]> {
    try {
      const q = query(
        collection(db, 'learning_topics'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
      );
      const snap = await getDocs(q);
      return snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          user_id: data.userId,
          topic: data.topic,
          notes: data.notes,
          created_at: data.createdAt instanceof Timestamp
            ? data.createdAt.toDate().toISOString()
            : '',
        } as LearningTopic;
      });
    } catch {
      return [];
    }
  },

  /** Save a topic with generated notes */
  async saveTopic(userId: string, topic: string, notes: string): Promise<void> {
    await addDoc(collection(db, 'learning_topics'), {
      userId,
      topic,
      notes,
      createdAt: serverTimestamp(),
    });
    // Also update today's activity
    await firestoreService.incrementTodayActivity(userId);
  },

  /** Delete a topic by ID */
  async deleteTopic(topicId: string): Promise<void> {
    await deleteDoc(doc(db, 'learning_topics', topicId));
  },

  /** Get total topics count */
  async getTotalTopicsCount(userId: string): Promise<number> {
    try {
      const q = query(
        collection(db, 'learning_topics'),
        where('userId', '==', userId),
      );
      const snap = await getDocs(q);
      return snap.size;
    } catch {
      return 0;
    }
  },

  // ─── Learning Activity ────────────────────────────────────────────────────

  /** Get today's activity for a user */
  async getTodayActivity(userId: string): Promise<LearningActivity> {
    const today = formatDate();
    const docId = `${userId}_${today}`;
    try {
      const snap = await getDoc(doc(db, 'learning_activity', docId));
      if (!snap.exists()) {
        return { user_id: userId, activity_date: today, topics_count: 0, notes_generated: 0 };
      }
      const data = snap.data();
      return {
        user_id: data.userId,
        activity_date: data.activityDate,
        topics_count: data.topicsCount,
        notes_generated: data.notesGenerated,
      };
    } catch {
      return { user_id: userId, activity_date: today, topics_count: 0, notes_generated: 0 };
    }
  },

  /** Increment today's activity counters */
  async incrementTodayActivity(userId: string): Promise<void> {
    const today = formatDate();
    const docId = `${userId}_${today}`;
    const ref = doc(db, 'learning_activity', docId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      await setDoc(ref, {
        ...data,
        topicsCount: (data.topicsCount || 0) + 1,
        notesGenerated: (data.notesGenerated || 0) + 1,
      });
    } else {
      await setDoc(ref, {
        userId,
        activityDate: today,
        topicsCount: 1,
        notesGenerated: 1,
      });
    }
  },

  /** Get activity history (up to 365 days) */
  async getActivityHistory(userId: string): Promise<LearningActivity[]> {
    try {
      const q = query(
        collection(db, 'learning_activity'),
        where('userId', '==', userId),
        orderBy('activityDate', 'desc'),
        limit(365),
      );
      const snap = await getDocs(q);
      return snap.docs.map((d) => {
        const data = d.data();
        return {
          user_id: data.userId,
          activity_date: data.activityDate,
          topics_count: data.topicsCount,
          notes_generated: data.notesGenerated,
        };
      });
    } catch {
      return [];
    }
  },
};
