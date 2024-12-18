import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, defaultHeaders } from "../../../constants/urls";
import { RootState } from "../..";

const dynamicPages = createApi({
    reducerPath: "adminDynamicPagesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        headers: defaultHeaders,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    keepUnusedDataFor: 10,
    refetchOnReconnect: true,
    tagTypes: ["DynamicPages", "DynamicPage"],
    endpoints: (builder) => ({
        fetchDynamicPages: builder.query({
            query: (params) => `admin/dynamic-pages?${params}`,
            transformResponse: (response: { data: object }) => response.data,
            providesTags: ["DynamicPages"],
        }),
        fetchDynamicPage: builder.query({
            query: (id) => `admin/dynamic-pages/${id}`,
            transformResponse: (response: { data: object }) => response.data,
            providesTags: ["DynamicPage"],
        }),
        createDynamicPage: builder.mutation({
            query: (data) => ({
                url: "admin/dynamic-pages",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["DynamicPages"],
        }),
        updateDynamicPage: builder.mutation({
            query: (data) => ({
                url: `admin/dynamic-pages/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["DynamicPages"],
        }),
        deleteDynamicPage: builder.mutation({
            query: (id) => ({
                url: `admin/dynamic-pages/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["DynamicPages"],
        }),
    }),
});

export const {
    useFetchDynamicPagesQuery,
    useFetchDynamicPageQuery,
    useCreateDynamicPageMutation,
    useUpdateDynamicPageMutation,
    useDeleteDynamicPageMutation,
} = dynamicPages;

export default dynamicPages;
