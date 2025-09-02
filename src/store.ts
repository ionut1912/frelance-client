import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/store/auth/slice";
import userProfileReducer from "../src/store/user-profile/slice";
import faceVerofocationReducer from "../src/store/face-verification/slice";
import cityReducer from "../src/store/city/slice";
import countryReducer from "../src/store/country/slice";
import languageReducer from "../src/store/language/slice";
import skillReducer from "../src/store/skills/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userProfileReducer,
    faceVerification: faceVerofocationReducer,
    city: cityReducer,
    country: countryReducer,
    language: languageReducer,
    skill: skillReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
