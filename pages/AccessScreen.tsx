import React, { useEffect, useRef } from "react";
import { Pressable, Text, View, StyleSheet, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Golondrina from "../components/Golondrina";
import ButtonCustom from "../components/ButtonCustom";
import { useTheme } from "../context/ThemeContext";
import InfoSection from "../components/InfoSection";

type RootStackParamList = {
    LoginScreen: undefined;
    UserTypeScreen: undefined;
    LoadingScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AccessScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    // Animated values
    const logoTranslateX = useRef(new Animated.Value(-300)).current; // Start from left
    const buttonsTranslateX = useRef(new Animated.Value(-800)).current; // Start from left

    useEffect(() => {
        // First animation: Logo slides in from left to right
        Animated.timing(logoTranslateX, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
        }).start(() => {
            // After logo animation completes, start buttons animation
            Animated.timing(buttonsTranslateX, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }).start();
        });
    }, []);

    const handleLogin = () => {
        navigation.navigate("LoginScreen");
    };

    const handleRegister = () => {
        navigation.navigate("UserTypeScreen");
    };

    const handlerLoading = () => {
        navigation.navigate("LoadingScreen");
    };

    return (
        <View style={[
            styles.container,
            { backgroundColor: theme.colors.background.primary }
        ]}>
            <View style={styles.content}>
                {/* Animated Logo Section */}
                <Animated.View
                    style={[
                        styles.logoSection,
                        { transform: [{ translateX: logoTranslateX }] }
                    ]}
                >
                    <Pressable onPress={handlerLoading} style={styles.logoPress}>
                        <Golondrina />
                        <Text style={[
                            styles.subtitle,
                            { color: theme.colors.text.secondary }
                        ]}>
                            Volando hacia nuevas oportunidades
                        </Text>
                    </Pressable>
                </Animated.View>

                {/* Animated Buttons Section */}
                <Animated.View
                    style={[
                        styles.buttonsSection,
                        { transform: [{ translateX: buttonsTranslateX }] }
                    ]}
                >
                    <ButtonCustom
                        style={styles.button}
                        textStyle={styles.buttonText}
                        onPress={handleLogin}
                    >
                        Iniciar Sesión
                    </ButtonCustom>

                    <ButtonCustom
                        style={styles.button}
                        textStyle={styles.buttonText}
                        onPress={handleRegister}
                    >
                        Crear Cuenta
                    </ButtonCustom>
                    {/* Info Section */}
                    <View style={styles.infoSection}>
                        <InfoSection />
                    </View>
                </Animated.View>


            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
    },
    logoSection: {
        alignItems: "center",
        paddingTop: 60,
        flex: 1,
        justifyContent: "center",
    },
    logoPress: {
        alignItems: "center",
    },
    subtitle: {
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
        textAlign: "center",
        marginTop: 20,
        lineHeight: 24,
    },
    buttonsSection: {
        paddingHorizontal: 0,
        paddingBottom: 40,
    },
    button: {
        marginBottom: 16,
        height: 50,
        borderRadius: 8,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    infoSection: {
        alignItems: "center",
        paddingBottom: 40,
        paddingTop: 20,
    },
});