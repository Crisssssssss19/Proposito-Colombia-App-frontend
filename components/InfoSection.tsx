import { Text, View, Linking,StyleSheet } from "react-native";
import {useTheme} from "../context/ThemeContext";


export default function InfoSection() {
    const { theme } = useTheme();
    const handlePress = () => {
        Linking.openURL("https://www.jcdnconsulting.com/propositos-colombia");
    };

    return (
        <View style={{ marginTop: 40, alignItems: "center"}}>
            <Text style={{ color: theme.colors.text.secondary,fontSize:16,fontFamily:"Montserrat_400Regular"}}>
                Haz clic{" "}
                <Text
                    onPress={handlePress}
                    style={{ color: "blue", textDecorationLine: "underline" , fontFamily:"Montserrat_400Regular"}}
                >
                    aquí
                </Text>{" "}
                para saber más de
            </Text>
            <Text style={{ color: theme.colors.text.secondary, fontSize:16, fontFamily:"Montserrat_400Regular"}}>
                Propósitos Colombia
            </Text>
        </View>
    );
}
