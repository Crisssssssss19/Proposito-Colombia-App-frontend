import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "../context/ThemeContext";
import Golondrina from "../components/Golondrina";
import PropositosHeader from "../components/PropositosHeader";
import Footer from "../components/Footer";

type RootStackParamList = {
    ProfilePhotoScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function WelcomeScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    const handleContinue = () => {
        navigation.navigate("ProfilePhotoScreen");
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>

            <View style={styles.content}>
                {/* Logo Section */}
                <View style={styles.logoSection}>
                    <Golondrina />
                </View>

                {/* Welcome Message */}
                <View style={styles.messageSection}>
                    <Text style={[styles.welcomeTitle, { color: theme.colors.primary.DEFAULT }]}>
                        ¡Bienvenido a Swallow!
                    </Text>
                    <Text style={[styles.welcomeSubtitle, { color: theme.colors.text.secondary }]}>
                        Volando hacia{"\n"}nuevas oportunidades
                    </Text>
                </View>

                {/* Continue Button */}
                <View style={styles.buttonSection}>
                    <TouchableOpacity
                        style={[
                            styles.continueButton,
                            { backgroundColor: theme.colors.primary.DEFAULT }
                        ]}
                        onPress={handleContinue}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.continueButtonText}>
                            Continuar
                        </Text>
                    </TouchableOpacity>
                </View>
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
        justifyContent: "space-between",
    },
    logoSection: {
        alignItems: "center",
        paddingTop: 60,
    },
    messageSection: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        paddingBottom: 100,
    },
    welcomeTitle: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        fontFamily: "Montserrat_400Regular",
    },
    welcomeSubtitle: {
        fontSize: 18,
        textAlign: "center",
        lineHeight: 26,
        fontFamily: "Montserrat_400Regular",
    },
    buttonSection: {
        paddingBottom: 40,
    },
    continueButton: {
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    continueButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    footerSection: {
        alignItems: "center",
        paddingBottom: 20,
    },
});