// ─── Color System — mirrors Color.kt exactly ───────────────────────────────

export const Colors = {
  dark: {
    background: '#0A0A0A',
    surface: '#141414',
    card: '#1A1A1A',
    foreground: '#F9F9F9',
    muted: '#888888',
    border: '#2A2A2A',
  },
  light: {
    background: '#F9F9F9',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    foreground: '#0A0A0A',
    muted: '#666666',
    border: '#E5E5E5',
  },
  accent: {
    indigo: '#6366F1',
    orange: '#F97316',
    green: '#22C55E',
    red: '#EF4444',
  },
  domain: {
    cp: ['#1a1a2e', '#16213e'] as [string, string],
    aiml: ['#2d132c', '#1a0a1a'] as [string, string],
    web3: ['#0f2027', '#203a43'] as [string, string],
    web2: ['#3d1c1c', '#1a0a0a'] as [string, string],
  },
};

export type ThemeColors = {
  background: string;
  surface: string;
  card: string;
  foreground: string;
  muted: string;
  border: string;
  primary: string;
  onPrimary: string;
  secondary: string;
  error: string;
  accent: typeof Colors.accent;
};

export const getThemeColors = (isDark: boolean): ThemeColors => {
  const scheme = isDark ? Colors.dark : Colors.light;
  return {
    ...scheme,
    primary: scheme.foreground,
    onPrimary: scheme.background,
    secondary: Colors.accent.indigo,
    error: Colors.accent.red,
    accent: Colors.accent,
  };
};
