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
        fetchUser: builder.query({
            query: (id) => `admin/users/${id}`,
            transformResponse: (response: { data: object }) => response.data,
            providesTags: ["User"],
        }),
        createUser: builder.mutation({
            query: (data) => ({
                url: "admin/users",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["Users"],
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `admin/users/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["Users"],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `admin/users/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["Users"],
        }),
    }),
});

export const {
    useFetchUsersQuery,
    useFetchUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = users;

export default users;
