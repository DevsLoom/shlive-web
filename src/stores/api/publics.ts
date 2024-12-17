import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { API_URL, defaultHeaders } from "../../constants/urls";

const publics = createApi({
    reducerPath: "publicsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        headers: defaultHeaders,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    keepUnusedDataFor: 10,
    refetchOnReconnect: true,
    tagTypes: ["DynamicPages", "DynamicPage"],
    endpoints: (builder) => ({
        fetchDynamicPages: builder.query({
            query: (params) => `public/dynamic-pages?${params}`,
            transformResponse: (response: { data: object }) => response.data,
            providesTags: ["DynamicPages"],
        }),
        fetchDynamicPage: builder.query({
            query: (id) => `public/dynamic-pages/${id}`,
            transformResponse: (response: { data: object }) => response.data,
            providesTags: ["DynamicPage"],
        }),
    }),
});

export const { useFetchDynamicPagesQuery, useFetchDynamicPageQuery } = publics;

export default publics;
