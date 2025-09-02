import { AxiosResponse } from "axios";
import {
  FaceVerificationRequest,
  VerifyFaceResult,
} from "../models/UserProfile";
import { api, API_URL } from "./utils";

export default function verifyFace(
  faceVerificationRequest: FaceVerificationRequest,
): Promise<AxiosResponse<VerifyFaceResult>> {
  return api.post<VerifyFaceResult>(
    `${API_URL}/api/verifyFace`,
    faceVerificationRequest,
    { headers: { "requires-auth": "" } },
  );
}
