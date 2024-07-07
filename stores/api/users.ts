import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, defaultHeaders } from "../../constants/urls";

const users = createApi({
    reducerPath: "usersApi",
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
    tagTypes: ["Users", "User"],
    endpoints: (builder) => ({
        fetchUsers: builder.query({
            query: (params) => `admin/users?${params}`,
            transformResponse: (response: { data: object }) => response.data,
            providesTags: ["Users"],
        }),
        // createLogin: builder.mutation({
        //   query: (data) => ({
        //     url: 'users/login',
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //   }),
        //   transformErrorResponse: (response) => response.data,
        // }),
    }),
});

export const { useFetchUsersQuery } = users;

export default users;
