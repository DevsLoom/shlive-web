import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, defaultHeaders } from "../../../../constants/urls";

const coinPackages = createApi({
    reducerPath: "adminCoinPackagesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        headers: defaultHeaders,
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.auth?.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    keepUnusedDataFor: 10,
    refetchOnReconnect: true,
    tagTypes: ["CoinPackages", "CoinPackage"],
    endpoints: (builder) => ({
        fetchCoinPackages: builder.query({
            query: (params) => `admin/coins/packages?${params}`,
            transformResponse: (response: { data: object }) => response.data,
            providesTags: ["CoinPackages"],
        }),
        fetchCoinPackage: builder.query({
            query: (id) => `admin/coins/packages/${id}`,
            transformResponse: (response: { data: object }) => response.data,
            providesTags: ["CoinPackage"],
        }),
        createCoinPackage: builder.mutation({
            query: (data) => ({
                url: "admin/coins/packages",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CoinPackages"],
        }),
        updateCoinPackage: builder.mutation({
            query: (data) => ({
                url: `admin/coins/packages/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CoinPackages"],
        }),
        deleteCoinPackage: builder.mutation({
            query: (id) => ({
                url: `admin/coins/packages/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CoinPackages"],
        }),
    }),
});

export const {
    useFetchCoinPackagesQuery,
    useFetchCoinPackageQuery,
    useCreateCoinPackageMutation,
    useUpdateCoinPackageMutation,
    useDeleteCoinPackageMutation,
} = coinPackages;

export default coinPackages;
