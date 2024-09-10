import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../auth';



// Create the API
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: (shopId) => `api/admin/shops/${shopId}/products`,
            providesTags: ['Product'],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `api/admin/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'], // Invalidate 'Shop' to refetch shop list after deletion
        }),
        addProduct: builder.mutation({
            query: ({ shopId, formData }) => ({
                url: `api/admin/products/${shopId}`, // Make sure shopId is properly formatted
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Product'],
        }),
        editProduct: builder.mutation({
            query: ({ id, formData }) => ({
                url: `api/admin/products/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Product'],
        }),
    }),
    keepUnusedDataFor: 60,
    refetchOnMountOrArgChange: 5
});

export const { useGetProductQuery, useDeleteProductMutation, useAddProductMutation, useEditProductMutation } = productApi;
