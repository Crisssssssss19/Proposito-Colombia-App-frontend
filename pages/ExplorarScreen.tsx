// ExplorarScreen.tsx - Pantalla de búsqueda y exploración de vacantes
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Bell, MessageCircle, Search } from "lucide-react-native";
import { useTheme } from "../context/ThemeContext";
import VacancyCard from "../components/VacancyCard";

type RootStackParamList = {
    DetalleVacante: { vacanteId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Vacante {
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

const vacantesData: Vacante[] = [
    {
        id: "1",
        titulo: "Especialista en Marketing Digital",
        empresa: "Creative Solutions",
        ubicacion: "Medellín",
        skills: ["Google Ads", "SEO"],
        salario: "$2.800.000 - $4.200.000",
        imagen: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
        tipoTrabajo: "Tiempo Completo",
        modalidad: "Híbrido",
        jornada: "Lunes a Viernes",
        contrato: "Indefinido",
        publicado: "Hace 2 días",
        descripcion: "Buscamos un especialista en marketing digital para liderar nuestras campañas online.",
        requisitos: [
            "3+ años en marketing digital",
            "Experiencia con Google Ads y SEO",
            "Conocimiento en analytics",
            "Certificaciones relevantes"
        ],
    },
    {
        id: "2",
        titulo: "Chef Ejecutivo",
        empresa: "Restaurante El Dorado",
        ubicacion: "Cartagena",
        skills: ["Cocina Internacional", "HACCP"],
        salario: "$3.000.000 - $5.500.000",
        imagen: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800",
        tipoTrabajo: "Tiempo Completo",
        modalidad: "Presencial",
        jornada: "Lunes a Domingo",
        contrato: "Indefinido",
        publicado: "Hace 1 semana",
        descripcion: "Restaurante de alta cocina busca chef ejecutivo con experiencia internacional.",
        requisitos: [
            "5+ años como chef ejecutivo",
            "Dominio de cocina internacional",
            "Certificación HACCP",
            "Manejo de equipos"
        ],
    },
    {
        id: "3",
        titulo: "Contador Público",
        empresa: "ContaPlus",
        ubicacion: "Bogotá",
        skills: ["NIIF", "SAP", "Excel Avanzado"],
        salario: "$3.200.000 - $4.800.000",
        imagen: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
        tipoTrabajo: "Tiempo Completo",
        modalidad: "Híbrido",
        jornada: "Lunes a Viernes",
        contrato: "Indefinido",
        publicado: "Hace 3 días",
        descripcion: "Firma contable requiere contador público con conocimiento en NIIF.",
        requisitos: [
            "Título profesional en Contaduría",
            "Tarjeta profesional vigente",
            "Conocimiento NIIF y tributaria",
            "Experiencia mínima 2 años"
        ],
    },
    {
        id: "4",
        titulo: "Enfermero/a Profesional",
        empresa: "Clínica San Rafael",
        ubicacion: "Cali",
        skills: ["UCI", "Urgencias", "BLS"],
        salario: "$2.500.000 - $3.800.000",
        imagen: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800",
        tipoTrabajo: "Tiempo Completo",
        modalidad: "Presencial",
        jornada: "Turnos rotativos",
        contrato: "Indefinido",
        publicado: "Hace 5 días",
        descripcion: "Clínica de alta complejidad busca enfermeros para UCI y urgencias.",
        requisitos: [
            "Título de enfermería profesional",
            "Tarjeta profesional",
            "Experiencia en UCI o urgencias",
            "Certificación BLS vigente"
        ],
    },
    {
        id: "5",
        titulo: "Abogado Corporativo",
        empresa: "Jurídica y Asociados",
        ubicacion: "Bogotá",
        skills: ["Derecho Comercial", "Contratos", "Societario"],
        salario: "$4.000.000 - $6.500.000",
        imagen: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
        tipoTrabajo: "Tiempo Completo",
        modalidad: "Presencial",
        jornada: "Lunes a Viernes",
        contrato: "Indefinido",
        publicado: "Hace 1 día",
        descripcion: "Firma de abogados requiere abogado con experiencia en derecho corporativo.",
        requisitos: [
            "Título de abogado",
            "Tarjeta profesional vigente",
            "5+ años en derecho corporativo",
            "Especialización deseable"
        ],
    },
];

export default function ExplorarScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedVacante, setSelectedVacante] = useState<Vacante | null>(null);
    const [filteredVacantes, setFilteredVacantes] = useState(vacantesData);

    const handleSearch = (text: string) => {
        setSearchQuery(text);

        if (text.trim() === "") {
            setFilteredVacantes(vacantesData);
        } else {
            const filtered = vacantesData.filter(
                (vacante) =>
                    vacante.titulo.toLowerCase().includes(text.toLowerCase()) ||
                    vacante.empresa.toLowerCase().includes(text.toLowerCase()) ||
                    vacante.ubicacion.toLowerCase().includes(text.toLowerCase()) ||
                    vacante.skills.some((skill) =>
                        skill.toLowerCase().includes(text.toLowerCase())
                    )
            );
            setFilteredVacantes(filtered);
        }
    };

    const handleViewDetails = (vacante: Vacante) => {
        setSelectedVacante(vacante);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.colors.background.primary }]}>
                <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
                    Explorar
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

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View
                    style={[
                        styles.searchBar,
                        {
                            backgroundColor: theme.colors.background.secondary,
                            borderColor: theme.colors.border.DEFAULT,
                        },
                    ]}
                >
                    <Search size={20} color={theme.colors.text.secondary} />
                    <TextInput
                        style={[
                            styles.searchInput,
                            { color: theme.colors.text.primary },
                        ]}
                        placeholder="Buscar empleos..."
                        placeholderTextColor={theme.colors.text.secondary}
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                </View>
            </View>

            {/* Lista de vacantes */}
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {filteredVacantes.length > 0 ? (
                    filteredVacantes.map((vacante) => (
                        <VacancyCard
                            key={vacante.id}
                            imagen={vacante.imagen}
                            titulo={vacante.titulo}
                            empresa={vacante.empresa}
                            ubicacion={vacante.ubicacion}
                            skills={vacante.skills}
                            salario={vacante.salario}
                            onPress={() => handleViewDetails(vacante)}
                        />
                    ))
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
                            No se encontraron vacantes
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* Modal de detalle */}
            <Modal
                visible={selectedVacante !== null}
                animationType="slide"
                transparent={false}
                onRequestClose={() => setSelectedVacante(null)}
            >
                {selectedVacante && (
                    <View style={[styles.modalContainer, { backgroundColor: theme.colors.background.primary }]}>
                        {/* Header del modal */}
                        <View style={[styles.modalHeader, { backgroundColor: theme.colors.background.primary }]}>
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => setSelectedVacante(null)}
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
                            {/* Información */}
                            <View style={styles.modalContent}>
                                <Text style={[styles.modalTitle, { color: theme.colors.text.primary }]}>
                                    {selectedVacante.titulo}
                                </Text>
                                <Text style={[styles.modalEmpresa, { color: theme.colors.primary.DEFAULT }]}>
                                    {selectedVacante.empresa}
                                </Text>

                                <View style={styles.modalBadges}>
                                    <View
                                        style={[
                                            styles.badge,
                                            { backgroundColor: theme.colors.primary.DEFAULT + "20" },
                                        ]}
                                    >
                                        <Text style={[styles.badgeText, { color: theme.colors.primary.DEFAULT }]}>
                                            {selectedVacante.tipoTrabajo}
                                        </Text>
                                    </View>
                                    <View style={[styles.badge, { borderColor: theme.colors.primary.DEFAULT }]}>
                                        <Text style={[styles.badgeText, { color: theme.colors.text.primary }]}>
                                            📍 {selectedVacante.ubicacion}
                                        </Text>
                                    </View>
                                    <View style={[styles.badge, { borderColor: theme.colors.primary.DEFAULT }]}>
                                        <Text style={[styles.badgeText, { color: theme.colors.text.primary }]}>
                                            {selectedVacante.modalidad}
                                        </Text>
                                    </View>
                                </View>

                                <Text style={[styles.modalSalary, { color: "#10B981" }]}>
                                    {selectedVacante.salario}
                                </Text>

                                {/* Skills */}
                                <View style={styles.skillsSection}>
                                    <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                                        Habilidades requeridas
                                    </Text>
                                    <View style={styles.skillsContainer}>
                                        {selectedVacante.skills.map((skill, index) => (
                                            <View
                                                key={index}
                                                style={[
                                                    styles.skillBadgeLarge,
                                                    { backgroundColor: theme.colors.primary.DEFAULT },
                                                ]}
                                            >
                                                <Text style={styles.skillTextLarge}>{skill}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Descripción */}
                                <View style={styles.section}>
                                    <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                                        Descripción del trabajo
                                    </Text>
                                    <Text style={[styles.sectionText, { color: theme.colors.text.secondary }]}>
                                        {selectedVacante.descripcion}
                                    </Text>
                                </View>

                                {/* Requisitos */}
                                <View style={styles.section}>
                                    <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                                        Requisitos
                                    </Text>
                                    {selectedVacante.requisitos.map((req, index) => (
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
                                    <View style={[styles.detalle, { borderBottomColor: theme.colors.border.DEFAULT }]}>
                                        <Text style={[styles.detalleLabel, { color: theme.colors.text.secondary }]}>
                                            Jornada:
                                        </Text>
                                        <Text style={[styles.detalleValue, { color: theme.colors.text.primary }]}>
                                            {selectedVacante.jornada}
                                        </Text>
                                    </View>
                                    <View style={[styles.detalle, { borderBottomColor: theme.colors.border.DEFAULT }]}>
                                        <Text style={[styles.detalleLabel, { color: theme.colors.text.secondary }]}>
                                            Contrato:
                                        </Text>
                                        <Text style={[styles.detalleValue, { color: theme.colors.text.primary }]}>
                                            {selectedVacante.contrato}
                                        </Text>
                                    </View>
                                    <View style={[styles.detalle, { borderBottomColor: theme.colors.border.DEFAULT }]}>
                                        <Text style={[styles.detalleLabel, { color: theme.colors.text.secondary }]}>
                                            Publicado:
                                        </Text>
                                        <Text style={[styles.detalleValue, { color: theme.colors.text.primary }]}>
                                            {selectedVacante.publicado}
                                        </Text>
                                    </View>
                                </View>

                                {/* Botón postular */}
                                <TouchableOpacity
                                    style={[
                                        styles.postularButton,
                                        { backgroundColor: theme.colors.primary.DEFAULT },
                                    ]}
                                >
                                    <Text style={styles.postularButtonText}>Postular a esta vacante</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
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
    searchContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        height: 45,
        borderRadius: 22,
        paddingHorizontal: 15,
        gap: 10,
        borderWidth: 1,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        fontFamily: "Montserrat_400Regular",
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 60,
    },
    emptyText: {
        fontSize: 16,
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
    modalContent: {
        padding: 20,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 8,
        fontFamily: "Montserrat_400Regular",
    },
    modalEmpresa: {
        fontSize: 16,
        marginBottom: 16,
        fontFamily: "Montserrat_400Regular",
    },
    modalBadges: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 16,
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
    modalSalary: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 24,
        fontFamily: "Montserrat_400Regular",
    },
    skillsSection: {
        marginBottom: 24,
    },
    skillsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    skillBadgeLarge: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 16,
    },
    skillTextLarge: {
        color: "white",
        fontSize: 13,
        fontWeight: "600",
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
        paddingVertical: 12,
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
    postularButton: {
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 40,
    },
    postularButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Montserrat_400Regular",
    },
});