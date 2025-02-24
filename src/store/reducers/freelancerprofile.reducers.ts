import { createReducer, on } from '@ngrx/store';
import * as FreelancerActions from '../actions/freelancerprofile.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { FreelancerProfileDto } from '../../models/UserProfile';

export interface FreelancersState {
  freelancerProfile: FreelancerProfileDto | null | undefined;
  error: HttpErrorResponse | null;
}

const initialState: FreelancersState = {
  freelancerProfile: undefined,
  error: null,
};

export const freelancerProfileReducer = createReducer(
  initialState,
  on(FreelancerActions.getCurrentFreelancerProfile, (state) => ({ ...state })),
  on(
    FreelancerActions.getCurrentFreelancerProfileResult,
    (state, { freelancerProfile }) => ({ ...state, freelancerProfile })
  ),
  on(FreelancerActions.createFreelancerProfileFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
