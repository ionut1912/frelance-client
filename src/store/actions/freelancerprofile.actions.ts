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
  props<{ freelancerProfile: FreelancerProfileDto }>()
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
export {
  getCurrentFreelancerProfile,
  getCurrentFreelancerProfileResult,
  createFreelancerProfile,
  createFreelancerProfileSuccess,
  createFreelancerProfileFailure,
};
