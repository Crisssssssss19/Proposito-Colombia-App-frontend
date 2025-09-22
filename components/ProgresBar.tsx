import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {useTheme} from "../context/ThemeContext";

type RootStackParamList = {
    AccessScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "AccessScreen">;

type ProgressBarProps = {
    value?: number;
};

export default function ProgresBar({ value }: ProgressBarProps) {
    const [progress] = useState(new Animated.Value(0));
    const navigation = useNavigation<NavigationProp>();
    const hasRedirected = useRef(false); // ✅ flag para evitar bucle
    const  theme = useTheme()

    useEffect(() => {
        if (typeof value === "number") {
            Animated.timing(progress, {
                toValue: value,
                duration: 5000, // duración de la animación
                useNativeDriver: false,
            }).start(({ finished }) => {
                // ⚡ redirigir cuando termine la animación
                if (finished && !hasRedirected.current) {
                    hasRedirected.current = true;
                    navigation.replace("AccessScreen");
                }
            });
        } else {
            // Si no hay value, podemos animar hasta 100% antes de redirigir
            Animated.timing(progress, {
                toValue: 1,
                duration: 4000,
                useNativeDriver: false,
            }).start(({ finished }) => {
                if (finished && !hasRedirected.current) {
                    hasRedirected.current = true;
                    navigation.replace("AccessScreen");
                }
            });
        }
    }, [value]);

    const widthInterpolated = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
    });

    return (
        <View style={[styles.container ,{ backgroundColor: theme.theme.colors.background.primary}]}>
            <View style={styles.row}>
                <View style={styles.progressBar}>
                    <View style={styles.track} />
                    <Animated.View style={[styles.fill, { width: widthInterpolated }]}>
                        <LinearGradient
                            colors={["#80b2ff", "#1E3A8A"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={StyleSheet.absoluteFill}
                        />
                    </Animated.View>
                </View>

                {typeof value === "number" && (
                    <Text style={styles.percentage}>{Math.round(value * 100)}%</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    progressBar: {
        width: 250,
        height: 12,
        borderRadius: 6,
        overflow: "hidden",
        backgroundColor: "#e5e7eb",
    },
    track: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#e5e7eb",
    },
    fill: {
        height: "100%",
    },
    percentage: {
        marginLeft: 10,
        fontSize: 14,
        fontWeight: "600",
        color: "#1E3A8A",
    },
});

