import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useMyTopicsStore } from '../store/myTopicsStore';

// ─── MyTopicsScreen — mirrors MyTopicsScreen.kt ─────────────────────────────

const MyTopicsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const { topics, isLoading, loadTopics, deleteTopic } = useMyTopicsStore();

  useEffect(() => { loadTopics(); }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.foreground }]}>My Topics</Text>
        <Text style={[styles.subtitle, { color: colors.foreground + '80' }]}>
          All your saved learning topics
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      ) : topics.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="book-outline" size={64} color={colors.muted + '66'} />
          <Text style={[styles.emptyText, { color: colors.muted }]}>No saved topics yet.</Text>
          <TouchableOpacity
            style={[styles.learnBtn, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('Learn')}
          >
            <Text style={[styles.learnBtnText, { color: colors.onPrimary }]}>Learn a Topic</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={topics}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => (
            <View style={[styles.topicCard, { backgroundColor: colors.card }]}>
              <View style={styles.topicInfo}>
                <Text style={[styles.topicName, { color: colors.foreground }]}>{item.topic}</Text>
                <Text style={[styles.topicDate, { color: colors.muted }]}>
                  {item.created_at.substring(0, 10)}
                </Text>
              </View>
              <TouchableOpacity onPress={() => deleteTopic(item.id)}>
                <Ionicons name="trash-outline" size={20} color={colors.accent.red} />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 14, marginTop: 4 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  emptyText: { fontSize: 14 },
  learnBtn: { borderRadius: 8, paddingHorizontal: 16, paddingVertical: 10 },
  learnBtnText: { fontSize: 14, fontWeight: '500' },
  list: { paddingBottom: 16 },
  topicCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, padding: 16 },
  topicInfo: { flex: 1 },
  topicName: { fontSize: 14, fontWeight: '600' },
  topicDate: { fontSize: 12, marginTop: 2 },
});

export default MyTopicsScreen;
