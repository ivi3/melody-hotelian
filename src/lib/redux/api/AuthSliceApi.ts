import {createApi} from "@reduxjs/toolkit/query/react";
import {HYDRATE} from "next-redux-wrapper";
import {ApiAddress, baseQuery} from "../../utils/api";
import {API_ENDPOINTS} from "@/routes/paths";
import {UserLoginRequest, UserRegisterRequest} from "@/lib/types";
import general_api from "@/lib/redux/api/GeneralSliceApi";
// import {HYDRATE} from "next-redux-wrapper";

export const authSliceApiTag = "auth_api";

const auth_api = createApi({
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    reducerPath: authSliceApiTag,
    baseQuery,
    tagTypes: [authSliceApiTag],
    endpoints: (build) => ({
        Login: build.query({
            query: (body: UserLoginRequest) => ({
                url: ApiAddress(API_ENDPOINTS.auth.login),
                method: "POST",
                body
            }),
        }),
        Register: build.mutation({
            query: (body: UserRegisterRequest) => ({
                url: ApiAddress(API_ENDPOINTS.auth.register),
                method: "POST",
                body
            }),
        }),
    }),
});

export const {
    useLoginQuery,
    useRegisterMutation,
} = auth_api;

// export endpoints for use in SSR
export const {
    Login,
} = auth_api.endpoints;


export default auth_api;
