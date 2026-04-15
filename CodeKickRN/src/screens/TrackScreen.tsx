import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useTrackStore } from '../store/trackStore';
import { LearningActivity } from '../types';

// ─── TrackScreen — mirrors TrackScreen.kt ───────────────────────────────────

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TrackScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const { activityHistory, totalTopics, currentStreak, isLoading, loadData } = useTrackStore();

  useEffect(() => { loadData(); }, []);

  const milestones = [
    { label: 'First Topic!', achieved: totalTopics >= 1, icon: 'trophy-outline' as const },
    { label: '5 Topics Learned', achieved: totalTopics >= 5, icon: 'trophy-outline' as const },
    { label: '10 Topics Learned', achieved: totalTopics >= 10, icon: 'trophy-outline' as const },
    { label: '7-Day Streak', achieved: currentStreak >= 7, icon: 'flame' as const },
    { label: '30-Day Streak', achieved: currentStreak >= 30, icon: 'flame' as const },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: colors.foreground }]}>Your Progress</Text>
      <Text style={[styles.subtitle, { color: colors.foreground + '80' }]}>
        Track your learning journey over time
      </Text>

      {/* Stats cards */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Ionicons name="book-outline" size={24} color={colors.foreground} />
          <Text style={[styles.statValue, { color: colors.foreground }]}>{totalTopics}</Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Topics Learned</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Ionicons name="flame" size={24} color={colors.accent.orange} />
          <Text style={[styles.statValue, { color: colors.accent.orange }]}>{currentStreak}</Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Day Streak</Text>
        </View>
      </View>

      {/* Activity Heatmap */}
      <View style={[styles.heatmapCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Activity Heatmap</Text>
        <Text style={[styles.sectionSub, { color: colors.muted }]}>Last 12 weeks</Text>
        <ActivityHeatmap activityHistory={activityHistory} colors={colors} />
      </View>

      {/* Milestones */}
      <View style={[styles.milestonesCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Milestones</Text>
        {milestones.map((m, i) => (
          <View key={i} style={[styles.milestoneRow, { backgroundColor: colors.surface + '80' }]}>
            <Ionicons
              name={m.icon}
              size={20}
              color={m.achieved ? colors.accent.green : colors.muted + '66'}
            />
            <Text
              style={[
                styles.milestoneLabel,
                {
                  color: m.achieved ? colors.foreground : colors.muted + '80',
                  fontWeight: m.achieved ? '600' : '400',
                },
              ]}
            >
              {m.label}
            </Text>
            {m.achieved && (
              <Ionicons name="checkmark-circle-outline" size={16} color={colors.accent.green} />
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// ─── SVG Activity Heatmap — mirrors ActivityHeatmap Canvas drawing ──────────

interface HeatmapProps {
  activityHistory: LearningActivity[];
  colors: any;
}

const ActivityHeatmap: React.FC<HeatmapProps> = ({ activityHistory, colors }) => {
  const weeks = 12;
  const days = 7;
  const activityMap: Record<string, number> = {};
  activityHistory.forEach((a) => { activityMap[a.activity_date] = a.topics_count; });

  const cellSize = (SCREEN_WIDTH - 64) / (weeks + 1);
  const gap = 4;
  const height = days * (cellSize + gap / 2) + 8;

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const cells: React.ReactNode[] = [];
  for (let week = 0; week < weeks; week++) {
    for (let day = 0; day < days; day++) {
      const d = new Date(startOfWeek);
      d.setDate(d.getDate() + (week - weeks + 1) * 7 + day);
      const dateStr = d.toISOString().substring(0, 10);
      const count = activityMap[dateStr] || 0;

      let fill: string;
      if (count === 0) {
        fill = colors.surface;
      } else if (count < 3) {
        fill = colors.accent.green + '66';
      } else if (count < 6) {
        fill = colors.accent.green + 'B3';
      } else {
        fill = colors.accent.green;
      }

      cells.push(
        <Rect
          key={`${week}-${day}`}
          x={week * cellSize + gap / 2}
          y={day * (cellSize + gap / 2)}
          width={cellSize - gap}
          height={cellSize - gap}
          rx={3}
          fill={fill}
        />
      );
    }
  }

  return (
    <View style={styles.heatmapContainer}>
      <Svg width={SCREEN_WIDTH - 64} height={height}>
        {cells}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 16 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 14 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: { flex: 1, borderRadius: 16, padding: 16, gap: 4 },
  statValue: { fontSize: 24, fontWeight: '700' },
  statLabel: { fontSize: 12 },
  heatmapCard: { borderRadius: 16, padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  sectionSub: { fontSize: 12, marginBottom: 12 },
  heatmapContainer: { marginTop: 8 },
  milestonesCard: { borderRadius: 16, padding: 16, gap: 6 },
  milestoneRow: {
    flexDirection: 'row', alignItems: 'center', borderRadius: 8, padding: 12, gap: 12, marginTop: 6,
  },
  milestoneLabel: { flex: 1, fontSize: 14 },
});

export default TrackScreen;
