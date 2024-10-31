import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { clearTokens, setTokens } from "./slice/authSlice";
import { clearUser } from "./slice/userSlice";

export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_LOCAL_URL}`,
        prepareHeaders: (headers, { getState }) => {
            const { accessToken } = getState().auth;
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
            }
            return headers;
        },
    })(args, api, extraOptions);

    if (result?.error?.status === 401) {
        const refreshToken = api.getState().auth.refreshToken;

        if (refreshToken) {
            const refreshResponse = await fetch(`${import.meta.env.VITE_API_LOCAL_URL}/admin/auth/refresh-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: refreshToken }),
            });

            if (refreshResponse.ok) {
                const { accessToken: newAccessToken } = await refreshResponse.json();
                api.dispatch(setTokens({ accessToken: newAccessToken }));

                result = await fetchBaseQuery({
                    baseUrl: `${import.meta.env.VITE_API_LOCAL_URL}`,
                    prepareHeaders: (headers) => {
                        headers.set('Authorization', `Bearer ${newAccessToken}`);
                        return headers;
                    },
                })(args, api, extraOptions);
            } else {
                api.dispatch(clearTokens());
                api.dispatch(clearUser());
                // Optionally redirect to login page
            }
        } else {
            api.dispatch(clearTokens());
        }
    }

    return result;
};