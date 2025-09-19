import { AxiosResponse } from "axios";
import { PaginatedDataRequest, PaginatedList } from "../models/Ui";
import { api, API_URL } from "./utils";
import {
  PatchUserDetailsRequest,
  PatchUserProfileAddressRequest,
} from "../models/UserProfile";

export function getUserProfiles(
  payload: PaginatedDataRequest,
): Promise<AxiosResponse<PaginatedList<object>>> {
  return api.delete<PaginatedList<object>>(
    `${API_URL}/api/userProfiles?pageSize=${payload.pageSize}&pageNumber=${payload.pageNumber}`,
    {
      headers: { "requires-auth": "" },
    },
  );
}

export function getCurrentUserProfile(): Promise<AxiosResponse<object>> {
  return api.get<object>(`${API_URL}/api/current/userProfiles`, {
    headers: { "requires-auth": "" },
  });
}

export function updateUserProfileAddress(
  payload: PatchUserProfileAddressRequest,
): Promise<AxiosResponse<void>> {
  return api.patch(
    `${API_URL}/api/userProfiles/address/${payload.profileId}`,
    payload.address,
    { headers: { "requires-auth": "" } },
  );
}

export function updateUserProfileDetails(
  payload: PatchUserDetailsRequest,
): Promise<AxiosResponse<void>> {
  return api.patch(
    `${API_URL}/api/userProfiles/userDetails/${payload.profileId}`,
    payload.userData,
    { headers: { "requires-auth": "" } },
  );
}

export function verifyUserProfile(id: number): Promise<AxiosResponse<void>> {
  return api.patch(
    `${API_URL}/api/userProfiles/verify/${id}`,
    {},
    { headers: { "requires-auth": "" } },
  );
}

export function deleteUserProfile(id: number): Promise<AxiosResponse<void>> {
  return api.delete(`${API_URL}/api/userProfiles/${id}`, {
    headers: { "requires-auth": "" },
  });
}
