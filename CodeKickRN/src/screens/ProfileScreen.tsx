import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useAuthStore } from '../store/authStore';

// ─── ProfileScreen — mirrors ProfileScreen.kt ──────────────────────────────

const menuItems = [
  { icon: 'person-outline' as const, label: 'Edit Profile' },
  { icon: 'notifications-outline' as const, label: 'Notifications' },
  { icon: 'lock-closed-outline' as const, label: 'Change Password' },
  { icon: 'information-circle-outline' as const, label: 'About CodeKick' },
];

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const signOut = useAuthStore((s) => s.signOut);

  const handleSignOut = async () => {
    await signOut();
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Avatar */}
      <View style={[styles.avatar, { backgroundColor: colors.card }]}>
        <Ionicons name="person-circle-outline" size={64} color={colors.muted} />
      </View>

      <Text style={[styles.title, { color: colors.foreground }]}>Your Profile</Text>
      <Text style={[styles.subtitle, { color: colors.foreground + '80' }]}>
        Manage your account settings
      </Text>

      <View style={styles.menuList}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={[styles.menuItem, { backgroundColor: colors.card }]}
          >
            <Ionicons name={item.icon} size={22} color={colors.muted} />
            <Text style={[styles.menuLabel, { color: colors.foreground }]}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.muted} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.spacer} />

      {/* Sign out */}
      <TouchableOpacity
        style={[styles.signOutBtn, { borderColor: colors.accent.red }]}
        onPress={handleSignOut}
      >
        <Ionicons name="log-out-outline" size={18} color={colors.accent.red} />
        <Text style={[styles.signOutText, { color: colors.accent.red }]}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 24 },
  avatar: { width: 96, height: 96, borderRadius: 48, justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  title: { fontSize: 24, fontWeight: '700', marginTop: 16 },
  subtitle: { fontSize: 14, marginTop: 8 },
  menuList: { width: '100%', marginTop: 32, gap: 8 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', borderRadius: 12, padding: 16, gap: 12,
  },
  menuLabel: { flex: 1, fontSize: 14 },
  spacer: { flex: 1 },
  signOutBtn: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    width: '100%', height: 52, borderRadius: 12, borderWidth: 1, gap: 8,
  },
  signOutText: { fontSize: 14, fontWeight: '500' },
});

export default ProfileScreen;
