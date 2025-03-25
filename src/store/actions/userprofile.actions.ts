import { createAction, props } from '@ngrx/store';
import {
  AddressDto,
  ClientProfileDto,
  CreateClientProfileRequest,
  CreateFreelancerProfileRequest,
  FreelancerProfileDto,
} from '../../models/UserProfile';
import { HttpErrorResponse } from '@angular/common/http';
import { FreelancerDetailsData, UserDetailsData } from '../../models/Ui';
import { PaginatedList } from '../../models/generics';

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
const createFreelancerProfile = createAction(
  '[Data] Create Freelancer Profile',
  props<{ payload: CreateFreelancerProfileRequest }>()
);
const createFreelancerProfileSuccess = createAction(
  '[Data] Create Freelancer Profile Success'
);
const createFreelancerProfileFailure = createAction(
  '[Data] Create Freelancer Profile Failure',
  props<{ error: HttpErrorResponse }>()
);
const getCurrentUserProfile = createAction('[Data] Get Current Client Profile');
const getCurrentClientProfileResult = createAction(
  '[Data] Get current Client Profiles Result',
  props<{ clientProfiles: ClientProfileDto[] }>()
);
const getCurrentFreelancerProfileResult = createAction(
  '[Data] Get current Freelancer Profiles Result',
  props<{ freelancerProfiles: FreelancerProfileDto[] }>()
);
const verifyClientProfile = createAction(
  '[Client Profile] verify profile',
  props<{ profileId: number }>()
);
const verifyFreelancerProfile = createAction(
  '[Freelancer Profile] verify profile',
  props<{ profileId: number }>()
);
const deleteUserProfile = createAction(
  '[User Profile] delete user profile',
  props<{ profileId: number }>()
);
const deleteClientProfileSuccess = createAction(
  '[Client Profile] delete client profile success',
  props<{ clientProfileId: number }>()
);
const deleteFreelancerProfileSuccess = createAction(
  '[Freelancer Profile] delete client profile success',
  props<{ freelancerProfileId: number }>()
);
const patchUserProfileAddress = createAction(
  '[Data] Patch User Profile Address',
  props<{ id: number; payload: AddressDto }>()
);
const patchUserProfileDetails = createAction(
  '[Data] Patch User profile Details',
  props<{ id: number; payload: UserDetailsData }>()
);
const patchFreelancerProfileDetails = createAction(
  '[Data] Patch Freelancer profile data',
  props<{ id: number; payload: FreelancerDetailsData }>()
);
const patchUserProfileAddressFailure = createAction(
  '[Data] Patch User Profile Address Failure',
  props<{ error: HttpErrorResponse }>()
);
const patchUserDetailsFailure = createAction(
  '[Data] Patch User Profile Data Failure',
  props<{ error: HttpErrorResponse }>()
);
const patchFreelancerDetailsFailure = createAction(
  '[Data] Patch Freelancer Profile Details Failure',
  props<{ error: HttpErrorResponse }>()
);
const getUserProfiles = createAction(
  '[User Profile] Get User Profiles',
  props<{ pageSize: number; pageNumber: number }>()
);
const getUserProfilesSuccess = createAction(
  '[User Profile] Get User Profiles Success',
  props<{ paginatedList: PaginatedList<object> }>()
);

export {
  getCurrentClientProfileResult,
  verifyClientProfile,
  verifyFreelancerProfile,
  deleteUserProfile,
  deleteClientProfileSuccess,
  deleteFreelancerProfileSuccess,
  patchUserProfileAddress,
  patchUserProfileDetails,
  createClientProfile,
  createClientProfileSuccess,
  createClientProfileFailure,
  createFreelancerProfile,
  createFreelancerProfileSuccess,
  createFreelancerProfileFailure,
  getCurrentUserProfile,
  getCurrentFreelancerProfileResult,
  patchFreelancerProfileDetails,
  patchUserProfileAddressFailure,
  patchUserDetailsFailure,
  patchFreelancerDetailsFailure,
  getUserProfiles,
  getUserProfilesSuccess,
};
