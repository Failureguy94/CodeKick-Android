import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

// ─── VerifyPhoneScreen — mirrors VerifyPhoneScreen.kt ───────────────────────

const VerifyPhoneScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleVerified = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Ionicons name="phone-portrait-outline" size={64} color={colors.secondary} />
      <Text style={[styles.title, { color: colors.foreground }]}>Verify Phone</Text>
      <Text style={[styles.subtitle, { color: colors.foreground + '80' }]}>
        We need to verify your phone number
      </Text>

      {!otpSent ? (
        <>
          <View style={[styles.inputContainer, { borderColor: colors.border }]}>
            <Ionicons name="call-outline" size={18} color={colors.muted} style={styles.icon} />
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="+91 9876543210"
              placeholderTextColor={colors.muted}
              keyboardType="phone-pad"
              style={[styles.input, { color: colors.foreground }]}
            />
          </View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary, opacity: phone.length >= 10 ? 1 : 0.5 }]}
            onPress={() => setOtpSent(true)}
            disabled={phone.length < 10}
          >
            <Text style={[styles.buttonText, { color: colors.onPrimary }]}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={[styles.otpInfo, { color: colors.foreground + '99' }]}>
            Enter the 6-digit code sent to {phone}
          </Text>
          <View style={[styles.inputContainer, { borderColor: colors.border }]}>
            <TextInput
              value={otp}
              onChangeText={(t) => t.length <= 6 && setOtp(t)}
              placeholder="OTP Code"
              placeholderTextColor={colors.muted}
              keyboardType="number-pad"
              style={[styles.input, { color: colors.foreground }]}
            />
          </View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary, opacity: otp.length === 6 ? 1 : 0.5 }]}
            onPress={handleVerified}
            disabled={otp.length !== 6}
          >
            <Text style={[styles.buttonText, { color: colors.onPrimary }]}>Verify OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOtpSent(false)}>
            <Text style={[styles.linkText, { color: colors.secondary }]}>Change number</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity onPress={handleVerified} style={styles.skipButton}>
        <Text style={[styles.skipText, { color: colors.foreground + '80' }]}>Skip for now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '700', marginTop: 16 },
  subtitle: { fontSize: 14, marginTop: 4 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1,
    borderRadius: 12, paddingHorizontal: 12, height: 52, width: '100%', marginTop: 32,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, fontSize: 14 },
  button: {
    width: '100%', height: 52, borderRadius: 12, justifyContent: 'center',
    alignItems: 'center', marginTop: 16,
  },
  buttonText: { fontSize: 14, fontWeight: '500' },
  otpInfo: { fontSize: 12, marginTop: 12 },
  linkText: { fontSize: 14, marginTop: 8 },
  skipButton: { marginTop: 16 },
  skipText: { fontSize: 14 },
});

export default VerifyPhoneScreen;
