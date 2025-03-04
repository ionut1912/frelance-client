import { VerifyFaceResult } from '../../models/UserProfile';
import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import * as FaceVerificationActions from '../actions/faceverification.actions';

export interface FaceVerificationState {
  verifyFaceResult: VerifyFaceResult | null;
  error: HttpErrorResponse | null;
  falseCount: number;
}

const initialState: FaceVerificationState = {
  verifyFaceResult: null,
  error: null,
  falseCount: 0,
};

export const faceVerificationReducer = createReducer(
  initialState,
  on(FaceVerificationActions.verifyFaceFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    FaceVerificationActions.verifyFaceSuccess,
    (state, { verifyFaceResult }) => ({
      ...state,
      verifyFaceResult,
    })
  ),
  on(FaceVerificationActions.incrementFalseCount, (state) => ({
    ...state,
    falseCount: state.falseCount + 1,
  })),
  on(FaceVerificationActions.resetFalseCount, (state) => ({
    ...state,
    falseCount: 0,
  }))
);
