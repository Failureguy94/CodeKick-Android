import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { aimlRoadmapSteps } from '../../utils/constants';

const AimlOverviewScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <FlatList
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.listContent}
      data={aimlRoadmapSteps}
      keyExtractor={(_, i) => String(i)}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.foreground }]}>AI/ML Roadmap</Text>
          <Text style={[styles.subtitle, { color: colors.foreground + '80' }]}>
            Your complete path to mastering AI & ML
          </Text>
        </View>
      }
      ListFooterComponent={
        <TouchableOpacity
          style={[styles.papersBtn, { borderColor: colors.border }]}
          onPress={() => navigation.navigate('AimlPapers')}
        >
          <Ionicons name="document-text-outline" size={18} color={colors.foreground} />
          <Text style={[styles.papersBtnText, { color: colors.foreground }]}>Browse Research Papers</Text>
        </TouchableOpacity>
      }
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      renderItem={({ item: [title, desc], index }) => (
        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('AimlStep', { step: String(index + 1) })}
          activeOpacity={0.7}
        >
          <View style={[styles.stepBadge, { backgroundColor: colors.secondary + '26' }]}>
            <Text style={[styles.stepNumber, { color: colors.secondary }]}>{index + 1}</Text>
          </View>
          <View style={styles.info}>
            <Text style={[styles.name, { color: colors.foreground }]}>{title}</Text>
            <Text style={[styles.desc, { color: colors.muted }]}>{desc}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.muted} />
        </TouchableOpacity>
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
  card: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 16, gap: 12 },
  stepBadge: { borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 },
  stepNumber: { fontSize: 16, fontWeight: '700' },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '600' },
  desc: { fontSize: 12, marginTop: 2 },
  papersBtn: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderRadius: 12, height: 52, gap: 8, marginTop: 12,
  },
  papersBtnText: { fontSize: 14, fontWeight: '500' },
});

export default AimlOverviewScreen;
