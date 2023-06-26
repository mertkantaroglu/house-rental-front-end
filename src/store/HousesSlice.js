import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHouses = createAsyncThunk("houses/fetchHouses", async () => {
  const response = await fetch("http://127.0.0.1:3000/api/v1/houses/index");
  const data = response.json();
  return data;
});

const housesSlice = createSlice({
  name: "houses",
  initialState: {
    loading: false,
    houses: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHouses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHouses.fulfilled, (state, action) => {
        state.loading = false;
        state.houses = action.payload;
      });
  },
});

export default housesSlice.reducer;
