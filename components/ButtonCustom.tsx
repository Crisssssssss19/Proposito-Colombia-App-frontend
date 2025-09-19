// ButtonCustom.tsx
import { Pressable, Text, PressableProps, StyleProp, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";

type ButtonCustomProps = PressableProps & {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
};

export default function ButtonCustom({
                                         onPress,
                                         children,
                                         style,
                                         textStyle,
                                         ...rest
                                     }: ButtonCustomProps) {
    const { theme } = useTheme();

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                {
                    backgroundColor: theme.colors.primary.DEFAULT,
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    height: 50,
                    width: 280,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    transform: [{ scale: pressed ? 1.15 : 1 }], // <-- aquí se hace más grande
                },
                style,
            ]}
            {...rest}
        >
            <Text
                style={[
                    {
                        fontSize: 16,
                        fontWeight: "600",
                        color: theme.colors.text.primary,
                    },
                    textStyle,
                ]}
            >
                {children}
            </Text>
        </Pressable>
    );
}
