import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { web3Modules } from '../../utils/constants';

const Web3TrackScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <FlatList
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.listContent}
      data={web3Modules}
      keyExtractor={(item) => item.title}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.foreground }]}>Web3 Track</Text>
          <Text style={[styles.subtitle, { color: colors.foreground + '80' }]}>
            Blockchain & Decentralized Applications
          </Text>
        </View>
      }
      ListFooterComponent={
        <TouchableOpacity
          style={[styles.insightsBtn, { borderColor: colors.border }]}
          onPress={() => navigation.navigate('Web3Insights')}
        >
          <Ionicons name="trending-up" size={18} color={colors.foreground} />
          <Text style={[styles.insightsBtnText, { color: colors.foreground }]}>Market Insights</Text>
        </TouchableOpacity>
      }
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      renderItem={({ item, index }) => (
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: colors.card }]}
          onPress={() => item.url && Linking.openURL(item.url)}
        >
          <View style={[styles.stepBadge, { backgroundColor: colors.secondary + '26' }]}>
            <Text style={[styles.stepNumber, { color: colors.secondary }]}>{index + 1}</Text>
          </View>
          <View style={styles.info}>
            <Text style={[styles.name, { color: colors.foreground }]}>{item.title}</Text>
            <Text style={[styles.desc, { color: colors.muted }]}>{item.desc}</Text>
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
  card: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, padding: 16, gap: 12 },
  stepBadge: { borderRadius: 8, padding: 10 },
  stepNumber: { fontSize: 14, fontWeight: '700' },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '600' },
  desc: { fontSize: 12, marginTop: 2 },
  insightsBtn: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderRadius: 12, height: 52, gap: 8, marginTop: 12,
  },
  insightsBtnText: { fontSize: 14, fontWeight: '500' },
});

export default Web3TrackScreen;
