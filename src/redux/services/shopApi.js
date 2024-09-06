import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../auth';



// Create the API
export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getShop: builder.query({
            query: () => 'api/admin/shops',
            providesTags: ['Shop'],
        }),
        deleteShop: builder.mutation({
            query: (id) => ({
                url: `api/admin/shops/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Shop'], // Invalidate 'Shop' to refetch shop list after deletion
        }),
        addShop: builder.mutation({
            query: (formData) => ({
                url: 'api/admin/shops',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Shop'],
        }),
        editShop: builder.mutation({
            query: ({ id, formData }) => ({
              url: `api/admin/shops/${id}`,
              method: 'PUT',
              body: formData,
            }),
            invalidatesTags: ['Shop'],
          }),
    }),
    keepUnusedDataFor: 60,
    refetchOnMountOrArgChange: 5
});

export const { useGetShopQuery, useDeleteShopMutation, useAddShopMutation, useEditShopMutation } = shopApi;
