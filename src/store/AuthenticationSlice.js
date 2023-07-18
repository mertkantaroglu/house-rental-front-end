import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://house-rental-app.onrender.com/users/sign_in', credentials);
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
      const response = await axios.post('https://house-rental-app.onrender.com/users/', credentials);
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

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getUserFromLocalStorage(),
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
        localStorage.setItem('user', JSON.stringify(payload));
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
        localStorage.removeItem('user');
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        const tempState = state;
        tempState.isLoading = false;
        tempState.error = payload;
      });
  },
});

export default authSlice.reducer;
