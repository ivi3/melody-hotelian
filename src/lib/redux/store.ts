import { configureStore } from "@reduxjs/toolkit";
import auth_api from "@/lib/redux/api/AuthSliceApi";
import {setupListeners} from "@reduxjs/toolkit/query";
import auth from "@/lib/redux/slices/auth";

export const store = configureStore({
    reducer: {
        auth,
        [auth_api.reducerPath]: auth_api.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([auth_api.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;