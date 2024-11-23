import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: false,
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.isAuthenticated = action.payload.isAuthenticated;
			state.token = action.payload.token;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.token = null;
		},
	},
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
