import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

interface Props {
	children: React.ReactNode;
}

const AvoidKeyboard = ({ children }: Props) => {
	const behavior = Platform.OS === "ios" ? "padding" : "height";
	return (
		<KeyboardAvoidingView behavior={behavior} style={{ flex: 1 }}>
			{children}
		</KeyboardAvoidingView>
	);
};

export default AvoidKeyboard;
