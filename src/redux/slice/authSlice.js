import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
        refreshToken: null,
        username: null
    },
    reducers: {
        setTokens: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.username = action.payload.username;
        },
        clearTokens: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.username = null;
        },
       
    }
});

export const { setTokens, clearTokens } = authSlice.actions;

export default authSlice.reducer;