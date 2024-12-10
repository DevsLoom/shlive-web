import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../..";
import { API_URL, defaultHeaders } from "../../../constants/urls";

const reports = createApi({
    reducerPath: "adminReportsApi",
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
    tagTypes: ["LatestRooms", "LatestUsers"],
    endpoints: (builder) => ({
        fetchSummaryReports: builder.query({
            query: (params) => `admin/reports/summary?${params}`,
            transformResponse: (response: { data: object }) => response.data,
        }),
        fetchLatestRoomsReports: builder.query({
            query: (params) => `admin/reports/latest-rooms?${params}`,
            transformResponse: (response: { data: object }) => response.data,
            providesTags: ["LatestRooms"],
        }),
        fetchLatestUsersReports: builder.query({
            query: (params) => `admin/reports/latest-users?${params}`,
            transformResponse: (response: { data: object }) => response.data,
            providesTags: ["LatestUsers"],
        }),
        fetchLatestCoinSalesReports: builder.query({
            query: (params) => `admin/reports/coin-sales?${params}`,
            transformResponse: (response: { data: object }) => response.data,
        }),
    }),
});

export const {
    useFetchSummaryReportsQuery,
    useFetchLatestRoomsReportsQuery,
    useFetchLatestCoinSalesReportsQuery,
    useFetchLatestUsersReportsQuery,
} = reports;

export default reports;
