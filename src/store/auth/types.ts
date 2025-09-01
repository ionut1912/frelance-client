import { LoginDto, RegisterDto, UserDto } from "././models/Accounts";
import { AxiosError } from "axios";

export type UserRole = "Client" | "Freelancer";

export interface AuthState {
  user: UserDto | null;
  role: UserRole | null;
  error: AxiosError | null;
}

export const REGISTER_REQUEST = "auth/REGISTER_REQUEST";
export const REGISTER_SUCCESS = "auth/REGISTER_SUCCESS";
export const REGISTER_FAILURE = "auth/REGISTER_FAILURE";

export const LOGIN_REQUEST = "auth/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "auth/LOGIN_FAILURE";

export const BLOCK_ACCOUNT_REQUEST = "auth/BLOCK_ACCOUNT_REQUEST";
export const BLOCK_ACCOUNT_SUCCESS = "auth/BLOCK_ACCOUNT_SUCCESS";
export const BLOCK_ACCOUNT_FAILURE = "auth/BLOCK_ACCOUNT_FAILURE";

export const DELETE_ACCOUNT_REQUEST = "auth/DELETE_ACCOUNT_REQUEST";
export const DELETE_ACCOUNT_SUCCESS = "auth/DELETE_ACCOUNT_SUCCESS";
export const DELETE_ACCOUNT_FAILURE = "auth/DELETE_ACCOUNT_FAILURE";

export const SET_ROLE = "auth/SET_ROLE";

interface RegisterRequestAction {
  type: typeof REGISTER_REQUEST;
  payload: RegisterDto;
}
interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
}
interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  error: AxiosError;
}

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: LoginDto;
}
interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  user: UserDto;
}
interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: AxiosError;
}

interface BlockAccountRequestAction {
  type: typeof BLOCK_ACCOUNT_REQUEST;
  id: string;
}
interface BlockAccountSuccessAction {
  type: typeof BLOCK_ACCOUNT_SUCCESS;
}
interface BlockAccountFailureAction {
  type: typeof BLOCK_ACCOUNT_FAILURE;
  error: AxiosError;
}

interface DeleteAccountRequestAction {
  type: typeof DELETE_ACCOUNT_REQUEST;
  id: string;
}
interface DeleteAccountSuccessAction {
  type: typeof DELETE_ACCOUNT_SUCCESS;
}
interface DeleteAccountFailureAction {
  type: typeof DELETE_ACCOUNT_FAILURE;
  error: AxiosError;
}

interface SetRoleAction {
  type: typeof SET_ROLE;
  role: UserRole;
}

export type AuthAction =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | BlockAccountRequestAction
  | BlockAccountSuccessAction
  | BlockAccountFailureAction
  | DeleteAccountRequestAction
  | DeleteAccountSuccessAction
  | DeleteAccountFailureAction
  | SetRoleAction;
