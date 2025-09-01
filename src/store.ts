import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/store/auth/slice";
import userProfileReducer from "../src/store/user-profile/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
