import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

// ─── Top Bar — mirrors CodeKickTopBar in Navigation.kt ──────────────────────

interface TopBarProps {
  isLoggedIn: boolean;
  onProfilePress: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ isLoggedIn, onProfilePress }) => {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.logoContainer}>
        <Text style={[styles.logoBold, { color: colors.foreground }]}>Code</Text>
        <Text style={[styles.logoMuted, { color: colors.foreground + '73' }]}>
          Kick
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
          <Ionicons
            name={isDark ? 'sunny' : 'moon'}
            size={22}
            color={colors.foreground}
          />
        </TouchableOpacity>
        {isLoggedIn && (
          <TouchableOpacity onPress={onProfilePress} style={styles.iconButton}>
            <Ionicons name="person-circle-outline" size={24} color={colors.foreground} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50, // Account for status bar
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBold: {
    fontSize: 22,
    fontWeight: '700',
  },
  logoMuted: {
    fontSize: 22,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconButton: {
    padding: 8,
  },
});

export default TopBar;
