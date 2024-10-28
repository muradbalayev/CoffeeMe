import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth";

// Create the API
export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getPartnerNotification: builder.query({
      query: () => "extra/notifications-partner",
    }),
  }),
});

export const { useGetPartnerNotificationQuery } = notificationApi;
