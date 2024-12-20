import { IAuthCredentials, IAuthResponse  } from "@/interfaces/auth";
import axiosInstance from "./axiosConfig";

export const loginUser = async (credentials: IAuthCredentials): Promise<IAuthResponse> => {
	const { email, password } = credentials;
	const { data } = await axiosInstance.post<IAuthResponse>("/auth/login", { email, password });

	return data;
};

export const registerUser = async (credentials: IAuthCredentials): Promise<IAuthResponse> => {
	const { email, password } = credentials;
    const { data } = await axiosInstance.post<IAuthResponse>("/auth/register", { email, password });

    return data;
}
