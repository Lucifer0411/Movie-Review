
// store/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../config';

// Thunk for updating the user profile with password confirmation
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData,thunkAPI, { rejectWithValue }) => {
    try {
      const token=thunkAPI.getState().auth.user.token
      console.log('userid',userData.id);
      console.log('token',token);
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      
      const response = await axios.put(`${API_URL}/api/users/${userData.id}`, userData,config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
