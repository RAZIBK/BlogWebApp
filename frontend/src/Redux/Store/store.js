import {configureStore} from '@reduxjs/toolkit';
import usersReducer from '../Slices/users/userSlices';
import categoriesReducer from '../Slices/category/categorySlice'
import postSlicesreducer from '../Slices/posts/postSlice';
const store=configureStore({
    reducer:{
        users:usersReducer,
        category:categoriesReducer,
        post:postSlicesreducer,
    },
});


export default store;
