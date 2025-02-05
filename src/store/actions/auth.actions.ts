import { createAction, props } from '@ngrx/store';
import {RegisterDto} from '../../models/RegisterDto';
import {LoginDto} from '../../models/LoginDto';
import {ProblemDetails} from '../../models/ProblemDetails';
import {UserDto} from '../../models/UserDto';

export const register = createAction('[Auth] Register', props<{ payload: RegisterDto }>());
export const registerSuccess = createAction('[Auth] Register Success');
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: ProblemDetails }>());

export const login = createAction('[Auth] Login', props<{ payload: LoginDto }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: UserDto }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: ProblemDetails }>());
