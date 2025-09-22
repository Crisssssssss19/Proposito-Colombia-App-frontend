import React from "react";
import { View, Text, Image, StyleSheet, StyleProp, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { useTheme } from "../context/ThemeContext";

type GolondrinaProps = {
    title?: string;
    containerStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
    textStyle?: StyleProp<TextStyle>;
};

export default function Golondrina({ title, containerStyle, imageStyle, textStyle }: GolondrinaProps) {
    const { theme } = useTheme();

    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
    });

    if (!fontsLoaded) return null;

    return (
        <View style={[styles.imageContainer, containerStyle]}>
            <Image
                style={[styles.logo, imageStyle]}
                source={require("../assets/SwallowLogoConLetras.png")}
                resizeMode="contain"
            />

            {title && (
                <Text
                    style={[
                        styles.title,
                        { color: theme.colors.text.primary },
                        textStyle,
                    ]}
                >
                    {title}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20,
    },
    logo: {
        width: 220,
        height: 220,
        marginBottom: 10,
    },
    title: {
        fontFamily: "Montserrat_400Regular",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 6,
    },
});
