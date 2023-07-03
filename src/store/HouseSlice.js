import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const SHOW_HOUSES = 'house-rental/house/SHOW';
const SHOW_HOUSE = 'house-rental/house/SHOW/:id';
const ADD_HOUSE = 'house-rental/house/ADD';
const DELETE_HOUSE = 'house-rental/house/DELETE';

// const baseUrl = 'http://127.0.0.1:3000/api/v1/houses';

// export const fetchHouse = createAsyncThunk('house/fetchHouse', async (id) => {
//   const url = `${baseUrl}/${id}`;
//   const response = await fetch(url);
//   const data = await response.json();
//   return data;
// });



// const houseSlice = createSlice({
//   name: 'houses',
//   initialState: {
//     loading: false,
//     house: {},
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchHouse.pending, (state) => {
//         const newState = state;
//         newState.loading = true;
//       })
//       .addCase(fetchHouse.fulfilled, (state, action) => {
//         const newState = state;
//         newState.loading = false;
//         newState.house = action.payload;
//       });
//   },
// });

// export default houseSlice.reducer;


// Base Url
const BASE_URL = process.env.REACT_APP_BASE_URL;
// Method gethouses
export const getHouses = createAsyncThunk(SHOW_HOUSES, async (filter = null, thunkAPI) => {
  const API_URL = filter === true ? `${BASE_URL}/api/v1/houses?filter=true` : `${BASE_URL}/api/v1/houses`;
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

// Method Addhouse
export const addHouse = createAsyncThunk(ADD_HOUSE, async (house, thunkAPI) => {
  const API_URL = `${BASE_URL}/api/v1/houses`;
  const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    return await axios.post(API_URL, house, requestOptions);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.error);
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
    error: '',
    list: [],
    house: null,
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
    // Get houses
    builder.addCase(getHouses.pending, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    }));

    builder.addCase(getHouses.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      list: action.payload.data.data.houses,
    }));

    builder.addCase(getHouses.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }));

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
      response: action.payload.data.data,
    }));

    builder.addCase(addHouse.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action.payload.data.errors,
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
