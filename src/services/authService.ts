import { AxiosResponse } from "axios";
import { LoginDto, RegisterDto, UserDto } from "../models/Accounts";
import { createAuthAxios } from "../utils/authUtils";

const API_URL = "https://localhost:7020";
const api = createAuthAxios(API_URL);

export function register(payload: RegisterDto): Promise<AxiosResponse<void>> {
  return api.post<void>(`${API_URL}/api/auth/register`, payload);
}

export function login(payload: LoginDto): Promise<AxiosResponse<UserDto>> {
  return api.post<UserDto>(`${API_URL}/api/auth/login`, payload);
}

export function blockAccount(id: string): Promise<AxiosResponse<void>> {
  return api.post<void>(
    `${API_URL}/api/auth/block/${id}`,
    {},
    { headers: { "requires-auth": "" } },
  );
}

export function deleteAccount(id: string): Promise<AxiosResponse<void>> {
  return api.delete<void>(`${API_URL}/api/auth/account/${id}`, {
    headers: { "requires-auth": "" },
  });
}
