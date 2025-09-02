import { createSlice } from "@reduxjs/toolkit";
import { LanguageState } from "./types";
import { loadLanguages } from "./thunks";

const initialState: LanguageState = {
  languages: [],
  loading: false,
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
        state.error = null;
      })
      .addCase(loadLanguages.rejected, (state, action) => {
        state.error = action.error ?? null;
      });
  },
});
export default languageSlice.reducer;
