/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#1976d2'; // strong blue
const tintColorDark = '#90caf9'; // lighter blue for dark mode

export const Colors = {
  light: {
    text: '#0d47a1', // deep blue for text
    background: '#e3f2fd', // light blue (not used for gradient, but for fallback)
    tint: tintColorLight,
    icon: '#1976d2',
    tabIconDefault: '#1976d2',
    tabIconSelected: '#0d47a1',
  },
  dark: {
    text: '#e3f2fd', // light blue for text
    background: '#0d47a1', // deep blue
    tint: tintColorDark,
    icon: '#90caf9',
    tabIconDefault: '#90caf9',
    tabIconSelected: '#e3f2fd',
  },
};

// Add a flat COLORS export for compatibility with other imports
export const COLORS = {
  primary: '#2563eb', // blue-600
  background: '#f8fafc', // slate-50
  card: '#fff',
  text: '#1e293b', // slate-800
  secondaryText: '#64748b', // slate-400
  accent: '#f59e42', // orange-400
};
