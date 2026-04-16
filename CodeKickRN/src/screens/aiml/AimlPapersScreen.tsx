import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { aimlPapers } from '../../utils/constants';
import { openResourceLink } from '../../utils/linking';

const AimlPapersScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <FlatList
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.listContent}
      data={aimlPapers}
      keyExtractor={(_, i) => String(i)}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.foreground }]}>Research Papers</Text>
          <Text style={[styles.subtitle, { color: colors.foreground + '80' }]}>
            Foundational and recent AI/ML papers
          </Text>
        </View>
      }
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: colors.card }]}
          onPress={() => item.url && openResourceLink(item.url, navigation)}
        >
          <Text style={[styles.paperTitle, { color: colors.foreground }]}>{item.title}</Text>
          <Text style={[styles.paperAuthors, { color: colors.muted }]}>{item.author}</Text>
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
  card: { borderRadius: 12, padding: 16 },
  paperTitle: { fontSize: 14, fontWeight: '600' },
  paperAuthors: { fontSize: 12, marginTop: 4 },
});

export default AimlPapersScreen;
