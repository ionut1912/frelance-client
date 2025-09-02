import { loadCountries } from "./thunks";
import { CountryState } from "./types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CountryState = {
  countries: [],
  error: null,
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.countries = action.payload.countries;
        state.error = null;
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.error = (action.error as string) ?? null;
      });
  },
});
export default countrySlice.reducer;
