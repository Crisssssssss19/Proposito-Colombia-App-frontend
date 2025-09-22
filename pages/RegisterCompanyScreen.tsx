import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import PropositosHeader from "../components/PropositosHeader";
import Footer from "../components/Footer";

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
        telefono: "",
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
            case "telefono":
                if (!/^\d+$/.test(value)) error = "Solo números válidos";
                else if (value.length < 7) error = "Debe tener mínimo 7 dígitos";
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
        <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
            <PropositosHeader />

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Logo Section */}
                    <View style={styles.logoSection}>
                        <View style={styles.logoContainer}>
                            <Text style={[styles.logoText, { color: theme.colors.text.primary }]}>
                                Swallow
                            </Text>
                        </View>

                        <View style={styles.titleContainer}>
                            <Text style={[styles.title, { backgroundColor: theme.colors.accent.yellow }]}>
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
                                            ? theme.colors.secondary.DEFAULT
                                            : errors.nombreEmpresa
                                                ? "#B91C1C"
                                                : theme.colors.primary.DEFAULT,
                                    backgroundColor: theme.colors.background.secondary,
                                    color: theme.colors.text.primary,
                                },
                            ]}
                            placeholder="Nombre de la empresa"
                            placeholderTextColor={theme.colors.text.secondary}
                            value={formData.nombreEmpresa}
                            onFocus={() => setFocusedField("nombreEmpresa")}
                            onBlur={() => setFocusedField(null)}
                            onChangeText={(value) => updateField("nombreEmpresa", value)}
                        />
                        {errors.nombreEmpresa && <Text style={styles.errorMessage}>{errors.nombreEmpresa}</Text>}

                        {/* NIT */}
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    borderColor:
                                        focusedField === "nitEmpresa"
                                            ? theme.colors.secondary.DEFAULT
                                            : errors.nitEmpresa
                                                ? "#B91C1C"
                                                : theme.colors.accent.yellow,
                                    backgroundColor: theme.colors.background.secondary,
                                    color: theme.colors.text.primary,
                                },
                            ]}
                            placeholder="NIT de la empresa"
                            placeholderTextColor={theme.colors.text.secondary}
                            value={formData.nitEmpresa}
                            onFocus={() => setFocusedField("nitEmpresa")}
                            onBlur={() => setFocusedField(null)}
                            onChangeText={(value) => updateField("nitEmpresa", value.replace(/[^0-9]/g, ""))}
                            keyboardType="numeric"
                        />
                        {errors.nitEmpresa && <Text style={styles.errorMessage}>{errors.nitEmpresa}</Text>}

                        {/* Email */}
                        <View style={styles.emailContainer}>
                            <Ionicons
                                name="mail-outline"
                                size={20}
                                color={theme.colors.text.secondary}
                                style={styles.emailIcon}
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
                                                    : theme.colors.primary.DEFAULT,
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
                        {errors.email && <Text style={styles.errorMessage}>{errors.email}</Text>}

                        {/* Teléfono */}
                        <View style={styles.phoneContainer}>
                            <View style={[styles.countryCodeContainer, { borderColor: theme.colors.primary.DEFAULT }]}>
                                <Text style={[styles.countryCode, { color: theme.colors.text.primary }]}>
                                    +57
                                </Text>
                            </View>
                            <View style={styles.phoneIconContainer}>
                                <Ionicons name="call-outline" size={16} color={theme.colors.text.secondary} />
                            </View>
                            <TextInput
                                style={[
                                    styles.phoneInput,
                                    {
                                        borderColor:
                                            focusedField === "telefono"
                                                ? theme.colors.secondary.DEFAULT
                                                : errors.telefono
                                                    ? "#B91C1C"
                                                    : theme.colors.primary.DEFAULT,
                                        backgroundColor: theme.colors.background.secondary,
                                        color: theme.colors.text.primary,
                                    },
                                ]}
                                placeholder="Número de teléfono"
                                placeholderTextColor={theme.colors.text.secondary}
                                value={formData.telefono}
                                onFocus={() => setFocusedField("telefono")}
                                onBlur={() => setFocusedField(null)}
                                onChangeText={(value) => updateField("telefono", value.replace(/[^0-9]/g, ""))}
                                keyboardType="phone-pad"
                            />
                        </View>
                        {errors.telefono && <Text style={styles.errorMessage}>{errors.telefono}</Text>}

                        {/* Password */}
                        <View style={styles.passwordContainer}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                color={theme.colors.text.secondary}
                                style={styles.passwordIcon}
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
                                                    : theme.colors.primary.DEFAULT,
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
                            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color={theme.colors.text.secondary}
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.password && <Text style={styles.errorMessage}>{errors.password}</Text>}

                        {/* Confirm Password */}
                        <View style={styles.passwordContainer}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                color={theme.colors.text.secondary}
                                style={styles.passwordIcon}
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
                                                    : theme.colors.primary.DEFAULT,
                                        backgroundColor: theme.colors.background.secondary,
                                        color: theme.colors.text.primary,
                                    },
                                ]}
                                placeholder="Confirmar contraseña"
                                placeholderTextColor={theme.colors.text.secondary}
                                value={formData.confirmPassword}
                                onFocus={() => setFocusedField("confirmPassword")}
                                onBlur={() => setFocusedField(null)}
                                onChangeText={(value) => updateField("confirmPassword", value)}
                                secureTextEntry={!showConfirmPassword}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <Ionicons
                                    name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color={theme.colors.text.secondary}
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.confirmPassword && <Text style={styles.errorMessage}>{errors.confirmPassword}</Text>}

                        {/* Terms */}
                        <Text style={[styles.termsText, { color: theme.colors.text.secondary }]}>
                            Al registrarte, aceptas nuestros{" "}
                            <Text style={[styles.termsLink, { color: theme.colors.primary.DEFAULT }]}>
                                Términos y Condiciones
                            </Text>{" "}
                            y{" "}
                            <Text style={[styles.termsLink, { color: theme.colors.primary.DEFAULT }]}>
                                Política de Privacidad
                            </Text>
                        </Text>

                        {/* Register Button */}
                        <TouchableOpacity
                            style={[
                                styles.registerButton,
                                { backgroundColor: isFormValid() ? theme.colors.text.secondary : "#9CA3AF" },
                            ]}
                            onPress={handleRegister}
                            activeOpacity={0.8}
                            disabled={!isFormValid()}
                        >
                            <Text style={styles.registerButtonText}>Registrarme como Empresa</Text>
                        </TouchableOpacity>

                        {/* Back Link */}
                        <TouchableOpacity onPress={handleGoBack} style={styles.backLinkContainer}>
                            <Text style={[styles.backLink, { color: theme.colors.primary.DEFAULT }]}>← Volver</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footerSection}>
                <Footer />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollView: { flex: 1 },
    content: { paddingHorizontal: 30 },
    logoSection: { alignItems: "center", paddingTop: 20, paddingBottom: 30 },
    logoContainer: { alignItems: "center", marginBottom: 20 },
    logoText: { fontSize: 32, fontWeight: "bold", fontFamily: "Montserrat_400Regular" },
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
    inputWithIcon: {
        height: 50,
        paddingLeft: 45,
        paddingRight: 45,
        borderWidth: 2,
        borderRadius: 8,
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
    },
    emailContainer: { position: "relative", marginBottom: 10 },
    emailIcon: { position: "absolute", left: 15, top: 15, zIndex: 1, fontSize: 16 },
    phoneContainer: { flexDirection: "row", marginBottom: 10, gap: 10 },
    countryCodeContainer: {
        width: 80,
        height: 50,
        borderWidth: 2,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    countryCode: { fontSize: 16, fontFamily: "Montserrat_400Regular" },
    phoneIconContainer: { position: "absolute", left: 95, top: 15, zIndex: 1 },
    phoneInput: {
        flex: 1,
        height: 50,
        paddingLeft: 35,
        paddingRight: 15,
        borderWidth: 2,
        borderRadius: 8,
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
    },
    passwordContainer: { position: "relative", marginBottom: 10 },
    passwordIcon: { position: "absolute", left: 15, top: 15, zIndex: 1, fontSize: 16 },
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
        marginBottom: 20,
    },
    registerButtonText: { color: "white", fontSize: 16, fontWeight: "600", fontFamily: "Montserrat_400Regular" },
    backLinkContainer: { alignItems: "center", marginBottom: 20 },
    backLink: { fontSize: 16, textDecorationLine: "underline", fontFamily: "Montserrat_400Regular" },
    footerSection: { alignItems: "center", paddingBottom: 20 },
    errorMessage: {
        color: "#B91C1C",
        fontSize: 12,
        marginBottom: 8,
        marginLeft: 4,
        fontFamily: "Montserrat_400Regular",
    },
});
