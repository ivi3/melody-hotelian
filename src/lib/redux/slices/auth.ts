import {createSlice} from '@reduxjs/toolkit';
import {HYDRATE} from "next-redux-wrapper";

// ----------------------------------------------------------------------

const initialState = {
    token: ''
};

const authSlice = createSlice({
    name: 'auth', initialState,
    reducers: {
        // START LOADING
        setToken(state, action) {
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(HYDRATE, (state, action) =>
             ({
            ...state, ...action,
            })
        )
    }
});

// Reducer
export default authSlice.reducer;
