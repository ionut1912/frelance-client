import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./types";
import {
  loginUser,
  registerUser,
  blockUserAccount,
  deleteCurrentUserAccount,
} from "./thunks";
import { UserRole } from "../../models/UserProfile";

const initialState: AuthState = {
  user: null,
  role: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      localStorage.removeItem("jwt");
    },
    setRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload ?? null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload?.user ?? null;
        state.role = (action.payload?.role as UserRole) ?? null;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload ?? null;
      })
      .addCase(blockUserAccount.rejected, (state, action) => {
        state.error = action.payload ?? null;
      })
      .addCase(deleteCurrentUserAccount.fulfilled, (state) => {
        state.user = null;
        state.role = null;
        state.error = null;
      })
      .addCase(deleteCurrentUserAccount.rejected, (state, action) => {
        state.error = action.payload ?? null;
      });
  },
});
export const { logout, setRole } = authSlice.actions;
export default authSlice.reducer;
