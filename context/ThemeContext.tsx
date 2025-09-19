import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../config/theme';

export type ThemeType = typeof lightTheme;

interface ThemeContextProps {
  theme: ThemeType;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: lightTheme, // valor por defecto
  isDark: false,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ThemeContext.Provider
      value={{
        theme: isDark ? darkTheme : lightTheme,
        isDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
