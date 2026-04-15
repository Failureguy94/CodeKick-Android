import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { web3Insights as fallbackInsights } from '../../utils/constants';

interface CryptoPrice {
  name: string;
  price: string;
  change: string;
}

const Web3InsightsScreen: React.FC = () => {
  const { colors } = useTheme();
  const [data, setData] = useState<CryptoPrice[]>(fallbackInsights);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,matic-network&vs_currencies=usd&include_24hr_change=true');
        const json = await response.json();
        
        setData([
          { name: 'Bitcoin', price: `$${json.bitcoin.usd.toLocaleString()}`, change: `${json.bitcoin.usd_24h_change >= 0 ? '+' : ''}${json.bitcoin.usd_24h_change.toFixed(2)}%` },
          { name: 'Ethereum', price: `$${json.ethereum.usd.toLocaleString()}`, change: `${json.ethereum.usd_24h_change >= 0 ? '+' : ''}${json.ethereum.usd_24h_change.toFixed(2)}%` },
          { name: 'Solana', price: `$${json.solana.usd.toLocaleString()}`, change: `${json.solana.usd_24h_change >= 0 ? '+' : ''}${json.solana.usd_24h_change.toFixed(2)}%` },
          { name: 'Polygon', price: `$${json['matic-network'].usd.toLocaleString()}`, change: `${json['matic-network'].usd_24h_change >= 0 ? '+' : ''}${json['matic-network'].usd_24h_change.toFixed(2)}%` },
        ]);
      } catch (err) {
        console.log('Failed to fetch prices', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

  return (
    <FlatList
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.listContent}
      data={data}
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
      ListEmptyComponent={loading ? <ActivityIndicator size="large" color={colors.secondary} style={{marginTop: 50}} /> : null}
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
