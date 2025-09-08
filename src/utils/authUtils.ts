import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { NavigateFunction } from "react-router-dom";
import { jwtDecode, JwtPayload as DefaultJwtPayload } from "jwt-decode";

interface JwtPayload extends DefaultJwtPayload {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
}

export function getRoleFromToken(token: string): string | null {
  try {
    const payload = jwtDecode<JwtPayload>(token);
    return (
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
      null
    );
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}
export function createAuthAxios(baseURL: string): AxiosInstance {
  const api = axios.create({ baseURL });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (config.headers && "requires-auth" in config.headers) {
      delete (config.headers as Record<string, unknown>)["requires-auth"];
      const token = localStorage.getItem("jwt");
      if (token) {
        (config.headers as Record<string, string>)["Authorization"] =
          `Bearer ${token}`;
      }
    }
    return config;
  });

  return api;
}

export function navigateByRole(
  role: string | null,
  navigate: NavigateFunction,
): void {
  switch (role) {
    case "Freelancer":
      navigate("/freelancer");
      break;
    case "Client":
      navigate("/client");
      break;
    default:
      navigate("/");
  }
}

export function handleHttpError(error: unknown): string {
  if (axios.isAxiosError(error) && error.response) {
    const data = error.response.data as { message?: string };
    return data?.message ?? (error as AxiosError).message;
  }

  return "An unexpected error occurred.";
}
