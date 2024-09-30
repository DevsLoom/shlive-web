import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, defaultHeaders } from "../../constants/urls";
import { RootState } from "..";

const auth = createApi({
    reducerPath: "authApi",
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
    endpoints: (builder) => ({
        createLogin: builder.mutation({
            query: (data) => ({
                url: "auth/login",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
        }),
        createRegister: builder.mutation({
            query: (data) => ({
                url: "auth/register",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
        }),
        createForgetRequest: builder.mutation({
            query: (data) => ({
                url: "auth/forget/request",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
        }),
        createForgetVerify: builder.mutation({
            query: (data) => ({
                url: "auth/forget/verify",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
        }),
        createForgetPassword: builder.mutation({
            query: (data) => ({
                url: "auth/forget/password",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
        }),
        createChangePassword: builder.mutation({
            query: (data) => ({
                url: "auth/change-password",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
        }),
        createUserUpdate: builder.mutation({
            query: (data) => ({
                url: "auth/update",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
        }),
    }),
});

export const {
    useCreateLoginMutation,
    useCreateRegisterMutation,
    useCreateForgetRequestMutation,
    useCreateForgetVerifyMutation,
    useCreateForgetPasswordMutation,
    useCreateChangePasswordMutation,
    useCreateUserUpdateMutation,
} = auth;

export default auth;
