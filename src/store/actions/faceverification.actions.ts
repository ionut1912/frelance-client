import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { VerifyFacePayload, VerifyFaceResult } from '../../models/UserProfile';

const verifyFace = createAction(
  '[Face verification] verify face',
  props<{ payload: VerifyFacePayload }>()
);
const verifyFaceSuccess = createAction(
  '[Face verification] verify face success',
  props<{ verifyFaceResult: VerifyFaceResult }>()
);
const verifyFaceFailure = createAction(
  '[Face verification] verify face failure',
  props<{ error: HttpErrorResponse }>()
);

const incrementFalseCount = createAction(
  '[Face verification] increment false count'
);
const resetFalseCount = createAction('[Face verification] reset false count');

export {
  verifyFace,
  verifyFaceSuccess,
  verifyFaceFailure,
  incrementFalseCount,
  resetFalseCount,
};
