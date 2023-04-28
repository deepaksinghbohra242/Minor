import {createAsyncThunk , createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const registerUserAction = createAsyncThunk('user/register', ()=> {
    async(user,{rejectWithValue , getState , dispatch}) =>{
        try {
            //http call
            const config = {
                headers : {
                    "Content-Type" : "application/json",
                }
            }
            const {data} = await axios.post('http://localhost:5000/api/users/register' ,
                                            user,
                                            config)
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
})