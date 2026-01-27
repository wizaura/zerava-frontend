import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    bootstrapped: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.bootstrapped = true;
        },
        clearAuth: (state) => {
            state.user = null;
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
