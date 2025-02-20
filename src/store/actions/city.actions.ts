import { createAction, props } from '@ngrx/store';
import { Country } from '../../models/Country';

export const loadCities = createAction(
  '[City] Load Cities',
  props<{ country: Country }>()
);
export const loadCitiesSuccess = createAction(
  '[City] Load Cities Success',
  props<{ cities: string[] }>()
);
export const loadCitiesFailure = createAction(
  '[City] Load Cities Failure',
  props<{ error: string }>()
);
