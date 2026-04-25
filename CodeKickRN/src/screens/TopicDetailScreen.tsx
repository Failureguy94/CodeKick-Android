import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import MarkdownRenderer from '../components/MarkdownRenderer';

const TopicDetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const { colors } = useTheme();
  const { topic } = route.params; // topic is of type LearningTopic

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.topicTitle, { color: colors.foreground }]}>
          {topic.topic}
        </Text>
        <Text style={[styles.topicDate, { color: colors.muted }]}>
          Saved on: {topic.created_at.substring(0, 10)}
        </Text>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        {topic.notes ? (
          <MarkdownRenderer content={topic.notes} />
        ) : (
          <Text style={{ color: colors.muted }}>No notes available for this topic.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  card: { borderRadius: 16, padding: 16 },
  topicTitle: { fontSize: 22, fontWeight: '700' },
  topicDate: { fontSize: 12, marginTop: 4 },
  divider: { height: 1, marginVertical: 12 },
});

export default TopicDetailScreen;
