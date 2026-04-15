// ─── Typography — mirrors Type.kt Inter font family ────────────────────────
import { TextStyle } from 'react-native';

// Note: Inter font is loaded via expo-font in App.tsx
// Using system font as fallback until Inter is loaded
const interFamily = 'Inter';

export const Typography = {
  displayLarge: {
    fontFamily: interFamily,
    fontWeight: '700' as TextStyle['fontWeight'],
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontFamily: interFamily,
    fontWeight: '700' as TextStyle['fontWeight'],
    fontSize: 45,
    lineHeight: 52,
  },
  headlineLarge: {
    fontFamily: interFamily,
    fontWeight: '700' as TextStyle['fontWeight'],
    fontSize: 32,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: interFamily,
    fontWeight: '600' as TextStyle['fontWeight'],
    fontSize: 28,
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily: interFamily,
    fontWeight: '600' as TextStyle['fontWeight'],
    fontSize: 24,
    lineHeight: 32,
  },
  titleLarge: {
    fontFamily: interFamily,
    fontWeight: '600' as TextStyle['fontWeight'],
    fontSize: 22,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: interFamily,
    fontWeight: '500' as TextStyle['fontWeight'],
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  bodyLarge: {
    fontFamily: interFamily,
    fontWeight: '400' as TextStyle['fontWeight'],
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontFamily: interFamily,
    fontWeight: '400' as TextStyle['fontWeight'],
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily: interFamily,
    fontWeight: '400' as TextStyle['fontWeight'],
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  labelLarge: {
    fontFamily: interFamily,
    fontWeight: '500' as TextStyle['fontWeight'],
    fontSize: 14,
    lineHeight: 20,
  },
  labelSmall: {
    fontFamily: interFamily,
    fontWeight: '500' as TextStyle['fontWeight'],
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
};
