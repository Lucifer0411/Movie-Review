// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import postReducer from './postSlice';
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    user:userReducer
  },
});

export default store;
