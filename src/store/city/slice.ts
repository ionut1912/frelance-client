import { createSlice } from "@reduxjs/toolkit";
import { loadCities } from "./thunks";
import { CityState } from "./types";

const initialState: CityState = {
  cities: [],
  loading: true,
  error: null,
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCities.fulfilled, (state, action) => {
        state.cities = action.payload.cities;
        state.error = null;
        state.loading = false;
      })
      .addCase(loadCities.rejected, (state, action) => {
        state.error = (action.error as string) ?? null;
      });
  },
});
export default citySlice.reducer;
