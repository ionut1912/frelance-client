import { AxiosError } from "axios";
import { VerifyFaceResult } from "../../models/UserProfile";

export interface FaceVerificationState {
  verifyFaceResult: VerifyFaceResult | null;
  error: AxiosError | null;
  falseCount: number;
}
