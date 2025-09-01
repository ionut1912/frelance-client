import {
  CreateFreelancerProfileRequest,
  PatchFreelancerProfielRequest,
} from "../models/UserProfile";
import { api, API_URL } from "./utils";
import { AxiosResponse } from "axios";
``;
export function createFreelancerProfile(
  payload: CreateFreelancerProfileRequest,
): Promise<AxiosResponse<any>> {
  return api.post(`${API_URL}/api/freelancerProfiles`, payload, {
    headers: { "requires-auth": "" },
  });
}

export function updateFreelancerProfileData(
  payload: PatchFreelancerProfielRequest,
): Promise<AxiosResponse<any>> {
  return api.patch(
    `${API_URL}/api/freelancerProfiles/freelancerDetails/${payload.profileId}`,
    payload.freelancerData,
    { headers: { "requires-auth": "" } },
  );
}
