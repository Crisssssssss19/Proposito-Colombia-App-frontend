// MatchesScreen.tsx - Pantalla de matches confirmados
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
} from "react-native";
import {
    Bell,
    MessageCircle,
    Heart,
    X,
    MapPin,
    Briefcase,
    DollarSign,
    Calendar,
    CheckCircle,
    Clock,
    MessageSquare,
} from "lucide-react-native";
import { useTheme } from "../context/ThemeContext";

interface Match {
    id: string;
    empresa: string;
    puesto: string;
    imagen: string;
    fechaMatch: string;
    estado: "activo" | "pendiente";
    proceso: {
        perfilRevisado: { fecha: string; completado: boolean };
        matchConfirmado: { fecha: string; completado: boolean };
        chatHabilitado: { fecha: string; completado: boolean; estado: string };
        entrevistaInicial: { completado: boolean; estado: string };
    };
    observaciones: string;
    ubicacion: string;
    tipoTrabajo: string;
    salario: string;
}

const matchesData: Match[] = [
    {
        id: "1",
        empresa: "InnovaCorp",
        puesto: "Desarrollador Frontend",
        imagen: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
        fechaMatch: "15 de Enero, 2024",
        estado: "activo",
        proceso: {
            perfilRevisado: { fecha: "15 de Enero, 2024", completado: true },
            matchConfirmado: { fecha: "15 de Enero, 2024", completado: true },
            chatHabilitado: { fecha: "", completado: false, estado: "Pendiente de contacto" },
            entrevistaInicial: { completado: false, estado: "Por programar" },
        },
        observaciones: "La empresa está esperando que inicies el chat para coordinar los siguientes pasos del proceso.",
        ubicacion: "Bogotá, Colombia",
        tipoTrabajo: "Tiempo completo",
        salario: "$4.000.000 - $6.000.000 COP",
    },
    {
        id: "2",
        empresa: "TechStudio Pro",
        puesto: "Diseñador UX/UI",
        imagen: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
        fechaMatch: "12 de Enero, 2024",
        estado: "activo",
        proceso: {
            perfilRevisado: { fecha: "12 de Enero, 2024", completado: true },
            matchConfirmado: { fecha: "12 de Enero, 2024", completado: true },
            chatHabilitado: { fecha: "13 de Enero, 2024", completado: true, estado: "Activo" },
            entrevistaInicial: { completado: false, estado: "Programada para 20 Enero" },
        },
        observaciones: "El equipo de reclutamiento te contactará pronto para programar la entrevista inicial.",
        ubicacion: "Medellín, Colombia",
        tipoTrabajo: "Medio tiempo",
        salario: "$3.500.000 - $4.500.000 COP",
    },
];

export default function MatchesScreen() {
    const { theme } = useTheme();
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

    const handleViewDetails = (match: Match) => {
        setSelectedMatch(match);
    };

    const handleChat = () => {
        // Navegar al chat
        console.log("Ir al chat");
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.colors.background.primary }]}>
                <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
                    Matches
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

            {/* Lista de matches */}
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {matchesData.map((match) => (
                    <TouchableOpacity
                        key={match.id}
                        style={[
                            styles.matchCard,
                            {
                                backgroundColor: theme.colors.background.primary,
                                borderColor: theme.colors.border.DEFAULT,
                            },
                        ]}
                        onPress={() => handleViewDetails(match)}
                        activeOpacity={0.7}
                    >
                        <Image source={{ uri: match.imagen }} style={styles.matchImage} />
                        <View style={styles.heartIcon}>
                            <Heart size={20} color="white" fill="white" />
                        </View>

                        <View style={styles.matchInfo}>
                            <Text style={[styles.matchEmpresa, { color: theme.colors.text.primary }]}>
                                {match.empresa}
                            </Text>
                            <Text style={[styles.matchPuesto, { color: theme.colors.text.secondary }]}>
                                {match.puesto}
                            </Text>

                            <View
                                style={[
                                    styles.matchStatus,
                                    { backgroundColor: theme.colors.background.secondary },
                                ]}
                            >
                                <Heart size={16} color={theme.colors.accent.coral} />
                                <View style={styles.statusTextContainer}>
                                    <Text style={[styles.matchStatusTitle, { color: theme.colors.text.primary }]}>
                                        Match confirmado
                                    </Text>
                                    <Text style={[styles.matchStatusSubtitle, { color: theme.colors.text.secondary }]}>
                                        ¡Les gustó tu perfil!
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={[styles.chatButton, { backgroundColor: theme.colors.accent.yellow }]}
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        handleChat();
                                    }}
                                >
                                    <MessageSquare size={16} color="white" />
                                    <Text style={styles.chatButtonText}>Chatear</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Modal de detalles */}
            <Modal
                visible={selectedMatch !== null}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setSelectedMatch(null)}
            >
                {selectedMatch && (
                    <View style={styles.modalOverlay}>
                        <View
                            style={[
                                styles.modalContainer,
                                { backgroundColor: theme.colors.background.primary },
                            ]}
                        >
                            {/* Header del modal */}
                            <View
                                style={[
                                    styles.modalHeader,
                                    { borderBottomColor: theme.colors.border.DEFAULT },
                                ]}
                            >
                                <Text style={[styles.modalTitle, { color: theme.colors.text.primary }]}>
                                    Detalles del Proceso
                                </Text>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setSelectedMatch(null)}
                                >
                                    <X size={24} color={theme.colors.text.primary} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView
                                style={styles.modalScroll}
                                showsVerticalScrollIndicator={false}
                            >
                                {/* Empresa info */}
                                <View
                                    style={[
                                        styles.empresaHeader,
                                        { backgroundColor: theme.colors.accent.coral + "10" },
                                    ]}
                                >
                                    <View style={styles.empresaIconContainer}>
                                        <Heart size={20} color={theme.colors.accent.coral} />
                                    </View>
                                    <View style={styles.empresaInfo}>
                                        <Text style={[styles.empresaNombre, { color: theme.colors.text.primary }]}>
                                            {selectedMatch.empresa}
                                        </Text>
                                        <Text
                                            style={[styles.empresaPuesto, { color: theme.colors.text.secondary }]}
                                        >
                                            {selectedMatch.puesto}
                                        </Text>
                                    </View>
                                </View>

                                {/* Estado del match */}
                                <View style={styles.statusSection}>
                                    <View style={styles.statusBadge}>
                                        <Heart size={14} color="#9333EA" />
                                        <Text style={[styles.statusBadgeText, { color: "#9333EA" }]}>
                                            Match confirmado
                                        </Text>
                                        <View style={[styles.activeBadge, { backgroundColor: "#10B981" }]}>
                                            <Text style={styles.activeBadgeText}>Activo</Text>
                                        </View>
                                    </View>

                                    <View style={styles.matchDate}>
                                        <Calendar size={14} color={theme.colors.text.secondary} />
                                        <Text style={[styles.matchDateText, { color: theme.colors.text.secondary }]}>
                                            Match realizado: {selectedMatch.fechaMatch}
                                        </Text>
                                    </View>
                                </View>

                                {/* Estado del proceso */}
                                <View style={styles.procesoSection}>
                                    <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                                        Estado del Proceso
                                    </Text>

                                    {/* Perfil revisado */}
                                    <View
                                        style={[
                                            styles.procesoItem,
                                            { backgroundColor: "#10B981" + "15" },
                                        ]}
                                    >
                                        <CheckCircle size={20} color="#10B981" />
                                        <View style={styles.procesoItemContent}>
                                            <Text
                                                style={[
                                                    styles.procesoItemTitle,
                                                    { color: theme.colors.text.primary },
                                                ]}
                                            >
                                                Perfil revisado
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.procesoItemDate,
                                                    { color: theme.colors.text.secondary },
                                                ]}
                                            >
                                                {selectedMatch.proceso.perfilRevisado.fecha}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Match confirmado */}
                                    <View
                                        style={[
                                            styles.procesoItem,
                                            { backgroundColor: "#10B981" + "15" },
                                        ]}
                                    >
                                        <CheckCircle size={20} color="#10B981" />
                                        <View style={styles.procesoItemContent}>
                                            <Text
                                                style={[
                                                    styles.procesoItemTitle,
                                                    { color: theme.colors.text.primary },
                                                ]}
                                            >
                                                Match confirmado
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.procesoItemDate,
                                                    { color: theme.colors.text.secondary },
                                                ]}
                                            >
                                                {selectedMatch.proceso.matchConfirmado.fecha}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Chat habilitado */}
                                    <View
                                        style={[
                                            styles.procesoItem,
                                            {
                                                backgroundColor: selectedMatch.proceso.chatHabilitado.completado
                                                    ? "#10B981" + "15"
                                                    : "#3B82F6" + "15",
                                            },
                                        ]}
                                    >
                                        {selectedMatch.proceso.chatHabilitado.completado ? (
                                            <CheckCircle size={20} color="#10B981" />
                                        ) : (
                                            <Clock size={20} color="#3B82F6" />
                                        )}
                                        <View style={styles.procesoItemContent}>
                                            <Text
                                                style={[
                                                    styles.procesoItemTitle,
                                                    { color: theme.colors.text.primary },
                                                ]}
                                            >
                                                Chat habilitado
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.procesoItemDate,
                                                    { color: "#3B82F6" },
                                                ]}
                                            >
                                                {selectedMatch.proceso.chatHabilitado.estado}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Entrevista inicial */}
                                    <View style={[styles.procesoItem, { backgroundColor: "#F3F4F6" }]}>
                                        <Clock size={20} color={theme.colors.text.secondary} />
                                        <View style={styles.procesoItemContent}>
                                            <Text
                                                style={[
                                                    styles.procesoItemTitle,
                                                    { color: theme.colors.text.primary },
                                                ]}
                                            >
                                                Entrevista inicial
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.procesoItemDate,
                                                    { color: theme.colors.text.secondary },
                                                ]}
                                            >
                                                {selectedMatch.proceso.entrevistaInicial.estado}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Observaciones */}
                                <View style={styles.observacionesSection}>
                                    <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                                        Observaciones
                                    </Text>
                                    <View
                                        style={[
                                            styles.observacionesBox,
                                            {
                                                backgroundColor: theme.colors.background.secondary,
                                                borderColor: theme.colors.border.DEFAULT,
                                            },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.observacionesText,
                                                { color: theme.colors.primary.DEFAULT },
                                            ]}
                                        >
                                            {selectedMatch.observaciones}
                                        </Text>
                                    </View>
                                </View>

                                {/* Detalles de la vacante */}
                                <View style={styles.detallesSection}>
                                    <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                                        Detalles de la Vacante
                                    </Text>

                                    <View style={styles.detalleItem}>
                                        <MapPin size={16} color={theme.colors.text.secondary} />
                                        <Text style={[styles.detalleText, { color: theme.colors.text.secondary }]}>
                                            {selectedMatch.ubicacion}
                                        </Text>
                                    </View>

                                    <View style={styles.detalleItem}>
                                        <Briefcase size={16} color={theme.colors.text.secondary} />
                                        <Text style={[styles.detalleText, { color: theme.colors.text.secondary }]}>
                                            {selectedMatch.tipoTrabajo}
                                        </Text>
                                    </View>

                                    <View style={styles.detalleItem}>
                                        <DollarSign size={16} color={theme.colors.text.secondary} />
                                        <Text style={[styles.detalleText, { color: theme.colors.text.secondary }]}>
                                            {selectedMatch.salario}
                                        </Text>
                                    </View>
                                </View>

                                {/* Botón ir al chat */}
                                <TouchableOpacity
                                    style={[
                                        styles.chatButtonLarge,
                                        { backgroundColor: "#A855F7" },
                                    ]}
                                    onPress={handleChat}
                                >
                                    <MessageSquare size={20} color="white" />
                                    <Text style={styles.chatButtonLargeText}>Ir al Chat</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                )}
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
        paddingTop: 50,
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
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    matchCard: {
        marginBottom: 20,
        borderRadius: 16,
        overflow: "hidden",
        borderWidth: 1,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    matchImage: {
        width: "100%",
        height: 180,
    },
    heartIcon: {
        position: "absolute",
        top: 12,
        right: 12,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#EF4444",
        justifyContent: "center",
        alignItems: "center",
    },
    matchInfo: {
        padding: 16,
    },
    matchEmpresa: {
        fontSize: 18,
        fontWeight: "700",
        fontFamily: "Montserrat_400Regular",
        marginBottom: 4,
    },
    matchPuesto: {
        fontSize: 14,
        fontFamily: "Montserrat_400Regular",
        marginBottom: 16,
    },
    matchStatus: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 12,
        gap: 12,
    },
    statusTextContainer: {
        flex: 1,
    },
    matchStatusTitle: {
        fontSize: 14,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
        marginBottom: 2,
    },
    matchStatusSubtitle: {
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
    },
    chatButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
    },
    chatButtonText: {
        color: "white",
        fontSize: 13,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    modalContainer: {
        height: "90%",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
        fontFamily: "Montserrat_400Regular",
    },
    closeButton: {
        padding: 5,
    },
    modalScroll: {
        flex: 1,
    },
    empresaHeader: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        margin: 20,
        marginBottom: 0,
        borderRadius: 12,
        gap: 12,
    },
    empresaIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    empresaInfo: {
        flex: 1,
    },
    empresaNombre: {
        fontSize: 16,
        fontWeight: "700",
        fontFamily: "Montserrat_400Regular",
        marginBottom: 2,
    },
    empresaPuesto: {
        fontSize: 14,
        fontFamily: "Montserrat_400Regular",
    },
    statusSection: {
        padding: 20,
        paddingBottom: 0,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
    },
    statusBadgeText: {
        fontSize: 14,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    activeBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    activeBadgeText: {
        color: "white",
        fontSize: 11,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    matchDate: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    matchDateText: {
        fontSize: 13,
        fontFamily: "Montserrat_400Regular",
    },
    procesoSection: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        fontFamily: "Montserrat_400Regular",
        marginBottom: 16,
    },
    procesoItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
        gap: 12,
    },
    procesoItemContent: {
        flex: 1,
    },
    procesoItemTitle: {
        fontSize: 14,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
        marginBottom: 2,
    },
    procesoItemDate: {
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
    },
    observacionesSection: {
        padding: 20,
        paddingTop: 0,
    },
    observacionesBox: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
    },
    observacionesText: {
        fontSize: 13,
        lineHeight: 20,
        fontFamily: "Montserrat_400Regular",
    },
    detallesSection: {
        padding: 20,
    },
    detalleItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 12,
    },
    detalleText: {
        fontSize: 14,
        fontFamily: "Montserrat_400Regular",
    },
    chatButtonLarge: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        marginHorizontal: 20,
        marginBottom: 40,
        borderRadius: 12,
        gap: 8,
    },
    chatButtonLargeText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
});