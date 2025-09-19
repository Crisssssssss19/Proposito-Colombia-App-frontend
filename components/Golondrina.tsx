import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { useTheme } from "../context/ThemeContext";

type GolondrinaProps = {
    title?: string;
};

export default function Golondrina({ title }: GolondrinaProps) {
    const { theme } = useTheme();

    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
    });

    if (!fontsLoaded) return null;

    return (
        <>
            <View style={[styles.imageContainer, {paddingBottom:20}]}>
                <Image
                    style={styles.logo}
                    source={require("../assets/SwallowLogoConLetras.png")}
                />
            </View>

            <View style={styles.textContainer}>
                <Text
                    style={[
                        styles.title,
                        { color: theme.colors.text.primary },
                    ]}
                >
                    {title}
                </Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 220,
        height: 220,
        paddingBottom: 20,
    },
    textContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontFamily: "Montserrat_400Regular",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 6,
    },
});
