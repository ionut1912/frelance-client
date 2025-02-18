import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginDto, RegisterDto, UserDto } from '../../models/Accounts';

export const register = createAction(
  '[Auth] Register',
  props<{ payload: RegisterDto }>(),
);
export const registerSuccess = createAction('[Auth] Register Success');
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: HttpErrorResponse }>(),
);

export const login = createAction(
  '[Auth] Login',
  props<{ payload: LoginDto }>(),
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: UserDto }>(),
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: HttpErrorResponse }>(),
);
export const setToken = createAction(
  '[Auth] Set Token',
  props<{ token: string }>(),
);
export const clearToken = createAction('[Auth] Clear Token');
