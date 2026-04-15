import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { web2Tracks } from '../../utils/constants';

const Web2TrackScreen: React.FC = () => {
  const { colors } = useTheme();

  return (
    <FlatList
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.listContent}
      data={web2Tracks}
      keyExtractor={(_, i) => String(i)}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.foreground }]}>Web2 Track</Text>
          <Text style={[styles.subtitle, { color: colors.foreground + '80' }]}>
            Full-stack web development from zero to hero
          </Text>
        </View>
      }
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      renderItem={({ item: [title, desc], index }) => (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={[styles.stepBadge, { backgroundColor: colors.secondary + '26' }]}>
            <Text style={[styles.stepNumber, { color: colors.secondary }]}>{index + 1}</Text>
          </View>
          <View style={styles.info}>
            <Text style={[styles.name, { color: colors.foreground }]}>{title}</Text>
            <Text style={[styles.desc, { color: colors.muted }]}>{desc}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.muted} />
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
  stepBadge: { borderRadius: 8, padding: 10 },
  stepNumber: { fontSize: 14, fontWeight: '700' },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '600' },
  desc: { fontSize: 12, marginTop: 2 },
});

export default Web2TrackScreen;
