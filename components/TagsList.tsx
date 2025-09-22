import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

interface TagsListProps {
    tags: string[];
    onRemove: (index: number) => void;
    tagStyle?: any;
    textStyle?: any;
}

export default function TagsList({ tags, onRemove, tagStyle, textStyle }: TagsListProps) {
    const { theme } = useTheme();

    if (tags.length === 0) return null;

    return (
        <View style={styles.tagsContainer}>
            {tags.map((tag, index) => (
                <View
                    key={index}
                    style={[
                        styles.tag,
                        { backgroundColor: theme.colors.primary.DEFAULT + '20' },
                        tagStyle
                    ]}
                >
                    <Text style={[
                        styles.tagText,
                        { color: theme.colors.primary.DEFAULT },
                        textStyle
                    ]}>
                        {tag}
                    </Text>
                    <TouchableOpacity
                        onPress={() => onRemove(index)}
                        style={styles.removeButton}
                    >
                        <Ionicons name="close" size={14} color={theme.colors.primary.DEFAULT} />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        gap: 6,
    },
    tagText: {
        fontSize: 14,
        fontFamily: "Montserrat_400Regular",
    },
    removeButton: {
        padding: 2,
    },
});