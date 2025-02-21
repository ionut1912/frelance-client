import { createAction, props } from '@ngrx/store';
import { Language } from '../../models/ExternalApis';

const loadLanguages = createAction('[Language] Load Languages');
const loadLanguagesSuccess = createAction(
  '[Language] Load Languages Success',
  props<{ languages: Language[] }>()
);
const loadLanguagesFailure = createAction(
  '[Language] Load Languages Failure',
  props<{ error: any }>()
);
export { loadLanguages, loadLanguagesSuccess, loadLanguagesFailure };
