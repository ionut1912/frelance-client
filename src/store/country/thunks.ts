import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface LoadCountriesResult {
  countries: string[];
}

export const loadCountries = createAsyncThunk<
  LoadCountriesResult,
  void,
  { rejectValue: string }
>("countries/loadCountries", async (_, { rejectWithValue }) => {
  const apiUrl = "https://restcountries.com/v3.1/all?fields=name";

  try {
    const response = await axios.get(apiUrl);
    const countries: string[] = response.data.map((c: any) => c.name.common);
    return { countries };
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});
