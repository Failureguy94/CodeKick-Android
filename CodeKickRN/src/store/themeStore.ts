import { create } from 'zustand';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: true, // Default to dark — same as web/Android
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}));
