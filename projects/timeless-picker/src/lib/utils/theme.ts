import {darkTheme, lightTheme, Theme} from "../constants/themes";

export function createTheme(
  themeMode: 'light' | 'dark' = 'light',
  customTheme: Partial<Theme>
): Theme {
  const defaultTheme = themeMode === 'light' ? lightTheme : darkTheme;
  return { ...defaultTheme, ...customTheme };
}
