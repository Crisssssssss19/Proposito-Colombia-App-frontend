import React from "react";
import {Pressable, Text, View} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Golondrina from "../components/Golondrina";
import ButtonCustom from "../components/ButtonCustom";
import { useTheme } from "../context/ThemeContext";
import InfoSection from "../components/InfoSection";
import Footer from "../components/Footer";

type RootStackParamList = {
    LoginScreen: undefined;
    UserTypeScreen: undefined;
    LoadingScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AccessScreen() {
    const frase = "Volando hacia\nnuevas oportunidades";
    const { theme } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    const handleLogin = () => {
        navigation.navigate("LoginScreen");
    };

    const handleRegister = () => {
        navigation.navigate("UserTypeScreen");
    };

    const handlerLoading = () =>{
        navigation.navigate("LoadingScreen");
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.colors.background.primary
        }}>
            <View style={{
                flex: 1,
                justifyContent: "space-between",
                paddingHorizontal: 30,
            }}>
                <Pressable onPress={handlerLoading} style={{alignItems: "center", paddingTop: 20, paddingBottom:40}}>
                    <Golondrina  />
                    <Text style={{ fontSize: 16,
                        fontFamily: "Montserrat_400Regular",
                        textAlign: "center",
                        marginTop: 20,color: theme.colors.text.secondary }}>
                        {frase}
                    </Text>
                </Pressable>

                <View style={{flex: 1, justifyContent:"center", paddingBottom:80}}>
                    <View
                        style={{
                            position: "relative",
                            marginBottom: 20,
                        }}
                    >

                            <ButtonCustom
                                textStyle={{ color: "white" }}
                                onPress={handleLogin}
                            >
                                Iniciar Sesión
                            </ButtonCustom>
                            <ButtonCustom
                                textStyle={{ color: "white" }}
                                onPress={handleRegister}
                            >
                                Registrarse
                            </ButtonCustom>
                        </View>
                </View>


                <View style={{ alignItems: "center"}}>
                    <View style={{marginBottom:20}}>
                        <InfoSection/>
                    </View>
                        <Footer/>
                </View>
            </View>
        </View>
    );
}