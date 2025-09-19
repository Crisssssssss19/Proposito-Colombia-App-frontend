import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoadingScreen from "./pages/LoadingScreen";
import AccessScreen from "./pages/AccessScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
                    <ThemeProvider>
                        <Stack.Navigator
                            initialRouteName="LoadingScreen"
                            screenOptions={{ headerShown: false }}
                        >
                            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
                            <Stack.Screen name="AccessScreen" component={AccessScreen} />
                        </Stack.Navigator>
                    </ThemeProvider>
                    <StatusBar style="auto" />
                </SafeAreaView>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
