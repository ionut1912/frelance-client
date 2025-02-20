import { createReducer, on } from '@ngrx/store';
import * as CityActions from '../actions/city.actions';

export interface CityState {
  cities: string[];
  loading: boolean;
  error: string | null;
}

const initialState: CityState = {
  cities: [],
  loading: false,
  error: null,
};

export const cityReducer = createReducer(
  initialState,
  on(CityActions.loadCities, (state) => ({
    ...state,
    cities: [],
    loading: true,
    error: null,
  })), // Clear cities and set loading true
  on(CityActions.loadCitiesSuccess, (state, { cities }) => ({
    ...state,
    cities,
    loading: false,
  })),
  on(CityActions.loadCitiesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
