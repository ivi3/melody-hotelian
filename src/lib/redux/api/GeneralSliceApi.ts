import {createApi} from "@reduxjs/toolkit/query/react";
import {HYDRATE} from "next-redux-wrapper";
import {ApiAddress, baseQuery} from "../../utils/api";
import {API_ENDPOINTS} from "@/routes/paths";

export const generalSliceApiTag = "general_api";

const general_api = createApi({
    // eslint-disable-next-line consistent-return
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    reducerPath: generalSliceApiTag,
    baseQuery,
    tagTypes: [generalSliceApiTag],
    endpoints: (build) => ({
        GetSongs: build.query({
            query: () => ({
                url: ApiAddress(API_ENDPOINTS.song),
                method: "GET",
            }),
            providesTags: (result, error, id) => [
                {type: generalSliceApiTag, id: "GetSongs"},
            ],
        }),
    }),
});

// export endpoints for use in SSR
export const {
    useGetSongsQuery,
} = general_api;

// export endpoints for use in SSR
export const {
    GetSongs,
} = general_api.endpoints;

export default general_api;
