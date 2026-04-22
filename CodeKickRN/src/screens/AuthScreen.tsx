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
import { NeumorphicView, NeumorphicButton } from '../components/Neumorphic';

// ─── AuthScreen — Firebase Auth (Username/Email sign-in, direct sign-up) ─────

const AuthScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const { isLoading, error, success, clearState, signIn, signUp } = useAuthStore();

  const [activeTab, setActiveTab] = useState(0); // 0 = Sign In, 1 = Sign Up

  // Sign-in fields
  const [loginInput, setLoginInput] = useState(''); // username or email
  const [loginPassword, setLoginPassword] = useState('');
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);

  // Sign-up fields
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (success) {
      navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
      clearState();
    }
  }, [success]);

  const handleTabChange = (tab: number) => {
    setActiveTab(tab);
    clearState();
  };

  const handleSignIn = () => signIn(loginInput, loginPassword);
  const handleSignUp = () => signUp(username, fullName, email, password, phone);

  const isSignInReady = loginInput.trim().length > 0 && loginPassword.length >= 6;
  const isSignUpReady =
    fullName.trim().length > 0 &&
    username.trim().length >= 3 &&
    email.includes('@') &&
    password.length >= 6 &&
    phone.trim().length >= 10;

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
          {activeTab === 0 ? 'Welcome back' : 'Join CodeKick'}
        </Text>
      </View>

      {/* Logo */}
      <Text style={[styles.logoText, { color: colors.foreground }]}>
        Code<Text style={{ color: colors.foreground + '73' }}>Kick</Text>
      </Text>
      <Text style={[styles.subtitleText, { color: colors.foreground + '80' }]}>
        {activeTab === 0
          ? 'Sign in to continue your journey'
          : 'Create your account to get started'}
      </Text>

      {/* Auth Card */}
      <NeumorphicView style={styles.card} borderRadius={20}>
        {/* Tab Row */}
        <View style={[styles.tabRow, { backgroundColor: colors.surface + '80' }]}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 0 && [styles.activeTab, { borderBottomColor: colors.secondary }]]}
            onPress={() => handleTabChange(0)}
          >
            <Text style={[styles.tabText, { color: activeTab === 0 ? colors.foreground : colors.muted }]}>
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 1 && [styles.activeTab, { borderBottomColor: colors.secondary }]]}
            onPress={() => handleTabChange(1)}
          >
            <Text style={[styles.tabText, { color: activeTab === 1 ? colors.foreground : colors.muted }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          {/* ─── SIGN IN FORM ─── */}
          {activeTab === 0 && (
            <>
              {/* Username OR Email */}
              <View>
                <Text style={[styles.fieldLabel, { color: colors.muted }]}>Username or Email</Text>
                <View style={[styles.inputContainer, { borderColor: colors.border }]}>
                  <Ionicons name="person-circle-outline" size={18} color={colors.muted} style={styles.inputIcon} />
                  <TextInput
                    value={loginInput}
                    onChangeText={setLoginInput}
                    placeholder="your_username or email@example.com"
                    placeholderTextColor={colors.muted}
                    style={[styles.input, { color: colors.foreground }]}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                <Text style={[styles.hintText, { color: colors.muted }]}>
                  Enter your username or email address
                </Text>
              </View>

              {/* Password */}
              <View>
                <Text style={[styles.fieldLabel, { color: colors.muted }]}>Password</Text>
                <View style={[styles.inputContainer, { borderColor: colors.border }]}>
                  <Ionicons name="lock-closed-outline" size={18} color={colors.muted} style={styles.inputIcon} />
                  <TextInput
                    value={loginPassword}
                    onChangeText={setLoginPassword}
                    placeholder="Password"
                    placeholderTextColor={colors.muted}
                    secureTextEntry={!loginPasswordVisible}
                    style={[styles.input, { color: colors.foreground, flex: 1 }]}
                  />
                  <TouchableOpacity onPress={() => setLoginPasswordVisible(!loginPasswordVisible)} style={styles.eyeButton}>
                    <Ionicons
                      name={loginPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={colors.muted}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}

          {/* ─── SIGN UP FORM ─── */}
          {activeTab === 1 && (
            <>
              {/* Full Name */}
              <View>
                <Text style={[styles.fieldLabel, { color: colors.muted }]}>Full Name</Text>
                <View style={[styles.inputContainer, { borderColor: colors.border }]}>
                  <Ionicons name="person-outline" size={18} color={colors.muted} style={styles.inputIcon} />
                  <TextInput
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Your Full Name"
                    placeholderTextColor={colors.muted}
                    style={[styles.input, { color: colors.foreground }]}
                  />
                </View>
              </View>

              {/* Username */}
              <View>
                <Text style={[styles.fieldLabel, { color: colors.muted }]}>Username</Text>
                <View style={[styles.inputContainer, { borderColor: colors.border }]}>
                  <Ionicons name="at-circle-outline" size={18} color={colors.muted} style={styles.inputIcon} />
                  <TextInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder="your_username"
                    placeholderTextColor={colors.muted}
                    style={[styles.input, { color: colors.foreground }]}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                <Text style={[styles.hintText, { color: colors.muted }]}>
                  Letters, numbers, underscores · 3+ chars
                </Text>
              </View>

              {/* Email */}
              <View>
                <Text style={[styles.fieldLabel, { color: colors.muted }]}>Email Address</Text>
                <View style={[styles.inputContainer, { borderColor: colors.border }]}>
                  <Ionicons name="mail-outline" size={18} color={colors.muted} style={styles.inputIcon} />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="you@example.com"
                    placeholderTextColor={colors.muted}
                    style={[styles.input, { color: colors.foreground }]}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Password */}
              <View>
                <Text style={[styles.fieldLabel, { color: colors.muted }]}>Password</Text>
                <View style={[styles.inputContainer, { borderColor: colors.border }]}>
                  <Ionicons name="lock-closed-outline" size={18} color={colors.muted} style={styles.inputIcon} />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Min 6 characters"
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
              </View>

              {/* Phone Number */}
              <View>
                <Text style={[styles.fieldLabel, { color: colors.muted }]}>Phone Number</Text>
                <View style={[styles.inputContainer, { borderColor: colors.border }]}>
                  <Ionicons name="call-outline" size={18} color={colors.muted} style={styles.inputIcon} />
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="+91 9876543210"
                    placeholderTextColor={colors.muted}
                    keyboardType="phone-pad"
                    style={[styles.input, { color: colors.foreground }]}
                  />
                </View>
              </View>
            </>
          )}

          {/* Error */}
          {error ? (
            <View style={[styles.errorBox, { backgroundColor: colors.accent.red + '20' }]}>
              <Ionicons name="shield-outline" size={16} color={colors.accent.red} />
              <Text style={[styles.errorText, { color: colors.accent.red }]}>{error}</Text>
            </View>
          ) : null}

          {/* Submit */}
          <NeumorphicButton
            style={[
              styles.submitButton,
              { opacity: (activeTab === 0 ? isSignInReady : isSignUpReady) ? 1 : 0.6 },
            ]}
            onPress={activeTab === 0 ? handleSignIn : handleSignUp}
            disabled={isLoading || (activeTab === 0 ? !isSignInReady : !isSignUpReady)}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.secondary} />
            ) : (
              <>
                <Text style={[styles.submitText, { color: colors.secondary }]}>
                  {activeTab === 0 ? 'Sign In' : 'Create Account'}
                </Text>
                <Ionicons name="arrow-forward" size={16} color={colors.secondary} />
              </>
            )}
          </NeumorphicButton>
        </View>
      </NeumorphicView>
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
  subtitleText: { fontSize: 14, marginTop: 4, marginBottom: 32, textAlign: 'center' },
  card: { width: '100%', borderRadius: 20, overflow: 'hidden' },
  tabRow: { flexDirection: 'row' },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: { borderBottomWidth: 2 },
  tabText: { fontSize: 14, fontWeight: '600' },
  formContainer: { padding: 24, gap: 14 },
  fieldLabel: { fontSize: 11, fontWeight: '600', marginBottom: 6, letterSpacing: 0.5, textTransform: 'uppercase' },
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
  hintText: { fontSize: 11, marginTop: 4 },
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
  submitText: { fontSize: 14, fontWeight: '600' },
});

export default AuthScreen;
