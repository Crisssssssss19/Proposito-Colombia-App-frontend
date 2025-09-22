import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

interface FormFieldProps {
    label: string;
    icon?: string;
    children: React.ReactNode;
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle;
    required?: boolean;
}

export default function FormField({
                              label,
                              icon,
                              children,
                              containerStyle,
                              labelStyle,
                              required = false
                          }: FormFieldProps) {
    const { theme } = useTheme();

    return (
        <View style={[styles.fieldContainer, containerStyle]}>
            <View style={styles.fieldLabel}>
                {icon && (
                    <Ionicons name={icon as any} size={20} color={theme.colors.text.secondary} />
                )}
                <Text style={[
                    styles.labelText,
                    { color: theme.colors.text.primary },
                    labelStyle
                ]}>
                    {label}{required && " *"}
                </Text>
            </View>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    fieldContainer: {
        marginBottom: 20,
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
});
