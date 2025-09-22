import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import PropositosHeader from "../components/PropositosHeader";
import Footer from "../components/Footer";
import BiographyScreen from "./BiographyScreen";
import Golondrina from "../components/Golondrina";

// Datos de ejemplo
const CAREERS = [
    "Ingeniería de Sistemas",
    "Administración de Empresas",
    "Medicina",
    "Derecho",
    "Psicología",
    "Marketing",
    "Contaduría Pública",
    "Arquitectura",
    "Diseño Gráfico",
    "Comunicación Social"
];

const UNIVERSITIES = [
    "Universidad Nacional de Colombia",
    "Universidad Javeriana",
    "Universidad de los Andes",
    "Universidad del Rosario",
    "Universidad Externado de Colombia",
    "Universidad La Salle",
    "Universidad Santo Tomás",
    "Universidad Minuto de Dios"
];

const CITIES = [
    "Bogotá, Colombia",
    "Medellín, Colombia",
    "Cali, Colombia",
    "Barranquilla, Colombia",
    "Cartagena, Colombia",
    "Bucaramanga, Colombia",
    "Pereira, Colombia",
    "Manizales, Colombia"
];

type RootStackParamList = {
    BiographyScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function EducationScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    const [selectedCareer, setSelectedCareer] = useState("");
    const [selectedUniversity, setSelectedUniversity] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [specializations, setSpecializations] = useState<string[]>([]);
    const [newSpecialization, setNewSpecialization] = useState("");

    const [showCareerModal, setShowCareerModal] = useState(false);
    const [showUniversityModal, setShowUniversityModal] = useState(false);
    const [showCityModal, setCityModal] = useState(false);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleContinue = () => {
        navigation.navigate("BiographyScreen");
    };

    const addSpecialization = () => {
        if (newSpecialization.trim() && !specializations.includes(newSpecialization.trim())) {
            setSpecializations([...specializations, newSpecialization.trim()]);
            setNewSpecialization("");
        }
    };

    const removeSpecialization = (index: number) => {
        setSpecializations(specializations.filter((_, i) => i !== index));
    };

    const renderModal = (
        visible: boolean,
        onClose: () => void,
        title: string,
        data: string[],
        selectedValue: string,
        onSelect: (value: string) => void
    ) => (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, { backgroundColor: theme.colors.background.primary }]}>
                    <View style={styles.modalHeader}>
                        <Text style={[styles.modalTitle, { color: theme.colors.text.primary }]}>
                            {title}
                        </Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color={theme.colors.text.primary} />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={data}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.modalItem,
                                    selectedValue === item && {
                                        backgroundColor: theme.colors.primary.DEFAULT + '20'
                                    }
                                ]}
                                onPress={() => {
                                    onSelect(item);
                                    onClose();
                                }}
                            >
                                <Text style={[styles.modalItemText, { color: theme.colors.text.primary }]}>
                                    {item}
                                </Text>
                                {selectedValue === item && (
                                    <Ionicons name="checkmark" size={20} color={theme.colors.primary.DEFAULT} />
                                )}
                            </TouchableOpacity>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </Modal>
    );

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
                        33%
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
                                width: '33%'
                            }
                        ]}
                    />
                </View>
            </View>

            <View style={styles.content}>
                {/* Logo Section */}
                <View style={styles.logoSection}>
                    <View >
                        <Golondrina />
                    </View>
                    <Text style={[styles.title, { color: theme.colors.primary.DEFAULT }]}>
                        Tu formación y ubicación
                    </Text>
                </View>
                {/* Form Section */}
                <ScrollView
                    style={styles.formSection}
                    contentContainerStyle={{ paddingBottom: 20 }} // margen inferior opcional
                    showsVerticalScrollIndicator={false} // oculta el scroll si quieres
                >
                    {/* Career */}
                    <View style={styles.fieldContainer}>
                        <View style={styles.fieldLabel}>
                            <Ionicons name="school-outline" size={20} color={theme.colors.text.secondary} />
                            <Text style={[styles.labelText, { color: theme.colors.text.primary }]}>
                                Carrera profesional *
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={[
                                styles.dropdown,
                                {
                                    borderColor: theme.colors.primary.DEFAULT,
                                    backgroundColor: theme.colors.background.secondary,
                                }
                            ]}
                            onPress={() => setShowCareerModal(true)}
                        >
                            <Text style={[
                                styles.dropdownText,
                                {
                                    color: selectedCareer
                                        ? theme.colors.text.primary
                                        : theme.colors.text.secondary
                                }
                            ]}>
                                {selectedCareer || "Ingeniería de Sistemas"}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color={theme.colors.primary.DEFAULT} />
                        </TouchableOpacity>
                    </View>

                    {/* University */}
                    <View style={styles.fieldContainer}>
                        <View style={styles.fieldLabel}>
                            <Ionicons name="library-outline" size={20} color={theme.colors.text.secondary} />
                            <Text style={[styles.labelText, { color: theme.colors.text.primary }]}>
                                Universidad (opcional)
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={[
                                styles.dropdown,
                                {
                                    borderColor: theme.colors.primary.DEFAULT,
                                    backgroundColor: theme.colors.background.secondary,
                                }
                            ]}
                            onPress={() => setShowUniversityModal(true)}
                        >
                            <Text style={[
                                styles.dropdownText,
                                {
                                    color: selectedUniversity
                                        ? theme.colors.text.primary
                                        : theme.colors.text.secondary
                                }
                            ]}>
                                {selectedUniversity || "Universidad Nacional de Colombia"}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color={theme.colors.primary.DEFAULT} />
                        </TouchableOpacity>
                    </View>

                    {/* City */}
                    <View style={styles.fieldContainer}>
                        <View style={styles.fieldLabel}>
                            <Ionicons name="location-outline" size={20} color={theme.colors.text.secondary} />
                            <Text style={[styles.labelText, { color: theme.colors.text.primary }]}>
                                Ciudad, País *
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={[
                                styles.dropdown,
                                {
                                    borderColor: theme.colors.primary.DEFAULT,
                                    backgroundColor: theme.colors.background.secondary,
                                }
                            ]}
                            onPress={() => setCityModal(true)}
                        >
                            <Text style={[
                                styles.dropdownText,
                                {
                                    color: selectedCity
                                        ? theme.colors.text.primary
                                        : theme.colors.text.secondary
                                }
                            ]}>
                                {selectedCity || "Bogotá, Colombia"}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color={theme.colors.primary.DEFAULT} />
                        </TouchableOpacity>
                    </View>

                    {/* Specializations */}
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.labelText, { color: theme.colors.text.primary }]}>
                            Especializaciones (opcional)
                        </Text>

                        <View style={styles.specializationInput}>
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        color: theme.colors.text.primary,
                                        borderColor: theme.colors.border.DEFAULT,
                                        backgroundColor: theme.colors.background.secondary,
                                    }
                                ]}
                                placeholder="Desarrollo Web, ML..."
                                placeholderTextColor={theme.colors.text.secondary}
                                value={newSpecialization}
                                onChangeText={setNewSpecialization}
                            />
                            <TouchableOpacity
                                style={[
                                    styles.addButton,
                                    { backgroundColor: theme.colors.primary.DEFAULT }
                                ]}
                                onPress={addSpecialization}
                            >
                                <Ionicons name="add" size={20} color="white" />
                            </TouchableOpacity>
                        </View>

                        {specializations.length > 0 && (
                            <View style={styles.specializationsContainer}>
                                {specializations.map((spec, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.specializationTag,
                                            { backgroundColor: theme.colors.primary.DEFAULT + '20' }
                                        ]}
                                    >
                                        <Text style={[styles.specializationText, { color: theme.colors.primary.DEFAULT }]}>
                                            {spec}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => removeSpecialization(index)}
                                            style={styles.removeButton}
                                        >
                                            <Ionicons name="close" size={14} color={theme.colors.primary.DEFAULT} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                    {/* Continue Button */}
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
                </ScrollView>


            </View>

            {/* Modals */}
            {renderModal(
                showCareerModal,
                () => setShowCareerModal(false),
                "Selecciona tu carrera",
                CAREERS,
                selectedCareer,
                setSelectedCareer
            )}

            {renderModal(
                showUniversityModal,
                () => setShowUniversityModal(false),
                "Selecciona tu universidad",
                UNIVERSITIES,
                selectedUniversity,
                setSelectedUniversity
            )}

            {renderModal(
                showCityModal,
                () => setCityModal(false),
                "Selecciona tu ciudad",
                CITIES,
                selectedCity,
                setSelectedCity
            )}
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
        fontFamily: "Montserrat_400Regular",
    },
    formSection: {
        flex: 1,
        paddingVertical: 20,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    fieldLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    labelText: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: "Montserrat_400Regular",
    },
    dropdown: {
        height: 50,
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dropdownText: {
        fontSize: 16,
        flex: 1,
        fontFamily: "Montserrat_400Regular",
    },
    specializationInput: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
    },
    addButton: {
        width: 50,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    specializationsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    specializationTag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        gap: 6,
    },
    specializationText: {
        fontSize: 14,
        fontFamily: "Montserrat_400Regular",
    },
    removeButton: {
        padding: 2,
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
    modalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    modalItemText: {
        fontSize: 16,
        flex: 1,
        fontFamily: "Montserrat_400Regular",
    },
});