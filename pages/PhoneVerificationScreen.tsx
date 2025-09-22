import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import PropositosHeader from "../components/PropositosHeader";
import Footer from "../components/Footer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
    WelcomeScreen: undefined;
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Lista de países con códigos
const COUNTRIES = [
    { code: "+1", country: "US", name: "Estados Unidos" },
    { code: "+1", country: "CA", name: "Canadá" },
    { code: "+52", country: "MX", name: "México" },
    { code: "+57", country: "CO", name: "Colombia" },
    { code: "+58", country: "VE", name: "Venezuela" },
    { code: "+51", country: "PE", name: "Perú" },
    { code: "+56", country: "CL", name: "Chile" },
    { code: "+54", country: "AR", name: "Argentina" },
    { code: "+55", country: "BR", name: "Brasil" },
    { code: "+593", country: "EC", name: "Ecuador" },
    { code: "+591", country: "BO", name: "Bolivia" },
    { code: "+598", country: "UY", name: "Uruguay" },
    { code: "+595", country: "PY", name: "Paraguay" },
    { code: "+34", country: "ES", name: "España" },
    { code: "+33", country: "FR", name: "Francia" },
    { code: "+44", country: "GB", name: "Reino Unido" },
    { code: "+49", country: "DE", name: "Alemania" },
    { code: "+39", country: "IT", name: "Italia" },
];

export default function PhoneVerificationScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { theme } = useTheme();
    const [step, setStep] = useState<'input' | 'verify'>('input');
    const [selectedCountry, setSelectedCountry] = useState(COUNTRIES.find(c => c.code === "+57") || COUNTRIES[0]);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
    const [showCountryModal, setShowCountryModal] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const [canResend, setCanResend] = useState(false);

    // Countdown timer
    useEffect(() => {
        if (step === 'verify' && countdown > 0) {
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [step, countdown]);

    const handleSendCode = () => {
        if (phoneNumber.length >= 7) {
            console.log(`Enviando código a ${selectedCountry.code} ${phoneNumber}`);
            setStep('verify');
            setCountdown(30);
            setCanResend(false);
        }
    };

    const handleVerifyCode = () => {
        const code = verificationCode.join("");
        if (code.length === 6) {
            console.log(`Verificando código: ${code}`);
            // Aquí iría la lógica de verificación
            navigation.navigate("WelcomeScreen")
        }
    };

    const handleResendCode = () => {
        if (canResend) {
            console.log("Reenviando código...");
            setCountdown(30);
            setCanResend(false);
            setVerificationCode(["", "", "", "", "", ""]);
        }
    };

    const updateVerificationDigit = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newCode = [...verificationCode];
            newCode[index] = value;
            setVerificationCode(newCode);

            // Auto focus next input
            if (value && index < 5) {
                // Aquí podrías implementar el auto-focus al siguiente campo
            }
        }
    };

    const formatCountdown = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (step === 'input') {
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
                <PropositosHeader />

                <View style={styles.content}>
                    {/* Logo */}
                    <View style={styles.logoSection}>
                        <View style={styles.logoContainer}>
                            <Text style={[styles.logoText, { color: theme.colors.text.primary }]}>
                                Swallow
                            </Text>
                        </View>

                        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
                            Verifica tu número de teléfono
                        </Text>

                        <View style={styles.phoneIconContainer}>
                            <View style={[styles.phoneIconCircle, { backgroundColor: theme.colors.primary.DEFAULT }]}>
                                <Ionicons name="call-outline" size={30} color="white" />
                            </View>
                        </View>
                    </View>

                    {/* Phone Input */}
                    <View style={styles.formSection}>
                        <Text style={[styles.description, { color: theme.colors.text.secondary }]}>
                            Ingresa tu número de teléfono para continuar
                        </Text>

                        <View style={styles.phoneContainer}>
                            {/* Country Selector */}
                            <TouchableOpacity
                                style={[
                                    styles.countrySelector,
                                    {
                                        borderColor: theme.colors.primary.DEFAULT,
                                        backgroundColor: theme.colors.background.secondary,
                                    }
                                ]}
                                onPress={() => setShowCountryModal(true)}
                            >
                                <Text style={[styles.countryCode, { color: theme.colors.text.primary }]}>
                                    {selectedCountry.code}
                                </Text>
                                <Ionicons name="chevron-down" size={16} color={theme.colors.text.secondary} />
                            </TouchableOpacity>

                            {/* Phone Number Input */}
                            <View style={styles.phoneInputContainer}>
                                <Ionicons
                                    name="call-outline"
                                    size={20}
                                    color={theme.colors.text.secondary}
                                    style={styles.phoneInputIcon}
                                />
                                <TextInput
                                    style={[
                                        styles.phoneInput,
                                        {
                                            color: theme.colors.text.primary,
                                            borderColor: theme.colors.primary.DEFAULT,
                                            backgroundColor: theme.colors.background.secondary,
                                        }
                                    ]}
                                    placeholder="Número de teléfono"
                                    placeholderTextColor={theme.colors.text.secondary}
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    keyboardType="phone-pad"
                                    maxLength={15}
                                />
                            </View>
                        </View>

                        {/* Send Button */}
                        <TouchableOpacity
                            style={[
                                styles.sendButton,
                                {
                                    backgroundColor: phoneNumber.length >= 7
                                        ? theme.colors.primary.DEFAULT
                                        : theme.colors.text.secondary,
                                }
                            ]}
                            onPress={handleSendCode}
                            disabled={phoneNumber.length < 7}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.sendButtonText}>
                                Enviar código
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footerSection}>
                    <Footer />
                </View>

                {/* Country Selection Modal */}
                <Modal
                    visible={showCountryModal}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setShowCountryModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContent, { backgroundColor: theme.colors.background.primary }]}>
                            <View style={styles.modalHeader}>
                                <Text style={[styles.modalTitle, { color: theme.colors.text.primary }]}>
                                    Selecciona tu país
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setShowCountryModal(false)}
                                    style={styles.closeButton}
                                >
                                    <Ionicons name="close" size={24} color={theme.colors.text.primary} />
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                data={COUNTRIES}
                                keyExtractor={(item, index) => `${item.code}-${item.country}-${index}`}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.countryItem,
                                            selectedCountry.code === item.code && selectedCountry.country === item.country && {
                                                backgroundColor: theme.colors.primary.DEFAULT + '20'
                                            }
                                        ]}
                                        onPress={() => {
                                            setSelectedCountry(item);
                                            setShowCountryModal(false);
                                        }}
                                    >
                                        <Text style={[styles.countryName, { color: theme.colors.text.primary }]}>
                                            {item.name}
                                        </Text>
                                        <Text style={[styles.countryCodeText, { color: theme.colors.text.secondary }]}>
                                            {item.code}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    // Verification Step
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
            <PropositosHeader />

            <View style={styles.content}>
                {/* Logo */}
                <View style={styles.logoSection}>
                    <View style={styles.logoContainer}>
                        <Text style={[styles.logoText, { color: theme.colors.text.primary }]}>
                            Swallow
                        </Text>
                    </View>

                    <Text style={[styles.title, { color: theme.colors.text.primary }]}>
                        Verifica tu número de teléfono
                    </Text>

                    <View style={styles.phoneIconContainer}>
                        <View style={[styles.phoneIconCircle, { backgroundColor: theme.colors.primary.DEFAULT }]}>
                            <Ionicons name="call-outline" size={30} color="white" />
                        </View>
                    </View>
                </View>

                {/* Verification Form */}
                <View style={styles.formSection}>
                    <Text style={[styles.description, { color: theme.colors.text.secondary }]}>
                        Enviamos un código de 6 dígitos a:
                    </Text>
                    <Text style={[styles.phoneDisplay, { color: theme.colors.primary.DEFAULT }]}>
                        {selectedCountry.code} {phoneNumber}
                    </Text>
                    <Text style={[styles.instruction, { color: theme.colors.text.secondary }]}>
                        Ingresa el código para continuar
                    </Text>

                    {/* Code Input */}
                    <View style={styles.codeContainer}>
                        {verificationCode.map((digit, index) => (
                            <TextInput
                                key={index}
                                style={[
                                    styles.codeInput,
                                    {
                                        borderColor: digit
                                            ? theme.colors.primary.DEFAULT
                                            : theme.colors.border.DEFAULT,
                                        backgroundColor: theme.colors.background.secondary,
                                        color: theme.colors.text.primary,
                                    }
                                ]}
                                value={digit}
                                onChangeText={(value) => updateVerificationDigit(index, value)}
                                keyboardType="numeric"
                                maxLength={1}
                                textAlign="center"
                            />
                        ))}
                    </View>

                    {/* Verify Button */}
                    <TouchableOpacity
                        style={[
                            styles.verifyButton,
                            {
                                backgroundColor: verificationCode.every(d => d !== '')
                                    ? theme.colors.primary.DEFAULT
                                    : theme.colors.text.secondary,
                            }
                        ]}
                        onPress={handleVerifyCode}
                        disabled={!verificationCode.every(d => d !== '')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.verifyButtonText}>
                            Verificar código
                        </Text>
                    </TouchableOpacity>

                    {/* Resend Code */}
                    <TouchableOpacity
                        onPress={handleResendCode}
                        disabled={!canResend}
                        style={styles.resendContainer}
                    >
                        <Text style={[
                            styles.resendText,
                            {
                                color: canResend
                                    ? theme.colors.primary.DEFAULT
                                    : theme.colors.text.secondary
                            }
                        ]}>
                            {canResend
                                ? "Reenviar código en 00:31"
                                : `Reenviar código en ${formatCountdown(countdown)}`
                            }
                        </Text>
                    </TouchableOpacity>
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
        paddingBottom: 40,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    logoText: {
        fontSize: 32,
        fontWeight: "bold",
        fontFamily: "Montserrat_400Regular",
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 30,
        fontFamily: "Montserrat_400Regular",
    },
    phoneIconContainer: {
        alignItems: "center",
    },
    phoneIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    formSection: {
        flex: 1,
        justifyContent: "center",
        paddingBottom: 100,
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 30,
        fontFamily: "Montserrat_400Regular",
    },
    phoneContainer: {
        flexDirection: "row",
        marginBottom: 30,
        gap: 10,
    },
    countrySelector: {
        width: 100,
        height: 50,
        borderWidth: 2,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
    },
    countryCode: {
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
    },
    phoneInputContainer: {
        flex: 1,
        position: "relative",
    },
    phoneInputIcon: {
        position: "absolute",
        left: 15,
        top: 15,
        zIndex: 1,
    },
    phoneInput: {
        height: 50,
        paddingLeft: 45,
        paddingRight: 15,
        borderWidth: 2,
        borderRadius: 8,
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
    },
    sendButton: {
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    sendButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    phoneDisplay: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 10,
        fontFamily: "Montserrat_400Regular",
    },
    instruction: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 40,
        fontFamily: "Montserrat_400Regular",
    },
    codeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    codeInput: {
        width: 45,
        height: 50,
        borderWidth: 2,
        borderRadius: 8,
        fontSize: 20,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    verifyButton: {
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
    },
    verifyButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    resendContainer: {
        alignItems: "center",
    },
    resendText: {
        fontSize: 14,
        fontFamily: "Montserrat_400Regular",
    },
    footerSection: {
        alignItems: "center",
        paddingBottom: 20,
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 30,
        maxHeight: '70%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: "Montserrat_400Regular",
    },
    closeButton: {
        padding: 5,
    },
    countryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    countryName: {
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
    },
    countryCodeText: {
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
    },
});