import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import Golondrina from "../components/Golondrina";
import InfoSection from "../components/InfoSection";

type RootStackParamList = {
    RegisterAspirantScreen: undefined;
    RegisterCompanyScreen: undefined;
    AccessScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function UserTypeScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    const handleAspirantPress = () => {
        navigation.navigate("RegisterAspirantScreen");
    };

    const handleCompanyPress = () => {
        navigation.navigate("RegisterCompanyScreen");
    };

    const handleBackToLogin = () => {
        navigation.navigate("AccessScreen");
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
            <View style={styles.content}>
                {/* Logo Section */}
                <View style={styles.logoSection}>
                    <Golondrina />
                    <Text style={[styles.questionText, { color: theme.colors.text.secondary }]}>
                        Antes de empezar ¿quién soy?
                    </Text>
                </View>

                {/* Buttons Section */}
                <View style={styles.buttonsSection}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: theme.colors.primary.DEFAULT }
                        ]}
                        onPress={handleAspirantPress}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Soy Aspirante</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: theme.colors.accent.yellow }
                        ]}
                        onPress={handleCompanyPress}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.buttonText, { color: "white" }]}>Soy Empresa</Text>
                    </TouchableOpacity>
                </View>



            </View>

            {/* Back Arrow Button */}
            <View style={styles.backArrowContainer}>
                <TouchableOpacity
                    style={[
                        styles.backArrowButton,
                        {
                            backgroundColor: theme.colors.background.secondary,
                            borderColor: theme.colors.border.DEFAULT,
                        }
                    ]}
                    onPress={handleBackToLogin}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={theme.colors.primary.DEFAULT}
                    />
                </TouchableOpacity>
            </View>
            {/* Info Section */}
            <View style={styles.infoFooter}>
                <InfoSection />
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
    questionText: {
        fontSize: 18,
        fontFamily: "Montserrat_400Regular",
        textAlign: "center",
        marginTop: 20,
    },
    buttonsSection: {
        paddingHorizontal: 0,
        paddingBottom: 20,
    },
    button: {
        height: 50,
        borderRadius: 8,
        marginBottom: 16,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
        fontFamily: "Montserrat_400Regular",
    },
    backSection: {
        alignItems: "center",
        paddingBottom: 20,
    },
    backLink: {
        fontSize: 16,
        textDecorationLine: "underline",
        fontFamily: "Montserrat_400Regular",
    },
    infoFooter: {
        alignItems: "center",
        paddingBottom: 20,
    },
    backArrowContainer: {
        alignItems: "center",
        margin: 10,
    },
    backArrowButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
});