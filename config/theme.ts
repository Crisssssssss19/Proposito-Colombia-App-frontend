// theme.ts
export const lightTheme = {
    colors: {
        background: {
            primary: '#FFFmFFF',   // Blanco Puro
            secondary: '#F8F9FA', // Gris Muy Claro
            card: '#FFFFFF',      // si quieres diferenciar tarjetas usa un gris suave
        },
        text: {
            primary: '#374151', // Gris Carbón
            secondary: '#9CA3AF', // Gris Medio
        },
        primary: {
            DEFAULT: '#1E3A8A', // Azul Zafiro Profundo
        },
        secondary: {
            DEFAULT: '#87CEEB', // Azul Cielo Claro
        },
        accent: {
            yellow: '#F59E0B', // Amarillo Dorado
            coral: '#FF4747',  // Coral Vibrante
        },
        border: {
            DEFAULT: '#E5E7EB', // Gris Claro
        },
        shadow: {
            DEFAULT: 'rgba(0,0,0,0.1)', // sombras grises con opacidad bajam
        },
        gradient: {
            start: 'rgba(30,58,138,0.1)', // Azul Zafiro con opacidad 10-15%
            end: 'rgba(135,206,235,0.15)', // Azul Cielo con opacidad 15%
        }
    },
};

export const darkTheme: typeof lightTheme = {
    colors: {
        background: {
            primary: '#0F172A',  // Azul Oscuro
            secondary: '#1E293B', // Azul Oscuro Medio
            card: '#334155',     // Azul Gris
        },
        text: {
            primary: '#F1F5F9', // Blanco Suave
            secondary: '#CBD5E1', // Gris Claro
        },
        primary: {
            DEFAULT: '#3B82F6', // Azul Zafiro Brillante
        },
        secondary: {
            DEFAULT: '#60A5FA', // Azul Cielo Vibrante
        },
        accent: {
            yellow: '#FCD34D', // Amarillo Dorado Brillante
            coral: '#FB7185',  // Coral Suave
        },
        border: {
            DEFAULT: '#475569', // Azul Gris Medio
        },
        shadow: {
            DEFAULT: 'rgba(0,0,0,0.35)', // sombras negras con opacidad 30-40%
        },
        gradient: {
            start: 'rgba(59,130,246,0.3)', // Azul Zafiro con opacidad 30%
            end: 'rgba(30,58,138,0.25)',   // Azul Profundo con opacidad 25%
        }
    },
};
