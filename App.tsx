import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoadingScreen from "./pages/LoadingScreen";
import AccessScreen from "./pages/AccessScreen";
import LoginScreen from "./pages/LoginScreen";
import UserTypeScreen from "./pages/UserTypeScreen"; // 👈 Nueva pantalla
import RegisterAspirantScreen from "./pages/RegisterAspirantScreen"; // 👈 Nueva pantalla
import RegisterCompanyScreen from "./pages/RegisterCompanyScreen"; // 👈 Nueva pantalla
import { ThemeProvider } from "./context/ThemeContext";
import PhoneVerificationScreen from "./pages/PhoneVerificationScreen";
import WelcomeScreen from "./pages/WelcomeScreen";
import ProfilePhotoScreen from "./pages/ProfilePhotoScreen";
import EducationScreen from "./pages/EducationScreen";
import BiographyScreen from "./pages/BiographyScreen";
import CVScreen from "./pages/CVScreen";

// 👇 Actualizar tipos para incluir todas las pantallas
export type RootStackParamList = {
    LoadingScreen: undefined;
    AccessScreen: undefined;
    LoginScreen: undefined;
    UserTypeScreen: undefined;
    RegisterAspirantScreen: undefined;
    RegisterCompanyScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <NavigationContainer>
                    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
                        <Stack.Navigator
                            initialRouteName="LoadingScreen"
                            screenOptions={{ headerShown:false}}
                        >
                            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
                            <Stack.Screen name="AccessScreen" component={AccessScreen} />
                            <Stack.Screen name="LoginScreen" component={LoginScreen} />
                            <Stack.Screen name="UserTypeScreen" component={UserTypeScreen} />
                            <Stack.Screen name="RegisterAspirantScreen" component={RegisterAspirantScreen} />
                            <Stack.Screen name="RegisterCompanyScreen" component={RegisterCompanyScreen} />
                            <Stack.Screen name="PhoneVerificationScreen" component={PhoneVerificationScreen}/>
                            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
                            <Stack.Screen name="ProfilePhotoScreen" component={ProfilePhotoScreen}/>
                            <Stack.Screen name="EducationScreen" component={EducationScreen}/>
                            <Stack.Screen name="BiographyScreen" component={BiographyScreen}/>
                            <Stack.Screen name='CVScreen' component={CVScreen}/>
                        </Stack.Navigator>
                        <StatusBar style="auto" />
                    </SafeAreaView>
                </NavigationContainer>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}