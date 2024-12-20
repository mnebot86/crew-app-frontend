import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { loginUser, registerUser } from "@/api/auth";
import { IAuthCredentials, IAuthResponse } from "@/interfaces/auth";
import { useDispatch } from "react-redux";
import { setAuthState } from "@/store/slices/auth";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLogin = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const mutation = useMutation({
		mutationFn: loginUser,
		onSuccess: async (data) => {
			try {
				console.log("Login successful:", data.access_token);

				await AsyncStorage.setItem('token', data.access_token);

				dispatch(
					setAuthState({
						isAuthenticated: true,
						token: data.access_token,
						user: data.user,
					})
				);

				router.replace('/(tabs)');
			} catch (error) {
				console.error("Error storing login data:", error);
			}
		},
		onError: (error) => {
			console.error("Error logging in:", error);
		},
	});

	return mutation;
};

export const useSignUp = (): UseMutationResult<IAuthResponse, Error, IAuthCredentials> => {
	const router = useRouter();
	const dispatch = useDispatch();

	return useMutation<IAuthResponse, Error, IAuthCredentials>({
		mutationFn: registerUser,
		onSuccess: async (data) => {
			try {
				await AsyncStorage.setItem('token', data.access_token);

				dispatch(
					setAuthState({
						isAuthenticated: true,
						token: data.access_token,
						user: data.user,
					})
				);
				router.replace('/(tabs)');
			} catch (error) {
				console.error("Error storing sign-up data:", error);
			}
		},
		onError: (error) => {
			console.error("Sign-up failed:", error);
		},
	});
};

export const useLogout = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const logout = async () => {
		try {
			await AsyncStorage.removeItem('token');

			dispatch(
				setAuthState({
					isAuthenticated: false,
					token: null,
					user: null,
				})
			);

			router.replace("/register");
		} catch (error) {
			console.error("Error during logout:", error);
		}
	};

	return logout;
};
