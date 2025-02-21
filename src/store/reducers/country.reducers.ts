import { createReducer, on } from '@ngrx/store';
import * as CountryActions from '../actions/country.actions';
import { Country } from '../../models/ExternalApis';

export interface CountryState {
  countries: Country[];
  error: string | null;
}

const initialState: CountryState = {
  countries: [],
  error: null,
};

export const countryReducers = createReducer(
  initialState,
  on(CountryActions.loadCountries, (state) => ({
    ...state,
    error: null,
  })),
  on(CountryActions.loadCountriesSuccess, (state, { countries }) => ({
    ...state,
    countries: [...countries],
    error: null,
  })),
  on(CountryActions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
