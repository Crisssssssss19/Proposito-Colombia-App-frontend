import React from "react";
import { View } from "react-native";
import Golondrina from "../components/Golondrina";
import ButtonCustom from "../components/ButtonCustom";
import { useTheme } from "../context/ThemeContext";
import InfoSection from "../components/InfoSection";
import Footer from "../components/Footer";
import PropositosHeader from "../components/PropositosHeader";

export default function AccessScreen() {
    const frase = "Volando hacia\nnuevas oportunidades";
    const { theme } = useTheme();

    return (
        <View style={{flex:1}}>
            <PropositosHeader/>
            {/* Logo + frase */}
            <View style={{
                flex: 1,
                justifyContent: "space-between", // 👈 reparte arriba/medio/abajo
                alignItems: "center",
                paddingVertical: 40, // espacio para no pegar demasiado a los bordes
            }}>
                <Golondrina title={frase} />

                {/* Botones */}
                <View
                    style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 20,
                    }}
                >
                    <ButtonCustom textStyle={{ color: "white" }} onPress={() => {}}>
                        Iniciar Sesión
                    </ButtonCustom>
                    <ButtonCustom textStyle={{ color: "white" }} onPress={() => {}}>
                        Registrarse
                    </ButtonCustom>
                </View>

                {/* Info abajo */}
                <View style={{ alignItems: "center"}}>
                    <InfoSection />
                    <Footer/>
                </View>
            </View>

        </View>
    );
}
