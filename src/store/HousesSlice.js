import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHouses = createAsyncThunk('houses/fetchHouses', async () => {
  const response = await fetch('https://house-rental-app.onrender.com/api/v1/houses');
  const data = response.json();
  return data;
});

const housesSlice = createSlice({
  name: 'houses',
  initialState: {
    loading: false,
    houses: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHouses.pending, (state) => {
        const newState = state;
        newState.loading = true;
      })
      .addCase(fetchHouses.fulfilled, (state, action) => {
        const newState = state;
        newState.loading = false;
        newState.houses = action.payload;
      });
  },
});

export default housesSlice.reducer;
