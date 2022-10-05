    import {
      createAsyncThunk,
      createSlice,
      isAsyncThunkAction,
      createAction,
    } from "@reduxjs/toolkit";
    import axios from "axios";
    import { baseUrl } from "../../../utils/baseUrl";

const resetChat = createAction("chat/reset");
const resetUser = createAction("chat/usersReset");


export const fetchChatsAction = createAsyncThunk(
  "chat/users",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/chat`,
        config
      );
      dispatch(resetUser())
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);



    export const createChatAction = createAsyncThunk(
      "chat/create",
      async (userId, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
          headers: {
            Authorization: `Bearer ${userAuth?.token}`,
          },
        };
        try {
          const { data } = await axios.post(
            `${baseUrl}/api/chat`,
            {userId},
            config
          );
          dispatch(resetChat())
          return data;
        } catch (error) {
          if (!error?.response) {
            throw error;
          }
          return rejectWithValue(error?.response?.data);
        }
      }
    );
    

    export const sentNewMessage = createAsyncThunk(
      "chat/sent",
      async (value, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
          headers: {
            Authorization: `Bearer ${userAuth?.token}`,
          },
        };
        try {
          const { data } = await axios.post(
            `${baseUrl}/api/chat/message`,
            {content:value.content,chatId:value.chatId},
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
    
    export const allMessages = createAsyncThunk(
      "chat/show",
      async (id, { rejectWithValue, getState, dispatch }) => {

        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
          headers: {
            Authorization: `Bearer ${userAuth?.token}`,
          },
        };
        try {
          const { data } = await axios.get(
            `${baseUrl}/api/chat/message/${id}`,
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

    const chatSlices = createSlice({
      name: "chat",
      initialState: {},
      extraReducers: (builder) => {

        
        
        builder.addCase(resetUser, (state, action) => {
          state.isUser = true;
        });
        
        builder.addCase(fetchChatsAction.pending, (state, action) => {
            state.loading = true;
          });
          builder.addCase(fetchChatsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.ChatUsers = action?.payload;
          state.isUser = false;
            
            state.appErr = undefined;
            state.serverErr = undefined;
          });
          builder.addCase(fetchChatsAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
          });

        builder.addCase(resetChat, (state, action) => {
          state.isCreated = true;
        });
        builder.addCase(createChatAction.pending, (state, action) => {
            state.loading = true;
          });
          builder.addCase(createChatAction.fulfilled, (state, action) => {
            state.loading = false;
            state.createChat = action?.payload;
          state.isCreated = false;

            state.appErr = undefined;
            state.serverErr = undefined;
          });
          builder.addCase(createChatAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
          });

          builder.addCase(sentNewMessage.pending, (state, action) => {
            state.loading = true;
          });
          builder.addCase(sentNewMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.sentedMessage = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
          });
          builder.addCase(sentNewMessage.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
          });

          builder.addCase(allMessages.pending, (state, action) => {
            state.loading = true;
          });
          builder.addCase(allMessages.fulfilled, (state, action) => {
            state.loading = false;
            state.messages = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
          });
          builder.addCase(allMessages.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
          });
      },
    });

    export default chatSlices.reducer;
