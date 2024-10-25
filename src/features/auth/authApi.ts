import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignUpFormValues } from "../../models/auth";

const apiUrl = process.env.REACT_APP_TASK_API_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }), // Replace with your actual NestJS API URL
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data: SignUpFormValues) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = authApi;
