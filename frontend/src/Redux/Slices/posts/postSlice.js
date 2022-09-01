import {createAsyncThunk,createSlice,isAsyncThunkAction,createAction} from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";

const resetPost = createAction('category/reset');

export const createPostAction = createAsyncThunk('post/create',
async (post,{ rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const {userAuth} = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
         const formData = new FormData();
         formData.append("title",post?.title);
         formData.append("description",post?.description);
         formData.append("category",post?.category);
         formData.append("image",post?.image);
         
        const { data }= await axios.post(`${baseUrl}/api/post`,formData,config);
        dispatch(resetPost());
        return data;
    } catch (error) {
        if(!error?.response){
        throw error;
    }
    return rejectWithValue(error?.response?.data);
}
})

export const fetchPostAction = createAsyncThunk('post/list',
async (category,{ rejectWithValue, getState, dispatch }) => { 
    try {
        const { data }= await axios.get(`${baseUrl}/api/post?category=${category}`);
        return data;
    } catch (error) {
        if(!error?.response){
        throw error;
    }
    return rejectWithValue(error?.response?.data);
}
})


const postSlices =  createSlice({
    name:"post",
    initialState:{},
    extraReducers:(builder)=>{
        builder.addCase(createPostAction.pending, (state, action) => {
            state.loading = true;
          });
          builder.addCase(resetPost,(state,action)=>{
            state.isCreated=true
          })
          builder.addCase(createPostAction.fulfilled, (state, action) => {
            state.isCreated=false;
      
            state.loading = false;
            state.post = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
          });
          builder.addCase(createPostAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
          });


          builder.addCase(fetchPostAction.pending, (state, action) => {
            state.loading = true;
          });
        
          builder.addCase(fetchPostAction.fulfilled, (state, action) => {
            state.loading = false;
            state.postList = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
          });
          builder.addCase(fetchPostAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
          });

    }})


    export default postSlices.reducer;