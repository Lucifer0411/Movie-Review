// src/store/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




// Thunk for registering a user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/users/', userData);
      if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data));
    }
      return response.data;

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Asynchronous action for logging in
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const API_URL='http://localhost:8000/api/users/login'
      const response = await axios.post(API_URL, { email, password });
      if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data));
    }
      return response.data; // user data returned from API
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || 'Login failed'
      );
    }
  }
);
export const logout=createAsyncThunk('auth/logout',()=>{
    return logoutUser();
})

const logoutUser=()=>{
  localStorage.removeItem('user');
}

const user=JSON.parse(localStorage.getItem('user'))

const initialState={
    user:user ? user :null,
    loading:false,
    error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset:(state)=>{
      state.loading = false
      state.error = false
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled,(state)=>{
        state.user=null
    });

  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
