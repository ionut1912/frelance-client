import { createReducer, on } from '@ngrx/store';
import * as FreelancerActions from '../actions/freelancerprofile.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { FreelancerProfileDto } from '../../models/UserProfile';

export interface FreelancersState {
  freelancerProfiles: FreelancerProfileDto[];
  error: HttpErrorResponse | null;
}

const initialState: FreelancersState = {
  freelancerProfiles: [],
  error: null,
};

export const freelancerProfileReducer = createReducer(
  initialState,
  on(FreelancerActions.getCurrentFreelancerProfile, (state) => ({ ...state })),
  on(
    FreelancerActions.getCurrentFreelancerProfileResult,
    (state, { freelancerProfiles }) => ({ ...state, freelancerProfiles })
  ),
  on(FreelancerActions.createFreelancerProfileFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(FreelancerActions.verifyFreelancerProfile, (state, { profileId }) => ({
    ...state,
    freelancerProfiles: state.freelancerProfiles.map((profile) =>
      profile.id === profileId ? { ...profile, isVerified: true } : profile
    ),
  })),
  on(FreelancerActions.deleteFreelancerProfileFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    FreelancerActions.deleteFreelancerProfileSuccess,
    (state, { freelancerProfileId }) => ({
      ...state,
      freelancerProfiles: state.freelancerProfiles.filter(
        (profile) => profile.id !== freelancerProfileId
      ),
      error: null,
    })
  )
);
