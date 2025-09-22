import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import Golondrina from "../components/Golondrina";
import Footer from "../components/Footer";
import { Ionicons } from "@expo/vector-icons";
import InfoSection from "../components/InfoSection";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
    UserTypeScreen: undefined;
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
    const { theme } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const navigation = useNavigation<NavigationProp>();

    const validateField = (field: string, value: string) => {
        let error = "";
        switch (field) {
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) error = "El correo es obligatorio";
                else if (!emailRegex.test(value)) error = "Correo no válido";
                break;
            case "password":
                const passwordRegex =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
                if (!value.trim()) error = "La contraseña es obligatoria";
                else if (!passwordRegex.test(value))
                error =
                    "Luego se define el error";
                break;
        }
        setErrors((prev) => ({ ...prev, [field]: error }));
    };

    const isFormValid = () => {
        return (
            email.trim() !== "" &&
            password.trim() !== "" &&
            Object.values(errors).every((err) => err === "")
        );
    };

    const handleLogin = () => {
        validateField("email", email);
        validateField("password", password);

        if (isFormValid()) {
            console.log("Login pressed", { email, password });
            // lógica de login real aquí
        }
    };

    const handleRegister = () => {
        navigation.navigate("UserTypeScreen");
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.background.primary },
            ]}
        >
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 30,
                    justifyContent: "space-between",
                }}
            >
                {/* Logo */}
                <View
                    style={{
                        alignItems: "center",
                        paddingTop: 20,
                        paddingBottom: 40,
                    }}
                >
                    <Golondrina />
                </View>

                {/* Form */}
                <View style={styles.formSection}>
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
                                styles.input,
                                {
                                    color: theme.colors.text.primary,
                                    borderColor:
                                        focusedField === "email"
                                            ? theme.colors.secondary.DEFAULT
                                            : errors.email
                                                ? "#B91C1C"
                                                : theme.colors.border.DEFAULT,
                                    backgroundColor:
                                    theme.colors.background.secondary,
                                },
                            ]}
                            placeholder="Correo electrónico"
                            placeholderTextColor={theme.colors.text.secondary}
                            value={email}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => {
                                setFocusedField(null);
                                validateField("email", email);
                            }}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                        {errors.email && (
                            <Text style={styles.errorMessage}>
                                {errors.email}
                            </Text>
                        )}
                    </View>

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
                                styles.input,
                                {
                                    color: theme.colors.text.primary,
                                    borderColor:
                                        focusedField === "password"
                                            ? theme.colors.secondary.DEFAULT
                                            : errors.password
                                                ? "#B91C1C"
                                                : theme.colors.border.DEFAULT,
                                    backgroundColor: theme.colors.background.secondary,
                                },
                            ]}
                            placeholder="Contraseña"
                            placeholderTextColor={theme.colors.text.secondary}
                            value={password}
                            onFocus={() => setFocusedField("password")}
                            onBlur={() => setFocusedField(null)}
                            onChangeText={(value) => {
                                setPassword(value);
                                validateField("password", value); // ✅ validación en tiempo real
                            }}
                            secureTextEntry={!showPassword}
                            autoComplete="password"
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons
                                name={
                                    showPassword
                                        ? "eye-outline"
                                        : "eye-off-outline"
                                }
                                size={20}
                                color={theme.colors.text.secondary}
                            />
                        </TouchableOpacity>
                        {errors.password && (
                            <Text style={styles.errorMessage}>
                                {errors.password}
                            </Text>
                        )}
                    </View>

                    {/* Botón de Login */}
                    <TouchableOpacity
                        style={[
                            styles.loginButton,
                            {
                                backgroundColor: isFormValid()
                                    ? theme.colors.primary.DEFAULT
                                    : "#9CA3AF",
                            },
                        ]}
                        onPress={handleLogin}
                        activeOpacity={0.8}
                        disabled={!isFormValid()}
                    >
                        <Text style={styles.loginButtonText}>
                            Iniciar sesión
                        </Text>
                    </TouchableOpacity>

                    {/* Register Link */}
                    <View style={styles.registerSection}>
                        <Text
                            style={[
                                styles.registerText,
                                { color: theme.colors.text.secondary },
                            ]}
                        >
                            ¿Aún no estás registrado?
                        </Text>
                        <Pressable onPress={handleRegister}>
                            <Text style={styles.registerLink}>
                                Clic aquí para registrarte, es gratis
                            </Text>
                        </Pressable>
                    </View>

                    {/* Info */}
                    <View style={styles.infoSection}>
                        <InfoSection />
                    </View>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footerSection}>
                <Footer />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    formSection: {
        flex: 1,
        justifyContent: "center",
        paddingBottom: 80,
    },
    inputContainer: { position: "relative", marginBottom: 20 },
    inputIcon: { position: "absolute", left: 15, top: 15, zIndex: 1 },
    input: {
        height: 50,
        paddingLeft: 45,
        paddingRight: 45,
        borderWidth: 2,
        borderRadius: 8,
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
    },
    eyeIcon: { position: "absolute", right: 15, top: 15 },
    errorMessage: {
        color: "#B91C1C",
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
        fontFamily: "Montserrat_400Regular",
    },
    loginButton: {
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 30,
    },
    loginButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    registerSection: { alignItems: "center", marginBottom: 30 },
    registerText: {
        fontSize: 14,
        fontFamily: "Montserrat_400Regular",
        marginBottom: 5,
    },
    registerLink: {
        fontSize: 14,
        color: "#3B82F6",
        textDecorationLine: "underline",
        fontFamily: "Montserrat_400Regular",
    },
    infoSection: { alignItems: "center" },
    footerSection: { alignItems: "center", paddingBottom: 20 },
});
