import { createReducer, on } from '@ngrx/store';
import * as ClientProfileActions from '../actions/clienprofile.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientProfileDto } from '../../models/UserProfile';

export interface ClientProfileState {
  clientProfile: ClientProfileDto | null;
  error: HttpErrorResponse | null;
}

const initialState: ClientProfileState = {
  clientProfile: null,
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
    (state, { clientProfile }) => ({ ...state, clientProfile })
  )
);
