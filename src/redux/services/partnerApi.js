import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../auth';



// Create the API
export const partnerApi = createApi({
    reducerPath: 'partnerApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getPartner: builder.query({
            query: () => 'api/admin/partners',
            providesTags: ['Partner'],
        }),
        editPartner: builder.mutation({
            query: ({ id, formData }) => ({
                url: `api/admin/partners/${id}`,
                method: 'PUT',
                body: formData,
            }),
            // Define tags to invalidate cache after mutation
            invalidatesTags: ['Partner'],
        }),
    }),
    keepUnusedDataFor: 60,
    refetchOnMountOrArgChange: 5
});

export const { useGetPartnerQuery, useEditPartnerMutation } = partnerApi;
