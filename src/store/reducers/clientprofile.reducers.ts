import { createReducer, on } from '@ngrx/store';
import * as ClientProfileActions from '../actions/clientprofile.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientProfileDto } from '../../models/UserProfile';

export interface ClientProfileState {
  clientProfiles: ClientProfileDto[];
  error: HttpErrorResponse | null;
}

const initialState: ClientProfileState = {
  clientProfiles: [],
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
    (state, { clientProfiles }) => ({
      ...state,
      clientProfiles,
    })
  ),
  on(ClientProfileActions.verifyClientProfile, (state, { profileId }) => ({
    ...state,
    clientProfiles: state.clientProfiles.map((profile) =>
      profile.id === profileId ? { ...profile, isVerified: true } : profile
    ),
  })),
  on(ClientProfileActions.deleteClientProfileFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    ClientProfileActions.deleteClientProfileSuccess,
    (state, { clientProfileId }) => ({
      ...state,
      clientProfiles: state.clientProfiles.filter(
        (profile) => profile.id !== clientProfileId
      ),
      error: null,
    })
  )
);
