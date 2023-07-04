import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/users/sign_in', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const signupUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/users/', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/api/logout');
      return null;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        const tempState = state;
        tempState.isLoading = true;
        tempState.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const tempState = state;
        tempState.isLoading = false;
        tempState.user = payload;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        const tempState = state;
        tempState.isLoading = false;
        tempState.error = payload;
      })
      .addCase(logoutUser.pending, (state) => {
        const tempState = state;
        tempState.isLoading = true;
        tempState.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        const tempState = state;
        tempState.isLoading = false;
        tempState.user = null;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        const tempState = state;
        tempState.isLoading = false;
        tempState.error = payload;
      });
  },
});

export default authSlice.reducer;
