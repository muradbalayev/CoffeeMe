import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import userReducer from "./slice/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { menuApi } from "./services/menuApi";
import { partnerApi } from "./services/partnerApi";
import { shopApi } from "./services/shopApi";
import { productApi } from "./services/productApi";
import { userApi } from "./services/userApi";
import { premiumUserApi } from "./services/premiumUserApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        [menuApi.reducerPath]: menuApi.reducer,
        [partnerApi.reducerPath]: partnerApi.reducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [premiumUserApi.reducerPath]: premiumUserApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
    .concat(menuApi.middleware)
    .concat(partnerApi.middleware)
    .concat(shopApi.middleware)
    .concat(productApi.middleware)
    .concat(userApi.middleware)
    .concat(premiumUserApi.middleware),
})

setupListeners(store.dispatch)