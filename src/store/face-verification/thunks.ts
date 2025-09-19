import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  ClientProfileDto,
  FreelancerProfileDto,
  UserRole,
  VerifyFaceRequest,
  VerifyFaceResult,
} from "../../models/UserProfile";

import { NavigateFunction } from "react-router-dom";
import { verifyUserProfile } from "../../services/userProfileService";
import { AppDispatch, RootState } from "../../store";
import { resetFalseCount, incrementFalseCount } from "./slice";
import verifyFace from "../../services/faceVerificationService";
import { blockUserAccount, deleteUserAccount } from "../auth/thunks";
import {
  verifreelancerProfile,
  verifyClientProfile,
} from "../user-profile/slice";
import { removeUserProfile } from "../user-profile/thunks";

export const verifyCapturedFace = createAsyncThunk<
  VerifyFaceResult,
  VerifyFaceRequest,
  { rejectValue: AxiosError }
>(
  "faceVerification/verifyFace",
  async (payload, { dispatch, getState, rejectWithValue }) => {
    const appDispatch = dispatch as AppDispatch;
    const state = getState as () => RootState;

    try {
      const verifyFaceResult = await verifyFace(
        payload.faceVerificationRequest,
      );

      if (verifyFaceResult.data.isMatch) {
        await processMatch(appDispatch, state().auth.role!, payload.profile);
      } else {
        await processNoMatch(
          appDispatch,
          state,
          payload.profile,
          payload.navigate,
        );
      }

      return verifyFaceResult.data;
    } catch (err) {
      const error = err as AxiosError;

      toast.error("Face verification failed: Unable to verify face");

      if (error.response?.status === 404) {
        toast.warning(
          "We will delete your profile data, because we don't find a face in one of your images",
        );
        appDispatch(deleteUserAccount(payload.profile.id));
      }

      return rejectWithValue(error);
    }
  },
);

async function processMatch(
  dispatch: AppDispatch,
  role: UserRole,
  profile: ClientProfileDto | FreelancerProfileDto,
) {
  if (role === "Freelancer") {
    await verifyUserProfile(profile.id);
    dispatch(verifreelancerProfile(profile.id));
  } else {
    await verifyUserProfile(profile.id);
    dispatch(verifyClientProfile(profile.id));
  }
  window.location.reload();
  dispatch(resetFalseCount());
}

async function processNoMatch(
  dispatch: AppDispatch,
  getState: () => RootState,
  profile: ClientProfileDto | FreelancerProfileDto,
  navigate: NavigateFunction,
) {
  dispatch(incrementFalseCount());
  const { falseCount } = getState().faceVerification;

  if (falseCount === 3 || falseCount === 6) {
    dispatch(blockUserAccount({ id: profile.user.id, navigate }));
    dispatch(deleteUserAccount(profile.id));
    toast.error(
      `Your account will be locked for 1h because you attempted verification ${falseCount} times`,
    );
    navigate("/");
  } else if (falseCount === 9) {
    dispatch(deleteUserAccount(profile.user.id));
    dispatch(removeUserProfile(profile.id));
    dispatch(resetFalseCount());
    toast.error(
      "Your account will be deleted because you attempted verification too many times",
    );
    navigate("/");
  }

  toast.warning(`Verification failed count: ${falseCount}`);
  toast.warning(
    "Your profile picture and the captured picture are not similar",
  );
  toast.warning("We will delete your profile and you can try again");
}
