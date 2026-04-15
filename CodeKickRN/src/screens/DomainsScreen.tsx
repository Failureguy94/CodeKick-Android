import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import FlipCard from '../components/FlipCard';
import { domains } from '../utils/constants';

// ─── DomainsScreen — mirrors DomainsScreen.kt ──────────────────────────────

const DomainsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();

  const navigateToDomain = (domainId: string) => {
    const routeMap: Record<string, string> = {
      cp: 'CPLanguage',
      aiml: 'AimlOverview',
      web3: 'Web3Track',
      web2: 'Web2Track',
    };
    navigation.navigate(routeMap[domainId] || 'CPLanguage');
  };

  // Chunk domains into rows of 2
  const rows: typeof domains[] = [];
  for (let i = 0; i < domains.length; i += 2) {
    rows.push(domains.slice(i, i + 2));
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={[styles.title, { color: colors.foreground }]}>
        Choose Your Domain
      </Text>
      <Text style={[styles.subtitle, { color: colors.foreground + '80' }]}>
        Tap each card to see detailed information
      </Text>

      {rows.map((row, rowIdx) => (
        <View key={rowIdx} style={styles.row}>
          {row.map((domain) => (
            <FlipCard
              key={domain.id}
              domain={domain}
              onNavigate={() => navigateToDomain(domain.id)}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingVertical: 24 },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
});

export default DomainsScreen;
