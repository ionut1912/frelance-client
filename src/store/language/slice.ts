import { createSlice } from "@reduxjs/toolkit";
import { LanguageState } from "./types";
import { loadLanguages } from "./thunks";
import { AxiosError } from "axios";

const initialState: LanguageState = {
  languages: [],
  loading: true,
  error: null,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadLanguages.fulfilled, (state, action) => {
        state.languages = action.payload.languages;
        state.loading = false;
        state.error = null;
      })
      .addCase(loadLanguages.rejected, (state, action) => {
        state.error = (action.error as AxiosError) ?? null;
      });
  },
});
export default languageSlice.reducer;
