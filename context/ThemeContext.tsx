import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import { lightTheme, darkTheme } from '../config/theme';

export type ThemeType = typeof lightTheme;

interface ThemeContextProps {
    theme: ThemeType;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: lightTheme,
    isDark: false,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const colorScheme = useColorScheme();
    const [currentScheme, setCurrentScheme] = useState(colorScheme);

    // 👇 Método alternativo usando Appearance directamente
    useEffect(() => {
        // Detectar el esquema actual al montar
        const scheme = Appearance.getColorScheme();
        setCurrentScheme(scheme);

        console.log('🔍 useColorScheme():', colorScheme);
        console.log('🔍 Appearance.getColorScheme():', scheme);

        // Listener para cambios en el tema
        const subscription = Appearance.addChangeListener(({ colorScheme: newScheme }) => {
            console.log('📱 Theme changed to:', newScheme);
            setCurrentScheme(newScheme);
        });

        return () => subscription?.remove();
    }, [colorScheme]);

    // Usar el esquema detectado por Appearance API como fallback
    const detectedScheme = currentScheme || colorScheme;
    const isDark = detectedScheme === 'dark';

    console.log('🎨 Final detected scheme:', detectedScheme);
    console.log('🌙 Is Dark Mode:', isDark);

    const currentTheme = isDark ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider
            value={{
                theme: currentTheme,
                isDark,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    return context;
};