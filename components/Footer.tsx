import {Text, View} from "react-native";
import {useTheme} from "../context/ThemeContext";

export default function Footer() {
    const { theme } = useTheme();
    return (
        <View>
            <Text style={{ color: theme.colors.text.secondary, fontSize: 16 }}>
                Powered by @CIEUniMagdalena2025
            </Text>
        </View>
    );
}