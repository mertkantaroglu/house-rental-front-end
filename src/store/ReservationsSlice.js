import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const DELETE_RESERVATION = 'reservations/DELETE';

// Method AddReservation
export const addReservation = createAsyncThunk('reservations/add', async (reservationProperties, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://house-rental-app.onrender.com/api/v1/reservations', reservationProperties);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});

// Method DeleteReservation
export const deleteReservation = createAsyncThunk(DELETE_RESERVATION, async (id, thunkAPI) => {
  const API_URL = `https://house-rental-app.onrender.com/api/v1/reservations/${id}`;
  const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    return await axios.delete(API_URL, requestOptions);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.error);
  }
});

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async () => {
  const response = await fetch('https://house-rental-app.onrender.com/api/v1/reservations');
  const data = response.json();
  return data;
});

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    loading: false,
    reservations: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        const newState = state;
        newState.loading = true;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        const newState = state;
        newState.loading = false;
        newState.reservations = action.payload;
      });

    // Add Reservation

    builder.addCase(addReservation.pending, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    }));

    builder.addCase(addReservation.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      response: action.payload,
    }));

    builder.addCase(addReservation.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action.payload,
    }));

    // Delete Reservation
    builder.addCase(deleteReservation.pending, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    }));

    builder.addCase(deleteReservation.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      id: action.payload.data.data,
    }));

    builder.addCase(deleteReservation.rejected, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload.data.error,
    }));
  },
});

export default reservationsSlice.reducer;
