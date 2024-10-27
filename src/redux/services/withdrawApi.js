import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../auth';

// Create the API
export const withdrawApi = createApi({
    reducerPath: 'withdrawApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getWithdraw: builder.query({
            query: () => 'api/admin/withdraws',
            providesTags: ['Withdraws'],
        }),
        updateWithdraw: builder.mutation({
            query: (formData) => ({
                url: 'api/admin/withdraws/update',
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Withdraws'],
        }),
      
    }),
    keepUnusedDataFor: 60,
    refetchOnMountOrArgChange: 5
});

export const { useGetWithdrawQuery, useUpdateWithdrawMutation } = withdrawApi;
