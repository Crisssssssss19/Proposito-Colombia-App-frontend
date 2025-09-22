import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from "../context/ThemeContext";
import PropositosHeader from "../components/PropositosHeader";
import Footer from "../components/Footer";
import Golondrina from "../components/Golondrina";

type RootStackParamList = {
    EducationScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfilePhotoScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation<NavigationProp>();
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleContinue = () => {
        navigation.navigate("EducationScreen");
    };

    const handleSkipForNow = () => {
        navigation.navigate("EducationScreen");
    };

    const pickImage = async () => {
        // Pedir permisos
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert(
                "Permisos requeridos",
                "Necesitamos acceso a tu galería para seleccionar una foto."
            );
            return;
        }

        // Abrir selector de imagen
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        // Pedir permisos de cámara
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert(
                "Permisos requeridos",
                "Necesitamos acceso a tu cámara para tomar una foto."
            );
            return;
        }

        // Abrir cámara
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const showImageOptions = () => {
        Alert.alert(
            "Seleccionar foto",
            "¿Cómo quieres añadir tu foto de perfil?",
            [
                { text: "Cámara", onPress: takePhoto },
                { text: "Galería", onPress: pickImage },
                { text: "Cancelar", style: "cancel" }
            ]
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>

            {/* Progress Header */}
            <View style={styles.progressHeader}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.primary.DEFAULT} />
                    <Text style={[styles.backText, { color: theme.colors.primary.DEFAULT }]}>
                        Atrás
                    </Text>
                </TouchableOpacity>

                <View style={styles.progressContainer}>
                    <Text style={[styles.progressText, { color: theme.colors.text.secondary }]}>
                        Progreso del perfil
                    </Text>
                    <Text style={[styles.progressPercentage, { color: theme.colors.primary.DEFAULT }]}>
                        17%
                    </Text>
                </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBarBackground, { backgroundColor: theme.colors.border.DEFAULT }]}>
                    <View
                        style={[
                            styles.progressBarFill,
                            {
                                backgroundColor: theme.colors.primary.DEFAULT,
                                width: '17%'
                            }
                        ]}
                    />
                </View>
            </View>

            <View style={styles.content}>
                {/* Logo Section */}
                <View style={styles.logoSection}>
                    <View style={styles.logoSection}>
                        <Golondrina />
                    </View>

                    <Text style={[styles.title, { color: theme.colors.primary.DEFAULT }]}>
                        Añade tu foto de perfil
                    </Text>

                    <Text style={[styles.description, { color: theme.colors.text.secondary }]}>
                        Una buena foto aumenta tus posibilidades —{"\n"}
                        preferible rostro claro y fondo neutro.
                    </Text>
                </View>

                {/* Photo Section */}
                <View style={styles.photoSection}>
                    <TouchableOpacity
                        style={[
                            styles.photoContainer,
                            { borderColor: theme.colors.border.DEFAULT }
                        ]}
                        onPress={showImageOptions}
                    >
                        {profileImage ? (
                            <>
                                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                                <View style={[styles.checkIcon, { backgroundColor: '#10B981' }]}>
                                    <Ionicons name="checkmark" size={20} color="white" />
                                </View>
                            </>
                        ) : (
                            <>
                                <View style={[styles.placeholderIcon, { borderColor: theme.colors.border.DEFAULT }]}>
                                    <Ionicons name="person-outline" size={40} color={theme.colors.text.secondary} />
                                </View>
                                <View style={[styles.addIcon, { backgroundColor: theme.colors.primary.DEFAULT }]}>
                                    <Ionicons name="add" size={16} color="white" />
                                </View>
                            </>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Buttons Section */}
                <View style={styles.buttonsSection}>
                    {profileImage ? (
                        <TouchableOpacity
                            style={[
                                styles.changePhotoButton,
                                {
                                    backgroundColor: theme.colors.background.secondary,
                                    borderColor: theme.colors.border.DEFAULT
                                }
                            ]}
                            onPress={showImageOptions}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.changePhotoText, { color: theme.colors.text.primary }]}>
                                Cambiar foto
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={[
                                styles.uploadButton,
                                { backgroundColor: theme.colors.primary.DEFAULT }
                            ]}
                            onPress={showImageOptions}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="cloud-upload-outline" size={20} color="white" />
                            <Text style={styles.uploadButtonText}>
                                Subir foto
                            </Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={[
                            styles.continueButton,
                            {
                                backgroundColor: profileImage
                                    ? '#10B981'
                                    : theme.colors.primary.DEFAULT
                            }
                        ]}
                        onPress={handleContinue}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.continueButtonText}>
                            Continuar
                        </Text>
                    </TouchableOpacity>

                    {!profileImage && (
                        <TouchableOpacity onPress={handleSkipForNow} style={styles.skipButton}>
                            <Text style={[styles.skipText, { color: theme.colors.text.secondary }]}>
                                Saltar por ahora
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        marginLeft: 8,
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
    },
    progressContainer: {
        alignItems: 'flex-end',
    },
    progressText: {
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
    },
    progressPercentage: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: "Montserrat_400Regular",
    },
    progressBarContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    progressBarBackground: {
        height: 4,
        borderRadius: 2,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 2,
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: "space-between",
    },
    logoSection: {
        alignItems: "center",
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
        marginBottom: 15,
        fontFamily: "Montserrat_400Regular",
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        lineHeight: 20,
        fontFamily: "Montserrat_400Regular",
    },
    photoSection: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    photoContainer: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 2,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    profileImage: {
        width: 156,
        height: 156,
        borderRadius: 78,
    },
    placeholderIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsSection: {
        paddingBottom: 40,
        gap: 15,
    },
    uploadButton: {
        height: 50,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    uploadButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    changePhotoButton: {
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    changePhotoText: {
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    continueButton: {
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    continueButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    skipButton: {
        alignItems: "center",
        paddingVertical: 10,
    },
    skipText: {
        fontSize: 14,
        fontFamily: "Montserrat_400Regular",
    },
    footerSection: {
        alignItems: "center",
        paddingBottom: 20,
    },
});