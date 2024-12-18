import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, defaultHeaders } from "../../../constants/urls";
import { RootState } from "../..";

const rooms = createApi({
    reducerPath: "adminRoomsApi",
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
    tagTypes: ["Rooms", "Room"],
    endpoints: (builder) => ({
        fetchRooms: builder.query({
            query: (params) => `admin/rooms?${params}`,
            transformResponse: (response: { data: object }) => response.data,
            providesTags: ["Rooms"],
        }),
        fetchRoom: builder.query({
            query: (id) => `admin/rooms/${id}`,
            transformResponse: (response: { data: object }) => response.data,
            providesTags: ["Room"],
        }),
    }),
});

export const { useFetchRoomsQuery } = rooms;

export default rooms;
