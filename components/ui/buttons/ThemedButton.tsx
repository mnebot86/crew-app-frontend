import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  View,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SPINNER_LIGHT, SPINNER_DARK } from "@/constants/Colors";

interface ThemedButtonProps extends TouchableOpacityProps {
  title?: string;
  onPress: () => void;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  lightColor?: string;
  darkColor?: string;
  textStyle?: object;
  startLoading?: boolean;
  endLoading?: boolean;
  loadingText?: string;
  loading?: boolean;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  onPress,
  iconStart,
  iconEnd,
  lightColor,
  darkColor,
  textStyle,
  style,
  startLoading = false,
  endLoading = false,
  loadingText,
  loading = false,
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
  const spinnerColor = useThemeColor(
    { light: SPINNER_LIGHT, dark: SPINNER_DARK },
    "spinner"
  );

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
      disabled={loading} // Disable the button while loading
      {...props}
    >
      <View style={styles.content}>
        {startLoading && loading && (
          <ActivityIndicator style={styles.spinner} color={spinnerColor} />
        )}
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {loading && loadingText ? loadingText : title}
        </Text>
        {endLoading && loading && (
          <ActivityIndicator style={styles.spinner} color={spinnerColor} />
        )}
        {!loading && iconStart}
        {!loading && iconEnd}
      </View>
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
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 8,
  },
  spinner: {
    marginHorizontal: 4,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
