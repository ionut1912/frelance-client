import { createReducer, on, Action } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import {UserDto} from '../../models/UserDto';
import {HttpErrorResponse} from '@angular/common/http';

export interface AuthState {
  user: UserDto | null;
  error: HttpErrorResponse | null;
  token: string | null;
}
const getInitialToken = (): string | null => {
  return typeof window !== 'undefined' ? sessionStorage.getItem('jwtToken') : null;
};


export const initialState: AuthState = {
  user: null,
  error: null,
  token: getInitialToken(),
};

const reducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user, error: null })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.registerFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.setToken, (state, { token }) => {
    sessionStorage.setItem('jwtToken', token); // Persist token in sessionStorage
    return { ...state, token };
  }),
  on(AuthActions.clearToken, (state) => {
    sessionStorage.removeItem('jwtToken'); // Remove token on logout
    return { ...state, token: null };
  })
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
