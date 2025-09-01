import {
  applyMiddleware,
  legacy_createStore as createStore,
  combineReducers,
} from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "../src/store/auth/reducer";
import { userProfileReducer } from "./store/user-profile/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  userProfile: userProfileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, applyMiddleware(thunk));
