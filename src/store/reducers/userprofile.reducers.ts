import {
  ClientProfileDto,
  FreelancerProfileDto,
} from '../../models/UserProfile';
import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import * as UserProfileActions from '../actions/userprofile.actions';
import { PaginatedList } from '../../models/generics';

export interface UserProfileState {
  clientProfiles?: ClientProfileDto[] | null;
  freelancerProfiles?: FreelancerProfileDto[] | null;
  paginatedUserProfiles?: PaginatedList<object> | null;
  error: HttpErrorResponse | null;
}

const initialState: UserProfileState = {
  clientProfiles: null,
  freelancerProfiles: null,
  paginatedUserProfiles: null,
  error: null,
};

export const userProfileReducer = createReducer(
  initialState,
  on(UserProfileActions.createClientProfileFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(UserProfileActions.createFreelancerProfileFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UserProfileActions.getCurrentUserProfile, (state) => ({ ...state })),
  on(
    UserProfileActions.getCurrentClientProfileResult,
    (state, { clientProfiles }) => ({
      ...state,
      clientProfiles: clientProfiles,
      freelancerProfiles: [],
    })
  ),
  on(
    UserProfileActions.getCurrentFreelancerProfileResult,
    (state, { freelancerProfiles }) => ({
      ...state,
      clientProfiles: [],
      freelancerProfiles: freelancerProfiles,
    })
  ),
  on(UserProfileActions.verifyClientProfile, (state, { profileId }) => ({
    ...state,
    clientProfiles: state.clientProfiles!.map((profile) =>
      profile.id === profileId ? { ...profile, isVerified: true } : profile
    ),
  })),
  on(UserProfileActions.verifyFreelancerProfile, (state, { profileId }) => ({
    ...state,
    freelancerProfiles: state.freelancerProfiles!.map((profile) =>
      profile.id === profileId ? { ...profile, isVerified: true } : profile
    ),
  })),
  on(
    UserProfileActions.deleteFreelancerProfileSuccess,
    (state, { freelancerProfileId }) => ({
      ...state,
      freelancerProfiles: state.freelancerProfiles!.filter(
        (profile) => profile.id !== freelancerProfileId
      ),
      error: null,
    })
  ),
  on(
    UserProfileActions.deleteClientProfileSuccess,
    (state, { clientProfileId }) => ({
      ...state,
      clientProfiles: state.clientProfiles!.filter(
        (profile) => profile.id !== clientProfileId
      ),
      error: null,
    })
  ),
  on(UserProfileActions.patchUserProfileAddressFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(UserProfileActions.patchUserDetailsFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(UserProfileActions.patchFreelancerDetailsFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(UserProfileActions.getUserProfilesSuccess, (state, { paginatedList }) => ({
    ...state,
    paginatedUserProfiles: paginatedList,
    error: null,
  }))
);
