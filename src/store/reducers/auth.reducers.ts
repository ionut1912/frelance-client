import { createReducer, on, Action } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDto } from '../../models/Accounts';

export interface AuthState {
  user: UserDto | null;
  error: HttpErrorResponse | null;
}

const initialState: AuthState = {
  user: null,
  error: null,
};

const reducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.registerFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.blockAccountFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthActions.deleteAccountFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthActions.deleteAccountSuccess, (state) => ({
    ...state,
    user: null,
    error: null,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
