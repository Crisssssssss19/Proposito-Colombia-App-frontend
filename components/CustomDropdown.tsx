import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

interface CustomDropdownProps {
    placeholder: string;
    value?: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export default function CustomDropdown({
                                   placeholder,
                                   value,
                                   onPress,
                                   style,
                                   textStyle
                               }: CustomDropdownProps) {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.dropdown,
                {
                    borderColor: theme.colors.primary.DEFAULT,
                    backgroundColor: theme.colors.background.secondary,
                },
                style
            ]}
            onPress={onPress}
        >
            <Text style={[
                styles.dropdownText,
                {
                    color: value
                        ? theme.colors.text.primary
                        : theme.colors.text.secondary
                },
                textStyle
            ]}>
                {value || placeholder}
            </Text>
            <Ionicons name="chevron-down" size={20} color={theme.colors.primary.DEFAULT} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dropdownText: {
        fontSize: 16,
        flex: 1,
        fontFamily: "Montserrat_400Regular",
    },
});