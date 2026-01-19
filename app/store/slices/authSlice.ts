import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    bootstrapped: false, 
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user ?? state.user;
            state.accessToken = action.payload.accessToken ?? state.accessToken;
            state.isAuthenticated = true;
            state.bootstrapped = true;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.bootstrapped = true;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
