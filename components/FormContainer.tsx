import React from "react";
import { View, StyleSheet, ScrollView, ViewStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";
import ProgressHeader  from "./ProgressHeader";
import Golondrina  from "./Golondrina";
import  Footer  from "./Footer";

interface FormContainerProps {
    children: React.ReactNode;
    onGoBack: () => void;
    progress: number;
    title: string;
    showLogo?: boolean;
    showFooter?: boolean;
    containerStyle?: ViewStyle;
    contentStyle?: ViewStyle;
}

export default function FormContainer({
                                  children,
                                  onGoBack,
                                  progress,
                                  title,
                                  showLogo = true,
                                  showFooter = false,
                                  containerStyle,
                                  contentStyle
                              }: FormContainerProps) {
    const { theme } = useTheme();

    return (
        <View style={[
            styles.container,
            { backgroundColor: theme.colors.background.primary },
            containerStyle
        ]}>
            <ProgressHeader onGoBack={onGoBack} progress={progress} />

            <View style={[styles.content, contentStyle]}>
                {showLogo && (
                    <View style={styles.logoSection}>
                        <Golondrina title={title} />
                    </View>
                )}

                <ScrollView
                    style={styles.formSection}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                >
                    {children}
                </ScrollView>
            </View>

            {showFooter && (
                <View style={styles.footerSection}>
                    <Footer />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: "space-between",
    },
    logoSection: {
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
    },
    formSection: {
        flex: 1,
        paddingVertical: 20,
    },
    footerSection: {
        alignItems: "center",
        paddingBottom: 20,
    },
});