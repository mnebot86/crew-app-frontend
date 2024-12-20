import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
	useSharedValue,
	withDelay,
	withTiming
} from "react-native-reanimated";

import { loginUser, registerUser } from "@/api/auth";
import { ThemedButton } from "@/components/ui/buttons";
import {
	AvoidKeyboard,
	ScreenLayout,
	ThemedView,
} from "@/components/ui/layout";
import FadeInWrapper from "@/components/ui/layout/FadeInWrapper";
import ShakingContainer from "@/components/ui/layout/ShakingContainer";
import SwapTransitionWrapper from "@/components/ui/layout/SwapTransitionWrapper";
import { ThemedInput } from "@/components/ui/reuseable";
import SVGDrawer from "@/components/ui/reuseable/SvgDrawer";
import { CREW_LOGO_PATHS } from "@/components/ui/svg/crew-logo";
import { ThemedText } from "@/components/ui/text/ThemedText";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";

const Register = () => {
	const theme = useTheme();
	const fillOpacity = useSharedValue(0);
	const router = useRouter();

	const [isLoginMode, setLoginMode] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [shakeKey, setShakeKey] = useState(0);

	const clearInputs = useCallback(() => {
		setEmail("");
		setPassword("");
	}, []);

	const incrementShakeKey = useCallback(() => {
		setShakeKey((prev) => prev + 1);
	}, []);

	const loginMutation = useMutation({
		mutationFn: loginUser,
		onSuccess: async (data) => {
			await AsyncStorage.setItem("token", data.access_token);
			clearInputs();

			router.replace("/(tabs)");
		},
		onError: () => {
			clearInputs();
			incrementShakeKey();
		},
	});

	const signUpMutation = useMutation({
		mutationFn: registerUser,
		onSuccess: async (data) => {
			await AsyncStorage.setItem("token", data.access_token);
			router.replace("/(tabs)");
		},
		onError: () => {
			clearInputs();
			incrementShakeKey();
		},
	});

	const isLoading = useMemo(
		() => loginMutation.isPending || signUpMutation.isPending,
		[loginMutation.isPending, signUpMutation.isPending]
	);

	useEffect(() => {
		fillOpacity.value = withDelay(1000, withTiming(1, { duration: 1200 }));
	}, [fillOpacity]);

	const toggleLoginMode = () => {
		setShakeKey(0);
		setLoginMode(!isLoginMode);
		clearInputs();
	};

	const handleFormSubmit = useCallback(async () => {
		loginMutation.reset();

		if (isLoginMode) {
			loginMutation.mutate({ email, password });
		} else {
			signUpMutation.mutate({ email, password });
		}
	}, [isLoginMode, email, password, loginMutation, signUpMutation]);

	const logo = CREW_LOGO_PATHS.reverse();

	return (
		<AvoidKeyboard>
			<ScreenLayout>
				<ThemedView style={styles.header}>
					<SVGDrawer
						paths={logo}
						strokeWidth={2}
						strokeColor="black"
						fillColor="blue"
						animationDuration={800}
						animationDelay={300}
						height={300}
						width={300}
					/>
				</ThemedView>

				<SwapTransitionWrapper isActive={!isLoginMode} duration={300}>
					<ThemedView>
						<ThemedText style={styles.title}>
							{isLoginMode ? "Login" : "Sign up"}
						</ThemedText>
					</ThemedView>
				</SwapTransitionWrapper>

				<ThemedView style={styles.inputContainer}>
					<ShakingContainer
						style={styles.inputsWrapper}
						triggerShake={shakeKey}
					>
						<ThemedInput
							value={email}
							placeholder="Email"
							onChangeText={setEmail}
							autoCapitalize="none"
						/>

						<ThemedInput
							value={password}
							placeholder="Password"
							onChangeText={setPassword}
							secureTextEntry
							autoCapitalize="none"
						/>
					</ShakingContainer>

					<ThemedButton
						style={{ marginTop: 20 }}
						title="Continue with Email"
						onPress={handleFormSubmit}
						loading={isLoading}
						disabled={isLoading}
					/>
				</ThemedView>

				<ThemedView style={styles.dividerWrap}>
					<View
						style={[
							styles.divider,
							{ backgroundColor: theme.dark ? "white" : "black" },
						]}
					></View>
					<ThemedText style={styles.dividerText}>or</ThemedText>
					<View
						style={[
							styles.divider,
							{ backgroundColor: theme.dark ? "white" : "black" },
						]}
					></View>
				</ThemedView>

				<ThemedView style={styles.buttonsContainer}>
					<ThemedButton
						title="Continue with Apple"
						onPress={() => console.log("Button Pressed")}
						iconStart={<MaterialIcons name="apple" size={24} color="black" />}
					/>

					<ThemedButton
						title="Continue with Google"
						onPress={() => console.log("Button Pressed")}
						iconStart={<AntDesign name="google" size={24} color="red" />}
					/>

					<ThemedButton
						title="Continue with Facebook"
						onPress={() => console.log("Button Pressed")}
						iconStart={<FontAwesome name="facebook-f" size={24} color="blue" />}
					/>
				</ThemedView>

				<ThemedView style={styles.footer}>
					<SwapTransitionWrapper isActive={!isLoginMode} duration={300}>
						<ThemedView style={styles.footerTextWrapper}>
							<ThemedText style={styles.footerText}>
								{isLoginMode
									? "Don't have an account?"
									: "Already have an account?"}
								<ThemedText style={styles.footerLink} onPress={toggleLoginMode}>
									{isLoginMode ? " Sign up" : " Login"}
								</ThemedText>
							</ThemedText>
						</ThemedView>
					</SwapTransitionWrapper>

					<FadeInWrapper
						isVisible={shakeKey >= 3 && isLoginMode}
						duration={500}
					>
						<ThemedText
							style={[styles.footerText, styles.forgotPassword]}
							onPress={() => console.log("Forgot password pressed")}
						>
							Forgot your password?
						</ThemedText>
					</FadeInWrapper>
				</ThemedView>
			</ScreenLayout>
		</AvoidKeyboard>
	);
};

export default Register;

const styles = StyleSheet.create({
	header: {
		alignItems: "center",
		marginBottom: 20,
		flex: 0.4,
		position: "relative",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginTop: 30,
		marginBottom: 16,
	},
	inputContainer: {
		marginBottom: 20,
	},
	inputsWrapper: {
		gap: 8,
	},
	buttonsContainer: {
		marginTop: 20,
		gap: 8,
		marginBottom: 20,
	},
	dividerWrap: {
		minWidth: 300,
		flexDirection: "row",
		alignItems: "center",
	},
	divider: {
		flexDirection: "row",
		flex: 1,
		height: 3,
	},
	dividerText: {
		marginHorizontal: 8,
	},
	footer: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	footerTextWrapper: {
		alignItems: "flex-start",
	},
	footerText: {
		fontSize: 14,
		color: "gray",
		opacity: 0.7,
		textAlign: "left",
	},
	footerLink: {
		color: "blue",
		textDecorationLine: "underline",
	},
	forgotPassword: {
		marginTop: 10,
		color: "red",
		textDecorationLine: "underline",
		textAlign: "center",
	},
});
