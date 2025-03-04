import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginDto, RegisterDto, UserDto } from '../../models/Accounts';

const register = createAction(
  '[Auth] Register',
  props<{ payload: RegisterDto }>()
);
const registerSuccess = createAction('[Auth] Register Success');
const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: HttpErrorResponse }>()
);

const login = createAction('[Auth] Login', props<{ payload: LoginDto }>());
const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: UserDto }>()
);
const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: HttpErrorResponse }>()
);

const blockAccount = createAction(
  '[Auth] Block Account',
  props<{ id: number }>()
);
const blockAccountSuccess = createAction('[Auth] Block Account Success');
const blockAccountFailure = createAction(
  '[Auth] Block Account Failure',
  props<{ error: HttpErrorResponse }>()
);

const deleteAccount = createAction(
  '[Auth] Delete Account',
  props<{ id: number }>()
);
const deleteAccountSuccess = createAction('[Auth] Delete Account Success');
const deleteAccountFailure = createAction(
  '[Auth] Delete Account Failure',
  props<{ error: HttpErrorResponse }>()
);

export {
  register,
  registerSuccess,
  registerFailure,
  login,
  loginSuccess,
  loginFailure,
  blockAccount,
  blockAccountSuccess,
  blockAccountFailure,
  deleteAccount,
  deleteAccountSuccess,
  deleteAccountFailure,
};
