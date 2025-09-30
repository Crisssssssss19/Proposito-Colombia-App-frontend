// FloatingActionMenu.tsx - Componente reutilizable del menú flotante
import React from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Eye, Heart, ChevronDown, ChevronUp, Share2 } from "lucide-react-native";
import { useTheme } from "../context/ThemeContext";

interface FloatingActionMenuProps {
    isLiked: boolean;
    showInfo: boolean;
    onEyePress: () => void;
    onLikePress: () => void;
    onToggleInfo: () => void;
    onSharePress: () => void;
}

export default function FloatingActionMenu({
                                               isLiked,
                                               showInfo,
                                               onEyePress,
                                               onLikePress,
                                               onToggleInfo,
                                               onSharePress,
                                           }: FloatingActionMenuProps) {
    const { theme } = useTheme();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: "white" }]}
                onPress={onEyePress}
                activeOpacity={0.7}
            >
                <Eye size={22} color={theme.colors.primary.DEFAULT} />
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.button,
                    styles.heartButton,
                    {
                        backgroundColor: theme.colors.accent.coral,
                    },
                ]}
                onPress={onLikePress}
                activeOpacity={0.7}
            >
                <Heart
                    size={24}
                    color="white"
                    fill="white"
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: "white" }]}
                onPress={onToggleInfo}
                activeOpacity={0.7}
            >
                {showInfo ? (
                    <ChevronUp size={22} color={theme.colors.primary.DEFAULT} />
                ) : (
                    <ChevronDown size={22} color={theme.colors.primary.DEFAULT} />
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: "white" }]}
                onPress={onSharePress}
                activeOpacity={0.7}
            >
                <Share2 size={22} color={theme.colors.primary.DEFAULT} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        right: 20,
        top: 20,
        gap: 16,
        zIndex: 10,
    },
    button: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    heartButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
});