import { LoadCitiesPayload, LoadCitiesResult } from "../../models/ExternalApis";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const loadCities = createAsyncThunk<
  LoadCitiesResult,
  LoadCitiesPayload,
  { rejectValue: string }
>("cities/loadCities", async ({ country }, { rejectWithValue }) => {
  const pageSize = 1000;
  const allCities: string[] = [];

  const fetchPage = async (startRow: number): Promise<void> => {
    const url = `http://api.geonames.org/searchJSON?country=${country.cca2}&featureClass=P&maxRows=${pageSize}&startRow=${startRow}&username=ionut12`;

    try {
      const response = await axios.get(url);
      const geonames = response.data.geonames || [];
      allCities.push(...geonames.map((item: any) => item.name));

      if (geonames.length === pageSize) {
        await fetchPage(startRow + pageSize);
      }
    } catch (error) {
      const err = error as AxiosError;
      return Promise.reject(err.message);
    }
  };

  try {
    await fetchPage(0);
    return { cities: allCities };
  } catch (err) {
    return rejectWithValue(err as string);
  }
});
