import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    role: null,
    isAuthenticated: false,
    bootstrapped: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.role = action.payload.role?.toUpperCase();
            state.isAuthenticated = true;
            state.bootstrapped = true;
        },
        clearAuth: (state) => {
            state.user = null;
            state.role = null;
            state.isAuthenticated = false;
            state.bootstrapped = true;
        },
        setBootstrapped: (state) => {
            state.bootstrapped = true;
        },
    },
});

export const { setUser, clearAuth, setBootstrapped } = authSlice.actions;
export default authSlice.reducer;
