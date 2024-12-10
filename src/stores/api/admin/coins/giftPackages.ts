import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, defaultHeaders } from "../../../../constants/urls";

const coinGiftPackages = createApi({
    reducerPath: "coinGiftPackagesApi",
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
    tagTypes: ["CoinGiftPackages", "CoinGiftPackage"],
    endpoints: (builder) => ({
        fetchCoinGiftPackages: builder.query({
            query: (params) => `admin/coins/gifts/packages?${params}`,
            transformResponse: (response: { data: object }) => response.data,
            providesTags: ["CoinGiftPackages"],
        }),
        fetchCoinGiftPackage: builder.query({
            query: (id) => `admin/coins/gifts/packages/${id}`,
            transformResponse: (response: { data: object }) => response.data,
            providesTags: ["CoinGiftPackage"],
        }),
        createCoinGiftPackage: builder.mutation({
            query: (data) => ({
                url: "admin/coins/gifts/packages",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CoinGiftPackages"],
        }),
        updateCoinGiftPackage: builder.mutation({
            query: (data) => ({
                url: `admin/coins/gifts/packages/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CoinGiftPackages"],
        }),
        deleteCoinGiftPackage: builder.mutation({
            query: (id) => ({
                url: `admin/coins/gifts/packages/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CoinGiftPackages"],
        }),
    }),
});

export const {
    useFetchCoinGiftPackagesQuery,
    useFetchCoinGiftPackageQuery,
    useCreateCoinGiftPackageMutation,
    useUpdateCoinGiftPackageMutation,
    useDeleteCoinGiftPackageMutation,
} = coinGiftPackages;

export default coinGiftPackages;
