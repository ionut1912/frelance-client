import { createReducer, on } from '@ngrx/store';
import * as ClientProfileActions from '../actions/clientprofile.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientProfileDto } from '../../models/UserProfile';

export interface ClientProfileState {
  clientProfile: ClientProfileDto | null | undefined;
  error: HttpErrorResponse | null;
}

const initialState: ClientProfileState = {
  clientProfile: undefined,
  error: null,
};

export const clientProfileReducer = createReducer(
  initialState,
  on(ClientProfileActions.createClientProfileFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ClientProfileActions.getCurrentClientProfile, (state) => ({ ...state })),
  on(
    ClientProfileActions.getCurrentClientProfileResult,
    (state, { clientProfile }) => ({
      ...state,
      clientProfile,
    })
  ),
  on(ClientProfileActions.verifyClientProfile, (state) => ({
    ...state,
    clientProfile: state.clientProfile
      ? { ...state.clientProfile, isVerified: true }
      : state.clientProfile,
  })),
  on(ClientProfileActions.deleteClientProfileFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ClientProfileActions.deleteClientProfileSuccess, (state) => ({
    ...state,
    clientProfile: null,
    error: null,
  }))
);
