import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";
import { RegisterDto, LoginDto, UserDto } from "../../models/Accounts";
import {
  register,
  login,
  blockAccount,
  deleteAccount,
} from "../../services/authService";
import { getRoleFromToken, navigateByRole } from "../../utils/authUtils";
import { extractErrorMessages } from "../../utils/httpError";

export const registerUser = createAsyncThunk<
  void,
  { payload: RegisterDto; navigate: NavigateFunction },
  { rejectValue: AxiosError }
>("auth/registerUser", async ({ payload, navigate }, { rejectWithValue }) => {
  try {
    await register(payload);
    toast.success("Register successful");
    navigate("/login");
  } catch (error) {
    const messages = extractErrorMessages(error);
    messages.forEach((m) => toast.error(m));
    return rejectWithValue(error as AxiosError);
  }
});

export const loginUser = createAsyncThunk<
  { user: UserDto; role: string | null } | null,
  { payload: LoginDto; navigate: NavigateFunction },
  { rejectValue: AxiosError }
>("auth/loginUser", async ({ payload, navigate }, { rejectWithValue }) => {
  try {
    const response = await login(payload);
    const token = response.data.token;
    localStorage.setItem("jwt", token);
    const role = getRoleFromToken(token);
    navigateByRole(role, navigate);
    return { user: response.data, role };
  } catch (error) {
    const messages = extractErrorMessages(error);
    messages.forEach((m) => toast.error(m));
    return rejectWithValue(error as AxiosError);
  }
});

export const blockUserAccount = createAsyncThunk<
  void,
  { id: string; navigate: NavigateFunction },
  { rejectValue: AxiosError }
>("auth/blockUserAccount", async ({ id, navigate }, { rejectWithValue }) => {
  try {
    await blockAccount(id);
    toast.error("Account blocked");
    navigate("/login");
  } catch (error) {
    const messages = extractErrorMessages(error);
    messages.forEach((m) => toast.error(m));
    return rejectWithValue(error as AxiosError);
  }
});

export const deleteUserAccount = createAsyncThunk<
  void,
  string,
  { rejectValue: AxiosError }
>("auth/deleteUserAccount", async (id, { rejectWithValue }) => {
  try {
    await deleteAccount(id);
  } catch (error) {
    const messages = extractErrorMessages(error);
    messages.forEach((m) => toast.error(m));
    return rejectWithValue(error as AxiosError);
  }
});
