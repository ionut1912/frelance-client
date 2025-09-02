import { AxiosError } from "axios";
import { verifyCapturedFace } from "./thunks";
import { FaceVerificationState } from "./types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: FaceVerificationState = {
  verifyFaceResult: null,
  falseCount: 0,
  error: null,
};

const faceVerificationSlice = createSlice({
  name: "faceVerification",
  initialState,
  reducers: {
    incrementFalseCount: (state) => {
      state.falseCount += 1;
    },
    resetFalseCount: (state) => {
      state.falseCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyCapturedFace.fulfilled, (state, action) => {
        state.verifyFaceResult = action.payload;
        state.error = null;
      })
      .addCase(verifyCapturedFace.rejected, (state, action) => {
        state.error = (action.error as AxiosError) ?? null;
      });
  },
});

export const { incrementFalseCount, resetFalseCount } =
  faceVerificationSlice.actions;
export default faceVerificationSlice.reducer;
