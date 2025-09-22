import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

interface ItemCardProps {
    title: string;
    subtitle?: string;
    description?: string;
    onRemove: () => void;
    style?: ViewStyle;
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
    descriptionStyle?: TextStyle;
}

export default function ItemCard({
                             title,
                             subtitle,
                             description,
                             onRemove,
                             style,
                             titleStyle,
                             subtitleStyle,
                             descriptionStyle
                         }: ItemCardProps) {
    const { theme } = useTheme();

    return (
        <View
            style={[
                styles.itemCard,
                {
                    backgroundColor: theme.colors.background.secondary,
                    borderColor: theme.colors.border.DEFAULT
                },
                style
            ]}
        >
            <View style={styles.itemInfo}>
                <Text style={[
                    styles.itemTitle,
                    { color: theme.colors.text.primary },
                    titleStyle
                ]}>
                    {title}
                </Text>
                {subtitle && (
                    <Text style={[
                        styles.itemSubtitle,
                        { color: theme.colors.text.secondary },
                        subtitleStyle
                    ]}>
                        {subtitle}
                    </Text>
                )}
                {description && (
                    <Text style={[
                        styles.itemDescription,
                        { color: theme.colors.text.secondary },
                        descriptionStyle
                    ]}>
                        {description}
                    </Text>
                )}
            </View>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={onRemove}
            >
                <Ionicons name="trash-outline" size={16} color={theme.colors.accent.coral} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    itemCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 12,
    },
    itemInfo: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: "Montserrat_400Regular",
        marginBottom: 2,
    },
    itemSubtitle: {
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
        marginBottom: 2,
    },
    itemDescription: {
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
    },
    removeButton: {
        padding: 4,
    },
});