import type { UserType } from "@/shared/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: UserType | null;
}

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserType>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export const authReducer =  authSlice.reducer;
