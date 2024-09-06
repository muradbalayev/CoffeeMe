import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../auth';



// Create the API
export const menuApi = createApi({
    reducerPath: 'menuApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getMenu: builder.query({
            query: () => 'api/admin/shops',
            providesTags: ['Menu'],
        }),
    }),
    keepUnusedDataFor: 60,
    refetchOnMountOrArgChange: 5
});

export const { useGetMenuQuery } = menuApi;
