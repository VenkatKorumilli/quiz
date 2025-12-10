import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://vk-quiz-backend-1-6trc.onrender.com" }),
  endpoints: (builder) => ({
    getAllQuestions: builder.query({
      query: (category) => `/getAllQuestions/${category}`,
    }),
    submittedAnswers: builder.mutation({
      query: (data) => ({
        url: `/submittedAnswers`,
        method: "POST",
        body: data,
      }),
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: "/addUser",
        method: "POST",
        body: data,
      }),
    }),
    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/addAdmin",
        method: "POST",
        body: data,
      }),
    }),
    userLogin: builder.mutation({
      query: (data) => ({
        url: "/userLogin",
        method: "POST",
        body: data,
      }),
    }),
    saveResult: builder.mutation({
      query: (data) => ({
        url: "/saveResult",
        method: "POST",
        body: data,
      }),
    }),
    getResult: builder.query({
      query: (userId) => `/getResult/${userId}`,
    }),
    googleLogin: builder.mutation({
      query: (data) => ({
        url: "/googleLogin",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllQuestionsQuery,
  useSubmittedAnswersMutation,
  useLazyGetAllQuestionsQuery,
  useAddUserMutation,
  useAddAdminMutation,
  useUserLoginMutation,
  useSaveResultMutation,
  useGetResultQuery,
  useGoogleLoginMutation,
} = quizApi;
