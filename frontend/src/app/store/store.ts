import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/base-api";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { authReducer } from "./auth-slice";



export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector