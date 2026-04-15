import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { cpResources } from '../../utils/constants';

const CPResourcesScreen: React.FC<{ route: any }> = ({ route }) => {
  const { colors } = useTheme();
  const { language, level } = route.params;

  return (
    <FlatList
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.listContent}
      data={cpResources}
      keyExtractor={(item) => item.title}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.foreground }]}>
            {language} • {level.charAt(0).toUpperCase() + level.slice(1)}
          </Text>
          <Text style={[styles.subtitle, { color: colors.foreground + '80' }]}>Curated resources for your level</Text>
        </View>
      }
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: colors.card }]}
          onPress={() => Linking.openURL(item.url)}
        >
          <Ionicons name="link" size={20} color={colors.secondary} />
          <Text style={[styles.text, { color: colors.foreground }]}>{item.title}</Text>
          <Ionicons name="open-outline" size={16} color={colors.muted} />
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
  text: { flex: 1, fontSize: 14 },
});

export default CPResourcesScreen;
