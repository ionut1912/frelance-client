import { AxiosResponse } from "axios";
import { LoginDto, RegisterDto, UserDto } from "../models/Accounts";
import { api, API_URL } from "./utils";

export function register(payload: RegisterDto): Promise<AxiosResponse<void>> {
  return api.post<void>(`${API_URL}/api/auth/register`, payload);
}

export function login(payload: LoginDto): Promise<AxiosResponse<UserDto>> {
  return api.post<UserDto>(`${API_URL}/api/auth/login`, payload);
}

export function blockAccount(id: number): Promise<AxiosResponse<void>> {
  return api.post<void>(
    `${API_URL}/api/auth/block/${id}`,
    {},
    { headers: { "requires-auth": "" } },
  );
}

export function deleteAccount(id: number): Promise<AxiosResponse<void>> {
  return api.delete<void>(`${API_URL}/api/auth/account/${id}`, {
    headers: { "requires-auth": "" },
  });
}

export function deleteCurrentAccount(): Promise<AxiosResponse<void>> {
  return api.delete<void>(`${API_URL}/api/auth/account/current`, {
    headers: { "requires-auth": "" },
  });
}
