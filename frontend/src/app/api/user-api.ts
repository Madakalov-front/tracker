import { type UserType } from "@/shared/types";
import { baseApi } from "./base-api";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation<
            { message: string; user: UserType },
            UserType
        >({
            query: (body) => ({
                url: "/users",
                method: "POST",
                body,
            }),
        }),
        login: builder.mutation<
            { message: string; user: UserType },
            { email: string; password: string }
        >({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body,
            }),
        }),
        getMe: builder.query<UserType, void>({
            query: () => "/me",
        }),
    }),
    overrideExisting: false,
});

export const { useCreateUserMutation, useLoginMutation, useGetMeQuery, useLazyGetMeQuery } = userApi;
