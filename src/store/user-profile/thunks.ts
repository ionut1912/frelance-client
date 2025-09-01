import {
  CREATE_CLIENT_PROFILE_FAILURE,
  CREATE_CLIENT_PROFILE_REQUEST,
  CREATE_CLIENT_PROFILE_SUCCESS,
  CREATE_FREELANCER_PROFILE_FAILURE,
  CREATE_FREELANCER_PROFILE_REQUEST,
  CREATE_FREELANCER_PROFILE_SUCCESS,
  DELETE_CLIENT_PROFILE_SUCCESS,
  DELETE_FREELANCER_PROFILE_SUCCESS,
  DELETE_USER_PROFILE_REQUEST,
  GET_CURRENT_CLIENT_PROFILE_RESULT,
  GET_CURRENT_FREELANCER_PROFILE_RESULT,
  GET_CURRENT_USER_PROFILE_REQUEST,
  GET_USER_PROFILES,
  GET_USER_PROFILES_SUCCESS,
  PATCH_FREELANCER_PROFILE_DETAILS,
  PATCH_FRELANCER_DETAILS_FAILURE,
  PATCH_USER_PROFILE_ADDRESS,
  PATCH_USER_PROFILE_ADDRESS_FAILURE,
  PATCH_USER_PROFILE_DETAILS,
  PATCH_USER_PROFILE_DETAILS_FAILURE,
  UserProfileAction,
} from "./types";
import { Dispatch } from "redux";
import { AxiosError, AxiosResponse } from "axios";
import {
  deleteUserProfile,
  getCurrentUserProfile,
  getUserProfiles,
  updateUserProfileAddress,
} from "../../services/userProfileService,";
import {
  CreateClientProfileRequest,
  CreateFreelancerProfileRequest,
  PatchFreelancerProfielRequest,
  PatchUserDetailsRequest,
  PatchUserProfileAddressRequest,
} from "../../models/UserProfile";
import { PaginatedDataRequest } from "../../models/Ui";
import { toast } from "react-toastify";
import { createClientProfile } from "../../services/clientProfileService";
import { extractErrorMessages } from "../../utils/httpError";
import {
  createFreelancerProfile,
  updateFreelancerProfileData,
} from "../../services/freelancerProfileService";
import { RootState } from "../../store";
export const loadCurrentUserProfile =
  () =>
  async (dispatch: Dispatch<UserProfileAction>, getState: () => RootState) => {
    dispatch({ type: GET_CURRENT_USER_PROFILE_REQUEST });
    const response: AxiosResponse = await getCurrentUserProfile();
    const role = getState().auth.role;
    if (role === "Client") {
      dispatch({
        type: GET_CURRENT_CLIENT_PROFILE_RESULT,
        clientProfiles: response.data,
      });
    } else if (role === "Freelancer") {
      dispatch({
        type: GET_CURRENT_FREELANCER_PROFILE_RESULT,
        freelancerProfiles: response.data,
      });
    } else {
      console.warn("Unknown user role:", role);
    }
  };
export const saveClientProfile =
  (payload: CreateClientProfileRequest) =>
  async (dispatch: Dispatch<UserProfileAction>) => {
    dispatch({ type: CREATE_CLIENT_PROFILE_REQUEST, payload });
    try {
      await createClientProfile(payload);
      dispatch({ type: CREATE_CLIENT_PROFILE_SUCCESS });
      dispatch({ type: GET_CURRENT_USER_PROFILE_REQUEST });
      toast.success("Client profile created successfully");
    } catch (error) {
      const messages = extractErrorMessages(error);
      dispatch({
        type: CREATE_CLIENT_PROFILE_FAILURE,
        error: error as AxiosError,
      });
      messages.forEach((m) => toast.error(m));
    }
  };

export const saveFreelancerProfile =
  (payload: CreateFreelancerProfileRequest) =>
  async (dispatch: Dispatch<UserProfileAction>) => {
    dispatch({ type: CREATE_FREELANCER_PROFILE_REQUEST, payload });
    try {
      await createFreelancerProfile(payload);
      dispatch({ type: CREATE_FREELANCER_PROFILE_SUCCESS });
      dispatch({ type: GET_CURRENT_USER_PROFILE_REQUEST });
      toast.success("Freelancer profile created successfully");
    } catch (error) {
      const messages = extractErrorMessages(error);
      dispatch({
        type: CREATE_FREELANCER_PROFILE_FAILURE,
        error: error as AxiosError,
      });
      messages.forEach((m) => toast.error(m));
    }
  };

export const removeUserProfile =
  (id: number) =>
  async (dispatch: Dispatch<UserProfileAction>, getState: () => RootState) => {
    dispatch({ type: DELETE_USER_PROFILE_REQUEST, profileId: id });
    await deleteUserProfile(id);
    const role = getState().auth.role;
    if (role === "Client") {
      dispatch({ type: DELETE_CLIENT_PROFILE_SUCCESS, clientProfileId: id });
    } else if (role === "Freelancer") {
      dispatch({
        type: DELETE_FREELANCER_PROFILE_SUCCESS,
        freelancerProfileId: id,
      });
    }
  };

export const patchUserProfileAddress =
  (payload: PatchUserProfileAddressRequest) =>
  async (dispatch: Dispatch<UserProfileAction>) => {
    dispatch({ type: PATCH_USER_PROFILE_ADDRESS, payload });
    try {
      await updateUserProfileAddress(payload);
      dispatch({ type: GET_CURRENT_USER_PROFILE_REQUEST });
      toast.success("Address updated successfully");
    } catch (error) {
      const messages = extractErrorMessages(error);
      dispatch({
        type: PATCH_USER_PROFILE_ADDRESS_FAILURE,
        error: error as AxiosError,
      });
      messages.forEach((m) => toast.error(m));
    }
  };

export const patchUserData =
  (payload: PatchUserDetailsRequest) =>
  async (dispatch: Dispatch<UserProfileAction>) => {
    dispatch({ type: PATCH_USER_PROFILE_DETAILS, payload });
    try {
      await updateUserProfileAddress(payload);
      dispatch({ type: GET_CURRENT_USER_PROFILE_REQUEST });
      toast.success("Details updated successfully");
    } catch (error) {
      const messages = extractErrorMessages(error);
      dispatch({
        type: PATCH_USER_PROFILE_DETAILS_FAILURE,
        error: error as AxiosError,
      });
      messages.forEach((m) => toast.error(m));
    }
  };

export const patchFreelancerData =
  (payload: PatchFreelancerProfielRequest) =>
  async (dispatch: Dispatch<UserProfileAction>) => {
    dispatch({ type: PATCH_FREELANCER_PROFILE_DETAILS, payload });
    try {
      await updateFreelancerProfileData(payload);
      dispatch({ type: GET_CURRENT_USER_PROFILE_REQUEST });
      toast.success("Freelancer details updated successfully");
    } catch (error) {
      const messages = extractErrorMessages(error);
      dispatch({
        type: PATCH_FRELANCER_DETAILS_FAILURE,
        error: error as AxiosError,
      });
      messages.forEach((m) => toast.error(m));
    }
  };

export const getUserProfilesData =
  (payload: PaginatedDataRequest) =>
  async (dispatch: Dispatch<UserProfileAction>) => {
    dispatch({ type: GET_USER_PROFILES, payload });
    const response = await getUserProfiles(payload);
    dispatch({ type: GET_USER_PROFILES_SUCCESS, response: response.data });
  };
