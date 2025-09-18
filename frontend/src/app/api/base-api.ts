import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "api",
    tagTypes: ["User", 'Task'],
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",
        credentials: "include",
        prepareHeaders: (headers) => {
            return headers;
        },
    }),
    endpoints: () => ({}),
});
