import React from 'react';
import Golondrina from '../components/Golondrina';
import ProgresBar from '../components/ProgresBar';
import { View, StyleSheet, Image } from 'react-native';
import { useTheme } from "../context/ThemeContext";

export default function LoadingScreen() {
    const { theme } = useTheme();
    const frase = 'Volando hacia\nnuevas oportunidades';

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>

            {/* Contenedor central para Golondrina y ProgresBar */}
            <View style={styles.centerContent}>
                <Golondrina title={frase} />
                <ProgresBar />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Image
                    style={styles.footerImage}
                    source={require("../assets/from_md.png")}
                    resizeMode="contain"
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center',     // Centra horizontalmente
    },
    footer: {
        width: '100%',
        alignItems: 'center',     // Centrar imagen horizontalmente
        paddingBottom: 20,        // Separación del borde inferior
    },
    footerImage: {
        width: 210,
        height: 90,
    },
});
