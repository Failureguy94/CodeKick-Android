import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { cpBlogs } from '../../utils/constants';

const CPBlogsScreen: React.FC = () => {
  const { colors } = useTheme();

  return (
    <FlatList
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.listContent}
      data={cpBlogs}
      keyExtractor={(item) => item}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.foreground }]}>Daily Blogs</Text>
          <Text style={[styles.subtitle, { color: colors.foreground + '80' }]}>Fresh CP content every day</Text>
        </View>
      }
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({ item }) => (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Ionicons name="newspaper-outline" size={20} color={colors.secondary} />
          <Text style={[styles.text, { color: colors.foreground }]}>{item}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { padding: 16 },
  header: { marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 14, marginTop: 4 },
  card: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, padding: 16, gap: 12 },
  text: { flex: 1, fontSize: 14 },
});

export default CPBlogsScreen;
