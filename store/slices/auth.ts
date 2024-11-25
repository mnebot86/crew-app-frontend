import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/interfaces/user";

interface AuthState {
	isAuthenticated: boolean;
	user: null | IUser;
	token: null | string;
}

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuthState: (state, action) => {
			state.isAuthenticated = action.payload.isAuthenticated;
			state.token = action.payload.token;
		},
		clearAuthState: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
		},
	},
});

export const { setAuthState, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
