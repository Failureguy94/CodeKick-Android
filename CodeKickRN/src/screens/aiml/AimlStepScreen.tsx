import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { aimlRoadmapSteps, aimlStepResources } from '../../utils/constants';

const AimlStepScreen: React.FC<{ route: any }> = ({ route }) => {
  const { colors } = useTheme();
  const stepIndex = parseInt(route.params.step, 10) - 1;
  const [title] = aimlRoadmapSteps[stepIndex] || ['Unknown'];

  return (
    <FlatList
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.listContent}
      data={aimlStepResources}
      keyExtractor={(item) => item}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.foreground }]}>
            Step {route.params.step}: {title}
          </Text>
        </View>
      }
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({ item }) => (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Ionicons name="play-circle-outline" size={20} color={colors.secondary} />
          <Text style={[styles.text, { color: colors.foreground }]}>{item}</Text>
          <Ionicons name="open-outline" size={16} color={colors.muted} />
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
  card: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, padding: 16, gap: 12 },
  text: { flex: 1, fontSize: 14 },
});

export default AimlStepScreen;
