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
                    height: 50,
                    borderRadius: 8,
                    marginVertical:10,
                    justifyContent: "center",
                    alignItems: "center",
                    transform: [{ scale: pressed ? 1.15 : 1 }],
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
