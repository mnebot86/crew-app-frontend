import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
	async (config) => {
		try {
			const token = await AsyncStorage.getItem("token");

			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		} catch (error) {
			console.error("Error getting token:", error);
		}

		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
	  console.error("API error:", error);
  
	  if (error.response) {
		const { status, data } = error.response;
  
		// if (status === 401) {
		//   await AsyncStorage.removeItem("token");
		// }
	  }
  
	  return Promise.reject(error);
	}
  );

export default axiosInstance;
