import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { cpLanguages } from '../../utils/constants';

// ─── CP Language Selection — mirrors CP_LanguageSelectionScreen ──────────────

const CPLanguageScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <FlatList
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.listContent}
      data={cpLanguages}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.foreground }]}>CP/DSA</Text>
          <Text style={[styles.subtitle, { color: colors.foreground + '80' }]}>
            Choose your programming language
          </Text>
        </View>
      }
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      renderItem={({ item: lang }) => (
        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('CPLevel', { language: lang.id })}
          activeOpacity={0.7}
        >
          <View style={[styles.iconBg, { backgroundColor: lang.color + '26' }]}>
            <Ionicons name={lang.icon as any} size={28} color={lang.color} />
          </View>
          <View style={styles.info}>
            <Text style={[styles.name, { color: colors.foreground }]}>{lang.name}</Text>
            <Text style={[styles.desc, { color: colors.muted }]}>
              Competitive programming with {lang.name}
            </Text>
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
  card: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 20, gap: 16 },
  iconBg: { borderRadius: 10, padding: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  desc: { fontSize: 12, marginTop: 2 },
});

export default CPLanguageScreen;
