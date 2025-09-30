// VacantesScreen.tsx - Pantalla principal de vacantes CORREGIDA
import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    Modal,
    Share,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Bell, MessageCircle } from "lucide-react-native";
import { useTheme } from "../context/ThemeContext";
import FloatingActionMenu from "../components/FloatingActionMenu";

const { width } = Dimensions.get("window");

type RootStackParamList = {
    DetalleVacante: { vacanteId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Vacante {
    id: string;
    titulo: string;
    empresa: string;
    ubicacion: string;
    modalidad: string;
    salario: string;
    skills: string[];
    tipoTrabajo: string;
    jornada: string;
    contrato: string;
    publicado: string;
    postulaciones: number;
    imagen: string;
    descripcion: string;
    requisitos: string[];
    liked?: boolean;
}

const vacantesDataInitial: Vacante[] = [
    {
        id: "1",
        titulo: "Diseñador UX/UI",
        empresa: "CreativeStudio",
        ubicacion: "Medellín",
        modalidad: "Híbrido",
        salario: "$3.500.000 - $4.500.000",
        skills: ["Figma", "UX", "UI", "Diseño", "Prototipado", "Adobe XD", "Sketch", "Wireframes"],
        tipoTrabajo: "Medio Tiempo",
        jornada: "Lunes a Viernes",
        contrato: "Termino Fijo",
        publicado: "Hace 1 semana",
        postulaciones: 32,
        imagen: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
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
        modalidad: "Remoto",
        salario: "$4.000.000 - $5.500.000",
        skills: ["React", "Tailwind", "TypeScript", "Next.js"],
        tipoTrabajo: "Tiempo Completo",
        jornada: "Lunes a Viernes",
        contrato: "Indefinido",
        publicado: "Hace 2 días",
        postulaciones: 45,
        imagen: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
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
        modalidad: "Presencial",
        salario: "$4.200.000 - $6.000.000",
        skills: ["SQL", "Python", "Power BI", "Excel"],
        tipoTrabajo: "Tiempo Completo",
        jornada: "Lunes a Viernes",
        contrato: "Termino Fijo",
        publicado: "Hace 3 días",
        postulaciones: 28,
        imagen: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        descripcion: "Buscamos un analista de datos para transformar información en insights valiosos para el negocio.",
        requisitos: [
            "2+ años en análisis de datos",
            "Dominio de SQL y Python",
            "Experiencia con visualización de datos",
            "Pensamiento analítico"
        ],
    },
];

export default function VacantesScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation<NavigationProp>();
    const scrollViewRef = useRef<ScrollView>(null);
    const infoScrollRef = useRef<ScrollView>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [vacantes, setVacantes] = useState(vacantesDataInitial);
    const [showInfo, setShowInfo] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);

    const handleScroll = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        if (index !== currentIndex) {
            setCurrentIndex(index);
            setShowInfo(false); // Reset info cuando cambias de vacante
        }
    };

    const handleLike = () => {
        // Remover la vacante actual de inmediato
        const newVacantes = vacantes.filter((_, i) => i !== currentIndex);
        setVacantes(newVacantes);

        // Si hay más vacantes, ir a la siguiente
        if (newVacantes.length > 0) {
            // Mantener el índice en el mismo lugar o ir al anterior si era el último
            const newIndex = currentIndex >= newVacantes.length ? currentIndex - 1 : currentIndex;
            setCurrentIndex(newIndex);
            setShowInfo(false);
        }
    };

    const scrollToInfo = () => {
        if (showInfo) {
            infoScrollRef.current?.scrollTo({ y: 0, animated: true });
            setShowInfo(false);
        } else {
            infoScrollRef.current?.scrollToEnd({ animated: true });
            setShowInfo(true);
        }
    };

    const handleShare = async () => {
        try {
            const vacante = vacantes[currentIndex];
            await Share.share({
                message: `${vacante.titulo} - ${vacante.empresa}\n${vacante.salario}`,
                title: vacante.titulo,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handlePostular = () => {
        setMenuVisible(false);
        setConfirmModalVisible(true);
    };

    const confirmPostulacion = () => {
        setConfirmModalVisible(false);
        setSuccessModalVisible(true);

        // Remover la vacante actual y cambiar a la siguiente
        setTimeout(() => {
            setSuccessModalVisible(false);
            const newVacantes = vacantes.filter((_, i) => i !== currentIndex);
            setVacantes(newVacantes);

            if (newVacantes.length > 0) {
                const newIndex = currentIndex >= newVacantes.length ? currentIndex - 1 : currentIndex;
                setCurrentIndex(newIndex);
                setShowInfo(false);
            }
        }, 2000);
    };

    if (vacantes.length === 0) {
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
                <View style={[styles.header, { backgroundColor: theme.colors.background.primary }]}>
                    <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
                        Vacantes
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
                <View style={styles.emptyContainer}>
                    <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
                        No hay más vacantes disponibles
                    </Text>
                </View>
            </View>
        );
    }

    const currentVacante = vacantes[currentIndex];

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.colors.background.primary }]}>
                <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
                    Vacantes
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

            {/* Scroll Horizontal de Vacantes */}
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                style={styles.horizontalScroll}
                scrollEnabled={true}
            >
                {vacantes.map((vacante, index) => (
                    <View key={vacante.id} style={[styles.card, { width }]}>
                        <Image
                            source={{ uri: vacante.imagen }}
                            style={styles.cardImage}
                            resizeMode="cover"
                        />

                        {/* Overlay con gradiente */}
                        <View style={styles.overlay} />

                        {/* Menú flotante */}
                        {index === currentIndex && (
                            <FloatingActionMenu
                                isLiked={false}
                                showInfo={showInfo}
                                onEyePress={() => setMenuVisible(true)}
                                onLikePress={handleLike}
                                onToggleInfo={scrollToInfo}
                                onSharePress={handleShare}
                            />
                        )}

                        {/* Información sobre la imagen */}
                        <View style={styles.cardInfo}>
                            <Text style={styles.salary}>{vacante.salario}</Text>
                            <View style={styles.skills}>
                                {vacante.skills.map((skill, idx) => (
                                    <View
                                        key={idx}
                                        style={[styles.skillBadge, { backgroundColor: theme.colors.primary.DEFAULT }]}
                                    >
                                        <Text style={styles.skillText}>{skill}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Información detallada (Scroll Vertical) */}
            <ScrollView
                ref={infoScrollRef}
                style={styles.infoScroll}
                showsVerticalScrollIndicator={false}
            >
                <View style={[styles.infoContainer, { backgroundColor: theme.colors.background.primary }]}>
                    <Text style={[styles.title, { color: theme.colors.text.primary }]}>
                        {currentVacante.titulo}
                    </Text>
                    <Text style={[styles.empresa, { color: theme.colors.primary.DEFAULT }]}>
                        {currentVacante.empresa}
                    </Text>

                    <View style={styles.badges}>
                        <View style={[styles.badge, { backgroundColor: theme.colors.primary.DEFAULT + "20" }]}>
                            <Text style={[styles.badgeText, { color: theme.colors.primary.DEFAULT }]}>
                                {currentVacante.tipoTrabajo}
                            </Text>
                        </View>
                        <View style={[styles.badge, { borderColor: theme.colors.primary.DEFAULT }]}>
                            <Text style={[styles.badgeText, { color: theme.colors.text.primary }]}>
                                📍 {currentVacante.ubicacion}
                            </Text>
                        </View>
                        <View style={[styles.badge, { borderColor: theme.colors.primary.DEFAULT }]}>
                            <Text style={[styles.badgeText, { color: theme.colors.text.primary }]}>
                                {currentVacante.modalidad}
                            </Text>
                        </View>
                    </View>

                    <Text style={[styles.postulaciones, { color: theme.colors.text.secondary }]}>
                        {currentVacante.postulaciones} postulaciones
                    </Text>

                    {/* Descripción del trabajo */}
                    {showInfo && (
                        <>
                            <View style={styles.section}>
                                <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                                    Descripción del trabajo
                                </Text>
                                <Text style={[styles.sectionText, { color: theme.colors.text.secondary }]}>
                                    {currentVacante.descripcion}
                                </Text>
                            </View>

                            {/* Requisitos */}
                            <View style={styles.section}>
                                <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                                    Requisitos
                                </Text>
                                {currentVacante.requisitos.map((req, index) => (
                                    <View key={index} style={styles.requisito}>
                                        <Text style={{ color: "#10B981", marginRight: 8 }}>✓</Text>
                                        <Text style={[styles.requisitoText, { color: theme.colors.text.secondary }]}>
                                            {req}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            {/* Detalles del trabajo */}
                            <View style={styles.section}>
                                <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                                    Detalles del trabajo
                                </Text>
                                <View style={styles.detalle}>
                                    <Text style={[styles.detalleLabel, { color: theme.colors.text.secondary }]}>
                                        Jornada:
                                    </Text>
                                    <Text style={[styles.detalleValue, { color: theme.colors.text.primary }]}>
                                        {currentVacante.jornada}
                                    </Text>
                                </View>
                                <View style={styles.detalle}>
                                    <Text style={[styles.detalleLabel, { color: theme.colors.text.secondary }]}>
                                        Contrato:
                                    </Text>
                                    <Text style={[styles.detalleValue, { color: theme.colors.text.primary }]}>
                                        {currentVacante.contrato}
                                    </Text>
                                </View>
                                <View style={styles.detalle}>
                                    <Text style={[styles.detalleLabel, { color: theme.colors.text.secondary }]}>
                                        Salario:
                                    </Text>
                                    <Text style={[styles.detalleValue, { color: theme.colors.text.primary }]}>
                                        Mensual
                                    </Text>
                                </View>
                                <View style={styles.detalle}>
                                    <Text style={[styles.detalleLabel, { color: theme.colors.text.secondary }]}>
                                        Publicado:
                                    </Text>
                                    <Text style={[styles.detalleValue, { color: theme.colors.text.primary }]}>
                                        {currentVacante.publicado}
                                    </Text>
                                </View>
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>

            {/* Modal de opciones */}
            <Modal
                visible={menuVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setMenuVisible(false)}
                >
                    <View style={[styles.menuModal, { backgroundColor: theme.colors.background.primary }]}>
                        <TouchableOpacity
                            style={styles.menuOption}
                            onPress={handlePostular}
                        >
                            <Text style={[styles.menuText, { color: theme.colors.primary.DEFAULT }]}>
                                Postular a esta vacante
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Modal de confirmación */}
            <Modal
                visible={confirmModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setConfirmModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.confirmModal, { backgroundColor: theme.colors.background.primary }]}>
                        <Text style={[styles.confirmTitle, { color: theme.colors.text.primary }]}>
                            Confirmar postulación
                        </Text>
                        <Text style={[styles.confirmText, { color: theme.colors.text.secondary }]}>
                            ¿Estás seguro que deseas postularte a la vacante de{" "}
                            <Text style={{ fontWeight: "600" }}>{currentVacante.titulo}</Text> en{" "}
                            <Text style={{ fontWeight: "600" }}>{currentVacante.empresa}</Text>?
                        </Text>
                        <TouchableOpacity
                            style={[styles.confirmButton, { backgroundColor: theme.colors.primary.DEFAULT }]}
                            onPress={confirmPostulacion}
                        >
                            <Text style={styles.confirmButtonText}>Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.cancelButton, { borderColor: theme.colors.primary.DEFAULT }]}
                            onPress={() => setConfirmModalVisible(false)}
                        >
                            <Text style={[styles.cancelButtonText, { color: theme.colors.primary.DEFAULT }]}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal de éxito */}
            <Modal visible={successModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={[styles.successModal, { backgroundColor: theme.colors.background.primary }]}>
                        <View style={styles.successIcon}>
                            <Text style={styles.checkmark}>✓</Text>
                        </View>
                        <Text style={[styles.successTitle, { color: theme.colors.text.primary }]}>
                            ¡Postulación exitosa!
                        </Text>
                        <Text style={[styles.successText, { color: theme.colors.text.secondary }]}>
                            Tu postulación ha sido enviada correctamente. Te notificaremos si la empresa hace
                            Match contigo.
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
    },
    iconButton: {
        padding: 5,
    },
    horizontalScroll: {
        flex: 1,
    },
    card: {
        position: "relative",
        height: "100%",
    },
    cardImage: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    cardInfo: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 80,
    },
    salary: {
        fontSize: 24,
        fontWeight: "700",
        color: "#10B981",
        marginBottom: 12,
        fontFamily: "Montserrat_400Regular",
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    skills: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    skillBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    skillText: {
        color: "white",
        fontSize: 12,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    infoScroll: {
        maxHeight: 300,
    },
    infoContainer: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 4,
        fontFamily: "Montserrat_400Regular",
    },
    empresa: {
        fontSize: 16,
        marginBottom: 12,
        fontFamily: "Montserrat_400Regular",
    },
    badges: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 8,
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
    postulaciones: {
        fontSize: 12,
        marginBottom: 20,
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
        borderBottomColor: "#E5E7EB",
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
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    menuModal: {
        width: "80%",
        borderRadius: 12,
        padding: 20,
    },
    menuOption: {
        paddingVertical: 16,
        alignItems: "center",
    },
    menuText: {
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    confirmModal: {
        width: "85%",
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
    },
    confirmTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 12,
        fontFamily: "Montserrat_400Regular",
        textAlign: "center",
    },
    confirmText: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 24,
        lineHeight: 22,
        fontFamily: "Montserrat_400Regular",
    },
    confirmButton: {
        width: "100%",
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    confirmButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
    cancelButton: {
        width: "100%",
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
    },
    cancelButtonText: {
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
        textAlign: "center",
    },
    successText: {
        fontSize: 14,
        textAlign: "center",
        lineHeight: 22,
        fontFamily: "Montserrat_400Regular",
    },
});