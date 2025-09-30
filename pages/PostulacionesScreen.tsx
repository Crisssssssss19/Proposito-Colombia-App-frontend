// PostulacionesScreen.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal,Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Bell, MessageCircle, X } from "lucide-react-native";
import { useTheme } from "../context/ThemeContext";
import VacancyCard from "../components/VacancyCard";

type RootStackParamList = {
    DetallePostulacion: { postulacionId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Postulacion {
    id: string;
    titulo: string;
    empresa: string;
    ubicacion: string;
    skills: string[];
    salario: string;
    imagen: string;
    tipoTrabajo: string;
    modalidad: string;
    jornada: string;
    contrato: string;
    publicado: string;
    descripcion: string;
    requisitos: string[];
}

const postulacionesData: Postulacion[] = [
    {
        id: "1",
        titulo: "Diseñador UX/UI",
        empresa: "CreativeStudio",
        ubicacion: "Bogotá",
        skills: ["Figma", "Adobe XD"],
        salario: "$3.500.000 - $4.500.000",
        imagen: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
        tipoTrabajo: "Medio Tiempo",
        modalidad: "Híbrido",
        jornada: "Lunes a Viernes",
        contrato: "Termino Fijo",
        publicado: "Hace 1 semana",
        descripcion: "Estamos buscando un diseñador UX/UI creativo y analítico para crear experiencias de usuario excepcionales en nuestros proyectos.",
        requisitos: [
            "2+ años de experiencia en diseño UX/UI",
            "Dominio de Figma y Adobe Creative Suite",
            "Conocimiento en Design Systems",
            "Portfolio sólido con casos de estudio"
        ],
    },
    {
        id: "2",
        titulo: "Desarrollador Frontend",
        empresa: "TechCorp Colombia",
        ubicacion: "Medellín",
        skills: ["React", "Tailwind"],
        salario: "$4.000.000 - $5.500.000",
        imagen: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
        tipoTrabajo: "Tiempo Completo",
        modalidad: "Remoto",
        jornada: "Lunes a Viernes",
        contrato: "Indefinido",
        publicado: "Hace 2 días",
        descripcion: "Únete a nuestro equipo para desarrollar aplicaciones web modernas con las últimas tecnologías.",
        requisitos: [
            "3+ años de experiencia con React",
            "Conocimiento en TypeScript",
            "Experiencia con APIs REST",
            "Trabajo en equipo y comunicación"
        ],
    },
    {
        id: "3",
        titulo: "Analista de Datos",
        empresa: "DataAnalytics Pro",
        ubicacion: "Cali",
        skills: ["SQL", "Python"],
        salario: "$4.200.000 - $6.000.000",
        imagen: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        tipoTrabajo: "Tiempo Completo",
        modalidad: "Presencial",
        jornada: "Lunes a Viernes",
        contrato: "Termino Fijo",
        publicado: "Hace 3 días",
        descripcion: "Buscamos un analista de datos para transformar información en insights valiosos para el negocio.",
        requisitos: [
            "2+ años en análisis de datos",
            "Dominio de SQL y Python",
            "Experiencia con visualización de datos",
            "Pensamiento analítico"
        ],
    },
];

export default function PostulacionesScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    const [postulaciones, setPostulaciones] = useState(postulacionesData);
    const [selectedPostulacion, setSelectedPostulacion] = useState<Postulacion | null>(null);
    const [cancelModalVisible, setCancelModalVisible] = useState(false);
    const [cancelSuccessVisible, setCancelSuccessVisible] = useState(false);

    const handleViewDetails = (postulacion: Postulacion) => {
        setSelectedPostulacion(postulacion);
    };

    const handleCancelPostulacion = () => {
        setCancelModalVisible(true);
    };

    const confirmCancelacion = () => {
        if (selectedPostulacion) {
            setPostulaciones(prev => prev.filter(p => p.id !== selectedPostulacion.id));
            setCancelModalVisible(false);
            setSelectedPostulacion(null);
            setCancelSuccessVisible(true);
            setTimeout(() => setCancelSuccessVisible(false), 2000);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.colors.background.primary }]}>
                <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
                    Postulaciones
                </Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Bell size={24} color={theme.colors.text.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <MessageCircle size={24} color={theme.colors.text.primary} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Lista de postulaciones */}
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {postulaciones.map((postulacion) => (
                    <TouchableOpacity
                        key={postulacion.id}
                        style={[styles.card, { backgroundColor: theme.colors.background.primary }]}
                        onPress={() => handleViewDetails(postulacion)}
                        activeOpacity={0.7}
                    >
                        <Image source={{ uri: postulacion.imagen }} style={styles.cardImage} />
                        <View style={styles.cardContent}>
                            <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
                                {postulacion.titulo}
                            </Text>
                            <Text style={[styles.cardSubtitle, { color: theme.colors.text.secondary }]}>
                                {postulacion.empresa} · {postulacion.ubicacion}
                            </Text>
                            <View style={styles.cardSkills}>
                                {postulacion.skills.map((skill, index) => (
                                    <View
                                        key={index}
                                        style={[styles.skillBadge, { backgroundColor: theme.colors.primary.DEFAULT }]}
                                    >
                                        <Text style={styles.skillText}>{skill}</Text>
                                    </View>
                                ))}
                            </View>
                            <Text style={[styles.cardSalary, { color: "#10B981" }]}>
                                {postulacion.salario}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Modal de detalle */}
            <Modal
                visible={selectedPostulacion !== null}
                animationType="slide"
                transparent={false}
                onRequestClose={() => setSelectedPostulacion(null)}
            >
                {selectedPostulacion && (
                    <View style={[styles.modalContainer, { backgroundColor: theme.colors.background.primary }]}>
                        {/* Header del modal */}
                        <View style={[styles.modalHeader, { backgroundColor: theme.colors.background.primary }]}>
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => setSelectedPostulacion(null)}
                            >
                                <Text style={[styles.backArrow, { color: theme.colors.text.primary }]}>←</Text>
                            </TouchableOpacity>
                            <Text style={[styles.modalHeaderTitle, { color: theme.colors.text.primary }]}>
                                Detalle Vacante
                            </Text>
                            <View style={styles.modalHeaderIcons}>
                                <TouchableOpacity style={styles.iconButton}>
                                    <Bell size={24} color={theme.colors.text.primary} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconButton}>
                                    <MessageCircle size={24} color={theme.colors.text.primary} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                            {/* Imagen */}
                            <Image
                                source={{ uri: selectedPostulacion.imagen }}
                                style={styles.modalImage}
                            />
                            <View style={styles.imageOverlay}>
                                <Text style={styles.modalSalary}>{selectedPostulacion.salario}</Text>
                                <View style={styles.modalSkills}>
                                    {selectedPostulacion.skills.map((skill, index) => (
                                        <View
                                            key={index}
                                            style={[styles.skillBadge, { backgroundColor: theme.colors.primary.DEFAULT }]}
                                        >
                                            <Text style={styles.skillText}>{skill}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            {/* Información */}
                            <View style={styles.modalContent}>
                                <Text style={[styles.modalTitle, { color: theme.colors.text.primary }]}>
                                    {selectedPostulacion.titulo}
                                </Text>
                                <Text style={[styles.modalEmpresa, { color: theme.colors.primary.DEFAULT }]}>
                                    {selectedPostulacion.empresa}
                                </Text>

                                <View style={styles.modalBadges}>
                                    <View
                                        style={[
                                            styles.badge,
                                            { backgroundColor: theme.colors.primary.DEFAULT + "20" },
                                        ]}
                                    >
                                        <Text
                                            style={[styles.badgeText, { color: theme.colors.primary.DEFAULT }]}
                                        >
                                            {selectedPostulacion.tipoTrabajo}
                                        </Text>
                                    </View>
                                    <View style={[styles.badge, { borderColor: theme.colors.primary.DEFAULT }]}>
                                        <Text style={[styles.badgeText, { color: theme.colors.text.primary }]}>
                                            📍 {selectedPostulacion.ubicacion}
                                        </Text>
                                    </View>
                                    <View style={[styles.badge, { borderColor: theme.colors.primary.DEFAULT }]}>
                                        <Text style={[styles.badgeText, { color: theme.colors.text.primary }]}>
                                            {selectedPostulacion.modalidad}
                                        </Text>
                                    </View>
                                </View>

                                {/* Descripción */}
                                <View style={styles.section}>
                                    <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                                        Descripción del trabajo
                                    </Text>
                                    <Text style={[styles.sectionText, { color: theme.colors.text.secondary }]}>
                                        {selectedPostulacion.descripcion}
                                    </Text>
                                </View>

                                {/* Requisitos */}
                                <View style={styles.section}>
                                    <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                                        Requisitos
                                    </Text>
                                    {selectedPostulacion.requisitos.map((req, index) => (
                                        <View key={index} style={styles.requisito}>
                                            <Text style={{ color: "#10B981", marginRight: 8 }}>✓</Text>
                                            <Text
                                                style={[
                                                    styles.requisitoText,
                                                    { color: theme.colors.text.secondary },
                                                ]}
                                            >
                                                {req}
                                            </Text>
                                        </View>
                                    ))}
                                </View>

                                {/* Detalles */}
                                <View style={styles.section}>
                                    <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                                        Detalles del trabajo
                                    </Text>
                                    <View style={styles.detalle}>
                                        <Text
                                            style={[
                                                styles.detalleLabel,
                                                { color: theme.colors.text.secondary },
                                            ]}
                                        >
                                            Jornada:
                                        </Text>
                                        <Text
                                            style={[
                                                styles.detalleValue,
                                                { color: theme.colors.text.primary },
                                            ]}
                                        >
                                            {selectedPostulacion.jornada}
                                        </Text>
                                    </View>
                                    <View style={styles.detalle}>
                                        <Text
                                            style={[
                                                styles.detalleLabel,
                                                { color: theme.colors.text.secondary },
                                            ]}
                                        >
                                            Contrato:
                                        </Text>
                                        <Text
                                            style={[
                                                styles.detalleValue,
                                                { color: theme.colors.text.primary },
                                            ]}
                                        >
                                            {selectedPostulacion.contrato}
                                        </Text>
                                    </View>
                                    <View style={styles.detalle}>
                                        <Text
                                            style={[
                                                styles.detalleLabel,
                                                { color: theme.colors.text.secondary },
                                            ]}
                                        >
                                            Salario:
                                        </Text>
                                        <Text
                                            style={[
                                                styles.detalleValue,
                                                { color: theme.colors.text.primary },
                                            ]}
                                        >
                                            Mensual
                                        </Text>
                                    </View>
                                    <View style={styles.detalle}>
                                        <Text
                                            style={[
                                                styles.detalleLabel,
                                                { color: theme.colors.text.secondary },
                                            ]}
                                        >
                                            Publicado:
                                        </Text>
                                        <Text
                                            style={[
                                                styles.detalleValue,
                                                { color: theme.colors.text.primary },
                                            ]}
                                        >
                                            {selectedPostulacion.publicado}
                                        </Text>
                                    </View>
                                </View>

                                {/* Botón cancelar */}
                                <TouchableOpacity
                                    style={[
                                        styles.cancelButton,
                                        { backgroundColor: theme.colors.primary.DEFAULT },
                                    ]}
                                    onPress={handleCancelPostulacion}
                                >
                                    <X size={20} color="white" />
                                    <Text style={styles.cancelButtonText}>Cancelar postulación</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                )}
            </Modal>

            {/* Modal de confirmación de cancelación */}
            <Modal
                visible={cancelModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setCancelModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.confirmModal, { backgroundColor: theme.colors.background.primary }]}>
                        <View style={styles.cancelIcon}>
                            <Text style={styles.cancelCheckmark}>✓</Text>
                        </View>
                        <Text style={[styles.confirmTitle, { color: theme.colors.text.primary }]}>
                            ¡Postulación cancelada!
                        </Text>
                        <Text style={[styles.confirmText, { color: theme.colors.text.secondary }]}>
                            Tu postulación ha sido cancelada correctamente.
                        </Text>
                        <TouchableOpacity
                            style={[styles.confirmOkButton, { backgroundColor: theme.colors.primary.DEFAULT }]}
                            onPress={confirmCancelacion}
                        >
                            <Text style={styles.confirmOkButtonText}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal de éxito */}
            <Modal visible={cancelSuccessVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={[styles.successModal, { backgroundColor: theme.colors.background.primary }]}>
                        <View style={styles.successIcon}>
                            <Text style={styles.checkmark}>✓</Text>
                        </View>
                        <Text style={[styles.successTitle, { color: theme.colors.text.primary }]}>
                            ¡Postulación cancelada!
                        </Text>
                        <Text style={[styles.successText, { color: theme.colors.text.secondary }]}>
                            Tu postulación ha sido cancelada correctamente.
                        </Text>
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
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 15,
        position: "relative",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
        textAlign: "center",
    },
    headerIcons: {
        flexDirection: "row",
        gap: 15,
        position: "absolute",
        right: 20,
        top: 50,
    },
    iconButton: {
        padding: 5,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    card: {
        flexDirection: "row",
        marginBottom: 16,
        borderRadius: 12,
        overflow: "hidden",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardImage: {
        width: 120,
        height: 120,
    },
    cardContent: {
        flex: 1,
        padding: 12,
        justifyContent: "space-between",
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
        marginBottom: 8,
    },
    cardSkills: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
        marginBottom: 8,
    },
    skillBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    skillText: {
        color: "white",
        fontSize: 10,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    cardSalary: {
        fontSize: 14,
        fontWeight: "700",
        fontFamily: "Montserrat_400Regular",
    },
    modalContainer: {
        flex: 1,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 15,
    },
    backButton: {
        padding: 5,
    },
    backArrow: {
        fontSize: 24,
    },
    modalHeaderTitle: {
        fontSize: 18,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
        flex: 1,
        textAlign: "center",
        marginRight: 80,
    },
    modalHeaderIcons: {
        flexDirection: "row",
        gap: 15,
    },
    modalScroll: {
        flex: 1,
    },
    modalImage: {
        width: "100%",
        height: 300,
    },
    imageOverlay: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
    },
    modalSalary: {
        fontSize: 24,
        fontWeight: "700",
        color: "#10B981",
        marginBottom: 12,
        fontFamily: "Montserrat_400Regular",
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    modalSkills: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    modalContent: {
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 4,
        fontFamily: "Montserrat_400Regular",
    },
    modalEmpresa: {
        fontSize: 16,
        marginBottom: 12,
        fontFamily: "Montserrat_400Regular",
    },
    modalBadges: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 20,
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "transparent",
    },
    badgeText: {
        fontSize: 12,
        fontWeight: "500",
        fontFamily: "Montserrat_400Regular",
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 12,
        fontFamily: "Montserrat_400Regular",
    },
    sectionText: {
        fontSize: 14,
        lineHeight: 22,
        fontFamily: "Montserrat_400Regular",
    },
    requisito: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 8,
    },
    requisitoText: {
        fontSize: 14,
        flex: 1,
        fontFamily: "Montserrat_400Regular",
    },
    detalle: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 1,
    },
    detalleLabel: {
        fontSize: 14,
        fontFamily: "Montserrat_400Regular",
    },
    detalleValue: {
        fontSize: 14,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    cancelButton: {
        flexDirection: "row",
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        marginTop: 20,
        marginBottom: 40,
    },
    cancelButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    confirmModal: {
        width: "85%",
        borderRadius: 16,
        padding: 32,
        alignItems: "center",
    },
    cancelIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#10B981",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    cancelCheckmark: {
        color: "white",
        fontSize: 32,
        fontWeight: "700",
    },
    confirmTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 12,
        fontFamily: "Montserrat_400Regular",
    },
    confirmText: {
        fontSize: 14,
        textAlign: "center",
        lineHeight: 22,
        fontFamily: "Montserrat_400Regular",
        marginBottom: 24,
    },
    confirmOkButton: {
        width: "100%",
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    confirmOkButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    successModal: {
        width: "85%",
        borderRadius: 16,
        padding: 32,
        alignItems: "center",
    },
    successIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#10B981",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    checkmark: {
        color: "white",
        fontSize: 32,
        fontWeight: "700",
    },
    successTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 12,
        fontFamily: "Montserrat_400Regular",
    },
    successText: {
        fontSize: 14,
        textAlign: "center",
        lineHeight: 22,
        fontFamily: "Montserrat_400Regular",
    },
});