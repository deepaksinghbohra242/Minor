import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import baseUrl from "../../../utils/baseURL";
import axios from "axios";



//Create post action

export const createpostAction = createAsyncThunk('post/created',
    async (post, { rejectWithValue, getState, dispatch }) => {
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        }
        try {
            const { data } = await axios.post(`${baseUrl}/api/posts`, post, config)
            return data
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data)
        }
    })


//slices

const postSlice = createSlice({
    name: 'post',
    initialState: {},
    extraReducers: (builder) => {
        builder.addCase(createpostAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createpostAction.fulfilled, (state, action) => {
            state.postCreated = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(createpostAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })
    },
})

export default postSlice.reducer 