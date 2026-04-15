import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { cpLevels } from '../../utils/constants';

const CPLevelScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { language } = route.params;

  return (
    <FlatList
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.listContent}
      data={cpLevels}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.foreground }]}>{language.toUpperCase()}</Text>
          <Text style={[styles.subtitle, { color: colors.foreground + '80' }]}>
            Select your proficiency level
          </Text>
        </View>
      }
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('CPResources', { language, level: item.id })}
          activeOpacity={0.7}
        >
          <View style={styles.info}>
            <Text style={[styles.name, { color: colors.foreground }]}>{item.label}</Text>
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
  card: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 20 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  desc: { fontSize: 12, marginTop: 2 },
});

export default CPLevelScreen;
