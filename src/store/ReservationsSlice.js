import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const SHOW_RESERVATIONS = 'reservations/SHOW';
const ADD_RESERVATION = 'reservations/ADD';
const DELETE_RESERVATION = 'reservations/DELETE';

// Method getReservations
export const getReservations = createAsyncThunk(SHOW_RESERVATIONS, async (thunkAPI) => {
  const API_URL = 'http://localhost:3000/api/v1/reservations';
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

// Method AddReservation
export const addReservation = createAsyncThunk('reservations/add', async (reservationProperties, {rejectWithValue}) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/reservations', reservationProperties)
    return response.data;
  } catch (error) {
    return rejectWithValue(error.respose.data.error)
  }
  
  
  
  
  // const API_URL = 'http://localhost:3000/api/v1/reservations';
  // const token = localStorage.getItem('token');
  // const requestOptions = {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  // try {
  //   return await axios.post(API_URL, reservation, requestOptions);
  // } catch (err) {
  //   return thunkAPI.rejectWithValue(err.response.data.error);
  // }

});

// Method DeleteReservation
export const deleteReservation = createAsyncThunk(DELETE_RESERVATION, async (id, thunkAPI) => {
  const API_URL = `http://localhost:3000/api/v1/reservations/${id}`;
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
  const response = await fetch('http://127.0.0.1:3000/api/v1/reservations');
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
  },
});

export default reservationsSlice.reducer;

// // Reservation Slice
// const reservationSlice = createSlice({
//   name: 'reservation',
//   initialState: {
//     isLoading: false,
//     success: false,
//     error: '',
//     list: '',
//   },
//   extraReducers: (builder) => {
//     // Get Reservations
//     builder.addCase(getReservations.pending, (state) => ({
//       ...state,
//       isLoading: true,
//       error: '',
//     }));

//     builder.addCase(getReservations.fulfilled, (state, action) => ({
//       ...state,
//       isLoading: false,
//       success: true,
//       list: action.payload.data.data.reservations,
//     }));

//     builder.addCase(getReservations.rejected, (state, action) => ({
//       ...state,
//       isLoading: false,
//       error: action.payload,
//     }));



//     // Delete Reservation

//     builder.addCase(deleteReservation.pending, (state) => ({
//       ...state,
//       isLoading: true,
//       error: '',
//     }));

//     builder.addCase(deleteReservation.fulfilled, (state, action) => ({
//       ...state,
//       isLoading: false,
//       success: true,
//       id: action.payload.data.data,
//     }));

//     builder.addCase(deleteReservation.rejected, (state, action) => ({
//       ...state,
//       isLoading: false,
//       error: action.payload.data.error,
//     }));
//   },
// });

// export default reservationSlice.reducer;