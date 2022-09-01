import {
  createAsyncThunk,
  createSlice,
  isAsyncThunkAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";

export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/register`,
        user,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);



export const loginUserAction = createAsyncThunk(
  "users/login",
  async (userDate, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        contentType: "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/login`,
        userDate,
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userLoginFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null;

export const logoutUserAction=createAsyncThunk(
    'users/logout',
    async (payload,{rejectWithValue,getState,dispatch})=>{
        
        try {
            localStorage.removeItem('userInfo');
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
            
        }

    }
)

const userSlices = createSlice({
  name: "users",
  initialState: {
    userAuth:userLoginFromStorage,
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    builder.addCase(logoutUserAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(logoutUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.userAuth = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(logoutUserAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  },
});

export default userSlices.reducer;
