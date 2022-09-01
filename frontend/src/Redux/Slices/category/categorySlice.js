import {createAsyncThunk,createSlice,createAction} from "@reduxjs/toolkit";
  import axios from "axios";
  import { baseUrl } from "../../../utils/baseUrl";


  const resetCreateAction = createAction('category/reset-create');
const resetEditAction = createAction('category/reset-edit');
const resetDeletedAction = createAction('category/reset-delete');




  export const createCategoryAction=createAsyncThunk('category/create',
  async(category,{ rejectWithValue, getState, dispatch })=>{
    const user=getState()?.users;
    const {userAuth}= user;
    const config={
      headers:{
        Authorization: `Bearer ${userAuth?.token}`
      }
    }
    

    try {
        const { data }= await axios.post(`${baseUrl}/api/category`,{
            title:category?.title,
        },config);
     dispatch(resetCreateAction());
        return data;
    } catch (error) {
      console.log(error);
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
        
    }
  })


  export const fetchCategoriesAction=createAsyncThunk('category/fetch',
  async(category,{ rejectWithValue, getState, dispatch })=>{
    const user=getState()?.users;
    const {userAuth}= user;
    const config={
      headers:{
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    

    try {
        const { data }= await axios.get(`${baseUrl}/api/category`,config);
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
        
    }
  });

  export const updateCategoriesAction=createAsyncThunk('category/update',
  async(category,{ rejectWithValue, getState, dispatch })=>{
    const user=getState()?.users;
    const {userAuth}= user;
    const config={
      headers:{
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
        const { data }= await axios.put(`${baseUrl}/api/category/${category?.id}`,{title:category?.title},config);
        dispatch(resetEditAction())
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
        
    }
  })

  export const deleteCategoriesAction=createAsyncThunk('category/delete',
  async(id,{ rejectWithValue, getState, dispatch })=>{
    const user=getState()?.users;
    const {userAuth}= user;
    const config={
      headers:{
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    

    try {
        const { data }= await axios.delete(`${baseUrl}/api/category/${id}`,config);
        dispatch(resetDeletedAction())
        return data;
    } catch (error) {

        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
        
    }
  })

  export const fetchCategoryAction=createAsyncThunk('category/details',
  async(id,{ rejectWithValue, getState, dispatch })=>{
    const user=getState()?.users;
    const {userAuth}= user;
    const config={
      headers:{
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    

    try {
        const { data }= await axios.get(`${baseUrl}/api/category/${id}`,config);
        return data;
    } catch (error) {

        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
        
    }
  })




  const categorySlices =  createSlice({
    name:"category",
    initialState:{},
    extraReducers:(builder)=>{

        builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetCreateAction,(state,action)=>{
      state.isCreated=true
    })
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.isCreated=false;

      state.loading = false;
      state.category = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    // fetchCategories
    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.categoryList = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    // updateCategories
    builder.addCase(updateCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetEditAction,(state,action)=>{
      state.isEdited=true;
    })
    builder.addCase(updateCategoriesAction.fulfilled, (state, action) => {
      state.updatedcategories = action?.payload;
      state.isEdited=false;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

        // deleteCategories
        builder.addCase(deleteCategoriesAction.pending, (state, action) => {
          state.loading = true;
        });

        builder.addCase(resetDeletedAction,(state,action)=>{
          state.isdeleted=true;
        })
        builder.addCase(deleteCategoriesAction.fulfilled, (state, action) => {
          state.deletedcategory = action?.payload;
          state.isdeleted=false;
          state.loading = false;
          state.appErr = undefined;
          state.serverErr = undefined;
        });
        builder.addCase(deleteCategoriesAction.rejected, (state, action) => {
          state.loading = false;
          state.appErr = action?.payload?.message;
          state.serverErr = action?.error?.message;
        });

        // fetch details
        builder.addCase(fetchCategoryAction.pending, (state, action) => {
          state.loading = true;
        });
        builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
          state.category = action?.payload;
          state.loading = false;
          state.appErr = undefined;
          state.serverErr = undefined;
        });
        builder.addCase(fetchCategoryAction.rejected, (state, action) => {
          state.loading = false;
          state.appErr = action?.payload?.message;
          state.serverErr = action?.error?.message;
        });



    }
  })

  export default categorySlices.reducer;