import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth";

// Create the API
export const extraApi = createApi({
  reducerPath: "extraApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getFingerTips: builder.query({
      query: () => "api/admin/extra/fingertips",
      providesTags: ["FingerTips"],
    }),
  }),
});

export const { useGetFingerTipsQuery } = extraApi;
