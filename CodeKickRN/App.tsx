import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './src/theme/ThemeContext';
import { useThemeStore } from './src/store/themeStore';
import { useAuthStore } from './src/store/authStore';
import AppNavigator from './src/navigation/AppNavigator';

// ─── App Entry Point — mirrors MainActivity.kt ─────────────────────────────

const AppInner: React.FC = () => {
  const isDark = useThemeStore((s) => s.isDark);
  const initSession = useAuthStore((s) => s.initSession);

  useEffect(() => {
    initSession();
  }, []);

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AppNavigator />
    </>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AppInner />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
