import { Dispatch } from "redux";
import { NavigateFunction } from "react-router-dom";
import { AxiosError } from "axios";
import {
  AuthAction,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  BLOCK_ACCOUNT_REQUEST,
  BLOCK_ACCOUNT_SUCCESS,
  BLOCK_ACCOUNT_FAILURE,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  SET_ROLE,
  UserRole,
} from "./types";
import { RegisterDto, LoginDto } from "../../models/Accounts";
import { toast } from "react-toastify";
import { getRoleFromToken, navigateByRole } from "../../utils/authUtils";
import { extractErrorMessages } from "../../utils/httpError";
import {
  blockAccount,
  deleteAccount,
  login,
  register,
} from "../../services/authService";

export const registerUser =
  (payload: RegisterDto, navigate: NavigateFunction) =>
  async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: REGISTER_REQUEST, payload });
    try {
      await register(payload);
      dispatch({ type: REGISTER_SUCCESS });
      toast.success("Register successful");
      navigate("/login");
    } catch (error) {
      const messages = extractErrorMessages(error);
      dispatch({ type: REGISTER_FAILURE, error: error as AxiosError });
      messages.forEach((m) => toast.error(m));
    }
  };

export const loginUser =
  (payload: LoginDto, navigate: NavigateFunction) =>
  async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: LOGIN_REQUEST, payload });
    try {
      const response = await login(payload);
      const token = response.data.token;
      localStorage.setItem("jwt", token);
      const role = getRoleFromToken(token);
      dispatch({ type: SET_ROLE, role: role as UserRole });
      dispatch({ type: LOGIN_SUCCESS, user: response.data });
      navigateByRole(role, navigate);
    } catch (error) {
      const messages = extractErrorMessages(error);
      dispatch({ type: LOGIN_FAILURE, error: error as AxiosError });
      messages.forEach((m) => toast.error(m));
    }
  };

export const blockUserAccount =
  (id: string, navigate: NavigateFunction) =>
  async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: BLOCK_ACCOUNT_REQUEST, id });
    try {
      await blockAccount(id);
      dispatch({ type: BLOCK_ACCOUNT_SUCCESS });
      toast.error("Account blocked");
      navigate("/login");
    } catch (error) {
      const messages = extractErrorMessages(error);
      dispatch({ type: BLOCK_ACCOUNT_FAILURE, error: error as AxiosError });
      messages.forEach((m) => toast.error(m));
    }
  };

export const deleteUserAccount =
  (id: string) => async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: DELETE_ACCOUNT_REQUEST, id });
    try {
      await deleteAccount(id);
      dispatch({ type: DELETE_ACCOUNT_SUCCESS });
    } catch (error) {
      const messages = extractErrorMessages(error);
      dispatch({ type: DELETE_ACCOUNT_FAILURE, error: error as AxiosError });
      messages.forEach((m) => toast.error(m));
    }
  };
