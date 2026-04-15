import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { allPaths } from '../utils/constants';

// ─── DiscoverScreen — mirrors DiscoverScreen.kt ─────────────────────────────

const DiscoverScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = allPaths.filter(
    (p) =>
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.route}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.foreground }]}>Discover</Text>
            <Text style={[styles.subtitle, { color: colors.foreground + '80' }]}>
              Browse all learning paths
            </Text>
            <View style={[styles.searchInput, { borderColor: colors.border }]}>
              <Ionicons name="search" size={18} color={colors.muted} />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search paths..."
                placeholderTextColor={colors.muted}
                style={[styles.input, { color: colors.foreground }]}
              />
            </View>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item: path }) => (
          <TouchableOpacity
            style={[styles.pathCard, { backgroundColor: colors.card }]}
            onPress={() => navigation.navigate(path.route)}
            activeOpacity={0.7}
          >
            <View style={[styles.pathIconBg, { backgroundColor: path.color + '26' }]}>
              <Ionicons name={path.icon as any} size={28} color={path.color} />
            </View>
            <View style={styles.pathInfo}>
              <Text style={[styles.pathTitle, { color: colors.foreground }]}>{path.title}</Text>
              <Text style={[styles.pathDesc, { color: colors.muted }]}>{path.description}</Text>
              <View style={[styles.durationBadge, { backgroundColor: path.color + '1A' }]}>
                <Text style={[styles.durationText, { color: path.color }]}>{path.duration}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.muted} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { padding: 16 },
  header: { marginBottom: 12 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 14, marginTop: 4, marginBottom: 12 },
  searchInput: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, height: 48, gap: 8 },
  input: { flex: 1, fontSize: 14 },
  pathCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 16, gap: 12 },
  pathIconBg: { borderRadius: 12, padding: 12 },
  pathInfo: { flex: 1 },
  pathTitle: { fontSize: 16, fontWeight: '600' },
  pathDesc: { fontSize: 12, marginTop: 2 },
  durationBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2, alignSelf: 'flex-start', marginTop: 4 },
  durationText: { fontSize: 11, fontWeight: '500' },
});

export default DiscoverScreen;
