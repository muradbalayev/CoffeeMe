import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth";

// Create the API
export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Notifications"],
  endpoints: (builder) => ({
    getPartnerNotification: builder.query({
      query: () => "api/admin/extra/notifications-partner",
      providesTags: ["Notifications"],
    }),
    updatePartnerNotification: builder.mutation({
      query: (data) => ({
        url: "api/admin/extra/notifications-partner",
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetPartnerNotificationQuery,
  useUpdatePartnerNotificationMutation,
} = notificationApi;
