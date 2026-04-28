import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SectionList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { cpResources, cpLanguageTutorials, cpIntermediateTopics, cpAdvancedTopics } from '../../utils/constants';
import { openResourceLink } from '../../utils/linking';

interface ResourceItem {
  title: string;
  url: string;
  badge?: string;
  icon: string;
  iconColor: string;
}

interface ResourceSection {
  title: string;
  subtitle: string;
  data: ResourceItem[];
}

const CPResourcesScreen: React.FC<{ route: any }> = ({ route }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { language, level } = route.params;

  const tutorials = level === 'beginner' ? (cpLanguageTutorials[language] || []) : [];
  const intermediateVids = level === 'intermediate' ? cpIntermediateTopics : [];
  const advancedVids = level === 'advanced' ? cpAdvancedTopics : [];

  // Build sections: tutorials first (beginner only), then common DSA resources
  const sections: ResourceSection[] = [
    ...(tutorials.length > 0
      ? [{
          title: `📺 Learn ${language.toUpperCase()} First`,
          subtitle: 'Watch these tutorials to build your language foundation',
          data: tutorials.map((t) => ({
            title: t.title,
            url: t.url,
            badge: t.channel,
            icon: 'logo-youtube',
            iconColor: '#FF0000',
          })),
        }]
      : []),
    ...(intermediateVids.length > 0
      ? [{
          title: '🔥 Intermediate Topics',
          subtitle: 'Learn Greedy, DP, Trees & Graphs',
          data: intermediateVids.map((t) => ({
            title: t.title,
            url: t.url,
            badge: t.channel,
            icon: 'logo-youtube',
            iconColor: '#FF0000',
          })),
        }]
      : []),
    ...(advancedVids.length > 0
      ? [{
          title: '🚀 Advanced Topics',
          subtitle: 'Segment Trees, Bitmasking, Network Flow & Advanced DP',
          data: advancedVids.map((t) => ({
            title: t.title,
            url: t.url,
            badge: t.channel,
            icon: 'logo-youtube',
            iconColor: '#FF0000',
          })),
        }]
      : []),
    {
      title: '📋 DSA Sheets & Practice',
      subtitle: 'Problem sets and platforms — same for all languages',
      data: cpResources.map((r) => ({
        title: r.title,
        url: r.url,
        icon: 'link',
        iconColor: colors.secondary,
      })),
    },
  ];

  return (
    <SectionList
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.listContent}
      sections={sections}
      keyExtractor={(item, index) => item.title + index}
      stickySectionHeadersEnabled={false}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.foreground }]}>
            {language.toUpperCase()} • {level.charAt(0).toUpperCase() + level.slice(1)}
          </Text>
          <Text style={[styles.subtitle, { color: colors.foreground + '80' }]}>
            {level === 'beginner'
              ? 'Start by learning the language, then practice DSA'
              : 'Curated resources for your level'}
          </Text>
        </View>
      }
      renderSectionHeader={({ section }) => (
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            {section.title}
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.muted }]}>
            {section.subtitle}
          </Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      SectionSeparatorComponent={() => <View style={{ height: 20 }} />}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.card }]}
          onPress={() => openResourceLink(item.url, navigation)}
          activeOpacity={0.7}
        >
          <View style={[styles.iconBg, { backgroundColor: item.iconColor + '20' }]}>
            <Ionicons name={item.icon as any} size={22} color={item.iconColor} />
          </View>
          <View style={styles.info}>
            <Text style={[styles.text, { color: colors.foreground }]} numberOfLines={2}>
              {item.title}
            </Text>
            {item.badge && (
              <Text style={[styles.badge, { color: colors.muted }]}>
                {item.badge}
              </Text>
            )}
          </View>
          <Ionicons name="open-outline" size={16} color={colors.muted} />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { padding: 16, paddingBottom: 32 },
  header: { marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 14, marginTop: 4 },
  sectionHeader: { marginBottom: 12, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  sectionSubtitle: { fontSize: 12, marginTop: 2 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  iconBg: {
    borderRadius: 10,
    padding: 10,
  },
  info: { flex: 1 },
  text: { fontSize: 14, fontWeight: '500' },
  badge: { fontSize: 11, marginTop: 3 },
});

export default CPResourcesScreen;
