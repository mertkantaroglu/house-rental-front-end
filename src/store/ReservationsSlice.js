import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
  },
});

export default reservationsSlice.reducer;
