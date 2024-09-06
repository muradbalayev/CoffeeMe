import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../auth';



// Create the API
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => 'api/admin/users',
            providesTags: ['User'],
        }),
        // deleteUser: builder.mutation({
        //     query: (id) => ({
        //         url: `api/admin/users/${id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['User'], // Invalidate 'user' to refetch user list after deletion
        // }),
        addUser: builder.mutation({
            query: (formData) => ({
                url: 'api/admin/users',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['User'],
        }),
        editUser: builder.mutation({
            query: ({ id, formData }) => ({
              url: `api/admin/users/${id}`,
              method: 'PUT',
              body: formData,
            }),
            invalidatesTags: ['User'],
          }),
    }),
    keepUnusedDataFor: 60,
    refetchOnMountOrArgChange: 5
});

export const { useGetUserQuery, useDeleteUserMutation, useAddUserMutation, useEditUserMutation } = userApi;
