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
const getClientProfiles = createAction('[Data] Get Client Profiles');
const getClientProfilesResult = createAction(
  '[Data] Get Client Profiles Result',
  props<{ clientProfile: ClientProfileDto }>()
);

export {
  getClientProfiles,
  getClientProfilesResult,
  createClientProfile,
  createClientProfileSuccess,
  createClientProfileFailure,
};
