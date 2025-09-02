import axios, { AxiosError } from "axios";
import { Country, LoadCountriesResult } from "../../models/ExternalApis";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadCountries = createAsyncThunk<
  LoadCountriesResult,
  void,
  { rejectValue: string }
>("countries/loadCountries", async (_, { rejectWithValue }) => {
  const apiUrl = "https://restcountries.com/v3.1/all?fields=name";

  try {
    const response = await axios.get<Country[]>(apiUrl);
    return { countries: response.data };
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});
