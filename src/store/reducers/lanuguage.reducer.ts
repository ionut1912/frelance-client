import { createReducer, on } from '@ngrx/store';

import { Language } from '../../models/ExternalApis';
import * as LanguagesActions from '../actions/language.actions';
export interface LanguageState {
  languages: Language[];
  loading: boolean;
  error: any;
}

const initialState: LanguageState = {
  languages: [],
  loading: false,
  error: null,
};

export const languageReducer = createReducer(
  initialState,
  on(LanguagesActions.loadLanguages, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LanguagesActions.loadLanguagesSuccess, (state, { languages }) => ({
    ...state,
    languages,
    loading: false,
  })),
  on(LanguagesActions.loadLanguagesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
