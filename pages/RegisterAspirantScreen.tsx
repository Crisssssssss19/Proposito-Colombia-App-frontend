import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import Golondrina from "../components/Golondrina";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";


type RootStackParamList = {
    PhoneVerificationScreen: undefined;
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RegisterAspirantScreen() {
    const { theme } = useTheme();

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        validateField(field, value);
    };

    const validateField = (field: string, value: string) => {
        let error = "";
        switch (field) {
            case "nombre":
            case "apellido":
                if (!value.trim()) error = "Este campo es obligatorio";
                else if (/\d/.test(value))
                    error = "No se permiten números en este campo";
                break;
            case "cedula":
                if (!/^\d+$/.test(value)) error = "Solo números válidos";
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

    const navigation = useNavigation<NavigationProp>();

    const handleRegister = () => {
        console.log("Registrar aspirante:", formData);
        navigation.navigate('PhoneVerificationScreen')

    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.background.primary },
            ]}
        >
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Logo Section */}
                    <View style={styles.logoSection}>
                        <View style={{ alignItems: "center" }}>
                            <Golondrina containerStyle={{ padding: 1 }} />
                        </View>
                        <View style={styles.titleContainer}>
                            <Text
                                style={[
                                    styles.title,
                                    { backgroundColor: theme.colors.primary.DEFAULT },
                                ]}
                            >
                                Registro de Aspirante
                            </Text>
                        </View>
                    </View>

                    {/* Form Section */}
                    <View style={styles.formSection}>
                        {/* Nombre */}
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    borderColor:
                                        focusedField === "nombre"
                                            ? theme.colors.secondary.DEFAULT
                                            : errors.nombre
                                                ? "#B91C1C"
                                                : theme.colors.border.DEFAULT,
                                    backgroundColor: theme.colors.background.secondary,
                                    color: theme.colors.text.primary,
                                },
                            ]}
                            placeholder="Nombre"
                            placeholderTextColor={theme.colors.text.secondary}
                            value={formData.nombre}
                            onFocus={() => setFocusedField("nombre")}
                            onBlur={() => setFocusedField(null)}
                            onChangeText={(value) => updateField("nombre", value)}
                        />
                        {errors.nombre && (
                            <Text style={styles.errorMessage}>{errors.nombre}</Text>
                        )}

                        {/* Apellido */}
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    borderColor:
                                        focusedField === "apellido"
                                            ? theme.colors.secondary.DEFAULT
                                            : errors.apellido
                                                ? "#B91C1C"
                                                : theme.colors.border.DEFAULT,
                                    backgroundColor: theme.colors.background.secondary,
                                    color: theme.colors.text.primary,
                                },
                            ]}
                            placeholder="Apellido"
                            placeholderTextColor={theme.colors.text.secondary}
                            value={formData.apellido}
                            onFocus={() => setFocusedField("apellido")}
                            onBlur={() => setFocusedField(null)}
                            onChangeText={(value) => updateField("apellido", value)}
                        />
                        {errors.apellido && (
                            <Text style={styles.errorMessage}>{errors.apellido}</Text>
                        )}

                        {/* Cédula */}
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    borderColor:
                                        focusedField === "cedula"
                                            ? theme.colors.secondary.DEFAULT
                                            : errors.cedula
                                                ? "#B91C1C"
                                                : theme.colors.border.DEFAULT,
                                    backgroundColor: theme.colors.background.secondary,
                                    color: theme.colors.text.primary,
                                },
                            ]}
                            placeholder="Cédula"
                            placeholderTextColor={theme.colors.text.secondary}
                            value={formData.cedula}
                            onFocus={() => setFocusedField("cedula")}
                            onBlur={() => setFocusedField(null)}
                            onChangeText={(value) => {
                                // Solo números y máximo 10
                                const numericValue = value.replace(/[^0-9]/g, "");
                                if (numericValue.length <= 10) {
                                    updateField("cedula", numericValue);
                                }
                            }}
                            keyboardType="numeric"
                            maxLength={10} // Est   o asegura que el teclado no deje meter más de 10
                        />
                        {errors.cedula && (
                            <Text style={styles.errorMessage}>{errors.cedula}</Text>
                        )}

                        {/* Email */}
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="mail-outline"
                                size={20}
                                color={theme.colors.text.secondary}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={[
                                    styles.inputWithIcon,
                                    {
                                        borderColor:
                                            focusedField === "email"
                                                ? theme.colors.secondary.DEFAULT
                                                : errors.email
                                                    ? "#B91C1C"
                                                    : theme.colors.border.DEFAULT,
                                        backgroundColor: theme.colors.background.secondary,
                                        color: theme.colors.text.primary,
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
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                color={theme.colors.text.secondary}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={[
                                    styles.inputWithIcon,
                                    {
                                        borderColor:
                                            focusedField === "password"
                                                ? theme.colors.secondary.DEFAULT
                                                : errors.password
                                                    ? "#B91C1C"
                                                    : theme.colors.border.DEFAULT,
                                        backgroundColor: theme.colors.background.secondary,
                                        color: theme.colors.text.primary,
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
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                color={theme.colors.text.secondary}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={[
                                    styles.inputWithIcon,
                                    {
                                        borderColor:
                                            focusedField === "confirmPassword"
                                                ? theme.colors.secondary.DEFAULT
                                                : errors.confirmPassword
                                                    ? "#B91C1C"
                                                    : theme.colors.border.DEFAULT,
                                        backgroundColor: theme.colors.background.secondary,
                                        color: theme.colors.text.primary,
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
                                        showConfirmPassword ? "eye-outline" : "eye-off-outline"
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

                        {/* Terms */}
                        <Text
                            style={[styles.termsText, { color: theme.colors.text.secondary }]}
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
                                    backgroundColor: isFormValid()
                                        ? theme.colors.primary.DEFAULT
                                        : "#9CA3AF",
                                },
                            ]}
                            onPress={handleRegister}
                            activeOpacity={0.8}
                            disabled={!isFormValid()}
                        >
                            <Text style={styles.registerButtonText}>
                                Registrarme como Aspirante
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollView: { flex: 1 },
    content: { paddingHorizontal: 30 },
    logoSection: { alignItems: "center", paddingBottom: 30 },
    titleContainer: { alignItems: "center" },
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
        borderWidth: 2,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 10,
        fontFamily: "Montserrat_400Regular",
    },
    inputContainer: { position: "relative", marginBottom: 10 },
    inputIcon: { position: "absolute", left: 15, top: 15, zIndex: 1 },
    inputWithIcon: {
        height: 50,
        paddingLeft: 45,
        paddingRight: 45,
        borderWidth: 2,
        borderRadius: 8,
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
    },
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
    errorMessage: {
        color: "#B91C1C",
        fontSize: 12,
        marginBottom: 5,
        fontFamily: "Montserrat_400Regular",
    },
});
