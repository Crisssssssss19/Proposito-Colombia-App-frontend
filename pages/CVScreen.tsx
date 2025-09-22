import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from 'expo-document-picker';
import { useTheme } from "../context/ThemeContext";
import PropositosHeader from "../components/PropositosHeader";
import Footer from "../components/Footer";

const SKILLS = [
    "JavaScript", "Python", "React", "Node.js", "Java", "SQL",
    "Google Analytics", "Project Management", "Liderazgo"
];

type RootStackParamList = {
    PortfolioScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface WorkExperience {
    position: string;
    company: string;
    period: string;
}

interface CVFile {
    name: string;
    size: string;
    uri: string;
}

export default function CVScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    const [cvFile, setCvFile] = useState<CVFile | null>(null);
    const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [showExperienceModal, setShowExperienceModal] = useState(false);
    const [newPosition, setNewPosition] = useState("");
    const [newCompany, setNewCompany] = useState("");
    const [newPeriod, setNewPeriod] = useState("");

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleContinue = () => {
        navigation.navigate("PortfolioScreen");
    };

    const pickCV = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets[0]) {
                const file = result.assets[0];
                const sizeInKB = Math.round(file.size! / 1024);
                setCvFile({
                    name: file.name,
                    size: `${sizeInKB} KB`,
                    uri: file.uri
                });
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo cargar el archivo");
        }
    };

    const removeCV = () => {
        setCvFile(null);
    };

    const addWorkExperience = () => {
        if (newPosition.trim() && newCompany.trim()) {
            const newExperience: WorkExperience = {
                position: newPosition.trim(),
                company: newCompany.trim(),
                period: newPeriod.trim() || "2019 - 2023 (4 años)"
            };
            setWorkExperiences([...workExperiences, newExperience]);
            setNewPosition("");
            setNewCompany("");
            setNewPeriod("");
            setShowExperienceModal(false);
        }
    };

    const removeWorkExperience = (index: number) => {
        setWorkExperiences(workExperiences.filter((_, i) => i !== index));
    };

    const toggleSkill = (skill: string) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
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
                        67%
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
                                width: '67%'
                            }
                        ]}
                    />
                </View>
            </View>

            <View style={styles.content}>
                {/* Logo Section */}
                <View style={styles.logoSection}>
                    <View style={styles.logoContainer}>
                        <Text style={[styles.logoText, { color: theme.colors.text.primary }]}>
                            Swallow
                        </Text>
                    </View>

                    <Text style={[styles.title, { color: theme.colors.primary.DEFAULT }]}>
                        CV y Experiencia laboral
                    </Text>
                </View>

                {/* Form Section */}
                <View style={styles.formSection}>
                    {/* CV Upload */}
                    <View style={styles.fieldContainer}>
                        <View style={styles.fieldLabel}>
                            <Ionicons name="document-text-outline" size={20} color={theme.colors.text.secondary} />
                            <Text style={[styles.labelText, { color: theme.colors.text.primary }]}>
                                Subir CV (opcional)
                            </Text>
                        </View>

                        {cvFile ? (
                            <View style={[
                                styles.uploadedFile,
                                {
                                    backgroundColor: '#10B981' + '20',
                                    borderColor: '#10B981'
                                }
                            ]}>
                                <View style={styles.fileInfo}>
                                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                                    <View style={styles.fileDetails}>
                                        <Text style={[styles.fileName, { color: theme.colors.text.primary }]}>
                                            {cvFile.name}
                                        </Text>
                                        <Text style={[styles.fileSize, { color: theme.colors.text.secondary }]}>
                                            {cvFile.size}
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={removeCV} style={styles.removeFileButton}>
                                    <Ionicons name="close" size={18} color={theme.colors.accent.coral} />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={[
                                    styles.uploadArea,
                                    {
                                        borderColor: theme.colors.primary.DEFAULT,
                                        backgroundColor: theme.colors.background.secondary
                                    }
                                ]}
                                onPress={pickCV}
                            >
                                <Ionicons name="cloud-upload-outline" size={24} color={theme.colors.primary.DEFAULT} />
                                <Text style={[styles.uploadText, { color: theme.colors.primary.DEFAULT }]}>
                                    Subir PDF
                                </Text>
                                <Text style={[styles.uploadSubtext, { color: theme.colors.text.secondary }]}>
                                    Máx 10 MB
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Work Experience */}
                    <View style={styles.fieldContainer}>
                        <View style={styles.experienceHeader}>
                            <Text style={[styles.labelText, { color: theme.colors.text.primary }]}>
                                Experiencia laboral
                            </Text>
                            <TouchableOpacity
                                style={[styles.addButton, { backgroundColor: theme.colors.primary.DEFAULT }]}
                                onPress={() => setShowExperienceModal(true)}
                            >
                                <Ionicons name="add" size={16} color="white" />
                                <Text style={styles.addButtonText}>Agregar</Text>
                            </TouchableOpacity>
                        </View>

                        {workExperiences.length > 0 && (
                            <View style={styles.experiencesContainer}>
                                {workExperiences.map((exp, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.experienceItem,
                                            {
                                                backgroundColor: theme.colors.background.secondary,
                                                borderColor: theme.colors.border.DEFAULT
                                            }
                                        ]}
                                    >
                                        <View style={styles.experienceInfo}>
                                            <Text style={[styles.experiencePosition, { color: theme.colors.text.primary }]}>
                                                {exp.position}
                                            </Text>
                                            <Text style={[styles.experienceCompany, { color: theme.colors.text.secondary }]}>
                                                {exp.company}
                                            </Text>
                                            <Text style={[styles.experiencePeriod, { color: theme.colors.text.secondary }]}>
                                                {exp.period}
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.removeButton}
                                            onPress={() => removeWorkExperience(index)}
                                        >
                                            <Ionicons name="trash-outline" size={16} color={theme.colors.accent.coral} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Skills */}
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.labelText, { color: theme.colors.text.primary }]}>
                            Habilidades clave
                        </Text>
                        <TextInput
                            style={[
                                styles.skillInput,
                                {
                                    color: theme.colors.text.primary,
                                    borderColor: theme.colors.border.DEFAULT,
                                    backgroundColor: theme.colors.background.secondary,
                                }
                            ]}
                            placeholder="Escribe una habilidad..."
                            placeholderTextColor={theme.colors.text.secondary}
                        />
                        <TouchableOpacity
                            style={[styles.addSkillButton, { backgroundColor: theme.colors.primary.DEFAULT }]}
                        >
                            <Ionicons name="add" size={16} color="white" />
                        </TouchableOpacity>

                        {/* Predefined Skills */}
                        <View style={styles.skillsContainer}>
                            {SKILLS.map((skill) => (
                                <TouchableOpacity
                                    key={skill}
                                    style={[
                                        styles.skillChip,
                                        {
                                            backgroundColor: selectedSkills.includes(skill)
                                                ? theme.colors.primary.DEFAULT + '20'
                                                : theme.colors.background.secondary,
                                            borderColor: selectedSkills.includes(skill)
                                                ? theme.colors.primary.DEFAULT
                                                : theme.colors.border.DEFAULT
                                        }
                                    ]}
                                    onPress={() => toggleSkill(skill)}
                                >
                                    <Text style={[
                                        styles.skillText,
                                        {
                                            color: selectedSkills.includes(skill)
                                                ? theme.colors.primary.DEFAULT
                                                : theme.colors.text.primary
                                        }
                                    ]}>
                                        + {skill}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {selectedSkills.length > 0 && (
                            <>
                                <Text style={[styles.selectedLabel, { color: theme.colors.text.primary }]}>
                                    Seleccionadas:
                                </Text>
                                <View style={styles.selectedSkillsContainer}>
                                    {selectedSkills.map((skill) => (
                                        <View
                                            key={skill}
                                            style={[
                                                styles.selectedSkillChip,
                                                { backgroundColor: theme.colors.primary.DEFAULT + '20' }
                                            ]}
                                        >
                                            <Text style={[styles.selectedSkillText, { color: theme.colors.primary.DEFAULT }]}>
                                                {skill}
                                            </Text>
                                            <TouchableOpacity onPress={() => toggleSkill(skill)}>
                                                <Ionicons name="close" size={14} color={theme.colors.primary.DEFAULT} />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            </>
                        )}
                    </View>
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
            </View>

            {/* Footer */}
            <View style={styles.footerSection}>
                <Footer />
            </View>

            {/* Add Experience Modal */}
            <Modal
                visible={showExperienceModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowExperienceModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: theme.colors.background.primary }]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: theme.colors.text.primary }]}>
                                Agregar experiencia
                            </Text>
                            <TouchableOpacity
                                onPress={() => setShowExperienceModal(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={24} color={theme.colors.text.primary} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalBody}>
                            <TextInput
                                style={[
                                    styles.modalInput,
                                    {
                                        color: theme.colors.text.primary,
                                        borderColor: theme.colors.border.DEFAULT,
                                        backgroundColor: theme.colors.background.secondary,
                                    }
                                ]}
                                placeholder="Cargo (ej: Coordinador de Gestión Humana)"
                                placeholderTextColor={theme.colors.text.secondary}
                                value={newPosition}
                                onChangeText={setNewPosition}
                            />

                            <TextInput
                                style={[
                                    styles.modalInput,
                                    {
                                        color: theme.colors.text.primary,
                                        borderColor: theme.colors.border.DEFAULT,
                                        backgroundColor: theme.colors.background.secondary,
                                    }
                                ]}
                                placeholder="Empresa (ej: Grupo Agora S.A.S.)"
                                placeholderTextColor={theme.colors.text.secondary}
                                value={newCompany}
                                onChangeText={setNewCompany}
                            />

                            <TextInput
                                style={[
                                    styles.modalInput,
                                    {
                                        color: theme.colors.text.primary,
                                        borderColor: theme.colors.border.DEFAULT,
                                        backgroundColor: theme.colors.background.secondary,
                                    }
                                ]}
                                placeholder="Período (ej: 2019 - 2023 (4 años))"
                                placeholderTextColor={theme.colors.text.secondary}
                                value={newPeriod}
                                onChangeText={setNewPeriod}
                            />

                            <TouchableOpacity
                                style={[
                                    styles.modalAddButton,
                                    {
                                        backgroundColor: newPosition.trim() && newCompany.trim()
                                            ? theme.colors.primary.DEFAULT
                                            : theme.colors.text.secondary
                                    }
                                ]}
                                onPress={addWorkExperience}
                                disabled={!newPosition.trim() || !newCompany.trim()}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.modalAddButtonText}>
                                    Agregar experiencia
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
        paddingTop: 20,
        paddingBottom: 20,
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
        marginBottom: 25,
    },
    fieldLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    labelText: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: "Montserrat_400Regular",
    },
    uploadArea: {
        height: 120,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    uploadText: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: "Montserrat_400Regular",
    },
    uploadSubtext: {
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
    },
    uploadedFile: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
    },
    fileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12,
    },
    fileDetails: {
        flex: 1,
    },
    fileName: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: "Montserrat_400Regular",
    },
    fileSize: {
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
    },
    removeFileButton: {
        padding: 4,
    },
    experienceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        gap: 4,
    },
    addButtonText: {
        color: 'white',
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
    },
    experiencesContainer: {
        gap: 12,
    },
    experienceItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
    },
    experienceInfo: {
        flex: 1,
    },
    experiencePosition: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: "Montserrat_400Regular",
        marginBottom: 2,
    },
    experienceCompany: {
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
        marginBottom: 2,
    },
    experiencePeriod: {
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
    },
    removeButton: {
        padding: 4,
    },
    skillInput: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingRight: 50,
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
        marginBottom: 15,
    },
    addSkillButton: {
        position: 'absolute',
        right: 8,
        top: 33,
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 15,
    },
    skillChip: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        borderWidth: 1,
    },
    skillText: {
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
    },
    selectedLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        fontFamily: "Montserrat_400Regular",
    },
    selectedSkillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    selectedSkillChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        gap: 6,
    },
    selectedSkillText: {
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
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
    modalBody: {
        padding: 20,
        gap: 15,
    },
    modalInput: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
    },
    modalAddButton: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    modalAddButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: "Montserrat_400Regular",
    },
});