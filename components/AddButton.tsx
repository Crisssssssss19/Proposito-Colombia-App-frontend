import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

interface AddButtonProps {
    text: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    iconSize?: number;
}

export default function AddButton({
                              text,
                              onPress,
                              style,
                              textStyle,
                              iconSize = 16
                          }: AddButtonProps) {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.addButton,
                { backgroundColor: theme.colors.primary.DEFAULT },
                style
            ]}
            onPress={onPress}
        >
            <Ionicons name="add" size={iconSize} color="white" />
            <Text style={[styles.addButtonText, textStyle]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"center",
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
});