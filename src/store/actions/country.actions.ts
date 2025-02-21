import { createAction, props } from '@ngrx/store';
import { Country } from '../../models/ExternalApis';

const loadCountries = createAction('[Country] Load Countries Action');
const loadCountriesSuccess = createAction(
  '[Country] Load Countries Success',
  props<{ countries: Country[] }>()
);
const loadCountriesFailure = createAction(
  '[Country] Load Countries Failure',
  props<{ error: string }>()
);

export { loadCountries, loadCountriesSuccess, loadCountriesFailure };
