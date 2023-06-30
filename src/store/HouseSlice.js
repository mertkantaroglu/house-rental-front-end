import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'http://127.0.0.1:3000/api/v1/houses';

export const fetchHouse = createAsyncThunk("house/fetchHouse", async (id) => {
  const url = `${baseUrl}/${3}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

const houseSlice = createSlice({
  name: 'houses',
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
