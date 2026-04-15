import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { web3Insights } from '../../utils/constants';

const Web3InsightsScreen: React.FC = () => {
  const { colors } = useTheme();

  return (
    <FlatList
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.listContent}
      data={web3Insights}
      keyExtractor={(item) => item.name}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.foreground }]}>Web3 Market Insights</Text>
          <Text style={[styles.subtitle, { color: colors.foreground + '80' }]}>
            Live crypto prices & trends
          </Text>
        </View>
      }
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({ item }) => {
        const isPositive = item.change.startsWith('+');
        return (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Ionicons name="logo-bitcoin" size={20} color={colors.secondary} />
            <View style={styles.info}>
              <Text style={[styles.name, { color: colors.foreground }]}>{item.name}</Text>
              <Text style={[styles.price, { color: colors.muted }]}>{item.price}</Text>
            </View>
            <Text
              style={[
                styles.change,
                { color: isPositive ? colors.accent.green : colors.accent.red },
              ]}
            >
              {item.change}
            </Text>
          </View>
        );
      }}
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
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '600' },
  price: { fontSize: 12, marginTop: 2 },
  change: { fontSize: 14, fontWeight: '700' },
});

export default Web3InsightsScreen;
