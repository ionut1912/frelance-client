import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  CreateClientProfileRequest,
  CreateFreelancerProfileRequest,
  PatchUserProfileAddressRequest,
  PatchUserDetailsRequest,
  PatchFreelancerProfielRequest,
  ClientProfileDto,
  FreelancerProfileDto,
} from "../../models/UserProfile";
import { PaginatedDataRequest } from "../../models/Ui";
import { extractErrorMessages } from "../../utils/httpError";
import { AppDispatch, RootState } from "../../store";
import {
  deleteUserProfile,
  getCurrentUserProfile,
  getUserProfiles,
  updateUserProfileAddress,
  updateUserProfileDetails,
} from "../../services/userProfileService";
import { createClientProfile } from "../../services/clientProfileService";
import {
  createFreelancerProfile,
  updateFreelancerProfileData,
} from "../../services/freelancerProfileService";

export const loadCurrentUserProfile = createAsyncThunk<
  {
    clientProfiles?: ClientProfileDto[];
    freelancerProfiles?: FreelancerProfileDto[];
  },
  void,
  { state: RootState }
>("userProfile/loadCurrentUserProfile", async (_, { getState }) => {
  const response = await getCurrentUserProfile();
  const role = getState().auth.role;
  if (role === "Client") {
    const dto = response.data as ClientProfileDto;
    return {
      clientProfiles: dto ? [dto] : [],
      freelancerProfiles: [],
    };
  }
  if (role === "Freelancer") {
    const dto = response.data as FreelancerProfileDto;
    return {
      clientProfiles: [],
      freelancerProfiles: dto ? [dto] : [],
    };
  }

  return { clientProfiles: [], freelancerProfiles: [] };
});

export const saveClientProfile = createAsyncThunk<
  void,
  CreateClientProfileRequest,
  { rejectValue: AxiosError; dispatch: AppDispatch }
>(
  "userProfile/saveClientProfile",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      await createClientProfile(payload);
      toast.success("Client profile created successfully");
      dispatch(loadCurrentUserProfile());
    } catch (error) {
      const messages = extractErrorMessages(error);
      messages.forEach((m) => toast.error(m));
      return rejectWithValue(error as AxiosError);
    }
  },
);

export const saveFreelancerProfile = createAsyncThunk<
  void,
  CreateFreelancerProfileRequest,
  { rejectValue: AxiosError; dispatch: AppDispatch }
>(
  "userProfile/saveFreelancerProfile",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      await createFreelancerProfile(payload);
      toast.success("Freelancer profile created successfully");
      dispatch(loadCurrentUserProfile());
    } catch (error) {
      const messages = extractErrorMessages(error);
      messages.forEach((m) => toast.error(m));
      return rejectWithValue(error as AxiosError);
    }
  },
);

export const removeUserProfile = createAsyncThunk<
  void,
  number,
  { state: RootState; rejectValue: AxiosError }
>(
  "userProfile/removeUserProfile",
  async (id, { dispatch, getState, rejectWithValue }) => {
    try {
      await deleteUserProfile(id);
      const role = getState().auth.role;
      if (role === "Client")
        dispatch({
          type: "userProfile/deleteClientProfileSuccess",
          payload: id,
        });
      if (role === "Freelancer")
        dispatch({
          type: "userProfile/deleteFreelancerProfileSuccess",
          payload: id,
        });
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

export const patchUserProfileAddress = createAsyncThunk<
  void,
  PatchUserProfileAddressRequest,
  { rejectValue: AxiosError; dispatch: AppDispatch }
>(
  "userProfile/patchUserProfileAddress",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      await updateUserProfileAddress(payload);
      toast.success("Address updated successfully");
      dispatch(loadCurrentUserProfile());
    } catch (error) {
      const messages = extractErrorMessages(error);
      messages.forEach((m) => toast.error(m));
      return rejectWithValue(error as AxiosError);
    }
  },
);

export const patchUserData = createAsyncThunk<
  void,
  PatchUserDetailsRequest,
  { rejectValue: AxiosError; dispatch: AppDispatch }
>(
  "userProfile/patchUserData",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      await updateUserProfileDetails(payload);
      toast.success("Details updated successfully");
      dispatch(loadCurrentUserProfile());
    } catch (error) {
      const messages = extractErrorMessages(error);
      messages.forEach((m) => toast.error(m));
      return rejectWithValue(error as AxiosError);
    }
  },
);

export const patchFreelancerData = createAsyncThunk<
  void,
  PatchFreelancerProfielRequest,
  { rejectValue: AxiosError; dispatch: AppDispatch }
>(
  "userProfile/patchFreelancerData",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      await updateFreelancerProfileData(payload);
      toast.success("Freelancer details updated successfully");
      dispatch(loadCurrentUserProfile());
    } catch (error) {
      const messages = extractErrorMessages(error);
      messages.forEach((m) => toast.error(m));
      return rejectWithValue(error as AxiosError);
    }
  },
);
export const getUserProfilesData = createAsyncThunk<
  void,
  PaginatedDataRequest,
  { rejectValue: AxiosError }
>(
  "userProfile/getUserProfilesData",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await getUserProfiles(payload);
      dispatch({
        type: "userProfile/getUserProfilesSuccess",
        payload: response.data,
      });
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);
