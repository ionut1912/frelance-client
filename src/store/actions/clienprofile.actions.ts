import { createAction, props } from '@ngrx/store';
import {
  ClientProfileDto,
  CreateClientProfileRequest,
} from '../../models/ClientProfile';
import { HttpErrorResponse } from '@angular/common/http';

const createClientProfile = createAction(
  '[Client Profile] create client profile',
  props<{ payload: CreateClientProfileRequest }>()
);
const createClientProfileSuccess = createAction(
  '[Client Profile] create client profile success'
);
const createClientProfileFailure = createAction(
  '[Client Profile] create client profile failure',
  props<{ error: HttpErrorResponse }>()
);
const getCurrentClientProfile = createAction('[Data] Get Client Profiles');
const getCurrentClientProfileResult = createAction(
  '[Data] Get Client Profiles Result',
  props<{ clientProfile: ClientProfileDto }>()
);

export {
  getCurrentClientProfile,
  getCurrentClientProfileResult,
  createClientProfile,
  createClientProfileSuccess,
  createClientProfileFailure,
};
