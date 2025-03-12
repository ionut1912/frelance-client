import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import {
  CreateFreelancerProfileRequest,
  FreelancerProfileDto,
} from '../../models/UserProfile';

const getCurrentFreelancerProfile = createAction(
  '[Data] Get Current Freelancer Profile'
);
const getCurrentFreelancerProfileResult = createAction(
  '[Data] Get Current Freelancer Profile Result',
  props<{ freelancerProfiles: FreelancerProfileDto[] }>()
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
const verifyFreelancerProfile = createAction(
  '[Freelancer Profile] verify profile',
  props<{ profileId: number }>()
);
const deleteFreelancerProfile = createAction(
  '[Freelancer Profile] delete client profile',
  props<{ id: number }>()
);
const deleteFreelancerProfileSuccess = createAction(
  '[Freelancer Profile] delete client profile success',
  props<{ freelancerProfileId: number }>()
);
const deleteFreelancerProfileFailure = createAction(
  '[Freelancer Profile] delete client profile failure',
  props<{ error: HttpErrorResponse }>()
);
export {
  getCurrentFreelancerProfile,
  getCurrentFreelancerProfileResult,
  createFreelancerProfile,
  createFreelancerProfileSuccess,
  createFreelancerProfileFailure,
  verifyFreelancerProfile,
  deleteFreelancerProfile,
  deleteFreelancerProfileSuccess,
  deleteFreelancerProfileFailure,
};
