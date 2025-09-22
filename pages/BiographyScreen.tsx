import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import PropositosHeader from "../components/PropositosHeader";
import Footer from "../components/Footer";
import Golondrina from "../components/Golondrina";

const COURSES = [
    "Business Analytics",
    "Data Science",
    "Machine Learning",
    "Web Development",
    "Mobile Development",
    "Digital Marketing",
    "Project Management",
    "UI/UX Design",
    "Cloud Computing",
    "Cybersecurity"
];

type RootStackParamList = {
    CVScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Course {
    name: string;
    platform: string;
    duration: string;
}

export default function BiographyScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    const [biography, setBiography] = useState("");
    const [courses, setCourses] = useState<Course[]>([]);
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [newCourseName, setNewCourseName] = useState("");
    const [newCoursePlatform, setNewCoursePlatform] = useState("");
    const [newCourseDuration, setNewCourseDuration] = useState("");

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleContinue = () => {
        navigation.navigate("CVScreen");
    };

    const addCourse = () => {
        if (newCourseName.trim()) {
            const newCourse: Course = {
                name: newCourseName.trim(),
                platform: newCoursePlatform.trim() || "Plataforma",
                duration: newCourseDuration.trim() || "40 Horas"
            };
            setCourses([...courses, newCourse]);
            setNewCourseName("");
            setNewCoursePlatform("");
            setNewCourseDuration("");
            setShowCourseModal(false);
        }
    };

    const removeCourse = (index: number) => {
        setCourses(courses.filter((_, i) => i !== index));
    };

    const selectPredefinedCourse = (courseName: string) => {
        setNewCourseName(courseName);
    };

    const characterCount = biography.length;
    const maxCharacters = 500;

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
                        50%
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
                                width: '50%'
                            }
                        ]}
                    />
                </View>
            </View>

            <View style={styles.content}>
                {/* Logo Section */}
                <View style={styles.logoSection}>
                    <View style={styles.logoContainer}>
                        <View >
                            <Golondrina />
                        </View>
                    </View>

                    <Text style={[styles.title, { color: theme.colors.primary.DEFAULT }]}>
                        Cuéntanos sobre ti
                    </Text>
                </View>
                <ScrollView>
                    {/* Form Section */}
                    <View style={styles.formSection}>
                        {/* Biography */}
                        <View style={styles.fieldContainer}>
                            <View style={styles.fieldLabel}>
                                <Ionicons name="person-outline" size={20} color={theme.colors.text.secondary} />
                                <Text style={[styles.labelText, { color: theme.colors.text.primary }]}>
                                    Biografía corta
                                </Text>
                            </View>
                            <TextInput
                                style={[
                                    styles.textArea,
                                    {
                                        color: theme.colors.text.primary,
                                        borderColor: theme.colors.primary.DEFAULT,
                                        backgroundColor: theme.colors.background.secondary,
                                    }
                                ]}
                                placeholder="Soy ingeniero con 3 años en desarrollo backend, especializado en Python y bases de datos. Me apasiona crear soluciones eficientes..."
                                placeholderTextColor={theme.colors.text.secondary}
                                value={biography}
                                onChangeText={setBiography}
                                multiline={true}
                                numberOfLines={6}
                                maxLength={maxCharacters}
                                textAlignVertical="top"
                            />
                            <View style={styles.characterCount}>
                                <Text style={[styles.characterCountText, { color: theme.colors.text.secondary }]}>
                                    Mín: 50 caracteres
                                </Text>
                                <Text style={[
                                    styles.characterCountText,
                                    {
                                        color: characterCount >= 50 ? theme.colors.primary.DEFAULT : theme.colors.text.secondary
                                    }
                                ]}>
                                    {characterCount}/{maxCharacters}
                                </Text>
                            </View>
                        </View>

                        {/* Courses */}
                        <View style={styles.fieldContainer}>
                            <View style={styles.coursesHeader}>
                                <Text style={[styles.labelText, { color: theme.colors.text.primary }]}>
                                    Cursos / Diplomados (opcional)
                                </Text>
                                <TouchableOpacity
                                    style={[styles.addCourseButton, { backgroundColor: theme.colors.primary.DEFAULT }]}
                                    onPress={() => setShowCourseModal(true)}
                                >
                                    <Ionicons name="add" size={16} color="white" />
                                    <Text style={styles.addCourseText}>Agregar</Text>
                                </TouchableOpacity>
                            </View>

                            {courses.length > 0 && (
                                <View style={styles.coursesContainer}>
                                    {courses.map((course, index) => (
                                        <View
                                            key={index}
                                            style={[
                                                styles.courseItem,
                                                {
                                                    backgroundColor: theme.colors.background.secondary,
                                                    borderColor: theme.colors.border.DEFAULT
                                                }
                                            ]}
                                        >
                                            <View style={styles.courseInfo}>
                                                <Text style={[styles.courseName, { color: theme.colors.text.primary }]}>
                                                    {course.name}
                                                </Text>
                                                <Text style={[styles.courseDetails, { color: theme.colors.text.secondary }]}>
                                                    {course.platform}
                                                </Text>
                                                <Text style={[styles.courseDetails, { color: theme.colors.text.secondary }]}>
                                                    {course.duration}
                                                </Text>
                                            </View>
                                            <TouchableOpacity
                                                style={styles.removeCourseButton}
                                                onPress={() => removeCourse(index)}
                                            >
                                                <Ionicons name="trash-outline" size={16} color={theme.colors.accent.coral} />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            )}

                            <View style={styles.autoSaveContainer}>
                                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                                <Text style={[styles.autoSaveText, { color: "#10B981" }]}>
                                    Guardado automáticamente
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* Continue Button */}
                    <TouchableOpacity
                        style={[
                            styles.continueButton,
                            {
                                backgroundColor: characterCount >= 50
                                    ? theme.colors.primary.DEFAULT
                                    : theme.colors.text.secondary
                            }
                        ]}
                        onPress={handleContinue}
                        disabled={characterCount < 50}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.continueButtonText}>
                            Continuar
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {/* Add Course Modal */}
            <Modal
                visible={showCourseModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowCourseModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: theme.colors.background.primary }]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: theme.colors.text.primary }]}>
                                Agregar curso
                            </Text>
                            <TouchableOpacity
                                onPress={() => setShowCourseModal(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={24} color={theme.colors.text.primary} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalBody}>
                            {/* Predefined Courses */}
                            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                                Cursos populares
                            </Text>
                            <FlatList
                                data={COURSES}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.predefinedCourse,
                                            {
                                                backgroundColor: newCourseName === item
                                                    ? theme.colors.primary.DEFAULT + '20'
                                                    : theme.colors.background.secondary,
                                                borderColor: newCourseName === item
                                                    ? theme.colors.primary.DEFAULT
                                                    : theme.colors.border.DEFAULT
                                            }
                                        ]}
                                        onPress={() => selectPredefinedCourse(item)}
                                    >
                                        <Text style={[
                                            styles.predefinedCourseText,
                                            {
                                                color: newCourseName === item
                                                    ? theme.colors.primary.DEFAULT
                                                    : theme.colors.text.primary
                                            }
                                        ]}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                style={styles.predefinedCoursesList}
                            />

                            {/* Custom Course Form */}
                            <View style={styles.customCourseForm}>
                                <TextInput
                                    style={[
                                        styles.modalInput,
                                        {
                                            color: theme.colors.text.primary,
                                            borderColor: theme.colors.border.DEFAULT,
                                            backgroundColor: theme.colors.background.secondary,
                                        }
                                    ]}
                                    placeholder="Nombre del curso"
                                    placeholderTextColor={theme.colors.text.secondary}
                                    value={newCourseName}
                                    onChangeText={setNewCourseName}
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
                                    placeholder="Plataforma (ej: Coursera, Udemy)"
                                    placeholderTextColor={theme.colors.text.secondary}
                                    value={newCoursePlatform}
                                    onChangeText={setNewCoursePlatform}
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
                                    placeholder="Duración (ej: 40 Horas)"
                                    placeholderTextColor={theme.colors.text.secondary}
                                    value={newCourseDuration}
                                    onChangeText={setNewCourseDuration}
                                />
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.addButton,
                                    {
                                        backgroundColor: newCourseName.trim()
                                            ? theme.colors.primary.DEFAULT
                                            : theme.colors.text.secondary
                                    }
                                ]}
                                onPress={addCourse}
                                disabled={!newCourseName.trim()}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.addButtonText}>
                                    Agregar curso
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
        marginBottom: 8,
        gap: 8,
    },
    labelText: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: "Montserrat_400Regular",
    },
    textArea: {
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
        height: 120,
    },
    characterCount: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    characterCountText: {
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
    },
    coursesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    addCourseButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        gap: 4,
    },
    addCourseText: {
        color: 'white',
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
    },
    coursesContainer: {
        gap: 12,
    },
    courseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
    },
    courseInfo: {
        flex: 1,
    },
    courseName: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: "Montserrat_400Regular",
        marginBottom: 2,
    },
    courseDetails: {
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
    },
    removeCourseButton: {
        padding: 4,
    },
    autoSaveContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 10,
    },
    autoSaveText: {
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
        maxHeight: '80%',
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
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        fontFamily: "Montserrat_400Regular",
    },
    predefinedCoursesList: {
        marginBottom: 20,
    },
    predefinedCourse: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        borderWidth: 1,
        marginRight: 8,
    },
    predefinedCourseText: {
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
    },
    customCourseForm: {
        gap: 15,
        marginBottom: 20,
    },
    modalInput: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
    },
    addButton: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: "Montserrat_400Regular",
    },
});