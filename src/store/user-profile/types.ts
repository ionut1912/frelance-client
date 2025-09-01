import { AxiosError } from "axios";
import {
  ClientProfileDto,
  CreateClientProfileRequest,
  CreateFreelancerProfileRequest,
  FreelancerProfileDto,
  PatchFreelancerProfielRequest,
  PatchUserDetailsRequest,
  PatchUserProfileAddressRequest,
} from "../../models/UserProfile";
import { PaginatedDataRequest, PaginatedList } from "../../models/Ui";

export interface UserProfileState {
  clientProfiles?: ClientProfileDto[] | null;
  freelancerProfiles?: FreelancerProfileDto[] | null;
  paginatedUserProfiles?: PaginatedList<object> | null;
  error: AxiosError | null;
}

export const CREATE_CLIENT_PROFILE_REQUEST =
  "userProfile/CREATE_CLIENT_PROFILE_REQUEST";
export const CREATE_CLIENT_PROFILE_SUCCESS =
  "userProfile/CREATE_CLIENT_PROFILE_SUCCESS";
export const CREATE_CLIENT_PROFILE_FAILURE =
  "userProfile/CREATE_CLIENT_PROFILE_FAILURE";
export const CREATE_FREELANCER_PROFILE_REQUEST =
  "userProfile/CREATE_FREELANCER_PROFILE_REQUEST";
export const CREATE_FREELANCER_PROFILE_SUCCESS =
  "userProfile/CREATE_FREELANCER_PROFILE_SUCCESS";
export const CREATE_FREELANCER_PROFILE_FAILURE =
  "userProfile/CREATE_FREELANCER_PROFILE_FAILURE";
export const GET_CURRENT_USER_PROFILE_REQUEST =
  "userProfile/GET_CURRENT_USER_PROFILE_REQUEST";
export const GET_CURRENT_CLIENT_PROFILE_RESULT =
  "userProfile/GET_CURRENT_USER_PROFILE_RESULT";
export const GET_CURRENT_FREELANCER_PROFILE_RESULT =
  "userProfile/GET_CURRENT_FREELANCER_PROFILE_RESULT";
export const VERIFY_CLIENT_PROFILE_REQUEST =
  "userProfile/VERIFY_CLIENT_PROFILE_REQUEST";
export const VERIFY_FREELANCER_PROFILE_REQUEST =
  "userProfile/VERIFY_FREELANCER_PROFILE_REQUEST";
export const DELETE_USER_PROFILE_REQUEST =
  "userProfile/DELETE_USER_PROFILE_REQUEST";
export const DELETE_CLIENT_PROFILE_SUCCESS =
  "userProfile/DELETE_CLIENT_PROFILE_SUCCESS";
export const DELETE_FREELANCER_PROFILE_SUCCESS =
  "userProfile/DELETE_FREELANCER_PROFILE_SUCCESS";
export const PATCH_USER_PROFILE_ADDRESS =
  "userProfile/PATCH_USER_PROFILE_ADDRESS";
export const PATCH_USER_PROFILE_DETAILS =
  "userProfile/PATCH_USER_PROFILE_DETAILS";
export const PATCH_FREELANCER_PROFILE_DETAILS =
  "frelancer/PATCH_FREELANCER_PROFILE_DETAILS";
export const PATCH_USER_PROFILE_ADDRESS_FAILURE =
  "userProfile/PATCH_USER_PROFILE_ADDRESS_FAILURE";
export const PATCH_USER_PROFILE_DETAILS_FAILURE =
  "userProfile/PATCH_USER_PROFILE_DETAILS_FAILURE";
export const PATCH_FRELANCER_DETAILS_FAILURE =
  "frelancer/PATCH_FRELANCER_DETAILS_FAILURE";
export const GET_USER_PROFILES = "userProfile/GET_USER_PROFILES";
export const GET_USER_PROFILES_SUCCESS =
  "userProfile/GET_USER_PROFILES_SUCCESS";

interface CreateClientProfileAction {
  type: typeof CREATE_CLIENT_PROFILE_REQUEST;
  payload: CreateClientProfileRequest;
}

interface CreateClientProfileSuccessAction {
  type: typeof CREATE_CLIENT_PROFILE_SUCCESS;
}

interface CreateClientProfileFaiureAction {
  type: typeof CREATE_CLIENT_PROFILE_FAILURE;
  error: AxiosError;
}

interface CreateFreelancerProfileAction {
  type: typeof CREATE_FREELANCER_PROFILE_REQUEST;
  payload: CreateFreelancerProfileRequest;
}

interface CreateFreelancerProfileSucessAction {
  type: typeof CREATE_FREELANCER_PROFILE_SUCCESS;
}

interface CreateFreelancerProfileFailureAction {
  type: typeof CREATE_FREELANCER_PROFILE_FAILURE;
  error: AxiosError;
}

interface GetCurentProfileAction {
  type: typeof GET_CURRENT_USER_PROFILE_REQUEST;
}

interface GetCurentClientProfileResultAction {
  type: typeof GET_CURRENT_CLIENT_PROFILE_RESULT;
  clientProfiles: ClientProfileDto[];
}

interface GetCurentFreelancerProfileResultAction {
  type: typeof GET_CURRENT_FREELANCER_PROFILE_RESULT;
  freelancerProfiles: FreelancerProfileDto[];
}

interface VerifyClientProfileAction {
  type: typeof VERIFY_CLIENT_PROFILE_REQUEST;
  profileId: number;
}

interface VerifyFreelancerProfileAction {
  type: typeof VERIFY_FREELANCER_PROFILE_REQUEST;
  profileId: number;
}

interface DeleteUserProfileAction {
  type: typeof DELETE_USER_PROFILE_REQUEST;
  profileId: number;
}

interface DeleteClientProfileSuccessAction {
  type: typeof DELETE_CLIENT_PROFILE_SUCCESS;
  clientProfileId: number;
}

interface DeleteFreelancerProfileSuccessAction {
  type: typeof DELETE_FREELANCER_PROFILE_SUCCESS;
  freelancerProfileId: number;
}

interface PatchUserProfileAddressAction {
  type: typeof PATCH_USER_PROFILE_ADDRESS;
  payload: PatchUserProfileAddressRequest;
}

interface PatchUserProfileDetailsAction {
  type: typeof PATCH_USER_PROFILE_DETAILS;
  payload: PatchUserDetailsRequest;
}

interface PatchFreelancerProfileDetailsAction {
  type: typeof PATCH_FREELANCER_PROFILE_DETAILS;
  payload: PatchFreelancerProfielRequest;
}

interface PatchFreelancerProfileDetailsFailureAction {
  type: typeof PATCH_FRELANCER_DETAILS_FAILURE;
  error: AxiosError;
}

interface PatchUserAddresFailureAction {
  type: typeof PATCH_USER_PROFILE_ADDRESS_FAILURE;
  error: AxiosError;
}

interface PatchUserDetailsFailureAction {
  type: typeof PATCH_USER_PROFILE_DETAILS_FAILURE;
  error: AxiosError;
}

interface GetUserProfilesAction {
  type: typeof GET_USER_PROFILES;
  payload: PaginatedDataRequest;
}

interface GetUserProfielsSuccessAction {
  type: typeof GET_USER_PROFILES_SUCCESS;
  response: PaginatedList<object>;
}

export type UserProfileAction =
  | CreateClientProfileAction
  | CreateClientProfileSuccessAction
  | CreateClientProfileFaiureAction
  | CreateFreelancerProfileAction
  | CreateFreelancerProfileSucessAction
  | CreateFreelancerProfileFailureAction
  | GetCurentProfileAction
  | GetCurentClientProfileResultAction
  | GetCurentFreelancerProfileResultAction
  | VerifyClientProfileAction
  | VerifyFreelancerProfileAction
  | DeleteUserProfileAction
  | DeleteClientProfileSuccessAction
  | DeleteFreelancerProfileSuccessAction
  | PatchUserProfileAddressAction
  | PatchUserProfileDetailsAction
  | PatchFreelancerProfileDetailsAction
  | PatchUserAddresFailureAction
  | PatchUserDetailsFailureAction
  | PatchFreelancerProfileDetailsFailureAction
  | GetUserProfilesAction
  | GetUserProfielsSuccessAction;
