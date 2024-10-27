import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { SignInFormValues, SignUpFormValues } from "../../models/auth";
import { getIdToken, signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../../config/firebase";
import { setToken } from "./authSlice";

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
      async queryFn({ email, password, rememberMe }, _api) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          const user = userCredential.user;

          const token = await getIdToken(user);

          const dispatch = _api.dispatch;
          dispatch(setToken(token));

          if (rememberMe) {
            localStorage.setItem("token", token);
          } else {
            sessionStorage.removeItem("token");
          }

          return { data: user };
        } catch (error: any) {
          const fetchBaseQueryError: FetchBaseQueryError = {
            status: "CUSTOM_ERROR",
            data: error.message || "An error occurred during sign-in",
            error: error.message || "An error occurred during sign-in",
          };
          return { error: fetchBaseQueryError };
        }
      },
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
