import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfileState } from "./types";
import {
  loadCurrentUserProfile,
  saveClientProfile,
  saveFreelancerProfile,
  patchUserProfileAddress,
} from "./thunks";

const initialState: UserProfileState = {
  clientProfiles: null,
  freelancerProfiles: null,
  paginatedUserProfiles: null,
  error: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    verifyClientProfile: (state, action: PayloadAction<number>) => {
      state.clientProfiles = state.clientProfiles!.map((profile) =>
        profile.id === action.payload
          ? { ...profile, isVerified: true }
          : profile,
      );
    },
    verifreelancerProfile: (state, action: PayloadAction<number>) => {
      state.freelancerProfiles = state.freelancerProfiles!.map((profile) =>
        profile.id === action.payload
          ? { ...profile, isVerified: true }
          : profile,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCurrentUserProfile.fulfilled, (state, action) => {
        state.clientProfiles = action.payload.clientProfiles ?? null;
        state.freelancerProfiles = action.payload.freelancerProfiles ?? null;
      })
      .addCase(saveClientProfile.rejected, (state, action) => {
        state.error = action.payload ?? null;
      })
      .addCase(saveFreelancerProfile.rejected, (state, action) => {
        state.error = action.payload ?? null;
      })
      .addCase(patchUserProfileAddress.rejected, (state, action) => {
        state.error = action.payload ?? null;
      });
  },
});
export const { verifyClientProfile, verifreelancerProfile } =
  userProfileSlice.actions;
export default userProfileSlice.reducer;
