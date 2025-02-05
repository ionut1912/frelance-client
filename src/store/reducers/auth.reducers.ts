import { createReducer, on, Action } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import {UserDto} from '../../models/UserDto';
import {ProblemDetails} from '../../models/ProblemDetails';

export interface AuthState {
  user: UserDto | null;
  error: ProblemDetails | null;
}

export const initialState: AuthState = {
  user: null,
  error: null
};

const reducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user, error: null })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.registerFailure, (state, { error }) => ({ ...state, error }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
