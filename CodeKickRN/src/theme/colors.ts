// ─── Color System — matches codepunch.vercel.app ────────────────────────────

export const Colors = {
  dark: {
    background: '#0D0D12',
    surface: '#161620',
    card: '#1C1C28',
    foreground: '#F1F1F5',
    muted: '#7E7E94',
    border: '#2A2A3C',
  },
  light: {
    background: '#FAFAFA',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    foreground: '#1A1A2E',
    muted: '#6B6B80',
    border: '#E8E8EE',
  },
  accent: {
    indigo: '#E84B8A',
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
    primary: Colors.accent.indigo,
    onPrimary: '#FFFFFF',
    secondary: Colors.accent.indigo,
    error: Colors.accent.red,
    accent: Colors.accent,
  };
};

