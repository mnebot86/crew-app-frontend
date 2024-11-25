import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

interface ThemedButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  lightColor?: string;
  darkColor?: string;
  textStyle?: object;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  onPress,
  lightColor,
  darkColor,
  textStyle,
  style,
  ...props
}) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "buttonBackground"
  );
  const textColor = useThemeColor(
    { light: undefined, dark: undefined },
    "buttonText"
  );

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
      {...props}
    >
      <Text style={[styles.text, { color: textColor }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
