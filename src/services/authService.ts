import axios, { AxiosResponse } from 'axios';
import { LoginDto, RegisterDto, UserDto } from '../models/Accounts';

const API_URL = "https://localhost:7020"

export function register(payload: RegisterDto): Promise<AxiosResponse<void>> {
  return axios.post<void>(`${API_URL}/api/auth/register`, payload);
}

export function login(payload: LoginDto): Promise<AxiosResponse<UserDto>> {
  return axios.post<UserDto>(`${API_URL}/api/auth/login`, payload);
}

export function blockAccount(id: string): Promise<AxiosResponse<void>> {
  return axios.post<void>(
    `${API_URL}/api/auth/block/${id}`,
    {},
    { headers: { 'requires-auth': '' } }
  );
}

export function deleteAccount(id: string): Promise<AxiosResponse<void>> {
  return axios.delete<void>(
    `${API_URL}/api/auth/account/${id}`,
    { headers: { 'requires-auth': '' } }
  );
}
