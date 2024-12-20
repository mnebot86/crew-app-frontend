import { Redirect } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
	children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
	const [hasToken, setHasToken] = useState(false);
	const [loading, setLoading] = useState(true);

	useFocusEffect(
		React.useCallback(() => {
			const checkToken = async () => {
				try {
					const token = await AsyncStorage.getItem("token");
					setHasToken(!!token);
				} catch (error) {
					console.error("Error checking token:", error);
				} finally {
					setLoading(false);
				}
			};

			checkToken();
		}, [])
	);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#A2C428" />
			</View>
		);
	}

	if (!hasToken) {
		return <Redirect href="/register" />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
});
