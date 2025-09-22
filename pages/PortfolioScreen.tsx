import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from "../context/ThemeContext";
import PropositosHeader from "../components/PropositosHeader";
import Footer from "../components/Footer";

type RootStackParamList = {
    HomeScreen: undefined; // O la siguiente pantalla en tu flujo
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function PortfolioScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation<NavigationProp>();
    const [portfolioImages, setPortfolioImages] = useState<string[]>([]);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleContinue = () => {
        // Aquí podrías navegar a la pantalla principal de la app
        console.log("Profile completed!");
        // navigation.navigate("HomeScreen");
    };

    const pickImages = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert(
                "Permisos requeridos",
                "Necesitamos acceso a tu galería para seleccionar imágenes."
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 0.8,
            selectionLimit: 5 - portfolioImages.length, // Máximo 5 imágenes
        });

        if (!result.canceled && result.assets) {
            const newImages = result.assets.map(asset => asset.uri);
            setPortfolioImages([...portfolioImages, ...newImages]);
        }
    };

    const removeImage = (index: number) => {
        setPortfolioImages(portfolioImages.filter((_, i) => i !== index));
    };

    // Datos de ejemplo para mostrar el estado con imágenes
    const exampleImages = [
        "https://picsum.photos/200/300?random=1",
        "https://picsum.photos/200/300?random=2",
        "https://picsum.photos/200/300?random=3",
        "https://picsum.photos/200/300?random=4"
    ];

    const displayImages = portfolioImages.length > 0 ? portfolioImages : exampleImages;
    const hasImages = displayImages.length > 0;

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
            {/* Header */}
            <PropositosHeader />

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
                        83%
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
                                width: '83%'
                            }
                        ]}
                    />
                </View>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Logo Section */}
                    <View style={styles.logoSection}>
                        <View style={styles.logoContainer}>
                            <Text style={[styles.logoText, { color: theme.colors.text.primary }]}>
                                Swallow
                            </Text>
                        </View>

                        <Text style={[styles.title, { color: theme.colors.primary.DEFAULT }]}>
                            Portafolio (opcional)
                        </Text>

                        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
                            Muestra ejemplos de tu trabajo (0/5)
                        </Text>
                    </View>

                    {/* Portfolio Section */}
                    <View style={styles.portfolioSection}>
                        {!hasImages ? (
                            // Empty State
                            <View style={styles.emptyState}>
                                <View style={[styles.emptyIcon, { borderColor: theme.colors.border.DEFAULT }]}>
                                    <Ionicons name="image-outline" size={40} color={theme.colors.text.secondary} />
                                </View>

                                <Text style={[styles.emptyTitle, { color: theme.colors.text.primary }]}>
                                    ¿Listo para mostrar tu trabajo?
                                </Text>
                                <Text style={[styles.emptySubtitle, { color: theme.colors.text.secondary }]}>
                                    Sube hasta 5 imágenes de tus mejores proyectos
                                </Text>

                                <TouchableOpacity
                                    style={[
                                        styles.uploadButton,
                                        { backgroundColor: theme.colors.primary.DEFAULT }
                                    ]}
                                    onPress={pickImages}
                                    activeOpacity={0.8}
                                >
                                    <Ionicons name="cloud-upload-outline" size={20} color="white" />
                                    <Text style={styles.uploadButtonText}>
                                        Subir imagen
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            // Images Grid
                            <View style={styles.imagesGrid}>
                                {displayImages.map((imageUri, index) => (
                                    <View key={index} style={styles.imageContainer}>
                                        <Image
                                            source={{ uri: imageUri }}
                                            style={styles.portfolioImage}
                                            resizeMode="cover"
                                        />
                                        {portfolioImages.length > 0 && (
                                            <TouchableOpacity
                                                style={[styles.removeImageButton, { backgroundColor: theme.colors.accent.coral }]}
                                                onPress={() => removeImage(index)}
                                            >
                                                <Ionicons name="close" size={16} color="white" />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                ))}

                                {/* Add More Button */}
                                {displayImages.length < 5 && (
                                    <TouchableOpacity
                                        style={[
                                            styles.addMoreContainer,
                                            {
                                                borderColor: theme.colors.primary.DEFAULT,
                                                backgroundColor: theme.colors.background.secondary
                                            }
                                        ]}
                                        onPress={pickImages}
                                    >
                                        <Ionicons
                                            name="add"
                                            size={30}
                                            color={theme.colors.primary.DEFAULT}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
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

                {/* Footer */}
                <View style={styles.footerSection}>
                    <Footer />
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
    scrollView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 30,
        paddingBottom: 20,
    },
    logoSection: {
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 30,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 20,
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
        marginBottom: 8,
        fontFamily: "Montserrat_400Regular",
    },
    subtitle: {
        fontSize: 14,
        textAlign: "center",
        fontFamily: "Montserrat_400Regular",
    },
    portfolioSection: {
        flex: 1,
        minHeight: 400,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8,
        fontFamily: "Montserrat_400Regular",
    },
    emptySubtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 30,
        fontFamily: "Montserrat_400Regular",
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8,
    },
    uploadButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: "Montserrat_400Regular",
    },
    imagesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'space-between',
    },
    imageContainer: {
        position: 'relative',
        width: '48%',
        aspectRatio: 0.75, // 3:4 ratio
        borderRadius: 12,
        overflow: 'hidden',
    },
    portfolioImage: {
        width: '100%',
        height: '100%',
    },
    removeImageButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addMoreContainer: {
        width: '48%',
        aspectRatio: 0.75,
        borderRadius: 12,
        borderWidth: 2,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSection: {
        paddingHorizontal: 30,
        paddingTop: 20,
    },
    continueButton: {
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
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