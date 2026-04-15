import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useAuthStore } from '../store/authStore';

// ─── AuthScreen — mirrors AuthScreen.kt ─────────────────────────────────────

const AuthScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const { isLoading, error, success, phoneVerified, signIn, signUp, clearState } =
    useAuthStore();

  const [activeTab, setActiveTab] = useState(0); // 0 = Sign In, 1 = Sign Up
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (success) {
      if (phoneVerified) {
        navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'VerifyPhone' }] });
      }
      clearState();
    }
  }, [success, phoneVerified, navigation, clearState]);

  const handleTabChange = (tab: number) => {
    setActiveTab(tab);
    clearState();
  };

  const handleSubmit = () => {
    if (activeTab === 0) {
      signIn(username, password);
    } else {
      signUp(username, fullName, password);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      {/* Ambient glow */}
      <View style={[styles.glow, { backgroundColor: colors.foreground + '03' }]} />

      {/* Badge */}
      <View style={[styles.badge, { backgroundColor: colors.card + '80' }]}>
        <Ionicons name="sparkles" size={12} color={colors.muted} />
        <Text style={[styles.badgeText, { color: colors.muted }]}>
          {activeTab === 0 ? 'Welcome back' : 'Join us'}
        </Text>
      </View>

      {/* Logo */}
      <Text style={[styles.logoText, { color: colors.foreground }]}>
        Code<Text style={{ color: colors.foreground + '73' }}>Kick</Text>
      </Text>
      <Text style={[styles.subtitleText, { color: colors.foreground + '80' }]}>
        Start your learning journey today
      </Text>

      {/* Auth Card */}
      <View style={[styles.card, { backgroundColor: colors.card + '80' }]}>
        {/* Tab Row */}
        <View style={[styles.tabRow, { backgroundColor: colors.surface + '80' }]}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 0 && [styles.activeTab, { borderBottomColor: colors.primary }]]}
            onPress={() => handleTabChange(0)}
          >
            <Text style={[styles.tabText, { color: activeTab === 0 ? colors.foreground : colors.muted }]}>
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 1 && [styles.activeTab, { borderBottomColor: colors.primary }]]}
            onPress={() => handleTabChange(1)}
          >
            <Text style={[styles.tabText, { color: activeTab === 1 ? colors.foreground : colors.muted }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          {/* Full Name (sign up only) */}
          {activeTab === 1 && (
            <View style={[styles.inputContainer, { borderColor: colors.border }]}>
              <Ionicons name="person-outline" size={18} color={colors.muted} style={styles.inputIcon} />
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Full Name"
                placeholderTextColor={colors.muted}
                style={[styles.input, { color: colors.foreground }]}
              />
            </View>
          )}

          {/* Username */}
          <View style={[styles.inputContainer, { borderColor: colors.border }]}>
            <Ionicons name="person-circle-outline" size={18} color={colors.muted} style={styles.inputIcon} />
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="your_username"
              placeholderTextColor={colors.muted}
              style={[styles.input, { color: colors.foreground }]}
              autoCapitalize="none"
            />
          </View>
          <Text style={[styles.supportingText, { color: colors.muted }]}>
            {activeTab === 0
              ? 'Username is case-sensitive'
              : 'Letters, numbers, underscores only'}
          </Text>

          {/* Password */}
          <View style={[styles.inputContainer, { borderColor: colors.border }]}>
            <Ionicons name="lock-closed-outline" size={18} color={colors.muted} style={styles.inputIcon} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={colors.muted}
              secureTextEntry={!passwordVisible}
              style={[styles.input, { color: colors.foreground, flex: 1 }]}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeButton}>
              <Ionicons
                name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={colors.muted}
              />
            </TouchableOpacity>
          </View>

          {/* Error */}
          {error && (
            <View style={[styles.errorBox, { backgroundColor: colors.accent.red + '20' }]}>
              <Ionicons name="shield-outline" size={16} color={colors.accent.red} />
              <Text style={[styles.errorText, { color: colors.accent.red }]}>{error}</Text>
            </View>
          )}

          {/* Submit */}
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: colors.primary, opacity: isLoading ? 0.7 : 1 }]}
            onPress={handleSubmit}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.onPrimary} />
            ) : (
              <>
                <Text style={[styles.submitText, { color: colors.onPrimary }]}>
                  {activeTab === 0 ? 'Sign In' : 'Create Account'}
                </Text>
                <Ionicons name="arrow-forward" size={16} color={colors.onPrimary} />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  glow: {
    position: 'absolute',
    width: 800,
    height: 800,
    borderRadius: 400,
    alignSelf: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  badgeText: { fontSize: 11, fontWeight: '500', letterSpacing: 1 },
  logoText: { fontSize: 36, fontWeight: '700', marginTop: 16 },
  subtitleText: { fontSize: 14, marginTop: 4, marginBottom: 32 },
  card: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  tabRow: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: { fontSize: 14, fontWeight: '500' },
  formContainer: { padding: 24, gap: 16 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, fontSize: 14 },
  eyeButton: { padding: 4 },
  supportingText: { fontSize: 12, marginTop: -8 },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  errorText: { fontSize: 12, flex: 1 },
  submitButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    height: 52,
    gap: 8,
  },
  submitText: { fontSize: 14, fontWeight: '500' },
});

export default AuthScreen;
