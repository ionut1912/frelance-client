import { createSlice } from "@reduxjs/toolkit";
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
  reducers: {},
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

export default userProfileSlice.reducer;
