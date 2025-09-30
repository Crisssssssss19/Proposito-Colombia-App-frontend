import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import Golondrina from "../components/Golondrina";

type RootStackParamList = {
    UserTypeScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RegisterCompanyScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    const [formData, setFormData] = useState({
        nombreEmpresa: "",
        nitEmpresa: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // 🔑 Escuchar cuando el teclado se cierra para resetear el estado
    useEffect(() => {
        const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setFocusedField(null);
        });

        return () => {
            keyboardHideListener.remove();
        };
    }, []);

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        validateField(field, value);
    };

    const validateField = (field: string, value: string) => {
        let error = "";
        switch (field) {
            case "nombreEmpresa":
                if (!value.trim()) error = "El nombre es obligatorio";
                break;
            case "nitEmpresa":
                if (!/^\d+$/.test(value)) error = "Solo números válidos";
                else if (value.length < 8) error = "El NIT debe tener al menos 8 dígitos";
                break;
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) error = "Correo no válido";
                break;
            case "password":
                const passwordRegex =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
                if (!passwordRegex.test(value))
                    error =
                        "Debe tener 8+ caracteres, mayúscula, minúscula, número y símbolo";
                break;
            case "confirmPassword":
                if (value !== formData.password)
                    error = "Las contraseñas no coinciden";
                break;
        }
        setErrors((prev) => ({ ...prev, [field]: error }));
    };

    const isFormValid = () => {
        return (
            Object.values(formData).every((val) => val.trim() !== "") &&
            Object.values(errors).every((err) => err === "")
        );
    };

    const handleRegister = () => {
        console.log("Registrar empresa:", formData);
    };

    const handleGoBack = () => {
        navigation.navigate("UserTypeScreen");
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 80}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.content}>
                        {/* Logo Section */}
                        <View style={styles.logoSection}>
                            <Golondrina />
                            <View style={styles.titleContainer}>
                                <Text
                                    style={[
                                        styles.title,
                                        { backgroundColor: theme.colors.accent.yellow },
                                    ]}
                                >
                                    Registro de Empresa
                                </Text>
                            </View>
                        </View>

                        {/* Form Section */}
                        <View style={styles.formSection}>
                            {/* Nombre Empresa */}
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        borderColor:
                                            focusedField === "nombreEmpresa"
                                                ? theme.colors.primary.DEFAULT
                                                : errors.nombreEmpresa
                                                    ? "#B91C1C"
                                                    : theme.colors.primary.DEFAULT,
                                        backgroundColor: theme.colors.background.secondary,
                                        color: theme.colors.text.primary,
                                        borderWidth: focusedField === "nombreEmpresa" ? 2 : 1,
                                    },
                                ]}
                                placeholder="Nombre de la empresa"
                                placeholderTextColor={theme.colors.text.secondary}
                                value={formData.nombreEmpresa}
                                onFocus={() => setFocusedField("nombreEmpresa")}
                                onBlur={() => setFocusedField(null)}
                                onChangeText={(value) => updateField("nombreEmpresa", value)}
                            />
                            {errors.nombreEmpresa && (
                                <Text style={styles.errorMessage}>
                                    {errors.nombreEmpresa}
                                </Text>
                            )}

                            {/* NIT */}
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        borderColor:
                                            focusedField === "nitEmpresa"
                                                ? theme.colors.accent.yellow
                                                : errors.nitEmpresa
                                                    ? "#B91C1C"
                                                    : theme.colors.accent.yellow,
                                        backgroundColor: theme.colors.background.secondary,
                                        color: theme.colors.text.primary,
                                        borderWidth: focusedField === "nitEmpresa" ? 2 : 1,
                                    },
                                ]}
                                placeholder="NIT de la empresa"
                                placeholderTextColor={theme.colors.text.secondary}
                                value={formData.nitEmpresa}
                                onFocus={() => setFocusedField("nitEmpresa")}
                                onBlur={() => setFocusedField(null)}
                                onChangeText={(value) =>
                                    updateField("nitEmpresa", value.replace(/[^0-9]/g, ""))
                                }
                                keyboardType="numeric"
                            />
                            {errors.nitEmpresa && (
                                <Text style={styles.errorMessage}>{errors.nitEmpresa}</Text>
                            )}

                            {/* Email */}
                            <View style={styles.emailContainer}>
                                <Ionicons
                                    name="mail-outline"
                                    size={20}
                                    color={
                                        focusedField === "email"
                                            ? theme.colors.primary.DEFAULT
                                            : theme.colors.text.secondary
                                    }
                                    style={styles.emailIcon}
                                />
                                <TextInput
                                    style={[
                                        styles.inputWithIcon,
                                        {
                                            borderColor:
                                                focusedField === "email"
                                                    ? theme.colors.primary.DEFAULT
                                                    : errors.email
                                                        ? "#B91C1C"
                                                        : theme.colors.primary.DEFAULT,
                                            backgroundColor: theme.colors.background.secondary,
                                            color: theme.colors.text.primary,
                                            borderWidth: focusedField === "email" ? 2 : 1,
                                        },
                                    ]}
                                    placeholder="Correo electrónico"
                                    placeholderTextColor={theme.colors.text.secondary}
                                    value={formData.email}
                                    onFocus={() => setFocusedField("email")}
                                    onBlur={() => setFocusedField(null)}
                                    onChangeText={(value) => updateField("email", value)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                            {errors.email && (
                                <Text style={styles.errorMessage}>{errors.email}</Text>
                            )}

                            {/* Password */}
                            <View style={styles.passwordContainer}>
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={20}
                                    color={
                                        focusedField === "password"
                                            ? theme.colors.primary.DEFAULT
                                            : theme.colors.text.secondary
                                    }
                                    style={styles.passwordIcon}
                                />
                                <TextInput
                                    style={[
                                        styles.inputWithIcon,
                                        {
                                            borderColor:
                                                focusedField === "password"
                                                    ? theme.colors.primary.DEFAULT
                                                    : errors.password
                                                        ? "#B91C1C"
                                                        : theme.colors.primary.DEFAULT,
                                            backgroundColor: theme.colors.background.secondary,
                                            color: theme.colors.text.primary,
                                            borderWidth: focusedField === "password" ? 2 : 1,
                                        },
                                    ]}
                                    placeholder="Contraseña"
                                    placeholderTextColor={theme.colors.text.secondary}
                                    value={formData.password}
                                    onFocus={() => setFocusedField("password")}
                                    onBlur={() => setFocusedField(null)}
                                    onChangeText={(value) => updateField("password", value)}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity
                                    style={styles.eyeIcon}
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    <Ionicons
                                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                                        size={20}
                                        color={theme.colors.text.secondary}
                                    />
                                </TouchableOpacity>
                            </View>
                            {errors.password && (
                                <Text style={styles.errorMessage}>{errors.password}</Text>
                            )}

                            {/* Confirm Password */}
                            <View style={styles.passwordContainer}>
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={20}
                                    color={
                                        focusedField === "confirmPassword"
                                            ? theme.colors.primary.DEFAULT
                                            : theme.colors.text.secondary
                                    }
                                    style={styles.passwordIcon}
                                />
                                <TextInput
                                    style={[
                                        styles.inputWithIcon,
                                        {
                                            borderColor:
                                                focusedField === "confirmPassword"
                                                    ? theme.colors.primary.DEFAULT
                                                    : errors.confirmPassword
                                                        ? "#B91C1C"
                                                        : theme.colors.primary.DEFAULT,
                                            backgroundColor: theme.colors.background.secondary,
                                            color: theme.colors.text.primary,
                                            borderWidth:
                                                focusedField === "confirmPassword" ? 2 : 1,
                                        },
                                    ]}
                                    placeholder="Confirmar contraseña"
                                    placeholderTextColor={theme.colors.text.secondary}
                                    value={formData.confirmPassword}
                                    onFocus={() => setFocusedField("confirmPassword")}
                                    onBlur={() => setFocusedField(null)}
                                    onChangeText={(value) =>
                                        updateField("confirmPassword", value)
                                    }
                                    secureTextEntry={!showConfirmPassword}
                                />
                                <TouchableOpacity
                                    style={styles.eyeIcon}
                                    onPress={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                >
                                    <Ionicons
                                        name={
                                            showConfirmPassword
                                                ? "eye-outline"
                                                : "eye-off-outline"
                                        }
                                        size={20}
                                        color={theme.colors.text.secondary}
                                    />
                                </TouchableOpacity>
                            </View>
                            {errors.confirmPassword && (
                                <Text style={styles.errorMessage}>
                                    {errors.confirmPassword}
                                </Text>
                            )}

                            {/* Back Arrow Button */}
                            <View style={styles.backArrowContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.backArrowButton,
                                        {
                                            backgroundColor: theme.colors.background.secondary,
                                            borderColor: theme.colors.border.DEFAULT,
                                        },
                                    ]}
                                    onPress={handleGoBack}
                                    activeOpacity={0.7}
                                >
                                    <Ionicons
                                        name="arrow-back"
                                        size={24}
                                        color={theme.colors.primary.DEFAULT}
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* Terms */}
                            <Text
                                style={[
                                    styles.termsText,
                                    { color: theme.colors.text.secondary },
                                ]}
                            >
                                Al registrarte, aceptas nuestros{" "}
                                <Text
                                    style={[
                                        styles.termsLink,
                                        { color: theme.colors.primary.DEFAULT },
                                    ]}
                                >
                                    Términos y Condiciones
                                </Text>{" "}
                                y{" "}
                                <Text
                                    style={[
                                        styles.termsLink,
                                        { color: theme.colors.primary.DEFAULT },
                                    ]}
                                >
                                    Política de Privacidad
                                </Text>
                            </Text>

                            {/* Register Button */}
                            <TouchableOpacity
                                style={[
                                    styles.registerButton,
                                    {
                                        backgroundColor: theme.colors.text.secondary,
                                        opacity: isFormValid() ? 1 : 0.6,
                                    },
                                ]}
                                onPress={handleRegister}
                                activeOpacity={0.8}
                                disabled={!isFormValid()}
                            >
                                <Text style={styles.registerButtonText}>
                                    Registrarme como Empresa
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollView: { flex: 1 },
    scrollContent: { flexGrow: 1, paddingBottom: 5 },
    content: { paddingHorizontal: 30 },
    logoSection: { alignItems: "center", paddingBottom: 30 },
    titleContainer: { alignItems: "center", marginTop: 20 },
    title: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        fontFamily: "Montserrat_400Regular",
    },
    formSection: { paddingBottom: 30 },
    input: {
        height: 50,
        paddingHorizontal: 15,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 10,
        fontFamily: "Montserrat_400Regular",
    },
    inputWithIcon: {
        height: 50,
        paddingLeft: 45,
        paddingRight: 45,
        borderRadius: 8,
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
    },
    emailContainer: { position: "relative", marginBottom: 10 },
    emailIcon: { position: "absolute", left: 15, top: 15, zIndex: 1 },
    passwordContainer: { position: "relative", marginBottom: 10 },
    passwordIcon: { position: "absolute", left: 15, top: 15, zIndex: 1 },
    eyeIcon: { position: "absolute", right: 15, top: 15 },
    termsText: {
        fontSize: 12,
        textAlign: "center",
        marginVertical: 20,
        lineHeight: 18,
        fontFamily: "Montserrat_400Regular",
    },
    termsLink: { textDecorationLine: "underline" },
    registerButton: {
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    registerButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    backArrowContainer: { alignItems: "center", margin: 10 },
    backArrowButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    errorMessage: {
        color: "#B91C1C",
        fontSize: 12,
        marginBottom: 8,
        marginLeft: 4,
        fontFamily: "Montserrat_400Regular",
    },
});
