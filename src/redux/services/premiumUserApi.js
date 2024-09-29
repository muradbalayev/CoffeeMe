import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../auth';



// Create the API
export const premiumUserApi = createApi({
    reducerPath: 'premiumUserApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getPremiumUser: builder.query({
            query: () => 'api/admin/users/premium',
            providesTags: ['PremiumUser'],
        }),
        // deleteUser: builder.mutation({
        //     query: (id) => ({
        //         url: `api/admin/users/${id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['User'], // Invalidate 'user' to refetch user list after deletion
        // }),
        addPremiumUser: builder.mutation({
            query: (formData) => ({
                url: 'api/admin/users/premium',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['PremiumUser'],
        }),
        editUser: builder.mutation({
            query: ({ id, formData }) => ({
              url: `api/admin/users/premium/${id}`,
              method: 'PUT',
              body: formData,
            }),
            invalidatesTags: ['PremiumUser'],
          }),
    }),
    keepUnusedDataFor: 60,
    refetchOnMountOrArgChange: 5
});

export const { useGetPremiumUserQuery, useAddPremiumUserMutation, useEditPremiumUserMutation } = premiumUserApi;
