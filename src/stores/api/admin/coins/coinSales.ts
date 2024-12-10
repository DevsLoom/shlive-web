import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, defaultHeaders } from "../../../../constants/urls";

const coinSales = createApi({
    reducerPath: "coinSalesApi",
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
    tagTypes: ["SaleCoins", "SaleCoin"],
    endpoints: (builder) => ({
        fetchSaleCoins: builder.query({
            query: (params) => `admin/coins/sales?${params}`,
            transformResponse: (response: { data: object }) => response.data,
            providesTags: ["SaleCoins"],
        }),
        fetchSaleCoin: builder.query({
            query: (id) => `admin/coins/sales/${id}`,
            transformResponse: (response: { data: object }) => response.data,
            providesTags: ["SaleCoin"],
        }),
        createSaleCoin: builder.mutation({
            query: (data) => ({
                url: "admin/coins/sales",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["SaleCoins"],
        }),
        updateSaleCoin: builder.mutation({
            query: (data) => ({
                url: `admin/coins/sales/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["SaleCoins"],
        }),
        deleteSaleCoin: builder.mutation({
            query: (id) => ({
                url: `admin/coins/sales/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["SaleCoins"],
        }),
    }),
});

export const {
    useFetchSaleCoinsQuery,
    useFetchSaleCoinQuery,
    useCreateSaleCoinMutation,
    useUpdateSaleCoinMutation,
    useDeleteSaleCoinMutation,
} = coinSales;

export default coinSales;
