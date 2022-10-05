import {configureStore} from '@reduxjs/toolkit';
import usersReducer from '../Slices/users/userSlices';
import categoriesReducer from '../Slices/category/categorySlice'
import postSlicesreducer from '../Slices/posts/postSlice';
import commentSlicesreducer from '../Slices/comments/CommentSlice';
import chatSlicesreducer from '../Slices/chat/ChatSlice'

const store=configureStore({
    reducer:{
        users:usersReducer,
        category:categoriesReducer,
        post:postSlicesreducer,
        comment:commentSlicesreducer,
        chat:chatSlicesreducer,
    },
});


export default store;
