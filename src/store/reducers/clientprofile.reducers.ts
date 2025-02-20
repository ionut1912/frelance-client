import { createReducer, on } from '@ngrx/store';
import { ClientProfileDto } from '../../models/ClientProfile';
import * as ClientProfileActions from '../actions/clienprofile.actions';
import { HttpErrorResponse } from '@angular/common/http';

export interface ClientProfileState {
  clientProfile: ClientProfileDto | null;
  error: HttpErrorResponse | null;
}

export const initialState: ClientProfileState = {
  clientProfile: null,
  error: null,
};

export const clientProfileReducer = createReducer(
  initialState,
  on(ClientProfileActions.createClientProfileFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ClientProfileActions.getClientProfiles, (state) => ({ ...state })),
  on(
    ClientProfileActions.getClientProfilesResult,
    (state, { clientProfile }) => ({ ...state, clientProfile })
  )
);
