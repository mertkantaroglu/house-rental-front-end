import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHouse = createAsyncThunk('house/fetchHouse', async () => {
  const response = await fetch('http://127.0.0.1:3000/api/v1/houses/2');
  const data = await response.json();
  return data;
});

// Create a slice of state
const houseSlice = createSlice({
  name: 'house',
  initialState: {
    loading: false,
    house: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHouse.pending, (state) => {
        const newState = state;
        newState.loading = true;
      })
      .addCase(fetchHouse.fulfilled, (state, action) => {
        const newState = state;
        newState.loading = false;
        newState.house = action.payload;
      });
  },
});

export default houseSlice.reducer;
