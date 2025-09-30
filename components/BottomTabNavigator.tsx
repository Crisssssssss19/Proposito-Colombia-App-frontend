// BottomTabNavigator.tsx - Barra de navegación inferior
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Briefcase, Heart, Search, User } from "lucide-react-native";
import { useTheme } from "../context/ThemeContext";

// Importar tus pantallas
import VacantesScreen from "../pages/VacantesScreen";
import PostulacionesScreen from "../pages/PostulacionesScreen";
import ExplorarScreen from "../pages/ExplorarScreen";
import MatchesScreen from "../pages/MatchesScreen";
// import PerfilScreen from "../pages/PerfilScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    const { theme } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary.DEFAULT,
                tabBarInactiveTintColor: theme.colors.text.secondary,
                tabBarStyle: {
                    backgroundColor: theme.colors.background.primary,
                    borderTopColor: theme.colors.border.DEFAULT,
                    borderTopWidth: 1,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontFamily: "Montserrat_400Regular",
                },
            }}
        >
            <Tab.Screen
                name="Inicio"
                component={VacantesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Postulaciones"
                component={PostulacionesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Briefcase size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Matches"
                component={MatchesScreen} // Cambiar cuando tengas MatchesScreen
                options={{
                    tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Explorar"
                component={ExplorarScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={VacantesScreen} // Cambiar cuando tengas PerfilScreen
                options={{
                    tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
}