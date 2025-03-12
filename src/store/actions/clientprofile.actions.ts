import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ClientProfileDto,
  CreateClientProfileRequest,
} from '../../models/UserProfile';

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
  props<{ clientProfiles: ClientProfileDto[] }>()
);
const verifyClientProfile = createAction(
  '[Client Profile] verify profile',
  props<{ profileId: number }>()
);
const deleteClientProfile = createAction(
  '[Client Profile] delete client profile',
  props<{ clientProfileId: number }>()
);
const deleteClientProfileSuccess = createAction(
  '[Client Profile] delete client profile success',
  props<{ clientProfileId: number }>()
);
const deleteClientProfileFailure = createAction(
  '[Client Profile] delete client profile failure',
  props<{ error: HttpErrorResponse }>()
);

export {
  createClientProfile,
  createClientProfileSuccess,
  createClientProfileFailure,
  getCurrentClientProfile,
  getCurrentClientProfileResult,
  verifyClientProfile,
  deleteClientProfile,
  deleteClientProfileSuccess,
  deleteClientProfileFailure,
};
