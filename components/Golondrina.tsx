import React from "react";
import {
    View,
    Text,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
    ImageStyle,
    Image,
} from "react-native";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { useTheme } from "../context/ThemeContext";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

type GolondrinaProps = {
    title?: string;
    containerStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
    textStyle?: StyleProp<TextStyle>;
};

export default function Golondrina({
                                       title,
                                       containerStyle,
                                       imageStyle,
                                       textStyle,
                                   }: GolondrinaProps) {
    const { theme } = useTheme();

    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
    });

    if (!fontsLoaded) return null;

    return (
        <View style={[styles.imageContainer, containerStyle]}>
            {/* Aquí enmascaramos la imagen para aplicar gradiente */}
            <MaskedView
                style={{ width: 220, height: 220, marginBottom: 10 }}
                maskElement={
                    <Image
                        source={require("../assets/logo_nombre.png")}
                        style={[styles.logo, imageStyle]}
                        resizeMode="contain"
                    />
                }
            >
                <LinearGradient
                    colors={["#1E90FF", "#4B0082"]} // puedes cambiar colores aquí
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1 }}
                />
            </MaskedView>

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
    },
    title: {
        fontFamily: "Montserrat_400Regular",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 6,
    },
});
