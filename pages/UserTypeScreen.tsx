import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "../context/ThemeContext";
import Golondrina from "../components/Golondrina";
import PropositosHeader from "../components/PropositosHeader";
import TextLink from "../components/TextLink";
import Footer from "../components/Footer";

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

            <View style={{flex: 1, paddingHorizontal:30,
            justifyContent:"space-between"}}>

                <View style={{alignItems: "center", paddingTop: 20, paddingBottom:40}}>
                    <Golondrina />
                    <Text style={[styles.questionText, { color: theme.colors.text.secondary }]}>
                        antes de empezar, ¿qué soy?
                    </Text>
                </View>

                <View style={{flex: 1, justifyContent:"center", paddingBottom:80}}>
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


                {/* Back Link */}
                <View style={styles.backSection}>
                    <TouchableOpacity onPress={handleBackToLogin}>
                        <Text style={[styles.backLink, { color: theme.colors.primary.DEFAULT }]}>
                            Volver al Inicio
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footerSection}>
                <View style={styles.infoSection}>
                    <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>
                        Haz clic{" "}
                        <Text style={[styles.infoLink, { color: theme.colors.primary.DEFAULT }]}>
                            aquí
                        </Text>
                        {" "}para saber más de
                    </Text>
                    <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>
                        Propósitos Colombia
                    </Text>
                </View>
                <Footer />
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
        paddingTop: 20,
    },
    questionText: {
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
        textAlign: "center",
        marginTop: 20,
    },
    buttonsSection: {
        position: "relative",
        marginBottom: 20,
    },
    button: {
        height: 50,
        borderRadius: 8,
        marginVertical:10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
        fontFamily: "Montserrat_400Regular",
    },
    backSection: {
        alignItems: "center",
        marginTop: 30,
    },
    backLink: {
        fontSize: 16,
        textDecorationLine: "underline",
        fontFamily: "Montserrat_400Regular",
    },
    footerSection: {
        alignItems: "center",
        paddingBottom: 20,
    },
    infoSection: {
        alignItems: "center",
        marginBottom: 20,
    },
    infoText: {
        fontSize: 14,
        textAlign: "center",
        fontFamily: "Montserrat_400Regular",
    },
    infoLink: {
        textDecorationLine: "underline",
    },
});