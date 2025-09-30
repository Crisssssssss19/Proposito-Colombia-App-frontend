// VacancyCard.tsx - Componente reutilizable para tarjetas de vacantes
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

interface VacancyCardProps {
    imagen: string;
    titulo: string;
    empresa: string;
    ubicacion: string;
    skills: string[];
    salario: string;
    onPress: () => void;
}

export default function VacancyCard({
                                        imagen,
                                        titulo,
                                        empresa,
                                        ubicacion,
                                        skills,
                                        salario,
                                        onPress,
                                    }: VacancyCardProps) {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.card,
                {
                    backgroundColor: theme.colors.background.primary,
                    borderColor: theme.colors.border.DEFAULT,
                },
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Image source={{ uri: imagen }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <Text
                    style={[styles.cardTitle, { color: theme.colors.text.primary }]}
                    numberOfLines={2}
                >
                    {titulo}
                </Text>
                <Text
                    style={[styles.cardSubtitle, { color: theme.colors.text.secondary }]}
                    numberOfLines={1}
                >
                    {empresa} · {ubicacion}
                </Text>
                <View style={styles.cardSkills}>
                    {skills.slice(0, 3).map((skill, index) => (
                        <View
                            key={index}
                            style={[
                                styles.skillBadge,
                                { backgroundColor: theme.colors.primary.DEFAULT },
                            ]}
                        >
                            <Text style={styles.skillText}>{skill}</Text>
                        </View>
                    ))}
                </View>
                <Text style={[styles.cardSalary, { color: "#10B981" }]}>
                    {salario}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        marginBottom: 16,
        borderRadius: 12,
        borderWidth: 1,
        overflow: "hidden",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardImage: {
        width: 100,
        height: 120,
    },
    cardContent: {
        flex: 1,
        padding: 12,
        justifyContent: "space-between",
    },
    cardTitle: {
        fontSize: 14,
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
        fontSize: 13,
        fontWeight: "700",
        fontFamily: "Montserrat_400Regular",
    },
});