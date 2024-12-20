import { IUser } from "./user";

export interface IAuthCredentials {
	email: string;
	password: string;
}

export interface IAuthResponse {
	access_token: string;
	user: IUser;
}
