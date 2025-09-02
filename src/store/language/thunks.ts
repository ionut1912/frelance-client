import { Language } from "../../models/ExternalApis";
import getLanguages from "../../services/languageService";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface LoadLanguagesResult {
  languages: Language[];
}

export const loadLanguages = createAsyncThunk<
  LoadLanguagesResult,
  void,
  { rejectValue: string }
>("languages/loadLanguages", async (_, { rejectWithValue }) => {
  try {
    const languages = await getLanguages();
    return { languages: languages.data };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
