import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

import authReducer from "../src/store/auth/slice";
import userProfileReducer from "../src/store/user-profile/slice";
import faceVerificationReducer from "../src/store/face-verification/slice";
import cityReducer from "../src/store/city/slice";
import countryReducer from "../src/store/country/slice";
import languageReducer from "../src/store/language/slice";
import skillReducer from "../src/store/skills/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  userProfile: userProfileReducer,
  faceVerification: faceVerificationReducer,
  city: cityReducer,
  country: countryReducer,
  language: languageReducer,
  skill: skillReducer,
});

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
