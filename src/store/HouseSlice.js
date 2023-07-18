import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const SHOW_HOUSE = 'house/SHOW/:id';
const DELETE_HOUSE = 'house/DELETE';

export const fetchHouse = createAsyncThunk('house/fetchHouse', async (id) => {
  const url = `https://house-rental-app.onrender.com/api/v1/houses/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

// Base Url
const BASE_URL = 'https://house-rental-app.onrender.com';

export const getHouse = createAsyncThunk(SHOW_HOUSE, async (id, thunkAPI) => {
  const API_URL = `${BASE_URL}/api/v1/houses/${id}`;
  const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    return await axios.get(API_URL, requestOptions);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.error);
  }
});

export const addHouse = createAsyncThunk('house/add', async (houseProperties, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://house-rental-app.onrender.com/api/v1/houses', houseProperties);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});

// Method Delete house
export const deleteHouse = createAsyncThunk(DELETE_HOUSE, async (id, thunkAPI) => {
  const API_URL = `${BASE_URL}/api/v1/houses/${id}`;
  const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    await axios.delete(API_URL, requestOptions);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.error);
  }
});

// house Slice
const houseSlice = createSlice({
  name: 'house',
  initialState: {
    isLoading: false,
    success: false,
    error: null,
    list: [],
    house: {},
    response: null,
  },
  reducers: {
    resetErrors: (state) => ({
      ...state,
      error: '',
      isLoading: false,
      success: false,
      response: null,
    }),
  },
  extraReducers: (builder) => {
    // Get house
    builder.addCase(getHouse.pending, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    }));

    builder.addCase(getHouse.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      house: action.payload.data.data.houses,
    }));

    builder.addCase(getHouse.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }));

    // Fetch house
    builder.addCase(fetchHouse.pending, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    }));

    builder.addCase(fetchHouse.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      house: action.payload,
    }));

    builder.addCase(fetchHouse.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }));
    // Add house

    builder.addCase(addHouse.pending, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    }));

    builder.addCase(addHouse.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      response: action.payload,
    }));

    builder.addCase(addHouse.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }));

    // Delete house

    builder.addCase(deleteHouse.pending, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    }));

    builder.addCase(deleteHouse.fulfilled, (state, action) => {
      const id = action.payload;

      return {
        ...state,
        isLoading: false,
        success: true,
        id,
        list: state.list.filter((house) => house.id !== id),
      };
    });

    builder.addCase(deleteHouse.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload.data.error,
    }));
  },
});

export default houseSlice.reducer;
export const { resetErrors } = houseSlice.actions;
