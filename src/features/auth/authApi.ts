import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { SignInFormValues, SignUpFormValues } from "../../models/auth";
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../../config/firebase";

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

    loginUser: builder.mutation<User, SignInFormValues>({
      async queryFn({ email, password }) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          return { data: userCredential.user }; // Return the authenticated user on success
        } catch (error: any) {
          // Ensure we return a FetchBaseQueryError-compatible structure
          const fetchBaseQueryError: FetchBaseQueryError = {
            status: "CUSTOM_ERROR", // Custom error code
            data: error.message || "An error occurred during sign-in",
            error: error.message || "An error occurred during sign-in", // Provide the missing error field
          };
          return { error: fetchBaseQueryError };
        }
      },
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
