import axios, { AxiosError } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { jwtDecode, JwtPayload as DefaultJwtPayload } from 'jwt-decode';


interface JwtPayload extends DefaultJwtPayload {

  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
}



export function getRoleFromToken(token: string): string | null {
  try {
    const payload = jwtDecode<JwtPayload>(token);
    return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ?? null;
  } catch (err) {
    console.error('Invalid token', err);
    return null;
  }
}


export function navigateByRole(role: string | null, navigate: NavigateFunction): void {
  switch (role) {
    case 'Freelancer':
      navigate('/freelancer');
      break;
    case 'Client':
      navigate('/client');
      break;
    default:
      navigate('/');
  }
}


export function handleHttpError(error: unknown): string {
  if (axios.isAxiosError(error) && error.response) {
    const data = error.response.data as { message?: string };
    return data?.message ?? (error as AxiosError).message;
  }

  return 'An unexpected error occurred.';
}
