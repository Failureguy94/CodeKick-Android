import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useAuthStore } from '../store/authStore';

// ─── VerifyPhoneScreen — now a re-verification / success screen ───────────────
// Primary phone OTP verification now happens in the OTP Modal during sign-up.
// This screen is reachable from the Profile page for secondary verification.

const VerifyPhoneScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const { isLoggedIn } = useAuthStore();

  const handleContinue = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Success icon */}
      <View style={[styles.iconBadge, { backgroundColor: colors.secondary + '20' }]}>
        <Ionicons name="checkmark-circle" size={72} color={colors.secondary} />
      </View>

      <Text style={[styles.title, { color: colors.foreground }]}>
        {isLoggedIn ? 'You\'re Verified!' : 'Verification'}
      </Text>
      <Text style={[styles.subtitle, { color: colors.foreground + '80' }]}>
        {isLoggedIn
          ? 'Your account has been successfully verified. You\'re all set to start learning!'
          : 'Complete verification to access all features.'}
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.secondary }]}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
        <Ionicons name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  iconBadge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 52,
    borderRadius: 14,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default VerifyPhoneScreen;
