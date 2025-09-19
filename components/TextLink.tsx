import React from "react";
import { Text, Pressable, StyleProp, TextStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";

type TextLinkProps = {
    label: string;
    to: string; // puede ser una ruta interna ("Registro") o un link externo ("https://...")
    external?: boolean; // true = abre navegador, false = navega en la app
    style?: StyleProp<TextStyle>;
};

export default function TextLink({ label, to, external = false, style }: TextLinkProps) {
    const navigation = useNavigation<any>();

    const handlePress = () => {
        if (external) {
            Linking.openURL(to); // abre navegador
        } else {
            navigation.navigate(to); // navega en la app
        }
    };

    return (
        <Pressable onPress={handlePress}>
            <Text style={[{ color: "blue", textDecorationLine: "underline" }, style]}>
                {label}
            </Text>
        </Pressable>
    );
}
