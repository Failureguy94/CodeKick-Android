import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useDashboardStore } from '../store/dashboardStore';
import { NeumorphicView } from '../components/Neumorphic';

// ─── DashboardScreen — mirrors DashboardScreen.kt ──────────────────────────

const topicColors = ['#3B82F6', '#8B5CF6', '#22C55E', '#F97316', '#EC4899'];

const DashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const {
    isLoading, recentTopics, todayActivity, totalTopics,
    currentStreak, memberSince, username, loadDashboardData, deleteTopic,
  } = useDashboardStore();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const renderHeader = () => (
    <View style={styles.headerSection}>
      {/* Welcome */}
      <View style={styles.welcomeSection}>
        <Text style={[styles.welcomeText, { color: colors.foreground }]}>
          Welcome back, {username || 'Learner'}!
        </Text>
        <Text style={[styles.welcomeSub, { color: colors.foreground + '80' }]}>
          Track your learning progress and manage topics
        </Text>
      </View>

      {/* Recent Topics Card */}
      <NeumorphicView style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="book-outline" size={20} color={colors.secondary} />
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>Recent Topics</Text>
          </View>
          <TouchableOpacity
            style={[styles.newTopicBtn, { backgroundColor: colors.surface }]}
            onPress={() => navigation.navigate('Learn')}
          >
            <Ionicons name="add" size={16} color={colors.foreground} />
            <Text style={[styles.newTopicText, { color: colors.foreground }]}>New Topic</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View style={styles.loadingBox}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={[styles.skeleton, { backgroundColor: colors.surface }]} />
            ))}
          </View>
        ) : recentTopics.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="book-outline" size={48} color={colors.muted + '66'} />
            <Text style={[styles.emptyText, { color: colors.muted }]}>
              No topics yet. Start learning!
            </Text>
            <TouchableOpacity
              style={[styles.learnBtn, { backgroundColor: colors.primary }]}
              onPress={() => navigation.navigate('Learn')}
            >
              <Text style={[styles.learnBtnText, { color: colors.onPrimary }]}>
                Learn Your First Topic
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          recentTopics.map((topic, index) => (
            <View key={topic.id} style={[styles.topicRow, { backgroundColor: colors.surface + '80' }]}>
              <View style={[styles.topicDot, { backgroundColor: topicColors[index % topicColors.length] }]} />
              <View style={styles.topicInfo}>
                <Text style={[styles.topicName, { color: colors.foreground }]}>{topic.topic}</Text>
                <Text style={[styles.topicDate, { color: colors.muted }]}>
                  {topic.created_at.substring(0, 10)}
                </Text>
              </View>
              <TouchableOpacity onPress={() => deleteTopic(topic.id)}>
                <Ionicons name="trash-outline" size={20} color={colors.accent.red} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </NeumorphicView>

      {/* Quick Actions */}
      <View style={styles.quickActionsRow}>
        <TouchableOpacity
          style={[styles.quickAction, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('Learn')}
        >
          <View style={[styles.quickIconBg, { backgroundColor: colors.secondary + '1A' }]}>
            <Ionicons name="add" size={24} color={colors.secondary} />
          </View>
          <View>
            <Text style={[styles.quickTitle, { color: colors.foreground }]}>Learn New Topic</Text>
            <Text style={[styles.quickSub, { color: colors.muted }]}>Generate AI notes</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickAction, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('Track')}
        >
          <View style={[styles.quickIconBg, { backgroundColor: colors.accent.orange + '1A' }]}>
            <Ionicons name="flame" size={24} color={colors.accent.orange} />
          </View>
          <View>
            <Text style={[styles.quickTitle, { color: colors.foreground }]}>View Progress</Text>
            <Text style={[styles.quickSub, { color: colors.muted }]}>Activity heatmap</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Daily Activity */}
      <NeumorphicView style={styles.card}>
        <View style={styles.cardTitleRow}>
          <Ionicons name="time-outline" size={20} color={colors.secondary} />
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>Daily Activity</Text>
        </View>
        <View style={styles.activityRows}>
          <View style={[styles.activityRow, { backgroundColor: colors.surface + '80' }]}>
            <Text style={[styles.activityLabel, { color: colors.muted }]}>Topics Generated</Text>
            <Text style={[styles.activityValue, { color: colors.foreground }]}>
              {todayActivity?.topics_count ?? 0}/10
            </Text>
          </View>
          <View style={[styles.activityRow, { backgroundColor: colors.surface + '80' }]}>
            <Text style={[styles.activityLabel, { color: colors.muted }]}>Notes Saved</Text>
            <Text style={[styles.activityValue, { color: colors.foreground }]}>
              {todayActivity?.notes_generated ?? 0}
            </Text>
          </View>
          <View style={[styles.streakRow, { backgroundColor: colors.accent.orange + '1A' }]}>
            <View style={styles.streakLeft}>
              <Ionicons name="flame" size={16} color={colors.accent.orange} />
              <Text style={[styles.activityLabel, { color: colors.foreground }]}>Current Streak</Text>
            </View>
            <Text style={[styles.streakValue, { color: colors.accent.orange }]}>
              {currentStreak} days
            </Text>
          </View>
        </View>
      </NeumorphicView>

      {/* Total Statistics */}
      <NeumorphicView style={styles.card}>
        <View style={styles.cardTitleRow}>
          <Ionicons name="document-text-outline" size={20} color={colors.secondary} />
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>Total Statistics</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: colors.surface + '80' }]}>
            <Text style={[styles.statValue, { color: colors.foreground }]}>{totalTopics}</Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>Topics Learned</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.surface + '80' }]}>
            <Text style={[styles.statValue, { color: colors.foreground }]}>{totalTopics}</Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>Notes Saved</Text>
          </View>
        </View>
        {memberSince ? (
          <View style={styles.memberRow}>
            <Ionicons name="calendar-outline" size={14} color={colors.muted} />
            <Text style={[styles.memberText, { color: colors.muted }]}>
              Member since {memberSince}
            </Text>
          </View>
        ) : null}
      </NeumorphicView>
    </View>
  );

  return (
    <FlatList
      style={[styles.container, { backgroundColor: colors.background }]}
      data={[]}
      renderItem={null}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { padding: 16, paddingBottom: 32 },
  headerSection: { gap: 16 },
  welcomeSection: { paddingVertical: 8 },
  welcomeText: { fontSize: 28, fontWeight: '700' },
  welcomeSub: { fontSize: 14, marginTop: 4 },
  card: { borderRadius: 16, padding: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  newTopicBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  newTopicText: { fontSize: 12, fontWeight: '500' },
  loadingBox: { marginTop: 12, gap: 8 },
  skeleton: { height: 56, borderRadius: 8 },
  emptyBox: { alignItems: 'center', padding: 24, gap: 8 },
  emptyText: { fontSize: 14 },
  learnBtn: { borderRadius: 8, paddingHorizontal: 16, paddingVertical: 10, marginTop: 8 },
  learnBtnText: { fontSize: 14, fontWeight: '500' },
  topicRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, padding: 12, marginTop: 8 },
  topicDot: { width: 10, height: 10, borderRadius: 5 },
  topicInfo: { flex: 1, marginLeft: 12 },
  topicName: { fontSize: 14, fontWeight: '500' },
  topicDate: { fontSize: 12 },
  quickActionsRow: { flexDirection: 'row', gap: 12 },
  quickAction: { flex: 1, flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 16, gap: 12 },
  quickIconBg: { borderRadius: 10, padding: 10 },
  quickTitle: { fontSize: 14, fontWeight: '600' },
  quickSub: { fontSize: 12 },
  activityRows: { marginTop: 12, gap: 6 },
  activityRow: { flexDirection: 'row', justifyContent: 'space-between', borderRadius: 8, padding: 12 },
  activityLabel: { fontSize: 12 },
  activityValue: { fontSize: 16, fontWeight: '700' },
  streakRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderRadius: 8, padding: 12,
  },
  streakLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  streakValue: { fontSize: 16, fontWeight: '700' },
  statsRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  statBox: { flex: 1, borderRadius: 10, padding: 16, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '700' },
  statLabel: { fontSize: 12 },
  memberRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  memberText: { fontSize: 12 },
});

export default DashboardScreen;
