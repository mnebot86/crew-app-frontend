import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ThemeHelperTextProps {
	message?: string;
}

const ThemeHelperText: React.FC<ThemeHelperTextProps> = ({ message }) => {
	const textColor = useThemeColor({}, "helperText");

	if (!message) return null;

	return (
		<View style={styles.container}>
			<Text style={[styles.helperText, { color: textColor }]}>{message}</Text>
		</View>
	);
};

export default ThemeHelperText;

const SPACING = 8;

const styles = StyleSheet.create({
	container: {
		marginTop: SPACING / 2,
		paddingLeft: 10,
	},
	helperText: {
		fontSize: 12,
		lineHeight: 16,
	},
});
